# DEX
A decentralized exchange (DEX) is a peer-to-peer marketplace where users can trade cryptocurrencies in a non-custodial manner without the need for an intermediary to facilitate the transfer and custody of funds.

Since DEX trades are facilitated by deterministic smart contracts, they carry strong guarantees that they will execute in exactly the manner the user intended, without the intervention
of centralized parties. In contrast to the opaque execution methods and potential for censorship present in traditional financial markets, DEXs offer strong execution guarantees and
increased transparency into the underlying mechanics of trading.

## Protocol participants
**1.Traders**
- Speculate on the asset price
- Aribtrage between multiple exchanges and pairs

**2.Liquidity providers (LP)**
- Provide liquidity pairs to the token pools
- Rewarded with swap fees (0.3% for most pairs)

**3. Developers**
- Maintain ecosystem 

## Allowance flow
1. user **signs** a transaction to ERC20 contract to **allow DEX contract** to move certain amount of its fund (`approval()`);
2. user **signs** a transaction to DEX contract to **sell** its ERC20 token for ETH;
3. DEX contract check if they are allowed to move certain funds of the user (`allowance()`);
4. Then, **DEX contract signs** a transaction to token smart contract to transfer user’s fund to DEX contract.


## Protocol architecture 
- `V2-Core` are the low-level base contracts. These smart contracts are responsible for the system’s functionality (swap, mint, burn)
- `V2-Periphery` are helper contracts that allow frontend applications and developers to integrate with the core contracts by applying safety checks and abstracting away certain things.

### V2 Core
[Repository](https://github.com/Uniswap/v2-core)
- `UniswapV2Factory.sol` - This is the factory that is responsible for deploying new pools (pairs) and also to keep track of them.
- `UniswapV2Pair.sol` - This is where the action happens (the pool implementation).

#### UniswapV2Factory
**createPair()**
In order to concentrate liquidity, there can only be one smart contract per pair. In other words, if there is a WETH/UNI pair contract already, the factory won’t allow you tocreate the same pair

```js
    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

#### UniswapV2Pair
This contract is responsible for handling unique pools (each pool = one contract).

**Swap()** : The swap function is the star of Uniswap. Every time you want to trade one token for another, the function gets called. 
- [Learn how to write a test for Swap](https://github.com/UV-Labs/Tutorials/blob/main/uni_swap/test/sample-test.js)

```js
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
        address _token0 = token0;
        address _token1 = token1;
        require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
        if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
        if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
        if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));
        }
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
        uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
        uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
        require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

**Mint()** : The mint function is responsible for minting LP tokens every time a liquidity provider provides liquidity. 
```js
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);

        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

**Burn()** : The burn function is responsible for burning LP tokens every time a liquidity provider wants to take his assets out of the pool. 


To protect against bespoke token implementations that can update the pair contract’s balance, and to more gracefully handle tokens whose total supply can be greater than 2112 , Uniswap v2 has two bail-out functions: sync()and skim()


**sync()** functions as a recovery mechanism in the case that a token asynchronously deflates the balance of a pair. In this case, trades will receive sub-optimal rates, and if no liquidity provider is willing to rectify the situation, the pair is stuck. sync() exists to set the reserves of the contract to the current balances, providing a somewhat graceful recovery from this situation.

```js
// force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
```

**skim()** functions as a recovery mechanism in case enough tokens are sent to an pair to overflow the two uint112 storage slots for reserves, which could otherwise cause trades to fail. skim() allows a user to withdraw the difference between the current balance of the pair and 2112 − 1 to the caller, if that difference is greater than 0.

```js
// force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }
```


## Risks
- **Smart contract risk** - Bugs, hacks, vulnerabilities, and exploits could happen for low-quality codebase, leading to a loss of funds.
- **Liquidity risk** -  Some DEX markets have poor liquidity conditions, leading to large amounts of slippage and a suboptimal user experience and trading losses. 
- **Frontrunning risk** - Due to the public nature of blockchain transactions, DEX trades may be frontrun by arbitrageurs or maximal extractable value (MEV) bots trying to siphon value from users.
- **Centralization risk** - While many DEXs aim to maximize their decentralization and censorship resistance, points of centralization can still be present - users rights could be limited by 3rd party in this case.
- **Network risk** - As the exchange of assets is facilitated by a blockchain, using a DEX may be prohibitively expensive or outright impossible if the network experiences congestion or downtime.
- **Token risk** - The ability for anyone to create a market for any token — the risks of buying low-quality or malicious tokens can be higher than in centralized exchanges. 
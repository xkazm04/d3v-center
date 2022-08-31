
# Implementation example
Learn lending contract principles with the implementation below

## 1. Reference repository
[Contracts](https://github.com/prajwolrg/ICE-Money-Market/tree/main/contracts)
[Full guide](https://iconosphereio.medium.com/hands-on-with-money-market-part-3-9db52358cdbd)

## 2. Contract structure
.
├── configuration
│   └── AddressProvider.sol // This contract stores the addresses of other contracts in the project, that are deployed to the chain.
├── lending-pool
│   ├── Config.sol   // Library with constants
│   ├── LendingPool.sol // It is the originating point of transactions: deposit, borrow, redeem and repay
│   ├── LendingPoolCore.sol // holds all of the supported reserves and handles the internal calculations.
│   ├── LendingPoolDataProvider.sol // interfaces with other contracts to get overall data in aggregated form
│   └── ReserveInitializer.sol // used to initialize the reserve
├── oracle
│   └── Oracle.sol // used to receive the current price of the asset in USD.
├── tokens
│   ├── Asset.sol //  ERC20 base template. It can be used to create a new asset (token) which can later be added to the money market
│   ├── DToken.sol // ERC20 token minted on borrowing of a particular asset
│   ├── HToken.sol // ERC20 token minted on the deposit of a particular asset
└── utils
    └── WadRayMath.sol // library used to represent and perform arithmetic on fixed-point decimal numbers

- **Wad** is a decimal number with 18 digits of precision
- **Ray** is a decimal number with 27 digits of precision

## 3. Contract implementation
### 3.1 Interest rate calculations
Calculation in `LendingPoolCore.sol`

```js
function calculateInterestRate(
    uint256 _availableLiquidity,
    uint256 _totalBorrows
) internal pure returns (uint256 newLiquidityRate, uint256 newBorrowRate) {
    uint256 utilizationRate = (_availableLiquidity == 0 && _totalBorrows == 0)
        ? 0
        : _totalBorrows.rayDiv(_availableLiquidity.add(_totalBorrows));

    if (utilizationRate <= OPTIMAL_UTILIZATION_RATE) {
        newBorrowRate = BASE_BORROW_RATE.add(
            SLOPE_RATE_1.rayMul(
                utilizationRate.rayDiv(OPTIMAL_UTILIZATION_RATE)
            )
        );
    } else {
        newBorrowRate = BASE_BORROW_RATE.add(SLOPE_RATE_1).add(
            utilizationRate
                .sub(OPTIMAL_UTILIZATION_RATE)
                .rayDiv(RAY.sub(OPTIMAL_UTILIZATION_RATE))
                .rayMul(SLOPE_RATE_2)
        );
    }
    newLiquidityRate = newBorrowRate.rayMul(utilizationRate);
}
```

With each transaction there is a change in total borrows and total liquidity, which in turn changes the utilization rate and consequently the interest rates.

```js
function updateReserveInterestRatesAndTimestampInternal(
    address _reserve,
    uint256 _liquidityAdded,
    uint256 _liquidityTaken
) internal {
    Config.ReserveData storage reserve = reserves[_reserve];

    uint256 availableLiquidity = getReserveAvailableLiquidity(_reserve)
        .add(_liquidityAdded)
        .sub(_liquidityTaken);
    uint256 totalBorrows = getReserveTotalBorrows(_reserve);
    (uint256 newLiquidityRate, uint256 newBorrowRate) = calculateInterestRate(
        availableLiquidity,
        totalBorrows
    );

    reserve.liquidityRate = newLiquidityRate;
    reserve.borrowRate = newBorrowRate;
    reserve.lastUpdateTimestamp = block.timestamp;

    emit ReserveUpdated(_reserve, newLiquidityRate, newBorrowRate);
}
```

### 3.2 Cumulated indexes updates
The calculation for the cumulated liquidity index `Cᵗ` and cumulated borrow index `Bᵗ` is performed on the `Config.sol`.

```js
function updateCumulativeIndexes(ReserveData storage self, uint256 totalBorrows)
    internal
{
    if (totalBorrows > 0) {
        uint256 currentLiquidityRate = self.liquidityRate;
        uint256 currentBorrowRate = self.borrowRate;
        uint256 lastUpdateTimestamp = self.lastUpdateTimestamp;

        uint256 cumulatedLiquidityInterest = calculateLinearInterest(
            currentLiquidityRate,
            lastUpdateTimestamp
        );
        self.liquidityCumulativeIndex = cumulatedLiquidityInterest.rayMul(
            self.liquidityCumulativeIndex
        );
        uint256 cumulativeBorrowInterest = calculateCompoundedInterest(
            currentBorrowRate,
            lastUpdateTimestamp
        );
        self.borrowCumulativeIndex = cumulativeBorrowInterest.rayMul(
            self.borrowCumulativeIndex
        );
    }
}

function calculateLinearInterest(uint256 _rate, uint256 _lastUpdateTimestamp)
    public
    view
    returns (uint256)
{
    uint256 timeDifference = block.timestamp.sub(uint256(_lastUpdateTimestamp));
    uint256 timeDelta = timeDifference.wadToRay().rayDiv(
        SECONDS_PER_YEAR.wadToRay()
    );
    return _rate.rayMul(timeDelta).add(WadRayMath.ray());
}

function calculateCompoundedInterest(uint256 _rate, uint40 _lastUpdateTimestamp)
    internal 
    view 
    returns (uint256) 
{
	uint256 timeDifference = block.timestamp.sub(uint256(_lastUpdateTimestamp));
	uint256 ratePerSecond = _rate.div(SECONDS_PER_YEAR);
	return ratePerSecond.add(WadRayMath.ray()).rayPow(timeDifference);
}
```

### 3.3 Lending Pool
`LendingPool` contract has two parameters:
- `_reserve:` Contract address of the asset that we want to deposit/borrow.
- `_amount:` The amount of asset we want to deposit/borrow.


**Deposit**
The contract then performs the following tasks:
- Check if the **reserve is active**, if not, revert the transaction.
- Check if the **_amount is greater than zero**. If not, revert the transaction.
- **Update** the **interest rates** and the **cumulative indexes**.
- **Transfer** the deposited token to the reserve.
- **Mint** equivalent **hToken** to the user wallet.
- **Emit Deposit event.**

```js
function deposit(address _reserve, uint256 _amount)
    external
    onlyActiveReserve(_reserve)
    onlyAmountGreaterThanZero(_amount)
{
    HToken hToken = HToken(core.getReserveHTokenAddress(_reserve));

    core.updateStateOnDeposit(_reserve, _amount);

    hToken.mintOnDeposit(msg.sender, _amount, core.getReserveLiquidityCumulativeIndex(_reserve));

    core.transferToReserve(_reserve, msg.sender, _amount);

    emit Deposit(_reserve, msg.sender, _amount, block.timestamp);
}
```

!(Deposit sequence flow)[https://miro.medium.com/max/1400/1*0uE6NqXojgDsuERo3z51xg.png]

**Borrow**
- **Checks** if the **reserve is active**. If not, revert the transaction.
- **Checks** if the **_amount is greater than zero**. If not, revert the transaction.
- **Checks** if there is **enough liquidity**. If not, revert the transaction.
- **Checks** if the user **can be liquidated.** If yes, revert the transaction.
- **Checks** if the user has supplied **enough collateral** earlier to borrow the required **_amount**. If not, revert the transaction.
- **Updates** the state on **borrow**. This **mints** equivalent **dToken** to the user wallet as well as updates cumulative indexes, interest rates, and timestamps.
- **Transfers** the **borrowed amount** to the user’s wallet.
- **Emits Borrow event.**

```js
function borrow(address _reserve, uint256 _amount)
    external
    onlyActiveReserve(_reserve)
    onlyAmountGreaterThanZero(_amount)
{
    (, , , , uint256 availableLiquidity, , , , , ) = dataProvider
        .getReserveData(_reserve);
    DToken dToken = DToken(core.getReserveDTokenAddress(_reserve));
    require(
        _amount <= availableLiquidity,
        "Not enough liquidity in this reserve"
    );
    (
        uint256 totalLiquidityUSD,
        uint256 totalCollateralUSD,
        uint256 totalBorrowsUSD,
        uint256 ltv,
        ,
        ,
        bool canBeLiquidated
    ) = dataProvider.getUserAccountData(msg.sender);
    require(!canBeLiquidated, "Health Factor should be above threshold");
    uint256 collateralNeeded = dataProvider.calculateCollateralNeeded(
        _reserve,
        _amount,
        totalBorrowsUSD,
        ltv
    );
    require(
        totalLiquidityUSD >= collateralNeeded,
        "Insufficient collateral to borrow"
    );
    core.updateStateOnBorrow(_reserve, msg.sender, _amount);
    core.transferToUser(_reserve, msg.sender, _amount);
    emit Borrow(_reserve, msg.sender, _amount, block.timestamp);
}
```

**Redeem**
When we want to redeem the amount deposited we pass a single parameter to the redeem method on hToken contract of the particular reserve.
The LendingPoolContract then performs the following tasks:
- **Checks** if the **reserve is active.** If not, revert the transaction.
- **Checks** if the **_amount** is **greater than zero.** If not, revert the transaction.
- **Checks** if the **right hToken address** has called the method. If not, revert the transaction.
- **Checks** if there is **enough liquidity.** If not, revert the transaction.
- **Updates** the state on redeem. This updates the cumulative indexes, interest rates, and timestamps.
- **Transfers** the redeemed amount to the user’s wallet.
- **Emits Redeem event.**

```js
function redeem(
    address _reserve,
    address payable _user,
    uint256 _amount
) external onlyActiveReserve(_reserve) onlyAmountGreaterThanZero(_amount) {
    (
        ,
        ,
        ,
        ,
        uint256 availableLiquidity,
        ,
        ,
        ,
        address hTokenAddress,

    ) = dataProvider.getReserveData(_reserve);
    require(
        msg.sender == hTokenAddress,
        "Only respective hToken can call this method"
    );
    require(
        availableLiquidity >= _amount,
        "Not enough liquidity in the reserve"
    );
    core.updateStateOnRedeem(_reserve, _amount);
    core.transferToUser(_reserve, _user, _amount);
    emit Redeem(_reserve, _user, _amount, block.timestamp);
}
```

**Repay**

- **Checks** if the **_amount** is **greater than zero.** If not, revert the transaction.
- **Checks** if the user has **some borrowed amount.**
- **Calculates** the **amount to return** to the user and **amount to repay** to the LendingPoolCore contract. If the amount provided by user is greater than the total amount to repay, amount to return is greater than zero. Otherwise amount to return is zero.
- **Updates** the state on borrow. This updates the cumulative indexes, interest rates and timestamps. This action also **burns** the _amount of dTokens.
- **Transfers** the amount to return back to the user.
- **Transfers** the amount to repay to the core.
- **Emits Repay event.**

```js
function repay(address _reserve, uint256 _amount)
    external
    onlyAmountGreaterThanZero(_amount)
{
    (, uint256 currentBorrowBalance, , , ) = dataProvider.getUserReserveData(
        _reserve,
        msg.sender
    );
    uint256 amountToReturn = 0;

    require(currentBorrowBalance > 0, "User does not have any borrow pending");
    if (_amount > currentBorrowBalance) {
        amountToReturn = _amount - currentBorrowBalance;
    }
    uint256 amountToRepay = _amount - amountToReturn;

    // update state
    core.updateStateOnRepay(_reserve, msg.sender, amountToRepay);
    // return back to user
    core.transferToUser(_reserve, msg.sender, amountToReturn);
    // transfer required amount to core
    core.transferToReserve(_reserve, msg.sender, amountToRepay);
    emit Repay(_reserve, msg.sender, amountToRepay, block.timestamp);
}
```

*Note: First approve the LendingPoolCore contract address in the Asset contract so that LendingPoolCore contract can transfer the asset from the actor to itself via transferToReserve function on behalf of the actor when deposit method is called*
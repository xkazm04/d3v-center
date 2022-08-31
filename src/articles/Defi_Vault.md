# Vault/Yield farm
Yearn vaults are funnels, they take funds from users and put them to work in other underlying protocols, by providing liquidity to get returns. 
So yearn vaults are just huge liquidity providers to other DeFi parts. Vault tokens are yield bearing tokens that abstract the holder from the yield source.
## Process
We are trying to achieve high level
- **Stake** tokens into a smart contract 
- Ability to **unstake**/withdraw at any time
- **Distribute** Periodic rewards for the amount staked

## 2. ERC 4626
Implementation of a standard API for tokenized Vaults representing shares of a single underlying ERC-20 token. 
This standard is an extension on the ERC-20 token that provides basic functionality for depositing and withdrawing tokens and reading balances.

All ERC-4626 tokenized Vaults **MUST** implement ERC-20 to represent shares. 
If a Vault is to be non-transferrable, it MAY revert on calls to `transfer` or `transferFrom`. 
The ERC-20 operations `balanceOf`, `transfer`, `totalSupply`, etc. operate on the Vault “shares” which represent a claim to ownership on a fraction of the Vault’s underlying holdings.

All ERC-4626 tokenized Vaults **MUST** implement ERC-20’s optional metadata extensions. 
The `name` and `symbol` functions SHOULD reflect the underlying token’s `name` and `symbol` in some way.

**Reference implementations**
- [Solmate implementation](https://github.com/transmissions11/solmate/blob/main/src/mixins/ERC4626.sol)
- [Vyper implementation](https://github.com/fubuloubu/ERC4626)

### 2.1 Main functions
**totalAssets** - Total amount of the underlying asset that is “managed” by Vault.
**convertToShares**  - The amount of `shares` that the Vault would exchange for the amount of `assets` provided
**convertToAssets** - The amount of assets that the Vault would exchange for the amount of shares provided
**mint** - Mints exactly `shares` Vault shares to `receiver` by depositing `amount` of underlying tokens.
**withdraw** - Burns `shares` from `owner` and sends exactly `assets` of underlying tokens to `receiver`.
**redeem** - Burns exactly **shares** from **owner** and sends **assets** of underlying tokens to **receiver**.
**deposit** - `caller` has exchanged `assets` for `shares`, and transferred those `shares` to `owner`.

The Vault interface is designed to be optimized for integrators with a feature complete yet minimal interface. Details such as accounting and allocation of deposited tokens are intentionally not specified, 
as Vaults are expected to be treated as black boxes on-chain and inspected off-chain before use.

The `convertTo` functions serve as rough estimates that do not account for operation specific details like withdrawal fees, etc. They were included for frontends and applications that need an average value of shares or assets, not an exact value possibly including slippage or other fees. For applications that need an exact value that attempts to account for fees and slippage we have included a corresponding `preview` function to match each mutable function. These functions must not account for deposit or withdrawal limits, to ensure they are easily composable, the `max` functions are provided for that purpose.

### 2.2 Backwards compatibility
ERC-4626 is fully backward compatible with the ERC-20 standard and has no known compatibility issues with other standards. For production implementations of Vaults which do not use ERC-4626, 
wrapper adapters can be developed and used.

### 2.3 Security considerations
Fully permissionless use cases could fall prey to malicious implementations which only conform to the interface but not the specification. 
It is recommended that all integrators review the implementation for potential ways of losing user deposits before integrating.

If implementors intend to support EOA account access directly, they should consider adding an additional function call for `deposit`/`mint`/`withdraw`/`redeem` with the means to accommodate slippage loss or unexpected deposit/withdrawal limits, since they have no other means to revert the transaction if the exact output amount is not achieved.

The methods `totalAssets`, `convertToShares` and `convertToAssets` are estimates useful for display purposes, and do not have to confer the exact amount of underlying assets their context suggests.

The `preview` methods return values that are as close as possible to exact as possible. For that reason, they are manipulable by altering the on-chain conditions and are not always safe to be used as price oracles. This specification includes `convert` methods that are allowed to be inexact and therefore can be implemented as robust price oracles. For example, it would be correct to implement the `convert` methods as using a time-weighted average price in converting between assets and shares.

Integrators of ERC-4626 Vaults should be aware of the difference between these view methods when integrating with this standard. Additionally, note that the amount of underlying assets a user may receive from redeeming their Vault shares (`previewRedeem`) can be significantly different than the amount that would be taken from them when minting the same quantity of shares (`previewMint`). The differences may be small (like if due to rounding error), or very significant (like if a Vault implements withdrawal or deposit fees, etc). Therefore integrators should always take care to use the preview function most relevant to their use case, and never assume they are interchangeable.

The only functions where the preferred rounding direction would be ambiguous are the `convertTo` functions. To ensure consistency across all ERC-4626 Vault implementations it is specified that these functions MUST both always round down. Integrators may wish to mimic rounding up versions of these functions themselves, like by adding 1 wei to the result.

## 3. Examples 

### 3.1 Single pool
[Reference](https://cryptomarketpool.com/create-a-defi-bank-that-pays-interest-yield-farm)

#### 3.1.1 Stake
```js
// allow user to stake usdc tokens in contract
    
    function stakeTokens(uint _amount) public {

        // Trasnfer usdc tokens to contract for staking
        IERC20(usdc).transferFrom(msg.sender, address(this), _amount);
        // Update the staking balance in map
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        // Add user to stakers array if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // Update staking status to track
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
```

#### 3.1.2 Unstake
```js
// allow user to unstake total balance and withdraw USDC from the contract
     function unstakeTokens() public {
    	// get the users staking balance in usdc
    	uint balance = stakingBalance[msg.sender];
        // reqire the amount staked needs to be greater then 0
        require(balance > 0, "staking balance can not be 0");
        // transfer usdc tokens out of this contract to the msg.sender
        IERC20(usdc).transfer(msg.sender, balance);
        // reset staking balance map to 0
        stakingBalance[msg.sender] = 0;
        // update the staking status
        isStaking[msg.sender] = false;

} 
```

### 3.1.3 Issue rewards
```js
// Issue bank tokens as a reward for staking    
    function issueInterestToken() public {
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
    // if there is a balance transfer the SAME amount of bank tokens to the account that is staking as a reward
            if(balance >0 ) {
                IERC20(bankToken).transfer(recipient, balance);
                
            }
            
        }
        
    }
```

### 3.2 Pair pool
[Reference](https://andydingtian.medium.com/defi-yield-farming-how-to-implement-defi-yield-farming-with-a-solidity-b90020674a7c)

#### 3.2.1 Deposit
```js
   function deposit(uint256 _amount) external{
      if(checkpoints[msg.sender] == 0){
          checkpoints[msg.sender] = block.number;
      }
     distribute(msg.sender);
     underlyigToken.transferFrom(msg.sender,address(this),_amount);
      _mint(msg.sender,_amount);
   }
```
#### 3.2.2 Withdraw
```js
    function withdraw(uint256 _amount) external{
       require(balanceOf(msg.sender) > _amount,'not LP token withdarw');
      distribute(msg.sender);
      underlyingToken.transfer(msg.sender,_amount)
      _burn(_amount); 
  }
```

#### 3.2.3 Distribute
```js
    function distribute(address beneficiary) external{
      uint256 checkpoint = checkpoints[beneficiary];
      require(block.number > checkpoint);
      uint256 reward = balanceOf(beneficiary) *(block.number-checkpoint);
      checkpoints[beneficiary] = block.number;      
}
```
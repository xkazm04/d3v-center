# Aave
The Aave Protocol is a decentralized, non-custodial liquidity protocol that enables the supplying and borrowing of different crypto assets from liquidity pools, and earning interest on crypto assets supplied.

# Main concepts
[Reference](https://blog.blockmagnates.com/understand-aave-protocol-defi-lending-and-flash-loan-3653330464fa)


`supply:` The Pool contract must have `allowance()` to spend funds on behalf of `msg.sender` for at least the amount for the asset being supplied
`supplyWithPermit:` Supply with transfer approval of supplied asset via `permit` function. This method removes the need for separate approval transaction before supplying asset to the pool (more gas efficient).
`borrow:` In DeFi lending protocol, the borrowers are always over-collateralised, which means they have to pay for collateral that is worth more than the borrowed amount.
```text
Borrowed amount ≤ collateral amount x Loan to Value
```
As long as the condition above holds, there is no time limitation for borrowing. In Aave v3, if the borrowers have supplied enough collateral via supply, they may borrow and receive borrowed tokens and debt tokens.

`repay:` Repay a debt with the underlying asset and burn the debt token.
`repayWithPermit:` Repay with transfer approval of borrowed asset via `permit` function. This method removes the need for separate approval tx before repaying asset to the pool (more gas efficient).
`repayWithATokens:` Allows user to repay with aTokens of the underlying debt asset without any approvals eg. Pay DAI debt using aDAI tokens.

## 1. Liquidation
A liquidation is a process that occurs when a borrower’s health factor goes below 1 due to their collateral value not properly covering their loan/debt value. This might happen when the collateral decreases in value or the borrowed debt increases in value against each other.

Liquidators can make profit by repaying part of the debt on behalf of the borrower and buy the collateral at a discount. The price difference is the profit for liquidators.

## 2. Tokenization
Instead of internal accounting, Aave uses tokenization to represent the debt and supplied assets.

### 2.1 AToken
ATokens are tokens minted and burnt upon `supply` and `withdraw` of assets to an Aave market, which denote the amount of crypto assets supplied and the yield earned on those assets.

ATokens can be safely stored, transferred or traded. The aTokens’ value is pegged to the value of the corresponding supplied asset at a 1:1 ratio.

All yield collected by the aTokens’ reserves are distributed to aToken holders directly by continuously increasing their wallet balance.

### 2.2 Debt tokenization
Debt tokens are interest-accruing tokens that are minted and burned on `borrow` and `repay`, representing the debt owed by the token holder. There are 2 types of debt tokens:

- **Stable Debt Tokens (sToken):** represent a debt to the protocol with stable interest rate.
- **Variable Debt Tokens (vToken):** represent a debt to the protocol with variable interest rate.

Debt tokens are not transferable. The s/vToken value is pegged 1:1 to the value of underlying borrowed asset and represents the current total amount owed to the protocol i.e. principal debt + interest accrued.

## 3. Interest Rate Model
 The [interest rate model](https://docs.aave.com/risk/liquidity-risk/borrow-interest-rate) is split into two parts around an optimal utilisation rate.

 In case of liquidity crunches on the protocol, stable rate borrows might need to be rebalanced to bring back equilibrium between the borrow and supply rates.

The rate of a stable loan is fixed until the rebalancing conditions are met:
- Utilisation rate is above 95%
- Too much has been borrowed at a stable rate and suppliers are not earning enough

## 4. Flash loan
Flash Loan does not require a user to supply collateral as long as the borrowed amount and the fee are returned before the end of the transaction (also called One Block Borrows).

*Aave charges 0.09% fee for flash loans on top of initial borrowed amount*

Use cases:
- Arbitrage
- Swapping collateral
- Self-liquidation

If the borrower fails to repay the borrowed amount + fee in the transaction, all actions will be rolled back and the borrower has to pay the gas fee still.

`flashLoan:` Allows borrower to access liquidity of multiple reserves in single flashLoan transaction. The borrower also has an option to open a stable or variable rate debt position backed by supplied collateral or credit delegation in this case.

`flashLoanSimple:` Allows borrower to access liquidity of single reserve for the transaction. In this case, the flash loan fee is not waived nor can borrower open any debt position at the end of the transaction. This method is gas efficient for those trying take advantage of Simple Flash Loan with single reserve asset.
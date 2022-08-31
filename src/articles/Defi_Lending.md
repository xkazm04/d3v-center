# Lending
The DeFi lending platforms offer crypto loans in a trustless manner and allow users to enlist the crypto coins they have in the DeFi lending platforms for lending purposes. 
With this decentralized platform, a borrower can directly take a loan, called DeFi P2P lending. Moreover, the lending protocol even allows the lender to earn interests.

## How it works
**Lenders** represent the first party involved in crypto lending. They might be crypto aficionados who want to grow the output of the assets or people who hold onto cryptocurrencies waiting for a value boost.
**Lending Platform** The 2nd party is the crypto lending platform, where the lending and borrowing transaction unfolds.
**Borrowers** represent the 3rd party of the process, and they are the ones who will get the funds. They could either be businesses that need funding or people who look for funding.

![Lending process](https://miro.medium.com/max/1400/1*2PD-g20LOD2DSvuUJuOnJw.jpeg)

**Terms to keep in mind**
- **LTV** (Loan-to-value) is a ratio of the loan to the ratio of the collateral. In terms of cryptocurrency lending loans are always overcollateralized which means you receive only a part of your collateral value;
- **APR** (Annual percentage rate) is the interest rate for the whole year applied on a cryptocurrency loan;
- **Time frame** defines how many times you have to pay off your cryptocurrency loan;
- **Liquidation** is a process of selling your collateral to cover the lender’s expenses;
- **Liquidation price** is a price when the collateral is being sold to cover the lender’s expenses. It is determined before taking the loan.

## Use cases 

**Maintaining exposure** to the upside of specific assets
A long-term crypto hodler who doesn’t want to sell their crypto investment but still needs to pay for their bills may take out a loan on their crypto so they can pay for their daily needs. 

**Earning interest**
Lending protocols serve holders with a better interest rate compared with traditional bank accounts.

**Leverage trading**
A leveraged trade is a trade made with borrowed money. Margin refers to the collateral
used to make the leveraged trade.

**Providing liquidity** 
In DeFi Lending, funds supplied to a lending protocol are pooled together and can be utilized efficiently. Because of smart contracts and blockchain, lending can be
performed inexpensively and instantaneously.

## Lending Risks
- Collateral almost always has a **liquidation price**. Users should closely monitor cryptocurrency price fluctuations and be aware of them.
- Keep in mind the **LTV** ratio. For example, if LTV is 30% it means that the price of Bitcoin used as collateral should drop by 30% before being sold;
- Do not use **highly volatile** digital assets as collateral, it adds difficulty of avoiding liquidation

## Aave V3 contract concepts - TBD
1. **PoolAddressesProvider:** This contract provides the address of the Pool contract. This address never changes and hence it is recommended that you use the provider to fetch address of the Pool contract.
2. **Pool:** This is the most important contract in the Aave’s liquidity protocol. It provides functionality to supply, withdraw ,borrow and repay crypto based assets.
3. **WETHGateway:** Cryptocurrencies like Ether(ETH) are not ERC20 compliant and hence do not possess some of the functionality needed in order to use them in
lending and borrowing protocols. The WETHGateway enables us to lock Ether in the contract and mint an equivalent amount of ERC20 compliant WETH (Wrapped Ether).
4. **DAI:** We will be depositing our ETH and using it as a collateral to borrow DAI. For that purpose we require this contract.
5. **UiPoolDataProviderV3:** This will be used to fetch the data regarding the investments made by a particular user.

## Liquidation and LTV - TBD
Liquidation incentive and loan-to-value (LTV aka collateral factor) are two of the most crucial configurations in **Compound-like** lending platforms. 
Lower LTV aims to mitigate bad debt scenarios, and higher liquidation incentives increase the potential liquidation speed, which in turn, also mitigates bad debt.

## Flash loans - TBD
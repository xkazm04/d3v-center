# AMM - Automated Market Makers

## 1st generation

### 1.1 CPMM - Constant Product Market Maker
CPMMs are based on the function x*y=k, which establishes a range of prices for two tokens according to the available quantities (liquidity) of each token. 
When the supply of token X increases, the token supply of Y must decrease, and vice-versa.

- Constant Product Formula - **x*y = k**

`x` and `y` are the reserves of the tokens in the pool. 
For example, if you are swapping DAI for WETH, you are interacting with the DAI/WETH smart contract pool. 
The total amount of DAI that the contract holds would be `x` , and the total amount of WETH would be `y` .

TBD chainlink picture

### 1.2 CSMM - Constant Sum Market Maker
The second type is a constant sum market maker (CSMM), which is ideal for zero-price-impact trades but does not provide infnite liquidity. 
CSMMs follow the formula x+y=k, which creates a straight line when plotted. This design unfortunately allows arbitrageurs to drain one of the reserves if the off-chain reference price between the tokens is not 1:1. 
Such a situation would destroy one side of the liquidity pool, leaving all of the liquidity residing in just one of the assets and therefore leaving no more liquidity for traders. Because of this, CSMM is a model rarely used by AMMs.

TBD chainlink picture

### 1.3 CMMM - Constant Mean Market Maker
The third type is a constant mean market maker (CMMM), which enables the creation of AMMs that can have more than two tokens and be weighted outside of the standard 50/50 distribution. 
In this model, the weighted geometric mean of each reserve remains constant. For a liquidity pool with three assets, the equation would be the following: **(x*y*z)^(⅓)=k**. 
This allows for variable exposure to different assets in the pool and enables swaps between any of the pool’s assets.

## Problems of first-generation AMM Models

**Capital inefficiency**
AMM liquidity providers have no control over which price points are being offered to traders, leading some people to refer to AMMs as “lazy liquidity” that’s underutilized and poorly provisioned. 
Meanwhile, market makers on order book exchanges can control exactly the price points at which they want to buy and sell tokens. This leads to very high capital efficiency, but with the trade-off of requiring active participation and oversight of liquidity provisioning.

**Impermanent Loss**
Impermanent loss is the difference in value over time between depositing tokens in an AMM versus simply holding those tokens in a wallet. 
This loss occurs when the market-wide price of tokens inside an AMM diverges in any direction. 
Since AMMs don’t automatically adjust their exchange rates, they require an arbitrageur to buy the underpriced assets or sell the overpriced assets until the prices offered by the AMM match the market-wide price of external markets. 

The loss is deemed “impermanent” because if the two tokens revert to the original price ratio, the effect will be cancelled out. 
You can think of the liquidity pool as a rowboat filled with water: if one side of the boat becomes too heavy, a little water spills over, 
offsetting some of the gains from transaction fees and farming rewards that you’ve earned.

There’s a bit of rosy thinking folded into the name here, since it’s quite possible that the price of one token will never recover relative to the other (or maybe you will be able to fit into that wedding tuxedo again, you never know!).

Since the loss is not realized until you break your LP tokens, it is only theoretical until then. 
Of course, the same can be said about any loss in token value, which is why the name is slightly misleading.

---
[Calculate IL](https://dailydefi.org/tools/impermanent-loss-calculator)

It’s crucial to recognize that IL occurs when token prices diverge in any direction. If both tokens go up in price, but the price of one token increases more sharply, you still suffer IL. 
In that scenario, you can think of IL as the opportunity cost of pooling liquidity instead of holding your tokens individually. In the other direction, if both tokens go down in value, but one falls sharply, the overall loss becomes magnified.


How to avoid IL ?
- Single token staking
- Staking stablecoins
- Insurance

## 2nd generation models

### 2.0 Concentrated liquidity
- Protocol: **Uniswap v3**

**Concentrated liquidity** concept = liquidity providers have the ability to supply their assets in a definite price range for which they deposit
liquidity. Moreover, they have given tier-based rewards based on the degree of risk they are taking on in any particular pool. This can incentivize more liquidity providers to
participate as the rewards would potentially help offset some of their potential losses in supplying liquidity to a wider price range.

No two liquidity positions are the same. Therefore, liquidity isrepresented by non-fungible tokens instead and NFTs just make yield farming hard.
To add to that, Uni V3 requires you to constantly readjust the range at which you provide liquidity to make sure price is within it. As a result, it has detracted a lot of retail users from LP’ing.

**Pros**
- Capital efficient
- Range limit orders
- Flexible fees instead of fixed 0.3
**Cons**
- Lack of composability for yield farming
- Requires active management of liquidity
- Licenced code

### 2.1 Hybrid CFMMs
As AMM-based liquidity has progressed, we have seen the emergence of advanced hybrid CFMMs which combine multiple functions and parameters to achieve specific behaviors, 
such as adjusted risk exposure for liquidity providers or reduced price impact for traders.

For example, **Curve** AMMs—known as the stableswap invariant—combine both a CPMM and CSMM using an advanced formula to create denser pockets of liquidity that bring down price impact within a
given range of trades. 

Hybrid CFMMs enable extremely low price impact trades by using an exchange rate curve that is mostly linear and becomes parabolic only once the liquidity pool is pushed to its limits. 
Liquidity providers earn more in fees (albeit on a lower fee-per-trade basis) because capital is used more efficiently, while arbitrageurs still profit from **rebalancing** the pool.

For example, let’s say there’s a Curve V2 pool with BTC and USDT, and the current price is $30,000. Most of the liquidity will be concentrated around that price with the rest spread out over a larger price range.
If the price moves to say, $40,000, then the pool will auto-rebalance and liquidity will shift so that $40,000 is the new focal point.

**Pros**
- Single-asset staking
- Automated rebalancing 
**Cons:**
- Hard to accommodate for random long tail assets


### 2.2 PMM - Proactive Market Maker
Also aiming to increase liquidity on its protocol, **DODO** is using a model known as a proactive market maker (PMM) that mimics the human market-making behaviors of a traditional central limit order
book. 
The protocol uses globally accurate market prices from Chainlink Price Feeds to proactively move the price curve of each asset in response to market changes, increasing the liquidity near the
current market price. Ultimately, this facilitates more efficient trading and reduces the impairment loss for liquidity providers.

### 2.3 vAMM - Virtual Automated Market Makers
Virtual automated market makers (vAMMs) such as **Perpetual Protocol** minimize price impact, mitigate impermanent loss, and enable single token exposure for synthetic assets. 
vAMMs use the same x*y=k constant product formula as CPMMs, but instead of relying on a liquidity pool, traders deposit collateral to a smart contract. 

By trading synthetic assets rather than the underlying asset, users can gain exposure to the price movements of a wide variety of crypto assets in a highly efficient manner. 
However, users holding an open position in a synthetic asset are at risk of having their collateral liquidated if the price moves against them.
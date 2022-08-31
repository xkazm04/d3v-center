# Yearn V3
[Learn from market leading yearn vault](https://medium.com/iearn/yearnv3-motivation-and-design-107840cb4844) to replicate concepts, ways of thinking and governing the protocol.

## Yearn V2 issues
Detected and confirmed issues in [V2](https://github.com/yearn/yearn-protocol/tree/develop/contracts)
- Strategy whitelisting depends on Governance Multisig
- Vault’s debt allocation is a manual unoptimised process
- Strategies handle too much responsibility in critical things like accounting
- It is VERY hard to write your first strategy (and it doesn’t have to be, subsequents are fairly easy), which leads to lower amount of strategies
- Certain types of strategies are not suitable for yearn vaults (strategies that lock funds, send funds to other chains, could be lossy while EV+, …)
- Iteration on V2 code is painful for users and contributors due to required migrations

## V3 Principles
- **Modularised Architecture**: split the code into a very robust “dumb” logic that handles the very few things a vault needs to get right (deposits, accounting, roles, …) and modules
that allow to iterate on the “smart” logic (optimised debt allocation, strategy whitelisting, dynamic fees, …)
- **Rethinking strategy <> vault** relationship to simplify strategy creation, allow for wider range of strategies, and reduce their responsibilities (i.e. accounting is handled by
the vault), lowering the number of potential issues
- **Space for adding new products** like yJuniorTranches (allow for different risk profiles for advanced users) or or ySwaps (increasing swap efficiency, increasing net APY)

### x.1 Modularised architecture
#### x.1.1 Robust Core
Core code implements the few very important things that a vault needs to get right. They are not subject to innovation, which means that can be written to last and be immutable. They are:
- **Deposits and withdrawals:** Correctly handling user interactions with the vault by minting and burning the right amount of shares.
- **Accounting:** Keeping a record of where funds are, profit and losses to calculate value of shares.
- **Managing funds:** Sending allocated funds to each of the strategies and retrieving them back from vaults in a safe way.
- **Access control:** Establishing a granular role system that allows group of functions to be called by specific actors, that can be users, multi-sigs or smart contracts.

#### x.1.2 Smart Modules
Complex but required logic that is expected to continue to be iterated on until it can be made immutable. If any of the Smart Modules fails, the vault can live without them just enough so it can return funds to depositors.

- **Debt Allocator:** A module that is called by the vault to see what’s the maximum debt it can send to a strategy. For example, an article is coming about how a group of contributors is using zk-STARKS to solve this in an optimal way.
- **Strategy Registry:** Handles extra strategy adding and removing from the vault. Used mainly to allow strategy endorsement logic to be implemented (e.g. strategy endorsement is voted by YFI/yvToken holders) but can also include useful strategy metadata.
- **Fee Manager:** Vault’s fee assessment logic. Allows to use dynamic fees or different values per vault.
- **HealthCheck:** This module was introduced in V2. It allows to put guardrails to vault operation so that P&L reporting is always under acceptable values, unless explicitly forced. Allows to specify that acceptable range and other rules for generic or specific strategies.

#### x.1.3 Periphery
There are some optional functions of the vault that will be integrated in a separate layer. They are not needed to operate a vault but they facilitate the creation of UI, tools or other protocols on top of yearn.
- **yRouter:** a wrapper that handles deposits and withdrawals to/from vault.
- **Yearn Lens:** an information aggregator for off-chain apps.
- **APY TWAP Oracle:** a reliable source of yearn vault’s past performance.
- **ySwaps:** strategies and other stakeholders can use the internal swap system currently being developed. This will reduce slippage and thus improve net APY.

### x.2 Strategy <> Vault relationship
Robust core means that all the responsibilities it takes are correctly thought through. Things like P&L accounting should be very robust to reduce issues and don’t need to be reinvented every time. 
**Strategy writing should be as simple as possible and handle the lower amount of code possible.**

In V3, the strategy <> vault relationship has been redesigned so that strategies will have reduced responsibilities and a very simple interface. This means that the strategy writer just needs to implement functions with clear goals (e.g. depositFunds(), freeFunds(), totalAssets(), …) and the vault will be in charge of managing the strategy. This will reduce issues coming from strategies, like bad reporting or accounting.

These changes make it possible to write a strategy without knowing all the details of the protocol and allow for a wider range of possible strategies, like locking funds or strategies that are expected to earn in the long term but can loss some funds in the short term.

TBD rozepsat
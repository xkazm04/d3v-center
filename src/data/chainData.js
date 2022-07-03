export const chainData = [
    {
        "id": 787,
        "chain": "Acala",
        "eco": "Polka",
        "language": "Solidity",
        "evm": "Yes",
        "config": "https://wiki.acala.network/integrate/integration/networks",
        "rpc": "https://acala-polkadot.api.onfinality.io/public-rpc",
        "trpc": "https://tc7-eth.aca-dev.network",
        "grant":"https://acala.network/ecosystem-program",
        "swap": "Acala hub",
        "attribute": "Acala is a decentralized finance network powering the aUSD ecosystem. It's a layer-1 smart contract platform that's scalable, Ethereum-compatible, and optimized for DeFi.",
        "reasonPlus": "Grants, Flexible fees, DeFi oriented ecosystem leverages cross-chain advatages of Polkadot and EVM+ compatible environment.",
        "reasonMinus": "Ecosystem around still not fully developed, serves more like source of aUSD to other ecosystems."
    },
    {
        "id": 4030,
        "chain": "Algorand",
        "eco": "",
        "language": "TEAL",
        "evm": "no",
        "config": "https://developer.algorand.org/docs/get-started/dapps/pyteal/#deploy-and-communicate-with-the-smart-contract",
        "rpc": "https://www.pokt.network",
        "trpc": "https://www.pokt.network",
        "grant":"https://algorand.foundation/grants-program",
        "swap": "Tinyman",
        "attribute": "L1 network solving trillema with block finality",
        "reasonPlus": "Fast, quality project with academic minds behind",
        "reasonMinus": "Poor DX, interoperability -> Low adoption and TVL",
    },
    {
        "id": 42161,
        "chain": "Arbitrum",
        "eco": "",
        "language": "Solidity",
        "evm": "Yes",
        "config": "https://developer.offchainlabs.com/docs/contract_deployment",
        "rpc": "https://arb1.arbitrum.io/rpc",
        "trpc": "https://rinkeby.arbitrum.io/rpc",
        "grant":"",
        "swap": "SushiSwap",
        "attribute": "Arbitrum is a layer 2 solution designed to improve the capabilities of Ethereum smart contracts",
        "reasonPlus": "Leading Eth L2 so far with solid number of projects duplicated from Ethereum, easy to migrate and leverage Eth security.",
        "reasonMinus": "Much less traffic than market leading infrastructure, long-term would be challenged by other scalling solutions.",
    },
    {
        "id": 592,
        "chain": "Astar",
        "eco": "Polka",
        "language": "Sol/WASM",
        "evm": "Yes",
        "config": "https://docs.astar.network/integration/node-providers",
        "rpc": "https://astar.api.onfinality.io/public",
        "trpc": "https://portal.pinknode.io/",
        "grant":"https://astar.network/builders-program/",
        "swap": "ArthSwap",
        "attribute": "Astar is a multi-chain smart contract platform (both WASM & EVM) that supports multiple blockchains and virtual machines.",
        "reasonPlus": "Long-term very powerful architecture and innovative visions how to bring new use cases to web3 together with Polka parachains.",
        "reasonMinus": "Still very young project alive, might be more difficult to build on with immature tooling around Polkadot.",
    },
    {
        "id": 1313161554,
        "chain": "Aurora",
        "eco": "NEAR",
        "language": "Solidity",
        "evm": "Yes",
        "config": "https://doc.aurora.dev/interact/hardhat",
        "rpc": "https://mainnet.aurora.dev",
        "trpc": "https://aurora.plus/dashboard",
        "grant": "https://aurora.dev/grants",
        "swap": "Trisolaris",
        "attribute": "Aurora provides Ethereum compatibility, NEAR Protocol scalability, and industry-first user experience through affordable transactions.",
        "reasonPlus": "Nice financing through NEAR initial success, great marketing and solid scalability thanks to connection to NEAR.",
        "reasonMinus": "Yet still challenging to build next-gen usecases with low traffic, limited cross-chain capabilities",
    },
    {
        "id": 43114,
        "chain": "Avalanche",
        "eco": "",
        "language": "Solidity",
        "evm": "Yes",
        "config": "https://docs.avax.network/dapps/launch-your-ethereum-dapp/",
        "rpc": "https://rpc.ankr.com/avalanche",
        "trpc": "https://api.avax-test.network/ext/bc/C/rpc",
        "grant":"https://avalancheavax.typeform.com/to/AHipnhBh",
        "swap": "TraderJoe",
        "attribute": "Avalanche is an open, L1 platform for decentralized applications.",
        "reasonPlus": "Well adopted, solid ecosystem projects around and tech with ability to build Defi or sidechain for Gaming project",
        "reasonMinus": "Always one step behind the leaders, questionable position in future trends of Cross-chain and Gaming applications",
    },
    {
        "id": 1839,
        "chain": "BNB",
        "language": "Solidity",
        "evm": "Yes",
        "config": "https://docs.binance.org/smart-chain/developer/deploy/hardhat.html",
        "rpc": "https://bsc-dataseed.binance.org/",
        "trpc": "https://data-seed-prebsc-1-s1.binance.org:8545/",
        "grant":"https://www.bnbchain.org/en/accelerator",
        "swap": "PancakeSwap",
        "attribute": "Cheaper, faster Ethereum-like L1 platform powered by Binance and their unlimited bag of money",
        "reasonPlus": "Arguably largest traffic in the space, high number of active projects, convenient for retail onboarding",
        "reasonMinus": "Fraudy apps and cheap forks instead of innovation powerhouses, not so cheap fees as it used to be.",
    },
    {
        "id": 2010,
        "chain": "Cardano",
        "evm": "no",
        "eco": "",
        "language": "Plutus",
        "config": "https://developers.cardano.org/docs/smart-contracts/plutus",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "SundaeSwap",
        "attribute": "L1 blockchain network powered by Haskell",
        "reasonPlus": "Candidate for AI, IoT use cases. Hyped community",
        "reasonMinus": "Terrible DX, hard to adopt, limited interoperability possibilities" 
    },
    {
        "id": "25",
        "chain": "Cronos",
        "evm": "Yes",
        "eco": "Cosmos",
        "language": "Plutus",
        "config": "https://cronos.org/docs/getting-started/cronos-testnet.html",
        "rpc": "https://evm.cronos.org",
        "trpc": "https://evm-t3.cronos.org",
        "grant": "https://cointelegraph.com/news/crypto-com-s-cronos-launches-100m-accelerator-for-defi-and-web3",
        "swap": "VVS Finance",
        "attribute": "Built on Ethermint, which supports rapid porting of apps & smart contracts from Ethereum and other EVM-compatible chains.",
        "reasonPlus": "Strong vision to attract NFT and gaming projects, visible marketing and load of money from Crypto.com",
        "reasonMinus": "Still in beta with long way to achieve trust and interest of capable teams around." 
    },
    {
        "id": 42220,
        "chain": "Celo",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://docs.celo.org/developer-guide/start/hello-contract-remote-node",
        "rpc": "https://forno.celo.org",
        "trpc": "https://alfajores-forno.celo-testnet.org",
        "grant":"https://celo.org/experience/grants#introduction",
        "swap": "Ubeswap",
        "attribute": "Celo is a fully EVM compatible proof-of-stake layer-1 protocol, featuring a fast ultralight client and built-in seigniorage stablecoins, collateralized by crypto and natural assets.",
        "reasonPlus": "Nice tech for mobile dapps development with grants to support projects with community value.",
        "reasonMinus": "Poor ecosystem, amount of users and TVL, intellectual resources behind seems to be limited in compare to major L1/L2 networks.",
    },
    {
        "id": 1,
        "chain": "Ethereum",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/",
        "rpc": "https://rpc.ankr.com/eth",
        "trpc": "",
        "grant":"",
        "swap": "Uniswap V3",
        "attribute": "Nothing to be said",
        "reasonPlus": "Rich ecosystem of app with trustworthy decentralization and massive TVL attractive for institutional DeFi",
        "reasonMinus": "Inability to scale on its own leads to higher fees and reason why to build elsewhere for use cases of the future.",
    },
    {
        "id": 11,
        "chain": "Elrond",
        "language": "WASM",
        "evm": "No",
        "eco": "",
        "config": "https://www.elven.tools/docs/recipes.html",
        "rpc": "https://docs.blastapi.io/apis-documentation/elrond",
        "trpc": "https://docs.blastapi.io/apis-documentation/elrond",
        "grant":"",
        "swap": "Maiar",
        "attribute": "L1 network with highly scalable architecture",
        "reasonPlus": "Effective marketing",
        "reasonMinus": "Poor DX and activity to improve it -> poor ecosystem",
    },
    {
        "id": 9001,
        "chain": "Evmos",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "Cosmos",
        "config": "https://soliditydeveloper.com/evmos",
        "rpc": "https://www.pokt.network",
        "trpc": "https://www.pokt.network",
        "grant":"https://evmos.notion.site/1f18d9c15a92400fbc6c75c719a24a1d",
        "swap": "Cronus",
        "attribute": "Cosmos meets EVM",
        "reasonPlus": "One of firsts IBC on EVM chain with fair grants",
        "reasonMinus": "No TVL, dapps and users",
    },
    {
        "id": 250,
        "chain": "Fantom",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://docs.fantom.foundation/node/node-providers",
        "rpc": "https://rpc.ftm.tools",
        "trpc": "https://rpc.ankr.com/fantom_testnet/",
        "grant":"",
        "swap": "Spookyswap",
        "attribute": "L1 EVM oriented on performance. Fantom is a fast, high-throughput open-source smart contract platform for digital assets and dApps.",
        "reasonPlus": "Huge historical grants, active platform development leading to reliable and fast infrastructure",
        "reasonMinus": "Although solid tech, there is no real reason why to prefer it over other major L1/L2 networks in terms of innovations, traffic or TVL",
    },
    {
        "id": 17,
        "chain": "Flow",
        "language": "Cadence",
        "evm": "No",
        "eco": "",
        "config": "https://docs.onflow.org/flow-cli/deploy-project-contracts/",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "...",
        "attribute": "NFT specialized",
        "reasonPlus": "Gaming potentionally",
        "reasonMinus": "Cadence, Ecosystem",
    },
    {
        "id": 1666600000,
        "chain": "Harmony",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://docs.harmony.one/home/developers/deploying-on-harmony/using-hardhat",
        "rpc": "https://rpc.ankr.com/harmony",
        "trpc": "https://api.s0.b.hmny.io",
        "grant":"https://docs.harmony.one/home/general/ecosystem/grants",
        "swap": "Sushiswap",
        "attribute": "Harmony is an open and fast blockchain. Mainnet runs Ethereum applications with 2-second transaction finality and 100 times lower fees.",
        "reasonPlus": "Grants, Solid scalling techs and strong commitment to the ecosystem",
        "reasonMinus": "Recently lost trust and their superbridge got rekt, tough situation now to convince users and devs to build on top of Harmony",
    },
    {
        "id": 2099,
        "chain": "Icon",
        "language": "Java",
        "evm": "No",
        "eco": "",
        "config": "https://icondev.io/getting-started/how-to-write-a-smart-contract",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "Balanced",
        "attribute": "BTP cross-chain protocol",
        "reasonPlus": "Promising interoperability tech",
        "reasonMinus": "Java contracts? No dev adoption yet",
    },
    {
        "id": 8,
        "chain": "ICP",
        "language": "Motoko/Rust",
        "evm": "No",
        "eco": "",
        "config": "...",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "...",
        "attribute": "Need further analysis",
        "reasonPlus": "Unique architecture",
        "reasonMinus": "Unique architecture",
    },
    {
        "id": 5647,
        "chain": "Kadena",
        "language": "Pact",
        "evm": "No",
        "eco": "",
        "config": "https://docs.kadena.io/learn-pact/beginner/web-editor",
        "rpc": "",
        "trpc": "",
        "grant":"https://kadena.io/grants/",
        "swap": "Kaddex",
        "attribute": "Architecture built for trading",
        "reasonPlus": "Rich grants and fine marketing",
        "reasonMinus": "Pact language, Low dev interest to build on",
    },
    {
        "id": 2222,
        "chain": "Kava",
        "language": "Solidity/Go",
        "evm": "Yes",
        "eco": "Cosmos",
        "config": "https://docs.kava.io/docs/ethereum/development",
        "rpc": "https://evm.kava.io",
        "trpc": "https://evm.evm-alpha.kava.io",
        "grant":"https://medium.com/kava-labs/kava-rise-750m-developer-incentive-program-e6a83f1363fa",
        "swap": "Kava Swap",
        "attribute": "Kava is a lightning-fast Layer-1 blockchain featuring a developer-optimized co-chain architecture that combines Ethereum and Cosmos into a single, scalable, network.",
        "reasonPlus": "Promising architecture to combine crosschain benefits from Cosmos world and network effect from Ethereum. DeFi focused roadmap.",
        "reasonMinus": "No cutting edge use case so far developed on Cosmos, low TVL and user hype leading into larger interest of developers.",
    },
    {
        "id": 8217,
        "chain": "Klaytn",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://docs.klaytn.foundation/getting-started/quick-start/deploy-a-smart-contract",
        "rpc": "https://public-node-api.klaytnapi.com/v1/cypress",
        "trpc": "https://public-node-api.klaytnapi.com/v1/baobab",
        "grant":"https://www.klaytn.foundation/klaytn-foundation",
        "swap": "KLAYswap",
        "attribute": "Substrate based EVM oriented on Asian metaverse",
        "reasonPlus": "Fair TVL and focused roadmap to attract metaverse and gaming projects. Outreach to large asian markets.",
        "reasonMinus": "All the projects around, documentation and websites just seems like cheaper versions of major L1 competitors - future of project uncertain."
    },
    {
        "id": 1088,
        "chain": "Metis",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://docs.metis.io/dev/building-on-metis/your-first-deployment",
        "rpc": "https://andromeda.metis.io/?owner=1088",
        "trpc": "",
        "grant":"",
        "swap": "NetSwap",
        "attribute": "New version of Optimistic EVM",
        "reasonPlus": "Fresh to build on - just fork something and try to earn $$$",
        "reasonMinus": "Veery low TVL, traffic and questionable future",
    },
    {
        "id": 20,
        "chain": "Mina",
        "language": "TypeScript",
        "evm": "No",
        "eco": "",
        "config": "...",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "...",
        "attribute": "22kb sized chain",
        "reasonPlus": "Unique node availibility",
        "reasonMinus": "Not ready for develop",
    },
    {
        "id": 1284,
        "chain": "Moonbeam",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "Polka",
        "config": "https://docs.moonbeam.network/builders/build/eth-api/dev-env/remix/",
        "rpc": "https://rpc.ankr.com/moonbeam",
        "trpc": "https://pinknode.io/",
        "grant":"https://moonbeam.foundation/grants/",
        "swap": "Beamswap",
        "attribute": "It’s a highly specialized Layer 1 chain that mirrors Ethereum’s Web3 RPC, accounts, keys, subscriptions, logs, and more.",
        "reasonPlus": "An opportunity to try pilot Polka ecosystem innovations with familiar EVM tooling. Risign traction even in bear market.",
        "reasonMinus": "Concerning long-term performance capabilities, Polkadot still lacks audience to use dapps.",
    },
    {
        "id": 32,
        "chain": "Neon",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "Solana",
        "config": "...",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "...",
        "attribute": "Solana/EVM chain",
        "reasonPlus": "Solana hype and $$$",
        "reasonMinus": "Not ready",
    },
    {
        "id": 42262,
        "chain": "Oasis",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://docs.oasis.dev/general/developer-resources/emerald-paratime/writing-dapps-on-emerald",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "ValleySwap",
        "attribute": "Unique L1 architecture for private and scalling ",
        "reasonPlus": "Interesting tech for data computing dapps and enterprise",
        "reasonMinus": "Long way to go, no real ecosystem and traction yet",
    },
    {
        "id": 10,
        "chain": "Optimism",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "Ethereum",
        "config": "https://community.optimism.io/docs/developers/build/basic-contract",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "Uniswap",
        "attribute": "Open source L2, secure, permissionless, and decentralized.",
        "reasonPlus": "Easy to migrate projects from Ethereum, well supported by Ethereum node providers and tooling, shared Eth security.",
        "reasonMinus": "Less popular Eth L2 choice with lower traffic and TVL, questionable future in tough competition.",
    },
    {
        "id": 137,
        "chain": "Polygon",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://docs.polygon.technology/docs/develop/alchemy/",
        "rpc": "https://polygon-rpc.com",
        "trpc": "https://rpc-mumbai.matic.today",
        "grant":"https://polygon.technology/funds/",
        "swap": "Quickswap",
        "attribute": "Polygon is a decentralised Ethereum scaling platform that enables developers to build scalable user-friendly dApps with low transaction fees without ever sacrificing on security.",
        "reasonPlus": "One of leading techs in space, large ecosystem and multiple scalling solutions and pro-enterprise and gaming visions.",
        "reasonMinus": "Moderate TVL to build solid DeFi and little bit outside building crosschain protocols, historically questioned decentralization.",
    },
    {
        "id": 5604,
        "chain": "Secret",
        "language": "Rust",
        "evm": "Yes",
        "eco": "Cosmos",
        "config": "https://docs.scrt.network/dev/secret-contracts.html",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "SecretSwap",
        "attribute": "Privacy chain powered by Cosmos",
        "reasonPlus": "Good tech for private transactions, contracts in both EVM and Wasm",
        "reasonMinus": "User/Dev adoption, Strong competition around",
    },
    {
        "id": 5426,
        "chain": "Solana",
        "language": "Rust",
        "evm": "No",
        "eco": "",
        "config": "https://docs.solana.com/cli/deploy-a-program",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "Serum",
        "attribute": "Chain with unlimited resources",
        "reasonPlus": "Hype, $$$",
        "reasonMinus": "Ecosystem, Interoperability",
    },
    {
        "id": 3077,
        "chain": "VeChain",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://doc.vechainworld.io/GetStarted/how-to-deploy.html",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "VeRocket",
        "attribute": "Supply chain oriented EVM copy",
        "reasonPlus": "Specific industry involvement and marketing",
        "reasonMinus": "Poor tech, ecosystem and adoption",
    },
    {
        "id": 2011,
        "chain": "Tezos",
        "language": "Python/LIGO",
        "evm": "No",
        "eco": "",
        "config": "https://wiki.tezosagora.org/learn/smartcontracts",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "QuipuSwap",
        "attribute": "Alternative L1 architecture to EVM",
        "reasonPlus": "Tezos foundation grants and marketing",
        "reasonMinus": "Difficult to build on, poor interoperability potential", 
    },
    {
        "id": 1958,
        "chain": "Tron",
        "language": "Solidity",
        "evm": "Yes",
        "eco": "",
        "config": "https://developers.tron.network/docs/deploying",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "SunSwap ",
        "attribute": "EVM copycat",
        "reasonPlus": "Effective marketing leading to large TVL",
        "reasonMinus": "Fraudy dapps, lack of innovation",
    },
    {
        "id": 4157,
        "chain": "THORChain",
        "language": "Rust",
        "evm": "No",
        "eco": "Cosmos",
        "config": "...",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "swap": "Thorswap",
        "attribute": "Chain agnostic contracts",
        "reasonPlus": "Promising interoperability model for unique dapps",
        "reasonMinus": "Poor DX, Tiny ecosystem",
    },
    {
        "id": 2469,
        "chain": "Ziliqa",
        "language": "Scilla",
        "evm": "No",
        "eco": "",
        "rpc": "",
        "trpc": "",
        "grant":"",
        "config": "https://scilla-cookbook.org/tutorials/interaction-tutorials/incrementing-button-interaction/deploy-contract/",
        "swap": "ZilSwap",
        "attribute": "PoW & PoS consensus L1 network",
        "reasonPlus": "Well marketing in past",
        "reasonMinus": "Tough to develop, use - destined to die",
    }
]
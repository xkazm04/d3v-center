# About 
Foundry manages your dependencies, compiles your project, runs tests, deploys, and lets you interact with the chain from the command-line and via Solidity scripts.

- **Fastest compilation time**
- **Tests in Solidity**
- Tracing `$ forge test --debug "testSomething"`
- **Gas-report** is an estimate by forge on how much gas it thinks that each function of your smart contract will consume. `forge test --gas-report`
- **Gas-snapshot** is a good tool to easily start gas optimizing your contracts `forge snapshot`
- **Mocks**: Create smart contracts that mock the behaviour of external smart contracts or actors. For example, a mockERC20 that is like ERC-20, but where you can mint **freely**
- Possibility to use Hardhat for complex deployments and Foundry for tests
- Integrate Static Analyzers [Slither, Mythril](https://book.getfoundry.sh/config/static-analyzers)
- Verify contract with Etherscan with one command

*Verification example*
```
forge verify-contract \
--chain $CHAIN_ID \
--compiler-version $COMPILER_VERSION \
$CON_ADDRESS src/MyToken.sol:MyToken $ETHERSCAN_API_KEY
```

# 1. Environment 

## Installation
- Fow Windows: [Install Rust in WSL](https://docs.microsoft.com/en-us/windows/dev-environment/rust/setup)

Download and run `rustup-init` from [rustup.rs](https://rustup.rs). It will start the installation in a console.
`cargo install --git https://github.com/foundry-rs/foundry foundry-cli anvil --bins --locked`

See [docs](https://book.getfoundry.sh/getting-started/installation) for other variants


## Default setup
├── foundry.toml
├── lib
│   └── ds-test
│       ├── default.nix
│       ├── demo
│       ├── LICENSE
│       ├── Makefile
│       └── src
└── src
    ├── Contract.sol
    └── test
        └── Contract.t.sol
        

## Deployment
Example script

```
ETH_RPC_URL=https://eth-rinkeby.alchemyapi.io/v2/pmyDZ_qaFpuamRt-daJztGtgZUv6eowD && forge create --rpc-url $ETH_RPC_URL "0xD9f3c9CC99548bF3b44a43E0A2D07399EB918ADc" --etherscan-api-key $ETHERSCAN_API_KEY src/NomadBase.sol:NomadBase --private-key $PRIVATE_KEY

forge verify-contract --compiler-version $CMPLR $CONTRACT src/NomadBase.sol:NomadBase $ETHERSCAN_API_KEY --chain-id 4
```



## Components
### 1.1 Forge
Forge is a command-line tool that ships with Foundry. Forge tests, builds, and deploys your smart contracts. [Pattern](https://github.com/gakonst/v3-periphery-foundry/blob/main/contracts/foundry-tests/utils/Deploy.sol)

- Every test is a `public` or `external` function that starts with `test` 
- Every contract has a single `setUp` function that is called before every `testFunction`.

#### Fuzz testing
Fuzz testing is a very important thing to do that many developers ignore. While writing tests, probably there are some scenarios that are not fully covered in the tests.
Foundry fuzzer will automatically generate random values for the function you specify, to check for edge cases.

- It's as simple as adding an input to the test function
- The fuzzer will pick random inputs that are of the same input type
- You can limit the inputs with `vm.assume()`
- The fuzzer dictionary will also be enriched with any state changes that happens in your smart contract. It will also be enriched with non-random extreme values (e.g UINT256.max)

### 1.2 Cast
Cast is Foundry's command-line tool for performing Ethereum RPC calls. You can make smart contract calls, send transactions, or retrieve any type of chain data - all from your command-line!

Examples

```
$ cast call 0x6b175474e89094c44da98b954eedeac495271d0f "totalSupply()(uint256)" --rpc-url https://eth-mainnet.alchemyapi.io/v2/Lc7oIGYeL_QvInzI0Wiu_pOZZDEKBrdf
8603853182003814300330472690
```

```
$ cast send --private-key <Your Private Key> 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc $(cast --from-utf8 "hello world") --rpc-url http://127.0.0.1:8545/
```

### 1.3 Cast
[Anvil](https://book.getfoundry.sh/reference/anvil/) is a local testnet node shipped with Foundry. You can use it for testing your contracts from frontends or for interacting over RPC.

To use Anvil, simply type `anvil`. You should see a list of accounts and private keys available for use, as well as the address and port that the node is listening on.

```text
#  Number of dev accounts to generate and configure. [default: 10]
anvil -a, --accounts <ACCOUNTS>

# The EVM hardfork to use. [default: latest]
anvil --hardfork <HARDFORK>

# Port number to listen on. [default: 8545]
anvil  -p, --port <PORT>
```

## 2. Cheatcodes
[See latest in docs](https://book.getfoundry.sh/forge/cheatcodes)

## 3. Suggested libraries
- [forge-std](https://github.com/foundry-rs/forge-std)
  - DSTest
  - console.log
  - stdCheats
  - helper functions to write to files
- [solmate](https://github.com/Rari-Capital/solmate)
Opinionated and gas-optized smart contracts. Alternative to Open-Zeppelin (although it doesn't cover all implementations)


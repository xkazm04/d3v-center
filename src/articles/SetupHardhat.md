# About 
TBD

# 1. Environment 
## Preconditions
- NodeJS
- Code editor (Visual Code)

## Setup

1. Initialize repository `npm init -y`
2. Install `dotenv` - To load environment variables
`npm install dotenv` 
3. Initialize Hardhat, basic project
`npm install --save-dev hardhat`
`npx hardhat`
4. Install dependencies
`npm i --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai`

[Reference](https://hardhat.org/hardhat-runner/docs/getting-started#overview)

## Command cheatsheet
|Command|Description|
|-------|-----------|
|npx hardhat node| Run local host|
|npx hardhat compile|Compile all contracts in folder|
|npx hardhat clean|Clear **Artifacts** folder
|npx hardhat test|Run tests in **Test** folder
|npx hardhat help|List all commnads|
|npx hardhat flatten > flat.sol|Flatten all dependencies into one file|
|npx hardhat run scripts/example.js --network mumbai|Deployment script|

Use console.log in development mode by importing into your contract `.sol` file

`import "hardhat/console.sol";`
`console.log(something)`

## Project structure
Key files 
- **Contracts** - Project contracts folder
- **Test** - Unit tests folder
- **Scripts**  - Deployments scripts folder
- **hardhat.config.js** - Deployment configurations
- **Artifacts** (after compile) - Contract metadata (included abi)

## Recommended additional tools 
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity)
- [Hardhat Solhint](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-solhint)

# 2. Tests
Why to test? Smart contracts are **immutable**
- From dev perspective it's **annoying** to redeploy again and again to see result in devnet/testnet/mainnet
- From business perspective it's **risky** to deploy **without test**, especially in DeFi

## 2.1 Recommended test coverage

**Code coverage**
Metric that can help you see how much of source code is tested. 

1. Install package [solidity-coverage](https://www.npmjs.com/package/solidity-coverage):
`npm i solidity-coverage ganache-cli`
2. Add to Hardhat config `hardhat.config.js`:
`require('solidity-coverage');`
3. Shut down local node and run:
`npx hardhat coverage --network localhost`


**Known bugs/exploits/common errors**
- [SWC Registry](https://swcregistry.io/)
- [OpenZeppelin guidelines](https://blog.openzeppelin.com/smart-contract-security-guidelines)

**Implementation of your own functions**
- Identify edge cases
- Cover event emits
- Expected reverts and errors
- Expected return values

## 2.2 Time manipulation

Some functions like **staking** for time period needs time to get through tests and verify correct calculations. To achieve that **local environment is needed** for time simulation of seconds/hours/years.

```js
const increaseTime = async (seconds, mine = false) =>{
    await ethers.provider.send('evm_increaseTime', [seconds]);
    if(mine){
        await ethers.provider.send('evm_mine',[])
    }
}
```

When you call `increaseWorldTimeInSeconds(10, true)` it will increase the EVM internal timestamp 10 seconds ahead of the current time. After that, if you specify it, it will also mine a block to create a transaction.

## 2.3 Account impersonation
TBD 

##
TBD

## 2.4 Test examples

# 3. Templates

## 3.1 Chainlink Hardhat Starter kit
- Typescript Hardhat project
- Chainlink function templates - Price feed, Keeper ...
- Test files for oracle functions
- Staging tests 
- TypeChain
- NatSpec 


Features:
### Gas estimation
Mocha reported has been added to the test suites and displays gas usage per unit test.

To estimate gas, set REPORT_GAS env variable to `true` and run 

`yarn hardhat test`

### View Contracts Size
Control contract code size limit to indicate there is a need to split it into multiple contracts and libraries.

`yarn run hardhat size-contracts` 

### Fuzz Testing
Due to the immutable nature of smart contracts, you always want to be sure to test every possible scenario before deployment on the blockchain. That’s why the Kit comes with a fuzzer to find edge cases that couldn’t be found using the unit or staging tests.

**Echidna** has been included as a fuzz testing tool in this starter kit. You need to have **Docker** installed with at least 8GB of virtual memory allocated. To update this parameter go to *Settings -> Resources -> Advanced -> Memory*
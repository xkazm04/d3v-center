# About 
A world class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier. With Truffle, you get:
- Built-in smart contract compilation, linking, deployment and binary management.
- Automated contract testing for rapid development.
- Scriptable, extensible deployment & migrations framework.
- Network management for deploying to any number of public & private networks.
- Package management with EthPM & NPM, using the ERC190 standard.
- Interactive console for direct contract communication.
- Configurable build pipeline with support for tight integration.
- External script runner that executes scripts within a Truffle environment.

# 1. Environment 
## Preconditions
- Node >14.0.x
- Git >2.10.x
- Code editor (Visual Code)
- Basic JavaScript knowledge
- Basic Solidity knowledge

## Setup

1. Install Truffle `npm i -g truffle`
2. Initialize project `truffle init`

[Reference](https://trufflesuite.com/docs/truffle/)

## Command cheatsheet
|Command|Description|
|-------|-----------|
|truffle unbox| Scaffold predefined project|
|truffle compile|Compile all contracts in folder|
|truffle test|Run tests in **Test** folder|
|truffle migrate| Run deployment script|
|truffle develop| Deploy on Ganache local environment|
|truffle console| Open interactive console|




## Project structure
Key files 
- **Contracts** - Project contracts folder
- **Test** - Unit tests folder
- **Migrations**  - Deployments scripts folder
- **truffle-config.js** - Deployment configurations


## 2. Test
Install `npm` dependencies 
- web3 
- truffle-assesertions 
- truffle 
- `ganache` - [Local blockchain environment](https://trufflesuite.com/docs/ganache/quickstart)

Initialize local environment
`npm run ganache`

Run tests in development
`npm test`

Main takeaways
- Use the `call` function to get a variable, NOT functions
- Could either use `expect` or `assert(+getDeployer, 0)` to compare the values


### Handling reverts
TBD
### Listening to filtered events
TBD


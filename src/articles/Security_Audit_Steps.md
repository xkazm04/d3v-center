
# General
- Don't use deprecated Solidity functions (SWC-111) - `throw`, `suicide`, `msg.gas`, `block.blockhash`... 
- Use of Assert (SWC-110) - `Assert` should be use for test, not for input validation as it consumes all of the gas without refund
- Don't hardcode gas (SWC-134)
- Don’t use `.transfer` or `.send` unless the recipient is certain to be an [EOA](https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now) (SWC-134)

## Static analysis
These tools will automatically flag issues in this list. While they may have false positives and miss critical errors, it’s a low-effort, high-payoff investment to include these tools in your development pipeline. Don’t pay an auditor thousands to bring to your attention something one of these tools can catch automatically.

TBD slither

## Access control
Go through each function and don't forget to define ownership if needed
- TBD ref OpenZeppelin Ownableš

## Sensible deployment strategy
Many deployment tools require private keys to be loaded unencrypted onto the hard drive. If this must be done, steps must be taken to isolate the computer or to transfer ownership of the contract right after deployment. 

## Re-entrancy (SWC-107)
Watch out for function calls or ether transfers to contracts you didn’t create. Also, be aware that `safeMint` and `safeTransfer`, while not external calls, activate functionality on the receiving contracts, which can cause re-entrancy.

**Solutions**
1. Flattening and deploying with a hardware wallet 
2.

OZ, Thirdweb tools -> TBD

## General
### Tx.origin 
- `tx.origin` (SWC-115) - only real use case is to check if a smart contract is calling your code. Using it for verification can lead to phishing hacks.
- `abi.encodePacked` (SWC-133) can result in a hash collision, use `abi.encode` instead
- don't expect a **balance** of an address will have **precise value or remains static**, it could be violated (SWC-132)
- [Insecure Delegate call](https://blog.solidityscan.com/security-issues-with-delegate-calls-4ae64d775b76) (SWC 112) - ensure the address to delegate cannot be altered by an authorized user

### Upgradeability issues
- Storage slots can clash
- information stored via constructors or immutable variables won’t be available in the next contract
- initializers need to be protected
- `selfdestruct` can prevent upgrades


**Solution**: use **OpenZeppelin’s** upgraded plug-in tools for hardhat or truffle.

## Readability
- **Undescriptive or misleading** variable names, function names, or comments. Avoid names like mapping3 or data as they are very ambiguous.Inaccurate or outdated comments should also be flagged.
- **Unused variables** (SWC-131)
- **Code with no effects** (SWC-135)
- **Explicit** variable and function **visibility** (internal, public, private)
- Use **prettier** maintain consistent code formatted
- Nothing on the blockchain is private, including private variables. (SWC-136)
- [Excessively strict validation](https://decrypt.co/98530/aku-ethereum-nft-launch-ends-with-34m-locked-in-flawed-smart-contract) (SWC-123) - Unnecessary `require` statements
- Don’t shadow state variables (SWC-119), at least prepend function variable with an **underscore**
- **Avoid functions and variables with the same name** when using multiple inheritances (SWC-125)

### Fixed pragma (SWC-103)
Don’t do `pragma solidity ^0.8.7` when you set the compiler version yourself. 
This makes it ambiguous to verifiers which version of solidity was used. 
Only use this pattern for library code where you are not the one to compile it. Do pragma solidity 0.8.7 instead.

### Missing require messages
Fill error messages for `require` statements, this will clearly identify the intention
`require(numTokens < MAX_TOKENS_TO_STAKE, “numTokens exceeds stake limit”)`

## Signature related
### Recovery to zero address
[The check](https://docs.openzeppelin.com/contracts/2.x/api/cryptography#ECDSA)
```
bytes32(data).toEthSignedMessageHash().recover(signature) == verifyingAccount;
```
can “succeed” if `verfyingAccount` hasn’t been set yet. Make sure that `verifyingAccount` is set before this line of code can be executed (such as in the constructor or initializer)

### Verifier doesn’t hash message (SWC-117)
`bytes32(data).recover(signature) == verifyingAccount`

is vulnerable because an attacker can create combinations of data and signatures that result in `verifyingAccount`. If the data is hashed before signature recovery, then the attacker won’t be able to pull off this attack. 

### Replay attack protection (SWC-121)
This function is vulnerable because an attacker can send the transaction again.
```js
function transferToVulnerable(address _from, address _to, uint256 _amount, bytes calldata signature) external {
    require(abi.encodePacked(_from, _to, _amount).toEthSignedMessageHash().recover(signature) == _from);}
```

**Solution**
```js
function transferToFixed(address _from, address _to, uint256 _amount, uint256 _nonce, bytes calldata signature) external {
    require(usedNonces[_nonce] == false, “nonce used”);
    usedNonces[_nonce] = true;
    require(abi.encodePacked(_from, _to, _amount, _nonce).toEthSignedMessageHash().recover(signature) == _from);
}
```

## Randomness 
All data on the blockchain can be manipulated by miners to a certain extent (for example, by changing the timestamp by a few seconds), so if the miners want to manipulate the outcome of a lottery, they can. 

- If a miner is participating in a lottery, use an oracle like Chainlink
- If the prize is less than the block rewards, the miner doesn’t have an incentive to manipulate it
- If you know the miners cannot participate or won’t be bribed, then it isn’t an issue.


## Outdated SWC
- SWC-101 - Integer overflow solved with Solidity 0.8.0
- SWC-109 - Solidity 0.4.0 allowed you to declare variables of indeterminate size without specifying if they would be in memory or storage, ok from 0.5.0
- SWC-118 - It used to be the case that the constructor function was determined by it having the same name as the contract, solved from 0.4.22
- SWC-129 - The statement x =+ 1 used to be valid, but later versions of solidity make this syntax invalid
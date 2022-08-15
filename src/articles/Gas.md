


### Unnecessary re-entrancy protection
Using OpenZeppelin’s non-reentrant modifier on functions that don’t transfer ether or make external calls is a waste of gas.

### Use clones over multiple deploys
If your contract deploys many copies of the same contract, use the [clone pattern](eips.ethereum.org/EIPS/eip-1167) instead of deploying the same bytecode over and over.

### Read and write storage once
Don’t read from the same storage variable twice in one transaction. Cache it in a local variable. An example of this is getting the length of an array in storage (as discussed later). The exception is if you are doing bookkeeping while dealing with untrusted contracts.

### Don’t use safemath on solidity 0.8.0 or later
Solidity 0.8.0 has overflow protection built in. Using the SafeMath library just wastes more gas.

### Prefer calldata over memory
The memory keyword in a function argument causes the underlying code to copy the argument into memory. Calldata causes the code to read the transaction without copying it directly.

### Compare strings with a hash rather than character by character
This trick may depend on how long the strings are, but it’s worth benchmarking both approaches in your application.

### Prefer bytes32 over bytes if possible
If you are storing strings that are short, bytes32 will be a more efficient way to store them.

### Variables set once should be immutable unless contract is upgradeable
Immutable variables are stored in the bytecode instead of storage, which is far cheaper from a gas perspective.

### Cache array.
When looping over an array, don’t check the array length every iteration because that is a storage read which costs extra gas. Here’s the code:

```js
// less efficient
for (uint256 x = 0; x < array.length; i++) {
    // do stuff
}
// efficient
arrayLength = array.length;
for (uint256 x = 0; x < arrayLength; ) {
    // do stuff
    unchecked {
        ++i;
    }
}
```

## Multi-call
If your users need to make a sequence of transactions, giving them a mechanism to do it with multi-call can save a lot of gas.


## Minor tips
- Uint256 is more efficient than boolean and small uints
- Bitshift rather than divide or multiply by two unless overflow is a possibility
- Use bitmaps if the contract has a lot of boolean variables
- Optimize function names for gas-sensitive functions
- Pack function arguments for gas-sensitive functions
- require(x >= 0, “…”) for uints should be avoided
- Split require statements rather than using boolean operators
- Prefer x = x + y over x += y
- Prefer ++x over x++
- Use unchecked { ++x } when using a loop
- Don’t initialize storage variables to default values
- Use > or < instead of ≤ or ≥ if possible
- Use encodePacked over encode for fixed-length arguments
- Admin functions can be payable
- Declare the return variable in the function signature
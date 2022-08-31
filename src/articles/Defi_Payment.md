# Payment functions

## transferTo()
This function has an inbuilt required method, so it does not need an extra. It is clean
and speedily helps you transfer a certain amount of ethers to a specified address.

```js
// Method 1: The transfer function
function transferTo( address to,uint256 amount) 
    internal returns (bool) {
    payable(to).transfer(amount);
    return true;
}
```

In the event of a failure, the transfer function reverts. When a payment is made, the receiving contract’s `fallback()` or `receive()` functions are called. 
This allows the receiving contract to respond to a payment.

## sendTo()
Now, this function adds the required method for validating that payments are successfully executed. It is also simple and clean as the `transferTo` function.

```js
// Method 2: The send function
function sendTo(address to,uint256 amount) 
    internal returns (bool) {
    require(payable(to).send(amount), "Payment failed");
    return true;
}
```

Send and transfer are almost synonymous in behavior. However, if the payment fails, it will not be reverted. 
It instead returns false. The calling contract is in charge of handling failures.

## payto()
```js
// Method 3: The call function
function payTo(address to, uint256 amount) 
    internal returns (bool) {
    (bool success,) = payable(to).call{value: amount}("");
    require(success, "Payment failed");
    return true;
}
```

The `call()` function is meant for more individualized interactions between smart contracts. 
It has the ability to call a function by name and send Ether to it. It is now the preferred method for sending Ether from a smart contract.

# Uni-directional payments
In some business, markets or industries, there are scenarios where the payments are not allowed to be sent bi-directionally, which means that the payment can only be sent from the account *A* to *B*, but they can’t from the account *B* to *A*, this is called Uni-directional payment

[Reference](https://itnext.io/uni-directional-payment-channels-in-solidity-1aab8cc7eda9)

```js
    constructor(address payable _receiver) payable {
        require(_receiver != address(0), "receiver = zero address");
        sender = msg.sender;
        receiver = _receiver;
    }
    // Verifying the hash from the receiver side
    
    function _verify(uint _amount, bytes memory _sig) private view returns (bool) {
        return _getEthSignedHash(_amount).recover(_sig) == sender;
    }

    function verify(uint _amount, bytes memory _sig) external view returns (bool) {
        return _verify(_amount, _sig);
    }

    // Transaction requires signature

    function send(uint _amount, bytes memory _sig) external nonReentrant {
        //  verifing signature and sender != receiver
        require(msg.sender != receiver, "sender must be different than receiver");
        require(_verify(_amount, _sig), "invalid signature");
        
        (bool sent, ) = receiver.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        selfdestruct(sender);
    }
```
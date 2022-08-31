
# Subscription
Create a subscription-based smart contract. Accept native token payments and ERC20 payments from your users.
[Reference](https://github.com/DRIVENpol/Subscription-Smart-Contract)

```js
contract Subscription {
    // Make a payment
    function paySubscription(uint256 _period) public payable { 
        if(paymentOption == 1) {

            require(msg.value == ethFee.mul(_period));
            totalPaymentsEth = totalPaymentsEth.add(msg.value); // Compute total payments in Eth
            userTotalPaymentsEth[msg.sender] = userTotalPaymentsEth[msg.sender].add(msg.value); // Compute user's total payments in Eth

        } else {

             secondaryTokenForPayment.safeTransferFrom(msg.sender, address(this), erc20Fee.mul(_period));
             totalPaymentsErc20 = totalPaymentsErc20.add(erc20Fee.mul(_period)); // Compute total payments in Erc20 tokens
             userTotalPaymentsErc20[msg.sender] = userTotalPaymentsErc20[msg.sender].add(erc20Fee.mul(_period)); // Compute user's total payments in Erc20

        }

        Payment memory newPayment = Payment(msg.sender, block.timestamp, block.timestamp.add(_period.mul(30 days)));
        payments.push(newPayment); // Push the payment in the payments array
        userPayment[msg.sender] = newPayment; // User's last payment
    }

    // Pay in advance
    function payInAdvance(uint256 _period) public payable {
         if(paymentOption == 1) {

            require(msg.value == ethFee.mul(_period));
            totalPaymentsEth = totalPaymentsEth.add(msg.value); // Compute total payments in Eth
            userTotalPaymentsEth[msg.sender] = userTotalPaymentsEth[msg.sender].add(msg.value); // Compute user's total payments in Eth

        } else {

             secondaryTokenForPayment.safeTransferFrom(msg.sender, address(this), erc20Fee.mul(_period));
             totalPaymentsErc20 = totalPaymentsErc20.add(erc20Fee.mul(_period)); // Compute total payments in Erc20 tokens
             userTotalPaymentsErc20[msg.sender] = userTotalPaymentsErc20[msg.sender].add(erc20Fee.mul(_period)); // Compute user's total payments in Erc20

        }

        uint256 newExpirationPeriod = userPayment[msg.sender].paymentExpire.add(_period.mul(30 days));

        Payment memory newPayment = Payment(msg.sender, block.timestamp, newExpirationPeriod);
        payments.push(newPayment); // Push the payment in the payments array
        userPayment[msg.sender] = newPayment; // User's last payment
    }

}
```
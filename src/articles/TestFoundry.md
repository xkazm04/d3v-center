# Testing with Foundry
## 1. Setup local environment

1. Initialization
`forge init my_token && cd my_token`
2. Dependencies (solmate)
`forge install Rari-Capital/solmate`

If you ever need to log variables from inside the test, you can use the events declared in
`Test` . You can log numbers with `emit log_uint(uint)` and you can label them with
`emit log_named_uint(string,uint)` . To show event logs, use `-vv` (verbosity 2) when
running `forge test`.

3. Local deployment

Start anvil instance - `anvil`

Now let’s take the private key of the first account from the `anvil` output and set it as
the `$PRIV_KEY` environment variable. This is not required, it just keeps things clean.

```
export \
PRIV_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf
4f2ff80
```

4. Deploy contract

`forge create src/MyToken.sol:MyToken --private-key=$PRIV_KEY`

deployment pattern with arguments in constructor

```
forge create Filename.sol:Contractname \
--private-key $PRIV \
--constructor-args arg0 arg1 arg2
```

5. Interact with contract using Cast

`cast send --private-key $PRIV_KEY $CON_ADDRESS "mint(uint256)" 1`

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import styled from 'styled-components'
import { InjectedConnector } from 'wagmi/connectors/injected'
import ExampleButton from '../buttons/ExampleButton'

const Flex = styled.div`
  display: flex;
`


function WagmiProfile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <ExampleButton label={'Disconnect'} click={disconnect}/>
      </div>
    )
  return  <Flex><ExampleButton label={'Connect wallet'} click={connect}/></Flex>

}

export default WagmiProfile
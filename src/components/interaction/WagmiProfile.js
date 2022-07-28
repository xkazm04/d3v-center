import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import ExampleButton from '../buttons/ExampleButton'

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
  return  <ExampleButton label={'Connect wallet'} click={connect}/>

}

export default WagmiProfile
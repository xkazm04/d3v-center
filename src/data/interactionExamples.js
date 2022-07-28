export const WagmiConnect = `
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}
`

export const WagmiWrite = `
import { usePrepareContractWrite, useContractWrite  } from 'wagmi'

function WagmiWriteContract() {
  const { config } = usePrepareContractWrite({
    addressOrName: '0x0985DdA74FbF59Cc77766758B97985874464beaB',
    contractInterface: ['function mint()'],
    functionName: 'mint',
  })
  const {write } = useContractWrite(config)
  return (
    <div>
    <button  onClick={() => write()}>
      Mint ERC20 on Mumbai
    </button>
  </div>
  )
}

export default WagmiWriteContract;
`

export const WagmiSign = `
import {useRef} from 'react'
import { useSignMessage } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'

export function SignMessage() {
  const recoveredAddress = useRef()
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data)
      recoveredAddress.current = address
    },
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const message = formData.get('message')
        signMessage({ message })
      }}
    >
      <label htmlFor="message">Enter a message to sign</label>
      <textarea
        id="message"
        name="message"
        placeholder="The quick brown fox…"
      />
      <button disabled={isLoading}>
        {isLoading ? 'Check Wallet' : 'Sign Message'}
      </button>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  )
}
`

export const AlchNft =`
import {useState} from 'react'
import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: '<mumbai-api-key>', 
    network: Network.MATIC_MUMBAI, 
  };
  
  const alchemy = new Alchemy(settings);

function AlchemyNft() {
    const [nfts, setNfts] = useState([])

    const getNftsByAddress = async() => {
       const res = await alchemy.nft.getNftsForOwner("0xE675008913E2655458f69092B107DFCD1A1Eb7f7")
       setNfts(res.ownedNfts)
       console.log(nfts)
    }
   

  return (
    <div>
        <button onClick={getNftsByAddress}>Get NFTs</button>
      {nfts &&  <>
        {nfts.map((d) => (
                        <Nft  key={d.tokenId}>
                            {d.title}
                                    <div>Contract - {d.contract.address}</div>
                                    <div>Token id - {d.tokenId}</div>
                                    <div>Balance - {d.balance}</div>
                                    <div>Type - {d.tokenType}</div>
                                    <div>Uri - {d.tokenUri.gateway}</div>
                                </Nft>
                        ))}
                    </>    }

  </div>
  )
}

`

export const AlchCore = `
import {useState} from 'react'
import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: '<mumbai-api-key>', 
    network: Network.MATIC_MUMBAI, 
  };
  
const alchemy = new Alchemy(settings);

function AlchemyCore() {
    const [block, setBlock] = useState()

    const getBlock = async() => {
       const res = await alchemy.core.getBlockNumber()
       setBlock(res)
    }
   
  return (
    <div>
        <button onClick={getBlock}>Get Block</button>
            {block &&  <>Current block: {block}</> }
  </div>
  )
}

export default AlchemyCore;
`
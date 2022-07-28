import {useState} from 'react'
import { Network, Alchemy } from 'alchemy-sdk';
import styled from 'styled-components'
import ExampleButton from '../buttons/ExampleButton';

const Nft = styled.div`
    color: ${props => props.theme.colors.text_secondary};
    margin-top: 3%;
    border-bottom: 1px solid ${props => props.theme.colors.text_secondary};
`

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: 'wNWkJfnfVMLDtzxM5DXsB3-D424fFVtp', 
    network: Network.MATIC_MUMBAI, 
  };
  
  const alchemy = new Alchemy(settings);

function AlchemyNft() {
    const [nfts, setNfts] = useState([])

    const getNftsByAddress = async() => {
       const res = await alchemy.nft.getNftsForOwner("0xE675008913E2655458f69092B107DFCD1A1Eb7f7")
       setNfts(res.ownedNfts)
    }
   

  return (
    <div>
        <ExampleButton label={'Get NFTs'} click={getNftsByAddress}/>
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

export default AlchemyNft;
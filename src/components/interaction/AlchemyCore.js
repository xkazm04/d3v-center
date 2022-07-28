

import {useState} from 'react'
import { Network, Alchemy } from 'alchemy-sdk';
import ExampleButton from '../buttons/ExampleButton';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: 'wNWkJfnfVMLDtzxM5DXsB3-D424fFVtp', 
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
        <ExampleButton label={'Get block'} click={getBlock}/>
            {block &&  <>Current block: {block}</> }
  </div>
  )
}

export default AlchemyCore;

import { usePrepareContractWrite, useContractWrite  } from 'wagmi'
import ExampleButton from '../buttons/ExampleButton';

function WagmiWriteContract() {
  const { config } = usePrepareContractWrite({
    addressOrName: '0x0985DdA74FbF59Cc77766758B97985874464beaB',
    contractInterface: ['function mint()'],
    functionName: 'mint',
  })
  const {write } = useContractWrite(config)
  return (
    <div>
       <ExampleButton label={'Mint on mumbai'} click={write}/>
  </div>
  )
}

export default WagmiWriteContract;
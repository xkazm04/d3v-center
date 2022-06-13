import {useState} from 'react';
import styled from 'styled-components';
import { Acala, Arbitrum, Avalanche, Binance, Celo, Ethereum, Fantom, Flow, Harmony, Moonbeam , Polygon  } from '../icons/chain';


const Button = styled.button`
    background: transparent;
    transition: 0.1s;
    border-radius: 5px;
    &:hover{
        background: ${props => props.theme.colors.lighter};
    }
`
const width=40;

const EvmSelector = () => {
    const [chain, setChain] = useState('ethereum');

    return (<>
        <>{chain}
            <Button onClick={()=>setChain('Acala')}><Acala width={width}/></Button>
            <Button onClick={()=>setChain('Arbitrum')}><Arbitrum width={width}/></Button>
            <Button onClick={()=>setChain('Avalanche')}><Avalanche width={width}/></Button>
            <Button onClick={()=>setChain('Binance')}><Binance width={width}/></Button>
            <Button onClick={()=>setChain('Celo')}><Celo width={width}/></Button>
            <Button onClick={()=>setChain('Ethereum')}><Ethereum width={width}/></Button>
            <Button onClick={()=>setChain('Fantom')}><Fantom width={width}/></Button>
            <Button onClick={()=>setChain('Flow')}><Flow width={width}/></Button>
            <Button onClick={()=>setChain('Harmony')}><Harmony width={width}/></Button>
            <Button onClick={()=>setChain('Moonbeam')}><Moonbeam width={width}/></Button>
            <Button onClick={()=>setChain('Polygon')}><Polygon width={width}/></Button>
        </>
    
      </>

  );
      }
export default EvmSelector
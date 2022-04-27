
import {useContext, useState} from 'react';
import styled from 'styled-components'
import { FilterContext } from '../../contexts/FilterContext';
import {Solana, Evm} from '../../icons/chain'

const Kontejner = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    display: flex;
    flex-direction: row;
    background: ${props => props.theme.colors.background};
    justify-content: start;
    border-radius: 45px;
    gap: 0.3rem;
    overflow-x: auto;
	  white-space: nowrap; 
      -webkit-overflow-scrolling: touch; /* [3] */
  -ms-overflow-style: -ms-autohiding-scrollbar; /* [4] */ }
`

const Text = styled.div`
    padding-top: 10%;
    font-family: 'Staatliches';
    letter-spacing: 0.1rem;
`

const ChainBox = styled.button`
    background: red;
    padding: 0.1rem;
`

const ChainActiveBox = styled(ChainBox)`
    background: ${props => props.background};
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`


function FilterChain() {
    const {filterChain, setFilterChain} = useContext(FilterContext);

    const handleClick = (newChain) => {
        setFilterChain(newChain)
    }


    return (

                < >
                <Kontejner>

                {filterChain === "??filters[Chain][$notNull]" ? <ChainActiveBox background={'white'} onClick={()=>handleClick("??filters[Chain][$notNull]")}><Wrapper><Evm width={40} height={40}/><Text>All</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("??filters[Chain][$notNull]")}><Wrapper><Evm width={40} height={40}/><Text>All</Text></Wrapper></ChainBox>
   }  

   {filterChain === "?filters[Chain][$startsWith]=evm" ? <ChainActiveBox background={'yellow'} onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>Evm</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>EVM</Text></Wrapper></ChainBox>
   }  

{filterChain === "?filters[Chain][$startsWith]=solana" ? <ChainActiveBox background={'blue'} onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainBox>
   }  


                 </Kontejner>
            </>
    );
}

export default FilterChain;






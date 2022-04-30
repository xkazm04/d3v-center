
import {useContext, useState} from 'react';
import styled from 'styled-components'
import { FilterContext } from '../../contexts/FilterContext';
import {Solana, Evm} from '../../icons/chain'

const Kontejner = styled.div`
    margin-left: 5%;
    display: flex;
    background: ${props => props.theme.colors.background};
    justify-content: start;
    border-radius: 45px;
    gap: 0.3rem;
    overflow-x: auto;
	white-space: nowrap; 
    -webkit-overflow-scrolling: touch; /* [3] */
    -ms-overflow-style: -ms-autohiding-scrollbar; /* [4] */ 
    @media (max-width: 700px) {
    margin-top: 3%;
    margin-bottom: 5%;
  }
`

const BoxAll = styled.div`
    margin-top: 2%;
`

const BoxEvm = styled(BoxAll)`
    margin-top: 1%;
    margin-left: 8%;
`

const Text = styled.div`
    padding-top: 10%;
    font-family: 'Staatliches';
    letter-spacing: 0.1rem;
    @media (max-width: 700px) {
    display: none;
  }
`

const ChainBox = styled.button`
    background: ${props => props.theme.colors.background};
    border: 0.3px solid #FFFFFF;
    box-sizing: border-box;
    min-width: 50px;
    border-radius: 45px;
    transition: 0.1s;
    &:hover{
        background: ${props => props.theme.colors.medium};
    }
    @media (max-width: 700px) {
        min-width: 20px
  }
`

const EvmBox = styled(ChainBox)`
    opacity:${props => props.setOpacity ? 1 : 0.5};
`

const ChainActiveBox = styled(ChainBox)`
    background: ${props => props.background};
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`

const data = {
    all: {id:1,title:"title"},
    solana: {id:2,query: "?filters[Chain][$startsWith]=evm", title:"Solana"},
    evm: {id:3,query: "?filters[Chain][$startsWith]=evm", title: "EVM"}
}

const FilterTitle = styled.div`
    position: absolute;
    font-family: 'NoBill';
    font-size: 20px;
    letter-spacing: 0.1px;
    @media (max-width: 700px) {
    display: none;
  }
`


function FilterChain() {
    const {filterChain, setFilterChain} = useContext(FilterContext);
    const [evmVisibility, setEvmVisibility] = useState(false)



    const handleClick = (newChain) => {
        setFilterChain(newChain);
        setEvmVisibility(false)
    }

    
    const handleEvmClick = (newChain) => {
        setFilterChain(newChain);
        setEvmVisibility(true)
    }

    const IconWrapper = ({title}) => {
        return (
            <Wrapper><Evm width={40} height={40}/><Text>{title}</Text></Wrapper>
        )
    }


    //2. EVM box si pohrát 
    //3. Refactor 
    

// EVM active
    return (

                <Kontejner>    
                    <FilterTitle>Filter results per chain</FilterTitle>
                <BoxAll>
                {filterChain === '??filters[Chain][$notNull]' ? 
        <ChainActiveBox background={'white'} onClick={()=>handleClick('??filters[Chain][$notNull]')}><IconWrapper title={'Solana'}/></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick('??filters[Chain][$notNull]')}><IconWrapper title={'Solana'}/></ChainBox>
   }  


   {filterChain === "?filters[Chain][$startsWith]=evm" ? <ChainActiveBox background={'yellow'} onClick={()=>handleEvmClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>Evm</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleEvmClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>EVM</Text></Wrapper></ChainBox>
   }  

{filterChain === "?filters[Chain][$startsWith]=solana" ? <ChainActiveBox background={'blue'} onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainBox>
   }  
      {filterChain === "?filters[Chain][$startsWith]=evm" ? <ChainActiveBox background={'yellow'} onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>Evm</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>EVM</Text></Wrapper></ChainBox>
   }  

{filterChain === "?filters[Chain][$startsWith]=solana" ? <ChainActiveBox background={'blue'} onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainBox>
   }  
      {filterChain === "?filters[Chain][$startsWith]=evm" ? <ChainActiveBox background={'yellow'} onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>Evm</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>EVM</Text></Wrapper></ChainBox>
   }  

{filterChain === "?filters[Chain][$startsWith]=solana" ? <ChainActiveBox background={'blue'} onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainBox>
   }  
      {filterChain === "?filters[Chain][$startsWith]=evm" ? <ChainActiveBox background={'yellow'} onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>Evm</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>EVM</Text></Wrapper></ChainBox>
   }  

{filterChain === "?filters[Chain][$startsWith]=solana" ? <ChainActiveBox background={'blue'} onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainBox>
   }  
      {filterChain === "?filters[Chain][$startsWith]=evm" ? <ChainActiveBox background={'yellow'} onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>Evm</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>EVM</Text></Wrapper></ChainBox>
   }  

{filterChain === "?filters[Chain][$startsWith]=solana" ? <ChainActiveBox background={'blue'} onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainBox>
   }  
      {filterChain === "?filters[Chain][$startsWith]=evm" ? <ChainActiveBox background={'yellow'} onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>Evm</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>EVM</Text></Wrapper></ChainBox>
   }  

{filterChain === "?filters[Chain][$startsWith]=solana" ? <ChainActiveBox background={'blue'} onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainBox>
   }  


                 </BoxAll>
     {evmVisibility ?  <BoxEvm>
    
            {filterChain === "??filters[Chain][$notNull]" ? <ChainActiveBox background={'white'} onClick={()=>handleClick("??filters[Chain][$notNull]")}><Wrapper><Evm width={40} height={40}/><Text>All</Text></Wrapper></ChainActiveBox> : 
        <EvmBox onClick={()=>handleClick("??filters[Chain][$notNull]")}><Wrapper><Evm width={40} height={40}/><Text>All</Text></Wrapper></EvmBox>
        }  

        {filterChain === "?filters[Chain][$startsWith]=evm" ? <ChainActiveBox background={'yellow'} onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>Evm</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=evm")}><Wrapper><Evm width={40} height={40}/><Text>EVM</Text></Wrapper></ChainBox>
        }  

        {filterChain === "?filters[Chain][$startsWith]=solana" ? <ChainActiveBox background={'blue'} onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainActiveBox> : 
        <ChainBox onClick={()=>handleClick("?filters[Chain][$startsWith]=solana")}><Wrapper><Solana width={40} height={40}/><Text>Solana</Text></Wrapper></ChainBox>
        }  


     </BoxEvm> : null}
            </Kontejner>
    );
}

export default FilterChain;






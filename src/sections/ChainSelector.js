import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Acala, Arbitrum, Astar, Aurora, Avalanche, Binance, Celo, Cronos, Ethereum, Fantom, Harmony, Kava, Klaytn, Moonbeam, Optimism, Polygon } from '../icons/chain';
import { ChainContext } from '../contexts/ChainContext';

const width=40;

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5%;
    background: ${props => props.theme.colors.blackwhite};
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @media (max-width: 1000px) {
      padding-left: 15%;
  }
`

const IconButton = styled.button`
    background: transparent;
    transition: 0.1s;
    border-radius: 5px;
    min-width: 90px;
    font-size: 1.3em;
    box-shadow: 0px 0px 2px 0px ${props => props.theme.colors.lineAlt};
    height: 100px;
    &:hover{
      box-shadow: 0px 0px 6px 0px ${props => props.theme.colors.lineAlt};
  } 
  @media (max-width: 1000px) {
    font-size: 1.1em;
    min-width: 70px;
    height: 70px;
  }
`

const ChainSection = styled.div`
    padding-top: 2%;
    width: 100%;
    align-items: flex-start;
    text-align: left;
    border-right: 0.1px dashed  ${props => props.theme.colors.lineAlt};
`

const SectionTitle = styled.div`
    font-size: 1.6em;
    font-family: 'NoBill';
    color: ${props => props.theme.colors.text_title};
    border-bottom: 0.1px dashed  ${props => props.theme.colors.lineAlt};
    @media (max-width: 1000px) {
        display: none;
  }
`

const Description = styled.p`
  text-align: center;
  font-size: 0.8em;
  color: ${props => props.theme.colors.text_primary};
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
`




const ChainSelector = ({eco}) => {


    const {setBlockchain} = useContext(ChainContext);

    useEffect(() => {
      setBlockchain('Ethereum')
      // eslint-disable-next-line 
  },[])

    return <Kontejner>
       {eco === 'evm' && <> 
              <ChainSection>  
              <SectionTitle>L1 market leaders</SectionTitle>  
              <Flex>
             <FlexRow> <IconButton onClick={()=>setBlockchain('Avalanche')}><Avalanche width={width}/><Description>Avalanche</Description></IconButton></FlexRow>
             <FlexRow> <IconButton onClick={()=>setBlockchain('BNB')}><Binance width={width}/><Description>BNB Chain</Description></IconButton></FlexRow>
             <FlexRow> <IconButton onClick={()=>setBlockchain('Ethereum')}><Ethereum width={width}/><Description>Ethereum</Description></IconButton></FlexRow>
              </Flex>
            </ChainSection>
            <ChainSection>
            <SectionTitle>Scaling  L2</SectionTitle>  
            <Flex>
              <FlexRow><IconButton onClick={()=>setBlockchain('Arbitrum')}><Arbitrum width={width}/><Description>Arbitrum</Description></IconButton></FlexRow>
              <FlexRow><IconButton onClick={()=>setBlockchain('Harmony')}><Harmony width={width}/><Description>Harmony</Description></IconButton></FlexRow>
               <FlexRow><IconButton onClick={()=>setBlockchain('Polygon')}><Polygon width={width}/><Description>Polygon</Description></IconButton></FlexRow>
            </Flex>
            <Flex>
              <FlexRow><IconButton onClick={()=>setBlockchain('Optimism')}><Optimism width={width}/><Description>Optimism</Description></IconButton></FlexRow>
            </Flex>
          </ChainSection>
          <ChainSection>
            <SectionTitle>Polkadot EVM</SectionTitle>  
            <Flex>
               <FlexRow><IconButton onClick={()=>setBlockchain('Acala')}><Acala width={width}/><Description>Acala</Description></IconButton></FlexRow>
               <FlexRow><IconButton onClick={()=>setBlockchain('Astar')}><Astar width={width}/><Description>Astar</Description></IconButton></FlexRow>
               <FlexRow><IconButton onClick={()=>setBlockchain('Moonbeam')}><Moonbeam width={width}/><Description>Moonbeam</Description></IconButton></FlexRow>
            </Flex>
          </ChainSection>
        <ChainSection>
            <SectionTitle>L1 market competitors</SectionTitle>  
              <Flex>
                <FlexRow><IconButton onClick={()=>setBlockchain('Cronos')}><Cronos width={width}/><Description>Cronos</Description></IconButton></FlexRow>
                 <FlexRow><IconButton onClick={()=>setBlockchain('Celo')}><Celo width={width}/><Description>Celo</Description></IconButton></FlexRow>
                 <FlexRow><IconButton onClick={()=>setBlockchain('Fantom')}><Fantom width={width}/><Description>Fantom</Description></IconButton></FlexRow>
              </Flex>
        </ChainSection>
        <ChainSection>
            <SectionTitle>Rising stars</SectionTitle>  
              <Flex>
                <FlexRow><IconButton onClick={()=>setBlockchain('Aurora')}><Aurora width={width} /><Description>Aurora</Description></IconButton></FlexRow>
                <FlexRow><IconButton onClick={()=>setBlockchain('Kava')}><Kava height={width}/><Description>Kava</Description></IconButton></FlexRow>
                <FlexRow><IconButton onClick={()=>setBlockchain('Klaytn')}><Klaytn width={width}/><Description>Klaytn</Description></IconButton></FlexRow>
              </Flex>
        </ChainSection>
             </>}    
    </Kontejner>
}


export default ChainSelector;
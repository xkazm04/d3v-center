import {Modal } from 'rsuite';
import { useState } from 'react';
import styled from 'styled-components';
import { InfoIcon } from '../icons/utils';
import { Acala, Arbitrum, Avalanche, Binance, Celo, Ethereum, Fantom, Flow, Harmony, Moonbeam, Polygon  } from '../icons/chain';

const width=40;

const Kontejner = styled.div`
    z-index: 40;
    padding: 2%;
   
`

const MyButton = styled.button`
    background: transparent;
    position: absolute;
    right: 0;
`


const IconButton = styled.button`
    background: transparent;
    transition: 0.1s;
    border-radius: 5px;
    &:hover{
        background: ${props => props.theme.colors.lighter};
    }
`

const ModalBody = styled.div`
    margin-top: 5%;
    margin-bottom: 5%;
    background: '#F9F9F9';
`

const Flex = styled.div`
  display: flex;
  border-top: 1px solid #E6E6E6;
`

const FlexBetween = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: start;
`

const ConfigBox = styled.div`
    padding: 5%;
`

const ReviewBox = styled.div`
  padding: 5%;
`

const Title = styled.div`
  min-width: 100px;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
`

const MiniTitle = styled.div`
  font-size: 0.8em;
  font-style: italic;
  font-family: 'Staatliches';
  color: ${props => props.color};
  letter-spacing: 1.2px;
`
const ModalTite = styled(Modal.Title)`
    font-family: 'NoBill';
    letter-spacing: 1.2px;
    font-size: 1.2em;
    padding-left: 2%;
`

const Perk = styled.p`
   font-size: 1em;
`
const Pro = styled.p`
  font-size: 1em;
`
const Con = styled.p`
  font-size: 1em;
`

const ChainModal = ({chain}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dex = ''
    const perk = ''
    const pros = ''
    const cons = ''
    const config = ''

    // Vzít data z kontextu, upravit array a hodit sem 

    const [ch, setChain] = useState('ethererum');
    return <Kontejner>
    
        <MyButton onClick={handleOpen}> <InfoIcon width={20}/></MyButton>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <ModalTite>{ch}</ModalTite>
        </Modal.Header>
        <ModalBody>

       {chain === 'evm' && <> 
        <IconButton onClick={()=>setChain('Acala')}><Acala width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Arbitrum')}><Arbitrum width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Avalanche')}><Avalanche width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Binance')}><Binance width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Celo')}><Celo width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Ethereum')}><Ethereum width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Fantom')}><Fantom width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Flow')}><Flow width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Harmony')}><Harmony width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Moonbeam')}><Moonbeam width={width}/></IconButton>
            <IconButton onClick={()=>setChain('Polygon')}><Polygon width={width}/></IconButton> </>}    
        <Flex>    

        <ConfigBox>
            <FlexBetween><Title>TVL:</Title><Title>{dex}</Title></FlexBetween>
              <FlexBetween><Title>Main dex:</Title><Title>{dex}</Title></FlexBetween>
              <FlexBetween><a link href={config}>Docs</a></FlexBetween>
         
              </ConfigBox>
              <ReviewBox>

            <FlexColumn><MiniTitle >Perk</MiniTitle> <Perk>{perk}</Perk></FlexColumn> 
            <FlexColumn><MiniTitle color={'#007134'}>Pros</MiniTitle> <Pro>{pros}</Pro></FlexColumn> 
            <FlexColumn><MiniTitle color={'#C60000'}>Cons</MiniTitle> <Con>{cons}</Con></FlexColumn> 
            </ReviewBox>
           </Flex>

        </ModalBody>
      </Modal>
    </Kontejner>
}


export default ChainModal;
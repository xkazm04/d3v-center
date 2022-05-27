import {Modal, Button } from 'rsuite';
import { useState } from 'react';
import styled from 'styled-components';
import { InfoIcon } from '../../icons/utils';
import { Acala, Algorand, Arbitrum, Avalanche, Binance, Cardano, Celo, Cosmos, Elrond, Ethereum, Fantom, Flow, Harmony, Mina, Moonbeam, Polkadot , Polygon, Solana, Tezos, Ziliqa  } from '../../icons/chain';

const Kontejner = styled.div`
    z-index: 40;
    padding: 2%;
   
`

const MyButton = styled.button`
    background: transparent;
`

const ModalBody = styled.div`
    margin-top: 5%;
    margin-bottom: 5%;
    background: '#F9F9F9';
`

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
`

const FlexBetween = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: start;
`

const IconBox = styled.div`
  padding: 5%;
  @media (max-width: 700px) {
    display: none;
  }
`
const ConfigBox = styled.div`
    border: 1px solid #C9C9C9;
    padding: 2%;
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
const Perk = styled.p`
   font-size: 1em;
`
const Pro = styled.p`
  font-size: 1em;
`
const Con = styled.p`
  font-size: 1em;
`

const ChainModal = ({chain, dex, perk, pros, cons, config}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Vzít data z kontextu, upravit array a hodit sem 


    return <Kontejner>
    
        <MyButton onClick={handleOpen}> <InfoIcon width={'15'}/></MyButton>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{chain}</Modal.Title>
        </Modal.Header>
        <ModalBody>
        <Flex>    
        <IconBox>  
            {chain === 'Acala' && <Acala width={100}/>}
            {chain === 'Algorand' && <Algorand width={100}/>}
            {chain === 'Arbitrum' && <Arbitrum width={100}/>}
            {chain === 'Avalanche' && <Avalanche width={100}/>}
            {chain === 'Binance' && <Binance width={100}/>}
            {chain === 'Cardano' && <Cardano width={100}/>}
            {chain === 'Celo' && <Celo width={100}/>}
            {chain === 'Cosmos' && <Cosmos width={100}/>}
            {chain === 'Elrond' && <Elrond width={100}/>}
            {chain === 'Ethereum' && <Ethereum width={100}/>}
            {chain === 'Fantom' && <Fantom width={100}/>}
            {chain === 'Flow' && <Flow width={100}/>}
            {chain === 'Harmony' && <Harmony width={100}/>}
            {chain === 'Mina' && <Mina width={100}/>}
            {chain === 'Moonbeam' && <Moonbeam width={100}/>}
            {chain === 'Polkadot' && <Polkadot width={100}/>}
            {chain === 'Polygon' && <Polygon width={100}/>}
            {chain === 'Solana' && <Solana width={100}/>}
            {chain === 'Tezos' && <Tezos width={100}/>}
            {chain === 'Ziliqa' && <Ziliqa width={100}/>}
        </IconBox> 
        <ConfigBox>
            <FlexBetween><Title>TVL:</Title><Title>{dex}</Title></FlexBetween>
              <FlexBetween><Title>Main dex:</Title><Title>{dex}</Title></FlexBetween>
              <FlexBetween><a link href={config}>Docs</a></FlexBetween>
         
              </ConfigBox>
           </Flex>
           <ReviewBox>

           <FlexColumn><MiniTitle >Perk</MiniTitle> <Perk>{perk}</Perk></FlexColumn> 
           <FlexColumn><MiniTitle color={'#007134'}>Pros</MiniTitle> <Pro>{pros}</Pro></FlexColumn> 
           <FlexColumn><MiniTitle color={'#C60000'}>Cons</MiniTitle> <Con>{cons}</Con></FlexColumn> 

           </ReviewBox>
        </ModalBody>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Kontejner>
}


export default ChainModal;
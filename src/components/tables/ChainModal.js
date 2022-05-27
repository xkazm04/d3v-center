import {Modal, Button } from 'rsuite';
import { useState } from 'react';
import styled from 'styled-components';
import { InfoIcon } from '../../icons/utils';

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
`

const FlexBetween = styled(Flex)`
  justify-content: space-between;
`

const IntroBox = styled.div`
  border: 1px solid #C9C9C9;
  padding: 5%;
`

const ApiBox = styled.div`
  border: 1px solid #C9C9C9;
  padding: 5%;
`

const ConfigBox = styled.div`
    border: 1px solid #C9C9C9;
    padding: 5%;
`

const ReviewBox = styled.div`
  border: 1px solid #C9C9C9;
  padding: 5%;
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
          <IntroBox>Name and Icon </IntroBox>   
          <div>
          <ApiBox>API data container</ApiBox>
          <ConfigBox>
          <FlexBetween>Main dex<p>{dex}</p></FlexBetween>
              <FlexBetween><a link href={config}>Docs</a></FlexBetween>
          </ConfigBox>
          </div>
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
import { useState } from 'react';
import {Popover, Whisper, Button} from 'rsuite'
import styled from 'styled-components'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { CheckIcon } from '../../icons/utils';



const MyButton = styled(Button)`
    background: ${props => props.theme.colors.light};
border-radius: 15px;
font-family: 'Courier';
font-weight: 700;
font-size: 18px;
letter-spacing: 1px;
color: ${props => props.theme.colors.text_primary};
transition: 0.1s;
`


const Message = styled.div`
    font-style: italic;
font-weight: 400;
font-size: 1.2em;
line-height: 131.5%;
letter-spacing: 0.07em;
color: ${props => props.theme.colors.text_secondary};
font-weight: 400;
background: ${props => props.theme.colors.medium};
padding: 2%;
border-radius: 15px;
margin-bottom: 2%;
`

const Address = styled.div`
border-bottom: 1px solid #ECECEC;
letter-spacing: 0.07em;
font-size: 13px;
`
const Flex = styled.div`
    display: flex;
`

const MyWhisper = styled(Popover)`
    width: 40%;
    color: ${props => props.theme.colors.text_secondary};
    background: ${props => props.theme.colors.light};
`


const AddressButton = styled.button`
    border-radius: 15px;
    background: ${props => props.theme.colors.medium};
    font-size: 11px;
    transition: 0.1s;
    letter-spacing: 0.04em;
    color: ${props => props.theme.colors.text_primary};
    &:hover{
        background: ${props => props.theme.colors.green};
    }
`

const ChainText = styled.div`
    font-family: 'Helvetica';
    color: ${props => props.theme.colors.text_title};
    letter-spacing: 0.01em;
`

const Box = styled.div`
    margin-right: 30%;
    display: flex;
    color: ${props => props.color};
`

const CheckBox = () => {
    return <Box>
        <CheckIcon width='20' height='20' color={'green'} />Copied
    </Box>
}

function DonateButton() {

    const [evmCopied,setEvmCopied] = useState(false);
    const [solCopied,setSolCopied] = useState(false);
    const [atomCopied,setAtomCopied] = useState(false);
    const [polkaCopied,setPolkaCopied] = useState(false);

    const handleEvmCopied = () => {
        setEvmCopied(true);
        setSolCopied(false);
        setAtomCopied(false);
        setPolkaCopied(false);
    }

    const handleSolCopied = () => {
        setEvmCopied(false);
        setSolCopied(true);
        setAtomCopied(false);
        setPolkaCopied(false);
    }

    const handleAtomCopied = () => {
        setEvmCopied(false);
        setSolCopied(false);
        setAtomCopied(true);
        setPolkaCopied(false);
    }

    const handlePolkaCopied = () => {
        setEvmCopied(false);
        setSolCopied(false);
        setAtomCopied(false);
        setPolkaCopied(true);
    }

    const speaker =
    <MyWhisper>
            <Message>Found it useful? Help me improve the app by sending any kind of <b>donation</b> to one of my addresses and I will acquire advanced content, project insights and better UI</Message>
            <Address><ChainText>Any EVM chain: <b>Polygon, Avax, Fantom, BSC, Eth</b>ereum,...</ChainText> 
            <Flex>    <CopyToClipboard text={'0xa0a39c5823A51184043655711C8157ef4826447a'} onCopy={handleEvmCopied}><AddressButton>0xa0a39c5823A51184043655711C8157ef4826447a</AddressButton></CopyToClipboard>
                {evmCopied &&  <CheckBox/>}</Flex>
            </Address>
            <Address><ChainText><b>Solana</b></ChainText> 
            <Flex>    <CopyToClipboard text={'BA78aSwD4f9TTewpP2D32m6M54scjCFbsJjEqK4bSFvK'} onCopy={handleSolCopied}><AddressButton>BA78aSwD4f9TTewpP2D32m6M54scjCFbsJjEqK4bSFvK</AddressButton></CopyToClipboard>
                {solCopied &&  <CheckBox/>}</Flex>
            </Address>
            <Address><ChainText><b>Polkadot</b></ChainText> 
            <Flex>    <CopyToClipboard text={'23YnwTyjmGqXrpefzhx56Sr5n1qWM4DcMe7yhmt7MQzdtPtm'} onCopy={handlePolkaCopied}><AddressButton>23YnwTyjmGqXrpefzhx56Sr5n1qWM4DcMe7yhmt7MQzdtPtm</AddressButton></CopyToClipboard>
                {polkaCopied && <CheckBox/>}</Flex>
            </Address>
            <Address><ChainText><b>Cosmos</b></ChainText> 
               <Flex> <CopyToClipboard text={'cosmos1tplpjnv5xju0ajn2zqq4v6959wvqpg3dmte3uz'} onCopy={handleAtomCopied}><AddressButton>cosmos1tplpjnv5xju0ajn2zqq4v6959wvqpg3dmte3uz</AddressButton></CopyToClipboard>
                {atomCopied && <CheckBox/>}</Flex>
            </Address>
  </MyWhisper>

    return (

                < >
                                <Whisper placement='auto' trigger="click" speaker={speaker}>
                                <MyButton> DONATE</MyButton>
                </Whisper>    
            </>
    );
}

export default DonateButton;






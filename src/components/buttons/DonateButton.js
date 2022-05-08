import { useState } from 'react';
import {Popover, Whisper, Button} from 'rsuite'
import styled from 'styled-components'
import {CopyToClipboard} from 'react-copy-to-clipboard';



const MyButton = styled(Button)`
    background: ${props => props.theme.colors.light};
border-radius: 15px;
font-family: 'Courier';
font-weight: 700;
font-size: 20px;
letter-spacing: 1px;
color: ${props => props.theme.colors.text_primary};
transition: 0.1s;
`


const Message = styled.div`
    font-style: italic;
font-weight: 400;
font-size: 15px;
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
padding: 2%;
`

const MyWhisper = styled(Popover)`
width: 40%;
color: ${props => props.theme.colors.text_secondary};
background: ${props => props.theme.colors.light};
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const AddressButton = styled.button`
    background: red;
`

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
            <Message>Is this app useful? Help me do that full time by sending any kind of <b>donation</b> to one of my addresses and I will ensure deeper content, more chains and high quality</Message>
        <Flex> 
            <Address><div>EVM: BSC, Ethereum, Polygon, ...</div> 
                <CopyToClipboard text={'0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'} onCopy={handleEvmCopied}><AddressButton>0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef</AddressButton></CopyToClipboard>
                {evmCopied && <span>Copied!</span>}
            </Address>
        </Flex>
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






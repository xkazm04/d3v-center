import {Popover, Whisper} from 'rsuite'
import styled from 'styled-components'


const Button = styled.button`
    background: #000000;
border-radius: 15px;
font-family: 'Courier';
font-weight: 400;
font-size: 10px;
letter-spacing: 1px;
color: white;
padding-left: 1%;
padding-right: 1%;
`

const Kontejner = styled.div`
`

const Message = styled.div`
    font-style: italic;
font-weight: 400;
font-size: 10px;
line-height: 131.5%;
letter-spacing: 0.07em;
color: #000000;
font-weight: 400;
background: white;
padding: 2%;
border-radius: 15px;
`

const Address = styled.div`
border-bottom: 1px solid #ECECEC;
padding: 2%;
`

const MyWhisper = styled(Popover)`
    width: 40%;
color: #000000;
background: #DBDBDB;
`

function DonateButton() {

    const speaker =
    <MyWhisper>
        <Kontejner>
            <Message>Is this app useful? Help me do that full time by sending any kind of <b>donation</b> to one of my addresses and I will ensure deeper content, more chains and high quality</Message>
            <Address><div>Title</div><div>Address</div></Address>
            <Address><div>Title</div><div>Address</div></Address>
        </Kontejner>
  </MyWhisper>

    return (

                < >
                                <Whisper placement='auto' trigger="click" speaker={speaker}>
                                <Button> DONATE</Button>
                </Whisper>    
            </>
    );
}

export default DonateButton;






import {Popover, Whisper, IconButton} from 'rsuite'
import styled from 'styled-components'
import { DiscordIcon } from '../../icons/utils'



const MyButton = styled(IconButton)`
    background: inherit;
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
padding: 2%;
border-radius: 15px;
`
const MyWhisper = styled(Popover)`
color: ${props => props.theme.colors.text_secondary};
background: ${props => props.theme.colors.light};;
`

function DiscordButton({color}) {

    const speaker =
    <MyWhisper>
            <Message>Need help? Join <b><a href="https://discord.gg/HnFAKSCD">Discord</a></b> channel and lets start discussion</Message>
  </MyWhisper>

    return (

                < >
                                <Whisper placement='bottomStart' trigger="click" speaker={speaker}>
                                <MyButton icon={<DiscordIcon color={color}/>}/>
                </Whisper>    
            </>
    );
}

export default DiscordButton;






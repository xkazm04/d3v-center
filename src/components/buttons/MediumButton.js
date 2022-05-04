import {Popover, Whisper, IconButton} from 'rsuite'
import styled from 'styled-components'
import { DiscordIcon, MediumIcon } from '../../icons/utils'



const MyButton = styled(IconButton)`
    background: inherit;
border-radius: 15px;
font-family: 'Courier';
font-weight: 700;
font-size: 20px;
margin-right: 3%;
letter-spacing: 1px;
color: ${props => props.theme.colors.text_primary};
transition: 0.1s;
display: none;
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
border-radius: 15px;r
`
const MyWhisper = styled(Popover)`
color: ${props => props.theme.colors.text_secondary};
background: ${props => props.theme.colors.light};;
`

function MediumButton({color}) {

    const speaker =
    <MyWhisper>
            <Message>Something about me</Message>
  </MyWhisper>

    return (

                < >
                                <Whisper placement='bottomStart' trigger="hover" speaker={speaker}>
                                <MyButton icon={<MediumIcon color={color}/>}/>
                </Whisper>    
            </>
    );
}

export default MediumButton;





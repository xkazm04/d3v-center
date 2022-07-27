import {Popover, Whisper, IconButton} from 'rsuite'
import styled, {useTheme} from 'styled-components'
import { LinkedIcon } from '../../icons/main'



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

function ContactButton() {
    const theme = useTheme()

    const speaker =
    <MyWhisper>
         <Message>Found bug or need to talk? Reach me at <a href='https://www.linkedin.com/in/michalkazdan'><b>Linked</b></a></Message>
  </MyWhisper>

    return (

                < >
                    <Whisper placement='bottomStart' trigger="click" speaker={speaker}>
                    <MyButton icon={<LinkedIcon width='30' colorFill={theme.chart.var1_stroke} colorStroke={theme.colors.background}/>}/>
                </Whisper>    
            </>
    );
}

export default ContactButton;






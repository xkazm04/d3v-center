
import {Map} from '../icons/roadmap'
import styled from 'styled-components'

const Kontejner = styled.div`
  margin-top: 2%;
  padding-left: 5%;
`

const BoxTitle = styled.div`
text-align: left;
padding-bottom: 1%;
letter-spacing: 1.5px;
font-family: 'NoBill';
font-size: 2em;
color: ${props => props.theme.colors.text_title};
`
const BoxSubtitle = styled.div`
text-align: left;
letter-spacing: 1.2px;
font-family: 'NoBill';
font-size: 1.5em;
padding-bottom: 1%;
color: ${props => props.theme.colors.text_primary};
`

export default function Roadmap() {
    return <Kontejner>
      <BoxTitle>Roadmap</BoxTitle>
                <BoxSubtitle><a href=''>Q3 - 2022</a></BoxSubtitle>
    <Map color='red' />
    </Kontejner>
  }


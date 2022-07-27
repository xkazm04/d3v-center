import {useState} from 'react'
import AlgoliaToolsAltTable from "../components/tables/AlgoliaToolsAltTable";
import AlgoliaToolsTable from "../components/tables/AlgoliaToolsTable";
import styled from 'styled-components'
import { Divider } from 'rsuite';
import SlitheCheck from '../sections/SlitherCheck';

const Kontejner = styled.div`
  margin-top: 2%;
`

const Button = styled.button`
  font-family: 'Staatliches';
  font-size: 1.4rem;
  margin-top: 1%;
  margin-right: 3px;
  background: ${props => props.theme.colors.medium};
`

const ActButton = styled(Button)`
  background: ${props => props.theme.colors.lightGreen};
  color: ${props => props.theme.colors.text_title};
 
`

const Subtitle = styled.div`
  color: ${props => props.theme.colors.text_seondary};
  font-family: 'Staatliches';
  font-size: 1.4rem;
`




export default function Tools() {
  const [cat, setCat] = useState('List'); // List, Categorical, Slither


    return <Kontejner>
      <Subtitle>Views/Tools</Subtitle>
        {cat === 'List' ? <ActButton>List view</ActButton> : <Button onClick={()=>{setCat('List')}}>List view</Button>}
        {cat === 'Categorical' ? <ActButton>Categorical</ActButton> : <Button onClick={()=>{setCat('Categorical')}}>Categorical</Button>}
        <Divider vertical/>

        {cat === 'Slither' ? <ActButton>Security check</ActButton> : <Button onClick={()=>{setCat('Slither')}}>Security check</Button>}

        {cat === 'List' &&  <AlgoliaToolsTable/> }
        {cat === 'Categorical' &&  <AlgoliaToolsAltTable/> }
        {cat === 'Slither' &&  <SlitheCheck/> }
     
    </Kontejner>;
  }
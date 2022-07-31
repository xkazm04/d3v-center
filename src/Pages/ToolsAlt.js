import {useState} from 'react'
import AlgoliaToolsTable from "../components/tables/AlgoliaToolsTable";
import styled from 'styled-components'
import { Divider } from 'rsuite';
import SlitheCheck from '../sections/SlitherCheck';
import TitleBox from '../sections/TitleBox';
import ToolSection from '../sections/ToolSection';

const Kontejner = styled.div`
  display: flex;
  flex-direction: column;
`


const Head = styled.div`
display: flex;
 margin-top: 2%;
 padding-bottom: 2%;
 padding-left: 10%;
 border-bottom: 1px solid ${props => props.theme.colors.red};
`


const Button = styled.button`
  font-family: 'Staatliches';
  font-size: 1.4em;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 1%;
  margin-right: 10px;
  background: ${props => props.theme.colors.medium};
`

const ActButton = styled(Button)`
  background: ${props => props.theme.colors.lightGreen};
  color: ${props => props.theme.colors.text_title};

`

const Submenu = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  border-radius: 15px;
  padding: 2%;
  background: ${props => props.theme.colors.landingBox};
`


const SubmenuDesc = styled.div`
  font-family: 'Chilanka';
  font-size: 1.6em;
  color: ${props => props.theme.colors.landingTitle};
  margin: 3%;
  font-weight: bold;
`


export default function Tools() {
  const [cat, setCat] = useState('List');


    return <Kontejner>
      <Head>     <TitleBox title='Tools' subtitle='Craft faster with joy'/>
        <Submenu>      
        <SubmenuDesc>Select section</SubmenuDesc>
        <div>
        {cat === 'List' ? <ActButton>List view</ActButton> : <Button onClick={()=>{setCat('List')}}>List view</Button>}
        {cat === 'Categorical' ? <ActButton>Categorical</ActButton> : <Button onClick={()=>{setCat('Categorical')}}>Categorical</Button>}
        <Divider vertical/>
        {cat === 'Slither' ? <ActButton>Security check</ActButton> : <Button onClick={()=>{setCat('Slither')}}>Security check</Button>}
        </div>
      </Submenu>
      </Head>
        {cat === 'List' &&  <AlgoliaToolsTable/> }
        {cat === 'Categorical' &&  <ToolSection/> }
        {cat === 'Slither' &&  <SlitheCheck/> }
    </Kontejner>;
  }
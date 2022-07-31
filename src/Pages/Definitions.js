import styled from 'styled-components'
import {useState} from 'react'
import AlgoliaDefinitionTable from "../components/tables/AlgoliaDefinitionTable";
import TitleBox from '../sections/TitleBox';
import LanguageSection from '../sections/LanguageSection';

const Kontejner = styled.div`
  display: flex;
  flex-direction: column;
`


const Head = styled.div`
  display: flex;
 margin-top: 2%;
 padding-bottom: 2%;
 flex-direction: center;
 text-align: center;
 align-items: center;
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

const SectionDesc = styled(SubmenuDesc)`
  color: ${props => props.theme.colors.text_title};
`


export default function Definitions() {
  const [cat, setCat] = useState('Articles')
    return <Kontejner>
                      <Head><TitleBox title='Definitions' subtitle='Absorb all crypto foundations'/>
              <Submenu>
                <SubmenuDesc>Select section</SubmenuDesc>
                <div>
                {cat === 'Articles' ? <ActButton>Articles</ActButton> : <Button onClick={()=>{setCat('Articles')}}>Articles</Button>}
                {cat === 'Language' ? <ActButton>Language</ActButton> : <Button onClick={()=>{setCat('Language')}}>Language</Button>}
                </div>
              </Submenu>
              {cat === 'Articles' ? <SectionDesc>Database of web3 articles to explore terms</SectionDesc> : <SectionDesc>Solidity cheatsheet</SectionDesc>}
              </Head>  
    
        {cat === 'Articles' && <AlgoliaDefinitionTable/>}
        {cat === 'Language' && <LanguageSection/>}
    
    </Kontejner>;
  }
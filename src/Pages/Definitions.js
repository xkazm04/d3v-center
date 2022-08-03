import styled from 'styled-components'
import {useState} from 'react'
import AlgoliaDefinitionTable from "../components/tables/AlgoliaDefinitionTable";
import TitleBox from '../sections/TitleBox';
import LanguageSection from '../sections/LanguageSection';
import SubnavTitle from '../components/typography/SubnavTitle';
import SubnavDesc from '../components/typography/SubnavDesc';
import SubnavButton from '../components/buttons/SubnavButton';

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
 @media (max-width: 700px) {
       margin: 2px;
       padding: 2px;
  }
`




const Submenu = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  border-radius: 15px;
  padding: 2%;
  background: ${props => props.theme.colors.landingBox};
  @media (max-width: 700px) {
       min-width: 150px;
       width: 100%;
  }
`



export default function Definitions() {
  const [cat, setCat] = useState('Articles')
    return <Kontejner>
                      <Head><TitleBox title='Definitions' subtitle='Absorb all crypto foundations'/>
              <Submenu>
                <SubnavTitle content='Select section'/>
                <div>
                  <SubnavButton phase={cat} item='Articles' setItem={setCat}/>
                  <SubnavButton phase={cat} item='Language' setItem={setCat}/>
                </div>
              </Submenu>
                {cat === 'Articles' ? <SubnavDesc content='Database of web3 articles to explore terms'/> : <SubnavDesc content='Solidity cheatsheet'/>}
              </Head>  
    
        {cat === 'Articles' && <AlgoliaDefinitionTable/>}
        {cat === 'Language' && <LanguageSection/>}
    
    </Kontejner>;
  }
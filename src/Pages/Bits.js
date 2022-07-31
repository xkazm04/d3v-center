import {useState} from 'react';
import AlgoliaBitTable from "../components/tables/AlgoliaBitTable";
import AlgoliaContractTable from "../components/tables/AlgoliaContractTable";
import styled from 'styled-components'
import TitleBox from '../sections/TitleBox';

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

const SectionDesc = styled(SubmenuDesc)`
  color: ${props => props.theme.colors.text_title};
`

export default function Bits() {
  const [repos, setRepos] = useState(true)

    return <Kontejner>
      <Head>     <TitleBox title='Repos' subtitle='Get inspired from the best'/>
        <Submenu>      
        <SubmenuDesc>Select section</SubmenuDesc>
        <div>
          {repos ? <ActButton>Recommended</ActButton> : <Button onClick={()=>{setRepos(true)}}>Recommended</Button>} 
            {repos ? <Button onClick={()=>{setRepos(false)}}>Contract library</Button> : <ActButton>Contract library</ActButton>}
        </div>
      </Submenu>

      {repos ? <SectionDesc>Get inspired from the best</SectionDesc> : <SectionDesc>Get inspired from anyone</SectionDesc>}
      </Head>

        {repos ? <AlgoliaBitTable/> : <AlgoliaContractTable/> } 
    </Kontejner>;
  }
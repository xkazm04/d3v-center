import {useState} from 'react';
import AlgoliaBitTable from "../components/tables/AlgoliaBitTable";
import AlgoliaContractTable from "../components/tables/AlgoliaContractTable";
import styled from 'styled-components'
import TitleBox from '../sections/TitleBox';
import SubnavButton from '../components/buttons/SubnavButton';
import SubnavTitle from '../components/typography/SubnavTitle';
import SubnavDesc from '../components/typography/SubnavDesc';

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
 @media (max-width: 700px) {
       padding: 5px;
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


export default function Bits() {
  const [repos, setRepos] = useState('Recommended')

    return <Kontejner>
      <Head>     <TitleBox title='Repos' subtitle='Get inspired from the best'/>
        <Submenu>      
        <SubnavTitle content='Select section'/>
        <div>
          <SubnavButton phase={repos} item='Recommended' setItem={setRepos}/>
          <SubnavButton phase={repos} item='Contract library' setItem={setRepos}/>
        </div>
      </Submenu>

      {repos === 'Recommended' ? <SubnavDesc content='Get inspired from the best'/> : <SubnavDesc content='Get inspired from anyone'/>}
      </Head>

      {repos === 'Recommended' ?  <AlgoliaBitTable/> : <AlgoliaContractTable/> } 
    </Kontejner>;
  }
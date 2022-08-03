import {useState} from 'react'
import AlgoliaToolsTable from "../components/tables/AlgoliaToolsTable";
import styled from 'styled-components'
import { Divider } from 'rsuite';
import SlitherCheck from '../sections/SlitherCheck';
import TitleBox from '../sections/TitleBox';
import ToolSection from '../sections/ToolSection';
import SubnavTitle from '../components/typography/SubnavTitle';
import SubnavButton from '../components/buttons/SubnavButton';

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
       padding: 2px;
       width: 100%;
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
       width: 100%;
  }
`
export default function Tools() {
  const [cat, setCat] = useState('List');


    return <Kontejner>
      <Head>     <TitleBox title='Tools' subtitle='Craft faster with joy'/>
        <Submenu>      
        <SubnavTitle content='Select section'/>
        <div>
          <SubnavButton phase={cat} item='List view' setItem={setCat}/>
          <SubnavButton phase={cat} item='Categorical' setItem={setCat}/>
          <Divider vertical/>
          <SubnavButton phase={cat} item='Security check' setItem={setCat}/>
        </div>
      </Submenu>
      </Head>
        {cat === 'List view' &&  <AlgoliaToolsTable/> }
        {cat === 'Categorical' &&  <ToolSection/> }
        {cat === 'Security check' &&  <SlitherCheck/> }
    </Kontejner>;
  }
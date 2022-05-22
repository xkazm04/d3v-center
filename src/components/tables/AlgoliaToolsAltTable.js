import {useState} from 'react';
import {   InstantSearch,
    Hits,
    Configure,
    connectMenu ,
    connectSearchBox,
    connectHits ,
    ClearRefinements,
    Stats} from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styled from 'styled-components'
import SearchBox from './SearchBox';

import MenuSelect from './MenuSelect';
import StorageCards from '../hits/StorageCards';
import KnowledgeCards from '../hits/KnowledgeCards';
import DevelopCards from '../hits/DevelopCards';

import MonitorCards from '../hits/MonitorCards';
import DaoCards from '../hits/DaoCards';
import DefiCards from '../hits/DefiCards';
import NftCards from '../hits/NftCards';
import NodeCards from '../hits/NodeCards';

import {  Divider } from 'rsuite';
import LazyLoad from 'react-lazyload';

import { DevelopIcon,StorageIcon,WisdomIcon, DaoIcon, NftIcon, NodeIcon, DefiIcon, MonitorIcon } from '../../icons/tool';


const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILI_URL, 
  process.env.REACT_APP_MEILI_KEY
);

const Kontejner = styled.div`

@media (min-width: 1000px) {
  margin-left: 5%;
}
  @media (min-width: 1800px) {
  margin-right: 10%;
  margin-left: 10%;
}
@media (min-width: 2500px) {
  margin-left: 15%;
}
@media (min-width: 3000px) {
  margin-right: 10%;
  margin-left: 25%;
}

`

const Box = styled.div`
padding-top: 1%;
padding-left: 2%;

`

const BoxTitle = styled.div`
  text-align: left;
  padding-bottom: 1%;
  letter-spacing: 1.3px;
  font-family: 'NoBill';
  font-size: 2em;
  color: ${props => props.theme.colors.text_title};
      @media (max-width: 700px) {
    font-size: 1em;
    padding-left: 2%;
  }

`
const BoxSubtitle = styled.div`
  text-align: left;
  letter-spacing: 1.2px;
  font-family: 'NoBill';
  font-size: 1.5em;
  padding-bottom: 1%;
  color: ${props => props.theme.colors.text_primary};
  @media (max-width: 700px) {
    font-size: 1em;
    padding-left: 2%;
  }
`

const ToolTitle = styled.div`
  display: flex;
  text-align: left;
  letter-spacing: 1.2px;
  font-family: 'NoBill';
  font-size: 1.5em;
  color: ${props => props.theme.colors.text_primary};
  border-bottom: 1px solid ${props => props.theme.colors.line};
  @media (max-width: 700px) {
    font-size: 1em;
    padding-left: 2%;
  } 
`

const MyStats = styled(Stats)`
  text-align: left;
  font-family: 'NoBill';
  font-size: 0.8em;
  padding: 1%;
  margin-left: 20px;
  color: ${props => props.theme.colors.yellow};
  @media (max-width: 700px) {
    margin-left: 0;
  }
`




const MyDivider = styled(Divider)`
  background: ${props => props.theme.colors.lighter};
  @media (max-width: 700px) {
    display: none;
  }
`


const SelectItem = styled.div`
  transition: 0.1s;
  align-items: left;
  text-align: left;
  min-width: ${props => props.width};
  margin-right: 1%;
  @media (max-width: 700px) {
    display: none;
  }
`

const SelectTitle = styled.p`
  font-family: 'NoBill';
  text-align: left;
  font-size: 1.2em;
  padding-left: 10%;
  padding-right: 10%;
  color: ${props => props.theme.colors.text_primary};
  cursor: default;
  &:hover{
    cursor: pointer;
    background: ${props => props.theme.colors.light};
  }
`

const SelectTitleBox = styled.div`
display: flex;
justify-content: space-between;
background: ${props => props.theme.colors.lighter};
margin-bottom: 4px;
box-shadow: 0px 0px 1px 0px ${props => props.theme.colors.text_primary};
&:hover{
    cursor: pointer;
    background: ${props => props.theme.colors.light};
  }
`

const FilterButton = styled.button`
background: ${props => props.theme.colors.background};
transition: 0.1s;
&:hover{
  opacity:0.4;
}
`

const MetaRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`

const FlexFilter = styled(Flex)`
min-height: 50px;
`


const ToolBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2%;
  margin-top: 1%;
ul{
    display: flex;
    flex-wrap: wrap;
}
`

const IconBox = styled.div`
    margin-right: 1%;
`

const Search = styled.div`
 background: ${props => props.theme.colors.background};
 padding-right: 100px;
 @media (max-width: 700px) {
    padding-right: 5px;
    text-align: left;
  }
`



const AlgoliaDefinitionTable = () => {

  const [filterChain, setFilterChain] = useState(true);
  const switchFilterChain = () => {
    setFilterChain(!filterChain);
  }

  const [filterUsage, setFilterUsage] = useState(true);
  const switchFilterUsage = () => {
    setFilterUsage(!filterUsage);
  }




const DebouncedSearchBox = connectSearchBox(SearchBox)
const CustomMenuSelect = connectMenu(MenuSelect);
const KnowledgeHits  = connectHits(KnowledgeCards);
const StorageHits = connectHits(StorageCards);
const DevelopHits = connectHits(DevelopCards);

const DaoHits  = connectHits(DaoCards);
const DefiHits = connectHits(DefiCards);
const MonitorHits = connectHits(MonitorCards);
const NftHits = connectHits(NftCards);
const NodeHits = connectHits(NodeCards);

const SelectFilter = ({title,attribute, width,filterEnabled, clickFunction}) => {
return(
    <SelectItem width={width}> <SelectTitleBox onClick={()=>{clickFunction()}}>   <SelectTitle >{title} 
        </SelectTitle > <FilterButton >
        {filterEnabled ?  <FilterActiveIcon width={'10'} color={'#CB0000'}/> : <FilterIcon width={'10'} color={'#CB0000'}/>}
        </FilterButton></SelectTitleBox> 
        {filterEnabled ? <CustomMenuSelect attribute={attribute} width={width}/>  : null} 
    </SelectItem>
    )
}

return (
  <Kontejner>
               <InstantSearch indexName="tool" searchClient={searchClient}>

          <Flex> 
              <Box><BoxTitle>Tools</BoxTitle>
              <BoxSubtitle>Save your time with effective tooling</BoxSubtitle>
             
              <Configure hitsPerPage={200} />   
              
       <LazyLoad>       <FlexFilter>  
              <Search>     <DebouncedSearchBox delay={500}/>        
              <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search>
              <MyDivider vertical/>
              <SelectFilter title={'Usage'} attribute={'Usage'}  width='120px'  filterEnabled={filterUsage} clickFunction={switchFilterUsage}/> 
              <SelectFilter title={'Chain'} attribute={'Chain'}  width='120px'  filterEnabled={filterChain} clickFunction={switchFilterChain} />

      </FlexFilter></LazyLoad>

      <ToolTitle><LazyLoad><IconBox><DevelopIcon width='20'/></IconBox></LazyLoad>Develop</ToolTitle> <ToolBox> <Hits hitComponent={DevelopHits}  /></ToolBox>
      <ToolTitle><LazyLoad><IconBox><StorageIcon width='20'/></IconBox></LazyLoad>Storage</ToolTitle> <ToolBox> <Hits hitComponent={StorageHits}  /></ToolBox>
      <ToolTitle><LazyLoad><IconBox><WisdomIcon width='20'/></IconBox></LazyLoad>Knowledge</ToolTitle> <ToolBox> <Hits hitComponent={KnowledgeHits}  /></ToolBox>
      <ToolTitle><LazyLoad><IconBox><DaoIcon width='20'/></IconBox></LazyLoad>DAO</ToolTitle> <ToolBox> <Hits hitComponent={DaoHits}  /></ToolBox>
      <ToolTitle><LazyLoad><IconBox><NftIcon width='20'/></IconBox></LazyLoad>NFT</ToolTitle>       <ToolBox> <Hits hitComponent={NftHits}  /></ToolBox>
      <ToolTitle><LazyLoad><IconBox><NodeIcon width='20'/></IconBox></LazyLoad>Node</ToolTitle>       <ToolBox> <Hits hitComponent={NodeHits}  /></ToolBox>
      <ToolTitle><LazyLoad><IconBox><DefiIcon width='20'/></IconBox></LazyLoad>DeFi</ToolTitle>       <ToolBox> <Hits hitComponent={DefiHits}  /></ToolBox>
      <ToolTitle><LazyLoad><IconBox><MonitorIcon width='20'/></IconBox></LazyLoad>Monitor</ToolTitle>       <ToolBox> <Hits hitComponent={MonitorHits}  /></ToolBox>

             </Box>

       </Flex>
  </InstantSearch>
  </Kontejner>
)
}

const FilterIcon = ({width, height}) => {
return <svg width={width} height={height} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.27854 4.04257L7.78941 10.5554C7.81997 10.5915 7.83674 10.6373 7.83674 10.6846V16.332C7.83674 16.4038 7.87519 16.47 7.93751 16.5057L11.2518 18.3995C11.3851 18.4757 11.551 18.3795 11.551 18.2259V10.6794C11.551 10.6353 11.5656 10.5924 11.5925 10.5574L16.6095 4.03532C16.7107 3.9038 16.6169 3.71338 16.451 3.71338H2.43122C2.26095 3.71338 2.16856 3.91258 2.27854 4.04257Z" fill='#0C9682' stroke="#0C9682"/>
<rect x="1.41399" y="14.6313" width="18.8635" height="2.14286" transform="rotate(-45 1.41399 14.6313)" fill="#0C9682" stroke="white"/>
</svg>  
}

const FilterActiveIcon = ({width, height}) => {
return <svg width={width} height={height} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.27854 4.04257L7.78941 10.5554C7.81997 10.5915 7.83674 10.6373 7.83674 10.6846V16.332C7.83674 16.4038 7.87519 16.47 7.93751 16.5057L11.2518 18.3995C11.3851 18.4757 11.551 18.3795 11.551 18.2259V10.6794C11.551 10.6353 11.5656 10.5924 11.5925 10.5574L16.6095 4.03532C16.7107 3.9038 16.6169 3.71338 16.451 3.71338H2.43122C2.26095 3.71338 2.16856 3.91258 2.27854 4.04257Z" fill='red' stroke="#0C9682"/>
<rect x="1.41399" y="14.6313" width="18.8635" height="2.14286" transform="rotate(-45 1.41399 14.6313)" fill="red" stroke="white"/>
</svg>  
}

export default AlgoliaDefinitionTable;
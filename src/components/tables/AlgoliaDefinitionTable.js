import {useState} from 'react';
import {   InstantSearch,
    Hits,
    Pagination,
    Configure,
    connectMenu ,
    Highlight,
    connectSearchBox,
    ClearRefinements,
    Stats} from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styled, {useTheme} from 'styled-components'
import Divider from 'rsuite/Divider';
import axios from 'axios';
import SearchBox from './SearchBox';
import { Cosmos, Elrond, Evm, Near, Polkadot, Solana, Ziliqa } from '../../icons/chain';
import MenuSelect from './MenuSelect';
import { MediumIcon, RustIcon, YTIcon, SolidityIcon, JsIcon, DevToIcon, GithubIcon, WebIcon, PythIcon } from '../../icons/utils';
import { DiffAdvanced, DiffBasic, DiffHacker, DiffScholar } from '../../icons/difficulty';
import LazyLoad from 'react-lazyload';
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
// Algolia styled customization
const MyStats = styled(Stats)`
  text-align: left;
  font-family: 'NoBill';
  font-size: 0.8em;
  padding: 1%;
  margin-left: 20px;
  color: ${props => props.theme.colors.yellow};
  animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  @media (max-width: 700px) {
    margin-left: 0;
  }
`

const HitColumn = styled.div`
  width: ${props => props.width};
  flex-direction: start;
  text-align: left;
  padding-bottom: 2px;
  animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  &:hover{
  font-weight: 700;
}
  @media (max-width: 700px) {
    display: none;
  }
`

const HitMainColumn = styled.div`
width: ${props => props.width};
display: flex;
flex-direction: column;
background: ${props => props.theme.colors.main};
border-radius: 15px;
text-align: left;
padding-left: 2%;
box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
@media (max-width: 700px) {
    margin-left: 0;
    border-radius: 0;
  }
  &:hover{
      background: ${props => props.theme.colors.red};
      cursor: pointer;
  }
`

const HitSeriesColumn = styled(HitColumn)`
  font-size: 12px;
  padding-top: 3%;
  font-family: 'Staatliches';
  animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`


const HitTitle = styled(Highlight)`
  color: ${props => props.theme.colors.text_title};
  font-family: 'auto';
  font-weight: 700;
  font-size: 1.2em;
`

const HitDescription = styled(Highlight)`
  color: ${props => props.theme.colors.text_primary};
  font-family: 'Helvetica';
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.6;
  transition: 0.1s;
  &:hover{
    opacity: 1;
  }
`

const HitSeries = styled(Highlight)`
  font-family: 'NoBill';
  letter-spacing: 1.5px;
  color: ${props => props.theme.colors.text_primary};
  margin-left: 4%;
  padding: 4%;
  transition: 0.2s;
  @media (max-width: 700px) {
    display: none;
  }

`

const HitCategory = styled(Highlight)`
    color: ${props => props.theme.colors.text_primary};
    font-family: 'NoBill';
    font-weight: 500;
    letter-spacing: 1.2px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 10%;
    padding-right: 10%;
    margin-right: 3%;
    border-radius: 15px;
    font-size: 11px;
    background: ${props => props.theme.colors.purple};
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`

const HitSubCategory = styled(HitCategory)`
   background: ${props => props.theme.colors.green};
`

const MyDivider = styled(Divider)`
  background: ${props => props.theme.colors.lighter};
  @media (max-width: 700px) {
    display: none;
  }
`

const RightBox = styled.div`
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
  animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  @media (max-width: 700px) {
    display: none;
  }
`

const MobileItem = styled.div`
    align-items: left;
    text-align: left;
    margin-right: 1%;
    @media (min-width: 700px) {
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

const PaginationTitle = styled.p`
  font-family: 'NoBill';
  text-align: left;
  font-size: 1.2em;
  padding-left: 10%;
  padding-right: 5%;
  color: ${props => props.theme.colors.text_primary};
`

const SelectTitleBox = styled.div`
display: flex;
justify-content: space-between;
background: ${props => props.theme.colors.lighter};
margin-bottom: 2px;
box-shadow: 0px 0px 1px 0px ${props => props.theme.colors.text_primary};
&:hover{
    cursor: pointer;
    background: ${props => props.theme.colors.light};
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

const ResultBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.2px solid ${props => props.theme.colors.light};
  margin-top: 2px;
  transition: 0s;
  margin-bottom: 2px;
`

const HitBox = styled.div`
border-top: 2px solid ${props => props.theme.colors.light};
  @media (min-width: 700px) {
  position: sticky;
  padding: 5px;
}
`

const Search = styled.div`
 background: ${props => props.theme.colors.background};
 padding-right: 100px;
 animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
 @media (max-width: 700px) {
    padding-right: 5px;
    text-align: left;
  }
`

const PaginationBox = styled.div`
  box-shadow: 0px 0px 1px 0px ${props => props.theme.colors.section};
  display: flex;
  flex-direction: row;
  padding-top: 1%;
  color: ${props => props.theme.colors.text_primary};
  height: 50px;
  margin-bottom: 1%;
`

const AbsoluteBox = styled.div`
position: absolute;
`

const Difficulty = styled.div`
display: flex;
flex-direction: row;
font-family: 'NoBill';
gap: 5%;
letter-spacing: 1.5px;
font-size: 0.7rem;
color: ${props => props.theme.colors.yellow};
`



const AlgoliaDefinitionTable = () => {
  const theme = useTheme()

  const [filterSource, setFilterSource] = useState(true);
  const switchFilterSource = () => {
    setFilterSource(!filterSource);
  }

  const [filterSeries, setFilterSeries] = useState(true);
  const switchFilterSeries = () => {
    setFilterSeries(!filterSeries);
  }

  const [filterLang, setFilterLang] = useState(true);
  const switchFilterLang = () => {
    setFilterLang(!filterLang);
  }

  const [filterDifficulty, setFilterDifficulty] = useState(true);
  const switchFilterDifficulty = () => {
    setFilterDifficulty(!filterDifficulty);
  }

  const [filterChain, setFilterChain] = useState(true);
  const switchFilterChain = () => {
    setFilterChain(!filterChain);
  }

  const [filterUsage, setFilterUsage] = useState(true);
  const switchFilterUsage = () => {
    setFilterUsage(!filterUsage);
  }

  const [filterSub, setFilterSub] = useState(true);
  const switchFilterSub = () => {
    setFilterSub(!filterSub);
  }

  const handleResultClick = (reference,id,counter) => {
    window.open(reference, "_blank")
    addCounter(id,counter)
}


  const addCounter = async(tutorialId,viewCounter) => {
      const updatedId = tutorialId.match(/\d+/)[0] // Extract id from string
      console.log(updatedId)
      const token = process.env.REACT_APP_CMS_API // 
      const body = { data: { ViewCounter: viewCounter+1 } }
      const res = await axios.put(`${process.env.REACT_APP_ENVIRONMENT}/api/definitions/${updatedId}`, body, {
          headers: {
            Authorization: `Bearer ${token}`
          },
  })
  console.log(res)
}
const DebouncedSearchBox = connectSearchBox(SearchBox)
const CustomMenuSelect = connectMenu(MenuSelect);

const SelectFilter = ({title,attribute, width,filterEnabled, clickFunction}) => {
return(
<SelectItem width={width}> <SelectTitleBox onClick={()=>{clickFunction()}}>   <SelectTitle >{title} 
{/* <InfoIcon width={'20'} color={'black'}/> */}
</SelectTitle></SelectTitleBox> 
 {filterEnabled ? <CustomMenuSelect attribute={attribute} width={width}/>  : null} 

</SelectItem>
)
}

const MobileSelectFilter = ({title,attribute, width,filterEnabled, clickFunction}) => {
  return(
  <MobileItem> <SelectTitleBox onClick={()=>{clickFunction()}}>   <SelectTitle >{title} 
  </SelectTitle></SelectTitleBox> 
   {filterEnabled ? <CustomMenuSelect attribute={attribute} width={width}/>  : null} 
  
  </MobileItem>
  )
  }
  

function Hit(props) {
 
  return (
    <>

    <ResultBox>
    <HitColumn width={'90px'}>
    { props.hit.Source === "github" ?  <LazyLoad><GithubIcon width={'25'} color={theme.tool.github}/></LazyLoad> : null } 
      { props.hit.Source === "youtube" ?  <LazyLoad><YTIcon width={'25'} color={'#CB0000'}/></LazyLoad> : null } 
      { props.hit.Source === "medium" ?  <LazyLoad><MediumIcon width={'25'}/></LazyLoad> : null }
      { props.hit.Source === "web" ?  <LazyLoad><WebIcon width={'25'} color={theme.colors.text_title}/></LazyLoad> : null }  
      { props.hit.Source === "blog" ?  <LazyLoad><MediumIcon width={'25'}/></LazyLoad> : null }  
      { props.hit.Source === "devto" ?  <LazyLoad><DevToIcon width={'25'}/></LazyLoad> : null } 
  </HitColumn>
      {/* Main part */}
      <Flex>  
      <MyDivider vertical/>
          {/* Left column */}
          <HitColumn width={'130px'}>
              {props.hit.Series === null ? <HitSeriesColumn> </HitSeriesColumn>:  <HitSeriesColumn><HitSeries attribute="Series" hit={props.hit} tagName="strong" /> </HitSeriesColumn>} 
     </HitColumn>
          <MyDivider vertical/>
          {/* Main column*/}
        <HitMainColumn width={'460px'} onClick={()=>{handleResultClick(props.hit.Reference,props.hit.id,props.hit.ViewCounter)}}>  
            <HitTitle attribute="Title" hit={props.hit}  tagName="strong"/>
            <HitDescription attribute="Description" hit={props.hit} tagName="strong" /> 
        </HitMainColumn>
        <MyDivider vertical/>
        <HitColumn width={'80px'}>
          <AbsoluteBox>          
          {props.hit.Language === 'Solidity' ?  <> <LazyLoad><SolidityIcon width='50' height='35' /></LazyLoad></> : null }
              {props.hit.Language === 'Rust' ?  <> <LazyLoad><JsIcon width='50' height='25' /></LazyLoad></> : null }
              {props.hit.Language === 'JavaScript' ?  <> <LazyLoad><RustIcon width='50' height='50' /></LazyLoad></>  : null }
              {props.hit.Language === 'Python' ?  <> <LazyLoad><PythIcon width='50' height='30' /></LazyLoad></>  : null }
        </AbsoluteBox>

        </HitColumn>
        <MyDivider vertical/>
        <HitColumn  width={'120px'}>
        {/* {props.hit.HitDifficulty !== null  ?  <HitDifficulty>{props.hit.Difficulty} </HitDifficulty> : null } */}
        <Difficulty>   
        {props.hit.Difficulty === 'basic' ? <LazyLoad><DiffBasic width={25} color={theme.tool.basic}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'intermediate' ? <LazyLoad><DiffScholar width={25} color={theme.chart.var1_stroke}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'advanced' ? <LazyLoad><DiffAdvanced width={25}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'hacker' ? <LazyLoad><DiffHacker width={25}/></LazyLoad> : null} 
        {props.hit.Difficulty}</Difficulty>
        </HitColumn>
        <MyDivider vertical/>
        <HitColumn  width={'110px'}>
            {props.hit.Usage === null ? null : <HitCategory attribute="Usage" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
        <MyDivider vertical/>
        <HitColumn  width={'110px'}>
           {props.hit.Subcategory === null ? null : <HitSubCategory attribute="Subcategory" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
        <MyDivider vertical/>
      <HitColumn  width={'90px'}>
       <RightBox>
       {props.hit.Chain === 'EVM' ? <LazyLoad><Evm width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Solana' ? <LazyLoad><Solana width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Near' ? <LazyLoad><Near width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Ziliqa' ? <LazyLoad><Ziliqa width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Polkadot' ? <LazyLoad><Polkadot width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Elrond' ? <LazyLoad><Elrond width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Cosmos' ? <LazyLoad><Cosmos width={'25'}/></LazyLoad> : null}
       </RightBox>
       </HitColumn>
       <MyDivider vertical/>
       <HitColumn>
       {props.hit.Update}
       </HitColumn>
      </Flex>

    </ResultBox>
    </>
  );
}



return (
  <Kontejner>
               <InstantSearch indexName="definition" searchClient={searchClient}>
          <Flex>
              <Box> 
              <Configure hitsPerPage={15} />   
              
          <LazyLoad><FlexFilter>  
              <SelectFilter title={'Src'} attribute={'Source'} width='100px' filterEnabled={filterSource} clickFunction={switchFilterSource}/>
              <SelectFilter title={'Series'} attribute={'Series'}  width='150px' filterEnabled={filterSeries} clickFunction={switchFilterSeries}/>
              <Search>     <DebouncedSearchBox delay={500}/>        
              <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search>
              <MyDivider vertical/>
              <SelectFilter title={'Language'} attribute={'Language'}  width='100px'  filterEnabled={filterLang} clickFunction={switchFilterLang}/>
              <SelectFilter title={'Difficulty'} attribute={'Difficulty'}  width='110px'  filterEnabled={filterDifficulty} clickFunction={switchFilterDifficulty}/>
              <MobileSelectFilter title={'Difficulty'} attribute={'Difficulty'}  filterEnabled={filterDifficulty} clickFunction={switchFilterDifficulty}/>
              <SelectFilter title={'Usage'} attribute={'Usage'}  width='130px'  filterEnabled={filterUsage} clickFunction={switchFilterUsage}/> 
              <SelectFilter title={'Subcategory'} attribute={'Subcategory'}  width='120px'  filterEnabled={filterSub} clickFunction={switchFilterSub}/> 
              <SelectFilter title={'Chain'} attribute={'Chain'}  width='90px'  filterEnabled={filterChain} clickFunction={switchFilterChain} />
          
      </FlexFilter></LazyLoad>

              <HitBox> <Hits hitComponent={Hit} /></HitBox>
              {/* <Header title='Definitions'/>
              <HitBox>  <Hits hitComponent={Hit} /></HitBox> */}
          

          <PaginationBox> <PaginationTitle>Page</PaginationTitle><Pagination /></PaginationBox> 

             </Box>

       </Flex>
  </InstantSearch>
  </Kontejner>
)
}


export default AlgoliaDefinitionTable;
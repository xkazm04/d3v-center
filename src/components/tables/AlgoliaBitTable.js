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
import styled from 'styled-components'
import Divider from 'rsuite/Divider';
import SearchBox from './SearchBox';
import MenuSelect from './MenuSelect';
import { RustIcon, SolidityIcon, JsIcon, PythIcon } from '../../icons/utils';
import LazyLoad from 'react-lazyload';

const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILI_URL, 
  process.env.REACT_APP_MEILI_KEY
);

const Kontejner = styled.div`
  z-index: 20;
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

// Algolia styled customization
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

const HitColumn = styled.div`
  width: ${props => props.width};
  flex-direction: start;
  text-align: left;
  padding-bottom: 2px;
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
margin: 2px;
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
  margin-top: 5px;
  padding-bottom: 2px;
  padding-top: 1px;
  padding-left: 10%;
  padding-right: 10%;
  margin-right: 3%;
  border-radius: 15px;
  font-size: 1em;
  background: ${props => props.theme.colors.purple};
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
`

const HitSubCategory = styled(HitCategory)`
    font-size: 0.9em;
    background: ${props => props.theme.colors.search};
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
  @media (min-width: 700px) {
    width: 100%;
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
 padding-right: 110px;
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

const AlgoliaBitTable = () => {

  const [filterLang, setFilterLang] = useState(true);
  const switchFilterLang = () => {
    setFilterLang(!filterLang);
  }

  const [filterDifficulty, setFilterDifficulty] = useState(true);
  const switchFilterDifficulty = () => {
    setFilterDifficulty(!filterDifficulty);
  }


  const [filterUsage, setFilterUsage] = useState(true);
  const switchFilterUsage = () => {
    setFilterUsage(!filterUsage);
  }

  const [filterTool, setFilterTool] = useState(true);
  const switchFilterTool = () => {
    setFilterTool(!filterTool);
  }
const DebouncedSearchBox = connectSearchBox(SearchBox)
const CustomMenuSelect = connectMenu(MenuSelect);

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

const MobileSelectFilter = ({title,attribute, width,filterEnabled, clickFunction}) => {
return(
<MobileItem > <SelectTitleBox onClick={()=>{clickFunction()}}>   <SelectTitle >{title} 
    </SelectTitle > <FilterButton >
    {filterEnabled ?  <FilterActiveIcon width={'10'} color={'#CB0000'}/> : <FilterIcon width={'10'} color={'#CB0000'}/>}
    </FilterButton></SelectTitleBox> 
    {filterEnabled ? <CustomMenuSelect attribute={attribute} width={width}/>  : null} 
</MobileItem>
)
}


function Hit(props) {
  return (
    <>
    <ResultBox>
      <Flex>  
          <HitColumn width={'110px'}>
              {props.hit.usage === null ? <HitSeriesColumn> </HitSeriesColumn>:  <HitSeriesColumn><HitSeries attribute="usage" hit={props.hit} tagName="strong" /> </HitSeriesColumn>} 
         </HitColumn>
          <MyDivider vertical/>
          {/* Main column*/}
        <HitMainColumn width={'430px'}>  
            <HitTitle attribute="title" hit={props.hit}  tagName="strong"/>
            <HitDescription attribute="description" hit={props.hit} tagName="strong" /> 
        </HitMainColumn>
        <MyDivider vertical/>
        <HitColumn width={'110px'}>
          <AbsoluteBox>          
            {props.hit.language === 'Solidity' ?  <> <LazyLoad><SolidityIcon width='50' height='35' /></LazyLoad></> : null }
            {props.hit.language === 'Rust' ?  <> <LazyLoad><JsIcon width='50' height='25' /></LazyLoad></> : null }
            {props.hit.language === 'JavaScript' ?  <> <LazyLoad><RustIcon width='50' height='50' /></LazyLoad></>  : null }
            {props.hit.language === 'Python' ?  <> <LazyLoad><PythIcon width='50' height='30' /></LazyLoad></>  : null }
        </AbsoluteBox>
        </HitColumn>
        <MyDivider vertical/>
        <HitColumn  width={'120px'}>
        {props.hit.category === null ? null : <HitCategory attribute="category" hit={props.hit} tagName="strong" /> }    
        </HitColumn>
        <MyDivider vertical/>
        <HitColumn  width={'150px'}>
       
        {props.hit.subcategory === null ? null : <HitSubCategory attribute="subcategory" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
      </Flex>

    </ResultBox>
    </>
  );
}


return (
  <Kontejner>
               <InstantSearch indexName="repo" searchClient={searchClient}>
               
          <Flex> 
              <Box><BoxTitle>Repos</BoxTitle>
              <BoxSubtitle>Get inspired from the best</BoxSubtitle>

              <Configure hitsPerPage={15} />   
              <LazyLoad><FlexFilter>  
              <SelectFilter title={'Usage'} attribute={'usage'}  width='100px'  filterEnabled={filterTool} clickFunction={switchFilterTool}/>
              <Search>     <DebouncedSearchBox delay={500}/>        
              <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search>
              <SelectFilter title={'Language'} attribute={'language'}  width='130px'  filterEnabled={filterLang} clickFunction={switchFilterLang}/>
              <SelectFilter title={'Category'} attribute={'category'}  width='130px'  filterEnabled={filterDifficulty} clickFunction={switchFilterDifficulty}/>
              <MobileSelectFilter title={'Category'} attribute={'category'}  filterEnabled={filterDifficulty} clickFunction={switchFilterDifficulty}/>
              <SelectFilter title={'Subcategory'} attribute={'subcategory'}  width='150px'  filterEnabled={filterUsage} clickFunction={switchFilterUsage}/> 
              <MobileSelectFilter title={'Subcategory'} attribute={'subcategory'}  filterEnabled={filterDifficulty} clickFunction={switchFilterDifficulty}/>
     
      </FlexFilter></LazyLoad> 
              <HitBox> <Hits hitComponent={Hit} /></HitBox>
          <PaginationBox> <PaginationTitle>Page</PaginationTitle><Pagination /></PaginationBox> 

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

export default AlgoliaBitTable
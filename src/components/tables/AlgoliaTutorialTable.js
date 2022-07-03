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
import BoxTitle from '../typography/BoxTitle';
import BoxSubtitle from '../typography/BoxSubtitle';
import ChartStatsTut from '../charts/ChartStatsTut';
import LoopBox from '../boxes/LoopBox';
import { tutDataFile, tutDefiFile, tutNftFile, tutSecFile } from '../../data/landingCats';

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
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 10%;
    padding-right: 10%;
    margin-right: 3%;
    border-radius: 15px;
    font-size: 11px;
    background: ${props => props.theme.colors.purple};
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
`

const HitSubCategory = styled(HitCategory)`
   background: ${props => props.theme.colors.green};
`

const HitTool = styled(HitCategory)`
     background: ${props => props.theme.colors.blue};
`

const HitUpdate = styled.div`
    width: 80px;
    font-size: 10px;
    color: ${props => props.theme.colors.text_primary};
    &:hover{
      cursor: default;
    }
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


const MobileItem = styled.div`
    align-items: left;
    text-align: left;
    margin-right: 1%;
    @media (min-width: 700px) {
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
    @media (min-width: 700px) {
      width: 100%;
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

const PaginationTitle = styled.p`
    font-family: 'NoBill';
    text-align: left;
    font-size: 1.2em;
    padding-left: 10%;
    padding-right: 5%;
    color: ${props => props.theme.colors.text_primary};
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
   padding-right: 100px;
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

const Head = styled.div`
 display: flex;
 margin-top: 2%;
 margin-bottom: 2%;
`

const HeadTitle = styled.div`
  margin-right: 2%;
`

const HeadChart = styled.div`
  border-left: 1px solid  ${props => props.theme.colors.line};
  padding-left: 2%;
  padding-right: 2%;
  color: ${props => props.theme.colors.text_secondary};
  font-size: 0.8rem;
  @media (max-width: 1000px) {
    display: none;
  }
`

const HeadBackground = styled.div`
  background:  ${props => props.theme.colors.medium};
  border-radius: 15px;
  height: 100%;
  padding: 2%;
`



const AlgoliaTutorialTable = () => {
    const theme = useTheme()
    const [filterSource, setFilterSource] = useState(true);
    const switchFilterSource = () => {
      setFilterSource(!filterSource);
    }
    // Series handlers
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

    const [filterSub, setFilterSub] = useState(true)
    const switchFilterSub = () => {
      setFilterSub(!filterSub);
    }

    const [filterTool, setFilterTool] = useState(true);
    const switchFilterTool = () => {
      setFilterTool(!filterTool);
    }

    const handleResultClick = (reference,id,counter) => {
      window.open(reference, "_blank")
      addCounter(id,counter)
  }


    const addCounter = async(tutorialId,viewCounter) => {
        const updatedId = tutorialId.match(/\d+/)[0] // Extract id from string
        console.log(updatedId)
        const token = process.env.REACT_APP_CMS_API // Master strapi token
        const body = { data: { ViewCounter: viewCounter+1 } }
        const res = await axios.put(`https://d3v-center.herokuapp.com/api/tutorials/${updatedId}`, body, {
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
      <HitColumn width={'80px'}>
      { props.hit.Source === "github" ?  <LazyLoad><GithubIcon width={'25'} color={theme.tool.github}/></LazyLoad> : null } 
      { props.hit.Source === "youtube" ?  <LazyLoad><YTIcon width={'25'} color={'#CB0000'}/></LazyLoad> : null } 
      { props.hit.Source === "medium" ?  <LazyLoad><MediumIcon width={'25'}/></LazyLoad> : null }
      { props.hit.Source === "web" ?  <LazyLoad><WebIcon width={'25'} color={theme.colors.text_title} /></LazyLoad> : null }  
      { props.hit.Source === "blog" ?  <LazyLoad><MediumIcon width={'25'}/></LazyLoad> : null }  
      { props.hit.Source === "devto" ?  <LazyLoad><DevToIcon width={'25'}/></LazyLoad> : null }  
    </HitColumn>
        {/* Main part */}
        <Flex>  
        <MyDivider vertical/>
            {/* Left column */}
            <HitColumn width={'150px'}>
                {props.hit.Series === null ? <HitSeriesColumn> </HitSeriesColumn>:  <HitSeriesColumn><HitSeries attribute="Series" hit={props.hit} tagName="strong" /> </HitSeriesColumn>} 
       </HitColumn>
            <MyDivider vertical/>
            {/* Main column*/}
          <HitMainColumn width={'430px'} onClick={()=>{handleResultClick(props.hit.Reference,props.hit.id,props.hit.ViewCounter)}}>  
              <HitTitle attribute="Title" hit={props.hit}  tagName="strong"/>
              <HitDescription attribute="Description" hit={props.hit} tagName="strong" /> 
          </HitMainColumn>
          <MyDivider vertical/>
          <HitColumn width={'110px'}>
            <AbsoluteBox>         
              {props.hit.Language === 'Solidity' ?  <> <LazyLoad><SolidityIcon width='50' height='35' /></LazyLoad></> : null }
              {props.hit.Language === 'Rust' ?  <> <LazyLoad><JsIcon width='50' height='25' /></LazyLoad></> : null }
              {props.hit.Language === 'JavaScript' ?  <> <LazyLoad><RustIcon width='50' height='50' /></LazyLoad></>  : null }
              {props.hit.Language === 'Python' ?  <> <LazyLoad><PythIcon width='50' height='30' /></LazyLoad></>  : null }
          </AbsoluteBox>

          </HitColumn>
          <MyDivider vertical/>
          <HitColumn  width={'130px'}>
          {/* {props.hit.HitDifficulty !== null  ?  <HitDifficulty>{props.hit.Difficulty} </HitDifficulty> : null } */}
          <Difficulty>   
            {props.hit.Difficulty === 'basic' ? <LazyLoad><DiffBasic width={25} color={theme.tool.basic}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'intermediate' ? <LazyLoad><DiffScholar width={25}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'advanced' ? <LazyLoad><DiffAdvanced width={25}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'hacker' ? <LazyLoad><DiffHacker width={25}/></LazyLoad> : null} 
          {props.hit.Difficulty}</Difficulty>
          </HitColumn>
          <MyDivider vertical/>
          <HitColumn  width={'120px'}>
          {props.hit.Category === null ? null : <HitCategory attribute="Category" hit={props.hit} tagName="strong" /> }    
          </HitColumn>
          <MyDivider vertical/>
          <HitColumn  width={'120px'}>
          {props.hit.Subcategory === null ? null : <HitSubCategory attribute="Subcategory" hit={props.hit} tagName="strong" /> }  
          </HitColumn>
          <MyDivider vertical/>
          <HitColumn  width={'90px'}>
            {props.hit.Tool === null ? null : <HitTool attribute="Tool" hit={props.hit} tagName="strong" />}
          </HitColumn>
          <MyDivider vertical/>
        <HitColumn  width={'120px'}>
         <RightBox>
          {props.hit.Chain === 'evm' ? <LazyLoad><Evm width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'solana' ? <LazyLoad><Solana width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'near' ? <LazyLoad><Near width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'ziliqa' ? <LazyLoad><Ziliqa width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'polkadot' ? <LazyLoad><Polkadot width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'elrond' ? <LazyLoad><Elrond width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'cosmos' ? <LazyLoad><Cosmos width={'25'}/></LazyLoad> : null}
          {/* Update date */}
         <HitUpdate>   {props.hit.Update}</HitUpdate>
         </RightBox>
         </HitColumn>
        </Flex>

      </ResultBox>
      </>
    );
  }



  return (
    <Kontejner>
                 <InstantSearch indexName="tutorial" searchClient={searchClient}>
            <Flex> 
                <Box>
                <Head>
                  <HeadTitle>
                    <BoxTitle content='Tutorials'/>
                    <BoxSubtitle content='Learn from hundreds of tech writers'/>
                  </HeadTitle>
                  <HeadChart>
                  <HeadBackground><ChartStatsTut/></HeadBackground>
                  </HeadChart>
                  <HeadChart>
                    <HeadBackground><LoopBox loop={false} firstFile={tutDefiFile} secondFile={tutNftFile} thirdFile={tutSecFile} fourthFile={tutDataFile}/></HeadBackground>
                  </HeadChart>
                </Head>
                <Configure hitsPerPage={15} />  
                <LazyLoad><FlexFilter>  
                <SelectFilter title={'Src'} attribute={'Source'} width='90px' filterEnabled={filterSource} clickFunction={switchFilterSource}/>
                <SelectFilter title={'Series'} attribute={'Series'}  width='150px' filterEnabled={filterSeries} clickFunction={switchFilterSeries}/>
                <Search>     <DebouncedSearchBox delay={500}/>        
                <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search>
                <MyDivider vertical/>
                <SelectFilter title={'Language'} attribute={'Language'}  width='120px'  filterEnabled={filterLang} clickFunction={switchFilterLang}/>
                <SelectFilter title={'Difficulty'} attribute={'Difficulty'}  width='120px'  filterEnabled={filterDifficulty} clickFunction={switchFilterDifficulty}/>
                <MobileSelectFilter title={'Difficulty'} attribute={'Difficulty'}  filterEnabled={filterDifficulty} clickFunction={switchFilterDifficulty}/>
                <SelectFilter title={'Usage'} attribute={'Category'}  width='130px'  filterEnabled={filterUsage} clickFunction={switchFilterUsage}/> 
                <SelectFilter title={'Subcategory'} attribute={'Subcategory'}  width='130px'  filterEnabled={filterSub} clickFunction={switchFilterSub}/> 
                <SelectFilter title={'Tool'} attribute={'Tool'}  width='100px'  filterEnabled={filterTool} clickFunction={switchFilterTool}/>
                <SelectFilter title={'Chain'} attribute={'Chain'}  width='120px'  filterEnabled={filterChain} clickFunction={switchFilterChain} />
            
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

export default AlgoliaTutorialTable
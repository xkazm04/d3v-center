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
import { MediumIcon, RustIcon, YTIcon, SolidityIcon, JsIcon, DevToIcon, GithubIcon, WebIcon, PythIcon, ExpandIcon, CodeIcon, CloseIcon } from '../../icons/utils';
import { DiffAdvanced, DiffBasic, DiffHacker, DiffScholar } from '../../icons/difficulty';
import LazyLoad from 'react-lazyload';
import BoxTitle from '../typography/BoxTitle';
import BoxSubtitle from '../typography/BoxSubtitle';
import ChartStatsTut from '../charts/ChartStatsTut';
import CodeComponent from '../code/CodeComponent';

  const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL, 
    process.env.REACT_APP_MEILI_KEY
  );

  const Kontejner = styled.div`
    display: flex;
    justify-content: center;
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
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @media (max-width: 700px) {
      display: none;
    }
`

const HitMainColumn = styled.div`
 width: ${props => props.width};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${props => props.theme.colors.main};
  border-radius: 15px;
  text-align: left;
  padding-left: 2%;
  min-width: 400px;
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
  margin: 2px;
  animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  @media (max-width: 700px) {
      margin-left: 0;
      border-radius: 0;
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
    opacity: 1;
    transition: 0.1s;
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

const HitTool = styled(HitCategory)`
     background: ${props => props.theme.colors.blue};
`

const HitUpdate = styled.div`
    width: 80px;
    font-size: 10px;
    color: ${props => props.theme.colors.text_primary};
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

const SelectTitle = styled.p`
    font-family: 'NoBill';
    text-align: left;
    font-size: 1.2em;
    padding-left: 10%;
    padding-right: 10%;
    color: ${props => props.theme.colors.text_primary};
    cursor: default;
  
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
`

const PaginationTitle = styled.p`
    font-family: 'NoBill';
    text-align: left;
    font-size: 1.2em;
    padding-left: 10%;
    padding-right: 5%;
    color: ${props => props.theme.colors.text_primary};
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
    justify-content: flex-start;
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
   padding-right: 50px;
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
  animation: fadeIn 2s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  @media (max-width: 1000px) {
    display: none;
  }
`

const HeadBackground = styled.div`
  background:  ${props => props.theme.colors.medium};
  border-radius: 15px;
  height: 100%;
  padding: 2%;
  animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const CodeBox = styled.div`
  position: absolute;
  background: black;
  margin-top: 10%;
  max-height: 800px;
  overflow-y: scroll;
  z-index: 1;
  right:0;
`

const FilterBox = styled.div`
  padding-top: 10%;
  padding-bottom: 10%;
  border-top: 1px solid ${props => props.theme.colors.lineAlt};
`

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
`

const IconButton = styled.button`
  background: inherit;
  transition: 0.1s;
  opacity: 0.6;
  &:hover{
    opacity: 1;
  }
`

const CloseButton = styled.button`
  position: sticky;
  padding-top: 1%;
  top: 0;
  background: inherit;
  width: 100%;
`


const AlgoliaTutorialTable = () => {
    const theme = useTheme()
    const [code, setCode] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)

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
    const handleCodePreview = async(code) => {
      await setCode(code)
      setPreviewVisible(true)
    }



    const addCounter = async(tutorialId,viewCounter) => {
        const updatedId = tutorialId.match(/\d+/)[0] // Extract id from string
        setCode(tutorialId)
        console.log(updatedId)
        const token = process.env.REACT_APP_CMS_API // Master strapi token
        const body = { data: { ViewCounter: viewCounter+1 } }
        const res = await axios.put(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials/${updatedId}`, body, {
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
  </SelectTitle > </SelectTitleBox> 
   {filterEnabled ? <CustomMenuSelect attribute={attribute} width={width}/>  : null} 
  </SelectItem>
  )
}

// Codebox as modal pop up with close button - Animated component - Rsuite 
// Tool a difficulty spojit
function Hit(props) {
    return (
      <>
      <ResultBox>
      <HitColumn width={'100px'}>
        <FlexColumn>
      { props.hit.Source === "github" ?  <LazyLoad><GithubIcon width={'25'} color={theme.tool.github}/></LazyLoad> : null } 
      { props.hit.Source === "youtube" ?  <LazyLoad><YTIcon width={'25'} color={'#CB0000'}/></LazyLoad> : null } 
      { props.hit.Source === "medium" ?  <LazyLoad><MediumIcon width={'25'}/></LazyLoad> : null }
      { props.hit.Source === "web" ?  <LazyLoad><WebIcon width={'25'} color={theme.colors.text_title} /></LazyLoad> : null }  
      { props.hit.Source === "blog" ?  <LazyLoad><MediumIcon width={'25'}/></LazyLoad> : null }  
      { props.hit.Source === "devto" ?  <LazyLoad><DevToIcon width={'25'}/></LazyLoad> : null }  
      <div>  {props.hit.Series !== null && <HitUpdate>{props.hit.Series}</HitUpdate>}  </div>
      </FlexColumn>
    </HitColumn>
        {/* Main part */}
        <Flex>  
            <MyDivider vertical/>
            <HitColumn width={'110px'}>
              <RightBox>
                <Flex>        
          {props.hit.Chain === 'evm' ? <LazyLoad><Evm width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'solana' ? <LazyLoad><Solana width={'20'}/></LazyLoad> : null}
          {props.hit.Chain === 'near' ? <LazyLoad><Near width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'ziliqa' ? <LazyLoad><Ziliqa width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'polkadot' ? <LazyLoad><Polkadot width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'elrond' ? <LazyLoad><Elrond width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'cosmos' ? <LazyLoad><Cosmos width={'25'}/></LazyLoad> : null}
              {props.hit.Language === 'Solidity' ?  <> <LazyLoad><SolidityIcon width='25' height='25' /></LazyLoad></> : null }
              {props.hit.Language === 'Rust' ?  <> <LazyLoad><RustIcon width='25' height='12' /></LazyLoad></> : null }
              {props.hit.Language === 'JavaScript' ?  <> <LazyLoad><JsIcon width='25' height='25' /></LazyLoad></>  : null }
              {props.hit.Language === 'Python' ?  <> <LazyLoad><PythIcon width='25' height='15' /></LazyLoad></>  : null }
        </Flex> 
         </RightBox>
         <HitUpdate>   {props.hit.Update}</HitUpdate>

          </HitColumn>
            {/* Main column*/}
          <HitMainColumn width={'330px'}>  
            <FlexColumn>
              <HitTitle attribute="Title" hit={props.hit}  tagName="strong"/>
              <HitDescription attribute="Description" hit={props.hit} tagName="strong" /> 
              </FlexColumn>
              <BtnBox>         <IconButton  onClick={()=>{handleResultClick(props.hit.Reference,props.hit.id,props.hit.ViewCounter)}}><ExpandIcon width={15} color={theme.colors.text_primary}/></IconButton>
              {props.hit.codePreview && <IconButton  onClick={()=>{handleCodePreview(props.hit.codePreview)}}><CodeIcon width={15} color={theme.chart.varRed_fill}/></IconButton>}</BtnBox>
          </HitMainColumn>
          <MyDivider vertical/>
          <HitColumn  width={'130px'}>
          <Difficulty>   
            {props.hit.Difficulty === 'basic' ? <LazyLoad><DiffBasic width={25} color={theme.tool.basic}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'intermediate' ? <LazyLoad><DiffScholar width={25} color={theme.chart.var1_stroke}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'advanced' ? <LazyLoad><DiffAdvanced width={25}/></LazyLoad> : null} 
            {props.hit.Difficulty === 'hacker' ? <LazyLoad><DiffHacker width={25}/></LazyLoad> : null} 
          {props.hit.Difficulty}</Difficulty>   
          </HitColumn>
          <MyDivider vertical/>
          <HitColumn  width={'120px'}>
            <FlexColumn>
              {props.hit.Category === null ? null : <HitCategory attribute="Category" hit={props.hit} tagName="strong" /> }    
              {props.hit.Subcategory === null ? null : <HitSubCategory attribute="Subcategory" hit={props.hit} tagName="strong" /> }  
            </FlexColumn>
          </HitColumn>
          <MyDivider vertical/>
          <HitColumn  width={'90px'}>
            {props.hit.Tool === null ? null : <HitTool attribute="Tool" hit={props.hit} tagName="strong" />}
          </HitColumn>
        </Flex>
      </ResultBox>
      </>
    );
  }



  return (

    <Kontejner>
                 {previewVisible && <CodeBox> <CloseButton onClick={()=>{setPreviewVisible(false)}}><CloseIcon width={15} color={"red"}/></CloseButton> <CodeComponent code={code}/></CodeBox>}
            <InstantSearch indexName="tutorial" searchClient={searchClient}>
            <Flex> 
                <Box>
                <Head>
                  <HeadTitle>
                    <BoxTitle content='Tutorials'/>
                    <BoxSubtitle content='Search web3 anything'/>
                  </HeadTitle>
                  <HeadChart>
                  <HeadBackground><ChartStatsTut/></HeadBackground>
                  </HeadChart>
                </Head>
                <Configure hitsPerPage={15} />  
                <LazyLoad><FlexFilter>  
                <SelectFilter title={'Series'} attribute={'Series'}  width='110px' filterEnabled={filterSeries} clickFunction={switchFilterSeries}/>

                <MyDivider vertical/>
                <FlexColumn>
                 <FilterBox><SelectFilter title={'Chain'} attribute={'Chain'}  width='120px'  filterEnabled={filterChain} clickFunction={switchFilterChain} /></FilterBox>
                  <FilterBox><SelectFilter title={'Language'} attribute={'Language'}  width='120px'  filterEnabled={filterLang} clickFunction={switchFilterLang}/></FilterBox>
                </FlexColumn>
              
                <Search>     <DebouncedSearchBox delay={500}/>        
                <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search>
                <SelectFilter title={'Difficulty'} attribute={'Difficulty'}  width='130px'  filterEnabled={filterDifficulty} clickFunction={switchFilterDifficulty}/>
                <FlexColumn>
                  <SelectFilter title={'Usage'} attribute={'Category'}  width='130px'  filterEnabled={filterUsage} clickFunction={switchFilterUsage}/> 
                  <SelectFilter title={'Subcategory'} attribute={'Subcategory'}  width='130px'  filterEnabled={filterSub} clickFunction={switchFilterSub}/> 
                </FlexColumn>

                <SelectFilter title={'Tool'} attribute={'Tool'}  width='100px'  filterEnabled={filterTool} clickFunction={switchFilterTool}/>
     
            
        </FlexFilter></LazyLoad> 

                <HitBox> <Hits hitComponent={Hit} /></HitBox>
            <PaginationBox> <PaginationTitle>Page</PaginationTitle><Pagination /></PaginationBox> 
               </Box>
         </Flex> 
      </InstantSearch>

      </Kontejner>
  )
}


export default AlgoliaTutorialTable
  import {   InstantSearch,
      Hits,
      Pagination,
      Configure,
      MenuSelect,
      Highlight,
      connectSearchBox,
      ClearRefinements,
      Stats} from 'react-instantsearch-dom';
  import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
  import styled from 'styled-components'
  import Divider from 'rsuite/Divider';
  import axios from 'axios';
  import SearchBox from './SearchBox';
import { Evm, Near, Solana, Ziliqa } from '../../icons/chain';
import { MediumIcon, RustIcon, YTIcon, SolidityIcon, JsIcon, DevToIcon, GithubIcon, WebIcon, PythIcon } from '../../icons/utils';

  const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL, 
    process.env.REACT_APP_MEILI_KEY
  );

  const Kontejner = styled.div`
    @media (min-width: 1800px) {
    margin-right: 10%;
    margin-left: 5%;
  }
  @media (min-width: 2500px) {
    margin-right: 10%;
    margin-left: 15%;
  }
  `


  const Box = styled.div`
    padding: 2%;
    padding-top: 1%;
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
    }
  `

// Algolia styled customization
const MyStats = styled(Stats)`
    text-align: left;
    padding-top: 5px;
    margin-left: 5%;
    font-family: 'NoBill';
    color: ${props => props.theme.colors.text_primary};
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
`


const HitTitle = styled(Highlight)`
    color: ${props => props.theme.colors.text_title};
    font-family: 'Helvetica';
    font-weight: 400;
    font-size: 1.1em;
`

const HitDescription = styled(Highlight)`
    color: ${props => props.theme.colors.text_primary};
    font-family: 'Helvetica';
    font-size: 0.7rem;
    font-weight: 500;
`
const HitDifficulty = styled.div`
    font-family: 'NoBill';
    letter-spacing: 1.5px;
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text_primary};
`

const HitSeries = styled(Highlight)`
    font-family: 'NoBill';
    letter-spacing: 1.5px;
    color: ${props => props.theme.colors.text_primary};
    padding-left: 4%;
    @media (max-width: 700px) {
      display: none;
    }
`

const HitCategory = styled(Highlight)`
    color: ${props => props.theme.colors.text_primary};
    font-family: 'Helvetica';
    font-weight: 700;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 5%;
    padding-right: 5%;
    margin-right: 3%;
    border-radius: 15px;
    font-size: 11px;
    background: ${props => props.theme.colors.purple};
`

const HitTool = styled(HitCategory)`
     background: ${props => props.theme.colors.blue};
`

const HitUpdate = styled.div`
    width: 80px;
    font-size: 10px;
    color: ${props => props.theme.colors.text_secondary};

`

const SelectItem = styled.div`
    border-radius: 15px;
    border: solid 0.2px ${props => props.theme.colors.light};
    padding-right: 1%;
    padding-top: 1%;
    padding-left: 1%;
    margin-bottom: 1%;
    transition: 0.1s;
    background: ${props => props.theme.colors.light};
    align-items: left;
    text-align: left;
    &:hover{
        background: ${props => props.theme.colors.medium};
    }
    @media (max-width: 700px) {
      display: none;
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

const SelectTitle = styled.p`
    font-family: 'NoBill';
    text-align: left;
    font-size: 17px;
    padding: 1%;
    color: ${props => props.theme.colors.text_primary};
    cursor: default;
`

const SelectTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 0.2px ${props => props.theme.colors.blue};
  padding-left: 2%;

`

const MyMenuSelect = styled(MenuSelect)`
    color: ${props => props.theme.colors.text_title};
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
 
`

const HitFlex = styled(Flex)`

`


const SearchFlex = styled(Flex)`
    justify-content: space-between;
    padding-right: 1%;
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

    @media (min-width: 700px) {
    position: sticky;
    padding: 5px;
  }
`

const Search = styled.div`
   background: ${props => props.theme.colors.background};
   @media (max-width: 700px) {
    min-width: 50px;
  }
`

const PaginationBox = styled.div`
    background: ${props => props.theme.colors.section};
    display: flex;
    flex-direction: row;
    padding-top: 1%;
    padding-left: 1%;
    color: ${props => props.theme.colors.text_primary};
    height: 50px;
`

const AbsoluteBox = styled.div`
  position: absolute;
`



const AlgoliaTutorialTable = () => {

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

const SelectFilter = ({title,attribute,icon}) => {
  return(
  <SelectItem> <SelectTitleBox><SelectTitle>{title} 
  {/* <InfoIcon width={'20'} color={'black'}/> */}
  </SelectTitle>{icon} </SelectTitleBox> <MyMenuSelect attribute={attribute}/>  </SelectItem>
  )
}

function Hit(props) {
    return (
      <>

      <ResultBox onClick={()=>{handleResultClick(props.hit.Reference,props.hit.id,props.hit.ViewCounter)}}>
      <HitColumn width={'50px'}>
      { props.hit.Source === "github" ? <GithubIcon width={'25'}/> : null } 
      { props.hit.Source === "youtube" ? <YTIcon width={'25'} color={'#CB0000'}/> : null } 
      { props.hit.Source === "medium" ? <MediumIcon width={'25'}/> : null }
      { props.hit.Source === "web" ? <WebIcon width={'25'}/> : null }  
      { props.hit.Source === "blog" ? <MediumIcon width={'25'}/> : null }  
      { props.hit.Source === "devto" ? <DevToIcon width={'25'}/> : null }  
    </HitColumn>
        {/* Main part */}
        <HitFlex>  
        <MyDivider vertical/>
            {/* Left column */}
            <HitColumn width={'150px'}>
                {props.hit.Category === null ? null : <HitCategory attribute="Category" hit={props.hit} tagName="strong" /> }         
                {props.hit.Tool === null ? null : <HitTool attribute="Tool" hit={props.hit} tagName="strong" />}
                {props.hit.Series === null ? <HitSeriesColumn> </HitSeriesColumn>:  <HitSeriesColumn><HitSeries attribute="Series" hit={props.hit} tagName="strong" /> </HitSeriesColumn>} 
       </HitColumn>
            <MyDivider vertical/>
            {/* Main column*/}
          <HitMainColumn width={'450px'}>  
              <HitTitle attribute="Title" hit={props.hit}  tagName="strong"/>
              <HitDescription attribute="Description" hit={props.hit} tagName="strong" /> 
          </HitMainColumn>
          <MyDivider vertical/>
          <HitColumn width={'100px'}>
            <AbsoluteBox>          
              {props.hit.Language === 'Solidity' ?  <><SolidityIcon width='50' height='35' /></> : null }
              {props.hit.Language === 'Rust' ?  <><JsIcon width='50' height='25' /></> : null }
              {props.hit.Language === 'JavaScript' ?  <><RustIcon width='50' height='50' /></>  : null }
              {props.hit.Language === 'Python' ?  <><PythIcon width='50' height='30' /></>  : null }
          </AbsoluteBox>

          </HitColumn>
          <MyDivider vertical/>
          <HitColumn  width={'100px'}>
          {props.hit.HitDifficulty !== null  ?  <HitDifficulty>{props.hit.Difficulty} </HitDifficulty> : null }
          </HitColumn>

        </HitFlex>

        {/* Right part */}
        <HitFlex> 
            {/* Chain images */}
         <RightBox>
          {props.hit.Chain === 'evm' ? <Evm width={'25'}/> : null}
          {props.hit.Chain === 'solana' ? <Solana width={'25'}/> : null}
          {props.hit.Chain === 'near' ? <Near width={'25'}/> : null}
          {props.hit.Chain === 'ziliqa' ? <Ziliqa width={'25'}/> : null}
          {/* Update date */}
         <HitUpdate>   {props.hit.Update}</HitUpdate>
         </RightBox>
           </HitFlex>
      </ResultBox>
      </>
    );
  }



  return (
    <Kontejner>
                 <InstantSearch indexName="tutorial" searchClient={searchClient}>
            <Flex> 
                <Box><BoxTitle>Tutorials</BoxTitle>
                <BoxSubtitle>Learn from 300+ articles</BoxSubtitle>
                <Configure hitsPerPage={20} />   
                <Search>        <Flex>  
                <SelectFilter title={'Series'} attribute={'Series'} />
                <MyDivider vertical/>
                <SelectFilter title={'Ecosystem'} attribute={'Chain'} />
               <MyDivider vertical/>
               <SelectFilter title={'Difficulty'} attribute={'Difficulty'}/>
                <MyDivider vertical/>
                <SelectFilter title={'Usage'} attribute={'Category'}/>
                <MyDivider vertical/>    </Flex> <Flex>
                <SelectFilter title={'Language'} attribute={'Language'}/>
                <MyDivider vertical/>
                <SelectFilter title={'Tool'} attribute={'Tool'}/>
                <MyDivider vertical/> 
                <SelectFilter title={'Source'} attribute={'Source'}/>
                <MyDivider vertical/> <ClearRefinements />
        </Flex>  <SearchFlex><MyStats/><DebouncedSearchBox 
                    delay={500}
                />
                </SearchFlex></Search>
            
                <HitBox> <Hits hitComponent={Hit} /></HitBox>
                {/* <Header title='Definitions'/>
                <HitBox>  <Hits hitComponent={Hit} /></HitBox> */}
            

            <PaginationBox> <SelectTitle>Pagination</SelectTitle><Pagination /></PaginationBox> 

               </Box>

         </Flex>
    </InstantSearch>
    </Kontejner>
  )
}

export default AlgoliaTutorialTable;
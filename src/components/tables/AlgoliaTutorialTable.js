  // Sear

  import { useState } from 'react';
  import {   InstantSearch,
      Hits,
      Pagination,
      Configure,
      MenuSelect,
      Highlight,
      SearchBox,
      ClearRefinements,
      Stats} from 'react-instantsearch-dom';
  import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
  import styled from 'styled-components'
  import Divider from 'rsuite/Divider';
  import axios from 'axios';
import { Evm, Near, Solana, Ziliqa } from '../../icons/chain';
import { MediumIcon, YTIcon } from '../../icons/utils';

  const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL, 
    process.env.REACT_APP_MEILI_KEY
  );

  const Kontejner = styled.div`
    @media (min-width: 1800px) {
    margin-right: 10%;
    margin-left: 10%;
  }
  @media (min-width: 2500px) {
    margin-right: 10%;
    margin-left: 20%;
  }
  `

  const Box = styled.div`
    padding: 4%;
    padding-top: 1%;
    
  `

  const BoxTitle = styled.div`
    text-align: left;
    padding-bottom: 1%;
    letter-spacing: 1.5px;
    font-family: 'NoBill';
    font-size: 2em;
    color: ${props => props.theme.colors.text_title};
  `
  const BoxSubtitle = styled.div`
    text-align: left;
    letter-spacing: 1.2px;
    font-family: 'NoBill';
    font-size: 1.5em;
    padding-bottom: 1%;
    color: ${props => props.theme.colors.text_primary};
  `

// Algolia styled customization
const MyStats = styled(Stats)`
    text-align: left;
    padding-top: 5px;
    padding-left: 1%;
    font-family: 'NoBills';
    color: ${props => props.theme.colors.text_primary};
`

const HitColumn = styled.div`
    width: ${props => props.width};
    flex-direction: start;
    text-align: left;
    padding-bottom: 2px;
`

const HitSeriesColumn = styled(HitColumn)`
    width: 150px;
    font-size: 12px;
`


const HitTitle = styled(Highlight)`
    color: ${props => props.theme.colors.text_title};
    font-family: 'Helvetica';
    font-weight: 700;
    font-size: 1rem;
`

const HitDescription = styled(Highlight)`
    color: ${props => props.theme.colors.text_primary};
    font-family: 'Helvetica';
    font-size: 0.9rem;
    font-weight: 500;
`
const HitDifficulty = styled.div`
    font-family: 'NoBill';
    letter-spacing: 1.5px;
    color: ${props => props.theme.colors.text_primary};
`

const HitLanguage = styled.div`
color: ${props => props.theme.colors.text_title};
      font-weight: 400;
    font-size: 1rem;
`


const HitSeries = styled(Highlight)`
    font-family: 'NoBill';
    letter-spacing: 1.5px;
    color: ${props => props.theme.colors.text_primary};
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
    padding-right: 3%;
    padding-top: 1%;
    padding-left: 1%;
    margin-bottom: 1%;
    transition: 0.1s;
    background: ${props => props.theme.colors.light};
    width: 200px;
    height: 80px;
    align-items: left;
    text-align: left;
    &:hover{
        background: ${props => props.theme.colors.medium};
    }
`

const MyDivider = styled(Divider)`
    background: ${props => props.theme.colors.lighter};
`

const SelectTitle = styled.p`
    
    font-family: 'NoBill';
    text-align: left;
    font-size: 17px;
    margin-bottom: 5%;
    color: ${props => props.theme.colors.text_primary};
    cursor: default;
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
    background: transparent;
`

const ResultBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.2px solid ${props => props.theme.colors.light};
    padding-top: 3px;
    transition: 0.1s;
    &:hover{
        background: ${props => props.theme.colors.red};
        cursor: pointer;
    }
`
const SourceColumn = styled.div`
    position: absolute;
    left:0;
`


const HitBox = styled.div`
    background: ${props => props.theme.colors.lighter};
    border-left: 1px solid ${props => props.theme.colors.line};
    position: sticky;
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



const AlgoliaTable = () => {
    const [searchValue, setSearchValue] = useState('')

    const handleResultClick = (reference,id,counter) => {
        window.open(reference, "_blank")
        addCounter(id,counter)
    }

    const addCounter = async(tutorialId,viewCounter) => {
        const updatedId = tutorialId.match(/\d+/)[0] // Extract id from string
        const token = process.env.REACT_APP_CMS_API // Master strapi token
        const body = { data: { ViewCounter: viewCounter+1 } }
        const res = await axios.put(`https://d3v-center.herokuapp.com/api/tutorials/${updatedId}`, body, {
            headers: {
              Authorization: `Bearer ${token}`
            },
    })
    console.log(res)
}

function Hit(props) {
    return (
      <>
      <SourceColumn>
      { props.hit.Source === "github" ? <MediumIcon width={'20'}/> : null } 
      { props.hit.Source === "youtube" ? <YTIcon width={'25'} color={'#601919'}/> : null } 
      { props.hit.Source === "medium" ? <MediumIcon width={'25'} color={'black'}/> : null } 
    </SourceColumn>
      <ResultBox onClick={()=>{handleResultClick(props.hit.Reference,props.hit.id,props.hit.Counter)}}>
        {/* Main part */}
        <HitFlex onClick={addCounter}>  
        <Divider vertical/>
            {/* Hit series */}
              <HitColumn width={'400px'}>{props.hit.Series === null ? <HitSeriesColumn> </HitSeriesColumn>:  <HitSeriesColumn><HitSeries attribute="Series" hit={props.hit} tagName="mark" /> </HitSeriesColumn>} 
            {/* Hit title */}
              <HitTitle attribute="Title" hit={props.hit}  tagName="mark"/></HitColumn>
              <Divider vertical/>
            {/* Hit description with tags: Use case*/}
          <HitColumn width={'550px'}> 
          <HitSeriesColumn>
                {props.hit.Category === null ? null : <HitCategory attribute="Category" hit={props.hit} tagName="mark" /> }         
                {props.hit.Tool === null ? null : <HitTool attribute="Tool" hit={props.hit} tagName="mark" />}
            </HitSeriesColumn>
          <HitColumn>  <HitDescription attribute="Description" hit={props.hit} tagName="mark" /> </HitColumn></HitColumn>
          <Divider vertical/>
          <HitColumn>
            {props.hit.Difficulty === null ? null :  <HitDifficulty>{props.hit.Difficulty} </HitDifficulty>}
            {props.hit.Language === null ? null :  <HitLanguage>{props.hit.Language} </HitLanguage>}
          </HitColumn>
        </HitFlex>

        {/* Right part */}
        <HitFlex> 
            {/* Chain images */}
         <div>
          {props.hit.Chain === 'evm' ? <Evm width={'25'}/> : null}
          {props.hit.Chain === 'solana' ? <Solana width={'25'}/> : null}
          {props.hit.Chain === 'near' ? <Near width={'25'}/> : null}
          {props.hit.Chain === 'ziliqa' ? <Ziliqa width={'25'}/> : null}
          {/* Update date */}
         <HitUpdate>   {props.hit.Update}</HitUpdate>
         </div>
           </HitFlex>
      </ResultBox>
      </>
    );
  }



 const SetMinimum = (helper) => {
    if (helper.state.query.length < 3) {
        return; 
      }
      helper.search();
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        console.log(searchValue)
    }



  return (
    <Kontejner>
                 <InstantSearch indexName="tutorial" searchClient={searchClient} searchFunction={SetMinimum}>
            <Flex> 
                <Box><BoxTitle>Tutorials</BoxTitle>
                <BoxSubtitle>Subtitle</BoxSubtitle>
                <Configure hitsPerPage={20} />   
                <Search>        <Flex>  
                <SelectItem>   <SelectTitle>Series</SelectTitle><MyMenuSelect attribute='Series'/> </SelectItem>
                <MyDivider vertical/>
               <SelectItem> <SelectTitle>Ecosystem</SelectTitle> <MyMenuSelect attribute='Chain'/>  </SelectItem>
               <MyDivider vertical/>
                <SelectItem> <SelectTitle>Difficulty</SelectTitle>   <MyMenuSelect attribute='Difficulty'/>    </SelectItem>
                <MyDivider vertical/>
                <SelectItem> <SelectTitle>Usage</SelectTitle>   <MyMenuSelect attribute='Category'/>    </SelectItem>
                <MyDivider vertical/>
                <SelectItem> <SelectTitle>Language</SelectTitle>   <MyMenuSelect attribute='Language'/>    </SelectItem>
                <MyDivider vertical/>
              <SelectItem>   <SelectTitle>Tool</SelectTitle><MyMenuSelect attribute='Tool'/> </SelectItem>
                <MyDivider vertical/> 
                <SelectItem> <SelectTitle>Source</SelectTitle> <MyMenuSelect  attribute='Source'/>  </SelectItem>
                <MyDivider vertical/> <ClearRefinements />
        </Flex>  <SearchFlex><MyStats/><SearchBox 
                    onChange={handleChange}
                    defaultRefinement={searchValue} 
                    focusShortcuts={['s']} 
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
  );
}

export default AlgoliaTable;
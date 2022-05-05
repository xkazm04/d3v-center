  // Sear

  import { useState } from 'react';
  import {   InstantSearch,
      Hits,
      Pagination,
      Configure,
      MenuSelect,
      Highlight,
      SearchBox,
      Stats} from 'react-instantsearch-dom';
  import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
  import styled from 'styled-components'
  import Divider from 'rsuite/Divider';
  import { Button } from 'rsuite';
  import axios from 'axios';

  const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL, // HOST
    process.env.REACT_APP_MEILI_KEY
  );

  const Kontejner = styled.div`
    width: 100%;
  `

// Algolia styled customization
const MyStats = styled(Stats)`
    text-align: left;
    padding-left: 2%;
    font-family: 'NoBills';
    color: ${props => props.theme.colors.text_primary};
`

const HitColumn = styled.div`
    width: 400px;
    flex-direction: start;
    text-align: left;
    border-right: 1px solid red;
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
`

const MyHighlight = styled(Highlight)`


    
`
const SelectItem = styled.div`
    padding: 2%;
    border-radius: 15px;
    border: solid 0.2px ${props => props.theme.colors.light};
    transition: 0.1s;
    &:hover{
        background: ${props => props.theme.colors.lighter};
    }
`

const ImageBox = styled.div`
`

const SelectTitle = styled.p`
    margin-left: 2%;
    font-family: 'NoBill';
    font-size: 18px;
    margin-bottom: 10%;
    color: ${props => props.theme.colors.text_primary};
    cursor: default;
`

const MyMenuSelect = styled(MenuSelect)`
    color: ${props => props.theme.colors.text_title};
    margin-left: 1%;
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const HitFlex = styled(Flex)`
    margin-left: 3%;
`


const SearchFlex = styled(Flex)`
    justify-content: space-between;
    background: red;

`

const ResultBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.2px solid ${props => props.theme.colors.light};
    padding-top: 1%;
    transition: 0.1s;
    &:hover{
        background: ${props => props.theme.colors.red};
        cursor: pointer;
    }
`
const SourceColumn = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left:0;
`

const HitBox = styled.div`
    background: ${props => props.theme.colors.lighter};
    border-right: 1px solid ${props => props.theme.colors.line};
    border-left: 1px solid ${props => props.theme.colors.line};
    position: sticky;
`

const Search = styled.div`
   background: ${props => props.theme.colors.background};
   width: 1500px;
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
`

const FilterBox = styled.div`
    width: 100%;
`

const MyButton = styled(Button)`
    width: 100%;
    background:${props => props.theme.colors.red};
    font-family: 'NoBill';
    font-size: 1.5em;
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
      <ResultBox onClick={()=>{handleResultClick(props.hit.Reference,props.hit.id,props.hit.Counter)}}>
          {/* onClick={()=>{handleClickResult(1,2,3)}} */}
          <SourceColumn><ImageBox> 
              { props.hit.Source === "github" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              { props.hit.Source === "youtube" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              { props.hit.Source === "linked" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              { props.hit.Source === "twitter" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              { props.hit.Source === "medium" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              
              </ImageBox> {props.hit.Series} </SourceColumn>
        <HitFlex onClick={addCounter}>  
              <HitColumn>  <HitTitle attribute="Title" hit={props.hit}  tagName="mark"/> </HitColumn>
              <HitColumn>  <HitDescription attribute="Description" hit={props.hit} tagName="mark" /> </HitColumn>
                {/* <HitTitle attributes='Series' hit={props.hit} tagName="mark"/> */}
        </HitFlex>
        <HitFlex> 
          <MyHighlight attribute="Chain" hit={props.hit} tagName="mark" />
        <div>   {props.hit.Update}</div>
           </HitFlex>
      </ResultBox>
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
                <div>
                <Configure hitsPerPage={20} />

                <Search>        <Flex>  
               <SelectItem> <SelectTitle>Ecosystem</SelectTitle> <MyMenuSelect attribute='Chain'/>  </SelectItem>
                <Divider vertical/>
              <SelectItem>   <SelectTitle>Series</SelectTitle><MyMenuSelect attribute='Series'/> </SelectItem>
                <Divider vertical/>
                <SelectItem> <SelectTitle>Category</SelectTitle>   <MyMenuSelect attribute='Category'/>    </SelectItem>
                <Divider vertical/>
                <SelectItem> <SelectTitle>Source</SelectTitle> <MyMenuSelect  attribute='Source'/>  </SelectItem>
                <Divider vertical/>
              <SelectItem>   <SelectTitle>Tool</SelectTitle><MyMenuSelect attribute='Tool'/> </SelectItem>
                <Divider vertical/>
                <SelectItem> <SelectTitle>Language</SelectTitle>   <MyMenuSelect attribute='Language'/>    </SelectItem>
                <Divider vertical/>
                <SelectItem> <SelectTitle>Difficulty</SelectTitle>   <MyMenuSelect attribute='Difficulty'/>    </SelectItem>
        </Flex>  <SearchFlex><div>Title</div><SearchBox 
                    onChange={handleChange}
                    defaultRefinement={searchValue} 
                    focusShortcuts={['s']} 
                />
                </SearchFlex></Search>
              
                <MyStats/>  
                <HitBox> <Hits hitComponent={Hit} /></HitBox>
                {/* <Header title='Definitions'/>
                <HitBox>  <Hits hitComponent={Hit} /></HitBox> */}
            

            <PaginationBox> <SelectTitle>Pagination</SelectTitle><Pagination /></PaginationBox> 

               </div>

         </Flex>
    </InstantSearch>
    </Kontejner>
  );
}

export default AlgoliaTable;
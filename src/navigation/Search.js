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
import { SearchIcon } from '../icons/utils';
import { Button } from 'rsuite';
import axios from 'axios';

const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL, // HOST
    process.env.REACT_APP_MEILI_KEY
  );

  const Kontejner = styled.div`
    margin-right: 10%;
    position: absolute;
    right: 0;
    margin-top: 1%;
    z-index: 100;
    background: ${props => props.theme.colors.blackwhite};
`

// Algolia styled customization
const MyStats = styled(Stats)`
    text-align: left;
    padding-left: 2%;
    font-family: 'NoBills';
    color: ${props => props.theme.colors.text_primary};
`

const HitTitle = styled(Highlight)`
    color: ${props => props.theme.colors.text_title};
    font-family: 'NoBill';
    letter-spacing: 0.1rem;
    font-size: 1rem;
`

const HitDescription = styled(Highlight)`
    color: ${props => props.theme.colors.text_primary};
    font-family: 'Helvetica';
`

const MyHighlight = styled(Highlight)`
`


const SelectBox = styled.div`
    display: flex;
    position: absolute;
    right: -150px;
    z-index: 250;
    flex-direction: column;
    margin: 2%;
    background: white;
    opacity: ${props => props.opacity};
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
    margin-top: 10%;
`

const SelectTitle = styled.p`
    margin-left: 1%;
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

const TitleFlex = styled(Flex)`
    display: flex;
    flex-direction: row;
`

const SearchFlex = styled(Flex)`
    padding-left: 2%;
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
const FlexColumn = styled.div`
    text-align: left;
    display: flex;
    flex-direction: Column;
    padding-left: 10%;
`

const SourceColumn = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left:0;
    margin-left: 2%;
`

const HitBox = styled.div`
    background: ${props => props.theme.colors.lighter};
    padding: 1%;
    border-right: 1px solid ${props => props.theme.colors.line};
    border-left: 1px solid ${props => props.theme.colors.line};
    position: sticky;
`

const Search = styled.div`
   background: ${props => props.theme.colors.background};
   min-width: 800px;
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


const TitleBox = styled.div`
    display: flex;
    align-items: flex-start;
    font-family: 'Staatliches';
    color: ${props => props.theme.colors.text_primary};
    background: ${props => props.theme.colors.section};
    font-size: 1.5em;
    padding-left: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
    z-index: 99;
    letter-spacing: 1px;
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




function MeiliSearch() {

    const [searchValue, setSearchValue] = useState('Press S to search')
    const [selectOpacity, setSelectOpacity] = useState(0)

    const toggleSelectOpacity = () => {
        if (selectOpacity === 0){
            setSelectOpacity(1)
        } else{
            setSelectOpacity(0)
        }
    }

    const Header = ({title}) => {
        return <TitleBox>{title}</TitleBox>
          
    }

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
      <ResultBox onClick={()=>{handleResultClick(props.hit.Reference,props.hit.id,props.hit.ViewCounter)}}>
          {/* onClick={()=>{handleClickResult(1,2,3)}} */}
          <SourceColumn><ImageBox> 
              { props.hit.Source === "github" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              { props.hit.Source === "youtube" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              { props.hit.Source === "linked" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              { props.hit.Source === "twitter" ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              { props.hit.Source === "..." ? <img src={props.hit.Source} width="40" height="40"/> : null } 
              
              </ImageBox>  <div>{props.hit.id}</div> </SourceColumn>
        <FlexColumn>  
                <HitTitle attribute="Title" hit={props.hit}  tagName="mark"/> 
                <HitDescription attribute="Description" hit={props.hit} tagName="mark" />
                {props.hit.id} Series
        </FlexColumn>
        <FlexColumn> 
          <MyHighlight attribute="Chain" hit={props.hit} tagName="mark" />
        <div>  {props.hit.id}</div>
        <div>   {props.hit.Update}</div>
           </FlexColumn>
      </ResultBox>
    );
  }

  const ResetValue = () => {
      setSearchValue('Press S to search')
      console.log(searchValue)
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
  
    const renderSelectMenu = () => {
        return <>
        <SelectBox opacity={selectOpacity}>  
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
        </SelectBox></>
    }
  // Search na click smazat state,
    return (
        <Kontejner>
            <InstantSearch indexName="tutorial" searchClient={searchClient} searchFunction={SetMinimum}>
            <Flex>
                <div>
                <Configure hitsPerPage={10} />

                {/* <Index indexName="bit">
      <h2>Multiple indexes search</h2>
      <HitBox> <Hits hitComponent={Hit} /></HitBox>
    </Index> */}

                <Search><SearchFlex><SearchBox 
                    onChange={handleChange}
                    onReset={ResetValue}
                    onClick={ResetValue}
                    defaultRefinement={searchValue} 
                    focusShortcuts={['s']} 
                    min
                />
                </SearchFlex></Search>

                {searchValue === 'Press S to search' || searchValue === '' ? null : <div>
                <FilterBox><MyButton onClick={toggleSelectOpacity}>Filter</MyButton></FilterBox>
                {renderSelectMenu()}  
                <Header title='Tutorials'/>

                <MyStats/>  
                <HitBox> <Hits hitComponent={Hit} /></HitBox>
                {/* <Header title='Definitions'/>
                <HitBox>  <Hits hitComponent={Hit} /></HitBox> */}
            

            <PaginationBox> <SelectTitle>Pagination</SelectTitle><Pagination /></PaginationBox>
              </div> }  

               </div>

         </Flex>
    </InstantSearch>
        </Kontejner>
    );
}

export default MeiliSearch;
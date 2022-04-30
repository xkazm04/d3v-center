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
    border-left: 0.2px solid ${props => props.theme.colors.medium};
`

// Algolia styled customization
const MyStats = styled(Stats)`
    text-align: left;
    padding-left: 2%;
    font-family: 'NoBills';
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
    margin: 2%;
`

const ImageBox = styled.div`
    margin-top: 10%;
`

const SelectTitle = styled.p`
    margin-left: 2%;
`

const MyMenuSelect = styled(MenuSelect)`
    color: #302F35;
    margin-left: 2%;
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const SearchFlex = styled(Flex)`
    padding-left: 2%;
`

const ResultBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.2px solid ${props => props.theme.colors.medium};
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
`


const TitleBox = styled.div`
    display: flex;
    align-items: flex-start;
    font-family: 'Staatliches';
    color: #007463;
    background: ${props => props.theme.colors.section};
    font-size: 1.5em;
    padding-left: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
    z-index: 99;
    letter-spacing: 1px;
`

const Header = ({title}) => {
    return <TitleBox>{title}</TitleBox>
}


function MeiliSearch() {

    const [searchValue, setSearchValue] = useState('Press S to search')

    // Rsuite whisper tam zkusit narvat

function Hit(props) {
    return (
      <ResultBox onClick={()=> window.open(props.hit.Reference, "_blank")}>
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
  
  // Search na click smazat state,
    return (
        <Kontejner>
            <InstantSearch indexName="bit" searchClient={searchClient} searchFunction={SetMinimum}>
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
                {searchValue === 'Press S to search' || searchValue === '' ? null : <div><Header title='Tutorials'/>
                <MyStats/>
                <HitBox> <Hits hitComponent={Hit} /></HitBox>
                <Header title='Definitions'/>
                <HitBox>  <Hits hitComponent={Hit} /></HitBox>
               <PaginationBox> <Pagination /></PaginationBox>
            <SelectBox>  
                    <SelectTitle>Ecosystem</SelectTitle> <MyMenuSelect defaultRefinement="evm" attribute='Chain'/>  
                    <Divider vertical/>
                    <SelectTitle>Usage</SelectTitle><MyMenuSelect attribute='Usage'/> 
                    <Divider vertical/>
                    <SelectTitle>Phase</SelectTitle>   <MyMenuSelect attribute='Phase'/>    
            </SelectBox>
              </div> }  

               </div>

         </Flex>
    </InstantSearch>
        </Kontejner>
    );
}

export default MeiliSearch;
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
    margin: 2%;
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
  
    const renderSelectMenu = () => {
        return <>
        <SelectBox>  
               <SelectItem> <SelectTitle>Ecosystem</SelectTitle> <MyMenuSelect defaultRefinement="evm" attribute='Chain'/>  </SelectItem>
                <Divider vertical/>
              <SelectItem>   <SelectTitle>Usage</SelectTitle><MyMenuSelect attribute='Usage'/> </SelectItem>
                <Divider vertical/>
                <SelectItem> <SelectTitle>Phase</SelectTitle>   <MyMenuSelect attribute='Phase'/>    </SelectItem>
                <Divider vertical/>
                <SelectItem> <SelectTitle>Ecosystem</SelectTitle> <MyMenuSelect defaultRefinement="evm" attribute='Chain'/>  </SelectItem>
                <Divider vertical/>
              <SelectItem>   <SelectTitle>Usage</SelectTitle><MyMenuSelect attribute='Usage'/> </SelectItem>
                <Divider vertical/>
                <SelectItem> <SelectTitle>Phase</SelectTitle>   <MyMenuSelect attribute='Phase'/>    </SelectItem>
        </SelectBox></>
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
           
                {searchValue === 'Press S to search' || searchValue === '' ? null : <div>
                {renderSelectMenu()}  
                <Header title='Tutorials'/>
                <MyStats/>  
                <HitBox> <Hits hitComponent={Hit} /></HitBox>
                <Header title='Definitions'/>
                <HitBox>  <Hits hitComponent={Hit} /></HitBox>
            

            <PaginationBox> <SelectTitle>Pagination</SelectTitle><Pagination /></PaginationBox>
              </div> }  

               </div>

         </Flex>
    </InstantSearch>
        </Kontejner>
    );
}

export default MeiliSearch;
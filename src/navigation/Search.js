import { useState } from 'react';
import {   InstantSearch,
    Hits,
    Pagination,
    Configure,
    connectSearchBox ,   
    MenuSelect,
    Highlight,Index,
    SearchBox,
    Stats} from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styled from 'styled-components'

const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL, // HOST
    process.env.REACT_APP_MEILI_KEY
  );

// Algolia styled customization
const MyStats = styled(Stats)`
    text-align: left;
    padding-left: 1%;
`

const HitTitle = styled(Highlight)`
    color: #302F35;
    font-family: 'NoBill';
    letter-spacing: 0.1rem;
`

const HitDescription = styled(Highlight)`
    color: red;
`

const MyHighlight = styled(Highlight)`
    color: red;
`


const SelectBox = styled.div`
    display: flex;
    margin-top: 2%;
`

const ImageBox = styled.div`
    margin-top: 10%;
`

const SelectTitle = styled.p`

`

const MyMenuSelect = styled(MenuSelect)`
    color: #302F35;
    padding: 1%;
    margin-left: 2%;
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const ResultBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.2px solid red;
    padding-top: 1%;
    transition: 0.1s;
    &:hover{
        background: #E4E4E4;
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

const Kontejner = styled.div`
    width: 50%;
    position: absolute;
    right: 0;
    margin-top: 2%;
`

const HitBox = styled.div`
    background: #F1F1F1;

`

const Search = styled.div`
   background: red;
   min-width: 800px;
`

const PaginationBox = styled.div`
    background: red;
    display: flex;
    flex-direction: row;
`


const TitleBox = styled.div`
    display: flex;
    align-items: flex-start;
    font-family: 'Staatliches';
    color: #007463;
    background: white;
    font-size: 1.5em;
    padding-left: 5%;
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

  const MySearchBox = (refine, onClick) => {
      return <div class="ais-SearchBox">
    <form class="ais-SearchBox-form" novalidate>
        <div>
            <input onClick={onClick}
            type="search"
            value={searchValue}
            onChange={event => refine(event.currentTarget.value)}
            placeholder='Custom'
        />
    </div>
    </form>
</div>
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
  const CustomSearchBox = connectSearchBox(MySearchBox);
  
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

                <Search><SearchBox 
                    onChange={handleChange}
                    onReset={ResetValue}
                    onClick={ResetValue}
                    defaultRefinement={searchValue} 
                    focusShortcuts={['s']} 
                    min
                />
                <CustomSearchBox 
                    onClick={ResetValue}
                    defaultRefinement={searchValue} 
                    focusShortcuts={['s']} 
                />
                </Search>
                {searchValue === 'Press S to search' || searchValue === '' ? null : <div><Header title='Tutorials'/>
                <MyStats/>
                <HitBox> <Hits hitComponent={Hit} /></HitBox>
                <Header title='Definitions'/>
                <HitBox>  <Hits hitComponent={Hit} /></HitBox>
               <PaginationBox> <Pagination /></PaginationBox>
            <SelectBox>  
                    <SelectTitle>Ecosystem</SelectTitle> <MyMenuSelect defaultRefinement="evm" attribute='Chain'/>  
                    <SelectTitle>Usage</SelectTitle><MyMenuSelect attribute='Usage'/> 
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
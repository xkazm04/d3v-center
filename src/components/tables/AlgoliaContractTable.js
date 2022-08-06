import {useState} from 'react';
import {   InstantSearch,
    Hits,
    Pagination,
    Configure,
    Highlight,
    connectSearchBox,
    ClearRefinements,
    Stats} from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import {ExpandIcon, CodeIcon, CloseIcon } from '../../icons/utils';
import styled, {useTheme} from 'styled-components'
import SearchBox from './SearchBox';
import CodeComponent from '../code/CodeComponent';
import CodeSeparate from '../code/CodeSeparate';
import { refContract } from '../../data/solVersions';
import { SwapIcon } from '../../icons/arrows';
import { WithdrawIcon } from '../../icons/tool';

const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILI_URL, 
  process.env.REACT_APP_MEILI_KEY
);

const Kontejner = styled.div`
  z-index: 20;
  @media (min-width: 1000px) {
  margin: 10%;
  margin-top: 2%;
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

const HitMainColumn = styled.div`
width: ${props => props.width};
display: flex;
flex-direction: row;
justify-content: space-between;
background: ${props => props.theme.colors.main};
border-radius: 15px;
text-align: left;
padding-left: 2%;
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
  opacity: 0.6;
  transition: 0.1s;
  &:hover{
    opacity: 1;
  }
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
animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  @media (min-width: 700px) {
  position: sticky;
  padding: 5px;
}
`

const Search = styled.div`
 background: ${props => props.theme.colors.background};
 animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
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
  padding-top: 1%;
  background: inherit;
  width: 100%;
  border-left: 1px solid ${props => props.theme.colors.lineAlt};
  &:hover{
    color: white;
  }
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterSection = styled.div`
  display: flex;
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  min-height: 100px; 
  background: ${props => props.theme.colors.landingBox};
`

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colors.lineAlt};
  border-radius: 15px;
  padding: 5px;
  padding-bottom: 10px;
  margin: 10px;
  font-size: 1.2em;
  color: ${props => props.theme.colors.landingTitle};
`

const FilterSearch = styled(FilterBox)`
  justify-content: flex-end;
`

const FilterTitle = styled.div`
  font-family: 'Staatliches';
`

const Note = styled.div`
  font-family: 'Chilanka';
  font-size: 1.5em;
  color: ${props => props.theme.colors.text_title};
`

const FilterRadio = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const RadioTitle = styled.div`
  color: ${props => props.theme.colors.landingTitle};
  font-family: 'Staatliches';
  font-size: 0.9em;
`

const MainSection = styled.div`
  display: flex;
  padding-top: 2%;
  background: ${props => props.theme.colors.lightGreen};
  min-height: 50px;
  background: white;
`

const MainColumn = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 200px;
  padding: 1%;
  border-right: 1px solid ${props => props.theme.colors.lineAlt};
`

const RatingColumn = styled(MainColumn)`
  justify-content: space-between;
`

const CodeSection = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.landingBox};
  min-height: 50px;
  width: 50%;
  right: 25%;
  top: 50%;
  background: white;
  @media (max-width: 700px) {
   width: 100%;
}
`

const CodeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 10px;
  background: ${props => props.theme.colors.landingBox};
  color: ${props => props.theme.colors.landingSubtitle};
`

const ListBox = styled.div`
  min-height: 50px;
  background: ${props => props.theme.colors.lightGreen};
  padding: 4%;
`

const ListTitle = styled.div`
  font-family: 'Chilanka';
  font-size: 1.5em;
  color: ${props => props.theme.colors.text_primary};
`

const ListContent = styled.li`
  text-align: left;
  color: ${props => props.theme.colors.text_primary};
  font-size: 1em;
`

const Low = styled.div`
  font-family: 'Chilanka';
  color: green;
`

const Med = styled(Low)`
  color: black;
`

const High = styled(Low)`
  color: red;
`

const AlgoliaContractTable = () => {
    const [code, setCode] = useState(null)
    const [codeVisible, setCodeVisible] = useState(false)
    const [codeSub, setCodeSub] = useState('Code')
    const [previewVisible, setPreviewVisible] = useState(null)
    const theme = useTheme();


const DebouncedSearchBox = connectSearchBox(SearchBox)
// const CustomMenuSelect = connectMenu(MenuSelect);



function Hit(props) {
  return (
    // Custom ais-Hits-list, to display rows
    <>
    <ResultBox>
          {/* Main column*/}
        <HitMainColumn width={'430px'}>  
        <FlexColumn>
            <HitTitle attribute="name" hit={props.hit}  tagName="strong"/>
            <HitDescription attribute="address" hit={props.hit} tagName="strong" /> 
        </FlexColumn>
            <BtnBox>  <IconButton  onClick={()=>{handleResultClick(props.hit.reference)}}><ExpandIcon width={15} color={theme.colors.text_primary}/></IconButton>
              {props.hit.codePreview && <IconButton  onClick={()=>{handleCodePreview(props.hit.codePreview)}}><CodeIcon width={15} color={theme.chart.varRed_fill}/></IconButton>}</BtnBox>
        </HitMainColumn>

    </ResultBox>
    </>
  );
}

const handleResultClick = (reference) => {
    window.open(reference, "_blank")
}

const handleCodePreview = async(code) => {
    setCode(code)
    setPreviewVisible(true)
  }



return (
  <Kontejner>
    <Note onClick={()=>{setCodeVisible(true)}}>Layout prototype -> estimated delivery 10.8.2022</Note>
     {previewVisible && <CodeBox> <CloseButton onClick={()=>{setPreviewVisible(false)}}><CloseIcon width={15} color={"red"}/></CloseButton> <CodeComponent code={code}/></CodeBox>}
  <>

    <InstantSearch indexName="contract" searchClient={searchClient}>
    <FilterSection>
        <FilterBox><FilterTitle>Title</FilterTitle><div><input type='text' placeholder='Title'/></div></FilterBox>
        <FilterSearch><Search>     <DebouncedSearchBox delay={500}/>        
               <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search></FilterSearch>
        <FilterBox>
         <FilterRadio><RadioTitle>Flag modern </RadioTitle><input type="radio" id="html" name="fav_language" value="HTML"></input></FilterRadio>
         <FilterRadio><RadioTitle>Flag swap </RadioTitle><input type="radio" id="html" name="fav_language" value="HTML"></input></FilterRadio>
         <FilterRadio><RadioTitle>Flag withdraw </RadioTitle><input type="radio" id="html" name="fav_language" value="HTML"></input></FilterRadio>
        </FilterBox>
        <FilterBox>
          <FilterRadio><RadioTitle>All </RadioTitle><input type="radio" id="html" name="fav_language" value="HTML"></input></FilterRadio>
          <FilterRadio><RadioTitle>Only failed </RadioTitle><input type="radio" id="html" name="fav_language" value="HTML"></input></FilterRadio>
          <FilterRadio><RadioTitle>Passed </RadioTitle><input type="radio" id="html" name="fav_language" value="HTML"></input></FilterRadio>
        </FilterBox>
        <FilterBox><FilterTitle>Filter compiler version</FilterTitle> <div><input type='text' placeholder='1/2/3'/></div></FilterBox>
    </FilterSection>

               <Configure hitsPerPage={30} />   
 

      
               <HitBox> <Hits hitComponent={Hit} /></HitBox>
           <PaginationBox> <PaginationTitle>Page</PaginationTitle><Pagination /></PaginationBox> 
 
   </InstantSearch>
    <MainSection>
        <MainColumn>Title</MainColumn>
        <MainColumn>Name, Address, Version, Tag, Button</MainColumn>
        <MainColumn>Flags: <SwapIcon width='20' color={theme.colors.text_title}/> <WithdrawIcon width='20' color={theme.chart.var3_stroke}/></MainColumn>
        <RatingColumn>Slither API
                  <Low>5L</Low><Med>5M</Med><High>5H</High>
        </RatingColumn>
        <MainColumn>Compiler version</MainColumn>
    </MainSection>

    {codeVisible && 
    <CodeSection>
      <CodeHeader>
       <CloseButton>Author + Title + Reference + Close  - only if Author/Title known</CloseButton> <CloseButton onClick={()=>{setCodeVisible(false)}}>Close</CloseButton>
      </CodeHeader>
      <CodeHeader>
        <CloseButton onClick={()=>{setCodeSub('Code')}}>Code</CloseButton>
        <CloseButton onClick={()=>{setCodeSub('Functions')}}>Functions</CloseButton>
        <CloseButton onClick={()=>{setCodeSub('Events')}}>Events</CloseButton>
      </CodeHeader>

     {codeSub === 'Code' && <CodeSeparate code={refContract}/>}
     {codeSub === 'Functions' && <ListBox><ListTitle>List with functions</ListTitle><ListContent>Content</ListContent></ListBox>}
     {codeSub === 'Events' && <ListBox><ListTitle>List with events</ListTitle><ListContent>Content</ListContent></ListBox>}
    </CodeSection>}
  </>
  </Kontejner>
)
}


export default AlgoliaContractTable
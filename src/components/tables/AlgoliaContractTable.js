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
import {ExpandIcon, CodeIcon, CloseIcon } from '../../icons/utils';
import styled, {useTheme} from 'styled-components'
import SearchBox from './SearchBox';
import MenuSelect from './MenuSelect';
import LazyLoad from 'react-lazyload';
import BoxTitle from '../typography/BoxTitle';
import CodeComponent from '../code/CodeComponent';
import BoxSubtitle from '../typography/BoxSubtitle';

const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILI_URL, 
  process.env.REACT_APP_MEILI_KEY
);

const Kontejner = styled.div`
  z-index: 20;
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
  &:hover{
    cursor: pointer;
    background: ${props => props.theme.colors.light};
  }
  @media (min-width: 700px) {
    width: 100%;
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
  position: sticky;
  padding-top: 1%;
  top: 0;
  background: inherit;
  width: 100%;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterSection = styled.div`
  height: 100px; 
  background: ${props => props.theme.colors.landingBox};
`


const AlgoliaContractTable = () => {
    const [code, setCode] = useState(null)
    const [prod] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(null)
    const theme = useTheme();

  const [filterChain, setFilterChain] = useState(true);
  const switchFilterChain = () => {
    setFilterChain(!filterChain);
  }


const DebouncedSearchBox = connectSearchBox(SearchBox)
const CustomMenuSelect = connectMenu(MenuSelect);

const SelectFilter = ({title,attribute, width,filterEnabled}) => {
return(
<SelectItem width={width}> <SelectTitleBox>   <SelectTitle >{title} 
</SelectTitle ></SelectTitleBox> 
 {filterEnabled ? <CustomMenuSelect attribute={attribute} width={width}/>  : null} 

</SelectItem>
)
}



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
     {previewVisible && <CodeBox> <CloseButton onClick={()=>{setPreviewVisible(false)}}><CloseIcon width={15} color={"red"}/></CloseButton> <CodeComponent code={code}/></CodeBox>}
 {prod &&              <InstantSearch indexName="contract" searchClient={searchClient}>
               
          <Flex> 
              <Box>
                    <BoxTitle content='Contracts (8/2022)'/>
                    <BoxSubtitle content='Complete mainnet library from Ethereum, Polygon and BSC'/>

              <Configure hitsPerPage={30} />   
              <LazyLoad><FlexFilter>  
              <SelectFilter title={'Chain'} attribute={'chain'}  width='100px'  filterEnabled={filterChain} clickFunction={switchFilterChain}/>
              <Search>     <DebouncedSearchBox delay={500}/>        
              <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search>
     
      </FlexFilter></LazyLoad> 
              <HitBox> <Hits hitComponent={Hit} /></HitBox>
          <PaginationBox> <PaginationTitle>Page</PaginationTitle><Pagination /></PaginationBox> 

             </Box>

       </Flex>
  </InstantSearch>}
  <>
    <FilterSection>Filter box </FilterSection>

    
  </>
  </Kontejner>
)
}


export default AlgoliaContractTable
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
import styled from 'styled-components'
import Divider from 'rsuite/Divider';
import axios from 'axios';
import SearchBox from './SearchBox';
import { Cosmos, Elrond, Evm, Near, Polkadot, Solana, Ziliqa } from '../../icons/chain';
import MenuSelect from './MenuSelect';
import LazyLoad from 'react-lazyload';

const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILI_URL, 
  process.env.REACT_APP_MEILI_KEY
);

const Kontejner = styled.div`

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
box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
@media (max-width: 700px) {
    margin-left: 0;
    border-radius: 0;
  }
  &:hover{
      background: ${props => props.theme.colors.red};
      cursor: pointer;
  }
`


const HitTitle = styled(Highlight)`
  color: ${props => props.theme.colors.text_title};
  font-family: 'auto';
  font-weight: 700;
  font-size: 1.2em;
  padding: 1px;
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

const MyDivider = styled(Divider)`
  background: ${props => props.theme.colors.lighter};
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
  &:hover{
    cursor: pointer;
    background: ${props => props.theme.colors.light};
  }
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
margin-bottom: 2px;
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
 padding-right: 110px;
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



const AlgoliaToolTable = () => {



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

  const handleResultClick = (reference,id,counter) => {
    window.open(reference, "_blank")
    addCounter(id,counter)
}


  const addCounter = async(tutorialId,viewCounter) => {
      const updatedId = tutorialId.match(/\d+/)[0] // Extract id from string
      console.log(updatedId)
      const token = process.env.REACT_APP_CMS_API // Master strapi token
      const body = { data: { ViewCounter: viewCounter+1 } }
      const res = await axios.put(`${process.env.REACT_APP_ENVIRONMENT}/api/tools/${updatedId}`, body, {
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
{/* <InfoIcon width={'20'} color={'black'}/> */}
</SelectTitle > </SelectTitleBox> 
 {filterEnabled ? <CustomMenuSelect attribute={attribute} width={width}/>  : null} 

</SelectItem>
)
}

function Hit(props) {
  return (
    <>

    <ResultBox>
      <Flex>          
          <HitColumn  width={'100px'}>
            {props.hit.Usage === null ? null : <HitCategory attribute="Usage" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
         <MyDivider vertical/>
        <HitColumn  width={'100px'}>
        {props.hit.Subcategory === null ? null : <HitSubCategory attribute="Subcategory" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
        <MyDivider vertical/>
        <HitMainColumn width={'450px'} onClick={()=>{handleResultClick(props.hit.Reference,props.hit.id,props.hit.ViewCounter)}}>  
            <HitTitle attribute="Title" hit={props.hit}  tagName="strong"/>
            <HitDescription attribute="Description" hit={props.hit} tagName="strong" /> 
        </HitMainColumn>
        <MyDivider vertical/>
        <HitColumn width={'140px'}>
        {props.hit.Chain === 'EVM' ? <LazyLoad><Evm width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Solana' ? <LazyLoad><Solana width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Near' ? <LazyLoad><Near width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Ziliqa' ? <LazyLoad><Ziliqa width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Polkadot' ? <LazyLoad><Polkadot width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Elrond' ? <LazyLoad><Elrond width={'25'}/></LazyLoad> : null}
          {props.hit.Chain === 'Cosmos' ? <LazyLoad><Cosmos width={'25'}/></LazyLoad> : null}
        </HitColumn>
      </Flex>

    </ResultBox>
    </>
  );
}



return (
  <Kontejner>
               <InstantSearch indexName="tool" searchClient={searchClient}>
               
          <Flex> 
              <Box>
              <Configure hitsPerPage={15} />   
              
          <LazyLoad><FlexFilter>  
            <SelectFilter title={'Usage'} attribute={'Usage'}  width='115px'  filterEnabled={filterUsage} clickFunction={switchFilterUsage}/> 
            <SelectFilter title={'Subcategory'} attribute={'Subcategory'}  width='110px'  filterEnabled={filterSub} clickFunction={switchFilterSub}/> 
              <Search>     <DebouncedSearchBox delay={500}/>        
              <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search>
              <MyDivider vertical/>
              <SelectFilter title={'Chain'} attribute={'Chain'}  width='120px'  filterEnabled={filterChain} clickFunction={switchFilterChain} />


      </FlexFilter></LazyLoad>

              <HitBox> <Hits hitComponent={Hit} /></HitBox>

          <PaginationBox> <PaginationTitle>Page</PaginationTitle><Pagination /></PaginationBox> 

             </Box>

       </Flex>
  </InstantSearch>
  </Kontejner>
)
}


export default AlgoliaToolTable;
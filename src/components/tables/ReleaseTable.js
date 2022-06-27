import {useState} from 'react';
import {   InstantSearch,
    Hits,
    Pagination,
    Configure,
    connectMenu ,
    Highlight,
    ClearRefinements,
    connectSearchBox,
    Stats} from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styled, {useTheme} from 'styled-components'
import Divider from 'rsuite/Divider';
import axios from 'axios';
import SearchBox from './SearchBox';
import MenuSelect from './MenuSelect';
import LazyLoad from 'react-lazyload';
import BoxTitle from '../typography/BoxTitle';
import BoxSubtitle from '../typography/BoxSubtitle';
import ReleaseTimeline from '../charts/ReleaseTimeline'
import { Grid, Row, Col } from 'rsuite';

const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILI_URL, 
  process.env.REACT_APP_MEILI_KEY
);

const Kontejner = styled.div`

@media (min-width: 1000px) {
  margin-left: 5%;
}

`


const Box = styled.div`
padding-top: 1%;
padding-left: 2%;

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
background: ${props => props.theme.colors.main};
border-radius: 15px;
text-align: left;
padding-left: 2%;
box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
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
  font-family: 'Staatliches';
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
  opacity: 0.8;
  margin-left: 2%;
  transition: 0.1s;
  &:hover{
    opacity: 1;
  }
`

const HitSeries = styled(Highlight)`
  font-family: 'NoBill';
  letter-spacing: 1.5px;
  color: ${props => props.theme.colors.text_primary};
  margin-left: 4%;
  padding: 4%;
  transition: 0.2s;
  @media (max-width: 700px) {
    display: none;
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
`

const HitSubCategory = styled(HitCategory)`
   background: ${props => props.theme.colors.green};
`

const HitUpdate = styled.div`
  width: 80px;
  font-size: 10px;
  color: ${props => props.theme.colors.text_primary};
  &:hover{
    cursor: default;
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

const PaginationTitle = styled.p`
  font-family: 'NoBill';
  text-align: left;
  font-size: 1.2em;
  padding-left: 10%;
  padding-right: 5%;
  color: ${props => props.theme.colors.text_primary};
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`

const FlexFilter = styled(Flex)`
min-height: 50px;
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

const HitBox = styled.div`
border-top: 2px solid ${props => props.theme.colors.light};
  @media (min-width: 700px) {
  position: sticky;
  padding: 5px;
}
`
const Search = styled.div`
 background: ${props => props.theme.colors.background};
 padding-right: 100px;
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



const AlgoliaDefinitionTable = () => {
  const theme = useTheme()
  const [timeline, setTimeline] = useState({})

  const handleResultClick = (reference) => {
    window.open(reference, "_blank")
}

const handleTimeline = async(t) => {
    const header = {
        "apiKey": `Bearer ${process.env.key}` 
    }
    const res = await axios.get(`${process.env.url}/api/releases/${t}`, header)
    setTimeline(res.data.data)
    console.log(timeline)
}

const DebouncedSearchBox = connectSearchBox(SearchBox)

function Hit(props) {
  
  return (
    <>

    <ResultBox>
      {/* Main part */}
      <Flex>  
      <HitUpdate>   {props.hit.update}</HitUpdate>
      <MyDivider vertical/>
          {/* Left column */}
         
          <HitColumn width={'100px'}>
        
              {props.hit.chain === null ? <HitSeriesColumn> </HitSeriesColumn>:  <HitSeriesColumn><HitSeries attribute="chain" hit={props.hit} tagName="strong" /> </HitSeriesColumn>} 
     </HitColumn>
          <MyDivider vertical/>
          <HitColumn  width={'110px'}>
            {props.hit.category === null ? null : <HitCategory attribute="category" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
        <MyDivider vertical/>
          {/* Main column*/}
        <HitMainColumn width={'450px'} onClick={()=>{handleResultClick(props.hit.reference)}}>  
            <HitTitle attribute="tool" hit={props.hit}  tagName="strong"/>
            <HitDescription attribute="difference" hit={props.hit} tagName="strong" /> 
        </HitMainColumn>
        <MyDivider vertical/>

        <HitColumn  width={'100px'}>
           {props.hit.subcategory === null ? null : <HitSubCategory attribute="subcategory" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
        <MyDivider vertical/>
       <HitColumn  width={'120px'}>
        <button onClick={()=>{handleTimeline(props.hit.tool)}}>Timeline</button>  
       </HitColumn>
      </Flex>
    </ResultBox>
    </>
  );
}



return (
  <Kontejner>
               <InstantSearch indexName="release" searchClient={searchClient}>
               
          <Grid fluid> 
             <Row>
                <Col xs={24} md={24} lg={7} xl={7}>

              <Box><BoxTitle content='Releases'/>
              <BoxSubtitle content='Absorb all crypto foundations'/>             
              <Configure hitsPerPage={25} />   
              
          <LazyLoad><FlexFilter>  
          <Search>     <DebouncedSearchBox delay={500}/>        
              <MetaRow>   <MyStats/><ClearRefinements />  </MetaRow></Search>
          
      </FlexFilter></LazyLoad>

              <HitBox> <Hits hitComponent={Hit} /></HitBox>
              {/* <Header title='Definitions'/>
              <HitBox>  <Hits hitComponent={Hit} /></HitBox> */}
          

          <PaginationBox> <PaginationTitle>Page</PaginationTitle><Pagination /></PaginationBox> 

             </Box>
             </Col>
             <Col xs={24} md={24} lg={7} xl={7}>

                </Col>
                <Col xs={24} md={24} lg={10}>
                    <ReleaseTimeline  />
                </Col>
             </Row>
       </Grid>
       
  </InstantSearch>
  </Kontejner>
)
}


export default AlgoliaDefinitionTable;
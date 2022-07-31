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
import { Grid, Row, Col } from 'rsuite';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { GithubIcon, TimeIcon, WebIcon } from '../../icons/utils';
import TitleBox from '../../sections/TitleBox';

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
`

const LastColumn = styled.div`
  display: flex;
`

const HitMainColumn = styled.div`
width: ${props => props.width};
display: flex;
flex-direction: column;
margin-top: 3px;
margin-bottom: 3px;
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
  opacity: 0.9;
  font-style: italic;
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
`

const HitSubCategory = styled(HitCategory)`
   background: ${props => props.theme.colors.green};
`

const HitUpdate = styled.div`
  width: 80px;
  font-size: 0.8em;
  font-weight: 700;
  font-family: 'Helvetica';
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
  border-bottom: 0.2px solid ${props => props.theme.colors.line};

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
 margin-left: 60px;
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
const RelTitle = styled.div`
font-size: 1.2em;
font-family: 'NoBill';
`

const RelFeature = styled.div`
font-size: 0.8em;
`

const TimeButton = styled.button`
  background: inherit;
  transition: 0.1s;
  &:hover{
    opacity: 0.4;
  }
`

const SelectItem = styled.div`
    transition: 0.1s;
    align-items: left;
    text-align: left;
    min-width: ${props => props.width};
    margin-right: 1%;
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

const MyTimeline = styled(VerticalTimeline)`
  text-align: left;
`

const ChainDiv = styled.div`
 font-size: 0.8em;
`


const UpperTag = styled.div`
  background: ${props => props.theme.colors.red};
  border: 0.1px solid ${props => props.theme.chart.var3_fill};
  font-family: 'Helvetica';
  font-weight: 700;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 0.7em;
  border-radius: 15px;
`

const DescBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Submenu = styled.div`
  margin: 5%;
  margin-left: 10%;
  padding: 2%;
  background: ${props => props.theme.colors.landingBox};
  border-radius: 15px;
`

const AlgoliaDefinitionTable = () => {
  const theme = useTheme()
  const [timeline, setTimeline] = useState(null)

  const handleResultClick = (reference) => {
    window.open(reference, "_blank")
}

const [filterCategory, setFilterCategory] = useState(true);
const switchFilterCategory = () => {
  setFilterCategory(!filterCategory);
}

const [filterSub, setFilterSub] = useState(true);
const switchFilterSub = () => {
  setFilterSub(!filterSub);
}

// Get me all items, query by tool
const token = process.env.REACT_APP_CMS_API 

const handleTimeline = async(t) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/releases/?filters[tool][$eq]=${t}`, {headers: {
            Authorization: `Bearer ${token}` 
    },})
        setTimeline(res.data.data)
    } catch {
        console.log('API error');
    }

}

const DebouncedSearchBox = connectSearchBox(SearchBox)
const CustomMenuSelect = connectMenu(MenuSelect);

const SelectFilter = ({title,attribute, width,filterEnabled, clickFunction}) => {
  return(
  <SelectItem width={width}> <SelectTitleBox onClick={()=>{clickFunction()}}>   <SelectTitle >{title} 
  </SelectTitle></SelectTitleBox> 
   {filterEnabled ? <CustomMenuSelect attribute={attribute} width={width}/>  : null} 
  </SelectItem>
  )
}

function Hit(props) {


  
  return (
    <>

    <ResultBox>
      <Flex>  
      <HitColumn  width={'60px'}>
           <ChainDiv> {props.hit.chain}</ChainDiv>       
        </HitColumn>
          {/* Main column*/}
        <HitMainColumn width={'450px'} onClick={()=>{handleResultClick(props.hit.reference)}}>  
          <DescBox> <HitDescription attribute="difference" hit={props.hit} tagName="strong" /> <UpperTag>{props.hit.version}</UpperTag></DescBox> 
            <HitTitle attribute="tool" hit={props.hit}  tagName="strong"/>  
            
        </HitMainColumn>
        <MyDivider vertical/>
        <HitColumn  width={'110px'}>
            {props.hit.category === null ? null : <HitCategory attribute="category" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
        <MyDivider vertical/>
        <HitColumn  width={'100px'}>
           {props.hit.subcategory === null ? null : <HitSubCategory attribute="subcategory" hit={props.hit} tagName="strong" /> }         
        </HitColumn>
        <MyDivider vertical/>
       <LastColumn  width={'100px'}>
       <HitUpdate>   {props.hit.update}</HitUpdate>
        <TimeButton onClick={()=>{handleTimeline(props.hit.tool)}}><TimeIcon width='20' color={theme.colors.text_primary}/></TimeButton>  
       </LastColumn>
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
              <Box>
               <Submenu> <TitleBox title='Releases' subtitle='Check latest featrues and changes'/> </Submenu>    
              <Configure hitsPerPage={15} />   
          <LazyLoad><FlexFilter>  

                <Search><DebouncedSearchBox delay={500}/>        
              <MetaRow><MyStats/><ClearRefinements/></MetaRow></Search>

              <MyDivider vertical/>
              <SelectFilter title={'category'} attribute={'category'}  width='120px'  filterEnabled={filterCategory} clickFunction={switchFilterCategory}/>
              <SelectFilter title={'subcategory'} attribute={'subcategory'}  width='120px'  filterEnabled={filterSub} clickFunction={switchFilterSub}/>

      </FlexFilter></LazyLoad>
              <HitBox> <Hits hitComponent={Hit} /></HitBox>
              {/* <Header title='Definitions'/>
              <HitBox>  <Hits hitComponent={Hit} /></HitBox> */}
          <PaginationBox> <PaginationTitle>Page</PaginationTitle><Pagination /></PaginationBox> 
             </Box>
             </Col>
             <Col xs={24} md={24} lg={8} xl={10}>
                </Col>
                <Col xs={24} md={24} lg={9}>     
             {timeline && <> {timeline.map((item) => (
                    <div key={item.id} item={item}>
                        <MyTimeline>
                          <VerticalTimelineElement
                            position='right'
                            contentStyle={{ background: 'transparent', color: theme.colors.text_primary }}
                            contentArrowStyle={{ borderRight: `7px solid  ${theme.colors.text_title}` }}
                            iconStyle={{ background:  `${theme.colors.light}`, color: `${theme.colors.red}` }}
                            icon={ item.attributes.source === 'Github' ? <GithubIcon width='20' color={theme.colors.text_title} /> :<WebIcon width='20' color={theme.colors.text_title} /> }
                          >
                          <RelFeature>{item.attributes.update}, {item.attributes.version}</RelFeature>
                          <RelTitle>{item.attributes.difference}</RelTitle>
                        </VerticalTimelineElement>
                      </MyTimeline>
                    </div>
                  ))} </> }
                </Col>
             </Row>
       </Grid>
       
  </InstantSearch>
  </Kontejner>
)
}


export default AlgoliaDefinitionTable;
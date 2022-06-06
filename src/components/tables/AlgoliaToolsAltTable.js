import React, { Suspense} from 'react';
import {   InstantSearch,
    Configure
} from 'react-instantsearch-dom';

import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styled from 'styled-components'




const HitGroup = React.lazy(() => import('../hits/HitGroup')); // 

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

const BoxTitle = styled.div`
  text-align: left;
  padding-bottom: 1%;
  letter-spacing: 1.3px;
  font-family: 'NoBill';
  font-size: 2em;
  color: ${props => props.theme.colors.text_title};
      @media (max-width: 700px) {
    font-size: 1em;
    padding-left: 2%;
  }

`
const BoxSubtitle = styled.div`
  text-align: left;
  letter-spacing: 1.2px;
  font-family: 'NoBill';
  font-size: 1.5em;
  
  padding-bottom: 1%;
  color: ${props => props.theme.colors.text_primary};
  @media (max-width: 700px) {
    font-size: 1em;
    padding-left: 2%;
  }
`


const Flex = styled.div`
  display: flex;
  flex-direction: row;
`




const AlgoliaDefinitionTable = () => {




return (
  <Kontejner>
               <InstantSearch indexName="tool" searchClient={searchClient}>

      <Flex> 
              <Box><BoxTitle>Tools</BoxTitle>
              <BoxSubtitle>Save your time with effective tooling</BoxSubtitle>
             
              <Configure hitsPerPage={300}  />   
              
      <Suspense fallback={<>Loader</>}>
      <HitGroup/>
</Suspense>
    
        </Box>
       </Flex>
  </InstantSearch>
  </Kontejner>
)
}
export default AlgoliaDefinitionTable;
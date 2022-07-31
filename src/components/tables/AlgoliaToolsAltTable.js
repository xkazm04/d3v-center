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

const AlgoliaDefinitionTable = () => {

return (
  <Kontejner>
               <InstantSearch indexName="tool" searchClient={searchClient}>   
              <Configure hitsPerPage={300}  />   
              
      <Suspense fallback={<>Loader</>}>
      <HitGroup/>
</Suspense>

  </InstantSearch>
  </Kontejner>
)
}
export default AlgoliaDefinitionTable;
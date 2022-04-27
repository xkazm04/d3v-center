import { InstantSearch, SearchBox, Hits  } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styled from 'styled-components'


const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL,
    process.env.REACT_APP_MEILI_KEY
  );



const Kontejner = styled.div`
    width: 50%;
    position: absolute;
    right: 0;
`

const HitBox = styled.div`
    background: white;
`

const Search = styled.div`
   
`

function MeiliSearch() {

    return (
        <Kontejner>
            <InstantSearch
indexName="bit"
searchClient={searchClient}
>
    <Search><SearchBox /></Search>

    <HitBox><Hits/></HitBox>
</InstantSearch>
        </Kontejner>
    );
}

export default MeiliSearch;


import { Navbar, Nav } from 'rsuite'
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL,
    process.env.REACT_APP_MEILI_KEY
  );

function TopNav() {



    return (
        <div>
            <Navbar>
                <Navbar.Brand href="/">
                    Brand logo
                </Navbar.Brand>
                <Nav>
                    <Nav.Item href="/">News</Nav.Item>
                    <Nav.Item>Definitions</Nav.Item>
                    <Nav.Item>Tutorials</Nav.Item>
                    <Nav.Item>Bits</Nav.Item>
                    <Nav.Item>Maps</Nav.Item>
                    <InstantSearch
                            indexName="bit"
                            searchClient={searchClient}
                        >
                            <SearchBox />
                        </InstantSearch>
                </Nav>
                <Nav pullRight>
                    Logo github
                </Nav>
            </Navbar>
        </div>
    );
}

export default TopNav;



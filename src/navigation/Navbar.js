

import { Navbar, Nav } from 'rsuite'
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styled from 'styled-components'
import {MoonSvg} from '../icons/main'

const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILI_URL,
    process.env.REACT_APP_MEILI_KEY
  );

const Kontejner = styled.div`
    font-family: 'Staatliches', cursive;
    letter-spacing: 2px;
    font-size: 1.2rem;
`

const NavItem = styled(Nav.Item)`
    color: #007463;
    border-top: 2px solid #9E9E9E;
    border-right: 2px solid #9E9E9E;

`
const NavGroup = styled(Nav)`
    margin-top: 2%;
    margin-left: 4%;   
`




function TopNav() {



    return (
        <Kontejner>
            <Navbar>
                <Navbar.Brand href="/">
                   D3V center
                </Navbar.Brand>
                <NavGroup>
                    <NavItem href="/">News</NavItem>
                    <NavItem>Definitions</NavItem>
                    <NavItem>Tutorials</NavItem>
                    <NavItem>Bits</NavItem>
                    <NavItem>Maps</NavItem>
                    <InstantSearch
                            indexName="bit"
                            searchClient={searchClient}
                        >
                            <SearchBox />
                        </InstantSearch>
                </NavGroup>
                <Nav pullRight>
                   {MoonSvg}
                </Nav>
            </Navbar>
        </Kontejner>
    );
}

export default TopNav;



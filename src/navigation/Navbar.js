

import { Navbar, Nav } from 'rsuite'

import styled from 'styled-components'
import {MoonSvg} from '../icons/main'

const Kontejner = styled.div`
    font-family: 'Staatliches', cursive;
    letter-spacing: 2px;
    font-size: 1.2rem;
`

const NavItem = styled(Nav.Item)`
    color: #007463;
    border-right: 2px solid #9E9E9E;
    background: ${props => props.theme.colors.medium};
    color: ${props => props.theme.colors.title};
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

                </NavGroup>
                <Nav pullRight>
                   {MoonSvg}
                </Nav>
            </Navbar>
        </Kontejner>
    );
}

export default TopNav;



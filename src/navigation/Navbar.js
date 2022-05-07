

import { Navbar, Nav } from 'rsuite'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {MoonSvg} from '../icons/main'

const Kontejner = styled.div`
    font-family: 'Staatliches', cursive;
    letter-spacing: 2px;
    display: flex;
    margin-left: 1%;
    font-size: 1.4rem;
    @media (max-width: 900px) {
        font-size: 1.2rem;
        margin-top: 10%;
  }
`

const NavItem = styled(Nav.Item)`
    border-right: 0.5px dotted ${props => props.theme.colors.ligher};
    background: inherit;
    color: ${props => props.theme.colors.text_title};
`

const NavGroup = styled(Nav)`
    margin-top: 1%;   
`


const MyLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:hover{
        text-decoration: none;
    }
    &:focus{
        text-decoration: none;
    }
`


function TopNav() {

    return (
        <Kontejner>
            <Navbar>
                <NavGroup>
                    <NavItem><MyLink to="/">Tutorials</MyLink></NavItem>
                    <NavItem><MyLink to="/definitions">Definitions</MyLink></NavItem>
                    <NavItem><MyLink to="/tools">Tools</MyLink></NavItem>
                    <NavItem><MyLink to="/bits">Bits</MyLink></NavItem>
                    <NavItem><MyLink to="/chains">Chain</MyLink></NavItem>
                    <NavItem><MyLink to="/roadmap">Roadmap</MyLink></NavItem>
                </NavGroup>
                <Nav pullRight>
                   {MoonSvg}
                </Nav>
            </Navbar>
        </Kontejner>
    );
}

export default TopNav;



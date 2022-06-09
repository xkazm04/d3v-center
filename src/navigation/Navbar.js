
import {useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Divider } from 'rsuite'

const Kontejner = styled.div`
    font-family: 'Staatliches', cursive;
    letter-spacing: 2px;
    display: flex;
    margin-left: 1%;
    font-size: 1.4rem;
    @media (max-width: 900px) {
        font-size: 1rem;
        margin-top: 10%;
  }
`

const NavItem = styled.button`
    background: inherit;
    color: ${props => props.theme.colors.text_title};
    padding-right: 10px;
    padding-left: 10px;
    margin: 5px;
    transition: 0.2s;
    &:hover{
        opacity: 0.6;
    }
`

const ActiveItem = styled(NavItem)`
    color: ${props => props.theme.colors.yellow};
    border-bottom: 3px solid ${props => props.theme.colors.yellow};
`

const Disabled = styled(NavItem)`
    background: ${props => props.theme.colors.disabled};
    color: ${props => props.theme.colors.red};
`

const NavGroup = styled.div`
    padding-top: 3%;   
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

    const [link, setLink] = useState('tutorials')

    const handleLink = (l) => {
        setLink(l);
    }

    return (
        <Kontejner>
            <>
                <NavGroup>
                {link === 'tutorials' ?   
                <ActiveItem onClick={()=>{handleLink('tutorials')}}><MyLink to="/">Tutorials</MyLink></ActiveItem> :   
                <MyLink to="/"> <NavItem onClick={()=>{handleLink('tutorials')}}>Tutorials</NavItem></MyLink>}  
                {link === 'definitions' ?   
                <MyLink to="/definitions">  <ActiveItem onClick={()=>{handleLink('definitions')}}>Definitions</ActiveItem></MyLink> :  
                <MyLink to="/definitions"><NavItem onClick={()=>{handleLink('definitions')}}>Definitions</NavItem></MyLink>}
                 {link === 'tools' ?     
                  <ActiveItem onClick={()=>{handleLink('tools')}}><MyLink to="/tools">Tools</MyLink></ActiveItem> :   
                  <MyLink to="/tools"> <NavItem onClick={()=>{handleLink('tools')}}>Tools</NavItem></MyLink> }
                    {link === 'repos' ?     
                    <ActiveItem onClick={()=>{handleLink('repos')}}><MyLink to="/repos">Repos</MyLink></ActiveItem> :   
                  <MyLink to="/repos"> <NavItem onClick={()=>{handleLink('repos')}}>Repos</NavItem></MyLink> }
                    <Divider vertical/>
                    <Disabled disabled>D3V Path</Disabled>
                   <Disabled disabled> ...more coming</Disabled>
                </NavGroup>
            </>
        </Kontejner>
    );
}

export default TopNav;




import {useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Divider } from 'rsuite'
import { useEffect } from 'react'

const Kontejner = styled.div`
    font-family: 'Staatliches', cursive;
    letter-spacing: 2px;
    display: flex;
    margin-left: 5%;
    font-size: 1.4rem;
    margin-bottom: 2%;
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    @media (max-width: 900px) {
        font-size: 1rem;
        margin-top: 10%;
  }
`


const NavItem = styled.button`
    background: inherit;
    color: ${props => props.theme.colors.text_title};
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
    const currentPath = window.location.pathname

    useEffect(() => {
        setLink(currentPath)
      }, [currentPath]);

    const handleLink = (l) => {
        setLink(l);
    }

    return (
        <Kontejner>
            <>
                <NavGroup>
                {link === '/path' ?     
                <ActiveItem onClick={()=>{handleLink('path')}}><MyLink to="/path">Path</MyLink></ActiveItem> :   
                <MyLink to="/path"> <NavItem onClick={()=>{handleLink('/path')}}>Path</NavItem></MyLink> }        
                  <Divider vertical/> 
                {link === '/tutorials' ?   
                <ActiveItem onClick={()=>{handleLink('/tutorials')}}><MyLink to="/">Tutorials</MyLink></ActiveItem> :   
                <MyLink to="/tutorials"> <NavItem onClick={()=>{handleLink('/tutorials')}}>Tutorials</NavItem></MyLink>}  
                 <Divider vertical/> 
                {link === '/definitions' ?   
                <MyLink to="/definitions">  <ActiveItem onClick={()=>{handleLink('/definitions')}}>Definitions</ActiveItem></MyLink> :  
                <MyLink to="/definitions"><NavItem onClick={()=>{handleLink('/definitions')}}>Definitions</NavItem></MyLink>}
                 <Divider vertical/> 
                 {link === '/tools' ?     
                  <ActiveItem onClick={()=>{handleLink('/tools')}}><MyLink to="/tools">Tools</MyLink></ActiveItem> :   
                  <MyLink to="/tools"> <NavItem onClick={()=>{handleLink('/tools')}}>Tools</NavItem></MyLink> }
                   <Divider vertical/> 
                    {link === '/repos' ?     
                    <ActiveItem onClick={()=>{handleLink('repos')}}><MyLink to="/repos">Repos</MyLink></ActiveItem> :   
                  <MyLink to="/repos"> <NavItem onClick={()=>{handleLink('/repos')}}>Repos</NavItem></MyLink> }
                   <Divider vertical/> 
                    {link === '/releases' ?     
                    <ActiveItem onClick={()=>{handleLink('releases')}}><MyLink to="/releases">Releases</MyLink></ActiveItem> :   
                  <MyLink to="/releases"> <NavItem onClick={()=>{handleLink('/releases')}}>Releases</NavItem></MyLink> }
                </NavGroup>
            </>
        </Kontejner>
    );
}

export default TopNav;



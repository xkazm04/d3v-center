
import {useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Divider } from 'rsuite'
import { useEffect } from 'react'

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
    border-left: 0.1px dashed  ${props => props.theme.colors.line};
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
                {link === '/tutorials' ?   
                <ActiveItem onClick={()=>{handleLink('/tutorials')}}><MyLink to="/">Tutorials</MyLink></ActiveItem> :   
                <MyLink to="/tutorials"> <NavItem onClick={()=>{handleLink('/tutorials')}}>Tutorials</NavItem></MyLink>}  
                {link === '/definitions' ?   
                <MyLink to="/definitions">  <ActiveItem onClick={()=>{handleLink('/definitions')}}>Definitions</ActiveItem></MyLink> :  
                <MyLink to="/definitions"><NavItem onClick={()=>{handleLink('/definitions')}}>Definitions</NavItem></MyLink>}
                 {link === '/tools' ?     
                  <ActiveItem onClick={()=>{handleLink('/tools')}}><MyLink to="/tools">Tools</MyLink></ActiveItem> :   
                  <MyLink to="/tools"> <NavItem onClick={()=>{handleLink('/tools')}}>Tools</NavItem></MyLink> }
                    {link === '/repos' ?     
                    <ActiveItem onClick={()=>{handleLink('repos')}}><MyLink to="/repos">Repos</MyLink></ActiveItem> :   
                  <MyLink to="/repos"> <NavItem onClick={()=>{handleLink('/repos')}}>Repos</NavItem></MyLink> }
                    {link === '/releases' ?     
                    <ActiveItem onClick={()=>{handleLink('releases')}}><MyLink to="/releases">Releases</MyLink></ActiveItem> :   
                  <MyLink to="/releases"> <NavItem onClick={()=>{handleLink('/releases')}}>Releases</NavItem></MyLink> }
                    {/* {link === '/path' ?     
                    <ActiveItem onClick={()=>{handleLink('/path')}}><MyLink to="/path">D3V Path</MyLink></ActiveItem> :   
                  <MyLink to="/path"> <NavItem onClick={()=>{handleLink('/path')}}>D3V Path</NavItem></MyLink> } */}
                    <Divider vertical/>
                   <Disabled disabled> ...more coming</Disabled>
                </NavGroup>
            </>
        </Kontejner>
    );
}

export default TopNav;



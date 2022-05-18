
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import {lightTheme, darkTheme} from "./theme/theme";

import { useState } from 'react';
import 'rsuite/dist/rsuite.min.css'

import Navbar from './navigation/Navbar';
import DonateButton from './components/buttons/DonateButton';
import DiscordButton from './components/buttons/DiscordButton';
import MediumButton from './components/buttons/MediumButton';

import Chains from './Pages/Chains';
import Bits from './Pages/Bits';
import Roadmap from './Pages/Roadmap';
import Tutorials from './Pages/Tutorials';
import Tools from './Pages/Tools';
import Definitions from './Pages/Definitions';

import { GoLight } from './icons/main';


import { FilterContext } from './contexts/FilterContext';

import { QueryClient, QueryClientProvider } from 'react-query'
import { BrandIcon } from './icons/main';
import {Helmet} from "react-helmet";

const queryClient = new QueryClient()


const Kontejner = styled.div`
  text-align: center;
  background: ${props => props.theme.colors.background};
  transition: 0.1s;
`

const Navigation = styled.div`
padding-top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 3%;
  padding-bottom: 1%;
  right: 0;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.line};
`

const BrandTopBox = styled.div`
  position: absolute;
  margin-left: 2%;
  display: flex;
`

const ThemeSwitcher = styled.div`
  padding-right: 15%;
`

const Button = styled.div`
  background: inherit;
  cursor: pointer;
  padding: 10px;
  border-radius: 15px; 
  transition: 1s; 
  &:hover{
    background: ${props => props.theme.colors.red};
  }
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 150;
  height: 30%;
  @media (max-width: 700px) {
    display: none;
  }
`



function App() {
  const [filterChain, setFilterChain] = useState("?filters[Chain][$notNull]")
  const [filterSource, setFilterSource] = useState("?filters[Source][$notNull]")
  const [filterStage, setFilterStage] = useState("?filters[Stage][$notNull]")
  const [filterUsage, setFilterUsage] = useState("?filters[Usage][$notNull]")


  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}



  return (
    <><QueryClientProvider client={queryClient}>
      <Helmet>
        <title>D3V Library</title>
        <meta name="description" content="Archive of web3 development wisdom. Tutorials, guides, definitions and tools for both EVM and non-EVM blockchains" />
      </Helmet>

    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyle />
    <BrandTopBox> 
    
      {theme === 'light' ? <ThemeSwitcher><Button onClick={themeToggler}><BrandIcon color='#370000'/></Button></ThemeSwitcher> : <ThemeSwitcher><Button onClick={themeToggler}><GoLight/></Button></ThemeSwitcher>} 
    </BrandTopBox>
    <Kontejner>
            <FilterContext.Provider value={{ filterChain, setFilterChain, filterSource, setFilterSource, filterStage, setFilterStage, filterUsage, setFilterUsage}}>
            {/* <MeiliSearch/>               */}
                <Navigation>
                <Navbar/>
                   <Flex> 
                   {theme === 'light' ? <DiscordButton color='#2D0363'/> : <DiscordButton color='#30FFE1'/>}  
                    <MediumButton color='red'/>
                    <DonateButton/>
                    </Flex>
                </Navigation>

              
                <Switch>
                  <Route exact path="/" render={() => <Tutorials />} />
                  <Route exact path ="/bits"  component={Bits}  />
                  <Route exact path ="/tutorials"  component={Tutorials}  />
                  <Route exact path ="/tools"  component={Tools}  />
                  <Route exact path ="/chains"  component={Chains}  />
                  <Route exact path ="/definitions"  component={Definitions}  />
                  <Route exact path ="/roadmap"  component={Roadmap}  />
                  <Route render={() => <Redirect to="/" />} />
                </Switch>
{/* 
      {tableView === false ?  
      <Flex>
        <LeftNavBox> <LeftNav/></LeftNavBox>
        <CardLayout/>
       </Flex>   :  <><NewTable/></>}    */}
                </FilterContext.Provider>
    </Kontejner>
    </ThemeProvider>
    </QueryClientProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${props => props.theme.colors.background};
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  nav {
    background: ${props => props.theme.colors.background};
  }
  .rs-navbar{
    background: ${props => props.theme.colors.background};
  }
  .ais-SearchBox-submit {
  display: none;
}
.ais-SearchBox-reset {
  display: none;
}

.rs-table-cell-content{
  background: ${props => props.theme.colors.lighter};
  border: 1px dotted ${props => props.theme.colors.light};
}
.ais-Hits-item{
  list-style-type: none;
}


.ais-MenuSelect-select {
  padding-top: 5%;
  font-family: 'Helvetica';
  cursor: pointer;
  border:none;
  min-width: 170px;
  border-bottom: 1px solid ${props => props.theme.colors.red};
}

.ais-MenuSelect-select{
  background:  ${props => props.theme.colors.light};
  background: transparent;
  text-align: left;
  outline: none;
}

.ais-MenuSelect-option{
  padding-top: 5%;
  cursor:pointer;
  min-height: 1.4em;
  background: ${props => props.theme.colors.lighter};
  color: ${props => props.theme.colors.text_primary};
  text-align: left;
  outline: none;
}

.ais-Pagination, .ais-Pagination-list, .ais-Pagination-item, .ais-Pagination-list--noRefinement{
  list-style-type: none;
  width: auto;
  gap: 50%;
  display: flex;
  justify-content: start;
}

.ais-Pagination-item--firstPage, .ais-Pagination-item--previousPage, .ais-Pagination-item--nextPage{
  display: none;
  
}

.ais-Pagination-link{
  font-family: 'NoBill';
  font-size: 24px;
  width: 20px;
}
.ais-ClearRefinements-button{
  background: ${props => props.theme.colors.green};
  font-size: 11px;
}

.ais-ClearRefinements-button--disabled{
  background: ${props => props.theme.colors.red};
  opacity: 0.5;
}


`;



export default App;

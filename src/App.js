
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

import Bits from './Pages/Bits';
import Roadmap from './Pages/Roadmap';
import Tutorials from './Pages/Tutorials';

import { GoLight } from './icons/main';


import MeiliSearch from './navigation/Search';

import { FilterContext } from './contexts/FilterContext';

import { QueryClient, QueryClientProvider } from 'react-query'
import { BrandIcon } from './icons/main';


const queryClient = new QueryClient()


const Kontejner = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
  background: ${props => props.theme.colors.background};
  @media (min-width: 3000px) {
    margin-left: 10%;
  margin-right: 10%;
  }
`

const Navigation = styled.div`
margin-top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 3%;
  padding-bottom: 3%;
  right: 0;
`

const BrandTopBox = styled.div`
  position: absolute;
  margin-left: 2%;
  display: flex;
`

const ThemeSwitcher = styled.div`
  margin-right: 15%;
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
  padding-right: 2%;
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

    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyle />
    <BrandTopBox> 
    
      {theme === 'light' ? <ThemeSwitcher><Button onClick={themeToggler}><BrandIcon color='#370000'/></Button></ThemeSwitcher> : <ThemeSwitcher><Button onClick={themeToggler}><GoLight/></Button></ThemeSwitcher>} 
    </BrandTopBox>
    <Kontejner>
            <FilterContext.Provider value={{ filterChain, setFilterChain, filterSource, setFilterSource, filterStage, setFilterStage, filterUsage, setFilterUsage}}>
            <MeiliSearch/>              
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
                  <Route exact path ="/tutorials"  component={Bits}  />
                  <Route exact path ="/tools"  component={Roadmap}  />
                  <Route exact path ="/definitions"  component={Roadmap}  />
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
  &:hover{
    background:  ${props => props.theme.colors.red};
    color: ${props => props.theme.colors.text_title};
  }
}
.ais-Hits-item{
  list-style-type: none;
}


.ais-SearchBox-input{
  background: inherit;
  border: none;
  padding-left: 5%;
  font-family: 'NoBill';
  font-size: 20px;
  color: ${props => props.theme.colors.text_primary};
  z-index: 95;
  border-left: 0.1px dotted green;
  min-width: 300px;
  box-shadow: 0px 1px 4px ${props => props.theme.colors.red};
  cursor: pointer;
}

.ais-MenuSelect-select, .ais-MenuSelect-select:active, .ais-MenuSelect-select:focus {
  padding-top: 5%;
  width: 100%;
  font-family: 'Helvetica';
  border-radius: 5px;
  cursor: pointer;
  border:none;
  background:  #F5FFFB;

}

.ais-MenuSelect{
  width: 110%;
  

}

.ais-MenuSelect-option{
  padding-top: 5%;
  cursor:pointer;
  min-height: 1.4em;
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.text_primary};
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

`;



export default App;

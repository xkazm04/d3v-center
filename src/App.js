
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

import TanTable from './components/tables/TanTable'


import MeiliSearch from './navigation/Search';

import { FilterContext } from './contexts/FilterContext';

import { QueryClient, QueryClientProvider } from 'react-query'
import { BrandIcon } from './icons/main';


const queryClient = new QueryClient()



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
`;


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
`

const BrandBottomBox = styled.div`
  position: absolute;
  margin-left: 2%;
  bottom: 0;
  font-family: 'NoBill';
  font-size: 2vh;
  color: ${props => props.theme.colors.text_title};
`

const ThemeSwitcher = styled.div`
  margin-right: 15%;
`

const ViewSwitcher = styled.div`
margin-right: 15%;
`

const Button = styled.div`
  background: inherit;
  cursor: pointer;
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

const LeftNavBox = styled.div`
  min-width: 15%;
    @media (max-width: 768px) {
    min-width: 5%;
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

  const [tableView, setTableView] = useState(false);
  const viewToggler = () => {
    setTableView(!tableView)
  }


  return (
    <><QueryClientProvider client={queryClient}>

    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyle />
    <BrandTopBox> <BrandIcon/></BrandTopBox>
    <BrandBottomBox> <BrandIcon/>DEV CENTER</BrandBottomBox>
    <Kontejner>
            <FilterContext.Provider value={{ filterChain, setFilterChain, filterSource, setFilterSource, filterStage, setFilterStage, filterUsage, setFilterUsage}}>
            <MeiliSearch/>              
                <Navigation>
                <Navbar/>
                   {/* {theme === 'light' ? <ThemeSwitcher><Button onClick={themeToggler}><GoDark/></Button></ThemeSwitcher> : <ThemeSwitcher><Button onClick={themeToggler}><GoLight/></Button></ThemeSwitcher>} 
                   {theme === 'light' ?  <ViewSwitcher><Button onClick={viewToggler}><GoLight/></Button> </ViewSwitcher> : <ViewSwitcher><Button onClick={viewToggler}><GoDark/></Button> </ViewSwitcher>} */}
                   <Flex> <DiscordButton/>
                    <MediumButton/>
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

export default App;

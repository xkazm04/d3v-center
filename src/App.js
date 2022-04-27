
import './App.css';
import styled, { ThemeProvider } from "styled-components";
import {lightTheme, darkTheme} from "./theme/theme";
import { GoDark, GoLight } from './icons/main';

import { useState } from 'react';
import 'rsuite/dist/rsuite.min.css'

import CardLayout from './cards/CardLayout'
import Navbar from './navigation/Navbar';
import TutorialTable from './components/tables/TutorialTable'
import DonateButton from './components/buttons/DonateButton';


import LeftNav from './navigation/LeftNav';

import { FilterContext } from './contexts/FilterContext';
import FilterChain from './components/filters/chainFilter';
import MeiliSearch from './navigation/Search';


const Kontejner = styled.div`
  text-align: center;
  background: ${props => props.theme.colors.background};
  min-height: 3000px;
`

const NavRight = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 3%;
  right: 0;
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
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <Kontejner>
            <FilterContext.Provider value={{ filterChain, setFilterChain, filterSource, setFilterSource, filterStage, setFilterStage, filterUsage, setFilterUsage}}>
      {tableView === true ? null :  <MeiliSearch/>    }     
                <Navbar/>
                          
                <NavRight>
                   {theme === 'light' ? <ThemeSwitcher><Button onClick={themeToggler}><GoDark/></Button></ThemeSwitcher> : <ThemeSwitcher><Button onClick={themeToggler}><GoLight/></Button></ThemeSwitcher>} 
                   {theme === 'light' ?  <ViewSwitcher><Button onClick={viewToggler}><GoLight/></Button> </ViewSwitcher> : <ViewSwitcher><Button onClick={viewToggler}><GoDark/></Button> </ViewSwitcher>}
                    <DonateButton/>
                </NavRight>

                <FilterChain/>  
      {tableView === false ?  
      <Flex>
        <LeftNavBox> <LeftNav/></LeftNavBox>
        <CardLayout/>
       </Flex>   :  <TutorialTable/>  }             
                </FilterContext.Provider>
    </Kontejner>
    </ThemeProvider>
  );
}

export default App;

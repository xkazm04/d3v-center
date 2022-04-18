
import './App.css';
import { useState } from 'react';
import Navbar from './navigation/Navbar';
import 'rsuite/dist/rsuite.min.css'
import CardLayout from './cards/CardLayout'
import LeftNav from './navigation/LeftNav';
import styled from 'styled-components';
import { FilterContext } from './contexts/FilterContext';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`

const LeftNavBox = styled.div`
min-width: 10rem;
`


function App() {
  const [filterChain, setFilterChain] = useState("?filters[Chain][$notNull]")
  const [filterSource, setFilterSource] = useState("?filters[Chain][$notNull]")
  const [filterStage, setFilterStage] = useState("?filters[Chain][$notNull]")
  const [filterUsage, setFilterUsage] = useState("?filters[Chain][$notNull]")

  return (
    <div className="App">
            <FilterContext.Provider value={{ filterChain, setFilterChain, filterSource, setFilterSource, filterStage, setFilterStage, filterUsage, setFilterUsage}}>
                <Navbar/>
                    <Flex>
                        <LeftNavBox> <LeftNav/></LeftNavBox>
                        <CardLayout/>
                    </Flex>
                 
                </FilterContext.Provider>
    </div>
  );
}

export default App;

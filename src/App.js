
import './App.css';
import { useState } from 'react';
import Navbar from './navigation/Navbar';
import 'rsuite/dist/rsuite.min.css'
import CardLayout from './cards/CardLayout'
import LeftNav from './navigation/LeftNav';
import styled from 'styled-components';
import { FilterContext } from './contexts/FilterContext';
import { Footer } from 'rsuite';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`

const LeftNavBox = styled.div`
min-width: 10rem;
`


function App() {
  const [appliedFilter, setAppliedFilter] = useState(null)
  return (
    <div className="App">
            <FilterContext.Provider value={{ appliedFilter, setAppliedFilter}}>
          <Navbar/>
          <Flex>
           <LeftNavBox> <LeftNav/></LeftNavBox>
          <CardLayout/>
          </Flex>
          </FilterContext.Provider>

          <Footer/>
    </div>
  );
}

export default App;

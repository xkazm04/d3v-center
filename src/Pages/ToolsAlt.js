import {useState} from 'react'
import AlgoliaToolsAltTable from "../components/tables/AlgoliaToolsAltTable";
import AlgoliaToolsTable from "../components/tables/AlgoliaToolsTable";
import styled from 'styled-components'

const Kontejner = styled.div`
  margin-top: 2%;
`

const Button = styled.button`
  box-shadow: 0px 0px 1px 0px ${props => props.theme.colors.text_primary};
  transition: 0.1s;
  border-bottom: 2px solid ${props => props.border};
  background: ${props => props.theme.colors.lighter};
  color: ${props => props.theme.colors.yellow};
  &:hover{
    background: ${props => props.theme.colors.red};
  }
  &:active{
    color: ${props => props.theme.colors.red};
  }
`

const Overview = styled(Button)`
  border-right: 2px solid ${props => props.theme.colors.line};
  
`

const Categorical = styled(Button)`
`



export default function Tools() {
  const [main, setMain] = useState(true);


    return <Kontejner>
        {main ? <Overview border={'red'}  onClick={()=>{setMain(true)}}>List view</Overview> : <Overview onClick={()=>{setMain(true)}}>List view</Overview> } 
        {main ? <Categorical  onClick={()=>{setMain(false)}}>Categorical </Categorical> : <Categorical border={'red'}   onClick={()=>{setMain(false)}}>Categorical </Categorical>}
    
          {main ? <AlgoliaToolsTable/> : <AlgoliaToolsAltTable/>}    
    </Kontejner>;
  }
import {useState} from 'react';
import AlgoliaBitTable from "../components/tables/AlgoliaBitTable";
import AlgoliaContractTable from "../components/tables/AlgoliaContractTable";
import styled from 'styled-components'

const Button = styled.button`
  font-family: 'Staatliches';
  font-size: 1.5rem;
  margin-top: 1%;
  background: ${props => props.theme.colors.medium};
`

const ActButton = styled(Button)`
  background: ${props => props.theme.colors.lightGreen};
  color: ${props => props.theme.colors.text_title};
`

export default function Bits() {
  const [repos, setRepos] = useState(true)

    return <>
     {repos ? <ActButton>Recommended</ActButton> : <Button onClick={()=>{setRepos(true)}}>Recommended</Button>} 
      {repos ? <Button onClick={()=>{setRepos(false)}}>Contract library</Button> : <ActButton>Contract library</ActButton>}
        {repos ? <AlgoliaBitTable/> : <AlgoliaContractTable/> } 
    </>;
  }
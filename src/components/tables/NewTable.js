import {useState, useContext, useEffect} from 'react'
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import axios from 'axios'
import { FilterContext } from '../../contexts/FilterContext';


const NewTable = () => {
      //API data
      const {filterChain, filterSource, filterStage, filterUsage} = useContext(FilterContext);
      const [error, setError] = useState(null)
      const [response, setResponse] = useState()
      // Filter based on context 
      const getData = async () => {
        try {const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/bits${filterChain}&${filterSource}&${filterUsage}&pagination[pageSize]=100&sort=Update:ASC`)
        setResponse(res.data.data)
          setError(null)
          console.log(res.data.data)
      } catch (error) {
          setError(error)
      }
    }
  
  
    useEffect(
      () => {
          getData()
      },[filterChain, filterSource, filterStage, filterUsage] )

  return     <>
  { response.attributes ?   <Table data={response.attributes}>
  {(response) => (
    <>
      <Header>
        <HeaderRow>
          <HeaderCell>Task</HeaderCell>
          <HeaderCell>Deadline</HeaderCell>
          <HeaderCell>Type</HeaderCell>
          <HeaderCell>Complete</HeaderCell>
          <HeaderCell>Tasks</HeaderCell>
        </HeaderRow>
      </Header>

      <Body>
        {response.map((item) => (
          <Row key={item.id} item={item}>
            <Cell>{item.Title}</Cell>
            <Cell>{item.Description}</Cell>
          </Row>
        ))}
      </Body>
    </>
  )}
</Table> : null }
  

</>
};

export default NewTable
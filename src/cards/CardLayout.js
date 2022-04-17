
import { useEffect, useState, useContext } from 'react';
import { Grid, Col } from 'rsuite'
import Card from './Card';
import axios from 'axios'
import { FilterContext } from '../contexts/FilterContext';


function CardLayout() {
    const { appliedFilter, setAppliedFilter } = useContext(FilterContext);
    const [error, setError] = useState(null)
    const [response, setResponse] = useState()
    // Filter based on context 
    const getData = async () => {
      try {const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/bits`)
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
    },[appliedFilter] 
)

    // Filter dostat z contextu
    // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#find-users-having-john-as-first-name

    return (

            <Grid fluid>
            {response ? <>
            {response.map(data => (
                <div key={data.id}>  
                    <Col xs={12} sm={8} md={8} lg={6}>
                        <Card 
                            title={data.attributes.Title} 
                            description={data.attributes.Description} 
                            update={data.attributes.Update}
                            reference={data.attributes.Reference}
                            type={data.attributes.Type}
                            chain={data.attributes.Chain}
                        />
                    </Col></div>
            ))}
            </> : null}


            </Grid>
    );
}

export default CardLayout;






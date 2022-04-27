
import { useEffect, useState, useContext } from 'react';
import { Grid, Col } from 'rsuite'
import axios from 'axios'
import { FilterContext } from '../contexts/FilterContext';
import styled from 'styled-components'

import ChainCard from './Card'
import Card from './ChainCard';


const Kontejner = styled.div`
    padding-top: 2%;
    border-left: 0.1px solid black;
    padding-left: 5%;
    min-height: 4000px;
    @media (max-width: 768px) {
    padding: 0;
  }
`




function CardLayout() {


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
    },[filterChain, filterSource, filterStage, filterUsage] 
)



    return (
        <Kontejner>


            <ChainCard/>

            <Grid >
            {response ? <>
            {response.map(data => (
                <div key={data.id}>  
                    <Col xs={24} sm={24} md={12} lg={6}>
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
            </Kontejner>
    );
}

export default CardLayout;






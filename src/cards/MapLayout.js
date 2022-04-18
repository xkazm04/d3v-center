import { Grid, Col } from 'rsuite'
import MapCard from './MapCard';
import styled from 'styled-components'

const SectionBox = styled.div`
display: flex;
flex-direction: column;
width: 20rem;
height: 10rem;
background: #FFFFFF;
box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.02), 0px 4px 13px rgba(0, 0, 0, 0.03);
border-radius: 8px;
border: 1px solid black;
`

const Header=styled.div`

`

function MapLayout({header, title, logo}) {

    return (

            < >
            <SectionBox>
                <Header>header</Header>
                <Grid fluid>
                    <Col xs={12} sm={8} md={8} lg={6}>
                        <MapCard  title={title} logo={logo}/>
                    </Col>
            </Grid>
            </SectionBox>
            </>
    );
}

const data = [{
    id: "1",
    title: "title"
},{
    id: "2",
    title: "title"
}]

export default MapLayout;






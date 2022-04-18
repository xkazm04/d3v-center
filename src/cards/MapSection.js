import { Grid, Col } from 'rsuite'
import MapCard from './MapCard';



function MapLayout() {

    return (

            < >
                <Grid fluid>
                    <Col xs={12} sm={8} md={8} lg={6}>
                    <MapCard  title='title' logo='logo'/>
                    </Col>


            </Grid>
            </>
    );
}

export default MapLayout;






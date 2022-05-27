import styled from "styled-components";
import Loader from 'rsuite/Loader';


const Kontejner = styled.div`
    padding: 10%;
    margin: 2%;
`



const ToolSkeleton = () => {
    return <Kontejner>
          <Loader size="lg" content="One moment..." />
    </Kontejner>
  }

  export default ToolSkeleton;
import styled from 'styled-components'

const Box = styled.div`
    color: #b60000;
    font-size: 1.5rem;
    font-family: 'Staatliches';
`

const Err = ({content}) => {
    return <Box>{content}</Box>
}

export default Err;
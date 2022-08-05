import styled from 'styled-components';
const Box = styled.div`
  width: 100%; 
  background: ${props => props.theme.colors.landingFull};
  color: ${props => props.theme.colors.landingSubtitle};
  font-size: 1.2em;
  font-family: 'Staatliches';
  text-align: center;
  padding: 5px;
`

const CapsTitle = ({content}) => {
    return <Box>
        {content}
    </Box>
}

export default CapsTitle;
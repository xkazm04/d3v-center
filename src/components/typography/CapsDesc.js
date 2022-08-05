import styled from 'styled-components';
const Box = styled.div`
  text-align: center;
  margin-top: 1%;
  font-family: 'Staatliches';
  font-size: 1.1em;
  letter-spacing: 1.2px;
  margin-left: 15px;
  color: ${props => props.theme.colors.text_title};
`

const CapsDesc = ({content}) => {
    return <Box>
        {content}
    </Box>
}

export default CapsDesc;



import styled from 'styled-components';

const Div = styled.div`
  text-align: left;
  letter-spacing: 1.3px;
  font-family: 'Staatliches';
  font-size: 2em;
  color: ${props => props.theme.colors.landingTitle};
      @media (max-width: 700px) {
    font-size: 1.2em;
    padding-left: 10%;
    text-align: center;
  }
`

const BoxTitle = ({content}) => {
    return (
        <Div>{content}</Div>
    )
}

export default BoxTitle
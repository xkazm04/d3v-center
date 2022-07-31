import styled from 'styled-components';

const Div = styled.div`
  text-align: left;
  letter-spacing: 1.2px;
  font-family: 'Chilanka';
  font-size: 1.5em;
  padding-bottom: 1%;
  color: ${props => props.theme.colors.landingSubtitle};
  @media (max-width: 700px) {
    display: none;
  }
`


const BoxSubtitle = ({content}) => {
    return (
        <Div>{content}</Div>
    )
}

export default BoxSubtitle
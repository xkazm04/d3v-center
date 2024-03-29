import styled from 'styled-components';

const Div = styled.div`
  text-align: left;
  letter-spacing: 1.2px;
  font-family: 'Staatliches';
  text-decoration: underline;
  font-size: 1.5em;
  padding-bottom: 1%;
  color: ${props => props.theme.colors.text_primary};
  @media (max-width: 700px) {
    display: none;
  }
`


const SectionSubtitle = ({content}) => {
    return (
        <Div>{content}</Div>
    )
}

export default SectionSubtitle;
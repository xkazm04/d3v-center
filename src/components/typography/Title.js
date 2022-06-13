import styled from "styled-components"
const MyTitle = styled.div`
  text-align: left;
  padding-bottom: 1%;
  letter-spacing: 1.3px;
  font-family: 'NoBill';
  font-size: 2em;
  color: ${props => props.theme.colors.text_title};
      @media (max-width: 700px) {
    font-size: 1em;
    padding-left: 2%;
  }
`

const Title = ({title}) => {
    <MyTitle>{title}</MyTitle>
}

export default Title
import styled from 'styled-components'

const Desc = styled.div`
  font-family: 'Chilanka';
  font-size: 1.6em;
  margin: 3%;
  font-weight: bold;
  color: ${props => props.theme.colors.text_title};
  @media (max-width: 700px) {
       display: none;
  }
`

const SubnavDesc = ({content}) => {
    return<Desc>{content}</Desc>
}

export default SubnavDesc;
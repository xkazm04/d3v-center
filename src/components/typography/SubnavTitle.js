import styled from 'styled-components'

const Title = styled.div`
  font-family: 'Chilanka';
  font-size: 1.6em;
  color: ${props => props.theme.colors.landingTitle};
  margin: 3%;
  font-weight: bold;
  @media (max-width: 700px) {
       font-size: 1.4em;
  }
`

const SubnavTitle = ({content}) => {
    return<Title>{content}</Title>
}

export default SubnavTitle;
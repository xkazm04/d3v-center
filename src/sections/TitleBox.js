import styled from 'styled-components';
import BoxSubtitle from '../components/typography/BoxSubtitle';
import BoxTitle from '../components/typography/BoxTitle';


const HeadTitle = styled.div`
  margin-right: 2%;
  background: ${props => props.theme.colors.landingBox};
  border-radius: 15px;
  padding: 2%;
  @media (max-width: 700px) {
       display: none;
  }
`

const TitleRow = styled.div`
  width: 100%;
  border-bottom: 1px dashed ${props => props.theme.colors.line};
  padding-bottom: 1%;
`

const SubtitleRow = styled.div`
  padding-top: 5%;
`

const TitleBox = ({title, subtitle}) => {
    return<HeadTitle>
      <TitleRow>  <BoxTitle content={title}/></TitleRow>
      <SubtitleRow> <BoxSubtitle content={subtitle}/></SubtitleRow> 
    </HeadTitle>
}

export default TitleBox;
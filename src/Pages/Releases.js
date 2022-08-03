import styled from 'styled-components'
import ReleaseTable from '../components/tables/ReleaseTable'
import TitleBox from '../sections/TitleBox';

const Head = styled.div`
  display: flex;
 margin-top: 2%;
 padding-bottom: 2%;
 flex-direction: center;
 text-align: center;
 align-items: center;
 padding-left: 10%;
 border-bottom: 1px solid ${props => props.theme.colors.red};
 @media (max-width: 700px) {
       margin: 2px;
       padding: 2px;
  }
`


export default function Releases() {

    return <>
    <Head>
        <TitleBox title='Releases' subtitle='Check latest features and changes'/> 
      </Head>
    <ReleaseTable/></>;
  }
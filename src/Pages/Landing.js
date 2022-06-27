import {useState} from 'react'
import {Link} from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { Grid, Row, Col } from 'rsuite';
import ChartTutorial from "../components/charts/ChartUsage";
import ChartLang from "../components/charts/ChartLang";
import { DevelopIcon, CodeIcon } from "../icons/tool";
import ArticleSection from '../cards/ArticleSection';
import { ExitIcon, MediumIcon } from '../icons/utils';
import { Logo } from '../icons/main';
import Typewriter from 'typewriter-effect';
import { defFirstFile, defSecondFile, defThirdFile, tutDataFile, tutDefiFile, tutNftFile, tutSecFile } from '../data/landingCats';



const Kontejner = styled.div`
    margin: 2%;
    margin-left: 3%;
    @media (max-width: 700px) {
    margin: 0;
  }
`

const Section = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors.line};
    padding-bottom: 3%;
    padding-top: 2%;
`

const LeftBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const PictureBox = styled.div`
    opacity: 0.05;
    @media (max-width: 1200px) {
    display: none;
  }
`

const RightBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
`

const LogoBox = styled.div`
    position: absolute;
    top: 0;
    opacity: 0.2;
    @media (max-width: 1600px) {
        display: none;
  }
`

const Title = styled.h1`
    font-family: 'Inder';
    font-weight: 500;
    text-transform: uppercase;
    color: ${props => props.theme.colors.text_title};
    font-size: 2.4em;
    @media (max-width: 700px) {
        font-size: 2em;
  }
`

const Subtitle = styled.h2`
    font-family: 'Inder';
    font-weight: 500;
    text-transform: uppercase;
    color: ${props => props.theme.colors.text_secondary};
    font-size: 1.5em;
    @media (max-width: 700px) {
        font-size: 1em;
  }
`

const Services = styled.div`

`

const ServiceButton = styled.button`
    border-radius: 15px;
    background: inherit;
    border: 1px solid ${props => props.theme.colors.medium};
    padding: 1%;
    &:hover{
        opacity: 0.9;
        background: ${props => props.theme.colors.medium};
    }
`

const CodeBox = styled.div`
    display: flex;
    flex-direction: column;
    background: black;
    height: 100%;
    color: white;
    text-align: left;
    padding-bottom: 2%;
    font-family: 'Courier';
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 5%;
`

const Pre = styled.pre`
    background: ${props => props.theme.colors.heavy};
    padding-left: 5%;
`


const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 150px;
`

const CodeTitle = styled.div`
    color: ${props => props.theme.colors.text_title};
    font-weight: 700;
    text-transform: uppercase;
    padding-bottom: 15%;
`

const MyLink = styled(Link)`
    background: ${props => props.theme.colors.background};
    border-radius: 5px;
    &:hover{
        text-decoration: none;
    }
`



const Loop = ({str}) => {
    return<Typewriter
    options={{
        strings: [str],
        autoStart: true,
        delay: 100,
        loop: true
    }}/>
}



export default function Landing() {
    const theme = useTheme()
    const [serviceDescription, setServiceDescription] = useState('')

    const [firstFile, setFirstFile] = useState(null)
    const [secondFile, setSecondFile] = useState(null)
    const [thirdFile, setThirdFile] = useState(null)
    const [fourthFile, setFourthFile] = useState(null)

    const handleDescription = ( desc,first,second,third, fourth  ) => {
        setServiceDescription(desc);
        setFirstFile(first)
        setSecondFile(second)
        setThirdFile(third)
        setFourthFile(fourth)
    }
    // Přidat animaci na rozdělení stylu
    // Oddělit do souboru data pro každou sekci 
    return <Kontejner>
                <Section>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} md={12}>
                                <LeftBox>
                                <LogoBox><Logo width='40%' colorStroke={theme.tool.logo} colorFill={theme.tool.logo}/></LogoBox>
                                    <Title>Eat all the web3 wisdom</Title>
                                    <Subtitle>Learn to write dapps for free and shape future of web3</Subtitle>
                                </LeftBox>
                            </Col>
                            <Col xs={24} md={12}>
                                <Services>
                                   <ServiceButton onClick={()=>{handleDescription('Tutorials',tutDefiFile,tutNftFile,tutSecFile,tutDataFile)}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                   <ServiceButton onClick={()=>{handleDescription('Definitions', defFirstFile, defSecondFile, defThirdFile, null)}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                   <ServiceButton onClick={()=>{handleDescription('Repositories')}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                   <ServiceButton onClick={()=>{handleDescription('Tools')}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                   <ServiceButton onClick={()=>{handleDescription('Releases')}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                </Services>
                      {serviceDescription === '' ? null :    <CodeBox>
                           {serviceDescription === 'Tutorials' ? <Pre>Tutorials, "How to" articles and video guides <MyLink to='/tutorials'> <ExitIcon width='15' color={theme.chart.torso} /> </MyLink></Pre> : null}     
                           {serviceDescription === 'Definitions' ? <Pre>Definitions and theory behind blockchains <MyLink to='/definitions'> <ExitIcon width='15' color={theme.chart.torso} /> </MyLink></Pre> : null} 
                           {serviceDescription === 'Repositories' ? <Pre>Definitions and theory behind blockchains <MyLink to='/repos'> <ExitIcon width='15' color={theme.chart.torso} /> </MyLink></Pre> : null} 
                           {serviceDescription === 'Tools' ? <Pre>Definitions and theory behind blockchains <MyLink to='/tools'> <ExitIcon width='15' color={theme.chart.torso} /> </MyLink></Pre> : null} 
                           {serviceDescription === 'Releases' ? <Pre>Definitions and theory behind blockchains <MyLink to='/releases'> <ExitIcon width='15' color={theme.chart.torso} /> </MyLink></Pre> : null} 
                                   <FlexRow>
                                    <FlexColumn>
                                        <CodeTitle> {firstFile && <Loop str={firstFile.title}/> } </CodeTitle>
                                           {firstFile && <Loop str={firstFile.step1}/> } 
                                           {firstFile && <Loop str={firstFile.step2}/> } 
                                           {firstFile && <Loop str={firstFile.step3}/> } 
                                           {firstFile && <Loop str={firstFile.step4}/> } 
                                           {firstFile && <Loop str={firstFile.step5}/> } 

                                    </FlexColumn>
                                    <FlexColumn>
                                    <CodeTitle> {secondFile && <Loop str={secondFile.title}/> } </CodeTitle>
                                           {secondFile && <Loop str={secondFile.step1}/> } 
                                           {secondFile && <Loop str={secondFile.step2}/> } 
                                           {secondFile && <Loop str={secondFile.step3}/> } 
                                           {secondFile && <Loop str={secondFile.step4}/> } 
                                           {secondFile && <Loop str={secondFile.step5}/> } 
                                    </FlexColumn>
                                    <FlexColumn>
                                    <CodeTitle> {thirdFile && <Loop str={thirdFile.title}/> } </CodeTitle>
                                           {thirdFile && <Loop str={thirdFile.step1}/> } 
                                           {thirdFile && <Loop str={thirdFile.step2}/> } 
                                           {thirdFile && <Loop str={thirdFile.step3}/> } 
                                           {thirdFile && <Loop str={thirdFile.step4}/> } 
                                           {thirdFile && <Loop str={thirdFile.step5}/> } 
                                    </FlexColumn>
                                    <FlexColumn>
                                 {fourthFile &&  <> <CodeTitle> {fourthFile && <Loop str={fourthFile.title}/> } </CodeTitle>
                                           {fourthFile && <Loop str={fourthFile.step1}/> } 
                                           {fourthFile && <Loop str={fourthFile.step2}/> } 
                                           {fourthFile && <Loop str={fourthFile.step3}/> } 
                                           {fourthFile && <Loop str={fourthFile.step4}/> } 
                                           {fourthFile && <Loop str={fourthFile.step5}/> }</> }
                                    </FlexColumn>
                                    </FlexRow>
                                </CodeBox>}
                            </Col>
                        </Row>
                    </Grid>
                </Section>
                <Section>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} md={12}>
                                <LeftBox>
                                    <Title>Browse through 1000+ Resources</Title>
                                   <PictureBox> <DevelopIcon width='50%' color={theme.tool.develop}/></PictureBox>
                                </LeftBox>
                            </Col>
                            <Col xs={24} md={12}>
                                <RightBox>
                                        <ChartTutorial/>
                                </RightBox>
                            </Col>
                        </Row>
                    </Grid>
                </Section>
                <Section>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} md={12}>
                                <LeftBox>
                                    <Title>Learn step by step any dapp</Title>
                                   <PictureBox> <CodeIcon width='500' fillColor={theme.chart.var3_fill} strokeColor={theme.tool.code}/></PictureBox>
                                </LeftBox>
                            </Col>
                            <Col xs={24} md={12}>
                                <RightBox>
                                        <ChartLang/>
                                </RightBox>
                            </Col>
                        </Row>
                    </Grid>
                </Section>
                <Section>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} md={12}>
                                <LeftBox>
                                    <Title>D3V Path - 7/2022</Title>
                                </LeftBox>
                            </Col>
                            <Col xs={24} md={12}>
                                <RightBox>
                                      
                                </RightBox>
                            </Col>
                        </Row>
                    </Grid>
                </Section>
                <Section>
                        <Title>Latest articles & Announcements</Title>
                        <MediumIcon width={'40'}/>  
                    <ArticleSection/>
                </Section>
    </Kontejner>;
  }
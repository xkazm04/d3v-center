import {useState} from 'react'
import styled, { useTheme } from 'styled-components'
import { Grid, Row, Col } from 'rsuite';
import ChartTutorial from "../components/charts/ChartUsage";
import ChartLang from "../components/charts/ChartLang";
import { DevelopIcon, CodeIcon } from "../icons/tool";
import ArticleSection from '../cards/ArticleSection';
import { MediumIcon } from '../icons/utils';
import { Logo } from '../icons/main';


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

const Description = styled.div`
    margin-top: 5%;
    height: 8em;
    font-size: 1.5em;
    font-family: 'No bill';
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


export default function Landing() {
    const theme = useTheme()
    const [serviceDescription, setServiceDescription] = useState('Tutorials')
    return <Kontejner>
                <Section>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} md={12}>
                                <LeftBox>
                                <LogoBox><Logo width='40%' colorStroke={theme.tool.logo} colorFill={theme.tool.logo}/></LogoBox>
                                    <Title>Web3 Developer Library</Title>
                                    <Subtitle>Your central ticket to decentralized development</Subtitle>
                                </LeftBox>
                            </Col>
                            <Col xs={24} md={12}>
                                <Services>
                                   <ServiceButton onClick={()=>{setServiceDescription('Work!!')}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                   <ServiceButton onClick={()=>{setServiceDescription('Harder!!!')}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                   <ServiceButton onClick={()=>{setServiceDescription('Build!!')}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                   <ServiceButton onClick={()=>{setServiceDescription('No Pain, No GAIIN!')}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                   <ServiceButton onClick={()=>{setServiceDescription('JUST DO IT!!')}}><DevelopIcon width='50' color={theme.tool.develop}/></ServiceButton>
                                </Services>
                                <Description>{serviceDescription}</Description>
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
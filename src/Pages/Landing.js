import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { Grid, Row, Col } from 'rsuite';
import ChartTutorial from "../components/charts/ChartUsage";
import ChartLang from "../components/charts/ChartLang";
import { DevelopIcon, CodeIcon } from "../icons/tool";
import ArticleSection from '../sections/ArticleSection';
import { GithubIcon, MediumIcon } from '../icons/utils';
import { Logo } from '../icons/main';
import { defFirstFile, defSecondFile, defThirdFile, tutDataFile, tutDefiFile, tutNftFile, tutSecFile, pathFirstFile, pathSecondFile, pathThirdFile } from '../data/landingCats';
import LoopBox from '../components/boxes/LoopBox';
import { DefinitionIcon, PathIcon, TutorialIcon } from '../icons/landing';
import { PathSection } from '../icons/sections';
import CharTotal from '../components/charts/ChartTotal';
import { ExitArrow } from '../icons/arrows';
import axios from 'axios'
import { TotalsContext } from '../contexts/TotalsContext'


const Pulse = styled.div`
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  animation: pulse-red 2s infinite;
  border-radius: 5px;
  &:hover{
    background: black;
  }
@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}
`

const MainPulse = styled.div`
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  padding: 2%;
  animation: pulse-main 2s infinite;
  border-radius: 5px;
  transition: 0.2s;
  &:hover{
    background: black;
  }
@keyframes pulse-main {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 116, 99, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 116, 99, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 116, 99, 0);
  }
}
`

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
    line-height: 1em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.text_title};
    font-size: 2.4em;
    @media (max-width: 700px) {
        font-size: 2em;
  }
`

const Subtitle = styled.h2`
    margin-top: 2%;
    font-family: 'Staatliches';
    font-style: "italic";
    font-weight: 500;
    line-height: 1em;
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
    margin-right: 20%;
    @media (max-width: 1300px) {
        margin-right: 0;
  }
`

const Pre = styled.div`
    display: flex;
    background: ${props => props.theme.colors.heavy};
    margin: 2%;
    padding: 2%;
`


const MyLink = styled(Link)`
    border-radius: 5px;
    transition: 0.1s;
    margin-left: 5%;
    &:hover{
        text-decoration: none;
        background: ${props => props.theme.colors.light};
    }
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2%;
    height: 70px;
    width: 70px;
    font-family: 'NoBill';
    align-items: center;
    color: ${props => props.theme.colors.text_primary};
    font-size: 1.2em;
    border: 1px dashed ${props => props.theme.colors.lineAlt};
`

const PathPicture = styled.div`
display: flex;
justify-content: space-around;
    margin-left: 5%;
    margin-top: 5%;
`

const AbsoluteBox = styled.div`
    position: absolute;
    right: 15rem;
    margin-top: 50px;
`

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

    const token = process.env.REACT_APP_CMS_API
    const {setTotalTut,setTotalDef,setTotalRep,setTotalTool} = useContext(TotalsContext)

    const getTutorials = async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials`, {headers: {
                Authorization: `Bearer ${token}`
                    }},)
            const data = response.data.meta.pagination.total
                setTotalTut(data)
            } catch(error){
                console.log(error)
            }
        }
    
    const getDefinitions = async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/definitions`, {headers: {
                Authorization: `Bearer ${token}`
                    }},)
            const data = response.data.meta.pagination.total
                setTotalDef(data)
            } catch(error){
                console.log(error)
            }
        }
    
    const getTools = async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tools`, {headers: {
                Authorization: `Bearer ${token}`
                    }},)
            const data = response.data.meta.pagination.total
                setTotalTool(data)
            } catch(error){
                console.log(error)
            }
        }

        const getRepos = async() => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/repos`, {headers: {
                    Authorization: `Bearer ${token}`
                        }},)
                const data = response.data.meta.pagination.total
                    setTotalRep(data)
                } catch(error){
                    console.log(error)
                }
            }

    useEffect(() => {
        getTutorials()
        getDefinitions()
        getTools()
        getRepos()
        // eslint-disable-next-line 
    },[])

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
                                <ServiceButton onClick={()=>{handleDescription('Path',pathFirstFile, pathSecondFile, pathThirdFile, null)}}>
                                        <Flex><PathIcon width='50' height='50' color={theme.colors.text_title}/>D3V path</Flex>
                                </ServiceButton>
                                <ServiceButton onClick={()=>{handleDescription('Tutorials',tutDefiFile,tutNftFile,tutSecFile,tutDataFile)}}>
                                        <Flex><TutorialIcon width='50' color={theme.colors.text_title}/>Tutorials</Flex>
                                </ServiceButton>
                                   <ServiceButton onClick={()=>{handleDescription('Definitions', defFirstFile, defSecondFile, defThirdFile, null)}}>
                                              <Flex> <DefinitionIcon width='50' color={theme.colors.text_title}/>Theories</Flex>
                                   </ServiceButton>
                                   <ServiceButton onClick={()=>{handleDescription('Repositories')}}>
                                        <Flex><GithubIcon width='50' color={theme.colors.text_title}/>Repos</Flex>
                                    </ServiceButton>
                                   <ServiceButton onClick={()=>{handleDescription('Tools')}}>
                                    <Flex><DevelopIcon width='50' color={theme.colors.text_title}/>Tools</Flex>
                                </ServiceButton>
                                </Services>
                             {serviceDescription === '' ? null :    <CodeBox>
                            {serviceDescription === 'Path' ? <Pre>Find guidance anywhere on your dev journey <MyLink to='/path'> <Pulse><ExitArrow width='15' color={theme.chart.torso} /> </Pulse></MyLink></Pre> : null} 
                           {serviceDescription === 'Tutorials' ? <Pre>Tutorials, "How to" articles and video guides <MyLink to='/tutorials'><Pulse><ExitArrow width='15' color={theme.chart.torso} /></Pulse>  </MyLink></Pre> : null}     
                           {serviceDescription === 'Definitions' ? <Pre>Definitions and theory behind blockchains <MyLink to='/definitions'> <Pulse><ExitArrow width='15' color={theme.chart.torso} /></Pulse> </MyLink></Pre> : null} 
                           {serviceDescription === 'Repositories' ? <Pre>Tons of repositories for your inspiration<MyLink to='/repos'> <Pulse><ExitArrow width='15' color={theme.chart.torso} /></Pulse> </MyLink></Pre> : null} 
                           {serviceDescription === 'Tools' ? <Pre>Tools to help bootstrap your project and spare time<MyLink to='/tools'> <Pulse><ExitArrow width='15' color={theme.chart.torso} /></Pulse> </MyLink></Pre> : null} 
                                <LoopBox loop={true} firstFile={firstFile} secondFile={secondFile} thirdFile={thirdFile} fourthFile={fourthFile}/>
                                </CodeBox>}
                            </Col>
                        </Row>
                    </Grid>
                </Section>
                <Section>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} md={24}>
                                <LeftBox>
                                    <Title>D3V Path  <AbsoluteBox><MainPulse><MyLink to='/path'><ExitArrow width='35' color={theme.colors.text_title} /> </MyLink></MainPulse></AbsoluteBox></Title>
                                    <Subtitle>Use guidance at any point of your struggle</Subtitle>
                                    <PathPicture><PathSection width={'1200'} height={'300'} color={theme.colors.text_primary}/></PathPicture>
                                </LeftBox>
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
                                        <CharTotal/>
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
                        <Title>Latest articles & Announcements</Title>
                        <MediumIcon width={'40'}/>  
                    <ArticleSection/>
                </Section>
    </Kontejner>;
  }
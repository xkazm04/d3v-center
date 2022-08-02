import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { Grid, Row, Col } from 'rsuite';
import ChartTutorial from "../components/charts/ChartUsage";
import { DevelopIcon } from "../icons/tool";
import ArticleSection from '../sections/ArticleSection';
import { GithubIcon, MediumIcon } from '../icons/utils';
import { Logo } from '../icons/main';
import { DefinitionIcon, PathIcon, TutorialIcon } from '../icons/landing';
import { PathSection } from '../icons/sections';
import CharTotal from '../components/charts/ChartTotal';
import { ExitArrow } from '../icons/arrows';
import axios from 'axios'
import { TotalsContext } from '../contexts/TotalsContext'
import  {motion,useScroll} from "framer-motion/dist/framer-motion"
import path from '../images/path.png'
import tuts from '../images/tutorials.png'
import defs from '../images/defs.png'
import tools from '../images/tools.png'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Pulse = styled.div`
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  animation: pulse-red 2s infinite;
  border-radius: 5px;
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
    margin-left: 15%;
    margin-right: 10%;
    animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @media (max-width: 1400px) {
    margin: 4%;
  }
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

const RightBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    border-left: 1px dashed ${props => props.theme.colors.line};
    border-right: 1px dashed ${props => props.theme.colors.line};
`

const LogoBox = styled.div`
    position: absolute;
    top: -20;
    opacity: 0.2;
    @media (max-width: 1600px) {
        display: none;
  }
`

const Title = styled.h1`
    font-family: 'Staatliches';
    font-weight: 500;
    line-height: 1em;
    text-transform: uppercase;
    color: #d9d9d9;
    font-size: 2.4em;
    padding: 5px;
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
    color: #d7fff2;
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

const ActButton = styled(ServiceButton)`
    background: ${props => props.theme.colors.red};
`



const MyLink = styled(Link)`
    border-radius: 5px;
    transition: 0.1s;
    width: 20px;
    margin-left: 5%;
    &:hover{
        text-decoration: none;
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
    margin-top: 10px;
    @media (max-width: 900px) {
        display: none;
  }
`

const TitleBox = styled.div`
    border: 1px solid ${props => props.theme.colors.line};
    border-radius: 15px;
    padding: 1%;
    background:  ${props => props.theme.colors.landingBox};
`

const Progress = styled.div`
    position: fixed;
    top: 150;
     width: 100%;
`

const ProgressBar = styled.div`
    height: 2px;
    opacity: 0.7;
    background: ${props => props.theme.colors.lineAlt};
`

const DescBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2%;
    padding-left: 3%;
    padding-right: 3%;
    background: ${props => props.theme.colors.lightGreen};
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 5px;
`

const VisualSection = styled.div`
    background: ${props => props.theme.colors.landingBox};
    width: 30%;
    border-right: 1px dashed ${props => props.theme.colors.line};
    font-family: 'Chilanka';
    font-size: 1.2em;
    color: ${props => props.theme.colors.text_title};
    padding-top: 2%;
    text-align: left;
    padding-left: 5%;
    padding-bottom: 2%;
`

const DescSection = styled(VisualSection)`
    background: inherit;
    width: 50%;
    @media (max-width: 900px) {
        display: none;
  }

`

const DescTitle = styled.div`
    padding-bottom: 2%;
    font-weight: bold; 
`

const SpaceBetween = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`

export default function Landing() {
    const theme = useTheme()
    const [serviceDescription, setServiceDescription] = useState('Path')

    const { scrollYProgress } = useScroll();

    const handleDescription = ( desc) => {
        setServiceDescription(desc);
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
        <Progress><motion.div style={{ scaleX: scrollYProgress }}   initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}><ProgressBar/></motion.div>  
                                                        </Progress>
                <Section>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} md={12}>
                                <LeftBox>
                                <LogoBox><Logo width='20%' colorStroke={theme.tool.logo} colorFill={theme.tool.logo}/></LogoBox>
                                    <TitleBox>
                                            <Title>Learn web3 anything </Title>
                                            <Subtitle>Dev related</Subtitle>
                                    </TitleBox>
                                </LeftBox>
                            </Col>
                            <Col xs={24} md={12}>
                                <Services>

        {serviceDescription === 'Path' ? <ActButton><Flex><PathIcon width='50' height='50' color={theme.colors.text_title}/>D3V path</Flex></ActButton> : 
        <ServiceButton onClick={()=>{handleDescription('Path')}}><Flex><PathIcon width='50' height='50' color={theme.colors.text_title}/>D3V path</Flex></ServiceButton>}

        {serviceDescription === 'Tutorials' ? <ActButton><Flex><TutorialIcon width='50' height='50' color={theme.colors.text_title}/>Tutorials</Flex></ActButton> : 
                <ServiceButton onClick={()=>{handleDescription('Tutorials')}}><Flex><TutorialIcon width='50' height='50' color={theme.colors.text_title}/>Tutorials</Flex></ServiceButton>}

        
        {serviceDescription === 'Definitions' ? <ActButton><Flex><DefinitionIcon width='50' height='50' color={theme.colors.text_title}/>Theory</Flex></ActButton> : 
                <ServiceButton onClick={()=>{handleDescription('Definitions')}}><Flex><DefinitionIcon width='50' height='50' color={theme.colors.text_title}/>Theory</Flex></ServiceButton>}


                                   <ServiceButton onClick={()=>{handleDescription('Repositories')}}>
                                        <Flex><GithubIcon width='50' color={theme.colors.text_title}/>Repos</Flex>
                                    </ServiceButton>


        {serviceDescription === 'Tools' ? <ActButton><Flex><DevelopIcon width='50' height='50' color={theme.colors.text_title}/>Tools</Flex></ActButton> : 
                <ServiceButton onClick={()=>{handleDescription('Tools')}}><Flex><DevelopIcon width='50' height='50' color={theme.colors.text_title}/>Tools</Flex></ServiceButton>}

                                </Services>
                            </Col>
                        </Row>
                    </Grid>
                    <DescBox>
                       {serviceDescription === 'Path' && <SpaceBetween>
                        
                        <VisualSection> <Zoom><img src={path} alt='Path' width={'350'}/></Zoom></VisualSection>
                        <DescSection><DescTitle>Seek guidance through the dev journey.</DescTitle>
                            <li>NFT collections</li>
                            <li>Defi lending & Dexes</li>
                            <li>Security best practices</li>
                            <li>Decentralized data storage</li>
                            <li>Maximal extractable value (MEV)</li>
                  
                        </DescSection>
                        <AbsoluteBox>   <MyLink to='/path'> <Pulse><ExitArrow width='15' color={theme.chart.torso} /> </Pulse></MyLink></AbsoluteBox>
                       </SpaceBetween>} 


                       {serviceDescription === 'Tutorials' && <SpaceBetween>
                        
                        <VisualSection> <Zoom><img src={tuts} alt='Path' width={'350'}/></Zoom></VisualSection>
                        <DescSection><DescTitle>Explore new techniques.</DescTitle>
                            <li>Setup project</li>
                            <li>Design tokenomics</li>
                            <li>Develop and get inspired</li>
                            <li>Secure</li>
                            <li>Deploy</li>

                        </DescSection>
                       
                        <AbsoluteBox>     <MyLink to='/tutorials'> <Pulse><ExitArrow width='15' color={theme.chart.torso} /> </Pulse></MyLink></AbsoluteBox>
                       </SpaceBetween>} 

                       {serviceDescription === 'Definitions' && <SpaceBetween>
                        
                        <VisualSection> <Zoom><img src={defs} alt='Defs' width={'350'}/></Zoom></VisualSection>
                        <DescSection><DescTitle>Learn web3 step by step.</DescTitle>
                            <li>Solidity language foundation</li>
                            <li>Blockchain architecture</li>
                            <li>Development trends</li>

                        </DescSection>
                       
                        <AbsoluteBox>    <MyLink to='/definitions'> <Pulse><ExitArrow width='15' color={theme.chart.torso} /> </Pulse></MyLink></AbsoluteBox>
                       </SpaceBetween>} 

                       {serviceDescription === 'Tools' && <SpaceBetween>
                        
                        <VisualSection> <Zoom><img src={tools} alt='Tools' width={'350'}/></Zoom></VisualSection>
                        <DescSection><DescTitle>Tripple the effectivity.</DescTitle>
                            <li>Code analysis</li>
                            <li>Frontend interaction</li>
                            <li>Monitoring tools</li>
                            <li>DAO nocode</li>
                        </DescSection>
                       
                        <AbsoluteBox>      <MyLink to='/tools'> <Pulse><ExitArrow width='15' color={theme.chart.torso} /> </Pulse></MyLink></AbsoluteBox>
                       </SpaceBetween>} 
                         
                    </DescBox>
                </Section>
                <Section>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} md={24}>
                                <LeftBox>
                                    <TitleBox>
                                            <Title>D3V Path  <AbsoluteBox><MainPulse><MyLink to='/path'><ExitArrow width='35' color={theme.colors.landingTitle} /> </MyLink></MainPulse></AbsoluteBox></Title>
                                            <Subtitle>Use guidance at any point of your struggle</Subtitle>
                                    </TitleBox>
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
                                <TitleBox>
                                          <Title>Browse through 1000+ Resources</Title>
                                    </TitleBox>
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
                    <TitleBox>
                        <Title>Latest articles & Announcements</Title>
                        <MediumIcon width={'40'}/>  
                        </TitleBox>
                    <ArticleSection/>
                </Section>
    </Kontejner>;
  }
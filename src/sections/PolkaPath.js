import styled from "styled-components";
import { ArrowIcon } from "../icons/nav";
import {Grid, Row, Col} from 'rsuite'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { fetchPolka } from "../data/graphQueries";
import { GqlPFilteredMapper, GqlPMapper, GqlPMapperAlt } from "./GqlMappers";
import CodeComponent from "../components/code/CodeComponent";

const token = process.env.REACT_APP_CMS_API


const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 100%;
    background: #212121;
    padding: 3%;
    padding-left: 5%;
    border-radius: 15px;  
`

const Box = styled.div`
    display: flex;
    min-width: 200px;
    flex-direction: column;
    padding: 10%;
    text-align: left;
    border-radius: 15px;
    @media (max-width: 1000px) {
      width: 100%;
      margin: 0;
  }
`

const ArticleButton = styled.button`
  border: 1px solid white;
  box-shadow: 0px 0px 3px 0px #e6007a;
  border-radius: 15px;
  font-weight: 500;
  margin: 5px;
  letter-spacing: 1px;
  color: white;
  transition: 0.1s;
  height: 30px;
  font-family: 'Chilanka';
  background: inherit;
  animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  &:hover{
    color: #e6007a;
  }
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const ProtocolBox = styled.div`
    width: 20%;
    margin: 5%;
`


const ArticleActButton = styled(ArticleButton)`
  background: inherit;
  &:hover{
    color: #e6007a;
  }
`

const Navigation = styled.div`
    display: flex;
    justify-content: center;
`

const Section = styled.div`
    display: flex;
    margin: 2%;
`

const Title = styled.div`
     color: #e6007a;
     font-family: 'NoBill';
    font-size: 2.5rem;
    align-self: center;
`

const TitleS = styled(Title)`
    font-size: 1.5em;
    font-weight: 700;
    border-bottom: 1px dashed #e6007a;
    width: 100%;
    text-align: center;
    margin: 5%;
`
  
export default function PolkaPath() {
    const [gqlError, setGqlError] = useState(false);
    const [tutorials, setTutorials] = useState()
    const [definitions, setDefinitions] = useState()
    const [tools, setTools] = useState();
    const [repos, setRepos] = useState();
    const [ch, setCh] = useState(false)
    const [arch, setArch] = useState(false)
    const [build, setBuild] = useState('Setup')

    const [step, setStep] = useState('Learn')
    
    const StepIcon =  <ArrowIcon color='#e6007a' width='30px' height='30px'/>

    const headers = {
        "authorization": `Bearer ${token}`,
        "content-Type": "application/json"
    }
    const gqlEndpoint = `${process.env.REACT_APP_ENVIRONMENT}/graphql`


    const graphqlPolkaQuery = {
        operationName: "FetchPolkaPath",
        query: fetchPolka
    }

    const fetchArticles = async({data}) => {
        try {
            const response = await axios( {
                url: gqlEndpoint,
                method: 'post',
                headers: headers,
                data: data
            })
            setTutorials(response.data.data.tutorials.data)
            setDefinitions(response.data.data.definitions.data)
            setTools(response.data.data.tools.data)
            setRepos(response.data.data.repos.data)
            setGqlError(false)

        } catch (err) {
            console.log(err);
            setGqlError(true)
        }
    } 

    const findPolka = async () => {
        await fetchArticles({data: graphqlPolkaQuery})
    }


    const toggleChains = () => {
        setCh(!ch)
    }

    const toggleArch = () => {
        setArch(!arch)
    }

    useEffect(() => {
        findPolka()
        // eslint-disable-next-line 
    },[])

    return <><Kontejner>
                <Title> POLKADOT</Title>
                {gqlError && <>Failed to fetch data</>}
        <Navigation>  
           <ArticleActButton onClick={()=>{setStep('Setup')}}>Setup</ArticleActButton>  {StepIcon}  
            <ArticleActButton onClick={()=>{setStep('Learn')}}>Learn</ArticleActButton>  {StepIcon}  
            <ArticleActButton onClick={()=>{setStep('Build')}}>Build</ArticleActButton>
        
        </Navigation>
        {ch && step === 'Learn' && <Flex><ProtocolBox>
                    <TitleS>Defi protocols</TitleS> 
                        <ArticleButton>Acala</ArticleButton>
                        <ArticleButton>Centrifuge</ArticleButton>
                        <ArticleButton>Coinversation</ArticleButton>
                        <ArticleButton>Composable</ArticleButton>
                        <ArticleButton>HydraDX</ArticleButton>
                        <ArticleButton>Interlay</ArticleButton>
                        <ArticleButton>Parallel</ArticleButton>
                        <ArticleButton>Polkadex</ArticleButton>
                        </ProtocolBox>
                        <ProtocolBox>
                    <TitleS>...5 more categories</TitleS> 
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        </ProtocolBox>
                        <ProtocolBox>
                    <TitleS>...5 more categories</TitleS> 
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        </ProtocolBox>
                        <ProtocolBox>
                    <TitleS>...5 more categories</TitleS> 
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        <ArticleButton>..</ArticleButton>
                        </ProtocolBox>
                        
                        </Flex>
                   
                    }
        <Grid>
            <Row>
                
        {step === 'Setup' &&  <Section>
             Setup section

        </Section>}
        {step === 'Learn' &&  <Section>
                <Col xs={12} md={4}>
                <Box>
                    <TitleS>Path</TitleS> 
                        <ArticleButton onClick={toggleArch}>Architecture</ArticleButton>
                        <ArticleButton onClick={toggleArch}>Crosschain</ArticleButton>
                        <ArticleButton onClick={toggleChains}>Parachains</ArticleButton>
                    </Box>
                

                </Col>
                {ch && <>Parachain introduction, milestones, tech</>}
                {arch &&  <>
                            <GqlPFilteredMapper data={definitions} title={'Bridge'} filter={'Bridge'}/>
                            <GqlPFilteredMapper data={definitions} title={'Protocol'} filter={'Protocol'}/>
                        </>
                    }
        </Section>}
        {step === 'Build' && <Section>
        <Col xs={12} md={4}> <Box>
                    <TitleS>Path</TitleS> 
                        <ArticleButton  onClick={()=>{setBuild('Setup')}}>Setup</ArticleButton>
                        <ArticleButton  onClick={()=>{setBuild('Defi')}}>Defi</ArticleButton>
                        <ArticleButton  onClick={()=>{setBuild('NFT')}}>NFT</ArticleButton>
                    </Box></Col>
            
             
                <Col xs={24} md={10}>
                    {build}
                    <GqlPMapper data={tutorials} title={'Tutorial'} />
                </Col>
                <Col xs={24} md={10}>
                  <GqlPMapper data={tools} title={'Tools'}/>
                    <GqlPMapperAlt data={repos} title={'Repos'}/>
                </Col>

        </Section>}
        </Row>
        {step === 'Build' && <>
        <Section>
                <Grid>  
                   <Title>Code comparison</Title>
                    <ArticleActButton>Example 1</ArticleActButton>     
                    <ArticleActButton>Example 2</ArticleActButton>     
                    <ArticleActButton>Example 3</ArticleActButton>     
                    <ArticleActButton>Example 4</ArticleActButton>
                    <Row>
                        <Col xs={12}>
                            <Box>
                                <CodeComponent code={'code snippet Ink!'}/>
                            </Box>
                        </Col>
                        <Col xs={12}>
                            <Box>
                                <CodeComponent code={'code snippet Ink!'}/>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
        </Section>
        </>}
        </Grid>
    </Kontejner>
    </>
  }
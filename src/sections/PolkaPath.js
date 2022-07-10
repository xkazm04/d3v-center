import styled from "styled-components";
import { ArrowIcon } from "../icons/nav";
import {Grid, Row, Col} from 'rsuite'
import {useState} from 'react'
import axios from 'axios'
import { fetchPolka } from "../data/graphQueries";
import { GqlPMapper, GqlPMapperAlt } from "./GqlMappers";

const token = process.env.REACT_APP_CMS_API


const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 100%;
    background: #2f2f2f;
    padding: 3%;
    padding-left: 5%;
    border-radius: 15px;  
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2%;
    text-align: left;
    border: 1px solid #e6007a;
    border-radius: 15px;
    @media (max-width: 1000px) {
      width: 100%;
      margin: 0;
  }
`

const ArticleButton = styled.button`
  border: 1px solid white;
  border-radius: 15px;
  font-weight: 700;
  margin: 5px;
  color: white;
  transition: 0.1s;
  height: 30px;
  font-family: 'Spectral', serif;
  background: #CE006D;
  animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  &:hover{
    background: ${props => props.theme.colors.green};
  }
`



const ArticleActButton = styled(ArticleButton)`
  background: #CE006D;
  &:hover{
    background:  ${props => props.theme.colors.step};
  }
`

const Navigation = styled.div`
    display: flex;
`

const Section = styled.div`
    display: flex;
    margin: 2%;
`

const Code = styled.code`
    color: white;
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
    const [hidden, setHidden] = useState(true)

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

    const toggleHidden = () => {
        setHidden(!hidden)
    }

    return <><Kontejner>
                <Title> POLKADOT</Title>
                {gqlError && <>Failed to fetch data</>}
        <Navigation>  
        <ArticleButton onClick={findPolka}>Fetch</ArticleButton>{StepIcon} 
        <ArticleActButton onClick={()=>{setStep('Learn')}}>Learn</ArticleActButton>  {StepIcon}  
        <ArticleActButton onClick={()=>{setStep('Build')}}>Build</ArticleActButton>
        
        </Navigation>
        <Grid>
            <Row>
                
        {step === 'Learn' &&  <Section>
                <Col xs={12} md={4}>
                <Box>
                    <TitleS>Path</TitleS> 
                        <ArticleButton onClick={toggleHidden}>Crosschain</ArticleButton>
                        <ArticleButton>Architecture</ArticleButton>
                        <ArticleButton>Protocols</ArticleButton>
                    </Box>
                
                {hidden ? null :  <Box>
                    <TitleS>ChainCategory1</TitleS> 
                        <ArticleButton>Chain1</ArticleButton>
                        <ArticleButton>Chain2</ArticleButton>
                        <ArticleButton>Chain3</ArticleButton>
                    <TitleS>ChainCategory2</TitleS> 
                        </Box>
                    }
                </Col>
              <GqlPMapper data={definitions} title={'Defs'}/>
        </Section>}
        {step === 'Build' && <Section>
        <Col xs={12} md={4}> <Box>
                    <TitleS>Path</TitleS> 
                        <ArticleButton onClick={toggleHidden}>Crosschain</ArticleButton>
                        <ArticleButton>Architecture</ArticleButton>
                        <ArticleButton>Protocols</ArticleButton>
                    </Box></Col>
                
                {hidden ? null :   <Col xs={12} md={4}><Box>
                    <TitleS>ChainCategory1</TitleS> 
                        <ArticleButton>Chain1</ArticleButton>
                        <ArticleButton>Chain2</ArticleButton>
                        <ArticleButton>Chain3</ArticleButton>
                    <TitleS>ChainCategory2</TitleS> 
                        </Box></Col> 
                    }
                <GqlPMapper data={tutorials} title={'Tuts'}/>
                <Col xs={24} md={10}>
                    <GqlPMapper data={tools} title={'Tools'}/>
                    <GqlPMapperAlt data={repos} title={'Repos'}/>
                </Col>
        </Section>}
        </Row>
        {step === 'Build' && <>
        <Section>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Box>
                                <ArticleButton>Step1</ArticleButton>
                            </Box>
                        </Col>
                        <Col xs={12}>
                            <Box>
                                <ArticleButton>Step1</ArticleButton>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
        </Section>
        <Section>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Box>
                               <pre><Code>Code</Code> </pre>
                            </Box>
                        </Col>
                        <Col xs={12}>
                            <Box>
                                 <pre><Code>Articles</Code> </pre>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
        </Section></>}
        </Grid>
    </Kontejner>
    </>
  }
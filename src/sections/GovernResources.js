import {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { fetchGovern } from '../data/graphQueries';
import { Grid, Row, Col } from 'rsuite';
import { Tooltip as TT, Whisper } from 'rsuite';

// Query sections 
const SectionTitle = styled.div`
    color: ${props => props.theme.colors.text_primary};
    width: 100%;
    font-weight: 700;
    padding: 2%;
    font-size: 1.1em;
    background: ${props => props.theme.colors.background};
    border-bottom: 1px solid ${props => props.theme.colors.line};
    font-family: 'Spectral', serif;
    border-radius: 5px;
    margin-bottom: 2%;
`

const Result = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    outline: none;
    padding: 1%;
    cursor: pointer;
    color: ${props => props.theme.colors.text_title};
    border-bottom: 1px solid ${props => props.theme.colors.background};
    &:hover{
        background: ${props => props.theme.colors.lighter};
        box-shadow: 0px 0px 10px 0px ${props => props.theme.colors.line};
    }
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`

const TitleA = styled.div`
  font-size: 1.1em;
  font-weight: 700;
`

const Category = styled.div`
    font-size: 0.9em;
    opacity: 0.8;
    &:hover{
        opacity: 1;
    }
`

const UpperTag = styled.div`
  background: ${props => props.theme.colors.red};
  border: 0.1px solid ${props => props.theme.chart.var3_fill};
  padding: 2px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 0.9em;
  border-radius: 15px;
  font-weight: 700;
`

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
`

const Section = styled.div`
    margin: 1%;
`

const Question = styled.div`
      font-family: 'Inder';
      font-style: 'Helvetica';
      padding: 1%;
      color: ${props => props.theme.colors.text_primary};
      font-weight: 500;
      font-size: 1em;
      border-bottom: 0.5px solid ${props => props.theme.colors.lineAlt};
      &:hover{
        cursor: help;
      }
`

const Q = ({question, speaker}) => {
    return (
        <Whisper trigger="hover" placement="bottom" speaker={<TT>{speaker}</TT>}><Question>{question}</Question></Whisper>
    )
}

export default function GovernResources() {
    const token = process.env.REACT_APP_CMS_API


    const [gqlError, setGqlError] = useState(false)
    const [result, setResult] = useState(false)
    const [tutorials, setTutorials] = useState(null)
    const [definitions, setDefinitions] = useState(null)
    const [tools, setTools] = useState(null)
    const [repos, setRepos] = useState(null)

    const headers = {
        "authorization": `Bearer ${token}`,
        "content-Type": "application/json"
    }
    const gqlEndpoint = `${process.env.REACT_APP_ENVIRONMENT}/graphql`

    const gqlQuery = {
        operationName: "FetchGovern",
        query: fetchGovern
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
    
    const findResources = async () => {
            setResult(true)
            await fetchArticles({data: gqlQuery})
        }
    
        useEffect(() => {
            findResources()
        // eslint-disable-next-line 
          }, []);
    

    return <Kontejner>
        {gqlError && 'Sorry, query error occured'}
         {result && <Grid> 
       <Row>
        <Col xs={24} md={9}>
           
    {tutorials && <Section>
    <SectionTitle>Tutorials</SectionTitle>
            {tutorials.map((tutorial) => (
                                <Result  key={tutorial.id}>
                                <Flex>  <TitleA>{tutorial.attributes.Title}</TitleA>   <Category>{tutorial.attributes.Description}</Category></Flex>    
                                </Result>
                        ))}
            <Flex>
            <SectionTitle>Ask yourself</SectionTitle>
                <Q question={"What's the utility behind token?"} speaker={<Flex>
                    <li>Governance (DAO)</li>
                    <li>Exchange of value (Payment)</li>
                </Flex>}/> 
                <Q question={"Are there demanded events to increase/decrease token supply?"} speaker={<Flex>
                    <li>Inflation => Business incentivization vs Selling pressure</li>
                    <li>Deflation => Transaction burning vs Increasing value </li>
                </Flex>}/> 
                <Q question={"Do you have enough money to sustain token price?"} speaker={'Find grants and pick your chain'}/> 
                <Q question={"Where are you going to find liquidity?"} speaker={'Unless you have enough float and volume, people won’t trade.'}/> 
                <Q question={"What's your vesting lockup?"} speaker={'Provide token stability – by preventing a massive selloff of crypto assets'}/> 
                <Q question={"How your token launch will look like? "} speaker={<Flex>
                    <li>Lockdrop</li>
                    <li>Liquidity bootstrap</li>
                    <li>Initial DEX offering</li>
                    <li>Dutch auctions</li>
                    <li>Launchpad</li>
                </Flex>}/> 


            </Flex>
            </Section>}
            </Col><Col xs={24} md={9}>
            {tools && <Section>
            <SectionTitle>Tools</SectionTitle>
                {tools.map((tool) => (
                        <Result  key={tool.id}>
                            <Flex><TitleA>  {tool.attributes.Title}</TitleA>  <Category>{tool.attributes.Description}</Category></Flex>      
                             <div> <UpperTag>{tool.attributes.Subcategory}</UpperTag></div>
                          
                        </Result>
                ))}
            </Section>}
            </Col>
            </Row>
            <Row>
            <Col xs={24} md={9}>
            {definitions && <Section>
            <SectionTitle>Definitions & Theory</SectionTitle>
                {definitions.map((definition) => (
                        <Result  key={definition.id}>
                            <Flex><TitleA>  {definition.attributes.Title}</TitleA>  <Category>{definition.attributes.Description}</Category></Flex>
                            <div>      
                              <UpperTag>{definition.attributes.Subcategory}</UpperTag>
                          </div>
                        </Result>
                ))}
            </Section>}
            </Col><Col xs={24} md={9}>
            {repos && <Section>
            <SectionTitle>Get inspired</SectionTitle>
                {repos.map((repo) => (
                        <Result  key={repo.id}>
                            <Flex><TitleA>  {repo.attributes.title}</TitleA>  <Category>{repo.attributes.description}</Category></Flex>
                            <div>      
                              <UpperTag>{repo.attributes.subcategory}</UpperTag>
                          </div>
                        </Result>
                ))}
            </Section>}    </Col>
                </Row>
            </Grid>}
    </Kontejner>;
  }
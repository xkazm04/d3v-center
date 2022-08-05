import {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { fetchGovern } from '../data/graphQueries';
import { Grid, Row, Col } from 'rsuite';
import { Tooltip as TT, Whisper } from 'rsuite';
import { GqlMapper, GqlRMapper } from './GqlMappers';
import GqlSection from './GqlSection';
import CapsTitle from '../components/typography/CapsTitle';
import SubmenuButton from '../components/buttons/SubmenuButton';
import CapsDesc from '../components/typography/CapsDesc';
import GovernChartSubsection from './GovernChartSubsection';

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
`

const Section = styled.div`
    margin-bottom: 1%;
    animation: fadeIn 0.5s;
    text-align: left;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`

const Question = styled.div`
      font-family: 'Chilanka';
      padding: 2%;
      color: ${props => props.theme.colors.text_primary};
      background: ${props => props.theme.colors.lighter};
      font-weight: 500;
      font-size: 1em;
      border-bottom: 0.5px solid ${props => props.theme.colors.lineAlt};
      &:hover{
        cursor: help;
      }
`

const SubNavigation = styled.div`
  display: flex;
  justify-content: center;
  background: ${props => props.theme.colors.blackwhite};
  padding-top: 1%;
`


const StepDescription = styled.div`
  background:  ${props => props.theme.colors.blackwhite};
  text-align: left;
  font-size: 1.1em;
  font-weight: 400;
`
const Column = styled.div`
    margin-right: 5%;
`

const Speaker = styled.div`
    color: white;
    font-size: 1.1em;
    font-family: 'Chilanka';
`

const Q = ({question, speaker}) => {
    return (
        <Whisper trigger="hover" placement="bottom" speaker={<TT><Speaker>{speaker}</Speaker></TT>}><Question>{question}</Question></Whisper>
    )
}

export default function GovernResources() {
    const token = process.env.REACT_APP_CMS_API

    const [sub, setSub] = useState('Tokenize')
    const [dao, setDao] = useState('Tools')
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
        <Col xs={24} md={11}><Column>
           <CapsTitle content='Tokenomics'/> 
        <StepDescription>
           <SubNavigation>
            <SubmenuButton phase={sub} item='Think' setItem={setSub}/>
            <SubmenuButton phase={sub} item='Study' setItem={setSub}/>
            <SubmenuButton phase={sub} item='Visualize' setItem={setSub}/>
            <SubmenuButton phase={sub} item='Tokenize' setItem={setSub}/>
            </SubNavigation>    
                {sub === 'Think' && <CapsDesc content='Think about engine behind the project'/>}
                {sub === 'Study' && <CapsDesc content='Create sustainable long-term token economy'/>}
                {sub === 'Visualize' && <CapsDesc content='Display roughly token distribution'/>}
                {sub === 'Tokenize' && <CapsDesc content='Build fundable utility token'/>}
        </StepDescription>
        {sub === 'Visualize' && <GovernChartSubsection/>}
        {tutorials && sub === 'Think' && <Section>
            <Flex>
            <GqlSection title='Ask yourself'/>
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
                </Flex>}
                /> 
            </Flex><Flex><GqlSection title='Design'/>
                        <Question>Initial supply and allocation to team, investors, community, and other stakeholders</Question>
                        <Question>Methods of distribution including token purchases, airdrops, grants, and partnerships</Question>
                        <Question>Revenue split between users, service providers, and protocol</Question>
                        <Question>Treasury size, structure, and intended uses</Question> 
                        <Question>Emission schedule including inflation, mint/burn rights, and supply caps</Question>
                        <Question>Coin governance including voting, escrow, stake-weighting, vesting, and gauges</Question> 
                        <Question>Miner and validator compensation such as fees, emissions, and penalties</Question> 
                        <Question>Usage of protocol’s native tokens versus external tokens (e.g. ETH, USDC)</Question> </Flex>
            </Section>}
            {definitions && sub === 'Study' && <Section> <GqlMapper data={definitions} title={'Study'}/></Section>}
            {repos && sub === 'Tokenize' && <Section> <GqlRMapper data={repos} title={'Get inspired'}/></Section>}
            </Column>
            </Col>
            
            {sub !== 'Visualize' && <Col xs={24} md={11}>
            <CapsTitle content='DAO'/> 
                <StepDescription>
                <SubNavigation>
                    <SubmenuButton phase={dao} item='Tools' setItem={setDao}/>
                    </SubNavigation>        
                    {dao === 'Tools' && <CapsDesc content='Tools DAO description'/>}

        </StepDescription>
                    {tools && dao === 'Tools' && <Section><GqlMapper data={tools} title={'Tools'}/></Section>}
            </Col>}
            </Row>
            </Grid>}
    </Kontejner>;
  }
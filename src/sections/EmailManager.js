import { fetchNewsPath } from '../data/graphQueries';
import {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { GqlMapper, GqlRMapper } from './GqlMappers';

const Kontejner = styled.div`
    display: flex;
    margin-left: 5%;
`
const Section = styled.div`
    padding: 1%;
    max-width: 500px;
    text-align: left;
`


const Title = styled.div`
    font-size: 1.8rem;
    font-family: 'Staatliches', cursive;
    color: ${props => props.theme.colors.text_primary};
`

const Subtitle = styled.div`
    font-size: 1.6rem;
    font-family: 'Staatliches', cursive;
    color: ${props => props.theme.colors.text_title};
`

const SecTitle = styled.div`
    color: ${props => props.theme.colors.text_primary};
    font-size: 1.5rem;
    font-family: 'Staatliches';
`

export default function EmailManager() {

    // 1. Create query variable for time filter
    // 2. UI template to display and manipulate states
    // 3. Email provider 
    // 4. Subscription / Tutorials, Guides, Releases, Tools 

    const [tutorials, setTutorials] = useState()
    const [repos,setRepos] = useState()
    const [tools,setTools] = useState()
    const [definitions,setDefinitions] = useState()
    const [gqlError, setGqlError] = useState()
    const [newsletter] = useState('subscribe to newsletter')
    const [err, setErr] = useState()

    const findSubscription = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/subs?filters[Email][eq]=${newsletter}`)
            console.log(res)
            if (res.data.length > 0) {
                setErr('You are already subscribed')
            }
        }  catch(e){
            setErr('Something went wrong on my side')
        }
    }

    const subscribe = async() => {
        const data = {
            data: {Email: newsletter}
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_ENVIRONMENT}/api/subs`, data)
            console.log(res)
        }  catch(e){
            await setErr('Unable to subscribe')
            await findSubscription()
        }
    }


    const gqlEndpoint = `${process.env.REACT_APP_ENVIRONMENT}/graphql`
    const token = process.env.REACT_APP_CMS_API;

    const headers = {
        "authorization": `Bearer ${token}`,
        "content-Type": "application/json"
    }

    const graphqlNewsQuery = {
        operationName: "FetchNews",
        query: fetchNewsPath
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

    const findNews = async () => {
        await fetchArticles({data: graphqlNewsQuery})
    }


    useEffect(() => {
        findNews()
        // eslint-disable-next-line 
    },[])


    return <>
    <Title>News</Title>
    <Subtitle>Subscribe to weekly updates</Subtitle>
    <div>
        {newsletter === 'subscribed'  ? <input type='email' value={newsletter} placeholder='Subscribe to newsletter'/> :  <input type='text'  value={newsletter} placeholder='Subscribed'/> }
        <button onClick={()=>{subscribe()}}>Submit</button>
        {err && <div>{err}</div>}
    </div>
    {gqlError && <>Error</>}

    <Kontejner>
    {definitions &&  <Section>
        <SecTitle>Definitions</SecTitle>
        <GqlMapper data={definitions} title='Definitions'/>
    </Section>}
    
    {tutorials &&  <Section>
            <SecTitle>Tutorials</SecTitle>
            <GqlMapper data={tutorials} title='Tutorials'/>
        </Section>}

    {tools &&  <Section>
        <SecTitle>Tools</SecTitle>
        <GqlMapper data={tools} title='Tools'/>
    </Section>}
    {repos &&  <Section>
        <SecTitle>Repositories</SecTitle>
        <GqlRMapper data={repos} title='Repositories'/>
        </Section>}
    </Kontejner>
    </>;
  }
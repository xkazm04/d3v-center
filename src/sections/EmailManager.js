import { fetchNewsPath } from '../data/graphQueries';
import {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Section = styled.div`
    padding-top: 3%;
`

const Kontejner = styled.div`
    display: flex;
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


    return <><button onClick={findNews}>Refetch</button>
    {gqlError && <>Error</>}

    <Kontejner>
    {definitions &&  <Section>
        {definitions.map((i) => (
                    <div  key={i.id}>
                                    <> <>{i.attributes.Title}</>    <>{i.attributes.Description}</></> 
                                    <div>   <>{i.attributes.Subcategory}</></div>
                            </div>
        ))}</Section>}
    
    {tutorials &&  <Section>
        {tutorials.map((i) => (
                    <div  key={i.id}>
                                    <> <>{i.attributes.Title}</>    <>{i.attributes.Description}</></> 
                                    <div>   <>{i.attributes.Subcategory}</></div>
                            </div>
        ))}</Section>}

    {tools &&  <Section>
        {tools.map((i) => (
                    <div  key={i.id}>
                                    <> <>{i.attributes.Title}</>    <>{i.attributes.Description}</></> 
                                    <div>   <>{i.attributes.Subcategory}</></div>
                            </div>
        ))}</Section>}
    {repos &&  <Section>
        {repos.map((i) => (
                    <div  key={i.id}>
                                    <> <>{i.attributes.title}</>    <>{i.attributes.description}</></> 
                                    <div>   <>{i.attributes.subcategory}</></div>
                            </div>
        ))}</Section>}
    </Kontejner>
    </>;
  }
import {useState} from 'react'
import styled from "styled-components";
import axios from 'axios'
import Select from 'react-select';
import { catOptions, chainOptions, subcatOptions } from '../../data/pathOptions';
import { DiffAdvanced, DiffBasic, DiffScholar } from '../../icons/difficulty';
import { Grid, Row, Col } from 'rsuite';
import CardPath from '../../cards/CardPath';
import ChainModal from '../../cards/ChainModal';

const token = process.env.REACT_APP_CMS_API // Master strapi token

const Kontejner = styled.div`
    background: ${props => props.theme.colors.light};
    margin-top: 2%;
    padding: 2%;
    @media (max-width: 1000px) {
        flex-direction: column;
     }
    @media (min-width: 3000px) {
        padding: 7%;
    }
`
const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    margin-left: 5%;
    text-align: left;
    @media (max-width: 1000px) {
    width: 100%;
    margin: 0;
  }
`

const BoxSubtitle = styled.div`
  text-align: left;
  letter-spacing: 1.2px;
  font-family: 'NoBill';
  font-size: 1.5em;
  padding-bottom: 1%;
  color: ${props => props.theme.colors.text_primary};
  @media (max-width: 1000px) {
    font-size: 1em;
    padding-left: 2%;
  }
`

const DisplayBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    margin-left: 5%;
    text-align: left;
    @media (max-width: 1000px) {
    width: 100%;
    margin: 0;
    margin-top: 4%;
  }
`
const Button = styled.button`
    padding: 1%;
    margin-top: 5%;
    font-family: 'NoBill';
    letter-spacing: 1.2px;
    background: ${props => props.theme.colors.text_title};
    color: ${props => props.theme.colors.background};
    width: 20%;
    &:hover{
        color: white;
    }
    @media (max-width: 1000px) {
    width: 40%;
  }
`


const MySelect = styled(Select)`
    margin-top: 4%;
    background: white;
    border: none;
    border-radius: 15px;
`

const BoxTitle = styled.div`
  text-align: left;
  padding-bottom: 1%;
  letter-spacing: 1.3px;
  font-family: 'NoBill';
  font-size: 2em;
  color: ${props => props.theme.colors.text_title};
   @media (max-width: 1000px) {
    font-size: 1em;
    padding-left: 2%;
  }
`
const SectionTitle = styled.div`
    width: 100%;
    padding: 1%;
    background: white;
    border-bottom: 1px solid ${props => props.theme.colors.line};
    font-family: 'Spectral', serif;
    border-radius: 5px;
    margin-bottom: 1%;
`

const RenderSection = styled.div`

`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
`

const FlexModal = styled.div`
    display: flex;
    flex-direction;
    justify-content: space-between;
`

const Category = styled.div`
    font-size: 0.7em;
    opacity: 0.8;
    &:hover{
        opacity: 1;
    }
`

const CardBox = styled.div`
    margin-top: 10%;
    @media (max-width: 1000px) {
    margin-top: 4%;
  }
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

const customStyles = {
    menu: (provided) => ({
      ...provided,
    }),
    control: (provided) => ({
        ...provided,
        background: '#ffffe4'
    }),
    option: (provided) => ({
        ...provided,
        fontSize: '1em'
    }),
    singleValue: (provided) => {
      const transition = 'opacity 300ms';
      return { ...provided, transition };
    }
  }

const Navigation = styled.div`
    display: flex;
    flex-direction: row;
`

const myTheme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary25: '#ffffe4',
      primary: '#1B5B44',
    },
})

export default function PathForm() {
    const [cat, setCat] = useState()
    const [chain, setChain] = useState(null)
    const [subcat, setSubcat] = useState(null)
    const [section] = useState('setup')


    const [tutorialsError, setTutorialsError] = useState(false)
    const [definitionsError, setDefinitionsError] = useState(false)
    const [reposError, setReposError] = useState(false)
    const [toolsError, setToolsError] = useState(false)

    const [result, setResult] = useState(false)
    const [tutorials, setTutorials] = useState(null)
    const [definitions, setDefinitions] = useState(null)
    const [tools, setTools] = useState(null)
    const [repos, setRepos] = useState(null)


    const fetchTutorials = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials?filters[Category][$in]=${cat.label}?filters[Category][$in]=${subcat.value}&pagination[pageSize]=10&sort=Update:DESC`, {
                headers: {
                Authorization: `Bearer ${token}`
            }})
                let data = res.data.data;
                setTutorials(data)
                console.log(chain)
        } catch (err) {
            console.log(err);
            setTutorialsError(true)
        }
    } 

    
    
    const fetchDefinitions = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/definitions?filters[Category][$in]=${cat.label}?filters[Category][$in]=${subcat.value}&pagination[pageSize]=10&sort=Update:DESC`, {
                headers: {
                Authorization: `Bearer ${token}`
            }})
                let data = res.data.data;
                setDefinitions(data)
        } catch (err) {
            console.log(err);
            setDefinitionsError(true)
        }
    }   

    const fetchTools = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tools?&pagination[pageSize]=10&sort=Update:DESC`, {
                headers: {
                Authorization: `Bearer ${token}`
            }})
                let data = res.data.data;
                setTools(data)
        } catch (err) {
            console.log(err);
            setToolsError(true)
        }
    }   

    const fetchRepos = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/repos?&pagination[pageSize]=10&sort=Update:DESC`, {
                headers: {
                Authorization: `Bearer ${token}`
            }})
                let data = res.data.data;
                setRepos(data)
        } catch (err) {
            console.log(err);
            setReposError(true)
        }
    }   

    // Call 5 API to CMS -> Retrieve 
    const findSomething = async () => {
        setResult(true)
        await fetchTutorials()
        await fetchDefinitions()
        await fetchTools()
        await fetchRepos()
    }

    const handleResultClick = (reference) => {
        window.open(reference, "_blank")
    }


    return <Kontejner>
        <Grid fluid>
            <Row>
        <Col xs={24} md={6}>
        <FormBox>
       <BoxTitle>Form title</BoxTitle>
       <FlexModal>      <BoxSubtitle> Subtitle</BoxSubtitle>  {chain && chain.value === 'evm' ? <ChainModal chain={chain.value}/> : null} </FlexModal>
            <MySelect
                value={cat}
                onChange={setCat}
                options={catOptions}
                placeholder='Use case category'
                styles={customStyles}
                theme={myTheme}
                 />
                    {cat && cat.value === 'nft' ? <MySelect value={subcat} onChange={setSubcat} options={subcatOptions} placeholder='Subcategory' styles={customStyles} theme={myTheme}/> : null}
                    {cat && cat.value === 'defi' ? <MySelect value={subcat} onChange={setSubcat} options={subcatOptions} placeholder='Subcategory' styles={customStyles} theme={myTheme}/> : null}
                    {cat && cat.value === 'social' ? <MySelect value={subcat} onChange={setSubcat} options={subcatOptions} placeholder='Subcategory' styles={customStyles} theme={myTheme}/> : null}
            <MySelect
                value={chain}
                onChange={setChain}
                options={chainOptions}
                placeholder='Blockchain'
                styles={customStyles}
                theme={myTheme}
                 />
                
                    {chain === 'some' ? <MySelect value={cat} onChange={setCat} options={catOptions} placeholder='Preferred language' styles={customStyles} theme={myTheme} /> : null}
             {cat !== null && subcat !== null && chain !== null ? <Button onClick={findSomething}>Find</Button> : <Button disabled onClick={findSomething}>Find</Button>}     

            {chain && result ? <CardBox><CardPath chain={chain}/></CardBox> : null}
        </FormBox>
        </Col>
        <Col xs={24} md={8}>
        {result &&
        <DisplayBox>
            <Navigation>
               <div> Nav1</div>
               <div> Nav2</div>
            </Navigation>
            {tutorials && <RenderSection>
            {section === 'setup' ? <> <SectionTitle>Tutorials</SectionTitle>
                <div >
                {tutorials.map((tutorial) => (
                        <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference)}>
                          <Flex>  {tutorial.attributes.Title}   <Category>{tutorial.attributes.Category}</Category></Flex>
                           <div>{tutorial.attributes.Difficulty === 'basic' ? <DiffBasic width={15}/> : null}
                            {tutorial.attributes.Difficulty === 'intermediate' ? <DiffScholar width={15}/> : null}
                            {tutorial.attributes.Difficulty === 'advanced' ? <DiffAdvanced widht={15}/> : null}</div> 
                        </Result>
                ))}
                </div></> : null}
            </RenderSection>}
            {definitions && <RenderSection>
            <SectionTitle>Definitions</SectionTitle>
            <div >
                {definitions.map((definition) => (
                        <Result  key={definition.id} onClick={()=>handleResultClick(definition.attributes.Reference)}>
                            {definition.attributes.Title}
                           <div>{definition.attributes.Difficulty === 'basic' ? <DiffBasic width={15}/> : null}
                            {definition.attributes.Difficulty === 'intermediate' ? <DiffScholar width={15}/> : null}
                            {definition.attributes.Difficulty === 'advanced' ? <DiffAdvanced widht={15}/> : null}</div> 
                        </Result>
                ))}
                </div>
            </RenderSection>}    
        </DisplayBox>   }
        </Col>
        <Col xs={24} md={8}>
        {result &&
        <DisplayBox>
            {tools && <RenderSection>
              <SectionTitle>Tooling</SectionTitle>
              <div >
                {tools.map((tool) => (
                        <Result  key={tool.id} onClick={()=>handleResultClick(tool.attributes.Reference)}>
                            {tool.attributes.Title}
                            <div>{tool.attributes.category === 'basic' ? <DiffBasic width={15}/> : null}
                            {tool.attributes.category === 'intermediate' ? <DiffScholar width={15}/> : null}
                            {tool.attributes.category === 'advanced' ? <DiffAdvanced widht={15}/> : null}</div> 
                        </Result>
                ))}
                </div>
            </RenderSection>}
            {repos && <RenderSection>
                <SectionTitle>Get inspiration</SectionTitle>
                <div >
                {repos.map((repo) => (
                        <Result  key={repo.id} onClick={()=>handleResultClick(repo.attributes.reference)}>
                            {repo.attributes.title}

                        </Result>
                ))}
                </div>
            </RenderSection>}
            { definitionsError && tutorialsError && toolsError && reposError && <div>Service unavailable due to the server maintanance</div>}
        </DisplayBox>}
            </Col>
            </Row>
        </Grid>
    </Kontejner>;
  }
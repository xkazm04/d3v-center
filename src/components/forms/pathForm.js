import {useState, useContext} from 'react'
import styled, {useTheme} from "styled-components";
import axios from 'axios'
import Select from 'react-select';
import { catOptions, subcatDaoFeatures,subcatDaoOptions, subcatNftOptions, subcatNftFeatures, subcatDefiFeatures, subcatDefiOptions} from '../../data/pathOptions';
import { DiffAdvanced, DiffBasic, DiffScholar } from '../../icons/difficulty';
import { Grid, Row, Col } from 'rsuite';
import ChainSelector from '../../cards/ChainSelector';
import { fetchDaoPath,fetchNftPath, fetchDefiPath, fetchSecPath, fetchSetup } from '../../data/graphQueries';
import {ArrowIcon} from '../../icons/nav'
import { ChainContext } from '../../contexts/ChainContext';
import ChainStats from '../charts/ChainStats';


const token = process.env.REACT_APP_CMS_API

const Kontejner = styled.div`
    background: ${props => props.theme.colors.medium};
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
  font-size: 1.6em;
  padding-bottom: 1%;
  color: ${props => props.theme.colors.text_primary};
  @media (max-width: 1000px) {
    font-size: 1.2em;
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
    font-size: 1.6em;
    padding-left: 2%;
  }
`
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

const RenderSection = styled.div`

`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
`

const FlexModal = styled.div`
    display: flex;
    justify-content: space-between;
`

const Category = styled.div`
    font-size: 0.9em;
    opacity: 0.8;
    &:hover{
        opacity: 1;
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
    margin-bottom: 2%;
    padding-left: 2%;
`

const ArticleButton = styled.button`
  border: 1px solid ${props => props.theme.colors.text_primary};
  border-radius: 15px;
  font-weight: 700;
  margin: 5px;
  color: ${props => props.theme.colors.text_primary};
  transition: 0.1s;
  height: 30px;
  font-family: 'Spectral', serif;
  background: ${props => props.theme.colors.background};
  &:hover{
    background: ${props => props.theme.colors.green};
  }
`

const ArticleActButton = styled(ArticleButton)`
  background: ${props => props.theme.colors.step};
  &:hover{
    background:  ${props => props.theme.colors.step};
  }
`

const SecButton = styled(ArticleButton)`
  border: 2px solid ${props => props.theme.chart.var3_stroke};
  &:hover{
    background: ${props => props.theme.colors.red};
  }
`

const Pulse = styled.div`
  background: rgba(255, 82, 82, 1);
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  animation: pulse-red 2s infinite;
  border-radius: 15px;
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

const SecActButton = styled(SecButton)`
  background: ${props => props.theme.colors.red};
`


const TagArea = styled.div`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  right: -5px;
  color: ${props => props.theme.colors.unicornFill};
`

const UpperTag = styled.div`
  background: ${props => props.theme.colors.red};
  border: 0.1px solid ${props => props.theme.chart.var3_fill};
  padding: 2px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 0.7em;
  border-radius: 15px;
  margin-bottom: 2px;
`

const StepDescription = styled.div`
  text-align: left;
  font-family: 'Helvetica';
  font-size: 1.2em;
  padding-left: 2%;
`

const SetupKontejner = styled.div`
  display: flex;
  justify-content: flex-start;
`

const SetupColumn = styled.div`
  padding: 5%;
  width: 100%;
  text-align: left;
`

const TitleA = styled.div`
  font-size: 1.1em;
  font-weight: 700;
`

const AbsoluteDescription = styled.div`
  font-style: italic;
  font-family: 'Inder';
  font-size: 1.1em;
  margin-left: 15px;
  color: ${props => props.theme.colors.text_title};
`

const SubNavigation = styled.div`
  padding-top: 1%;
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
     const theme = useTheme()
     const StepIcon =  <ArrowIcon color={theme.colors.text_title} width='30px' height='30px'/>

    const {blockchain} = useContext(ChainContext)
    const [cat, setCat] = useState({value: '', label: 'Use case category'})
    const [chain] = useState({value: 'evm', label: 'EVM'})
    const [subcat, setSubcat] = useState({value: '', label: 'Subcategory'})
    const [feature, setFeature] = useState([])
    const [lang] = useState({value: 'solidity', label: 'Solidity'})


    const [gqlError, setGqlError] = useState(false)

    const [result, setResult] = useState(false)
    const [tutorials, setTutorials] = useState(null)
    const [definitions, setDefinitions] = useState(null)
    const [tools, setTools] = useState(null)
    const [repos, setRepos] = useState(null)
    // Security articles are common for all use cases
    const [secTutorials, setSecTutorials] = useState(null)
    const [secDefinitions, setSecDefinitions] = useState(null)
    const [secTools, setSecTools] = useState(null)
    // Setup articles are common for all use cases
    const [setupTutorials, setSetupTutorials] = useState(null)
    const [setupTools, setSetupTools] = useState(null)

    const [step, setStep] = useState("Setup")
    const [setupState, setSetupState] = useState('Hardhat')

    const headers = {
        "authorization": `Bearer ${token}`,
        "content-Type": "application/json"
    }
    const gqlEndpoint = `${process.env.REACT_APP_ENVIRONMENT}/graphql`
    let filteredFeatures = feature.map(a => a.label);
    const graphqlNftQuery = {
        variables: {
            "chainL": chain.label,
            "chainV": chain.value,
            "cat": cat.label,
            "subcat": subcat.label,
            "feature": filteredFeatures,
            "lang": lang.label
        },
        operationName: "FetchNftPath",
        query: fetchNftPath
    }

    const graphqlDefiQuery = {
      variables: {
          "chainL": chain.label,
          "chainV": chain.value,
          "cat": cat.label,
          "subcat": subcat.label,
          "feature": filteredFeatures,
          "lang": lang.label
      },
      operationName: "FetchDefiPath",
      query: fetchDefiPath
  }

  const graphqlDaoQuery = {
    variables: {
        "chainL": chain.label,
        "chainV": chain.value,
        "cat": cat.label,
        "subcat": subcat.label,
        "feature": filteredFeatures,
        "lang": lang.label
    },
    operationName: "FetchDaoPath",
    query: fetchDaoPath
}

    const graphqlSecQuery = {
      variables: {
          "chainL": chain.label,
          "chainV": chain.value,
          "subcat": subcat.label,
          "feature": filteredFeatures,
          "lang": lang.label
      },
      operationName: "FetchSecPath",
      query: fetchSecPath
  }

  const graphqlSetupQuery = {
    variables: {
        "chainL": chain.label,
        "chainV": chain.value,
        "subcat": subcat.label,
        "feature": filteredFeatures,
        "lang": lang.label
    },
    operationName: "FetchSetup",
    query: fetchSetup
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


    const fetchSecurity =async() => {
        try {
            const response = await axios( {
                url: gqlEndpoint,
                method: 'post',
                headers: headers,
                data: graphqlSecQuery
            })
            setSecTutorials(response.data.data.tutorials.data)
            setSecDefinitions(response.data.data.definitions.data)
            setSecTools(response.data.data.tools.data)
        } catch (err) {
            console.log(err);
            setGqlError(true)
        }
    }

    const fetchSetups =async() => {
      try {
          const response = await axios( {
              url: gqlEndpoint,
              method: 'post',
              headers: headers,
              data: graphqlSetupQuery
          })
          setSetupTutorials(response.data.data.tutorials.data)
          setSetupTools(response.data.data.tools.data)
          setGqlError(false)
      } catch (err) {
          console.log(err);
          setGqlError(true)
      }
  }


    const findNft = async () => {
        setResult(true)
        await fetchArticles({data: graphqlNftQuery})
        await fetchSecurity()
        await fetchSetups()
    }

    const findDefi = async () => {
      setResult(true)
      await fetchArticles({data: graphqlDefiQuery})
      await fetchSecurity()
      await fetchSetups()
  }

    const findDao = async () => {
      setResult(true)
      await fetchArticles({data: graphqlDaoQuery})
  }


  const handleResultClick = async (reference,id,counter) => {
    window.open(reference, "_blank")
    if(counter){
      try {
        await addCounter(id,counter)
      } catch (err) {
        console.log("Error opening link")
      }
    }
}


  const addCounter = async(tutorialId,viewCounter) => {
      const updatedId = tutorialId.match(/\d+/)[0] // Extract id from string
      console.log(updatedId)
      const token = process.env.REACT_APP_CMS_API // Master strapi token
      const body = { data: { ViewCounter: viewCounter+1 } }
      const res = await axios.put(`https://d3v-center.herokuapp.com/api/tutorials/${updatedId}`, body, {
          headers: {
            Authorization: `Bearer ${token}`
          },
      })
      console.log(res)
    }


    return <Kontejner>
        <Grid fluid>
            <Row>
        <Col xs={24} md={6}>
        <FormBox>
        <UpperTag>Feature in alpha - supported only EVM/Solidity</UpperTag>
       <BoxTitle>D3V path</BoxTitle>
       <FlexModal>      <BoxSubtitle>Choose your path to buidl</BoxSubtitle>  </FlexModal>
            <MySelect
                value={cat}
                defaultValue={catOptions[1]}
                onChange={setCat}
                options={catOptions}
                placeholder='Use case category'
                styles={customStyles}
                theme={myTheme}
                 />
                    {cat && cat.value === 'nft' ? <MySelect value={subcat} onChange={setSubcat} options={subcatNftOptions} placeholder='Subcategory' styles={customStyles} theme={myTheme}/> : null}
                    {cat && cat.value === 'nft' ? <MySelect value={feature} onChange={setFeature} isMulti options={subcatNftFeatures} placeholder='Features (optional)' styles={customStyles} theme={myTheme}/> : null}
                    {cat && cat.value === 'defi' ? <MySelect value={subcat} onChange={setSubcat} disabled options={subcatDefiOptions} placeholder='Subcategory' styles={customStyles} theme={myTheme}/> : null}
                    {cat && cat.value === 'defi' ? <MySelect value={feature} onChange={setFeature} isMulti options={subcatDefiFeatures} placeholder='Features (optional)' styles={customStyles} theme={myTheme}/> : null}
                    {cat && cat.value === 'dao' ? <MySelect value={subcat} onChange={setSubcat} disabled options={subcatDaoOptions} placeholder='Subcategory' styles={customStyles} theme={myTheme}/> : null}
                    {cat && cat.value === 'dao' ? <MySelect value={feature} onChange={setFeature} isMulti options={subcatDaoFeatures} placeholder='Features (optional)' styles={customStyles} theme={myTheme}/> : null}
            {/* {feature && <MySelect
                value={chain}
                onChange={setChain}
                options={chainOptions}
                placeholder='Blockchain'
                styles={customStyles}
                theme={myTheme}
                 />} */}
                
                  {/* {chain && chain.value === 'evm' ? <MySelect value={lang} onChange={setLang} options={evmLangs} placeholder='Language' styles={customStyles} theme={myTheme} /> : null} */}
                 {cat.value === 'nft' && subcat !== null && chain !== null && lang !== null ? <Button onClick={findNft}>Find</Button> : null}     
                 {cat.value === 'defi' && subcat !== null && chain !== null && lang ? <Button onClick={findDefi}>Find</Button> : null}  
                 {cat.value === 'dao' && subcat !== null && chain !== null && lang ? <Button onClick={findDao}>Find</Button> : null}  
        </FormBox>
        </Col>
          {result && <Flex><Navigation>
                {step === 'Setup' ? <ArticleActButton>Setup</ArticleActButton> : <ArticleButton onClick={()=>setStep('Setup')}>Setup</ArticleButton> }
                  {StepIcon}
                {step === 'Govern' ? <ArticleActButton>Govern</ArticleActButton> : <ArticleButton onClick={()=>setStep('Govern')}>Govern</ArticleButton>}
                  {StepIcon}
                {step === 'Develop' ?  <ArticleActButton>D3velop</ArticleActButton> : <ArticleButton onClick={()=>setStep('Develop')}>D3velop</ArticleButton>}
                  {StepIcon}
                {cat.value !== 'dao' && step ==='Security' ? <SecActButton>Secure</SecActButton> : <Pulse><SecButton onClick={()=>setStep('Security')}>Secure</SecButton></Pulse> }
                  {StepIcon}
                {step === 'Deploy' ? <ArticleActButton>Deploy</ArticleActButton> : <ArticleButton onClick={()=>setStep('Deploy')}>Deploy</ArticleButton> }    
            </Navigation> 
              <StepDescription> 
                {step === 'Setup' && <> <AbsoluteDescription>Frameworks to build, deploy and test </AbsoluteDescription>
                <SubNavigation>
                  {setupState === 'Truffle' ? <ArticleActButton>Truffle</ArticleActButton> : <ArticleButton onClick={()=>setSetupState('Truffle')}>Truffle</ArticleButton>}
                  {setupState === 'Hardhat' ? <ArticleActButton>Hardhat</ArticleActButton> : <ArticleButton onClick={()=>setSetupState('Hardhat')}>Hardhat</ArticleButton>}
                  {setupState === 'Remix' ? <ArticleActButton>Remix</ArticleActButton> : <ArticleButton onClick={()=>setSetupState('Remix')}>Remix</ArticleButton>}
                  {setupState === 'Brownie' ? <ArticleActButton>Brownie</ArticleActButton> : <ArticleButton onClick={()=>setSetupState('Brownie')}>Brownie</ArticleButton>}
                  {setupState === 'Foundry' ? <ArticleActButton>Foundry</ArticleActButton> : <ArticleButton onClick={()=>setSetupState('Foundry')}>Foundry</ArticleButton>}
                  {setupState === 'Truffle' &&  <AbsoluteDescription>Popular variant in combination with Ganache CLI & UI</AbsoluteDescription> }
                  {setupState === 'Hardhat' &&  <AbsoluteDescription>Most used variant for e2e smart contract setup, test & deploy</AbsoluteDescription> }
                  {setupState === 'Remix' &&  <AbsoluteDescription>Perfect for quick prototype and code analysis with rich plugins</AbsoluteDescription> }
                  {setupState === 'Brownie' &&  <AbsoluteDescription>For those who prefer Python instead of JS</AbsoluteDescription> }
                  {setupState === 'Foundry' &&  <AbsoluteDescription>Environment for advanced devs oriented on high performance</AbsoluteDescription> }
                  </SubNavigation>
                </>}
                {step === 'Govern' && <><i>To be implemented</i></>}
                {step === 'Develop' && <AbsoluteDescription>Find resources and references which fit your needs</AbsoluteDescription>}
                {step === 'Security' && <AbsoluteDescription>Learn from mistakes already exploited and secure your contract properly</AbsoluteDescription>}
                {step === 'Deploy' && <AbsoluteDescription>Pick one of many EVM compatible to deploy your contract</AbsoluteDescription>}
              </StepDescription>
           </Flex>}
        <Col xs={24} md={8}>
        {result &&
        <DisplayBox>
            {step === 'Security' &&  <>
            {secTutorials && <RenderSection>
            <SectionTitle>Exploits & Vulnerabilities</SectionTitle>
                {secTutorials.map((tutorial) => (
                        <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}>
                            <Flex>  <TitleA>{tutorial.attributes.Title}</TitleA>   <Category>{tutorial.attributes.Description}</Category></Flex>
                            <TagArea>      
                              <UpperTag>{tutorial.attributes.Category}</UpperTag>
                          </TagArea>
                        </Result>
                ))}
            </RenderSection>}
            {secDefinitions && <RenderSection>
            <SectionTitle>General knowledge</SectionTitle>
                {secDefinitions.map((definition) => (
                        <Result  key={definition.id} onClick={()=>handleResultClick(definition.attributes.Reference,definition.id,definition.attributes.ViewCounter)}>
                            <Flex>  <TitleA>{definition.attributes.Title}</TitleA>   <Category>{definition.attributes.Description}</Category></Flex>
                            <TagArea>      
                              <UpperTag>{definition.attributes.Subcategory}</UpperTag>
                          </TagArea>
                        </Result>
                ))}
            </RenderSection>}
              </>}
            {tutorials && <RenderSection>
            {step === 'Develop' ? <> <SectionTitle>Guides & Tutorials</SectionTitle>
                <>
                {tutorials.map((tutorial) => (
                        <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}>
                          <Flex>  <TitleA>{tutorial.attributes.Title}</TitleA>   <Category>{tutorial.attributes.Description}</Category></Flex>
                           <div>{tutorial.attributes.Difficulty === 'basic' ? <DiffBasic width={25} color={theme.tool.basic} /> : null}
                            {tutorial.attributes.Difficulty === 'intermediate' ? <DiffScholar width={25}/> : null}
                            {tutorial.attributes.Difficulty === 'advanced' ? <DiffAdvanced width={25}/> : null}</div> 
                        </Result>
                ))}
                </></> : null}
            </RenderSection>}
            {definitions && <RenderSection>
                {step === 'Develop' ? <>
            <SectionTitle>Definitions & Theory</SectionTitle>
                {definitions.map((definition) => (
                        <Result  key={definition.id} onClick={()=>handleResultClick(definition.attributes.Reference,definition.id,definition.attributes.ViewCounter)}>
                            <Flex><TitleA>  {definition.attributes.Title}</TitleA>  <Category>{definition.attributes.Description}</Category></Flex>
                            <TagArea>      
                              <UpperTag>{definition.attributes.Subcategory}</UpperTag>
                          </TagArea>
                        </Result>
                ))}
              </> : null}
            </RenderSection>}    
        </DisplayBox> }
          {chain.value === 'evm' && step === 'Deploy' ? <ChainSelector eco={chain.value}/> : null}
          {chain.value === 'evm' && step === 'Setup' ? 
                <SetupKontejner>
           {setupTutorials &&  <>     
                   {setupState === 'Truffle' && <SetupColumn><SectionTitle>Truffle</SectionTitle>
                  {setupTutorials.filter(s => s.attributes.Tool === 'Truffle').map((tutorial) => (
                 <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}>
                               <Flex> <TitleA>{tutorial.attributes.Title} </TitleA>  <Category>{tutorial.attributes.Description}</Category></Flex>  
                        </Result>
                ))}
                  </SetupColumn>}
                  {setupState === 'Hardhat' && <SetupColumn><SectionTitle>Hardhat</SectionTitle>
                  {setupTutorials.filter(s => s.attributes.Tool === 'Hardhat').map((tutorial) => (
                  <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}>
                                 <Flex> <TitleA>{tutorial.attributes.Title}</TitleA>    <Category>{tutorial.attributes.Description}</Category></Flex> 
                          </Result>
                  ))}
                  </SetupColumn>}
                  {setupState === 'Remix' &&  <SetupColumn><SectionTitle>Remix</SectionTitle>
                  {setupTutorials.filter(s => s.attributes.Tool === 'Remix').map((tutorial) => (
                          <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}>
                          <Flex>  <TitleA>{tutorial.attributes.Title}</TitleA>   <Category>{tutorial.attributes.Description}</Category></Flex>    
                          </Result>
                  ))}
                  </SetupColumn>}
                  {setupState === 'Brownie' && <SetupColumn><SectionTitle>Brownie</SectionTitle>
                  {setupTutorials.filter(s => s.attributes.Tool === 'Brownie').map((tutorial) => (
                          <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}>
                          <Flex>  <TitleA>{tutorial.attributes.Title}</TitleA>   <Category>{tutorial.attributes.Description}</Category></Flex>    
                          </Result>
                  ))}
                  </SetupColumn>}
                  {setupState === 'Foundry' &&  <SetupColumn><SectionTitle>Foundry</SectionTitle>
                  {setupTutorials.filter(s => s.attributes.Tool === 'Foundry').map((tutorial) => (
                          <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}>
                          <Flex>  <TitleA>{tutorial.attributes.Title}</TitleA>   <Category>{tutorial.attributes.Description}</Category></Flex>    
                          </Result>
                  ))}
                  </SetupColumn>}
                  </>}
                  
                </SetupKontejner>
              : null}
        </Col>
        <Col xs={24} md={8}>
        {result &&
        <DisplayBox>
            {tools && <RenderSection>
              {step === 'Develop' ? <><SectionTitle>Tooling</SectionTitle>
              <div >
                {tools.map((tool) => (
                        <Result  key={tool.id} onClick={()=>handleResultClick(tool.attributes.Reference)}>
                            <Flex> <TitleA>{tool.attributes.Title}</TitleA>    <Category>{tool.attributes.Description}</Category></Flex>
                            <TagArea>      
                              <UpperTag>{tool.attributes.Subcategory}</UpperTag>
                          </TagArea>
                        </Result>
                ))}
                </div> </> : <>{secTools && step === 'Security' && <RenderSection>
              <SectionTitle>Tooling</SectionTitle>
              <div >
                {secTools.map((tool) => (
                        <Result  key={tool.id} onClick={()=>handleResultClick(tool.attributes.Reference)}>
                            <Flex>  <TitleA>{tool.attributes.Title}</TitleA>   <Category>{tool.attributes.Description}</Category></Flex>
                          <TagArea>      
                              <UpperTag>{tool.attributes.Subcategory}</UpperTag>
                          </TagArea>
                        </Result>
                ))}
                </div>
            </RenderSection>}</>}
            </RenderSection>}
            {repos && step === 'Develop' && <RenderSection>
                <SectionTitle>Get inspiration</SectionTitle>
                <div >
                {repos.map((repo) => (
                        <Result  key={repo.id} onClick={()=>handleResultClick(repo.attributes.reference)}>
                            <Flex>  <TitleA>{repo.attributes.title}</TitleA>   <Category>{repo.attributes.description}</Category></Flex>
                        </Result>
                ))}
                </div>
            </RenderSection>}

            { gqlError && <div>Unable to reach some of the resources</div>}
        </DisplayBox>}
              {chain.value === 'evm' && step === 'Deploy' ? <><ChainStats chain={blockchain}/></> : null}
              {step === 'Setup' && setupTools && <SetupColumn><SectionTitle>Starter kits</SectionTitle>
                  {setupTools.map((tool) => (
                  <Result  key={tool.id} onClick={()=>handleResultClick(tool.attributes.Reference)}>
                        <Flex> <TitleA>{tool.attributes.Title}</TitleA>    <Category>{tool.attributes.Description}</Category></Flex> 
                        <TagArea>      
                              <UpperTag>{tool.attributes.Subcategory}</UpperTag>
                          </TagArea>
                  </Result>
                  ))}
                  </SetupColumn>}
            </Col>
            </Row>
        </Grid>
    </Kontejner>;
  }
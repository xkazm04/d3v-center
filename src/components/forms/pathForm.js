import {useState, useContext} from 'react'
import styled, {useTheme} from "styled-components";
import axios from 'axios'
import Select from 'react-select';
import { catOptions, subcatDaoFeatures,subcatDaoOptions, subcatNftOptions, subcatNftFeatures, subcatDefiFeatures, subcatDefiOptions} from '../../data/pathOptions';
import { DiffAdvanced, DiffBasic, DiffScholar } from '../../icons/difficulty';
import { Grid, Row, Col, Toggle } from 'rsuite';
import ChainSelector from '../../sections/ChainSelector';
import { fetchDaoPath,fetchNftPath, fetchDefiPath, fetchSecPath, fetchSetup } from '../../data/graphQueries';
import {ArrowIcon} from '../../icons/nav'
import { ChainContext } from '../../contexts/ChainContext';
import ChainStats from '../../sections/ChainStats';
import PolkaPath from '../../sections/PolkaPath';
import { GqlFilterdMapper, GqlFilterdToolMapper, GqlMapper, GqlRMapper, GqlToolMapper } from '../../sections/GqlMappers';
import { CodeIcon, ExpandIcon } from '../../icons/utils';
import CodeComponent from '../code/CodeComponent';
import GqlSection from '../../sections/GqlSection';
import SubmenuButton from '../buttons/SubmenuButton';
import WagmiExample from '../../sections/WagmiExample';
import AlchemyExample from '../../sections/AlchemyExample';
import { Watch } from  'react-loader-spinner'
import BoxSubtitle from '../typography/BoxSubtitle';
import Err from '../typography/Err';
import CapsDesc from '../typography/CapsDesc';
import CapsTitle from '../typography/CapsTitle';
import GovernResources from '../../sections/GovernResources';


const token = process.env.REACT_APP_CMS_API

const Kontejner = styled.div`
    background: ${props => props.theme.colors.medium};
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
    padding: 7%;
    margin-left: 5%;
    margin-top: 7%;
    margin-bottom: 7%;
    margin-right: 2%;
    text-align: left;
    background: ${props => props.theme.colors.landingBox};
    border: 1px solid ${props => props.theme.colors.lineAlt};
    border-radius: 15px;
    @media (max-width: 1000px) {
      width: 100%;
      margin: 0;
      padding: 3%;
  }
  animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`

const DisplayBox = styled.div`
    display: flex;
    flex-direction: column;
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
    background: ${props => props.theme.colors.landingFull};
    color: ${props => props.theme.colors.landingTitle};
    width: 20%;
    &:hover{
        color: white;
    }
    @media (max-width: 1000px) {
    width: 40%;
  }
`

const UpperTag = styled.div`
  background: ${props => props.theme.colors.landingSubtitle};
  border: 0.1px solid ${props => props.theme.chart.landingTitle};
  padding: 2px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 2px;
  font-size: 0.8em;
  border-radius: 15px;
  font-weight: 700;
  @media (max-width: 700px) {
       font-size: 0.7em;
       padding-left: 4px;
       padding-right: 4px;
  }
`


const MySelect = styled(Select)`
    margin-top: 4%;
    border: none;
    border-radius: 15px;
`

const BoxTitle = styled.div`
  text-align: left;
  padding-bottom: 1%;
  letter-spacing: 1.3px;
  font-family: 'Staatliches';
  font-size: 2em;
  color: ${props => props.theme.colors.landingTitle};
   @media (max-width: 1000px) {
    font-size: 1.6em;
    padding-left: 2%;
  }
`

const RenderSection = styled.div`
    background: ${props => props.theme.colors.lightGreen};
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
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
    font-size: 1em;
    opacity: 0.8;
`


const Result = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    outline: none;
    padding-left: 3%;
    padding-bottom: 1%;
    padding-top: 1%;
    color: ${props => props.theme.colors.text_title};
    border-bottom: 1px solid ${props => props.theme.colors.background};
    &:hover{
        box-shadow: 0px 0px 10px 0px ${props => props.theme.colors.line};
    }
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`


const ArticleButton = styled.button`
  border: 1px solid ${props => props.theme.colors.text_primary};
  border-radius: 15px;
  font-weight: 700;
  margin: 5px;
  color: ${props => props.theme.colors.text_primary};
  transition: 0.1s;
  height: 30px;
  font-size: 1em;
  font-family: 'Spectral', serif;
  background: ${props => props.theme.colors.subContent};
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

const StepDescription = styled.div`
  background:  ${props => props.theme.colors.blackwhite};
  text-align: left;
  font-size: 1.1em;
  font-weight: 400;
  padding-bottom: 2%;
`

const SetupKontejner = styled.div`
  display: flex;
  justify-content: flex-start;
`

const SetupColumn = styled.div`
  width: 100%;
  text-align: left;
`

const TitleA = styled.div`
  display: flex;
  font-size: 1.1em;
  font-weight: 700;
`

const SubNavigation = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1%;
`

const Com = styled.div`
  font-size: 0.9em;
  margin-left: 4%;
  font-weight: 400;
  color: ${props => props.theme.colors.text_title};
`

const CodeRow = styled.div`
  font-weight: 700;
  display: flex;
  color: ${props => props.theme.colors.dark};
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

const AbsoluteToggle = styled.div`
  display: flex;
  color: ${props => props.theme.colors.text_primary};
  background: ${props => props.theme.colors.lighter};
  justify-content: flex-start;
  margin: 5%;
  font-style: italic;
  padding: 2%;
`

const IconButton = styled.button`
  background: inherit;
  transition: 0.1s;
  opacity: 0.6;
  &:hover{
    opacity: 1;
  }
`

const DifficultyBox = styled.div`
  position: absolute;
  left: 0;
`

const PolkaToggle = styled.div`
  color: black;
  padding-left: 5%;
`

const MyToggle = styled(Toggle)`
  margin-left: 1%;
`

const TitleBox = styled.div`
    border: 1px solid ${props => props.theme.colors.line};
    border-radius: 5px;
    width: 100%;
    margin-top: 2%;
    align-items: center;
    padding: 1%;
    background: ${props => props.theme.colors.landingBox};
    animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
    @media (max-width: 700px) {
        width: 100%;
  }
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 1%;
`

const FlexRowEnd = styled(FlexRow)`
  justify-content: flex-end;
`

const CheatBox = styled.div`
  background: ${props => props.theme.colors.lightGreen};
  font-family: 'Courier';
  padding: 2%;
`

const SubnavTitle = styled.div`
  width: 100%; 
  background: ${props => props.theme.colors.landingFull};
  color: ${props => props.theme.colors.landingSubtitle};
  font-size: 1.1em;
  font-family: 'Staatliches';
  text-align: center;
  padding: 5px;
`

const Loader = styled.div`
  display: flex;
  justify-content: center;
`

const SubtitleDesc = styled.div`
  text-align: center;
`

const MyRow = styled(Row)`
  margin-top: 1%;
  margin-bottom: 4%;
`



export default function PathForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [subdev, setSubdev] = useState('Use case')
  const [subdevEff, setSubdevEff] = useState('Tools')
  const [subsec, setSubsec] = useState('Common')
  const [subsecEff, setSubsecEff] = useState('Analyze')


     const theme = useTheme()

     const customStyles = {
      menu: (provided) => ({
        ...provided,
        background: theme.colors.subContent,
      }),
      control: (provided) => ({
          ...provided,
          background: theme.colors.subContent,
          
      }),
      option: (provided) => ({
          ...provided,
          fontSize: '1em',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: theme.colors.text_title,
        fontWeight: 'bold',
    }),
    }


     const StepIcon =  <ArrowIcon color={theme.colors.text_title} width='30px' height='30px'/>
     const [evmEco, setEvmEco] = useState(false) 
     const toggleEco = () => {
        setEvmEco(!evmEco)
     }

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
    const [starter, setStarter] = useState('Starter')

    const [code, setCode] = useState(false)


    const handleCodePreview = async(code) => {
      setCode(code)
      setOpen(true)
    }

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
            setLoading(true)
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
            setLoading(false)
            setResult(true)

        } catch (err) {
            console.log(err);
            setResult(false)
            setGqlError(true)
            setLoading(false)
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
        await fetchArticles({data: graphqlNftQuery})
        await fetchSecurity()
        await fetchSetups()
    }

    const findDefi = async () => {
      await fetchArticles({data: graphqlDefiQuery})
      await fetchSecurity()
      await fetchSetups()
  }

    const findDao = async () => {
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
                   { gqlError && <Err content='Unable to reach resources'/>}
                    {result &&   <TitleBox>
                      <FlexRow>
                {step === 'Setup' ? <ArticleActButton>Setup</ArticleActButton> : <ArticleButton onClick={()=>setStep('Setup')}>Setup</ArticleButton> }
                  {StepIcon}
                {step === 'Govern' ? <ArticleActButton>Govern</ArticleActButton> : <ArticleButton onClick={()=>setStep('Govern')}>Govern</ArticleButton>}
                  {StepIcon}
                {step === 'Develop' ?  <ArticleActButton>D3velop</ArticleActButton> : <ArticleButton onClick={()=>setStep('Develop')}>D3velop</ArticleButton>}
                  {StepIcon}
                {step ==='Security' ? <SecActButton>Secure</SecActButton> : <Pulse><SecButton onClick={()=>setStep('Security')}>Secure</SecButton></Pulse> }
                  {StepIcon}
                {step === 'Deploy' ? <ArticleActButton>Deploy</ArticleActButton> : <ArticleButton onClick={()=>setStep('Deploy')}>Deploy</ArticleButton> }    
                </FlexRow>
                <BoxSubtitle content={<SubtitleDesc>
                  {step === 'Setup' && <>Frameworks to build, deploy and test Solidity code</>}
                  {step === 'Govern' && <>Learn, design tokenomics and give the power to a DAO</>}
                  {step === 'Develop' && <>Find resources and references which fit your needs</>}
                 {step === 'Security' && <>Learn from mistakes already exploited and secure your contract properly</>}
                  {step === 'Deploy' && <>Pick one of many EVM compatible to deploy your contract</>}
                </SubtitleDesc>}/>

                </TitleBox>} 
              <CodeComponent code={code} open={open} setOpen={setOpen}/>

        {evmEco ? <><PolkaPath/></> : 
        <Grid fluid>
            <MyRow>
        <Col xs={24} md={6}>
        <FormBox>
       <BoxTitle>D3V path</BoxTitle>

       <FlexModal>      <BoxSubtitle content='Find your resources'/> </FlexModal>
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

                 {cat.value === 'nft' && subcat !== null && chain !== null && lang !== null ? <Button onClick={findNft}>Find</Button> : null}     
                 {cat.value === 'defi' && subcat !== null && chain !== null && lang ? <Button onClick={findDefi}>Find</Button> : null}  
                 {cat.value === 'dao' && subcat !== null && chain !== null && lang ? <Button onClick={findDao}>Find</Button> : null}  
        </FormBox>
        <AbsoluteToggle> 
            Switch between Polkadot and EVM path
            <MyToggle onChange={toggleEco} checkedChildren={<PolkaToggle>Polkadot</PolkaToggle>} unCheckedChildren={<PolkaToggle>EVM</PolkaToggle>} />
              </AbsoluteToggle>
        </Col>         
        <Col xs={24} md={8}>
        {loading && <Loader><Watch
                      height = "200"
                      width = "200"
                      radius = "9"
                      color = 'green'
                    /></Loader>}
          {result && <Flex>
            {step === 'Setup' && <>  <StepDescription> 
            <CapsTitle content='Smart contract setup'/>
                <SubNavigation>
                    <SubmenuButton phase={setupState} item='Truffle' setItem={setSetupState}/>
                    <SubmenuButton phase={setupState} item='Hardhat' setItem={setSetupState}/>
                    <SubmenuButton phase={setupState} item='Remix' setItem={setSetupState}/>
                    <SubmenuButton phase={setupState} item='Brownie' setItem={setSetupState}/>
                    <SubmenuButton phase={setupState} item='Foundry' setItem={setSetupState}/>
                  </SubNavigation>
                  {setupState === 'Truffle' &&  <CapsDesc content='Popular variant in combination with Ganache CLI & UI'/>}
                  {setupState === 'Hardhat' &&  <CapsDesc content='Most used variant for e2e smart contract setup, test & deploy' />}
                  {setupState === 'Remix' &&  <CapsDesc content='Perfect for quick prototype and code analysis with rich plugins' /> }
                  {setupState === 'Brownie' &&  <CapsDesc content='For those who prefer Python instead of JS'/> }
                  {setupState === 'Foundry' &&  <CapsDesc content='Environment for advanced devs oriented on high performance' /> }
               
              </StepDescription> </>}
           </Flex>      
           }
          {step === 'Govern' && <GovernResources/> }

        {result &&
        <DisplayBox>
            {step === 'Security' &&  <>
            {secTutorials && <RenderSection>
              <StepDescription> <CapsTitle content='Security gaps'/>
                <SubNavigation>
                  <SubmenuButton phase={subsec} item='Common' setItem={setSubsec}/>
                  <SubmenuButton phase={subsec} item='Exploits' setItem={setSubsec}/>
                  <SubmenuButton phase={subsec} item='Vulnerabilities' setItem={setSubsec}/>
                  <SubmenuButton phase={subsec} item='Audit' setItem={setSubsec}/>
                  </SubNavigation>
                  {subsec === 'Common' &&  <CapsDesc content='Common security resources'/>}
                  {subsec === 'Exploits' &&  <CapsDesc content='Multimillion attacks breakdown' />}
                  {subsec === 'Vulnerabilities' &&  <CapsDesc content='Protocol gaps caught by white hackers' />}
                  {subsec === 'Audit' &&  <CapsDesc content='Material to read to pass audit smoothly'/>}
              </StepDescription>
            </RenderSection>}
            {secDefinitions && <RenderSection>
             {subsec === 'Common' &&   <GqlFilterdMapper data={secDefinitions} title={'General'} filter={'General'}/>}
             {subsec === 'Exploits' && <GqlMapper data={secTutorials} title='Exploits'/>  }
             {subsec === 'Vulnerabilities' &&     <GqlFilterdMapper data={secDefinitions} title={'Vulnerabilities'} filter={'Vulnerability'}/>}
             {subsec === 'Audit' &&     <GqlFilterdMapper data={secDefinitions} title={'Audit'} filter={'Audit'}/>}
            </RenderSection>}
              </>}
            {tutorials && <>
            {step === 'Develop' ? <RenderSection> 
              <StepDescription> <CapsTitle content='Guides and tutorials'/>
                <SubNavigation>
                  <SubmenuButton phase={subdev} item='Use case' setItem={setSubdev}/>
                  <SubmenuButton phase={subdev} item='General' setItem={setSubdev}/>
                  </SubNavigation>
                  {subdev === 'Use case' &&  <CapsDesc content='Tutorials matched your case'/>}
                  {subdev === 'General' &&  <CapsDesc content='Common knowledge related' />}
              </StepDescription>
             
            {subdev === 'Use case' &&  <>  <GqlSection title='Use case specific'/>
                {tutorials.filter(s => s.attributes.Subcategory === subcat.label).map((tutorial) => (
                        <Result  key={tutorial.id}>
                          <DifficultyBox>
                            {tutorial.attributes.Difficulty === 'basic' ? <div><DiffBasic width={20} color={theme.tool.basic} /></div> : null}
                            {tutorial.attributes.Difficulty === 'intermediate' ? <div><DiffScholar width={20} color={theme.chart.var1_stroke}/></div> : null}
                            {tutorial.attributes.Difficulty === 'advanced' ? <div><DiffAdvanced width={20}/></div> : null}
                          </DifficultyBox>
                          <Flex>  <TitleA>{tutorial.attributes.Title} </TitleA>   <Category>{tutorial.attributes.Description}</Category></Flex>

                            <Flex>            
                             <FlexRowEnd> <IconButton onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}><ExpandIcon width={15} color={theme.colors.text_primary}/></IconButton>                
                              {tutorial.attributes.codePreview && <IconButton  onClick={()=>{handleCodePreview(tutorial.attributes.codePreview)}}><CodeIcon width={15} color={theme.chart.varRed_fill}/></IconButton>}</FlexRowEnd>
                              <UpperTag>{tutorial.attributes.Subcategory}</UpperTag>
                           
                            </Flex>
                        
                        </Result>
                ))}</>}
                </RenderSection> : null}
                {subdev === 'Use case' &&  <RenderSection>  <GqlSection title='Perifery features'/>
                {tutorials.filter(s => s.attributes.Subcategory !== subcat.label).map((tutorial) => (
                        <Result  key={tutorial.id}>
                          <DifficultyBox>
                            {tutorial.attributes.Difficulty === 'basic' ? <div><DiffBasic width={20} color={theme.tool.basic} /></div> : null}
                            {tutorial.attributes.Difficulty === 'intermediate' ? <div><DiffScholar width={20} color={theme.chart.var1_stroke}/></div> : null}
                            {tutorial.attributes.Difficulty === 'advanced' ? <div><DiffAdvanced width={20}/></div> : null}
                          </DifficultyBox>
                          <Flex>  <TitleA>{tutorial.attributes.Title} </TitleA>   <Category>{tutorial.attributes.Description}</Category></Flex>

                            <Flex>            
                             <FlexRowEnd> <IconButton onClick={()=>handleResultClick(tutorial.attributes.Reference,tutorial.id,tutorial.attributes.ViewCounter)}><ExpandIcon width={15} color={theme.colors.text_primary}/></IconButton>                
                              {tutorial.attributes.codePreview && <IconButton  onClick={()=>{handleCodePreview(tutorial.attributes.codePreview)}}><CodeIcon width={15} color={theme.chart.varRed_fill}/></IconButton>}</FlexRowEnd>
                              <UpperTag>{tutorial.attributes.Subcategory}</UpperTag>
                           
                            </Flex>
                        
                        </Result>
                ))}</RenderSection>}
            </>}
            
            {definitions && <>
                {step === 'Develop' ? <RenderSection>
                  
           {subdev === 'General' &&    <GqlFilterdMapper data={definitions} title={'General topic articles'} filter={'General'}/>}
                
                {subcat.label === "Lending" && subdev === 'Use case' && <GqlFilterdMapper data={definitions} title={'Lending'} filter={'Lending'}/>}
                {subcat.label === "DEX" && subdev === 'Use case' && <GqlFilterdMapper data={definitions} title={'DEX & AMM'} filter={'DEX'}/>}
                {subcat.label === "Vault" &&  subdev === 'Use case' && <GqlFilterdMapper data={definitions} title={'Vaults & Yielding'} filter={'Vault'}/>}
                {subcat.label === "Perpetual" && subdev === 'Use case' && <GqlFilterdMapper data={definitions} title={'Perpetual'} filter={'Perpetual'}/>}
                {subcat.label === "Collection" && subdev === 'Use case' && <GqlFilterdMapper data={definitions} title={'NFT Collections'} filter={'Lazy'}/>}
                {subcat.label === "Gaming" && subdev === 'Use case' && <GqlFilterdMapper data={definitions} title={'Gaming'} filter={'Gaming'}/>}
                {subcat.label === "Marketplace" && subdev === 'Use case' && <GqlFilterdMapper data={definitions} title={'NFT Marketplace'} filter={'Marketplace'}/>}
                {cat.value === "defi" &&  subdev === 'General' && <GqlFilterdMapper data={definitions} title={'Stablecoin'} filter={'Stablecoin'}/>}
              </RenderSection> : null}
            </>}    
        </DisplayBox> }
          {chain.value === 'evm' && step === 'Deploy' ? <ChainSelector eco={chain.value}/> : null}
          {chain.value === 'evm' && step === 'Setup' ? 
                <SetupKontejner>
           {setupTutorials &&  <>     
        
                   {setupState === 'Truffle' && <SetupColumn>   
                  <GqlFilterdToolMapper data={setupTutorials} title={'Intro to Truffle'} filter={'Truffle'}/>
                  <GqlSection title={'Cheatsheet'}/>
                  <CheatBox>
                        <CodeRow>npm install -g truffle</CodeRow>
                        <CodeRow>truffle unbox <Com>** scaffold project</Com></CodeRow>
                        <CodeRow>truffle init <Com>** new clean project</Com></CodeRow>
                        <CodeRow>truffle compile  <Com>** compile to build/contracts</Com></CodeRow>
                        <CodeRow>truffle migrate <Com>** deploy to develop</Com></CodeRow>
                        <CodeRow>truffle develop <Com>** starts console, interact</Com></CodeRow>
                        <CodeRow>truffle console <Com>** attach console to Ganache</Com></CodeRow>
                    </CheatBox>
                  </SetupColumn>}
                  {setupState === 'Hardhat' && <SetupColumn>
                    <GqlToolMapper data={setupTutorials} title={'Hardhat'} filter={'Hardhat'}/>
                    <GqlSection title={'Cheatsheet'}/>
                    <CheatBox>
                          <CodeRow>npm init<Com>** init node project</Com></CodeRow>
                          <CodeRow>npm install --save-dev hardhat</CodeRow>
                          <CodeRow>npx hardhat<Com>** hardhat setup</Com></CodeRow>
                          <CodeRow>npx hardhat compile<Com>** compile to artifacts</Com></CodeRow>
                          <CodeRow>npx hardhat clean<Com>** clean compiled files</Com></CodeRow>
                          <CodeRow>npx hardhat node<Com>** start local node</Com></CodeRow>
                          <CodeRow>npx hardhat run --network rinkeby scripts/deploy.js<Com>** deploy</Com></CodeRow>
                          <CodeRow>npx hardhat console --network localhost<Com>** start console</Com></CodeRow>
                          <CodeRow>import "hardhat/console.sol"<Com>** console.log in .sol</Com></CodeRow>
                      </CheatBox>
                  </SetupColumn>}
                  {setupState === 'Remix' &&  <SetupColumn>
                    <GqlToolMapper data={setupTutorials} title={'Remix'} filter={'Remix'}/>
                    <GqlSection title={'Cheatsheet'}/>
                    <CheatBox>
                          <CodeRow>remix.debug(hash)<Com>** debug tx</Com></CodeRow>
                          <CodeRow>remix.debugHelp()<Com>** display debug help</Com></CodeRow>
                          <CodeRow>remix.exeCurrent()<Com>** run IDE script</Com></CodeRow>
                          <CodeRow>ethers.Contract<Com>** connect to contract</Com></CodeRow>
                          <CodeRow>web3.eth.accounts<Com>** generate account & sign</Com></CodeRow>
                      </CheatBox>
                  </SetupColumn>}
                  {setupState === 'Brownie' && <SetupColumn>
                      <GqlToolMapper data={setupTutorials} title={'Brownie'} filter={'Brownie'}/>
                      <GqlSection title={'Cheatsheet'}/>
                  <CheatBox>
                        <CodeRow>pip3 install eth-brownie</CodeRow>
                        <CodeRow>brownie init</CodeRow>
                        <CodeRow>brownie bake token<Com>** create erc20 template</Com></CodeRow>
                        <CodeRow>brownie compile</CodeRow>
                        <CodeRow>brownie console</CodeRow>
                        <CodeRow>brownie run *.py --network ropsten<Com>** deploy</Com></CodeRow>
                    </CheatBox>
                  </SetupColumn>}
                  {setupState === 'Foundry' &&  <SetupColumn>
                  <GqlToolMapper data={setupTutorials} title={'Foundry'} filter={'Foundry'}/>
                  <GqlSection title={'Cheatsheet'}/>
                  <CheatBox>
                  {/* eslint-disable-next-line */}
                        <CodeRow><a href='https://github.com/foundry-rs/foundry/blob/master/forge/README.md#cheat-codes' target="_blank">Cheatcodes</a></CodeRow>
                    </CheatBox>
                  </SetupColumn>}
                  </>}
                  
                </SetupKontejner>
              : null}
        </Col>
        <Col xs={24} md={8}>
        {result &&
        <DisplayBox>
            {tools && <>
              {step === 'Develop' ? 
              <RenderSection> 
              <StepDescription> <CapsTitle content='Guides and tutorials'/>
                <SubNavigation>
                  <SubmenuButton phase={subdevEff} item='Tools' setItem={setSubdevEff}/>
                  <SubmenuButton phase={subdevEff} item='Data API' setItem={setSubdevEff}/>
                  <SubmenuButton phase={subdevEff} item='NoCode' setItem={setSubdevEff}/>
                  <SubmenuButton phase={subdevEff} item='Repositories' setItem={setSubdevEff}/>
                  </SubNavigation>
                  {subdevEff === 'Tools' &&  <CapsDesc content='Related tools'/>}
                  {subdevEff === 'Data API' &&  <CapsDesc content='Blockchain data provders'/>}
                  {subdevEff === 'NoCode' &&  <CapsDesc content='Nocode contracts platforms'/>}
                  {subdevEff === 'Repositories' &&  <CapsDesc content='Related repositories' />}
              </StepDescription>
              {subdevEff === 'Tools' &&  <GqlFilterdMapper data={tools} title={'Tooling'} filter={subcat.label} />}
              {subdevEff === 'Data API' &&  <GqlFilterdMapper data={tools} title={'Data API'} filter='Provider'/>}
              {subdevEff === 'NoCode' &&  <GqlFilterdMapper data={tools} title={'NoCode'} filter='Nocode'/>}
                   </RenderSection> : 
              <>{secTools && step === 'Security' && <RenderSection>
              <StepDescription> <CapsTitle content='Tooling'/>
                <SubNavigation>
                  <SubmenuButton phase={subsecEff} item='Analyze' setItem={setSubsecEff}/>
                  </SubNavigation>
                  {subsecEff === 'Analyze' &&  <CapsDesc content='Solidity code analysis and scanners'/>}
              </StepDescription>
               {subsecEff  && <GqlFilterdMapper data={secTools} title={'Security tooling'} filter={subsecEff}/>}
                </RenderSection>}</>}
            </>}
            {repos && step === 'Develop' && <RenderSection>
                {subdevEff === 'Repositories' &&  <GqlRMapper data={repos} title={'Get inspired'}/>}
            </RenderSection>}
        </DisplayBox>}
              {chain.value === 'evm' && step === 'Deploy' ? <><ChainStats chain={blockchain}/></> : null}
              {step === 'Setup' && setupTools && <SetupColumn>
          <StepDescription> 
          <SubnavTitle>Frontend</SubnavTitle>
              <SubNavigation>
                   <SubmenuButton phase={starter} item='Starter' setItem={setStarter}/>
                   <SubmenuButton phase={starter} item='Wagmi' setItem={setStarter}/>
                   <SubmenuButton phase={starter} item='Alchemy' setItem={setStarter}/>

                </SubNavigation>
                    {starter === 'Starter' &&  <CapsDesc content='Predefined templates to bootstrap project'/> }
                    {starter === 'Wagmi' &&  <CapsDesc content='React hooks on top of Ethers'/> }
                    {starter === 'Alchemy' &&  <CapsDesc content='Universal Alchemy SDK replacement of Ethers'/>}

             
            </StepDescription> 
                {starter === 'Starter' && <GqlMapper data={setupTools} title={'Starter kits'}/>}
                {starter === 'Wagmi' && <WagmiExample/>}
                {starter === 'Alchemy' && <AlchemyExample/>}
                  </SetupColumn>}
            </Col>
            </MyRow>
        </Grid>
        }
    </Kontejner>
  }
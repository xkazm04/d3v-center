import {useState} from 'react'
import styled from "styled-components";
import axios from 'axios'
import Select from 'react-select';
import { catOptions, chainOptions, subcatDaoFeatures,subcatDaoOptions, subcatNftOptions, subcatNftFeatures, evmLangs, subcatDefiFeatures, subcatDefiOptions} from '../../data/pathOptions';
import { DiffAdvanced, DiffBasic, DiffScholar } from '../../icons/difficulty';
import { Grid, Row, Col } from 'rsuite';
import ChainModal from '../../cards/ChainModal';


const token = process.env.REACT_APP_CMS_API

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
  font-size: 1.8em;
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
    flex-direction;
    justify-content: space-between;
`

const Category = styled.div`
    font-size: 0.8em;
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
    margin-bottom: 5%;
`

const ArticleButton = styled.button`
  border: 2px solid ${props => props.theme.colors.text_primary};
  border-radius: 15px;
  font-weight: 700;
  margin: 5px;
  transition: 0.1s;
  font-family: 'Spectral', serif;
  &:hover{
    background: ${props => props.theme.colors.green};
  }
`

const SecButton = styled(ArticleButton)`
  border: 2px solid ${props => props.theme.chart.var3_stroke};
  &:hover{
    background: ${props => props.theme.colors.red};
  }
`

const TagArea = styled.div`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  right: -20px;
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
    const [cat, setCat] = useState({value: '', label: 'Use case category'})
    const [chain, setChain] = useState({value: '', label: 'Ecosystem'})
    const [subcat, setSubcat] = useState({value: '', label: 'Subcategory'})
    const [feature, setFeature] = useState([])
    const [lang, setLang] = useState({value: '', label: 'Language'})


    const [gqlError, setGqlError] = useState(false)

    const [result, setResult] = useState(false)
    const [tutorials, setTutorials] = useState(null)
    const [definitions, setDefinitions] = useState(null)
    const [tools, setTools] = useState(null)
    const [repos, setRepos] = useState(null)
    // Security articles have common query for all use cases...hopefully
    const [secTutorials, setSecTutorials] = useState(null)
    const [secDefinitions, setSecDefinitions] = useState(null)
    const [secTools, setSecTools] = useState(null)



    
    const [secMode, setSecMode] = useState(false)


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
        query:` query FetchNftPath ($chainV: String, $chainL:String,$cat:String,$subcat: String,$feature:[String],$lang:String) {
            tutorials (filters: 
                {Chain:{eq:$chainV}, 
          or:{Category:{eq:$cat},
          or:{Language:{eq:$lang},
          or:[{Subcategory:{in:[$subcat, "VRF","Data", "Metadata","Storage"]}},{Subcategory:{in:$feature}, }]}
        }}){ 
              data  {
                attributes {
                  Title 
                  Description 
                  Difficulty
                }
              }
            }
            definitions (filters: 
                {Usage:{eq:$cat}, 
                or:{Chain:{in:["Any",$chainL]}
                } } ){ 
              data  {
                attributes {
                  Title 
                  Description 
                }
              }
            }
            tools (filters: 
                {Chain:{eq:$chainL}, 
            or:{Usage:{eq:$cat},
          }}){ 
              data  {
                attributes {
                  Title 
                  Description 
                  Chain
                  Usage
                  Subcategory
                }
              }
            }
            repos (filters: 
                {language:{eq:$lang}, 
            or:{category:{eq:$cat},
            or:{subcategory:{eq:$subcat},
          }}}){ 
              data  {
                attributes {
                  title 
                  description 
                }
              }
            }
          }
          `
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
      query:` query FetchDefiPath ($chainV: String, $chainL:String,$cat:String,$subcat: String,$feature:[String],$lang:String) {
          tutorials (filters: 
              {Chain:{eq:$chainV}, 
        or:{Category:{eq:$cat},
        or:{Language:{eq:$lang},
        or:[{Subcategory:{in:[$subcat]}},{Subcategory:{in:$feature}, }]}
      }}){ 
            data  {
              attributes {
                Title 
                Description 
                Difficulty
              }
            }
          }
          definitions (filters: 
              {Usage:{eq:$cat},
              or:{Subcategory:{in:["Stablecoin","Analysis","General"]},
              or:{Chain:{in:["Any",$chainL]}
              }}} ){ 
            data  {
              attributes {
                Title 
                Description
                Subcategory 
              }
            }
          }
          tools (filters: 
              {Chain:{eq:$chainL}, 
          or:{Usage:{eq:$cat},
        }}){ 
            data  {
              attributes {
                Title 
                Description 
                Chain
                Usage
                Subcategory
              }
            }
          }
          repos (filters: 
              {language:{eq:$lang}, 
          or:{category:{eq:$cat},
          or:{subcategory:{eq:$subcat},
        }}}){ 
            data  {
              attributes {
                title 
                description 
              }
            }
          }
        }
        `
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
    query:` query FetchDaoPath ($chainV: String, $chainL:String,$cat:String,$subcat: String,$feature:[String],$lang:String) {
        tutorials (filters: 
            {Chain:{eq:$chainV}, 
      or:{Category:{eq:$cat},
      or:{Language:{eq:$lang},
      or:[{Subcategory:{in:[$subcat, "VRF","Data", "Metadata","Storage"]}},{Subcategory:{in:$feature}, }]}
    }}){ 
          data  {
            attributes {
              Title 
              Description 
              Difficulty
            }
          }
        }
        definitions (filters: 
            {Usage:{eq:$cat}, 
            or:{Subcategory:{in:["General"]}
            or:{Chain:{in:["Any",$chainL]}
            }}} ){ 
          data  {
            attributes {
              Title 
              Description 
            }
          }
        }
        tools (filters: 
            {Chain:{eq:$chainL}, 
        or:{Usage:{eq:$cat},
      }}){ 
          data  {
            attributes {
              Title 
              Description 
              Chain
              Usage
              Subcategory
            }
          }
        }
        repos (filters: 
            {language:{eq:$lang}, 
        or:{category:{eq:$cat},
        or:{subcategory:{eq:$subcat},
      }}}){ 
          data  {
            attributes {
              title 
              description 
            }
          }
        }
      }
      `
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
      query:` query FetchSecPath ($chainV: String, $chainL:String,$subcat: String,$feature:[String],$lang:String) {
          tutorials (filters: 
              {Chain:{in:[$chainV,"Any"]}, 
              or:{Category:{eq:"Exploit"},
              or:{Language:{in:[$lang,"","Any"]},
              or:[{Subcategory:{in:[$subcat, "Audit"]}},{Subcategory:{in:$feature}, }]}
      }}){ 
            data  {
              attributes {
                Title 
                Description 
                Difficulty
              }
            }
          }
          definitions (filters: 
              {Usage:{eq:"Exploit"}, 
              or:{Chain:{in:["Any",$chainL]}
              } } ){ 
            data  {
              attributes {
                Title 
                Description 
              }
            }
          }
          tools (filters: 
              {Chain:{eq:$chainL}, 
          or:{Usage:{eq:"Security"},
        }}){ 
            data  {
              attributes {
                Title 
                Description 
                Chain
                Usage
                Subcategory
              }
            }
          }
        }
        `
  }


    const fetchNftArticles = async() => {
        try {
            const response = await axios( {
                url: gqlEndpoint,
                method: 'post',
                headers: headers,
                data: graphqlNftQuery
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

    const fetchDefiArticles = async() => {
      try {
          const response = await axios( {
              url: gqlEndpoint,
              method: 'post',
              headers: headers,
              data: graphqlDefiQuery
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

  const fetchDaoArticles = async() => {
    try {
        const response = await axios( {
            url: gqlEndpoint,
            method: 'post',
            headers: headers,
            data: graphqlDaoQuery
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
        }
    }


    const findNft = async () => {
        setResult(true)
        await fetchNftArticles()
        await fetchSecurity()
    }

    const findDefi = async () => {
      setResult(true)
      await fetchDefiArticles()
      await fetchSecurity()
  }

    const findDao = async () => {
      setResult(true)
      await fetchDaoArticles()
      await fetchSecurity()
  }


    const handleResultClick = (reference) => {
        window.open(reference, "_blank")
    }


    return <Kontejner>
        <Grid fluid>
            <Row>
        <Col xs={24} md={6}>
        <FormBox>
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
            {feature && <MySelect
                value={chain}
                onChange={setChain}
                options={chainOptions}
                placeholder='Blockchain'
                styles={customStyles}
                theme={myTheme}
                 />}
                
                  {chain && chain.value === 'evm' ? <MySelect value={lang} onChange={setLang} options={evmLangs} placeholder='Language' styles={customStyles} theme={myTheme} /> : null}
                 {cat.value === 'nft' && subcat !== null && chain !== null && lang !== null ? <Button onClick={findNft}>Find</Button> : null}     
                 {cat.value === 'defi' && subcat !== null && chain !== null && lang ? <Button onClick={findDefi}>Find</Button> : null}  
                 {cat.value === 'dao' && subcat !== null && chain !== null && lang ? <Button onClick={findDao}>Find</Button> : null}  
        </FormBox>
        </Col>
        <Col xs={24} md={8}>
        {result &&
        <DisplayBox>
            <Navigation>
               <ArticleButton onClick={()=>setSecMode(false)}>D3V</ArticleButton>
               <SecButton onClick={()=>setSecMode(true)}> Security</SecButton>
                {chain && chain.value === 'evm' ? <ChainModal chain={chain.value}/> : null}
            </Navigation>
            {/* {gqlData && <>{gqlData.map((data) => (
                          <Flex>  {data.tutorials.attributes.Title} </Flex>
                ))}</>} */}
            {secMode &&  <>
            
              {secDefinitions && <RenderSection>
            <SectionTitle>Audit conditions</SectionTitle>
                {secDefinitions.map((definition) => (
                        <Result  key={definition.id} onClick={()=>handleResultClick(definition.attributes.Reference)}>
                            <Flex>  {definition.attributes.Title}   <Category>{definition.attributes.Description}</Category></Flex>
                           <div>{definition.attributes.Difficulty === 'basic' ? <DiffBasic width={25}/> : null}
                            {definition.attributes.Difficulty === 'intermediate' ? <DiffScholar width={25}/> : null}
                            {definition.attributes.Difficulty === 'advanced' ? <DiffAdvanced widht={25}/> : null}</div> 
                        </Result>
                ))}
            </RenderSection>}
            {secTutorials && <RenderSection>
            <SectionTitle>Vulnerabilities</SectionTitle>
                {secTutorials.map((tutorial) => (
                        <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference)}>
                            <Flex>  {tutorial.attributes.Title}   <Category>{tutorial.attributes.Description}</Category></Flex>
                           <div>{tutorial.attributes.Difficulty === 'basic' ? <DiffBasic width={25}/> : null}
                            {tutorial.attributes.Difficulty === 'intermediate' ? <DiffScholar width={25}/> : null}
                            {tutorial.attributes.Difficulty === 'advanced' ? <DiffAdvanced widht={25}/> : null}</div> 
                        </Result>
                ))}
            </RenderSection>}
              </>}
            {tutorials && <RenderSection>
            {secMode === false ? <> <SectionTitle>Tutorials</SectionTitle>
                <>
                {tutorials.map((tutorial) => (
                        <Result  key={tutorial.id} onClick={()=>handleResultClick(tutorial.attributes.Reference)}>
                          <Flex>  {tutorial.attributes.Title}   <Category>{tutorial.attributes.Description}</Category></Flex>
                           <div>{tutorial.attributes.Difficulty === 'basic' ? <DiffBasic width={25}/> : null}
                            {tutorial.attributes.Difficulty === 'intermediate' ? <DiffScholar width={25}/> : null}
                            {tutorial.attributes.Difficulty === 'advanced' ? <DiffAdvanced widht={25}/> : null}</div> 
                        </Result>
                ))}
                </></> : null}
            </RenderSection>}
            {definitions && <RenderSection>
                {secMode === false ? <>
            <SectionTitle>Definitions</SectionTitle>
                {definitions.map((definition) => (
                        <Result  key={definition.id} onClick={()=>handleResultClick(definition.attributes.Reference)}>
                            <Flex>  {definition.attributes.Title}   <Category>{definition.attributes.Description}</Category></Flex>
                           <div>{definition.attributes.Difficulty === 'basic' ? <DiffBasic width={25}/> : null}
                            {definition.attributes.Difficulty === 'intermediate' ? <DiffScholar width={25}/> : null}
                            {definition.attributes.Difficulty === 'advanced' ? <DiffAdvanced widht={25}/> : null}</div> 
                        </Result>
                ))}
              </> : null}
            </RenderSection>}    
        </DisplayBox> }
        </Col>
        <Col xs={24} md={8}>
        {result &&
        <DisplayBox>
            {tools && <RenderSection>
              {secMode === false ? <><SectionTitle>Tooling</SectionTitle>
              <div >
                {tools.map((tool) => (
                        <Result  key={tool.id} onClick={()=>handleResultClick(tool.attributes.Reference)}>
                            <Flex>  {tool.attributes.Title}   <Category>{tool.attributes.Description}</Category></Flex>
                            <div>{tool.attributes.Usage === 'basic' ? <DiffBasic width={25}/> : null}
                            {tool.attributes.Usage === 'intermediate' ? <DiffScholar width={25}/> : null}
                            {tool.attributes.Usage === 'advanced' ? <DiffAdvanced widht={25}/> : null}</div> 
                            <TagArea>      
                              <UpperTag>{tool.attributes.Subcategory}</UpperTag>
                          </TagArea>
                        </Result>
                ))}
                </div> </> : <>{secTools && <RenderSection>
              <SectionTitle>Tooling</SectionTitle>
              <div >
                {secTools.map((tool) => (
                        <Result  key={tool.id} onClick={()=>handleResultClick(tool.attributes.Reference)}>
                            <Flex>  {tool.attributes.Title}   <Category>{tool.attributes.Description}</Category></Flex>
                            <div>{tool.attributes.Usage === 'basic' ? <DiffBasic width={25}/> : null}
                            {tool.attributes.Usage === 'intermediate' ? <DiffScholar width={25}/> : null}
                            {tool.attributes.Usage === 'advanced' ? <DiffAdvanced widht={25}/> : null}</div> 
                          <TagArea>      
                              <UpperTag>{tool.attributes.Subcategory}</UpperTag>
                          </TagArea>
                        </Result>
                ))}
                </div>
            </RenderSection>}</>}
            </RenderSection>}
            {repos && <RenderSection>
                <SectionTitle>Get inspiration</SectionTitle>
                <div >
                {repos.map((repo) => (
                        <Result  key={repo.id} onClick={()=>handleResultClick(repo.attributes.reference)}>
                            <Flex>  {repo.attributes.title}   <Category>{repo.attributes.description}</Category></Flex>
                        </Result>
                ))}
                </div>
            </RenderSection>}
            { gqlError && <div>Service unavailable due to the server maintanance</div>}
        </DisplayBox>}
            </Col>
            </Row>
        </Grid>
    </Kontejner>;
  }
import styled from "styled-components";
import axios from 'axios'

const PolkaBox = styled.div`
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

const PolkaSectionTitle = styled.div`
  color: #e6007a;
  width: 100%;
  font-weight: 700;
  padding: 2%;
  font-size: 1.1em;
  background: inherit;
  border: 2px solid #95004f;
  font-family: 'Spectral', serif;
  border-radius: 15px;
  margin-bottom: 2%;
  animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`


const PolkaResult = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    outline: none;
    padding: 1%;
    transition: 0.1s;
    cursor: pointer;
    border-bottom: 1px solid #e6007a;
    &:hover{
        background: #4F4F4F;
        box-shadow: 0px 0px 10px 0px #803B70;
    }
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`

const PolkaTitleA = styled.div`
  font-size: 1.1em;
  font-weight: 700;
  color: #e6007a;
`

const PolkaCategory = styled.div`
    font-size: 1em;
    opacity: 0.8;
    color: white;
    &:hover{
        opacity: 1;
    }
`

const PolkaUpperTag = styled.div`
  background: inherit;
  border: 0.1px solid #e6007a;
  padding: 2px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 0.9em;
  border-radius: 15px;
  font-weight: 700;
  color: white;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
`

const TitleA = styled.div`
  font-size: 1.1em;
  font-weight: 700;
`

const Category = styled.div`
    font-size: 1em;
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
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
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
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
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


export const GqlPMapper = ({data, title}) => {
    return (
        <>
        {data && <PolkaBox>
            <PolkaSectionTitle>{title}</PolkaSectionTitle>
                        {data.map((d) => (
                        <PolkaResult  key={d.id}>
                                        <Flex> <PolkaTitleA>{d.attributes.Title}</PolkaTitleA>    <PolkaCategory>{d.attributes.Description}</PolkaCategory></Flex> 
                                        <div>   <PolkaUpperTag>{d.attributes.Subcategory}</PolkaUpperTag></div>
                                </PolkaResult>
                        ))}
                </PolkaBox>}
        </>
    )
}

export const GqlPMapperAlt = ({data, title}) => {
    return (
        <>
        {data && <PolkaBox>
            <PolkaSectionTitle>{title}</PolkaSectionTitle>
                        {data.map((d) => (
                        <PolkaResult  key={d.id}>
                                        <Flex> <PolkaTitleA>{d.attributes.title}</PolkaTitleA>    <PolkaCategory>{d.attributes.description}</PolkaCategory></Flex> 
                                        <div>   <PolkaUpperTag>{d.attributes.subcategory}</PolkaUpperTag></div>
                                </PolkaResult>
                        ))}
                </PolkaBox>}
        </>
    )
}

export const GqlMapper = ({data, title}) => {
    return(<>
    <SectionTitle>{title}</SectionTitle>
    {data.map((d) => (
      <Result  key={d.id} onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}>
                     <Flex> <TitleA>{d.attributes.Title}</TitleA>    <Category>{d.attributes.Description}</Category></Flex> 
                     <div>   <UpperTag>{d.attributes.Subcategory}</UpperTag></div>
              </Result>
      ))}
    </>)
}

export const GqlRMapper = ({data, title}) => {
    return(<>
    <SectionTitle>{title}</SectionTitle>
    {data.map((d) => (
      <Result  key={d.id} onClick={()=>handleResultClick(d.attributes.reference)}>
                     <Flex> <TitleA>{d.attributes.title}</TitleA>    <Category>{d.attributes.description}</Category></Flex> 
                     <div>   <UpperTag>{d.attributes.subcategory}</UpperTag></div>
              </Result>
      ))}
    </>)
}


export const GqlFilterdMapper = ({data, title, filter}) => {
    return(<>
    <SectionTitle>{title}</SectionTitle>
    {data.filter(s => s.attributes.Subcategory === filter).map((d) => (
      <Result  key={d.id} onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}>
                     <Flex> <TitleA>{d.attributes.Title}</TitleA>    <Category>{d.attributes.Description}</Category></Flex> 
                     <div>   <UpperTag>{d.attributes.Subcategory}</UpperTag></div>
              </Result>
      ))}
    </>)
}

export const GqlToolMapper = ({data, title, filter}) => {
    return(<>
    <SectionTitle>{title}</SectionTitle>
    {data.filter(s => s.attributes.Tool === filter).map((d) => (
      <Result  key={d.id} onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}>
                     <Flex> <TitleA>{d.attributes.Title}</TitleA>    <Category>{d.attributes.Description}</Category></Flex> 
                     <div>   <UpperTag>{d.attributes.Subcategory}</UpperTag></div>
              </Result>
      ))}
    </>)
}
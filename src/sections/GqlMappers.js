import styled, {useTheme} from "styled-components";
import axios from 'axios'
import GqlSection from "./GqlSection";
import { ExpandIcon } from '../icons/utils';



const PolkaBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2%;
    text-align: left;
    font-family: 'Chilanka';
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
  font-size: 1.3em;
  letter-spacing: 1px;
  border-radius: 15px;
  padding-left: 5%;
  background: rgba(242, 0, 116, 0.03);
  border-bottom: 2px dotted white;
  margin-bottom: 5%;
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
    font-family: 'Helvetica';
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
  letter-spacing: 1px;
  padding-left: 6px;
  padding-right: 6px;
  font-size: 0.9em;
  border-radius: 15px;
  font-weight: 400;
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
`

const Result = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    outline: none;
    padding-left: 3%;
    padding-bottom: 1%;
    padding-top: 1%;
    margin-bottom: 2px;
    background: ${props => props.theme.colors.lightGreen};;
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

const IconButton = styled.button`
  background: inherit;
  text-align: right;
  transition: 0.1s;
  opacity: 0.6;
  &:hover{
    opacity: 1;
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
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: space-between;
`

const GqlItem = ({d}) => {
  const theme = useTheme()
  return <Result  key={d.id} >
  <Flex> <TitleA>{d.attributes.Title}</TitleA>    <Category>{d.attributes.Description}</Category></Flex> 
  <ButtonBox>            
      <IconButton onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}><ExpandIcon width={15} color={theme.colors.text_primary}/></IconButton>                
      {d.attributes.Subcategory && <UpperTag>{d.attributes.Subcategory}</UpperTag>} 
   </ButtonBox>
</Result>
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


export const GqlPMapper = ({data, title}) => {
    return (
        <>
        {data && <PolkaBox>
            <PolkaSectionTitle>{title}</PolkaSectionTitle>
                        {data.map((d) => (
                        <PolkaResult  key={d.id} onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}>
                                        <Flex> <PolkaTitleA>{d.attributes.Title}</PolkaTitleA>    <PolkaCategory>{d.attributes.Description}</PolkaCategory></Flex> 
                                        <div>   <PolkaUpperTag>{d.attributes.Subcategory}</PolkaUpperTag></div>
                                </PolkaResult>
                        ))}
                </PolkaBox>}
        </>
    )
}

export const GqlPFilteredMapper = ({data, title, filter}) => {
  return (
      <>
      {data && <PolkaBox>
          <PolkaSectionTitle>{title}</PolkaSectionTitle>
                      {data.filter(s => s.attributes.Subcategory === filter).map((d) => (
                      <PolkaResult  key={d.id} onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}>
                                      <Flex> <PolkaTitleA>{d.attributes.Title}</PolkaTitleA>    <PolkaCategory>{d.attributes.Description}</PolkaCategory></Flex> 
                                         <div>   <PolkaUpperTag>{d.attributes.Subcategory}</PolkaUpperTag></div>
                              </PolkaResult>
                      ))}
              </PolkaBox>}
      </>
  )
}

export const GqlPFilteredCatMapper = ({data, title, filter}) => {
  return (
      <>
      {data && <PolkaBox>
          <PolkaSectionTitle>{title}</PolkaSectionTitle>
                      {data.filter(s => s.attributes.Category === filter).map((d) => (
                      <PolkaResult  key={d.id} onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}>
                                      <Flex> <PolkaTitleA>{d.attributes.Title}</PolkaTitleA>    <PolkaCategory>{d.attributes.Description}</PolkaCategory></Flex> 
                                         <div>   <PolkaUpperTag>{d.attributes.Subcategory}</PolkaUpperTag></div>
                              </PolkaResult>
                      ))}
              </PolkaBox>}
      </>
  )
}

export const GqlPFilteredUsageMapper = ({data, title, filter}) => {
  return (
      <>
      {data && <PolkaBox>
          <PolkaSectionTitle>{title}</PolkaSectionTitle>
                      {data.filter(s => s.attributes.Usage === filter).map((d) => (
                      <PolkaResult  key={d.id} onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}>
                                      <Flex> <PolkaTitleA>{d.attributes.Title}</PolkaTitleA>    <PolkaCategory>{d.attributes.Description}</PolkaCategory></Flex> 
                                         <div>   <PolkaUpperTag>{d.attributes.Subcategory}</PolkaUpperTag></div>
                              </PolkaResult>
                      ))}
              </PolkaBox>}
      </>
  )
}

export const GqlPFilteredRMapper = ({data, title, filter}) => {
  return (
      <>
      {data && <PolkaBox>
          <PolkaSectionTitle>{title}</PolkaSectionTitle>
                      {data.filter(s => s.attributes.subcategory === filter).map((d) => (
                      <PolkaResult  key={d.id} onClick={()=>handleResultClick(d.attributes.reference,d.id,d.attributes.counter)}>
                                      <Flex> <PolkaTitleA>{d.attributes.title}</PolkaTitleA>    <PolkaCategory>{d.attributes.description}</PolkaCategory></Flex> 
                                         <div>   <PolkaUpperTag>{d.attributes.subcategory}</PolkaUpperTag></div>
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
                        <PolkaResult  key={d.id} onClick={()=>handleResultClick(d.attributes.Reference,d.id,d.attributes.ViewCounter)}>
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
    <GqlSection title={title}/>
        {data.map((d) => (
            <GqlItem d={d}/>
      ))}
    </>)
}

export const GqlRMapper = ({data, title}) => {
  const theme = useTheme()
    return(<>
    <GqlSection title={title}/>
    {data.map((d) => (
      <Result  key={d.id}>
                     <Flex> <TitleA>{d.attributes.title}</TitleA>    <Category>{d.attributes.description}</Category></Flex> 
                     <Flex>            
                      <IconButton onClick={()=>handleResultClick(d.attributes.reference,d.id,d.attributes.counter)}><ExpandIcon width={15} color={theme.colors.text_primary}/></IconButton>                
                        {d.attributes.subcategory && <UpperTag>{d.attributes.subcategory}</UpperTag>}
                    </Flex>
              </Result>
      ))}
    </>)
}


export const GqlFilterdMapper = ({data, title, filter}) => {
    return(<>
    <GqlSection title={title}/>
    {data.filter(s => s.attributes.Subcategory === filter).map((d) => (
       <GqlItem d={d}/>
      ))}
    </>)
}

export const GqlFilterdToolMapper = ({data, title, filter}) => {
  return(<>
    <GqlSection title={title}/>
    {data.filter(s => s.attributes.Tool === filter).map((d) => (
       <GqlItem d={d}/>
      ))}
  </>)
}

export const GqlToolMapper = ({data, title, filter}) => {
    return(<>
    <GqlSection title={title}/>
    {filter ? <> {data.filter(s => s.attributes.Tool === filter).map((d) => (
          <GqlItem d={d}/>
      ))}</> : 
      <>
      {data.map((d) => (
             <GqlItem d={d}/>
        ))}</>}

    </>)
}
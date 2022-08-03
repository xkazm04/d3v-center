import {useEffect, useState} from 'react'
import styled, {useTheme} from 'styled-components'
import { DevelopIcon,StorageIcon,WisdomIcon, DaoIcon, NftIcon, NodeIcon, DefiIcon, MonitorIcon, UtilityIcon, SecurityIcon} from '../icons/tool';
import axios from 'axios';
import {GqlFilterdUsageMapper} from './GqlMappers';

const Kontejner = styled.div`
    margin: 2%;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`

const Menu = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background: ${props => props.theme.colors.lightGreen};
    box-shadow: 0px 0px 2px 0px ${props => props.theme.colors.dark};
    padding-top: 1%;
    padding-bottom: 1%;
    flex-wrap: wrap;
`


const Button = styled.button`
  background: inherit;
  cursor: pointer;
  transition: 0.1s;
  height: 80px;
  margin-bottom: 10%;
  min-height: 5vw;
  &:hover{
    box-shadow: 0px 0px 2px 0px ${props => props.theme.colors.var3_stroke};
  }
`

const ActButton = styled(Button)`
   box-shadow: 0px 0px 1px 0px ${props => props.theme.colors.var3_stroke};
    background: ${props => props.theme.colors.red};
`

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.colors.text_primary};
  margin-left: 1%;
  @media (max-width: 700px) {
       max-height: 75px;
  }
`

const IconDesc = styled.div`
    font-size: 1.2em;
    color: ${props => props.theme.colors.text_primary};
    font-weight: bold;
    font-family: 'Chilanka';
`

const Result = styled.div`
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    margin-left: 2%;
`

const ToolSection = () => {
    const theme = useTheme();
    const [error, setError] = useState(false)
    const [cat, setCat] = useState('Develop');
    const [tools, setTools] = useState()
    const IconNavButton = ({icon, desc}) => {
        return <IconBox>
                 {cat === desc ? <ActButton>{icon}</ActButton> :<Button onClick={()=>{setCat(desc)}}>{icon}</Button>}
            <IconDesc>{desc}</IconDesc></IconBox>
    }

    useEffect(() => {
        getTools()
        // eslint-disable-next-line
      }, []);


    // Static render with Next
    // Chain doplnit -> Barevně rozlišit karty
    const getTools = async() => {
        setError(false)
        const token = process.env.REACT_APP_CMS_API 
        try{
        const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tools?pagination[pageSize]=500&sort[0]=Title`,  {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
        setTools(res.data.data)
        }catch{
            console.log('Tooling retrieval failed')
            setError(true)
        }
  }

    return <Kontejner>
        {error && <>API error occured, please try again later - server might be down</>}
{tools && <>  <Menu>
            <IconNavButton icon={<DevelopIcon width={'5vw'} color={theme.colors.text_title}/>} desc="Develop"/>
            <IconNavButton icon={<StorageIcon width={'5vw'} color={theme.colors.text_title}/>} desc="Storage"/>
            <IconNavButton icon={<WisdomIcon width={'5vw'} color={theme.colors.text_title}/>} desc="Knowledge"/>
            <IconNavButton icon={<DaoIcon width={'5vw'} color={theme.colors.text_title}/>} desc="DAO"/>
            <IconNavButton icon={<NftIcon width={'5vw'} color={theme.colors.text_title}/>} desc="NFT"/>
            <IconNavButton icon={<NodeIcon width={'5vw'} colorStroke={theme.colors.text_title} colorFill={theme.colors.text_title}/>} desc="Node"/>
            <IconNavButton icon={<DefiIcon width={'5vw'}  color={theme.colors.text_title}/>} desc="Defi"/>
            <IconNavButton icon={<MonitorIcon width={'5vw'} color={theme.colors.text_title} />} desc="Monitor"/>
            <IconNavButton icon={<UtilityIcon width={'5vw'} color={theme.colors.text_title}/>} desc="Utility"/>
            <IconNavButton icon={<SecurityIcon width={'5vw'} color={theme.colors.text_title}/>} desc="Security"/>
    </Menu>

    <Result>
          <GqlFilterdUsageMapper data={tools}  filter={cat}/> 
    </Result>
    </>
    }
    </Kontejner>
}

export default ToolSection;
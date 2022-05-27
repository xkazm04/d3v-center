import {   connectHits,
    Hits} from 'react-instantsearch-dom';
import { DevelopIcon,StorageIcon,WisdomIcon, DaoIcon, NftIcon, NodeIcon, DefiIcon, MonitorIcon } from '../../icons/tool';

import StorageCards from '../hits/StorageCards';
import KnowledgeCards from '../hits/KnowledgeCards';
import DevelopCards from '../hits/DevelopCards';
import {useState} from 'react'
import MonitorCards from '../hits/MonitorCards';
import DaoCards from '../hits/DaoCards';
import DefiCards from '../hits/DefiCards';
import NftCards from '../hits/NftCards';
import NodeCards from '../hits/NodeCards';
import styled from 'styled-components'


const ToolTitle = styled.div`
  display: flex;
  text-align: left;
  letter-spacing: 1.2px;
  font-family: 'NoBill';
  font-size: 1.5em;
  margin-left: 2%;
  color: ${props => props.theme.colors.text_primary};
  border-bottom: 1px solid ${props => props.theme.colors.line};
  @media (max-width: 700px) {
    font-size: 1em;
    padding-left: 2%;
  } 
`

const ToolBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2%;
  margin-top: 1%;
ul{
    display: flex;
    flex-wrap: wrap;
}
`

const IconBox = styled.div`
    margin-right: 1%;
`

const IconButton = styled.button`
  background: none;
  cursor: pointer;
  margin-left: 2px;

`

const Menu = styled.div`
  display: flex;
  margin-left: 1%;
  margin-top: 2%;
  margin-bottom: 2%;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  width: 60px;
  margin: 1%;
  border-radius: 15px;
  transition: 0.1s;
  padding: 4%;
  color: ${props => props.theme.colors.text_primary};
  &:hover{
    background: ${props => props.theme.colors.lighter};
  }
`

const HitGroup = () => {
    const [developLoaed, setDevelopLoaded] = useState(true)
    const [knowledgeLoaded, setKnowledgeLoaded]= useState(false);
    const [storageLoaded, setStorageLoaded]= useState(false);
    const [monitorLoaded, setMonitorLoaded]= useState(false);
    const [daoLoaded, setDaoLoaded]= useState(false);
    const [defiLoaded, setDefiLoaded]= useState(false);
    const [nftLoaded, setNftLoaded]= useState(false);
    const [nodeLoaded, setNodeLoaded]= useState(false);


    const KnowledgeHits  = connectHits(KnowledgeCards);
const StorageHits = connectHits(StorageCards);
const DevelopHits = connectHits(DevelopCards);

const DaoHits  = connectHits(DaoCards);
const DefiHits = connectHits(DefiCards);
const MonitorHits = connectHits(MonitorCards);
const NftHits = connectHits(NftCards);
const NodeHits = connectHits(NodeCards);

 const toggleKnowledge = () => {
   setKnowledgeLoaded(true)
   setStorageLoaded(false)
   setDevelopLoaded(false)
   setMonitorLoaded(false)
   setDaoLoaded(false)
   setDefiLoaded(false)
   setNftLoaded(false)
   setNodeLoaded(false)
 }

 const toggleStorage = () => {
    setKnowledgeLoaded(false)
    setStorageLoaded(true)
    setDevelopLoaded(false)
    setMonitorLoaded(false)
    setDaoLoaded(false)
    setDefiLoaded(false)
    setNftLoaded(false)
    setNodeLoaded(false)
 }

 const toggleDevelop = () => { 
    setKnowledgeLoaded(false)
    setStorageLoaded(false)
    setDevelopLoaded(true)
    setMonitorLoaded(false)
    setDaoLoaded(false)
    setDefiLoaded(false)
    setNftLoaded(false)
    setNodeLoaded(false)
 }

 const toggleMonitor = () => {
    setKnowledgeLoaded(false)
    setStorageLoaded(false)
    setDevelopLoaded(false)
    setMonitorLoaded(true)
    setDaoLoaded(false)
    setDefiLoaded(false)
    setNftLoaded(false)
    setNodeLoaded(false)
 }

 const toggleDao = () => {
    setKnowledgeLoaded(false)
    setStorageLoaded(false)
    setDevelopLoaded(false)
    setMonitorLoaded(false)
    setDaoLoaded(true)
    setDefiLoaded(false)
    setNftLoaded(false)
    setNodeLoaded(false)
 }

 const toggleNft = () => {
    setKnowledgeLoaded(false)
    setStorageLoaded(false)
    setDevelopLoaded(false)
    setMonitorLoaded(false)
    setDaoLoaded(false)
    setDefiLoaded(false)
    setNftLoaded(true)
    setNodeLoaded(false)
 }

 const toggleNode = () => {
    setKnowledgeLoaded(false)
    setStorageLoaded(false)
    setDevelopLoaded(false)
    setMonitorLoaded(false)
    setDaoLoaded(false)
    setDefiLoaded(false)
    setNftLoaded(false)
    setNodeLoaded(true)
 }

 const IconWidth = '40'
  const ToolSection = ({icon, title, hit}) => {

    
      return (
      <>        
       <ToolTitle><IconBox>{icon}</IconBox>{title}</ToolTitle>      <ToolBox ><Hits hitComponent={hit}  /></ToolBox>
      </>
      )
  }
    return (
        <>
    <Menu>
    <IconButton onClick={()=>toggleDevelop()}><Flex><DevelopIcon width={IconWidth}/>Develop</Flex></IconButton>
      <IconButton onClick={()=>toggleKnowledge()}><Flex><WisdomIcon width={IconWidth}/>Knowledge</Flex></IconButton>
       <IconButton onClick={()=>toggleStorage()}><Flex><StorageIcon width={IconWidth}/>Storage</Flex></IconButton>
      <IconButton onClick={()=>toggleMonitor()}> <Flex><MonitorIcon width={IconWidth}/>Monitor</Flex></IconButton>
     <IconButton onClick={()=>toggleDao()}> <Flex> <DaoIcon width={IconWidth}/>DAO</Flex></IconButton>
     <IconButton onClick={()=>toggleNft()}> <Flex><NftIcon width={IconWidth}/>NFT</Flex></IconButton>
     <IconButton onClick={()=>toggleNode()}> <Flex><NodeIcon width={IconWidth}/>Node</Flex></IconButton>

    </Menu>
     {developLoaed ? <ToolSection icon={<DevelopIcon width='20'/>} title='Develop' hit={DevelopHits}/> : null}
     {knowledgeLoaded ? <ToolSection  icon={<WisdomIcon width='20'/>} title='Knowledge' hit={KnowledgeHits}/> : null}
     {storageLoaded ? <ToolSection icon={<StorageIcon width='20'/>} title='Storage' hit={StorageHits}/> : null}
     {monitorLoaded ? <ToolSection icon={<MonitorIcon width='20'/>} title='Monitor' hit={MonitorHits}/> : null}
     {daoLoaded ? <ToolSection icon={<DaoIcon width='20'/>} title='Dao' hit={DaoHits}/> : null}
     {defiLoaded ? <ToolSection icon={<DefiIcon width='20'/>} title='Defi' hit={DefiHits}/> : null}
     {nftLoaded ? <ToolSection icon={<NftIcon width='20'/>} title='Nft' hit={NftHits}/> : null}
     {nodeLoaded ? <ToolSection icon={<NodeIcon width='20'/>} title='Node' hit={NodeHits}/> : null}
    

            </> 
    )
}

export default HitGroup;
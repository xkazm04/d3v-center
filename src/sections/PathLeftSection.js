import {useContext, useState} from 'react';
import styled from 'styled-components';
import { PathContext } from '../contexts/PathContext';

const ToggleRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 5%;
    margin-bottom: 10%;
`

const Change = styled.button`
    font-family: 'Staatliches';
    background: inherit;
    color: ${props => props.theme.colors.text_primary};
    border-bottom: 1px solid ${props => props.theme.colors.lineAlt};
    &:hover{
        background: ${props => props.theme.colors.red};
    }
`

const Item = styled.div`
    display: flex;
    padding: 1%;
    padding-left: 5%;
    font-family: 'Chilanka';
`


const LeftBox = styled.div`
    display: flex;
    flex-direction: row;
    padding: 2%;
    width: 23%;
    @media (max-width: 1000px) {
        padding: 2px;
  }
`

const MainItem = styled.div`
    font-family: 'Staatliches';
    color: ${props => props.theme.colors.text_title};
    font-size: 1.4em;
    letter-spacing: 1px;
    font-weight: 500;
`

const Picker = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 1%;
    padding-bottom: 10%;
    margin-bottom: 10%;
    border-bottom: 5px solid ${props => props.theme.colors.lineAlt};
`


const Menu = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    max-height: 80vh;
    overflow-y: auto;
    padding-right: 15%;
    border-right: 0.1px solid ${props => props.theme.colors.lineAlt};
`

const PickChoice = styled.div`
    font-family: 'Staatliches';
    font-size: 1.1em;
    color: ${props => props.theme.colors.text_primary};
    display: flex;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    width: 75px;
    height: 75px;
    justify-content: center;
    align-items: center;
    transition: 0.1s;
    &:hover{
        background: ${props => props.theme.colors.lightGreen};
        cursor: pointer;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    }
`

const PickAChoice = styled(PickChoice)`
    background: ${props => props.theme.colors.background};
    transition: 0.1s;
    :hover{
        background: ${props => props.theme.colors.background};
    }
`

const MButton = styled.button`
    font-family: 'Chilanka';
    color: ${props => props.theme.colors.text_primary};
    padding: 1%;
    width: 100%;
    text-align: left;
    font-size: 1em;
    background: inherit;
`

const MAButton = styled(MButton)`
    font-weight: 700;
`

const ToggleButton = styled.button`
    font-family: 'Staatliches';
    width: 100%;
    font-size: 1.7em;
    background: inherit;
    border: 1px solid ${props => props.theme.colors.lineAlt};
    color: ${props => props.theme.colors.text_primary};
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`

const ToggleActButton = styled(ToggleButton)`
    background: ${props => props.theme.colors.lightGreen};
    opacity: 1;
`



const PathLeftSection = () => {
    const main = useContext(PathContext)
    const setMain = useContext(PathContext)
    const setCat = useContext(PathContext)
    const  setCont = useContext(PathContext)
    const  cont = useContext(PathContext)
    const setSubcat = useContext(PathContext)
    const subcat = useContext(PathContext)
    const [shownNav, setShownNav] = useState(true)

    
    const recat = async (cat) => {
        setCat(cat)
        setSubcat(null)
    }

    const refetch = async (sub) => {
        setSubcat(sub)
        // Await gql fetch + loading icon 
        setShownNav(false)
    }

    const changeCont = async (n) => {
       setCont('Cont')
    }

    const MenuItem = ({upd, n}) => {
        return <Item>
        {upd ? <MAButton onClick={()=>{recat('NFT')}}>{n}</MAButton> : 
              <>  
            {cont === n ? <MAButton>{n}</MAButton>
             :  <MButton onClick={()=>{changeCont(n)}}>{n}</MButton>}
                </>}
                </Item>
    }


    const TogButton = ({content}) => {
        return <>{main === content ? <ToggleActButton>{content}</ToggleActButton> : 
                    <ToggleButton onClick={()=>{setMain(content)}}>{content}</ToggleButton>}</>
    }



    const PickButton = ({content}) => {
        return <>
                {subcat === content ? <PickAChoice>{content}</PickAChoice> : 
                    <PickChoice onClick={()=>{refetch(content)}}>{content}</PickChoice>}
        </>
    }

    return <>
        <LeftBox>
<Menu>
 {shownNav ? <> <MainItem>Select area</MainItem>
     -> Landing page
    Dev path description
<ToggleRow><TogButton content={'Defi'}/> <TogButton content={'NFT'}/></ToggleRow>
    <MainItem>Select use case</MainItem>
    {main === 'Defi' && <Picker>
        <PickButton content='DEX'/>
        <PickButton content='Landing'/>
        <PickButton content='Payment'/>
        <PickButton content='Perpetual'/>
        <PickButton content='Vault'/>
    </Picker>}
    {main === 'NFT' && <Picker>
        <PickButton content='Collection'/>
        <PickButton content='Gaming'/>
        <PickButton content='Marketplace'/>
    </Picker>}</> : <><Change onClick={()=>setShownNav(true)}>Set new path</Change></>}
    <MainItem>Getting started</MainItem>
        <MenuItem n={'Setup project'}/>
        <MenuItem n={'Frontend'}/>
    <MainItem>Governance (o)</MainItem>
        <MenuItem n={'Tokenomics'}/>
        <MenuItem n={'Design Launch'}/>
        <MenuItem n={'DAO'}/>
    <MainItem>Use case specific</MainItem>
        {main === 'Defi' && <>
            JSON map
            </>}
        {main === 'NFT' && <>
            JSON map
            </>}
        {subcat === null && <MenuItem n='Select use case'/>}
    <MainItem>Featues (o)</MainItem>
     {subcat === null && <MenuItem n='Select use case'/>}
    <MainItem>Security</MainItem>
        <MenuItem n={'Audit'}/>
        <MenuItem n={'Something'}/>
    <MainItem>Deployment</MainItem>
</Menu>
</LeftBox>
    </>
}

export default PathLeftSection;


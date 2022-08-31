import styled from 'styled-components';
import {useState} from 'react'
import {PathContext} from '../contexts/PathContext';
import PathRightSection from './PathRightSection';
import PathCore from './PathCore';


// GQL mapper -> difficulty, flagy

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colors.light};
    padding-left: 5%;
    @media (max-width: 1000px) {
        padding: 10px;
  }
`

const Kontejner = styled.div`
    display: flex;
    padding: 2%;
    @media (max-width: 1000px) {
        padding: 10px;
  }
`

const NavButton = styled.button`
    font-family: 'Staatliches';
    font-size: 1.3em;
    opacity: 0.8;
    padding: 0.5%;
    padding-left: 1.5%;
    padding-right: 1.5%;
    color: ${props => props.theme.colors.landingTitle};
    background: ${props => props.theme.colors.landingBox};
`

const NavActButton = styled(NavButton)`
    color: ${props => props.theme.colors.landingSubtitle};
    opacity: 1;
`

const NavDisabledButton = styled(NavButton)`
    opacity: 0.4;
`

const MiddleBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    background: ${props => props.theme.colors.lightGreen};
    text-align: left;
`

const MainItem = styled.div`
    font-family: 'Staatliches';
    color: ${props => props.theme.colors.text_title};
    font-size: 1.4em;
    letter-spacing: 1px;
    font-weight: 500;
`

const NavRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 0.5%;
    justify-content: center;
`

const ToggleRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 5%;
    margin-bottom: 10%;
`

const Change = styled.button` 
    position: absolute;
    background: inherit;
    font-size: 0.5em;
    font-family: 'Staatliches';
    opacity: 0.7;
    border: 0.3px dotted ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.text_primary};
    &:hover{
        background: ${props => props.theme.colors.red};
        opacity: 1;
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
    width: 24%;
    @media (max-width: 1000px) {
        padding: 2px;
  }
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
    width: 100%;
    overflow-y: auto;
    padding-right: 15%;
    border-right: 0.1px solid ${props => props.theme.colors.lineAlt};
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
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

const Selected = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Chilanka';
    transition: 0.1s;
    font-size: 1.7em;
    color: ${props => props.theme.colors.text_primary};
    margin-bottom: 3%;
`
const SelectTitle = styled.div`
    margin-top: 15%;
`

const CasePicker = styled.div`
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`



const PathSection = () => {
    const [main, setMain] = useState('Defi')
    const [cont, setCont] = useState('Setup project')	
    const [tool, setTool] = useState('Hardhat')
    const [subcat, setSubcat] = useState(null)
    const [cat, setCat] = useState('Defi')
    const [shownNav, setShownNav] = useState(true)


    const TopButton = ({content, disabled}) => {
        return <>
            {disabled ? <><NavDisabledButton disabled>{content}</NavDisabledButton> </> : 
            <> {tool === content ? <NavActButton>{content}</NavActButton> :  <NavButton onClick={()=>{setTool(content)}}>{content}</NavButton>}</>}
        </>
    }

    const recat = async (cat) => {
        setCat(cat)
        setSubcat(null)
    }

    const refetch = async (sub) => {
        setSubcat(sub)
        // Await gql fetch + loading icon 
        setShownNav(false)
    }


    const MenuItem = ({upd, n}) => {
        return <Item>
        {upd ? <MAButton onClick={()=>{recat('NFT')}}>{n}</MAButton> : 
              <>  
            {cont === n ? <MAButton>{n}</MAButton>
             :  <MButton onClick={()=>{setCont(n)}}>{n}</MButton>}
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

    const subnavigation = <>
                {cont === 'Setup project' && <PathCore s1='Install' s2={'Test'} s3={'Bootstrap'}/>}
                {cont === 'Frontend' && <PathCore s1='UI' s2={'Wallet'} s3={'Interaction'}/>}
                {cont === 'Tokenomics' && <PathCore s1='Design' s2={'Launch'} s3={'Types'} s4={'Vesting'}/>}
                {cont === 'Design launch' && <PathCore s1='Launch1' s2={'Launch2'} s3={'Launch3'}/>}
                {cont === 'DAO' && <PathCore s1='Categorization' s2={'Tooling'} s3={'Governance'} s4={'Legal'}/>}
                {cont === 'Audit' &&  <PathCore s1='Audit1' s2={'Audit2'} s3={'Audit3'}/>}
                {cont === 'Vulnerabilities' && <PathCore s1='Exploits' s2={'Vulnerabilities'} />}
        </>
    const defiNav = <>
            {subcat === 'DEX' && <MenuItem n={'AMM'}/>}
            {subcat === 'DEX' && <MenuItem n={'Uniswap'}/>}
            {subcat === 'DEX' && <MenuItem n={'Frontend'}/>}
            {subcat === 'Lending' && <MenuItem n={'Lending'}/>}
            {subcat === 'Lending' && <MenuItem n={'Aave'}/>}
            {subcat === 'Lending' && <MenuItem n={'Example'}/>}
            {subcat === 'Payment' && <MenuItem n={'Payment'}/>}
            {subcat === 'Vault' && <MenuItem n={'Vault'}/>}
            {subcat === 'Vault' && <MenuItem n={'Yearn'}/>}
    </>

    const nftNav = <>

    </>
  

    return <Flex><PathContext.Provider value={{cont, cat, subcat}}>

                <NavRow> 
            {cont === 'Setup project' ? <>
                <TopButton content='Hardhat'/> 
                <TopButton content='Truffle'/>
                <TopButton content='Remix'/>
                <TopButton content='Brownie'/>
                <TopButton content='Foundry'/>
            </> : 
            <>
                <TopButton content='Hardhat' disabled/> 
                <TopButton content='Truffle' disabled/>
                <TopButton content='Remix' disabled/>
                <TopButton content='Brownie' disabled/>
                <TopButton content='Foundry' disabled/> </>} 
                </NavRow>
    <Kontejner>
    <LeftBox>
<Menu>
 {shownNav ? <CasePicker> <MainItem>Select area</MainItem>
 {main} + {cat} + {cont} + {tool} + {subcat}
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
    </Picker>}</CasePicker> : <Selected><SelectTitle>{main} {subcat}</SelectTitle><Change onClick={()=>setShownNav(true)}>Set new path</Change></Selected>}
    <MainItem>Getting started</MainItem>
        <MenuItem n={'Setup project'}/>
        <MenuItem n={'Frontend'}/>
    <MainItem>Governance (o)</MainItem>
        <MenuItem n={'Tokenomics'}/>
        <MenuItem n={'Design Launch'}/>
        <MenuItem n={'DAO'}/>
    <MainItem>Use case specific</MainItem>
        {main === 'Defi' && <>{defiNav}</>}
        {main === 'NFT' && <>{nftNav}</>}
        {subcat === null && <MenuItem n='Select use case'/>}
    <MainItem>Featues (o)</MainItem>
     {subcat === null && <MenuItem n='Select use case'/>}
    <MainItem>Security</MainItem>
        <MenuItem n={'Audit'}/>
        <MenuItem n={'Something'}/>
    <MainItem>Deployment</MainItem>
</Menu>
</LeftBox>
        <MiddleBox>
            <MainItem>
                {subnavigation}
            </MainItem>
        </MiddleBox>
        <PathRightSection/>
    </Kontejner>
    </PathContext.Provider></Flex>
}

export default PathSection;
import styled from 'styled-components';
import {useState} from 'react'


const Flex = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colors.light};
    padding-left: 5%;
`

const ToggleRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 5%;
    margin-bottom: 10%;
`

const ToggleButton = styled.button`
    font-family: 'Staatliches';
    font-size: 1.7em;
    border-right: 1px solid ${props => props.theme.colors.lineAlt};
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

const Kontejner = styled.div`
    display: flex;
    padding: 5%;

`

const LeftBox = styled.div`
    display: flex;
    flex-direction: row;
    padding: 2%;
    width: 23%;
`

const MiddleBox = styled.div`
    display: flex;
    width: 50%;
    justify-content: center;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    background: ${props => props.theme.colors.lightGreen};
`

const RightBox = styled.div`
    display: flex;
    width: 20%;
    padding: 2%;
    max-height: 80vh;
    overflow-y: auto;
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

const Item = styled.div`
    display: flex;
    padding: 1%;
    padding-left: 5%;
    font-family: 'Chilanka';
`

const MainItem = styled.div`
    font-family: 'Staatliches';
    font-size: 1.2em;
    letter-spacing: 1px;
    font-weight: 500;
`

const RightContent = styled.div`

`

const NavRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const NavButton = styled.button`
    font-family: 'Staatliches';
    background: ${props => props.theme.colors.landingBox};
`

const NavActButton = styled(NavButton)`

`


const PathSection = () => {
    const [main, setMain] = useState('Defi')
    const [cat, setCat] = useState('Defi')
    const MenuItem = ({upd}) => {
        return <Item>
                  {upd ? <button onClick={()=>{setCat('NFT')}}>Item</button> : 
                  <button onClick={()=>{refetch('NFT')}}>Item</button>}
                
                </Item>
    }

    const TogButton = ({content}) => {
        return <>{main === content ? <ToggleActButton>{content}</ToggleActButton> : 
                    <ToggleButton onClick={()=>{setMain(content)}}>{content}</ToggleButton>}</>
    }

    const TopButton = ({content}) => {
        return <>
                {main === content ? <NavActButton>{content}</NavActButton> : 
                    <NavButton onClick={()=>{setMain(content)}}>{content}</NavButton>}
        </>
    }

    const refetch = async (cat) => {
        setCat(cat)
    }

    // Table of combinations - Mapping table Friday
    // Write markdown files - screenshots + Define titles 
    // Setup + Governance + Deploy -> API agnostic, resources as a bonus
    // Map markdown for each sections
    // Connect Graph query 
    
    return <Flex>
                <NavRow>Pick your scenario for {cat}  <TopButton content='text'/>  <TopButton content='text'/></NavRow>
    <Kontejner>
        <LeftBox>
            <Menu>
            <ToggleRow><TogButton content={'Defi'}/> <TogButton content={'NFT'}/></ToggleRow>
                <MainItem>Getting started</MainItem>
                    <MenuItem/>
                <MainItem>Governance design</MainItem>
                    <MenuItem/>
                <MainItem>Use case specific</MainItem>
                    <MenuItem/>
                    <MenuItem/>
                <MainItem>Optional features -- to list</MainItem>
                    <MenuItem/>
                    <MenuItem/>
                <MainItem>Security</MainItem>
                    <MenuItem/>
                    <MenuItem/>
                <MainItem>Deployment</MainItem>
     
            </Menu>
        </LeftBox>
        <MiddleBox>
            <MainItem>Find inspiration</MainItem>
        </MiddleBox>
        <RightBox>
            <div>
                <MainItem>Tooling</MainItem>
                <RightContent>Content</RightContent>
            </div>
        </RightBox>

    </Kontejner></Flex>
}

export default PathSection;
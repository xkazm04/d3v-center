import styled from "styled-components";
import { ArrowIcon } from "../icons/nav";
import {Grid, Row, Col} from 'rsuite'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { fetchPolka } from "../data/graphQueries";
import { GqlPFilteredCatMapper, GqlPFilteredRMapper, GqlPFilteredUsageMapper } from "./GqlMappers";
import CodeComponent from "../components/code/CodeComponent";

const token = process.env.REACT_APP_CMS_API


const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 100%;
    background: #212121;
    padding: 3%;
    padding-left: 5%;
    border-radius: 15px;  
    min-height: 400px;
    animation: fadeIn 0.2s;
     @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    @media (min-width: 2000px) {
        padding-left: 10%;
        padding-right: 10%;
  }
`

const Box = styled.div`
    display: flex;
    min-width: 200px;
    flex-direction: column;
    padding: 3%;
    margin-top: 5%;
    text-align: left;
    border-radius: 15px;
    @media (max-width: 1000px) {
      width: 100%;
      margin: 0;
  }
`

const ArticleButton = styled.button`
  border: 1px solid white;
  box-shadow: 0px 0px 3px 0px #e6007a;
  border-radius: 15px;
  font-weight: 500;
  margin: 5px;
  letter-spacing: 1px;
  color: white;
  transition: 0.1s;
  height: 30px;
  font-family: 'Chilanka';
  background: inherit;
  &:hover{
    color: #e6007a;
  }
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const ProtocolBox = styled.div`
    width: 25%;
    margin: 2%;
    animation: fadeIn 0.2s;
     @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`


const ArticleActButton = styled(ArticleButton)`
  background: inherit;
  color: #e6007a;
  &:hover{
    color: #e6007a;
  }
`

const Navigation = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Section = styled.div`
    display: flex;
    margin: 2%;
    border-top: 1px dashed #e6007a;
`

const ParachainSection = styled.div`
    color: white;
    background: rgba(15, 0, 7, 0.4);
    border-radius: 5px;
    padding: 2%;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 2%;
    border: 1px solid #e6007a;
    line-height: 1.7;
`

const Title = styled.div`
     color: #e6007a;
     font-family: 'NoBill';
    font-size: 2.5rem;
    align-self: center;
`

const TitleS = styled(Title)`
    font-size: 1.5em;
    font-weight: 700;
    border-bottom: 1px dashed #e6007a;
    min-width: 40%;
    text-align: center;
    margin: 1%;
    margin-bottom: 3%;
`

const SubnavBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NavButton = ({condition, step, setfunction}) => {
    return <> {condition === step ? <ArticleActButton>{step}</ArticleActButton>: <ArticleButton onClick={()=>{setfunction(step)}}>{step}</ArticleButton>}   </>
}
   

  
export default function PolkaPath() {
    const [gqlError, setGqlError] = useState(false);
    const [tutorials, setTutorials] = useState()
    const [definitions, setDefinitions] = useState()
    const [tools, setTools] = useState()
    const [repos, setRepos] = useState()
    const [build, setBuild] = useState('Defi')
    const [learn, setLearn] = useState('Architecture')
    const [ch, setCh] = useState('Acala')
    const [codeExample, setCodeExample] = useState('Example1')

    const [step, setStep] = useState('Setup')
    
    const StepIcon =  <ArrowIcon color='#e6007a' width='30px' height='30px'/>

    const headers = {
        "authorization": `Bearer ${token}`,
        "content-Type": "application/json"
    }
    const gqlEndpoint = `${process.env.REACT_APP_ENVIRONMENT}/graphql`


    const graphqlPolkaQuery = {
        operationName: "FetchPolkaPath",
        query: fetchPolka
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

    const findPolka = async () => {
        await fetchArticles({data: graphqlPolkaQuery})
    }


    useEffect(() => {
        findPolka()
        // eslint-disable-next-line 
    },[])

    return <><Kontejner>
                <Title> POLKADOT</Title>
                {gqlError && <>Failed to fetch data</>}
        <Navigation>  
              <NavButton condition={step} step={'Setup'} setfunction={setStep}/> {StepIcon}  
              <NavButton condition={step} step={'Learn'} setfunction={setStep}/>  {StepIcon}  
              <NavButton condition={step} step={'Build'} setfunction={setStep}/>
        </Navigation>
        {step === 'Setup' &&    
                    <SubnavBox> <TitleS>Setup project with pre-build templates</TitleS> 
                    </SubnavBox> }   
        {step === 'Learn' &&    
                    <SubnavBox> <TitleS>Learn about Polkadot concepts and its ecosystem</TitleS> <div>
                        <NavButton condition={learn} step={'Architecture'} setfunction={setLearn}/>
                        <NavButton condition={learn} step={'Crosschain'} setfunction={setLearn}/>
                        <NavButton condition={learn} step={'Parachains'} setfunction={setLearn}/>
                    </div>
                    </SubnavBox> }    
        {step === 'Build' &&    
                    <SubnavBox> <TitleS>Do not invent wheel, get inspired from others</TitleS> <div>
                        <NavButton condition={build} step={'Defi'} setfunction={setBuild}/>
                        <NavButton condition={build} step={'NFT'} setfunction={setBuild}/>
                        <NavButton condition={build} step={'Data'} setfunction={setBuild}/>
                    </div>
                    </SubnavBox> }  
        {step === 'Learn' && learn === 'Parachains' && <><Flex><ProtocolBox>
                    <TitleS>Defi</TitleS> 
                         <NavButton condition={ch} step={'Acala'} setfunction={setCh}/>
                         <NavButton condition={ch} step={'Centrifuge'} setfunction={setCh}/>
                         <NavButton condition={ch} step={'Coinversation'} setfunction={setCh}/>
                         <NavButton condition={ch} step={'Composable'} setfunction={setCh}/>
                         <NavButton condition={ch} step={'HydraDX'} setfunction={setCh}/>
                         <NavButton condition={ch} step={'Interlay'} setfunction={setCh}/>
                         <NavButton condition={ch} step={'Parallel'} setfunction={setCh}/>
                         <NavButton condition={ch} step={'Polkadex'} setfunction={setCh}/>
                        </ProtocolBox>
                        <ProtocolBox>
                    <TitleS>Smart contracts</TitleS> 
                        <NavButton condition={ch} step={'Astar'} setfunction={setCh}/>
                        <NavButton condition={ch} step={'Clover'} setfunction={setCh}/>
                        <NavButton condition={ch} step={'Moonbeam'} setfunction={setCh}/>
                        </ProtocolBox>
                        <ProtocolBox>
                    <TitleS>NFT</TitleS> 
                        <NavButton condition={ch} step={'Efinity'} setfunction={setCh}/>
                        <NavButton condition={ch} step={'Unique'} setfunction={setCh}/>
                        </ProtocolBox>
                        <ProtocolBox>
                    <TitleS>Data</TitleS> 
                        <NavButton condition={ch} step={'Litentry'} setfunction={setCh}/>
                        <NavButton condition={ch} step={'Nodle'} setfunction={setCh}/>
                        <NavButton condition={ch} step={'Phala'} setfunction={setCh}/>
                        <NavButton condition={ch} step={'Totem'} setfunction={setCh}/>
                        </ProtocolBox>
                        </Flex>
                        <Flex>
                        <Grid>
                            <Row>
                                <Col sm={24} md={12}>
                                <ParachainSection>
                                <TitleS>About</TitleS>
                                    TBD 7/2022 - Example:  
                                    Acala is the all-in-one DeFi hub of Polkadot. Acala is an Ethereum-compatible platform for financial applications to use smart contracts or built-in protocols with out-of-the-box cross-chain capabilities and robust security. The platform also offers a suite of financial applications including: a trustless staking derivative (liquid DOT), a multi-collateralized stablecoin backed by cross-chain assets (aUSD), and an AMM DEX – all with micro gas fees that can be paid in any token.
                                </ParachainSection>
                                </Col>
                                <Col sm={24} md={12}>
                                    <ParachainSection>
                                    <TitleS>Development details</TitleS>
                                        TBD 7/2022 - Language, environment, tooling
                                    </ParachainSection>
                                    <ParachainSection>
                                    <TitleS>Milestones</TitleS>
                                        TBD 7/2022 - Dev related milestones
                                    </ParachainSection>
                                   </Col> 
                            </Row>
                        </Grid>
                        </Flex>
                   </>
                    }
        <Grid>
            <Row>
                
        {step === 'Setup' &&  <Section>
             <Col xs={24} md={12}>
             <GqlPFilteredRMapper data={repos} title={'Staking'} filter={'Staking'}/>
                </Col>
                <Col xs={24} md={12}>
                  <GqlPFilteredUsageMapper data={tools} title={'Tooling'} filter={'Develop'} />
                </Col>

        </Section>}
        {step === 'Learn' &&  <Section>
                {learn === 'Architecture' &&  <>
                            <GqlPFilteredUsageMapper data={definitions} title={'Architecture'} filter={'Architecture'}/>                      
                        </>}
                {learn === 'Crosschain' &&  <>
                            <GqlPFilteredUsageMapper data={definitions} title={'Crosschain'} filter={'Crosschain'}/>                      
                        </>}
        </Section>}
        {step === 'Build' && <Section>
                <Col xs={24} md={12}>
                   {build === 'Defi' && <GqlPFilteredCatMapper data={tutorials} title={'Defi Tutorials'} filter={'Defi'} />}
                   {build === 'NFT' && <GqlPFilteredCatMapper data={tutorials} title={'NFT Tutorials'} filter={'NFT'} />}
                   {build === 'Data' && <GqlPFilteredCatMapper data={tutorials} title={'Data Tutorials'} filter={'Data'} />}
                </Col>
                <Col xs={24} md={12}>
                 <GqlPFilteredRMapper data={repos} title={'Common repositories'} filter={'General'}/>
                    {build === 'Defi' && <>
                        <GqlPFilteredRMapper data={repos} title={'DEX projects'} filter={'DEX'}/>
                        <GqlPFilteredRMapper data={repos} title={'Lending projects'} filter={'Lending'}/>
                    </>}
                </Col>

        </Section>}
        </Row>
        {step === 'Build' && <>
        <Section>
                <Grid>  
                   <Title>Code comparison</Title>
                        <NavButton condition={codeExample} step={'Example1'} setfunction={setCodeExample}/>  
                        <NavButton condition={codeExample} step={'Example2'} setfunction={setCodeExample}/>  
                        <NavButton condition={codeExample} step={'Example3'} setfunction={setCodeExample}/>  
                        <NavButton condition={codeExample} step={'Example4'} setfunction={setCodeExample}/>  
                  
                    <Row>
                        <Col xs={12}>
                            <Box>
                            <TitleS>Solidity</TitleS>
                                <CodeComponent code={erc20sol}/>
                            </Box>
                        </Col>
                        <Col xs={12}>
                            <Box>
                            <TitleS>Ink</TitleS>
                                <CodeComponent code={erc20ink}/>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
        </Section>
        </>}
        </Grid>
    </Kontejner>
    </>
  }

  const erc20ink = `
#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
                                
#[openbrush::contract]
pub mod my_token {
    // Imports from ink!  
    use ink_storage::traits::SpreadAllocate;
    
    // Imports from openbrush
    use openbrush::contracts::psp22::*;  
    use openbrush::contracts::psp22::extensions::burnable::*;      

    #[ink(storage)]
    #[derive(Default, SpreadAllocate, PSP22Storage)]
    pub struct MyPSP22 {
        #[PSP22StorageField]
        psp22: PSP22Data,      
    }

    // Section contains default implementation without any modifications
    impl PSP22 for MyPSP22 {}        
    impl PSP22Burnable for MyPSP22 {}  
        
    impl MyPSP22 {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance) -> Self {
            ink_lang::codegen::initialize_contract(|_instance: &mut MyPSP22| {  
                _instance
                    ._mint(_instance.env().caller(), initial_supply)
                    .expect("Should mint"); 
            })
        }  
    }
}`

const erc20sol =`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MyErc20 is ERC20, ERC20Burnable {
    constructor() ERC20("MyErc20", "MTK") {}
}
`
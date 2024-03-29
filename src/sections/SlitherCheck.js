import styled, {useTheme} from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import Editor from 'react-simple-code-editor';
import CodeComponent from '../components/code/CodeComponent'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Select from 'react-select'
import { versionOptions, refContract } from '../data/solVersions';
import { PlayIcon } from '../icons/utils';
import Err from '../components/typography/Err';
import { Watch } from  'react-loader-spinner'

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5%;
    padding-left: 15%;
    text-align: left;
    @media (max-width: 1000px) {
       display: none;
  }
`

const MobileOnly = styled.div`
    font-family: 'Chilanka';
    font-size: 1.2em;
    margin-top: 30%;
    color: ${props => props.theme.colors.landingBox};
    @media (min-width: 1000px) {
       display: none;
  }
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    animation: fadeIn 0.7s;
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`

const Error = styled.div`
    color: ${props => props.theme.chart.var3_stroke};
    padding-top: 1%;
    padding-bottom: 1%;
    font-weight: 700;
    width: 100%;
`

const CodeBox = styled.div`
`

const PragmaBox = styled.div`
    padding-left: 2%;
    min-width: 150px;
`

const ButtonBox = styled.div`
    padding-top: 10%;
    padding-left: 10%;
    padding-bottom: 10%;
    background: #110000;
    color: ${props => props.theme.colors.lightGreen};
`

const Button = styled.button`
    height: 50px;
    background: transparent;
    border-radius: 35px;
    &:active{
        transition: 0.5s;
        background: #1B5B44;
    }

`

const PulsingButton = styled(Button)`
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
    animation: pulse 2s infinite;
    @keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    
    70% {
        transform: scale(1);
        box-shadow: 0 0 0 2px #4e0000;
    }
    
    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 #2b0000;
    }
}
`

const FormTitle = styled.div`
    font-family: 'Staatliches';
    font-size: 1.4em;
    color: ${props => props.theme.colors.text_primary};
`

const FormSubtitle = styled.div`
    font-family: 'Chilanka';
    font-size: 1.1em;
    color: ${props => props.theme.colors.text_secondary};
`

const LabelTitle = styled(FormTitle)`
    font-size: 1.2em;
    color: ${props => props.theme.colors.text_title}; 
`

const myTheme = (theme) => ({
    ...theme,
    borderRadius: 10,
    colors: {
      ...theme.colors,
      primary25: '#ffffe4',
      primary: '#1B5B44',
    },
})

const MySelect = styled(Select)`
    min-width: 220px;
`

const ResultBox = styled.div`
    border: 1px solid ${props => props.theme.colors.line};
    padding: 2%;
    padding-right: 8%;
    min-width: 200px;
    border: 1px solid ${props => props.theme.colors.lineAlt};
    background: ${props => props.theme.colors.lightGreen};
`

const ResultList = styled.div`
    padding-top: 10%;
`

const Result = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Helvetica';
    color: ${props => props.color};
    font-size: 1.1em;
    font-weight: 700;
`

const ReferenceBox = styled.div`
    color: ${props => props.theme.colors.text_secondary};
    font-size: 1.2em;
    font-family: 'Chilanka';
    margin-top: 5%;
    margin-left: 2%;
`

const A = styled.a`
    text-decoration: underline;
    cursor: pointer;
    color: ${props => props.theme.colors.text_primary};
    transition: 0.1s;
    &:hover{
        color: ${props => props.theme.colors.text_title};
    }
`

const Loader = styled.div`
  display: flex;
  justify-content: center;
`

export default function SlitheCheck() {
    const [code, setCode] = useState(refContract)
    const [err, setErr] = useState('')
    const [open, setOpen] = useState(false)
    const [version, setVersion] = useState({ value: 'pragma solidity ^0.8.2', label: '0.8.2' })
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const theme = useTheme();
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

    const checkSec = async(contract, pragma) => {
        setLoading(true)
        setErr('')
        setResult(null)
        const body = { data:{sol_contract: contract, pragma: pragma.value}  }
       try{
        const res = await axios.post(process.env.REACT_APP_SLITHER, body.data)
        setLoading(false)
        setResult(res.data)
       } catch(e){
        setLoading(false)
        console.log(e)
        setErr('Submit failed, check your code if could be compile successfully in Hardhat/Truffle/Foundry/Brownie.')
       }
  }

    const previewCode = () => {
        setOpen(true)
    }


    return <><Kontejner>
                <FormTitle>Verify online static analysis</FormTitle>
                <FormSubtitle>Using Slither v0.8.3</FormSubtitle>
                   <Error> {err} {result && result.high >= 1 && result.high < 999 && <Err content='Slither found High impact issue, Be careful'/>}</Error>
                 <Flex> <CodeBox>     
                 <LabelTitle>Insert valid Solidity code</LabelTitle>
                    <Editor
                            value={code}
                            onValueChange={code => setCode(code)}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 12,
                                minHeight: 400,
                                width: 500,
                                background: '#050f26',
                                color: 'white',
                                overflowX: 'scroll',
                            }}
                            />

                 <button onClick={previewCode}>preview highlighted</button><CodeComponent code={code} open={open} setOpen={setOpen}/></CodeBox>
                   <PragmaBox>
                    <LabelTitle>Select compiler version</LabelTitle>
                    <MySelect 
                        options={versionOptions}                             
                        styles={customStyles}
                        value={version}
                        defaultValue={versionOptions[0]}
                        onChange={setVersion}
                        placeholder='pragma solidity ^0.8.2'
                        theme={myTheme} />
                                   <ButtonBox> 
                                    Check simplified Slither API
                                        {result || err ? <Button onClick={()=>{checkSec(code, version)}}><PlayIcon width='50' color={theme.colors.dark}/></Button> 
                                        : <PulsingButton onClick={()=>{checkSec(code, version)}}><PlayIcon width='50' color={'#c14646'}/></PulsingButton>}
                                    </ButtonBox>
                {loading && <Loader><Watch
                      height = "200"
                      width = "200"
                      radius = "9"
                      color = '#1F0202'
                    /></Loader>}
                                    {result && <ResultBox>
                                <LabelTitle>We have a result</LabelTitle>
                                  <ResultList>
                                    <Result color={theme.chart.var3_stroke}><div>High:</div><div>{result.high}</div> </Result>
                                    <Result color={theme.colors.text_secondary}><div>Medium:</div><div>{result.medium}</div> </Result>
                                    <Result color={theme.colors.text_secondary}><div>Low:</div><div>{result.low}</div> </Result>
                                    <Result color={theme.colors.text_secondary}><div>Informational:</div><div>{result.informational}</div> </Result>
                                    <Result color={theme.colors.text_secondary}><div>Optimization:</div><div>{result.optimization}</div> </Result>
                                    </ResultList>
                                    
                        </ResultBox>}
                    <ReferenceBox>
                        Analyze your code with
                          <A href='https://github.com/trailofbits/eth-security-toolbox' target="_blank" rel="noopener noreferrer"> Eth security toolbox </A>
                          or
                          <A href='https://github.com/crytic/slither' target="_blank" rel="noopener noreferrer" > Slither </A> before deployment of financially impactful applications.
                        </ReferenceBox>
                    </PragmaBox>

                    
                   </Flex>
        
    </Kontejner>
        <MobileOnly>Feature available only for desktop resolution</MobileOnly>
    </>;
  }
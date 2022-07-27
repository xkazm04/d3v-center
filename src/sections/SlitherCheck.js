import styled, {useTheme} from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import Editor from 'react-simple-code-editor';
import CodeComponent from '../components/code/CodeComponent'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Select from 'react-select'
import { versionOptions } from '../data/solVersions';
import { PlayIcon } from '../icons/utils';

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5%;
    text-align: left;
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
    min-width: 100px;
`

const ButtonBox = styled.div`
    margin-top: 20%;
    margin-left: 30%;
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
        box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    
    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
}
`

const FormTitle = styled.div`
    font-family: 'Staatliches';
    font-size: 1.4em;
    color: ${props => props.theme.colors.text_primary};
`

const FormSubtitle = styled.div`
    font-family: 'Staatliches';
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
    margin-left: 2%;
    padding-left: 2%;
    padding-right: 2%;
    min-width: 200px;
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


export default function SlitheCheck() {
    const [code, setCode] = useState('ahoj')
    const [err, setErr] = useState('')
    const [open, setOpen] = useState(false)
    const [version, setVersion] = useState('0.8.0')
    const [result, setResult] = useState(false)

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
        setErr('')
        setResult(false)
        const body = { data: { contract: contract, pragma: pragma } }
       try{
        const res = await axios.post(`something`, body)
        console.log(res)
        setResult(true)
       } catch(e){
        console.log(e)
        setErr('Submit failed, check your code if could be compile successfully in Hardhat/Truffle/Foundry/Brownie.')
       }
  }

    const previewCode = () => {
        setOpen(true)
    }


    return <Kontejner>
        <FormTitle>Verify online static analysis</FormTitle>
        <FormSubtitle>Using Slither v0.8.3</FormSubtitle>
                   <Error> {err}</Error>
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

                 <button onClick={previewCode}>preview</button><CodeComponent code={code} open={open} setOpen={setOpen}/></CodeBox>
                   <PragmaBox>
                    <LabelTitle>Select compiler version</LabelTitle>
                    <MySelect 
                        options={versionOptions}                             
                        styles={customStyles}
                        value={version}
                        defaultValue={versionOptions[0]}
                        onChange={setVersion}
                        placeholder='Select compiler version'
                        theme={myTheme} />
                                   <ButtonBox> 
                                        {result || err ? <Button onClick={()=>{checkSec(code, version)}}><PlayIcon width='50' color={theme.colors.dark}/></Button> 
                                        : <PulsingButton onClick={()=>{checkSec(code, version)}}><PlayIcon width='50' color={theme.colors.dark}/></PulsingButton> }
                                    </ButtonBox>
                    </PragmaBox>
                    {!result && <ResultBox>
                                <LabelTitle>We have a result</LabelTitle>
                                  <ResultList>
                                    <Result color={theme.chart.var3_stroke}><div>High:</div><div>value</div> </Result>
                                    <Result color={theme.colors.dark}><div>Medium:</div><div></div> </Result>
                                    <Result color={theme.chart.var3_stroke}><div>Low:</div><div></div> </Result>
                                    <Result color={theme.chart.var3_stroke}><div>Informational:</div><div></div> </Result>
                                    <Result color={theme.chart.var3_stroke}><div>Optimization:</div><div></div> </Result>
                                    </ResultList>
                        </ResultBox>}
                    
                   </Flex>
        
    </Kontejner>;
  }
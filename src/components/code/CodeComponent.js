import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula    } from 'react-syntax-highlighter/dist/esm/styles/hljs';




const Code = styled.div`
    text-align: left;
    font-size: 0.8em;
`

const CodeComponent = ({code}) => {
    return (
        <><Code> <SyntaxHighlighter language="solidity" style={dracula}>{code}</SyntaxHighlighter></Code>  
        
</>
    )
}

export default CodeComponent
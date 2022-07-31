import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula  } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Code = styled.div`
    text-align: left;
    font-size: 0.8em;
    max-height: 1000px;
    overflow-y: scroll;
    overflow-x: scroll;
    @media (min-width: 1200px) {
        font-size: 0.9em;
  }
  @media (min-width: 1800px) {
        font-size: 1em;
  }
`


const CodeSeparate = ({code}) => {
    return (
                <Code> <SyntaxHighlighter language="solidity" style={dracula}>{code}</SyntaxHighlighter></Code>  
    )
}

export default CodeSeparate
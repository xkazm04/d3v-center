import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula  } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Modal from 'rsuite/Modal';
import { CloseIcon } from '../../icons/utils';

const CloseButton = styled.button`
  position: sticky;
  padding-top: 1%;
  top: 0;
  background: inherit;
  width: 100%;
`

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

const MyModal = styled(Modal)`
    width: 70%;
    padding-left: 15%;
`


const CodeComponent = ({code, open, setOpen}) => {
    const handleClose = () => setOpen(false);
    return (
    
        <MyModal open={open}  onClose={handleClose}>
            <CloseButton onClick={handleClose}><CloseIcon width={15} color={"red"}/></CloseButton> 
                <Code> <SyntaxHighlighter language="solidity" style={dracula}>{code}</SyntaxHighlighter></Code>  
        </MyModal>
    )
}

export default CodeComponent
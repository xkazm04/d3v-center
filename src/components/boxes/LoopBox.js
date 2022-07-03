import styled from "styled-components"
import Typewriter from 'typewriter-effect';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 150px;
`

const CodeTitle = styled.div`
    color: ${props => props.theme.colors.text_title};
    font-weight: 700;
    text-transform: uppercase;
    padding-bottom: 15%;
`

const LoopBox = ({loop,firstFile,secondFile, thirdFile, fourthFile}) => {
    
const Loop = ({str}) => {
    return<Typewriter
    options={{
        strings: [str],
        autoStart: true,
        delay: 100,
        loop: {loop}
    }}/>
}


    return (
        <><FlexRow>
        <FlexColumn>
            <CodeTitle> {firstFile && <Loop str={firstFile.title}/> } </CodeTitle>
               {firstFile && <Loop str={firstFile.step1}/> } 
               {firstFile && <Loop str={firstFile.step2}/> } 
               {firstFile && <Loop str={firstFile.step3}/> } 
               {firstFile && <Loop str={firstFile.step4}/> } 
               {firstFile && <Loop str={firstFile.step5}/> } 
        
        </FlexColumn>
        <FlexColumn>
        <CodeTitle> {secondFile && <Loop str={secondFile.title}/> } </CodeTitle>
               {secondFile && <Loop str={secondFile.step1}/> } 
               {secondFile && <Loop str={secondFile.step2}/> } 
               {secondFile && <Loop str={secondFile.step3}/> } 
               {secondFile && <Loop str={secondFile.step4}/> } 
               {secondFile && <Loop str={secondFile.step5}/> } 
        </FlexColumn>
        <FlexColumn>
        <CodeTitle> {thirdFile && <Loop str={thirdFile.title}/> } </CodeTitle>
               {thirdFile && <Loop str={thirdFile.step1}/> } 
               {thirdFile && <Loop str={thirdFile.step2}/> } 
               {thirdFile && <Loop str={thirdFile.step3}/> } 
               {thirdFile && <Loop str={thirdFile.step4}/> } 
               {thirdFile && <Loop str={thirdFile.step5}/> } 
        </FlexColumn>
        <FlexColumn>
        {fourthFile &&  <> <CodeTitle> {fourthFile && <Loop str={fourthFile.title}/> } </CodeTitle>
               {fourthFile && <Loop str={fourthFile.step1}/> } 
               {fourthFile && <Loop str={fourthFile.step2}/> } 
               {fourthFile && <Loop str={fourthFile.step3}/> } 
               {fourthFile && <Loop str={fourthFile.step4}/> } 
               {fourthFile && <Loop str={fourthFile.step5}/> }</> }
        </FlexColumn>
        </FlexRow></>
    )
}

export default LoopBox
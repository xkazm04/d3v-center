import styled, {useTheme} from 'styled-components';
import { DiffAdvanced, DiffBasic, DiffScholar } from '../icons/difficulty';
import React, {useState, useContext} from 'react'
import Md from "../components/code/Md"
import { PathContext } from '../contexts/PathContext'
import HH from "../articles/SetupHardhat.md"
import TT from "../articles/SetupTruffle.md"
import { GqlMapper } from './GqlMappers';
import useGql from '../hooks/useGql';

const Nav = styled.div`
    display: flex;
    border-bottom: 1px solid ${props => props.theme.colors.lineAlt};
    width: 100%;
`

const StepPathButton = styled.button`
    color: ${props => props.theme.colors.text_primary};
`

const StepPathAButton = styled(StepPathButton)`
    background: ${props => props.theme.colors.lightGreen};
`

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`    

const FlexColumn = styled.div`
    display: flex; 
    flex-direction: column;
`

const Column = styled.div`
    padding-top: 3%;
    min-width: 33%;
    border-top: 1px solid ${props => props.theme.colors.lineAlt};
`

const NavButton = styled.button`
    font-family: 'Staatliches';
    font-size: 0.8em;
    width: 100%;
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



const PathCore = ({s1,s2,s3,s4}) => {
    const [step, setStep] = useState(s1)
    const [articles, setArticles] = useState('Tutorials')

    const [render, setRender] = useState('');
    var path = ''
    const cont = useContext(PathContext)
    const main = useContext(PathContext)
    const cat = useContext(PathContext)
    const [first] = useGql(main, cat, cont)
    const theme = useTheme();

    // GQL parameters - Cat, Subcat, Main 
    
    const StepB = ({s}) => {
        return <>
        {step === s ? <StepPathAButton>{s}</StepPathAButton>
        : <StepPathButton onClick={()=>{calcPath(s)}}>{s}</StepPathButton>}
        </>
    }
    

    const fetchMe = async (path) => {
        const response = await fetch(path);
        const res = await response.text()
        await setRender(res)
    }

    
    const condition = () => {
        if (step === 'UI') { path = HH}
        if (step === 'Wallet') { path = TT}
    }


    const calcPath = async (s) => {
        await setStep(s)
        await condition()
        await fetchMe(path)
    }

    const ArticleButton = ({content}) => {
        return <>
                {articles === content ? <NavActButton>{content}</NavActButton> : 
                    <NavButton onClick={()=>{setArticles(content)}}>{content}</NavButton>}
        </>
    }



    return <>
    <Nav><StepB s={s1}/><StepB s={s2}/><StepB s={s3}/><StepB s={s4}/> </Nav>
        <Md source={render}/>
    <FlexColumn>    
           

    <FlexRow>   
    <ArticleButton content='Tutorials'/>   
    <ArticleButton content='Definitions'/>
        <Column>
            <DiffBasic width={25} color={theme.tool.basic}/>
            <div>
            {first.tutorials && <>
               {articles === 'Tutorials' && <GqlMapper data={first.tutorials.data} title='Tutorials' filterDiff={'Basic'}/>}
               {articles === 'Definitions' && <GqlMapper data={first.definitions.data} title='Definitions' filterDiff={'Basic'}/>}
            </>} 
            </div>
        </Column>
        <Column>
             <DiffScholar width={25} color={theme.chart.var1_stroke}/>
             <div>
             {first.tutorials && <>
               {articles === 'Tutorials' && <GqlMapper data={first.tutorials.data} title='Tutorials' filterDiff={'Intermediate'}/>}
               {articles === 'Definitions' && <GqlMapper data={first.definitions.data} title='Definitions' filterDiff={'Intermediate'}/>}
            </>} 
            </div>
        </Column>
        <Column>
             <DiffAdvanced width={25}/>
             <div>
             {first.tutorials && <>
               {articles === 'Tutorials' && <GqlMapper data={first.tutorials.data} title='Tutorials' filterDiff={'Advanced'}/>}
               {articles === 'Definitions' && <GqlMapper data={first.definitions.data} title='Definitions' filterDiff={'Advanced'}/>}
            </>} 
            </div>
        </Column>
        </FlexRow>
    </FlexColumn>
    </>
}

export default PathCore;
import {useContext} from 'react';
import { GqlMapper } from './GqlMappers';
import styled from 'styled-components';
import useGql from '../hooks/useGql';
import { PathContext } from '../contexts/PathContext';

const RightContent = styled.div`
    background: ${props => props.theme.colors.lighter};
    min-width: 300px;
`

const RightItem = styled.div`
    font-family: 'Inder';
    font-weight: 500;
    font-size: 1.2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 2%;
    border-bottom: 1px solid ${props => props.theme.colors.lineAlt};
`

const RightTitle = styled.div`
    font-size: 1.3em;
    font-family: 'Staatliches';
`

const RightDesc = styled.div`
    font-size: 0.9em;
    font-family: 'Inder';
`

const RightText = styled.div`
    display: flex;
    flex-direction: column;
`

const WrapRightGql = styled.div`
    text-align: left;
    padding-right: 5%;
    padding-left: 2%;
`

const RightBox = styled.div`
    display: flex;
    width: 30%;
    padding: 2%;
    max-height: 90vh;
    overflow-y: auto;
`

const MainItem = styled.div`
    font-family: 'Staatliches';
    color: ${props => props.theme.colors.text_title};
    font-size: 1.4em;
    letter-spacing: 1px;
    font-weight: 500;
`

const exTitle = 'Generative NFT Programming Articles'
const exDesc = 'with Hardhat, React TS, Rainbowkit, Wagmi and Tailwind'



const PathRightSection = () => {

    const main = useContext(PathContext)
    const cat = useContext(PathContext)
    const cont = useContext(PathContext)

    const [first] = useGql(main, cat, cont)

    return <>
            <RightBox>
            <div>
                <MainItem>Tooling</MainItem>
                <RightContent>
                    <RightItem>
                        <RightText><RightTitle>{exTitle}</RightTitle><RightDesc>{exDesc}</RightDesc></RightText>
                    </RightItem>
                <WrapRightGql>
                    {first.tutorials && <>
                <GqlMapper data={first.tutorials.data} title='Tutorials'/>
                <GqlMapper data={first.definitions.data} title='Definitions'/>
            </>} 
            </WrapRightGql>
                </RightContent>
            </div>
        </RightBox>
    </>
}

export default PathRightSection;
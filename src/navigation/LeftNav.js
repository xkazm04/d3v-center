import { useContext } from 'react';
import {Form, RadioGroup, Radio} from 'rsuite'
import styled from 'styled-components'
import { FilterContext } from '../contexts/FilterContext';

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-top: 15%;
    height: 100%;

`

const Group = styled(RadioGroup)`
    padding-left: 8%;
 
` 

const GroupTitle = styled.p`
    font-family: 'Staatliches', cursive;
    letter-spacing: 2px;
    font-size: 1rem;
    color: #007463;
`

const RadioItem = styled(Radio)`
    color: black;
    font-family: 'Spectral', serif;
    size: 12px;
    font-weight: 400;
    font-style: normal;
`

function LeftNav() {
const {filterChain, setFilterChain, filterSource, setFilterSource, filterStage, setFilterStage, filterUsage, setFilterUsage} = useContext(FilterContext);

// Filter handlers
const handleChangeChain = (filter) => {
    setFilterChain(filter)
    console.log("Filtered chain: " + filterChain)
}

// Filter handlers
const handleChangeSource = (filter) => {
    setFilterSource(filter)
    console.log("Filtered source: " + filterSource)
}

// Filter handlers
const handleChangeStage = (filter) => {
    setFilterStage(filter)
    console.log("Filtered stage: " + filterStage)
}

// Filter handlers
const handleChangeUsage = (filter) => {
    setFilterUsage(filter)
    console.log("Filtered stage: " + filterUsage)
}

    return (
        <Kontejner>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={filterChain}
                onChange={value => {handleChangeChain(value)}}
                >
            <GroupTitle>Ecosystem</GroupTitle>
            <RadioItem value="?filters[Chain][$notNull]">All</RadioItem>
            <RadioItem value="?filters[Chain][$startsWith]=evm">EVM</RadioItem>
            <RadioItem value="?filters[Chain][$eq]=solana">Solana</RadioItem>
            <RadioItem value="?filters[Chain][$eq]=cardano">Cardano</RadioItem>
            </Group>
        </Form.Group>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={filterSource}
                onChange={value => {handleChangeSource(value)}}
                >
            <GroupTitle>Source</GroupTitle>
            <RadioItem value="?filters[Source][$notNull]">All</RadioItem>
            <RadioItem value="?filters[Source][$eq]=github">Github</RadioItem>
            <RadioItem value="?filters[Source][$eq]=log">Blog</RadioItem>
            <RadioItem value="?filters[Source][$eq]=youtube">YouTube</RadioItem>
            </Group>
        </Form.Group>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={filterUsage}
                onChange={value => {handleChangeUsage(value)}}
                >
            <GroupTitle>Usage</GroupTitle>
            <RadioItem value="">All</RadioItem>
            <RadioItem value="defi">Defi</RadioItem>
            <RadioItem value="nft">NFT</RadioItem>
            </Group>
        </Form.Group>
        </Kontejner>
    );
}

export default LeftNav;



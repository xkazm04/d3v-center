import { useContext } from 'react';
import {Form, RadioGroup, Radio} from 'rsuite'
import styled from 'styled-components'
import { FilterContext } from '../contexts/FilterContext';

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    
`

const Group = styled(RadioGroup)`
    background: #f7f7fa;
    padding-left: 5%;
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
            <p>Ecosystem</p>
            <Radio value="?filters[Chain][$notNull]">All</Radio>
            <Radio value="?filters[Chain][$eq]=evm">EVM</Radio>
            <Radio value="?filters[Chain][$eq]=solana">Solana</Radio>
            <Radio value="?filters[Chain][$eq]=cardano">Cardano</Radio>
            </Group>
        </Form.Group>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={filterSource}
                onChange={value => {handleChangeSource(value)}}
                >
            <p>Source</p>
            <Radio value="?filters[Source][$notNull]">All</Radio>
            <Radio value="?filters[Source][$eq]=github">Github</Radio>
            <Radio value="?filters[Source][$eq]=log">Blog</Radio>
            <Radio value="?filters[Source][$eq]=youtube">YouTube</Radio>
            </Group>
        </Form.Group>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={filterStage}
                onChange={value => {handleChangeStage(value)}}
                >
            <p>Stage</p>
            <Radio value="?filters[Stage][$notNull]">All</Radio>
            <Radio value="dev">Development</Radio>
            <Radio value="test">Testing</Radio>
            <Radio value="deploy">Deployment</Radio>
            </Group>
        </Form.Group>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={filterUsage}
                onChange={value => {handleChangeUsage(value)}}
                >
            <p>Usage</p>
            <Radio value="">All</Radio>
            <Radio value="defi">Defi</Radio>
            <Radio value="nft">NFT</Radio>
            </Group>
        </Form.Group>
        </Kontejner>
    );
}

export default LeftNav;



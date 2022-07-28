import {useState} from 'react'
import styled from 'styled-components'

import SectionSubtitle from '../components/typography/SectionSubtitle'
import CodeComponent from '../components/code/CodeComponent'
import PreviewButton from '../components/buttons/PreviewButton'

import AlchemyNft from '../components/interaction/AlchemyNft'
import { AlchNft, AlchCore } from '../data/interactionExamples'
import AlchemyCore from '../components/interaction/AlchemyCore'

const Kontejner = styled.div`
    padding: 2%;
`

const Section = styled.div`
    border: 1px solid black;
    padding: 2%;
    color: ${props => props.theme.colors.text_secondary};
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
`



const AlchemyExample = () => {
    const [openNft, setOpenNft] = useState(false)
    const [openCore, setOpenCore] = useState(false)


    return <Kontejner>
                <Section>
                   <Flex> <SectionSubtitle content='Alchemy NFT '/> 
                    <PreviewButton setF={setOpenNft}/>
                    </Flex>
                    <AlchemyNft />
                    <CodeComponent code={AlchNft} open={openNft} setOpen={setOpenNft} />
                </Section>
                <Section>
                    <Flex> <SectionSubtitle content='Alchemy core'/> 
                    <PreviewButton setF={setOpenCore}/>
                    </Flex>
                    <AlchemyCore/>
                    <CodeComponent code={AlchCore} open={openCore} setOpen={setOpenCore} />
                </Section>
    </Kontejner>
}

export default AlchemyExample;
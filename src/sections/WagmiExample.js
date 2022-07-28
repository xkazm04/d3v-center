import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import {useState} from 'react'


import styled from 'styled-components'
import WagmiProfile from '../components/interaction/WagmiProfile'
import SectionSubtitle from '../components/typography/SectionSubtitle'
import CodeComponent from '../components/code/CodeComponent'
import { WagmiConnect, WagmiSign, WagmiWrite } from '../data/interactionExamples'
import PreviewButton from '../components/buttons/PreviewButton'
import WagmiWriteContract from '../components/interaction/WagmiContract'
import WagmiSignMessage from '../components/interaction/WagmiSignMessage'

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

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

const WagmiExample = () => {
    const [openCon, setOpenCon] = useState(false)
    const [openWrite, setOpenWrite] = useState(false)
    const [openSign, setOpenSign] = useState(false)



    return <Kontejner>
           <WagmiConfig client={client}>
                <Section>
                   <Flex> <SectionSubtitle content='Wallet connection'/> 
                    <PreviewButton setF={setOpenCon}/>
                    </Flex>
                    <WagmiProfile />
                    <CodeComponent code={WagmiConnect} open={openCon} setOpen={setOpenCon} />
                </Section>
                <Section>
                    <Flex> <SectionSubtitle content='Contract Write'/> 
                    <PreviewButton setF={setOpenWrite}/>
                    </Flex>
                    <WagmiWriteContract/>
                    <CodeComponent code={WagmiWrite} open={openWrite} setOpen={setOpenWrite} />
                </Section>
                <Section>
                    <Flex> <SectionSubtitle content='Sign message'/> 
                    <PreviewButton setF={setOpenSign}/>
                    </Flex>
                    <WagmiSignMessage/>
                    <CodeComponent code={WagmiSign} open={openSign} setOpen={setOpenSign} />
                </Section>
    </WagmiConfig>
    </Kontejner>
}

export default WagmiExample;
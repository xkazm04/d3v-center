import { WagmiConfig, createClient, chain, configureChains } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import {useState} from 'react'
import { publicProvider } from 'wagmi/providers/public';

import {
    getDefaultWallets,
    RainbowKitProvider,darkTheme 
  } from '@rainbow-me/rainbowkit';

import styled from 'styled-components'
import WagmiProfile from '../components/interaction/WagmiProfile'
import SectionSubtitle from '../components/typography/SectionSubtitle'
import CodeComponent from '../components/code/CodeComponent'
import { WagmiConnect, WagmiSign, WagmiWrite } from '../data/interactionExamples'
import PreviewButton from '../components/buttons/PreviewButton'
import WagmiWriteContract from '../components/interaction/WagmiContract'
import WagmiSignMessage from '../components/interaction/WagmiSignMessage'
import '@rainbow-me/rainbowkit/dist/index.css';


const { chains } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.polygonMumbai], 
    [
      publicProvider()
    ]
  );


const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });

const Kontejner = styled.div`
    margin: 2%;
    background: ${props => props.theme.colors.lighter};
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
  connectors,
  provider: getDefaultProvider(),
})

const WagmiExample = () => {
    const [openCon, setOpenCon] = useState(false)
    const [openWrite, setOpenWrite] = useState(false)
    const [openSign, setOpenSign] = useState(false)



    return <Kontejner>
           <WagmiConfig client={client}>
              <RainbowKitProvider  theme={darkTheme({      accentColor: '#7b3fe4',
                                                            accentColorForeground: 'white',
                                                            borderRadius: 'small',
                                                            fontStack: 'system',})} chains={chains}>
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
        </RainbowKitProvider>
    </WagmiConfig>
    </Kontejner>
}

export default WagmiExample;
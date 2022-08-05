

import styled, {useTheme} from 'styled-components'
import { chainData } from '../data/chainData'
import { EcoHigh, EcoLow, EcoMedium, DecHigh, DecMedium, DecLow, TvlHigh, TvlMedium , TvlLow} from '../icons/trillema'

const Kontejner = styled.div`
  display: flex;
  background: ${props => props.theme.colors.lightGreen};
  flex-direction: column;
  padding: 5%;
  min-width: 100%;
  animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  
`
const Title = styled.div`
    font-size: 1.9em;
    color: ${props => props.theme.colors.text_primary};
    padding-bottom: 5%;
    font-family: 'NoBill';
    min-width: 100%;
    animation: fadeIn 0.5s;
    @media (max-width: 1000px) {
        font-size: 1.5em;
  }
`
const StatBox = styled.div`
    display: flex;
    background: ${props => props.theme.colors.medium};
    padding-top: 5%;
    border-top: 1px solid ${props => props.theme.colors.lineAlt};
    background: inherit;
`

const Stat = styled.div`
    font-size: 1.3em;
    display: flex;
    color: ${props => props.theme.colors.text};
    justify-content: space-between;
    @media (max-width: 1000px) {
        min-width: 150px;
        font-size: 1.1em;
  }
    
`

const StatTitle = styled.div`
    font-family: 'Staatliches';
    font-size: 1.1em;
    color: ${props => props.color};
    min-width: 50px;
    text-align: left;
    @media (max-width: 1000px) {
        min-width: 100px;
        font-size: 1em;
  }
`

const StatItem = styled.div`
    font-size: 0.9em;
    font-family: 'Helvetica';
    color: ${props => props.theme.colors.text};
`
const Box = styled.div`
    padding-top: 5%;
`
const AttrSection = styled.div`
    text-align:left;
    justify-content: flex-start;
    padding-bottom: 3%;
    font-size: 1.3em;
`

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const Flex = styled.div`
    margin-top: 4%;
    display: flex;
    flex-direction: row;
`

const TrilBox = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 120px;
    justify-content: space-between;
`

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    text-align: left;
    font-style: italic;
    padding-top: 5%;
    border-top: 1px dashed ${props => props.theme.colors.lineAlt};
`




export default function ChainStats({chain}) {
    const theme = useTheme();
    const arr = chainData.filter(c => c.chain === chain)


    const NodeProvider = ({icon,reference}) => {
        return (
            // eslint-disable-next-line
            <><a href={reference} target="_blank">{icon}</a></>
        )
    }



    return <Kontejner> 
           <Title> {chain}</Title>
           <StatBox>
                {arr && <> {arr.map((item) => (
                        <div key={item.chain} >
                          <Stat> <StatTitle><a href={item.config}>Docs</a></StatTitle> </Stat>
                          <Stat> <StatTitle>Mainnet RPC: </StatTitle> <StatItem>   {item.rpc}</StatItem>  </Stat>
                          <Stat> <StatTitle>Testnet RPC: </StatTitle> <StatItem>  {item.trpc}</StatItem>  </Stat>
                             {item.grant !== '' ? <Stat> <StatTitle><a href={item.grant}>Grant opportunity</a> </StatTitle>  </Stat>  : null}
                          <Stat> <StatTitle>Main DEX: </StatTitle> <StatItem>  {item.swap}</StatItem>  </Stat>
                        <Box>
                            <AttrSection> <StatTitle color={theme.colors.text_primary}>Short story</StatTitle> <StatItem> {item.attribute}</StatItem>  </AttrSection>
                            <AttrSection>  <StatTitle color={theme.chart.var2_fill}>Attractive</StatTitle> <StatItem>  {item.reasonPlus}</StatItem> </AttrSection>
                            <AttrSection>  <StatTitle color={theme.chart.var3_fill}>Be aware</StatTitle> <StatItem>    {item.reasonMinus}</StatItem> </AttrSection>
                        </Box>         
                        <Flex>
                            <FlexColumn>
                                {item.dec === "3" ?  <TrilBox><StatTitle  color={theme.chart.var2_fill}>Decentralization</StatTitle><StatItem>High</StatItem><DecHigh width='100' color={theme.chart.var2_fill}/></TrilBox> : null}
                                {item.dec === "2" ? <TrilBox><StatTitle color={theme.colors.text_primary} >Decentralization</StatTitle><StatItem>Medium</StatItem><DecMedium width='80' height='80' color={theme.colors.text_primary}/> </TrilBox> : null}
                                {item.dec === "1" ?  <TrilBox><StatTitle color={theme.chart.var3_stroke}>Decentralization</StatTitle><StatItem>Low</StatItem><DecLow width='50' color={theme.chart.var3_stroke}/></TrilBox> : null}
                            </FlexColumn>
                            <FlexColumn>
                                {item.ecosystem === "1" ? <TrilBox><StatTitle color={theme.chart.var3_stroke}>Ecosystem</StatTitle><StatItem>Low</StatItem><EcoLow width='80' color={theme.chart.var3_stroke}/></TrilBox> : null}
                                {item.ecosystem === "2" ? <TrilBox><StatTitle color={theme.colors.text_primary} >Ecosystem</StatTitle><StatItem>Medium</StatItem><EcoMedium width='80' colorStroke={theme.chart.var1_stroke} colorFill={theme.colors.text_primary}/> </TrilBox> : null}
                                {item.ecosystem === "3" ? <TrilBox><StatTitle  color={theme.chart.var2_fill}>Ecosystem</StatTitle><StatItem>High</StatItem><EcoHigh width='80' color={'black'}/></TrilBox> : null}
                            </FlexColumn>
                            <FlexColumn>
                                {item.tvl === "3" ? <TrilBox><StatTitle  color={theme.chart.var2_fill}>Liquidity (TVL)</StatTitle><StatItem>High</StatItem><TvlHigh width='50' color={theme.chart.var2_fill}/></TrilBox> : null}
                                {item.tvl === "2" ? <TrilBox><StatTitle  color={theme.colors.text_primary}>Liquidity (TVL)</StatTitle><StatItem>Medium</StatItem><TvlMedium width='80' color={theme.colors.text_primary}/></TrilBox> : null}
                                {item.tvl === "1" ? <TrilBox><StatTitle  color={theme.chart.var3_stroke}>Liquidity (TVL)</StatTitle><StatItem>Low</StatItem><TvlLow width='100'  color={theme.chart.var3_stroke}/></TrilBox> : null}
                            </FlexColumn>
                        </Flex>
                       <Footer>
                              <StatItem>Need node and don't trust public RPC? Try free private providers:</StatItem>  
                                    {item.node === "Pokt" && <NodeProvider icon={item.node} reference={'https://www.pokt.network'}/>}
                                    {item.node === "GetBlock" && <NodeProvider icon={item.node} reference={'https://getblock.io'}/>}
                                    {item.node === "Pinknode" && <NodeProvider icon={item.node} reference={'https://pinknode.io'}/>}
                                    {item.node === "Infura" && <NodeProvider icon={item.node} reference={'https://infura.io'}/>}
                                    {item.node === "Blockdaemon" && <NodeProvider icon={item.node} reference={'https://blockdaemon.com/'}/>}
                                    {item.node === "AllThatNode" && <NodeProvider icon={item.node} reference={'https://www.allthatnode.com/'}/>}
                                    {item.node === "Alchemy" && <NodeProvider icon={item.node} reference={'https://www.alchemy.com'}/>}
                                    {item.nodeAlt === 'Tatum' && <NodeProvider icon={item.nodeAlt} reference={'https://tatum.io'}/>}
                                    {item.nodeAlt === 'Alchemy' && <NodeProvider icon={item.nodeAlt} reference={'https://www.alchemy.com'}/>}
                                    {item.nodeAlt === 'Blast' && <NodeProvider icon={item.nodeAlt} reference={'https://blastapi.io'}/>}
                                    {item.nodeAlt === 'AllThatNode' && <NodeProvider icon={item.nodeAlt} reference={'https://www.allthatnode.com'}/>}
                                    {item.nodeAlt === 'Moralis' && <NodeProvider icon={item.nodeAlt} reference={'https://moralis.io'}/>}
                        </Footer>
                        </div>
                    ))} </> }
            </StatBox>
    </Kontejner>;
  }
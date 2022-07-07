

import styled, {useTheme} from 'styled-components'
import { chainData } from '../data/chainData'
import { EcoHigh, EcoLow, EcoMedium, DecHigh, DecMedium, DecLow, TvlHigh, TvlMedium , TvlLow} from '../icons/trillema'

const Kontejner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
  
`
const Title = styled.div`
    font-size: 1.9em;
    color: ${props => props.theme.colors.text_primary};
    padding-bottom: 5%;
    font-family: 'NoBill';
    min-width: 100%;
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
    min-width: 350px;
    color: ${props => props.theme.colors.text};
    justify-content: space-between;
    
`

const StatTitle = styled.div`
    font-family: 'Staatliches';
    font-size: 1.1em;
    color: ${props => props.color};
    min-width: 150px;
    text-align: left;
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
    margin-top: 2%;
    display: flex;
    flex-direction: row;
`

const TrilBox = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 120px;
    justify-content: space-between;
`

export default function ChainStats({chain}) {
    const theme = useTheme();
    const arr = chainData.filter(c => c.chain === chain)

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
                                {item.dec === "3" ?  <TrilBox><StatTitle  color={theme.chart.var2_fill}>Decentralization</StatTitle>High<DecHigh width='100' color={theme.chart.var2_fill}/></TrilBox> : null}
                                {item.dec === "2" ? <TrilBox><StatTitle color={theme.colors.text_primary} >Decentralization</StatTitle>Medium<DecMedium width='80' height='80' color={theme.chart.var1_stroke}/> </TrilBox> : null}
                                {item.dec === "1" ?  <TrilBox><StatTitle color={theme.chart.var3_stroke}>Decentralization</StatTitle>Low<DecLow width='50' color={theme.chart.var3_stroke}/></TrilBox> : null}
                            </FlexColumn>
                            <FlexColumn>
                                {item.ecosystem === "1" ? <TrilBox><StatTitle color={theme.chart.var3_stroke}>Ecosystem</StatTitle>Low<EcoLow width='80' color={theme.chart.var3_stroke}/></TrilBox> : null}
                                {item.ecosystem === "2" ? <TrilBox><StatTitle color={theme.colors.text_primary} >Ecosystem</StatTitle>Medium<EcoMedium width='80' colorStroke={theme.chart.var1_stroke} colorFill={theme.chart.var1_fill}/> </TrilBox> : null}
                                {item.ecosystem === "3" ? <TrilBox><StatTitle  color={theme.chart.var2_fill}>Ecosystem</StatTitle>High<EcoHigh width='80' color={'black'}/></TrilBox> : null}
                            </FlexColumn>
                            <FlexColumn>
                                {item.tvl === "3" ? <TrilBox><StatTitle  color={theme.chart.var2_fill}>Liquidity (TVL)</StatTitle>High<TvlHigh width='50' color={theme.chart.var2_fill}/></TrilBox> : null}
                                {item.tvl === "2" ? <TrilBox><StatTitle  color={theme.colors.text_primary}>Liquidity (TVL)</StatTitle>Medium<TvlMedium width='80' color={theme.colors.text_primary}/></TrilBox> : null}
                                {item.tvl === "1" ? <TrilBox><StatTitle  color={theme.chart.var3_stroke}>Liquidity (TVL)</StatTitle>Low<TvlLow width='100'  color={theme.chart.var3_stroke}/></TrilBox> : null}
                            </FlexColumn>
                        </Flex>
                        </div>
                    ))} </> }
            </StatBox>
    </Kontejner>;
  }
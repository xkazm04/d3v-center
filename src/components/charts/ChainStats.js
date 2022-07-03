

import styled, {useTheme} from 'styled-components'
import { chainData } from '../../data/chainData'

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
const AttributeBox = styled.div`
    padding-top: 5%;
`
const AttrSection = styled.div`
    text-align:left;
    justify-content: flex-start;
    padding-bottom: 3%;
    font-size: 1.3em;
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
                        <AttributeBox>
                            <AttrSection> <StatTitle color={theme.colors.text_primary}>Short story</StatTitle> <StatItem> {item.attribute}</StatItem>  </AttrSection>
                            <AttrSection>  <StatTitle color={theme.chart.var2_fill}>Attractive</StatTitle> <StatItem>  {item.reasonPlus}</StatItem> </AttrSection>
                            <AttrSection>  <StatTitle color={theme.chart.var3_fill}>Be aware</StatTitle> <StatItem>    {item.reasonMinus}</StatItem> </AttrSection>
                        </AttributeBox>         
                        </div>
                    ))} </> }
            </StatBox>
    </Kontejner>;
  }
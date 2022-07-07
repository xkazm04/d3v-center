import {useState} from 'react'
import styled, {useTheme} from "styled-components"
import InputNumber from 'rc-input-number';
import "./input.css"
import { Legend, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';
import {ArrowUp, ArrowDown} from '../icons/arrows';
import { Tooltip as TT, Whisper } from 'rsuite';
import GovernResources from './GovernResources';
import GovernCode from './GovernCode';



const TokenForm = styled.div`
    padding-right: 2%;
    min-width: 200px;
`

const TokenInput = styled(InputNumber)`
    font-size: 0.8em;
    background: ${props => props.theme.colors.lighter};
    color: ${props => props.theme.colors.text_title};
    width: ${props => props.width};
    min-width: ${props => props.width};
    display: flex;
    flex-direction: row;
`

const Label = styled.div`
    margin-right: 1%;
    margin-left: 2%;
    font-size: 0.9em;
    font-family: 'Inder';
    font-weight: bold;
    width: 35%;
    min-width: 35%;
    color: ${props => props.color};
    &:hover{
        cursor: help;
    }
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
`

const FlexColumn = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
    padding-top: 2%;
`

const ArticleButton = styled.button`
  border: 1px solid ${props => props.theme.colors.text_primary};
  border-radius: 15px;
  font-weight: 700;
  margin: 5px;
  color: ${props => props.theme.colors.text_primary};
  transition: 0.1s;
  height: 30px;
  font-family: 'Spectral', serif;
  background: ${props => props.theme.colors.background};
  &:hover{
    background: ${props => props.theme.colors.green};
  }
`

const ArticleActButton = styled(ArticleButton)`
  background: ${props => props.theme.colors.step};
  &:hover{
    background:  ${props => props.theme.colors.step};
  }
`

const AbsoluteDescription = styled.div`
  font-style: italic;
  font-family: 'Inder';
  font-size: 1.1em;
  margin-left: 15px;
  color: ${props => props.theme.colors.text_title};
`

const SubNavigation = styled.div`
  padding-top: 1%;
`

const Pr = styled.div`
    font-size: 0.6em;
`

const Number = styled.div`
    padding-left: 5%;
    padding-right: 2%;

`
const Neg = styled(Number)`
    color: red;
`

const UpDown = styled.div`
    background: ${props => props.theme.colors.medium};
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
    padding-right: 0%;
    &:active{
        background: ${props => props.theme.colors.blackwhite};
    }
`



const GovernSection = () => {
    const theme = useTheme()
    const [component, setComponent] = useState('Resources')
    var [totalSupply, setTotalSupply] = useState(10000)

    const [teamMultiplier, setTeamMultiplier] = useState(0.10)
    const teamNumber = teamMultiplier * 100
    const teamSupply = totalSupply * teamMultiplier
    var [teamVest, setTeamVest] = useState(3)
    var [teamOneMult, setTeamOneMult] = useState(1/3)
    var [teamTwoMult, setTeamTwoMult] = useState(2/3)
    var [teamThreeMult, setTeamThreeMult] = useState(3/3)
    var [teamFourMult, setTeamFourMult] = useState(3/3)
    var [teamFiveMult, setTeamFiveMult] = useState(3/3)

    const calcMult = (vest,setOne,setTwo,setThree,setFour,setFive) => {
        if(vest === 3){
            setOne(1/3)
            setTwo(2/3)
            setThree(3/3)
            setFour(3/3)
            setFive(3/3)
        } else if (vest === 4){
            setOne(1/4)
            setTwo(2/4)
            setThree(3/4)
            setFour(4/4)
            setFive(4/4)
        } else if (vest === 5){
            setOne(1/5)
            setTwo(2/5)
            setThree(3/5)
            setFour(4/5)
            setFive(5/5)
        } else if (vest === 2){
            setOne(1/2)
            setTwo(2/2)
            setThree(2/2)
            setFour(2/2)
            setFive(2/2)
        } else if (vest === 1){
            setOne(1)
            setTwo(1)
            setThree(1)
            setFour(1)
            setFive(1)
        } 
    }

    const [commMultiplier, setCommMultiplier] = useState(0.35)
    const commNumber = commMultiplier * 100
    const commSupply = totalSupply * commMultiplier

    const [treaMultiplier, setTreaMultiplier] = useState(0.10)
    const treaNumber = treaMultiplier * 100
    const treaSupply = totalSupply * treaMultiplier

    const [advMultiplier, setAdvMultiplier] = useState(0.05)
    const advNumber = advMultiplier * 100
    const advSupply = totalSupply * advMultiplier
    var [advVest, setAdvVest] = useState(3)
    var [advOneMult, setAdvOneMult] = useState(1/3)
    var [advTwoMult, setAdvTwoMult] = useState(2/3)
    var [advThreeMult, setAdvThreeMult] = useState(3/3)
    var [advFourMult, setAdvFourMult] = useState(3/3)
    var [advFiveMult, setAdvFiveMult] = useState(3/3)

    const [privMultiplier, setPrivMultiplier] = useState(0.05)
    const privNumber = privMultiplier * 100
    const privSupply = totalSupply * privMultiplier
    var [privVest, setPrivVest] = useState(3)
    var [privOneMult, setPrivOneMult] = useState(1/3)
    var [privTwoMult, setPrivTwoMult] = useState(2/3)
    var [privThreeMult, setPrivThreeMult] = useState(3/3)
    var [privFourMult, setPrivFourMult] = useState(3/3)
    var [privFiveMult, setPrivFiveMult] = useState(3/3)

    const [pubMultiplier, setPubMultiplier] = useState(0.05)
    const pubNumber = pubMultiplier * 100
    const pubSupply = totalSupply * pubMultiplier
    var [pubVest, setPubVest] = useState(3)
    var [pubOneMult, setPubOneMult] = useState(1/3)
    var [pubTwoMult, setPubTwoMult] = useState(2/3)
    var [pubThreeMult, setPubThreeMult] = useState(3/3)
    var [pubFourMult, setPubFourMult] = useState(3/3)
    var [pubFiveMult, setPubFiveMult] = useState(3/3)

    const [liqMultiplier, setLiqMultiplier] = useState(0.10)
    const liqNumber = liqMultiplier * 100
    const liqSupply = totalSupply * liqMultiplier

    const [bouMultiplier, setBouMultiplier] = useState(0.15)
    const bouNumber = bouMultiplier * 100
    const bouSupply = totalSupply * bouMultiplier

    const [airMultiplier, setAirMultiplier] = useState(0.05)
    const airNumber = airMultiplier * 100
    const airSupply = totalSupply * airMultiplier


    const otherNumber = 100 - teamNumber - commNumber - privNumber - treaNumber - advNumber - pubNumber - liqNumber - bouNumber - airNumber
    

    const vestingSchedule = [
        {
          name: '1m',
          Community: commSupply,
          Team: 1,
          Treasury: treaSupply,
          Liquidity: liqSupply,
          Bounties: bouSupply,
          Airdrop: airSupply,
          PrivateSale: 1,
          PublicSale: 1,
          Advisory: 1
        },
        {
          name: '12m',
          Community: commSupply,
          Team: teamSupply * (teamOneMult),
          Treasury: treaSupply,
          Liquidity: liqSupply,
          Bounties: bouSupply,
          Airdrop: airSupply,
          // Vesting Multipliers
          PrivateSale: privSupply * (privOneMult),
          PublicSale: pubSupply * (pubOneMult),
          Advisory: advSupply * (advOneMult) 
        },
        {
          name: '24m',
          Community: commSupply,
          Team: teamSupply * (teamTwoMult),
          Treasury: treaSupply,
          Liquidity: liqSupply,
          Bounties: bouSupply,
          Airdrop: airSupply,
          PrivateSale: privSupply  * (privTwoMult),
          PublicSale: pubSupply * (pubTwoMult),
          Advisory: advSupply * (advTwoMult)
        },
        {
            name: '36m',
            Community: commSupply,
            Team: teamSupply * (teamThreeMult),
            Treasury: treaSupply,
            Liquidity: liqSupply,
            Bounties: bouSupply,
            Airdrop: airSupply,
            PrivateSale: privSupply * (privThreeMult),
            PublicSale: pubSupply * (pubThreeMult),
            Advisory: advSupply * (advThreeMult)
        },
        {
            name: '48m',
            Community: commSupply,
            Team: teamSupply * (teamFourMult),
            Treasury: treaSupply,
            Liquidity: liqSupply,
            Bounties: bouSupply,
            Airdrop: airSupply,
            PrivateSale: privSupply  * (privFourMult),
            PublicSale: pubSupply * (pubFourMult),
            Advisory: advSupply * (advFourMult)
        },
        {
            name: '60m',
            Community: commSupply,
            Team: teamSupply * (teamFiveMult),
            Treasury: treaSupply,
            Liquidity: liqSupply,
            Bounties: bouSupply,
            Airdrop: airSupply,
            PrivateSale: privSupply  * (privFiveMult),
            PublicSale: pubSupply * (pubFiveMult),
            Advisory: advSupply * (advFiveMult)
        },
      ];


    const changeTotal = (e) => {
        setTotalSupply(e);
    }
    const changeTeam = (e) => { setTeamMultiplier(e / 100)}
    const changeTeamVest = (v) => {
       setTeamVest(v)
       calcMult(teamVest,setTeamOneMult,setTeamTwoMult,setTeamThreeMult,setTeamFourMult,setTeamFiveMult)
    }



    const changeComm = (e) => {
        setCommMultiplier(e / 100);
    }

    const changeTrea = (e) => {
        setTreaMultiplier(e / 100);
    }

    const changeAdv = (e) => {setAdvMultiplier(e / 100)}
    const changeAdvVest = (v) => {
        setAdvVest(v)
        calcMult(advVest,setAdvOneMult,setAdvTwoMult,setAdvThreeMult,setAdvFourMult,setAdvFiveMult)
    }

    const changePriv = (e) => {setPrivMultiplier(e / 100)}
    const changePrivVest = (v) => {
        setPrivVest(v)
        calcMult(privVest,setPrivOneMult,setPrivTwoMult,setPrivThreeMult,setPrivFourMult,setPrivFiveMult)
    }

    const changePub = (e) => { setPubMultiplier(e / 100)}
    const changePubVest = (v) => {
        setPubVest(v)
        calcMult(pubVest,setPubOneMult,setPubTwoMult,setPubThreeMult,setPubFourMult,setPubFiveMult)
    }
 
    const changeLiq = (e) => {
        setLiqMultiplier(e / 100);
    }

    const changeBou = (e) => {
        setBouMultiplier(e / 100);
    }

    const changeAir = (e) => {
        setAirMultiplier(e / 100);
    }


    const upHandler = <UpDown><ArrowUp width='20' height='10' color={theme.colors.text_title}/></UpDown>;
    const downHandler = <UpDown><ArrowDown width='20' height='10' color={theme.colors.text_secondary}/></UpDown>;

    const FormRow = ({value, change, label, vestValue, vestChange, color, speaker}) => {
        return (
            <>
                 <FlexColumn>
                    <TokenInput defaultValue={value} min={1} max={100} onChange={change} width={'50px'} upHandler={upHandler} downHandler={downHandler}/><Pr>%</Pr>
                    <Whisper trigger="hover" placement="auto" speaker={<TT>{speaker}</TT>}><Label color={color}>{label}</Label></Whisper>
                    {vestValue >= 0 && <><TokenInput defaultValue={vestValue} min={1} max={5} onChange={vestChange} width={'50px'} upHandler={upHandler} downHandler={downHandler}/><Pr>vesting(y)</Pr></>}
                 </FlexColumn>
            </>
        )
    }

    return (
        <>
        <SubNavigation>
                  {component === 'Resources' ? <ArticleActButton>Resources</ArticleActButton> : <ArticleButton onClick={()=>setComponent('Resources')}>Resources</ArticleButton>}
                  {component === 'Chart' ? <ArticleActButton>Tokenomics</ArticleActButton> : <ArticleButton onClick={()=>setComponent('Chart')}>Chart</ArticleButton>}
                  {component === 'Chart' &&  <AbsoluteDescription>Visualize tokenomics - TBD</AbsoluteDescription> }
                  {component === 'Resources' &&  <AbsoluteDescription>Resources related with tokenomics and governance</AbsoluteDescription> }
        </SubNavigation>
      <FlexColumn> 
       {component !== 'Resources' && <TokenForm>
          <FlexColumn>To spend: {otherNumber >= 0 ? <Number>{otherNumber}</Number> : <Neg>{otherNumber}</Neg>}%</FlexColumn> 
                <Flex>
                    <Label>Token supply</Label><TokenInput defaultValue={10000} min={1} max={100000000000000} onChange={changeTotal} width={'150px'} /> 
                    <FormRow value={teamNumber} change={changeTeam} vestValue={teamVest} vestChange={changeTeamVest} label={'Team'} color={theme.chart.varYellow_stroke} speaker={'Founding contributing team to sustain long-term commitment'} />
                    <FormRow value={commNumber} change={changeComm} label={'Community'} color={theme.chart.varOrange_stroke} speaker={'Allocation for incentivizing the community and staking'}/>
                    <FormRow value={treaNumber} change={changeTrea} label={'Treasury'} color={theme.chart.varBlue_stroke} speaker={'Reserve capital to cover opportunities, fuckups or distribute rewards to DAO'}/>
                    <FormRow value={advNumber} change={changeAdv} label={'Advisory'}  vestValue={advVest} vestChange={changeAdvVest} color={theme.chart.varOrange_stroke} speaker={"Allocation for business partners and garants"}/>
                    <FormRow value={privNumber} change={changePriv} vestValue={privVest} vestChange={changePrivVest} label={'Private'} color={theme.chart.var2_stroke} speaker={'Allocation for private seed of token sale'}/>
                    <FormRow value={pubNumber} change={changePub} vestValue={pubVest} vestChange={changePubVest} label={'Public'} color={theme.chart.var3_stroke} speaker={'Allocation for public seed of token sale'}/>
                    <FormRow value={liqNumber} change={changeLiq} label={'Marketing'}  color={theme.chart.varPurple_stroke} speaker={'Marketing and liquidity provision to ensure the continuous growth'}/>
                    <FormRow value={bouNumber} change={changeBou} label={'Bounties'} color={theme.chart.varRed_fill} speaker={'Incentivization of bug bounties and grants for ecosystem developers.'}/>
                    <FormRow value={airNumber} change={changeAir} label={'Airdrop'} color={theme.chart.var1_stroke} speaker={'Reward for early supporters'}/>
                </Flex>
        </TokenForm>}
        {component === 'Resources' && <GovernResources/>}
        {component === 'Code' && <GovernCode/>}

       {component === 'Chart' && 
       <ResponsiveContainer width="70%" height={600}>
                <AreaChart
                        data={vestingSchedule}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis padding={{ left: 0 }} width={150}/>
                    <Tooltip />
                    <Legend iconSize={12} iconType={'diamond'} margin={{ left: 50, top: 20 }} width={'100%'}/>
                        <Area type="monotone" dataKey="Community" stackId="1"  stroke={theme.chart.varOrange_stroke} fill={theme.chart.varOrange_fill}  />
                        <Area type="monotone" dataKey="Team" stackId="1"  stroke={theme.chart.varYellow_stroke} fill={theme.chart.varYellow_fill} />
                        <Area type="monotone" dataKey="Treasury" stackId="1"  stroke={theme.chart.varBlue_stroke} fill={theme.chart.varBlue_fill} />
                        <Area type="monotone" dataKey="Marketing" stackId="1" stroke={theme.chart.varPurple_stroke} fill={theme.chart.varPurple_fill} />
                        <Area type="monotone" dataKey="Grants" stackId="1" stroke={theme.chart.varRed_stroke} fill={theme.chart.varRed_fill}/>
                        <Area type="monotone" dataKey="Airdrop" stackId="1"  stroke={theme.chart.var1_stroke} fill={theme.chart.var1_fill} />
                        <Area type="monotone" dataKey="PrivateSale" stackId="1"  stroke={theme.chart.var2_stroke} fill={theme.chart.var2_fill} />
                        <Area type="monotone" dataKey="PublicSale" stackId="1"  stroke={theme.chart.var3_stroke} fill={theme.chart.var3_fill} />
                    </AreaChart>
        </ResponsiveContainer>}
        </FlexColumn>
        </>
    )
}

export default GovernSection
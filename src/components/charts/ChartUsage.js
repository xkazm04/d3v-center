import {RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis, Tooltip, Legend } from 'recharts'
import styled, { useTheme } from 'styled-components'



const Kontejner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2%;
`

const Title = styled.h3`
  font-family: 'NoBill';
  letter-spacing: 0.1rem;
  color: ${props => props.theme.chart.title};
`


export default function ChartUsage() {
    const theme = useTheme()




    const data = [
      {
        "cat": "NFT",
        "Tutorials": 86,
        "Definitions": 19,
        "Repositories": 7,
        "fullMark": 150
      },
      {
        "cat": "Security",
        "Tutorials": 68,
        "Definitions": 43,
        "Repositories": 0,
        "fullMark": 150
      },
      {
        "cat": "General",
        "Tutorials": 79,
        "Definitions": 133,
        "Repositories": 3,
        "fullMark": 150
      },
    
      {
        "cat": "Defi",
        "Tutorials": 37,
        "Definitions": 53,
        "Repositories": 36,
        "fullMark": 150
      },
    ]
    



    return <Kontejner> 
   <Title>Resources by main areas </Title> 
    <RadarChart outerRadius={160} width={650} height={450} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="cat"   stroke={theme.chart.torso}/>
      <PolarRadiusAxis angle={145} domain={[0, 100]}  stroke={theme.chart.radius} />
      <Radar name={`Tutorials`} dataKey="Tutorials" stroke={theme.chart.var1_stroke} fill={theme.chart.var1_fill} fillOpacity={0.6}  />
      <Radar name={`Definitions `} dataKey="Definitions" stroke={theme.chart.var2_stroke} fill={theme.chart.var2_fill} fillOpacity={0.6} />
      <Radar name={`Repositories `} dataKey="Repositories" stroke={theme.chart.var3_stroke} fill={theme.chart.var3_fill} fillOpacity={0.6} />
      <Legend />
      <Tooltip/>
    </RadarChart>
    </Kontejner>;
  }
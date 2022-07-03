
import {BarChart, CartesianGrid, XAxis, Bar, Tooltip } from 'recharts'
import styled, { useTheme } from 'styled-components'


const Kontejner = styled.div`
  display: flex;
  flex-direction: column;
`


const data = [
  {
    "cat": "NFT",
    "Solidity": 61,
    "Other": 29,
  },
  {
    "cat": "Security",
    "Solidity": 40,
    "Other": 29,
  },
  {
    "cat": "Defi",
    "Solidity": 26,
    "Other": 12,
  },
  {
    "cat": "Monitor",
    "Solidity": 9,
    "Other": 21,
  },
  {
    "cat": "MEV",
    "Solidity": 12,
    "Other": 9,
  },
  {
    "cat": "Oracle",
    "Solidity": 12,
    "Other": 10,
  },  
]

  
export default function ChartStatsTut() {
    const theme = useTheme()


    return <Kontejner> 
            <BarChart width={430} height={150} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cat"  />
                <Tooltip />
                <Bar dataKey="Solidity"  fill={theme.chart.var1_fill} />
                <Bar dataKey="Other"  fill={theme.chart.var2_fill} />
        </BarChart>
    </Kontejner>;
  }
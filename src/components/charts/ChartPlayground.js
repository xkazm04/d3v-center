
import { Tooltip, Legend, BarChart, CartesianGrid, YAxis, XAxis, Bar } from 'recharts'
import styled, { useTheme } from 'styled-components'


const Kontejner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2%;
  @media (max-width: 700px) {
  margin: 0;
}
  
`

const data = [
    {
      "diff": "Novice",
      "Solidity": 120,
      "Rust": 29,
      "JavaScript": 24
    },
    {
      "diff": "Intermediate",
      "Solidity": 113,
      "Rust": 32,
      "JavaScript": 15
    },
    {
      "diff": "Advanced",
      "Solidity": 12,
      "Rust": 7,
      "JavaScript": 0
    },
  ]
  
export default function ChartPlayground() {
    const theme = useTheme()


    return <Kontejner> 
      <BarChart width={530} height={350} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="diff" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Solidity" fill={theme.chart.var1_stroke} />
            <Bar dataKey="Rust" fill={theme.chart.var2_stroke}  />
            <Bar dataKey="JavaScript" fill={theme.chart.var3_stroke}  />
          </BarChart>
    </Kontejner>;
  }
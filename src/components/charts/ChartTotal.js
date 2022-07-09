
import { useContext } from 'react'
import { Legend, BarChart, CartesianGrid, YAxis, XAxis, Bar } from 'recharts'
import styled, { useTheme } from 'styled-components'
import { TotalsContext } from '../../contexts/TotalsContext'


const Kontejner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2%;
  margin-left: 5%;
  @media (max-width: 700px) {
  margin: 0;
}
  
`
const ChartBox = styled.div`
  margin-left: 5%;
  margin-top: 10%;
`



  
export default function CharTotal() {
    const theme = useTheme()
    
    const {totalTut} = useContext(TotalsContext)
    const {totalDef} = useContext(TotalsContext)
    const {totalRep} = useContext(TotalsContext)
    const {totalTool} = useContext(TotalsContext)



    const data = [
        {
          "diff": "All resources behind D3V Library",
          "Tutorials": totalTut,
          "Definitions": totalDef,
          "Repositories": totalRep,
          "Tools": totalTool,
        },
      ]


    return <Kontejner> {totalTut === 0 ? null :
   <ChartBox>
      <BarChart width={530} height={350} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="diff" />
            <YAxis />
            <Legend />
            <Bar dataKey="Tutorials" fill={theme.chart.var1_stroke} />
            <Bar dataKey="Definitions" fill={theme.chart.var2_stroke}  />
            <Bar dataKey="Tools" fill={theme.chart.var1_fill}  />
            <Bar dataKey="Repositories" fill={theme.chart.var3_stroke}  />       
        </BarChart>
    </ChartBox>}
    </Kontejner>
  }



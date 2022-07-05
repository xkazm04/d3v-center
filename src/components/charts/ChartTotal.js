import axios from 'axios'
import { useEffect, useContext } from 'react'
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
    
    const token = process.env.REACT_APP_CMS_API
    const {totalTut, setTotalTut} = useContext(TotalsContext)
    const {totalDef, setTotalDef} = useContext(TotalsContext)
    const {totalRep, setTotalRep} = useContext(TotalsContext)
    const {totalTool, setTotalTool} = useContext(TotalsContext)

    const getTutorials = async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials`, {headers: {
                Authorization: `Bearer ${token}`
                    }},)
            const data = response.data.meta.pagination.total
                setTotalTut(data)
                console.log(data)
            } catch(error){
                console.log(error)
            }
        }
    
    const getDefinitions = async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/definitions`, {headers: {
                Authorization: `Bearer ${token}`
                    }},)
            const data = response.data.meta.pagination.total
                setTotalDef(data)
                console.log(data)
            } catch(error){
                console.log(error)
            }
        }
    
    const getTools = async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tools`, {headers: {
                Authorization: `Bearer ${token}`
                    }},)
            const data = response.data.meta.pagination.total
                setTotalTool(data)
                console.log(data)
            } catch(error){
                console.log(error)
            }
        }

        const getRepos = async() => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/repos`, {headers: {
                    Authorization: `Bearer ${token}`
                        }},)
                const data = response.data.meta.pagination.total
                    setTotalRep(data)
                    console.log(data)
                } catch(error){
                    console.log(error)
                }
            }

    useEffect(() => {
        getTutorials()
        getDefinitions()
        getTools()
        getRepos()
    })


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



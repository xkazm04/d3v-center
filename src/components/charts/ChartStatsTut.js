
import {BarChart, CartesianGrid, XAxis, Bar, Tooltip } from 'recharts'
import styled, { useTheme } from 'styled-components'
import {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import { TotalsContext } from '../../contexts/TotalsContext'

const Kontejner = styled.div`
  display: flex;
  flex-direction: column;
`

export default function ChartStatsTut() {
    const theme = useTheme()
    const token = process.env.REACT_APP_CMS_API
    const {totalTut} = useContext(TotalsContext)
    const [tutDefiSol, setTutDefiSol] = useState(0)
    const [tutSecSol, setTutSecSol] = useState(0)
    const [tutNftSol, setTutNftSol] = useState(0)
    const [tutDataSol, setTutDataSol] = useState(0)
    const [tutMevSol, setTutMevSol] = useState(0)


    const getNftTutorials = async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials?filters[Category][$contains]=NFT&filters[Language][$contains]=Solidity`, {headers: {
                Authorization: `Bearer ${token}`,
                
                    }},)
            const data = response.data.meta.pagination.total
            setTutNftSol(data)
            } catch(error){
                console.log(error)
            }
        }
    
        const getSecTutorials = async() => {
          try{
              const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials?filters[Category][$contains]=Security`, {headers: {
                  Authorization: `Bearer ${token}`,
                  
                      }},)
              const data = response.data.meta.pagination.total
                   setTutSecSol(data)
              } catch(error){
                  console.log(error)
              }
          }

          const getDefiTutorials = async() => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials?filters[Category][$contains]=Defi&filters[Language][$contains]=Solidity`, {headers: {
                    Authorization: `Bearer ${token}`,
                    
                        }},)
                const data = response.data.meta.pagination.total
                     setTutDefiSol(data)
                } catch(error){
                    console.log(error)
                }
            }

            const getDataTutorials = async() => {
              try{
                  const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials?filters[Category][$contains]=Data&filters[Language][$contains]=Solidity`, {headers: {
                      Authorization: `Bearer ${token}`,
                      
                          }},)
                  const data = response.data.meta.pagination.total
                       setTutDataSol(data)
                  } catch(error){
                      console.log(error)
                  }
              }
          
              const getMevTutorials = async() => {
                try{
                    const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/tutorials?filters[Category][$contains]=MEV`, {headers: {
                        Authorization: `Bearer ${token}`,
                        
                            }},)
                    const data = response.data.meta.pagination.total
                         setTutMevSol(data)
                    } catch(error){
                        console.log(error)
                    }
                }
  

    useEffect(() => {
        getDefiTutorials()
        getSecTutorials()
        getNftTutorials()
        getDataTutorials()
        getMevTutorials()
        // eslint-disable-next-line 
    },[])


    const data = [
      {
        "cat": "NFT",
        "Solidity": tutNftSol || 70,
        "Other": 29,
      },
      {
        "cat": "Security",
        "Solidity": tutSecSol|| 40,
        "Other": 29,
      },
      {
        "cat": "Defi",
        "Solidity": tutDefiSol || 30,
        "Other": 12,
      },
      {
        "cat": "Data",
        "Solidity": tutDataSol || 9,
        "Other": 21,
      },
      {
        "cat": "MEV",
        "Solidity": tutMevSol || 12,
        "Other": "",
      } 
    ]

    return <Kontejner> {totalTut === 0 ? null :<>Total:{totalTut}</>}
        <BarChart width={430} height={150} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cat"  />
                <Tooltip />
                  <Bar dataKey="Solidity"  fill={theme.chart.var1_fill} />
                  <Bar dataKey="Other"  fill={theme.chart.var2_fill} />
                  <Bar dataKey="OtherTwo"  fill={theme.chart.var3_fill} />
        </BarChart>
    </Kontejner>;
  }
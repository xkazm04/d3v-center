
import { Tooltip, Legend, BarChart, CartesianGrid, YAxis, XAxis, Bar } from 'recharts'
import styled, { useTheme } from 'styled-components'


const Kontejner = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1%;
  padding-bottom: 0;
  background: white;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1px dashed ${props => props.theme.colors.text_title};  
  margin-right: 1%;
`

const Title = styled.div`
  padding-top: 1%;
  font-family: "NoBill";
  color: ${props => props.theme.colors.text_primary};
  font-size: 1.5em;
`

const dataTutTwo = [
  {
    "name": "NFT",
    "Total (550)": 113,
    "Solidity (297)": 67,
    "Rust (70)": 8
  },
  {
    "name": "Defi",
    "Total (550)": 44,
    "Solidity (297)": 32,
    "Rust (70)": 4
  },
  {
    "name": "Data",
    "Total (550)": 50,
    "Solidity (297)": 11,
    "Rust (70)": 3
  },
  {
    "name": "Starters",
    "Total (550)": 56,
    "Solidity (297)": 27,
    "Rust (70)": 16
  },
  {
    "name": "Security",
    "Total (550)": 59,
    "Solidity (297)": 38,
    "Rust (70)": 9
  },
  {
    "name": "Frontend",
    "Total (550)": 22,
  },
  
]

const dataDefTwo = [
  {
    "name": "Architecture",
    "Total (470)": 85,
    "EVM (215)": 34,
    "General (157)": 14,
  },
  {
    "name": "Defi",
    "Total (470)": 67,
    "EVM (215)": 32,
    "General (157)": 34,
  },
  {
    "name": "Language",
    "Total (470)": 70,
    "EVM (215)": 51
  },
  {
    "name": "Crosschain",
    "Total (470)": 35,
    "General (157)": 18,
  },
  {
    "name": "Tokens",
    "Total (470)": 49,
    "EVM (215)": 18,
    "General (157)": 23,
  },
  {
    "name": "MEV",
    "Total (470)": 22,
    "EVM (215)": 20,
    "General (157)": 1,
  },
]


  const dataTools = [
    {
      "name": "NFT",
      "value": 21,
    },
    {
      "name": "Develop",
      "value": 55,
    },
    {
      "name": "Monitor",
      "value": 22,
    },
    {
      "name": "DAO",
      "value": 11,
    },
    {
      "name": "Security",
      "value": 17,
    },
    {
      "name": "Frontend",
      "value": 9,
    }

  ]
  

const dataReposTwo = [
  {
    "name": "NFT",
    "value": 27,
  },
  {
    "name": "Defi",
    "value": 49,
  },
  {
    "name": "Tokenomics",
    "value": 20,
  },
  {
    "name": "DAO",
    "value": 5,
  },
  {
    "name": "Education",
    "value": 6,
  },
  {
    "name": "MEV",
    "value": 8,
  }

]


// Stacked bar

export default function ChartPlayground() {
    const theme = useTheme()


    return <><Kontejner> 

    <Box>
      <Title>Tutorials</Title>
      <BarChart width={530} height={300} data={dataTutTwo }
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
      
      >
               <XAxis dataKey={"name"}/>
            <YAxis />
         
            <Tooltip />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend iconType={'line'} />
            <Bar dataKey="Total (550)" stackId="1" fill={theme.chart.var1_stroke} />
            <Bar dataKey="Solidity (297)" stackId="2" fill={theme.chart.var1_fill} />
            <Bar dataKey="Rust (70)" stackId="2" fill={theme.chart.var3_fill} />
          </BarChart>
          </Box>
          <Box>
      <Title>Definitions</Title>
          <BarChart width={530} height={300} data={dataDefTwo}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
      >
               <XAxis dataKey={"name"}/>
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend iconType={'line'} />
            <Bar dataKey="Total (470)" stackId="1" fill={theme.chart.var1_stroke} />
            <Bar dataKey="EVM (215)" stackId="2" fill={theme.chart.var1_fill} />
            <Bar dataKey="General (157)" stackId="2" fill={theme.chart.var2_stroke} />
          </BarChart>
          </Box>
    </Kontejner>
    <Kontejner> 

    </Kontejner>

    <Kontejner> 
    <Box>
      <Title>Tools</Title>
      <BarChart width={530} height={300} data={dataTools}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
      
      >
               <XAxis dataKey={"name"}/>
            <YAxis />
         
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend iconType={'line'} />
            <Bar dataKey="value" fill={theme.chart.var1_stroke} />
          </BarChart>
          </Box>
          <Box>
      <Title>Repositories</Title>
          <BarChart width={530} height={300} data={dataReposTwo}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
      >
               <XAxis dataKey={"name"}/>
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend iconType={'line'} />
            <Bar dataKey="value" fill={theme.chart.var1_stroke} />
          </BarChart>
          </Box>
    </Kontejner>
    <Kontejner> 

    </Kontejner>
    
    
    </>;
  }
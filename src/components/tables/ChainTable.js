import {  Table } from 'rsuite'
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { chainData } from '../../data/chainData';
import ChainModal from './ChainModal';
import axios from 'axios'
import { ChainApiContext } from '../../contexts/ChainApiContext';

const Kontejner = styled.div`
    padding-top: 4%;
    border-left: 0.1px solid ${props => props.theme.colors.light};  
    padding-left: 4%;
    padding-right: 4%;
    min-width: 100%;
    padding-bottom: 10%;
    z-index: 20;
    @media (max-width: 768px) {
    padding: 0;
  }
`

const Background = styled.div`
  background:  ${props => props.theme.colors.light};
  padding: 0.5%;
  border-radius: 5px;
`

const CompactCell = styled(Table.Cell)`
  color: ${props => props.theme.colors.text_primary};
  border-bottom: ${props => props.theme.colors.light};
  text-align: left;
  font-family: ${props => props.fontFancy ? 'NoBill' : 'Helvetica'};
  font-size: ${props => props.fontFancy ? '15px' : '14px'};
  letter-spacing: ${props => props.fontFancy ? '0.2px' : '0px'};
  font-weight: ${props => props.fontBold ? 700 : 400};
  overflow: visible;
  line-height: 1;
  font-size: 0.9em;
`

const CompactBlockCell = styled(CompactCell)`
`

const HeaderCell = styled(Table.HeaderCell)`
    color: ${props => props.theme.colors.text_title};
    text-align: left;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 1px;
    font-family: 'NoBill';
`




function ChainTable() {

      const {chainArray, setChainArray} = useContext(ChainApiContext)

      useEffect(() => {
        getMeData();
      // eslint-disable-next-line
      }, []); 

      const getMeData = async() => {
         try { const res = await axios.get(`https://api.llama.fi/chains`)

          setChainArray(res.data)
          console.log(chainArray)
        } catch (error) {
          console.log(error)
        }
      }


        //Table states
        const [loading] = useState(false);
        const [compact] = useState(true);
        const [noData] = useState(false);
    
        const CustomHeaderCell = compact ? HeaderCell : Table.HeaderCell;

        const ConfigCell = ({ rowData, dataKey, ...props }) => (
          <CompactCell {...props} >
            <a href={rowData[dataKey]}>{rowData[dataKey]}</a>
          </CompactCell>
        );
        
        // Ikonky pro každý chain
        // Checkmark
        const ChainCell = ({ rowData, dataKey, ...props }) => (
          <CompactCell {...props} >
            <>{rowData[dataKey]}</>
          </CompactCell>
        );

        const ActionCell = ({ rowData, dataKey, ...props }) => (
          <CompactBlockCell {...props} >
            <><ChainModal 
                chain={rowData[dataKey]} 
                test={rowData.id} 
                config={rowData.config} 
                dex={rowData.swap} 
                perk={rowData.attribute} 
                pros={rowData.reasonPlus}
                cons={rowData.reasonMinus}
                apiId={rowData.apiId}
              />  
              </>
          </CompactBlockCell>
        );

// Překopat UI dneska - Nechat v tabulce EVM, ECO, Lang, Doc reference
// Přidat ikonku ke každému chainu -> Tzn. mannual tabulka - Grid 
// Nová UI componenta
// Doplnit gecko id do listu 
// Rozšířit chainy 
    return (

            <Kontejner>       
                    <Background>
                      <Table
                        virtualized
                        loading={loading}
                        hover={false}
                        showHeader={true}
                        autoHeight={true}
                        data={noData ? [] : chainData}
                        bordered={true}
                        cellBordered={true}
                        headerHeight={compact ? 33 : 40}
                        rowHeight={compact ? 33 : 46}
                        rowKey={row => row.id}
                      >
                  {chainArray !== [] ? <Table.Column flexGrow={1}>
                      <CustomHeaderCell>Detail</CustomHeaderCell>
                      <ActionCell dataKey="chain" />
                    </Table.Column> : null}     
                  <Table.Column flexGrow={1}>
                      <CustomHeaderCell>Name</CustomHeaderCell>
                      <ChainCell dataKey="chain"/>
                    </Table.Column>
                    <Table.Column flexGrow={1}>
                      <CustomHeaderCell>EVM</CustomHeaderCell>
                      <CompactCell dataKey="evm" />
                    </Table.Column>
                    <Table.Column flexGrow={5}>
                      <CustomHeaderCell>Config</CustomHeaderCell>
                      <ConfigCell dataKey="config" />
                    </Table.Column>
                      </Table>
                    </Background>
            </Kontejner>
    );
}

export default ChainTable;






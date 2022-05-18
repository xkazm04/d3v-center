import {  Table } from 'rsuite'
import styled from 'styled-components';
import { useState } from 'react';
import { chainData } from '../../data/chainData';


const Kontejner = styled.div`
    padding-top: 4%;
    border-left: 0.1px solid ${props => props.theme.colors.light};  
    padding-left: 4%;
    padding-right: 4%;
    min-width: 100%;
    padding-bottom: 10%;
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
  background: ${props => props.theme.colors.blackwhite};
  border-bottom: ${props => props.theme.colors.light};
  text-align: left;
  font-family: ${props => props.fontFancy ? 'NoBill' : 'Helvetica'};
  font-size: ${props => props.fontFancy ? '15px' : '14px'};
  letter-spacing: ${props => props.fontFancy ? '0.2px' : '0px'};
  font-weight: ${props => props.fontBold ? 700 : 400};
  
  overflow: visible;
  line-height: 1;
`


const HeaderCell = styled(Table.HeaderCell)`
    background: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.text_title};
    text-align: left;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 1px;
    font-family: 'NoBill';
    line-height: 1;
`




function ChainTable() {

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
        
        const ChainCell = ({ rowData, dataKey, ...props }) => (
          <CompactCell {...props} >
            <>{rowData[dataKey]}</>
          </CompactCell>
        );

// Překopat UI dneska - Nechat v tabulce EVM, ECO, Lang, Doc reference
// Přidat ikonku ke každému chainu -> Tzn. mannual tabulka - Grid 
// Nová UI componenta
    return (

            <Kontejner>
               5/2022 to develop - Modal with data, Pros/Cons               
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
                  <Table.Column flexGrow={1}>
                      <CustomHeaderCell>Blockchain</CustomHeaderCell>
                      <ChainCell dataKey="chain"/>
                    </Table.Column>
                    <Table.Column flexGrow={1}>
                      <CustomHeaderCell>EVM</CustomHeaderCell>
                      <CompactCell dataKey="evm" />
                    </Table.Column>
                    <Table.Column flexGrow={1}>
                      <CustomHeaderCell>Ecosystem</CustomHeaderCell>
                      <CompactCell dataKey="eco" />
                    </Table.Column>
                    <Table.Column flexGrow={1}>
                      <CustomHeaderCell>Language</CustomHeaderCell>
                      <CompactCell dataKey="language" />
                    </Table.Column>
                    <Table.Column flexGrow={2}>
                      <CustomHeaderCell>Main DEX + TVL</CustomHeaderCell>
                      <CompactCell dataKey="swap" />
                    </Table.Column>
                    <Table.Column flexGrow={1}>
                      <CustomHeaderCell>Config</CustomHeaderCell>
                      <ConfigCell dataKey="config" />
                    </Table.Column>
                    <Table.Column flexGrow={1}>
                      <CustomHeaderCell>Review</CustomHeaderCell>
                      <ConfigCell dataKey="config" />
                    </Table.Column>
                      </Table>
                    </Background>
            </Kontejner>
    );
}

export default ChainTable;






import {  Table, Popover, Whisper } from 'rsuite'
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { FilterContext } from '../../contexts/FilterContext';



const InfoIcon = <svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 10V17" stroke="#8247E5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.5625 4.00001H11.4375C11.3077 3.99955 11.179 4.02471 11.0589 4.07404C10.9388 4.12338 10.8296 4.19591 10.7375 4.28751L4.28751 10.7375C4.19591 10.8296 4.12338 10.9388 4.07404 11.0589C4.02471 11.179 3.99955 11.3077 4.00001 11.4375V20.5625C3.99955 20.6924 4.02471 20.821 4.07404 20.9411C4.12338 21.0613 4.19591 21.1705 4.28751 21.2625L10.7375 27.7125C10.8296 27.8041 10.9388 27.8766 11.0589 27.926C11.179 27.9753 11.3077 28.0005 11.4375 28H20.5625C20.6924 28.0005 20.821 27.9753 20.9411 27.926C21.0613 27.8766 21.1705 27.8041 21.2625 27.7125L27.7125 21.2625C27.8041 21.1705 27.8766 21.0613 27.926 20.9411C27.9753 20.821 28.0005 20.6924 28 20.5625V11.4375C28.0005 11.3077 27.9753 11.179 27.926 11.0589C27.8766 10.9388 27.8041 10.8296 27.7125 10.7375L21.2625 4.28751C21.1705 4.19591 21.0613 4.12338 20.9411 4.07404C20.821 4.02471 20.6924 3.99955 20.5625 4.00001V4.00001Z" stroke="#8247E5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 22.5C16.5523 22.5 17 22.0523 17 21.5C17 20.9477 16.5523 20.5 16 20.5C15.4477 20.5 15 20.9477 15 21.5C15 22.0523 15.4477 22.5 16 22.5Z" fill="#8247E5"/>
</svg>



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

const PopKontejner = styled.div`
  padding: 5%;
  white-space: nowrap;
  min-width: 300px;
`

const PopTitle = styled.p`
  font-family: 'NoBill';
  font-size: 18px;
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`

const Background = styled.div`
  background:  ${props => props.theme.colors.light};
  padding: 2%;
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
  cursor: pointer;
  transition: 0.1s;
  &:hover{
    background:  ${props => props.theme.colors.red};
  }
`

const SpecialColumn = styled(Table.Column)`
    @media (max-width: 500px) {
    display: none;
  }
`

const HeaderCell = styled(Table.HeaderCell)`
    background: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.heavy};
    text-align: left;
`



const defaultColumns = [
      {
        key: 'attributes.Chain',
        label: 'Ecosystem',
        fixed: true,
        flexGrow: 1,
        celltext: false,
        fontFancy: true
      },
  {
    key: 'attributes.Title',
    label: 'Title',
    fixed: true,
    flexGrow: 5,
    celltext: false,
    fontBold: true,
    fontFancy: false
  },
  {
    key: 'attributes.Description',
    label: 'Description',
    fixed: true,
    flexGrow: 6,
    celltext: false,
    fontFancy: false
  },
  {
    key: 'attributes.Chain',
    label: 'Difficulty',
    fixed: true,
    flexGrow: 1,
    celltext: false,
    fontFancy: true
  },
  {
    key: 'attributes.Update',
    label: 'Data',
    fixed: true,
    flexGrow: 1,
    celltext: false,
    fontFancy: true
  },
  {
    key: 'attributes.Source',
    label: 'Source',
    fixed: true,
    flexGrow: 1,
    celltext: false,
    fontFancy: true
  }
];

function TutorialTable() {

    //API data
    const {filterChain, filterSource, filterStage, filterUsage} = useContext(FilterContext);
    const [error, setError] = useState(null)
    const [response, setResponse] = useState()
    // Filter based on context 
    const getData = async () => {
      try {const res = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/bits${filterChain}&${filterSource}&${filterUsage}&pagination[pageSize]=100&sort=Update:ASC`)
      setResponse(res.data.data)
        setError(null)
        console.log(res.data.data)
    } catch (error) {
        setError(error)
    }
  }


  useEffect(
    () => {
        getData()
    },[filterChain, filterSource, filterStage, filterUsage] 
)


        //Table states
        const [loading] = useState(false);
        const [compact] = useState(true);
        const [noData] = useState(false);
    
        const [columnKeys] = useState(defaultColumns.map(column => column.key));
        const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));
        const CustomHeaderCell = compact ? HeaderCell : Table.HeaderCell;
    
     // Action panel TBD in next phases
    
        // const renderMenu = ({ onClose, left, top, className }, ref) => {
        //     const handleSelect = eventKey => {
        //       onClose();
        //       console.log(eventKey);
        //     };
        //     return (
        //       <Popover ref={ref} className={className} style={{ left, top }} full>
        //         <Dropdown.Menu onSelect={handleSelect}>
        //           <Dropdown.Item eventKey={3}>Option1</Dropdown.Item>
        //           <Dropdown.Item eventKey={4}>
        //             <Flex> <button>Action</button>
        //           <input type="text" placeholder='required auth?'></input></Flex>
        //         </Dropdown.Item>
        //         </Dropdown.Menu>
        //       </Popover>
        //     );
        //   };

         
    
          // const ActionCell = ({ rowData, dataKey, ...props }) => {
          //   return (
          //     <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
          //     <CompactCell {...props}>
          //       {SecondCross}   
          //     </CompactCell>
          //     </Whisper>
          //   );
          // };

          // Tech, tools, series
          const whisperInfo = (Title, Description) => {
            return (
              <Popover full>
                <PopKontejner>
                <Flex><PopTitle>Series:</PopTitle>  {Title}</Flex> 
                <Flex>    <PopTitle>Tech:</PopTitle> {Description}</Flex>
                
                
                  </PopKontejner>
              </Popover>
            );
          };

          // Serie
          const InfoCell = ({ rowData, dataKey, ...props }) => {
            return (
              <Whisper placement="autoVerticalStart" trigger="hover" speaker={whisperInfo(rowData.attributes.Title,rowData.attributes.Title )}>
              <CompactCell {...props}>
                {InfoIcon}
              </CompactCell>
              </Whisper>
            );
          };
          
// Most of columns in the middle
    const TextColumns = columns.map(column => {
        const { key, label, celltext, fontBold, ...rest } = column;
        return (
          <Table.Column {...rest} key={key} celltext={celltext}>
            <CustomHeaderCell>{label}</CustomHeaderCell>
            <CompactCell dataKey={key}  fontBold={fontBold}/> 
          </Table.Column>
        );
      })

    return (

            <Kontejner>
                               
      <Background>
      {/* <TagPicker
        data={defaultColumns}
        labelKey="label"
        valueKey="key"
        value={columnKeys}
        onChange={setColumnKeys}
        cleanable={false}
      /> */}
           <div>
        <Table
           onRowClick={data => {window.open(data.attributes.Reference)}}
          virtualized
          loading={loading}
          hover={false}
          showHeader={true}
          autoHeight={true}
          data={noData ? [] : response}
          bordered={true}
          cellBordered={true}
          headerHeight={compact ? 33 : 40}
          rowHeight={compact ? 33 : 46}
          rowKey={row => row.id}
        >

      <SpecialColumn flexGrow={1}>
            <CustomHeaderCell>Series</CustomHeaderCell>
            <InfoCell />
      </SpecialColumn>

        {TextColumns}
        {/* <SpecialColumn flexGrow={1}>
            <CustomHeaderCell>Action panel</CustomHeaderCell>
            <ActionCell dataKey="id" />
      </SpecialColumn> */}
    

        </Table>
      </div>
      </Background>
            </Kontejner>
    );
}

export default TutorialTable;






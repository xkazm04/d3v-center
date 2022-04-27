import {  Table, TagPicker, Popover, Whisper, Dropdown, IconButton, Divider } from 'rsuite'
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { FilterContext } from '../../contexts/FilterContext';


const Cross = <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.64787 2.18945C7.43881 6.16653 10.9207 9.67938 14.211 12.9697C15.5795 14.3382 16.3354 16.1021 17.9493 17.447" stroke="black" stroke-width="3" stroke-linecap="round"/>
<path d="M2.30055 18.6206C2.48066 15.0784 4.89811 12.9188 7.29947 10.4919C9.26244 8.50804 11.2471 6.01595 13.9502 5.01482C15.5759 4.4127 17.0278 2.58057 18.7318 2.58057" stroke="black" stroke-width="3" stroke-linecap="round"/>
</svg>

const Kontejner = styled.div`
    padding-top: 2%;
    border-left: 0.1px solid black;
    padding-left: 5%;
    min-height: 4000px;
    min-width: 100%;
    @media (max-width: 768px) {
    padding: 0;
  }
`

const ImageCell = styled(Table.Cell)`
        background: '#f5f5f5';
        border-radius: 20;
        margin-top: 2;
        overflow: hidden;
`

const CompactCell = styled(Table.Cell)`
  color: black;
  text-align: left;
  font-family: 'Inter';
  font-weight: 700;
  cursor: pointer;
  &:hover {
      color: red;
  }
`

const HeaderCell = styled(Table.HeaderCell)`
    padding: 4;
    background: '#F1F1F1'; 
    color: '#000000';
    text-align: left;
`

const defaultColumns = [
    {
        key: 'id',
        label: 'ID',
        fixed: true,
        flexGrow: 1,
        celltext: false,
      },
    {
        key: 'attributes.Source',
        label: 'Source',
        fixed: true,
        flexGrow: 1,
        celltext: 'true'
      },
  {
    key: 'attributes.Title',
    label: 'Title',
    fixed: true,
    flexGrow: 3,
    celltext: false,
  },
  {
    key: 'attributes.Description',
    label: 'Description',
    fixed: true,
    flexGrow: 4,
    celltext: false,
  },
  {
    key: 'attributes.Chain',
    label: 'Difficulty',
    fixed: true,
    flexGrow: 1,
    celltext: false
  },
  {
    key: 'attributes.Update',
    label: 'Data',
    fixed: true,
    flexGrow: 1,
    celltext: false
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
        const [loading, setLoading] = useState(false);
        const [compact, setCompact] = useState(true);
        const [noData, setNoData] = useState(false);
    
        const [columnKeys, setColumnKeys] = useState(defaultColumns.map(column => column.key));
        const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));
        const CustomHeaderCell = compact ? HeaderCell : Table.HeaderCell;
    
    
    
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
              onClose();
              console.log(eventKey);
            };
            return (
              <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu onSelect={handleSelect}>
                  <Dropdown.Item eventKey={3}>Option1</Dropdown.Item>
                  <button>button</button>
                  <label>First Name</label>
                <input class="w3-input" type="text"></input>
                  <Dropdown.Item eventKey={4}>Option2</Dropdown.Item>
                </Dropdown.Menu>
              </Popover>
            );
          };
    
          const ActionCell = ({ rowData, dataKey, ...props }) => {
            function handleAction() {
              alert(`id:${rowData[dataKey]}`);
            }
            return (
              <CompactCell {...props}>
                <IconButton appearance="subtle" onClick={handleAction}  icon={Cross}/>
                <Divider vertical />
                <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
                  <IconButton appearance="subtle" icon={Cross} />
                </Whisper>
              </CompactCell>
            );
          };
          


    const TextColumns = columns.map(column => {
        const { key, label, celltext, ...rest } = column;
        return (
          <Table.Column {...rest} key={key} celltext={celltext}>
            <CustomHeaderCell>{label}</CustomHeaderCell>
           {celltext == false ? <CompactCell dataKey={key} /> : <ImageCell dataKey={key}><img src={key} width="40" /></ImageCell>}
          </Table.Column>
        );
      })

    return (

            <Kontejner>
                                 Columns：
      <TagPicker
        data={defaultColumns}
        labelKey="label"
        valueKey="key"
        value={columnKeys}
        onChange={setColumnKeys}
        cleanable={false}
      />
           <div>
        <Table
         //  onRowClick={data => {window.open(data.attributes.Reference)}}
          virtualized
          loading={loading}
          height={300}
          hover={true}
          fillHeight={true}
          showHeader={true}
          autoHeight={true}
          data={noData ? [] : response}
          bordered={false}
          cellBordered={false}
          headerHeight={compact ? 30 : 40}
          rowHeight={compact ? 30 : 46}
          rowKey={row => row.id}
        >

        {TextColumns}
        {/* Mapovat i kdyby tam byl pouze jeden */}
        <Table.Column flexGrow={2}>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <ActionCell dataKey="id" />
      </Table.Column>
    

        </Table>
      </div>
            </Kontejner>
    );
}

export default TutorialTable;







import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import {
  useQuery,
} from 'react-query';

// https://nafeu.medium.com/using-react-query-with-react-table-884158535424

const fetchData = () => axios.get(`https://d3v-center.herokuapp.com/api/bits`);

const TableQuery = () => {
  const [tableData, setTableData] = useState(null);
  const { data: apiResponse, isLoading } = useQuery('id', fetchData);

  useEffect(() => {
    setTableData(apiResponse?.data.attributes);
  }, [apiResponse])

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }

  return (
    <TableInstance tableData={tableData}/>
  );
}

const TableInstance = ({ tableData }) => {
  const [columns, data] = useMemo(
    () => {
      const columns = [
        {
          Header: 'Title',
          accessor: 'Title'
        },
        {
          Header: 'Description',
          accessor: 'Description'
        }
      ];
      return [columns, tableData];
    },
    [tableData]
  );

  const tableInstance = useTable({ columns, data });

  return (
    <TableLayout {...tableInstance} />
  );
}

const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}) => {
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

const TanTable = () => {
  return (
    <>
      <TableQuery />
    </>
  );
}

export default TanTable;
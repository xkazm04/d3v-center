
import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import {
  useQuery,
} from 'react-query';

// https://nafeu.medium.com/using-react-query-with-react-table-884158535424
// https://medium.com/swlh/getting-started-with-usequery-react-query-9ea181c3dd47
// https://www.youtube.com/watch?v=WRKEjPq75BY

const TanTable = () => {

  const [error, setError] = useState(null)
  const [response, setResponse] = useState()

  const fetchData = async () => {
    try {const res = await axios.get(`https://localhost:1337/api/bits`)
    setResponse(res.data.data)
      setError(null)
  } catch (error) {
      setError(error)
  }
}

  const [tableData, setTableData] = useState(null);
  const { data: apiResponse, isLoading,status } = useQuery('bit', fetchData);

  useEffect(() => {
    setTableData(apiResponse?.data);
    console.log(tableData)
  }, [apiResponse])



  return (
    <>
        <div className="App">
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div>
          {tableData.map((bit) => (
            <p key={bit.id}>{bit.id}</p>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default TanTable;
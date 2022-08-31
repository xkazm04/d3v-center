// Input parameters -> Output - return some data to states 
// Test any query

import axios from 'axios'
import {useEffect, useState} from 'react'
import { fetchNewsPath } from '../data/graphQueries';

const token = process.env.REACT_APP_CMS_API

function useGql (main, cat, subcat)  {
    const [responseData, setResponseData] = useState([])
    const [err, setErr] = useState(false)

    //Gql part
    const headers = {
        "authorization": `Bearer ${token}`,
        "content-Type": "application/json"
        }
        const gqlEndpoint = `${process.env.REACT_APP_ENVIRONMENT}/graphql`
    
    
        // Params 
        const gUniQuery = {
            // variables: {
            //     "cat": main,
            //     "subcat": cat,
            //     "feature": subcat
            // },
            operationName: "FetchNews", 
            query: fetchNewsPath 
        }
    
    
        const fetchArticles = async() => {
            try {
                const response = await axios( {
                    url: gqlEndpoint,
                    method: 'post',
                    headers: headers,
                    data: gUniQuery
                })
                setResponseData(response.data.data)
    
            } catch (err) {
                console.log(err);
                setErr(true)
            }
        } 

        useEffect(()=> {
            fetchArticles()
             // eslint-disable-next-line 
        },[])


        if (err){
            return 'Technical or implementation error'
        }
        return [responseData]
}

export default useGql;

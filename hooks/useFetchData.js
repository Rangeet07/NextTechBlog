import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useFetchData(apiEndPoint) {
    const [alldata, setAlldata] = useState([])
    const [loading, setLoading] = useState(true)
    const [initialLoad, setInitialLoad] = useState(true)
    
    useEffect(() => {
        if(initialLoad) {
            // set initialload to false to prevent api call on subsequent renders
            setInitialLoad(false);
            setLoading(false); // set loading to false to show components initially
            return; // exit useeffect
        }

        setLoading(true);

        const fetchAllData = async () => {
            try{
                const res = await axios.get(apiEndPoint)
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false); // set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching blog data', error);
                setLoading(false); // set loading false even if there's an error
            }
        };

        // fetch blog data only if apiendpoint is exists
        if(apiEndPoint){
            fetchAllData();
        }

    }, [initialLoad, apiEndPoint]); // depend on initialload and apiendpoint to trigger api call

  return {alldata , loading}
} 

export default useFetchData;
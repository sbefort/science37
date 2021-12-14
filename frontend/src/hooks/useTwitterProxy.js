import { useState, useEffect } from 'react';
import axios from 'axios';

const useTwitterProxy = (searchQuery) => {
  const [data, setData] = useState({});

  useEffect(() => {
    // If the search term is blank or invalid, skip the API request and return an empty object
    if (!searchQuery || searchQuery.indexOf('?q=&') === 0 || searchQuery.indexOf('?q=%23&') === 0) {
      setData({});
      return;
    }

    // When NOT loading next page of results for the same search term, reset the data object
    if (!searchQuery.indexOf('?max_id=') === 0) {
      setData({});
    }

    (async () => {
      const response = await axios.get(`/api/v1/proxy${searchQuery}`);
      if (response.data) {
        const { search_metadata, statuses } = response.data;
        setData((currentState) => ({
          search_metadata,
          statuses: currentState.statuses ? currentState.statuses.concat(statuses) : statuses
        }));
      }
    })();
  }, [searchQuery]);

  return data;
}

export default useTwitterProxy;

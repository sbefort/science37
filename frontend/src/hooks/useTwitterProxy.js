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

    // If max_id is present in query string, this is a pagination call with the same search term,
    // so concatenate new results with previous results.
    let shouldConcat = true;
    if (searchQuery.indexOf('?max_id=') === -1) {
      shouldConcat = false;
    }

    (async () => {
      const response = await axios.get(`/api/v1/proxy${searchQuery}`);
      if (response.data) {
        const { search_metadata, statuses } = response.data;
        setData((currentState) => ({
          search_metadata,
          statuses: currentState.statuses && shouldConcat ? currentState.statuses.concat(statuses) : statuses
        }));
      }
    })();
  }, [searchQuery]);

  return data;
}

export default useTwitterProxy;

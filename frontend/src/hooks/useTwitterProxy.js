import { useState, useEffect } from 'react';
import twitterApi from '../services/twitterProxy';

const useTwitterProxy = ((searchTerm) => {
  const [data, setData] = useState({});

  useEffect(() => {
    // If the search term is empty, skip the API request and return an empty object
    if (!searchTerm) {
      setData({});
      return;
    }

    (async () => {
      const response = await twitterApi.search(searchTerm);
      if (response.data) {
        setData(response.data);
      }
    })();
  }, [searchTerm]);

  return [data, setData];
});

export default useTwitterProxy;

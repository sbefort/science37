import { useState, useEffect } from 'react';
import axios from 'axios';

const useTwitterProxy = (searchQuery) => {
  const [data, setData] = useState({});

  useEffect(() => {
    // If the search term is blank, skip the API request and return an empty object
    if (!searchQuery || searchQuery.indexOf('q=&') === 0) {
      setData({});
      return;
    }

    (async () => {
      const response = await axios.get(`/api/v1/proxy?${searchQuery}`);
      if (response) {
        setData(response.data);
      }
    })();
  }, [searchQuery]);

  return data;
}

export default useTwitterProxy;

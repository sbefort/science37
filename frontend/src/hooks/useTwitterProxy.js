import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const debounced = debounce(axios.get, 250);

const useTwitterProxy = (searchTerm) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!searchTerm) return [];
    (async () => {
      const response = await debounced(`/api/v1/proxy?q=${encodeURIComponent(searchTerm)}`);
      if (response) {
        setData(response.data);
      }
    })();
  }, [searchTerm]);

  return data;
}

export default useTwitterProxy;

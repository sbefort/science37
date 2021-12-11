import { useState, useEffect } from 'react';
import axios from 'axios';

const useTwitterProxy = (searchTerm) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/v1/proxy?q=${searchTerm}`);
      console.log('responsoe', response);
      setData(response.data);
    })();
  }, [searchTerm]);

  return data;
}

export default useTwitterProxy;

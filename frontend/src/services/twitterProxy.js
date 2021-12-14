import axios from 'axios';

const twitterApi = {
  search: async (searchTerm) => {
    return await axios.get(`/api/v1/proxy?q=${encodeURIComponent(searchTerm)}`);
  },
  getNextResults: async (nextResult) => {
    return await axios.get(`/api/v1/proxy?next=${encodeURIComponent(nextResult)}`);
  }
}
  
export default twitterApi;

import axios from 'axios';

const twitterApi = {
  search: async (searchTerm) => axios.get(`/api/v1/proxy?q=${encodeURIComponent(searchTerm)}`),
  getNextResults: async (nextResult) => axios.get(`/api/v1/proxy?next=${encodeURIComponent(nextResult)}`),
};

export default twitterApi;

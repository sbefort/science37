const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/status', (req, res) => {
  res.json({ status: 'OK', version: 'v1' });
});

app.get('/api/v1/proxy', (req, res) => {
  const query = [];
  for (const q in req.query) {
    if (req.query.hasOwnProperty(q)) {
      query.push(`${q}=${encodeURIComponent(req.query[q])}`);
    }
  }

  const headers = {
    Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG',
  };

  axios.get(`https://api.twitter.com/1.1/search/tweets.json?${query.join('&')}`, {
    headers,
  }).then((response) => {
    // If next_results exists in the response, query that endpoint to make sure it actually has more data.
    const nextResults = response.data && response.data.search_metadata && response.data.search_metadata.next_results;
    if (nextResults) {
      return Promise.all([
        Promise.resolve(response),
        axios.get(`https://api.twitter.com/1.1/search/tweets.json${nextResults}`, {
          headers,
        })
      ])
    // Else next_results does not exist in the response and this is actually the last result set
    } else {
      return [
        response,
        undefined,
      ]
    }
  }).then(([currentResults, nextResults]) => {
    const hasMoreResults = nextResults && nextResults.data && nextResults.data.statuses && nextResults.data.statuses.length > 0;
    if (hasMoreResults) {
      currentResults.data.search_metadata.has_more_results = true;
    } else {
      currentResults.data.search_metadata.has_more_results = false;
    }
    res.json(currentResults.data);
  }).catch((err) => {
    res.json(err)
  });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

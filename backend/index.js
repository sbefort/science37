const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const get = require('lodash/get');
const TOKEN = 'Bearer AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/status', (req, res) => {
  res.json({ status: 'OK', version: 'v1' });
});

app.get('/api/v1/proxy', (req, res) => {
  let qs;
  // If the req.query.q key is set, get results for a new search term.
  if (req.query.q) {
    qs = `?q=${encodeURIComponent(req.query.q)}&result_type=popular&count=5`;
  }

  // If the req.query.next key is set, get the next results for a previous search term.
  if (req.query.next) {
    qs = req.query.next;
  }

  // If neither req.query.q or req.query.next is set, return an error
  if (!qs) {
    res.status(500).json('You must send one of the following query string params: q or next');
  }

  const headers = {
    Authorization: TOKEN,
  };

  axios.get(`https://api.twitter.com/1.1/search/tweets.json${qs}`, {
    headers,
  }).then((response) => {
    // If next_results exists in the response, query that endpoint to make sure it actually has more data.
    const nextResults = get(response, 'data.search_metadata.next_results');
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
    const hasMoreResults = get(nextResults, 'data.statuses', []).length > 0;
    // Set a flag for whether or not more results are available for the same search term.
    if (hasMoreResults) {
      currentResults.data.search_metadata.has_more_results = true;
    } else {
      currentResults.data.search_metadata.has_more_results = false;
    }
    res.json(currentResults.data);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

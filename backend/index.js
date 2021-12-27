const express = require('express');
const axios = require('axios');
const TOKEN = 'Bearer AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG';

const app = express();
app.use(express.json());

const headers = {
  Authorization: TOKEN,
};

app.get('/api/v1/status', (req, res) => {
  res.json({ status: 'OK', version: 'v1' });
});

app.get('/api/v1/proxy', async (req, res) => {
  let qs;

  try {
    // If the req.query.q key is set, get results for a new search term.
    if (req.query.q) {
      qs = `?q=${encodeURIComponent(req.query.q)}&result_type=popular&count=5`;
    }

    // If the req.query.next key is set, get the next results for the current search term.
    if (req.query.next) {
      qs = req.query.next;
    }

    // If neither req.query.q or req.query.next is set, return an error
    if (!qs) {
      res.status(500).json('You must send one of the following query string params: q or next');
    }

    const response = await axios.get(`https://api.twitter.com/1.1/search/tweets.json${qs}`, {
      headers,
    });

    const data = massageTwitterResponse(response);

    // If next_results exists in the response, query that endpoint to make sure it actually has more data.
    data.nextResults = await nextResults(response.data.search_metadata.next_results);

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

const massageTwitterResponse = (response) => {
  const data = {};
  data.tweets = response.data.statuses.map((status) => {
    const { id_str: id, text, user } = status;
    const hashtags = status.entities.hashtags.map((hashtag) => hashtag.text);

    return ({
      id,
      text,
      hashtags,
      user: {
        username: user.screen_name,
        avatarUrl: user.profile_image_url_https,
      }
    });
  });

  return data;
};

// Takes a search_metadata.next_results pagination query string like
// ?max_id=1474698938800386049&q=cats&count=5&include_entities=1&result_type=popular
// to make sure that the query actually returns more results.
// If the query string fetches more results, return the query string to be used on the frontend.
// If the query string does not fetch more results, return undefined so it is not used on the frontend.
const nextResults = async (nextResults) => {
  if (!nextResults) return false;
  const response = await axios.get(`https://api.twitter.com/1.1/search/tweets.json${nextResults}`, {
    headers,
  });

  if (Array.isArray(response.data.statuses) && response.data.statuses.length > 0) {
    return nextResults;
  }

  return undefined;
};
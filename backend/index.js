const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/status', (req, res) => {
  res.json({ status: 'OK', version: 'v1' });
});

app.get('/api/v1/proxy', (req, res) => {
  const q = req.query.q;
  axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${q}`, {
    headers: {
      Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG',
    }
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json(err)
    });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

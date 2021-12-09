const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/status', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ status: 'OK', version: 'v1' }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

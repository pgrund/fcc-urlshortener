var express = require('express');

var app = express();
const PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.listen(PORT, function () {
  console.log('urlshortener app listening on port '+PORT+'!')
});
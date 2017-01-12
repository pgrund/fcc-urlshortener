var express = require('express');
var db = require('./db');
var ObjectId = require('mongodb').ObjectId;

var mongoUrl = 'mongodb://localhost:27017/urlshortener';

var app = express();

const PORT = process.env.PORT || 8080;
const url = require('url');
const SHORT_URL = 'https://fcc-pgrund.c9users.io/'


app.get(/\/new\/(.*)/, function(req, res) {
  
  
  var urlObject = url.parse(req.params[0]);

  if(urlObject.host == null || urlObject.protocol == null){
    res.json({error: 'invalid URL'});
    return;
  }
  
  var coll = db.get().collection('urls');
  var objToBeInserted = { original_url: url.format(urlObject) };
  coll.insert(objToBeInserted, function(err, data) {
      if(err) throw err;
      res.json({
        original_url: objToBeInserted.original_url,
        short_url: (SHORT_URL + objToBeInserted._id)
      });

  });
});
  

app.get('/:short([0-9a-z]+)', function(req, res) {
  var collection = db.get().collection('urls')
  console.log(collection);
  collection.find({_id: ObjectId(req.params.short) }).toArray(function(err, docs) {
    if(err) throw err
    res.redirect(docs[0].original_url);
  })
});

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/urlshortener', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(PORT, function () {
      console.log('urlshortener app listening on port '+PORT+'!')
    });
  }
})
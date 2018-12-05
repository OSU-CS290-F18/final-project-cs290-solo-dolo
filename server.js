var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var notePostData = require('./notePostData');

//MONGO data
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

var mongoURL = 'mongodb://' + MONGO_USER + ':' + MONGO_PASSWORD + '@' + MONGO_HOST + ':' + MONGO_PORT + '/' + MONGO_DB_NAME;

console.log(mongoURL);

var mongoDBDatabase;
//MONGO data

var app = express();

var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {
  res.status(200).render('body', notePostData["dannondarko"]);
});

app.use(bodyParser.json());
app.use(express.static('public'));

//app.get('/:username', function (req, res, next) {
//  var username = req.params.username.toLowerCase();
//  if (notePostData[username]) {
//    res.render('body', notePostData[username]);
//  } else {
//    next();
//  }
//});

app.get('/:username', function (req, res, next) {
  var username = req.params.username.toLowerCase();
  var usernameCollection = mongoDBDatabase.collection('usernames');
  usernameCollection.find({ personId: username }).toArray(function (err, usernameDocs) {
    if (err) {
      res.status(500).send("Error communicating with the DB.");
    } else if (usernameDocs.length > 0) {
      res.status(200).render('body', usernameDocs[0]);
    } else {
      next();
    }
  });
});

app.post('/:username/addPost', function (req, res, next) {
  var username = req.params.username.toLowerCase();

  if (req.body && req.body.noteText && req.body.date) {
  var usernameCollection = mongoDBDatabase.collection('usernames');
  usernameCollection.updateOne(
    { personId: username },
    { $push: { posts: { noteText: req.body.noteText, date: req.body.date } } },
    function (err, result) {
      if (err) {
        res.status(500).send("Error saving post to DB");
      } else if (result.matchedCount > 0) {
        res.status(200).send("Success");
      } else {
        next();
      }
    }
  );
  } else {
    res.status(400).send("Request needs a body with a note text and date");
  }
});

app.get('*', function (req, res) {
  res.status(404).render('404', {});
});

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  db = mongoDBDatabase = client.db(MONGO_DB_NAME);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});

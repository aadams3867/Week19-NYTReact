/* ================================================== */
/*                      NYT React
 * ================================================== */

/* Dependencies
 * ================================================== */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var mongoose = require('mongoose');
// Deprecated Promise library fix
var Promise = require('bluebird');
mongoose.Promise=Promise;

// Use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Make public a static dir
app.use(express.static('public'));


// Database configuration with Mongoose
mongoose.connect('mongodb://localhost/nytreact');
var db = mongoose.connection;

// Show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});


// And we bring in our Article model
var Article = require('./models/Article.js');

/* Routes
 * ================================================== */

// Simple Index Route
app.get('/', function(req, res) {
  res.send(index.html);
});


// This will query MongoDB for all saved articles
app.get('/api/saved', function(req, res){
  Article.find({}, function(err, doc) {
    // Log any errors
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });

});


// This will save an article in MongoDB
app.post('/api/saved', function(req, res){

  var saveArticle = new Article(req.title, req.date, req.url);

  saveArticle.save(function(err, doc) {
    // Log any errors
    if (err) {
      console.log(err);
    } else {
      console.log("New Article document successfully saved!");
      console.log("Article Title: " + doc.title + "   Date Published: " + doc.date + "   URL: " + doc.url);
      res.send(doc);
    }
  });

});


// This will delete a saved article in MongoDB
app.delete('/api/saved', function(req, res){
  // Remove the one saved article using the article's _id
  Article.remove({'_id': req.params.id})
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log("One Article document successfully deleted!");
        console.log("Article ID: " + req.params.id);
        res.send(doc);
      }
    })
});


/*// Delete all notes associated with a particular article from the DB
app.get('/deleteall/:id', function(req, res) {
  // Remove all the notes using the article's id
  Note.remove({'articleId': req.params.id})
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log("All the Note documents successfully deleted!");
        console.log("Article ID: " + req.params.id);
        res.send(doc);
      }
    })
});*/


/* Listener
 * ================================================== */
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('App running on PORT ' + PORT);
});
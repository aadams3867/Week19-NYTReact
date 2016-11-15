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

// Require Article Schema
var Article = require('./models/Article.js');

// Use Morgan and Body-parser for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Make public a static dir
app.use(express.static('public'));


/* Mongoose
 * ================================================== */
// MongoDB Configuration configuration (Change this URL to your own DB)
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


/* Routes
 * ================================================== */

// Simple Index Route
app.get('/', function(req, res) {
  res.send(index.html);
});


// This route sends GET requests to retrieve the articles saved in the MongoDB.
// We will call this route the moment our page gets rendered
app.get('/api/saved', function(req, res){
  
  // We will find all the saved articles, sort them in descending order, and then limit the articles to 5
  Article.find({}).sort([['date', 'descending']]).limit(5)
    .exec( function(err, doc) {
    // Log any errors
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });

});


// This route sends POST requests to save an article in MongoDB
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


// This route sends DELETE requests to delete a saved article in MongoDB
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
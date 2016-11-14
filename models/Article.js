// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // Title of the stored article from the NYT
  title: {
    type:String,
    required:true,
    unique: true
  },
  // Date and Time the article was originally published
  date: {
    type: Date,
    required: true
  },
  // URL of the article on nytimes.com
  url: {
    type:String,
    required:true
  }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model('Article', ArticleSchema);

// export the model
module.exports = Article;

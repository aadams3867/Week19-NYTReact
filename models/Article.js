var mongoose = require('mongoose');
// Create Schema class
var Schema = mongoose.Schema;

// Create Article schema
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

// Export the model
module.exports = Article;
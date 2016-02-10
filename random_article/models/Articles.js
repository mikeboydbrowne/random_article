var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: String,
  text: String
});

//ArticleSchema.methods.upvote = function(cb) {
//  this.upvotes += 1;
//  this.save(cb);
//};

mongoose.model('Article', ArticleSchema);

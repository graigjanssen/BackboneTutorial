var mongoose = require('mongoose');

var BlogSchema = mongoose.Schema({
  author: {type: String},
  title: {type: String},
  url: {type: String}
});

module.exports = mongoose.model('Blog', BlogSchema);

module.exports = function db() {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/blog');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Mongo work!!!');
  });
  var Schema = mongoose.Schema;
  var Post = new Schema({
    title: {
      type: String,
      unique: true
    },
    date: String,
    tags: [String],
    preText: String,
    preImgUrl: String,
    autor: String,
    text: String
  });
  this.Blog = mongoose.model('Blog', Post);

}

function db() {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/blog');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Mongo work!!!');
  });
  var post = mongoose.model('Post', {
    head: String,
    date: {
      type: Date,
      default: Date.now
    },
    tags: [String],
    preText: String,
    preImgUrl: String,
    autor: String,
    text: String
  });
}

module.exports = db;

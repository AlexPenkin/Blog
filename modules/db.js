module.exports = function db() {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/blog');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Mongo connected and work.');
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
    headImg: String,
    autor: String,
    text: String,
    likes: {
      type: Number,
      default: 0
    },

  });
  this.Blog = mongoose.model('Blog', Post);
  this.User = mongoose.model('User', {
    username: {
      type: String,
      unique: true
    },
    usernameLow: {
      type: String,
      unique: true
    },
    password: String,
    email: String,
    gender: String,
    date: {
      type: Date,
      default: Date.now
    },
    avatar: String,
    numOfPosts: Number,
    posts:{
      type: Array,
      default: []
    },
    role: {
      type: Array,
      default: "user"
    }
  });

}

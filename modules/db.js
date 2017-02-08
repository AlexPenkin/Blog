module.exports = function db() {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://<heroku_w6v45mg6>:<kjvc32>@ds147079.mlab.com:47079/heroku_w6v45mg6');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {

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
        numOfLikes: {
          type: Number,
          default: 0
        },
        users: [String]
      },
      viewsNum: {
        type: Number,
        default: 0
      }

    });

    var User = new Schema({
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
      posts: {
        type: Array,
        default: []
      },
      role: {
        type: String,
        default: "user"
      }
    });

    var PortItem = new Schema({
      title: {
        type: String,
        unique: true
      },
      defenition: String,
      date: Date,
      technologies: [String],
      mainPic: String,
      manyPic: [String],
      prevPic: String
    });

    this.Blog = mongoose.model('Blog', Post);
    this.User = mongoose.model('User', User);
    this.Port = mongoose.model('Port', PortItem);
  };

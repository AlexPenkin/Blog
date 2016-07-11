'use strict'
//modules
const express = require('express');
const path = require('path');
const db = require('./modules/db');
const session = require('express-session');
const bodyParser = require('body-parser');
const crypt = require('./modules/crypt.js')
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

// database
//db();
var mongo = new db();

function getAllPosts(model) {
  model.find({}).sort({
    _id: -1
  }).exec(function(err, postsdb) {
    posts = [];
    postsdb.forEach(function(post) {
      posts.push(post);
    });
  })
}

//
const app = express();
const publicFold = path.join(__dirname + '/public');
const views = path.join(__dirname + '/views');
//Template engine initialization
app.set('view engine', 'jade');
app.set('views', views);
//
var d = new Date();
app.listen('8888', () => console.log(`App worked on port 8888 ${d.toLocaleString()}`));
app.use(express.static(publicFold));
//session
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 60000
  }
}))
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));

var posts = getAllPosts(mongo.Blog);
//

app.route('/')
  .get(function(req, res, next) {
    getAllPosts(mongo.Blog)
    let session = req.session;
    var testObj = {
      sesId: session.id,
      posts: posts,
    }
    res.render('index.jade', testObj);
  })

app.route('/makePost')
  .get(function(req, res, next) {
    res.render('makePost.jade', {});
  })
  .post(function(req, res, next) {
    let arrOfTags = req.body.tags.split(/,\s*/);
    var blogPost = new mongo.Blog({
      title: req.body.title,
      date: req.body.date,
      tags: arrOfTags,
      preText: req.body.preText,
      headImg: req.body.headImg,
      autor: req.body.autor,
      text: req.body.text
    });
    blogPost.save(function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('saved');
        getAllPosts(mongo.Blog);

      };
    })
    getAllPosts(mongo.Blog);

  })
var obj = {};
//route of full info post
app.route('/loadPost')
  .get(function(req, res, next) {
    var query = mongo.Blog.findOne({
      _id: req.query.urlPost
    })
    var queryExec = query.exec(function(err, post) {
      if (err) {
        console.log(err)
      } else {}
    }).then(res => {
      return res;
    }).then(resa => {
      res.render('post.jade', resa);
      res.status(200);
    });

  })

// route login page
app.route('/login')
  .get(function(req, res, next) {
    res.render('login.jade', {});
  })
  .post(function(req, res, next) {
    console.log("test");
    console.log(req.body.username);
    res.status(200).end();
    res.redirect('/login');
  })


//crypting

console.log(crypt('lol'));

// authentification


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

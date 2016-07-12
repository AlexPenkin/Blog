'use strict'
//modules
const express = require('express');
const path = require('path');
const db = require('./modules/db');
const session = require('express-session');
const bodyParser = require('body-parser');
const crypt = require('./modules/crypt.js');
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

app.use(passport.initialize());
app.use(passport.session());

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
    console.log(req.user);
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
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  }), function(req, res, next) {

    console.log("test");
    console.log(req.body.username);
    res.status(200).end();
    res.redirect('/login');
  })

// route sign up pagebreak

app.route('/signUp')
  .get(function(req, res, next) {
    res.render('signUp.jade', {});
  })
  .post(function(req, res, next) {
    console.log("sign");
    var newUser = new mongo.User({
      username: req.body.username,
      password: crypt(req.body.password),
      email: req.body.email,
      gender: req.body.gender
    });

    newUser.save(function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('saved');

      };
    })
    console.log(req.body.gender);
    res.status(200).end();
    res.redirect('/signUp');

  })


//crypting

console.log(crypt('log'));

// authentification

passport.use(new LocalStrategy(
  function(username, password, done) {
    mongo.User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('Incorrect username.');
        return done(null, false, {
          message: 'Incorrect username.'

        });
      }
      if (user.password != crypt(password)) {
        console.log('Incorrect password.');
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

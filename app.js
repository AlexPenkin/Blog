'use strict'
//modules
const express = require('express');
const path = require('path');
const db = require('./modules/db');
const session = require('express-session');
const bodyParser = require('body-parser');
const crypt = require('./modules/crypt.js');
const passport = require('./modules/passport.js');


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  // database
  //db();
var mongo = new db();
module.exports.mongo = mongo;

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
const server = require('http').Server(app);
server.on('request', function(request, response) {
    if (request.url === '/favicon.ico') {
      //console.log('favicon requested');
      return;
      response.writeHead(200);
    }
  })
  //var favicon = require('serve-favicon');

//web sockets
const io = require('socket.io')(server);
module.exports.io = io;

//chatLogic
const chat = require('./modules/socketChat.js');

//Template engine initialization
app.set('view engine', 'jade');
app.set('views', views);
//
var d = new Date();
server.listen('8888', () => console.log(`App worked on port 8888 ${d.toLocaleString()}`));
app.use(express.static(publicFold));
//session
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 900000
    }
  }))
  //app.use(express.favicon(publicFold +'/img/favicon.png'));
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

    getAllPosts(mongo.Blog);
    let session = req.session;
    var testObj = {
      sesId: session.id,
      posts: posts,
      user: req.user
    }
    res.render('index.jade', testObj);

  })

app.route('/makePost')
  .get(function(req, res, next) {
    res.render('makePost.jade', {
      user: req.user
    });
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
    var reqId = {
      _id: req.query.urlPost
    };
    mongo.Blog.update(reqId, {
      $inc: {
        viewsNum: 1
      }
    }, function() {});
    var query = mongo.Blog.findOne(reqId);
    var queryExec = query.exec(function(err, post) {
      if (err) {
        console.log(err)
      } else {}
    }).then(resa => {
      resa.user = req.user;
      res.render('post.jade', resa);
      res.status(200);
    })
  });

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
    res.status(200).end();

    //res.redirect('/login');
  });

//likes
app.route('/addLike')
  .get(function(req, res, next) {

  })
  .post(function(req, res, next) {

    var reqId = {
      _id: req.body.postId
    };

    mongo.Blog.update(reqId, {
      $push: {
        'likes.users': req.body.user
      },
      $inc: {
        'likes.numOfLikes': 1
      }
    }, function() {});
    mongo.Blog.findOne(reqId, function(err, post) {
      console.log(post);
      res.send({
        likes: post.likes.numOfLikes
      })
    });


  });

app.route('/removeLike')
  .get(function(req, res, next) {

  })
  .post(function(req, res, next) {
    var reqId = {
      _id: req.body.postId
    };



    mongo.Blog.update(reqId, {
      $pull: {
        'likes.users': req.body.user
      },
      $inc: {
        'likes.numOfLikes': -1
      }
    }, function() {});
    mongo.Blog.findOne(reqId, function(err, post) {
      console.log(post);
      res.send({
        likes: post.likes.numOfLikes
      })
    })



  });

// route sign up pagebreak

app.route('/signUp')
  .get(function(req, res, next) {
    res.render('signUp.jade', {});
  })

.post(function(req, res, next) {
  console.log("sign");
  var newUser = new mongo.User({
    username: req.body.username,
    usernameLow: req.body.username.toLowerCase(),
    password: crypt(req.body.password),
    email: req.body.email,
    gender: req.body.gender
  });

  newUser.save(function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('saved');

    }
  });
  res.status(200).end();
  res.redirect('/signUp');

});

app.route('/logOut')
  .get(function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

//tags
app.route('/tags')
  .get(function(req, res, next) {
    let tag = req.query.tag;
    var query = mongo.Blog.find({
      tags: {
        $in: [tag]
      }
    }).sort({
      _id: -1
    });
    var queryExec = query.exec(function(err, posts) {
      if (err) {
        console.log(err)
      } else {}
    }).then(resa => {
      var testObj = {
        sesId: session.id,
        posts: resa,
        user: req.user
      }
      res.render('index.jade', testObj);
      res.status(200);
    })
  });

app.route('/chat')
  .get(function(req, res, next) {
    if (req.user) {
      let jadeObj = {
        sesId: session.id,
        user: req.user
      }
      res.render('chat.jade', jadeObj);
    } else {
      res.redirect('/login');
    }
  });

app.get("/:page?", function(req, res) {
  var page = req.params.page;
  if (page != undefined) res.redirect("/");

});

//crypting

//console.log(crypt('log'));

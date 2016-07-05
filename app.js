'use strict'
//modules
const express = require('express');
const path = require('path');
const db = require('./modules/db');
const session = require('express-session');
const bodyParser = require('body-parser');

// database
//db();
var mongo = new db();

function getAllPosts(model) {
  model.find({}).sort({_id:-1}).exec( function(err, postsdb) {
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
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded


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
      preImgUrl: req.body.preImgUrl,
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
    res.status(200).send('All ok');
  })

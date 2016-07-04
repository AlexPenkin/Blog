'use strict'
//modules
const express = require('express');
const path = require('path');
const db = require('./modules/db');
const session = require('express-session');
// database
db();
//
const app = express();
const publicFold = path.join(__dirname + '/public');
const views = path.join(__dirname + '/views');
//Template engine initialization
app.set('view engine', 'jade');
app.set('views', views);
//
app.listen('8888', () => console.log('App worked on port 8888'));
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

app.route('/')
  .get(function(req, res, next) {
    let session = req.session;
    var testObj = {
      sesId: session.id,
    }
    res.render('index.jade', testObj);
  })

app.route('/makePost')
  .get(function(req, res, next) {
    res.render('makePost.jade', {});
  })

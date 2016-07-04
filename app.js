'use strict'
//modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// database
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo work!');
});
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

app.route('/')
    .get(function(req, res, next) {
        res.render('index.jade', {
            data: 0
        });
    })

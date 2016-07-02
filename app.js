'use strict'
//modules
const express = require('express');
const path = require('path');
const jade = require('jade');
//
const app = express();
const publicFold = path.join('/public');
const views = path.join('/views');
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

'use strict'
//modules
const express = require('express');
const path = require('path');
const db = require('./modules/db');
const session = require('express-session');
const bodyParser = require('body-parser');
const crypt = require('./modules/crypt.js');
const passport = require('./modules/passport.js');
const compression = require('compression');
const fs = require('fs');
const mkdirp = require('mkdirp');
module.exports.mkdirp = mkdirp;
module.exports.fs = fs;
var port = process.env.PORT || 3000

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
var options = {
    key: fs.readFileSync('./public/server.key'),
    cert: fs.readFileSync('./public/server.crt')
};

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


//
var app;
module.exports.app = app = express();
const publicFold = path.join(__dirname + '/public');
const views = path.join(__dirname + '/views');
var server;
app.use(passport.initialize());
app.use(passport.session());
//var favicon = require('serve-favicon');
// if (cluster.isMaster) {
//   // Fork workers.
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
require('http').createServer(app).listen(port);

// }

//web sockets
const io = require('socket.io')(server);
module.exports.io = io;

//chatLogic
// const chat = require('./modules/socketChat.js');

//Template engine initialization
app.set('view engine', 'jade');
app.set('views', views);
//
var d = new Date();
app.use(compression());

app.use(express.static(publicFold));
//session
app.use(session({
    secret: 'keyboard cat',
    // saveUninitialized: true,
    // resave: true,
    cookie: {
        maxAge: 60000000000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
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
        console.log(req.user);
        getAllPosts(mongo.Blog);
        var testObj = {

            posts: posts,
            user: req.user
        }
        res.render('index.jade', testObj);

    })

app.route('/contacts')
    .get(function(req, res, next) {
        res.render('contact.jade');
    })

app.route('/makePost')
    .get(function(req, res, next) {
        res.render('makePost.jade', {
            user: req.user
        });
    })
    .post(function(req, res, next) {
        let arrOfTags = req.body.tags.split(/,\s*/);
        console.log(req.body);
        var blogPost = new mongo.Blog({
            title: req.body.title,
            date: req.body.date,
            tags: arrOfTags,
            preText: req.body.preText,
            headImg: `undefined`,
            autor: req.body.autor,
            text: req.body.text
        });
        blogPost.save(function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log('saved');
                res.status(200).send('textSaved');;

            };
        })



    })
app.route('/updatePost')
    .get(function(req, res, next) {
        var reqId = {
            _id: req.query.urlPost
        };
        var findPost = new Promise(function(resolve, reject) {
            mongo.Blog.findOne({
                '_id': req.query.urlPost
            }, function(err, post) {
                if (err) {
                    reject(err);
                } else {
                    console.log(req.query);
                    resolve(post);
                }
            })
        });
        var post;
        findPost.then(resp => {

            post = resp;
            console.log(post);
            res.render('updatePost.jade', {
                user: req.user,
                post: post
            });
        }).catch(err => console.log(err))

    })
    .post(function(req, res, next) {
        let arrOfTags = req.body.tags.split(/,\s*/);
        console.log(req.body);
        mongo.Blog.update({
            _id: req.body.id
        }, {
            $set: {
                title: req.body.title,
                date: req.body.date,
                tags: arrOfTags,
                preText: req.body.preText,
                headImg: `undefined`,
                autor: req.body.autor,
                text: req.body.text
            }
        }, function(err, upd) {
            if (err) console.log(err);
            else console.log(upd);
            res.status(200).send('ok');
        });



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
            resa.id = req.query.urlPost;
            resa.user = req.user;
            res.render('post.jade', resa);
            res.status(200);
        })
    });

// route login page
app.route('/login')
    .get(function(req, res, next) {
        var backURL = req.header('Referer') || '/';
        console.log('test');
        console.log(backURL);
        res.render('login.jade', {});

    })
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function(req, res, next) {
        res.status(200);
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
                posts: resa,
                user: req.user
            }
            res.render('index.jade', testObj);
            res.status(200);
        })
    });

// app.route('/chat')
//   .get(function(req, res, next) {
//     if (req.user) {
//       let jadeObj = {
//         sesId: session.id,
//         user: req.user
//       }
//       res.render('chat.jade', jadeObj);
//     } else {
//       res.set("from", "chat");
//       res.redirect('/login');
//     }
//   });

//Portfolio

app.route('/portfolio')
    .get(function(req, res, next) {
        res.render('portfolio.jade');
    })
var uploadHeader = require(__dirname + '/routes/uploadHeader.js');
app.get("/:page?", function(req, res) {
    var page = req.params.page;
    if (page != undefined) res.redirect("/");
});



//console.log(crypt('log'));

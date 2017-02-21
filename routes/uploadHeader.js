var app = require(__dirname + '/../app.js');
var mkdirp = require('mkdirp');
var path = require('path');

// const User = require(__dirname + '/../schemaes/User.js');

app.app.route('/uploadHeader')
  .post(function(req, res, err) {
      var saveTo = `./public/posts/${decodeURIComponent(req.headers.autor)}/${decodeURIComponent(req.headers.title)}/`;

      console.log(saveTo);
      console.log(decodeURIComponent(req.headers.name));
      var filename = req.headers.fileName;
      var pro = new Promise(function(resolve, reject) {
          mkdirp(saveTo, function(err) {
              if (err) {reject(err)}
              else {
              console.log('pow!');
              resolve('Good');
            }
          });
        }); pro.then(resp => {

          req.pipe(app.fs.createWriteStream(saveTo + 'header' + path.extname(decodeURIComponent(req.headers.name))));
          res.status(200).send('ok')
          app.mongo.Blog.update({title: `${decodeURIComponent(req.headers.title)}`},{$set: {headImg: `/posts/${decodeURIComponent(req.headers.autor)}/${decodeURIComponent(req.headers.title)}/header${path.extname(decodeURIComponent(req.headers.name))}`}}, function(err, a) {
            console.log(a);
          })
        }).catch(err => console.log(err));
      });

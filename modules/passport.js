'use strict'
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const app = require('../app.js');
const crypt = require('./crypt.js');
passport.use(new LocalStrategy(
  function(username, password, done) {
    app.mongo.User.findOne({
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

module.exports = passport;

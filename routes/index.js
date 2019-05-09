const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

function isLoggedIn(req, res, next) {
  if(req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

//Get homepage
router.get('/', function(req, res){
    res.render('index');
});

router.get('/circle1', isLoggedIn, function(req, res){
    res.render('circle1');
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log("User does not exist");
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          console.log("Login attempted with valid username, but incorrect password: "+ password)
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(user);
        return done(null, user);
      });
    }
  ));
  

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/circle1',
  passport.authenticate('local', {failureRedirect: '/'}),
  function(req, res) {
    if(!req.user) {
      res.redirect('/');
    } else {
      console.log(req.user.username+" has logged in to the First Circle");
      res.redirect('/circle1');
    }
});

module.exports = router;
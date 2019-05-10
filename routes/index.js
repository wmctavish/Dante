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

router.get('/circle2', function(req, res){
  res.render('circle2');
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
      console.log(req.user.username+" has entered the First Circle");
      res.redirect('/circle1');
    }
});

router.post('/circle2', function(req, res){
  const password = req.body.password;
  const username = req.body.username;
  User.findOne({username: username, password: password}, function(err, user){
      if(err) { return done(err); }
      if(!req.user) {
          console.log("User "+username+" does not exist");
          res.redirect('/circle1');
      }
      if(user.password != password) {
          console.log("Login attempted with valid username, but incorrect password: "+ password);
          res.redirect('/circle1');
        }
      else {
        console.log(user+" has entered the Second Circle")
        console.log(user);
        res.redirect('/circle2');
      }
  });
});

module.exports = router;
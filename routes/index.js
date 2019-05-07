const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Get homepage
router.get('/', function(req, res){
    res.render('index');
});

router.get('/circle1', function(req, res){
    res.render('circle1');
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
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
    passport.authenticate('local', {successRedirect:'/circle1', failureRedirect:'/', failureFlash: true}),
    function(req, res) {
        console.log(username+" logged in");
        res.render('circle1');
});

module.exports = router;
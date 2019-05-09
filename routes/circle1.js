const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Get 2st test
router.get('/circle1', function(req, res){
    res.render('circle1');
});

router.get('/circle2', function(req, res){
    res.render('circle2');
});


router.post('/circle2', function(req, res){
    const password_value = req.body.password_value;
    const username_value = req.body.username_value;
    User.findOne({username: username_value, password: password_value}, function(err, user){
        if(err) { return done(err); }
        if(!user) {
            console.log("User "+username_value+" does not exist");
            res.redirect('/circle1');
        }
        if (user.password != password_value) {
            console.log("Login attempted with valid username, but incorrect password: "+ password);
            res.redirect('/circle1');
          }
        else {
            res.redirect('/circle2');
        }
    });
});

module.exports = router;
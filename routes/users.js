const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Get homepage
router.get('/register', function(req, res){
    res.render('register');
});

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/register', function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    
    //Validation
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    const errors = req.validationErrors();

    if(errors) {
        res.render('register', {
            errors:errors
        });
    } else {
        const newUser = new User({
            username: username,
            password: password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/');
    }
});

module.exports = router;
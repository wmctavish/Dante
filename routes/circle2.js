const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Get 2st test
router.get('/circle2', function(req, res){
    res.render('circle2');
});
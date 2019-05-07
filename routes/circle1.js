const express = require('express');
const router = express.Router();

//Get 2st test
router.get('/circle1', function(req, res){
    res.render('circle1');
});
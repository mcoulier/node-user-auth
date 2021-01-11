const passport = require('passport');
const User = require('../models/user');
//Router should be required WITH ()!
const router = require('express').Router();

router.get('/', function (req, res) {
    res.render('index', {title: "hello", message: "is pug working?"})
});

module.exports = router;
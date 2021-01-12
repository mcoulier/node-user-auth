const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: ['guess it, will you?', 'let me try']}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/user-auth',
    {useNewUrlParser: true, useUnifiedTopology: true},
    function (err) {
        if (err) {
            console.log('Could not connect to mongodb.');
        }
    });
mongoose.set('useCreateIndex', true);

app.use('/', require('./routes/routes'));

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});

module.exports = app;
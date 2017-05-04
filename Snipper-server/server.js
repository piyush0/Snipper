/**
 * Created by piyush0 on 04/05/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./mongohandler');
const app = express();
const passport = require('passport');
const path = require('path');
require('./authentication');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const secrets = require('./secrets.json');
const routes = {
    snips: require('./routes/snips'),
    login: require('./routes/login')
};

app.use(express.static(path.join(__dirname, 'public_static')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({secret: secrets.COOKIE_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/snips', routes.snips);
app.use('/login', routes.login);

app.get('/fail', function (req, res) {
    res.send("Failed");
});

app.get('/success', function (req, res) {
    res.send(req.user);
});

app.listen(8080, function () {
    console.log("Server started on http://localhost:8080");
});
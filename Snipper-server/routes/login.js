/**
 * Created by piyush0 on 04/05/17.
 */
const express = require('express');

const app = express.Router();
const passport = require('passport');
const db = require('../mongohandler');


passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    db.findUserById(id, function (result) {
        done(null, result);
    });
});

app.get('/github',
    passport.authenticate('github'),
    function (req, res) {
    });
app.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/fail'}),
    function (req, res) {

        res.redirect('/success');
    });


module.exports = app;
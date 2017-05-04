/**
 * Created by piyush0 on 04/05/17.
 */
const express = require('express');

const app = express.Router();
const db = require('../mongohandler');

app.post('/addsnip', function (req, res) {
    let snip = {
        "userId": req.body.userId,
        "language": req.body.language,
        "title": req.body.title,
        "code": req.body.code
    };

    db.insertSnip(snip, function (result) {
        res.send(result);
    })
});

app.get('/findsnip/:snipId', function (req, res) {
    console.log(req.params.snipId);
    db.findSnip(req.params.snipId, function (result) {
        res.send(result);
    })
});

app.post('/updatesnip/:id', function (req, res) {
    let snip = {
        "userId": req.body.userId,
        "language": req.body.language,
        "title": req.body.title,
        "code": req.body.code
    };

    db.updateSnip(req.params.id, snip, function (result) {
        res.send(snip);
    })
});

app.get('/allsnips/:userId', function (req, res) {
    db.getSnipsByUserId(req.params.userId, function (result) {
        res.send(result);
    })
});

app.get('/removesnip/:snipId', function (req, res) {
    db.deleteSnip(req.params.snipId,function (result) {
        res.send(result);
    })
});

app.get('/allsnips', function (req, res) {
    db.allSnips(function (result) {
        res.send(result);
    })
});

module.exports = app;
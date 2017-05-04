/**
 * Created by piyush0 on 04/05/17.
 */

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const dbPath = 'mongodb://localhost:27017/db';

let myDb = null;

MongoClient.connect(dbPath, function (err, db) {
    if (err) {
        throw err;
    }

    myDb = db;
    console.log("MongoDb connected correctly to server");
});

function insertSnip(snip, done) {
    let snips = myDb.collection('snips');

    snips.insertOne(snip, function (err, result) {
        done(result.ops);
    })
}

function findSnip(snipId, done) {
    let snips = myDb.collection('snips');
    console.log(snipId + "from db");
    snips.findOne({
        _id: ObjectId(snipId.toString())
    }, function (err, result) {
        console.log(result + "from db");
        done(result);
    })
}

function allSnips(done) {
    let snips = myDb.collection('snips');

    snips.find({}).toArray(function (err, result) {
        done(result)
    })
}

function updateSnip(snipId, snip, done) {
    let snips = myDb.collection('snips');

    snips.find({}).toArray(function (err, result) {
        snips.updateOne({
            _id: ObjectId(snipId.toString())
        }, snip, function (err, result) {
            done(result);
        })
    })
}

function getSnipsByUserId(userId, done) {
    let snips = myDb.collection('snips');

    snips.find({
        userId: userId
    }).toArray(function (err, result) {
        done(result);
    })
}

function deleteSnip(snipId, done) {
    let snips = myDb.collection('snips');

    snips.removeOne({
        _id: ObjectId(snipId.toString())
    }, function (err, result) {
        done(result);
    })
}

function findUserByOauth(oauthId, done) {
    let users = myDb.collection('users');

    users.findOne({
        oauthId: oauthId
    }, function (err, result) {
        done(result);
    })
}

function findUserById(userId, done) {
    let users = myDb.collection('users');

    users.findOne({
        _id: ObjectId(userId.toString())
    }, function (err, result) {
        done(result);
    })
}

function insertUser(user, done) {
    let users = myDb.collection('users');

    users.insertOne(user, function (err, result) {
        done(result.ops);
    })
}

module.exports = {
    insertSnip, findSnip, allSnips, updateSnip, getSnipsByUserId, deleteSnip, findUserByOauth, insertUser, findUserById
};
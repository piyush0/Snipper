/**
 * Created by piyush0 on 22/05/17.
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
    let snips = myDb.collection('snips');

});

function insertSnip(snip, done) {
    let snips = myDb.collection('snips');

    snips.insertOne(snip, function (err, result) {
        done(result.ops);
    })
}

function findSnip(snipId, done) {
    let snips = myDb.collection('snips');
    snips.findOne({
        _id: ObjectId(snipId.toString())
    }, function (err, result) {
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


function deleteSnip(snipId, done) {
    let snips = myDb.collection('snips');

    snips.removeOne({
        _id: ObjectId(snipId.toString())
    }, function (err, result) {
        done(result);
    })
}

module.exports = {
    insertSnip, findSnip, allSnips, updateSnip, deleteSnip
};
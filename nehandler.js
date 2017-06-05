/**
 * Created by piyush0 on 03/06/17.
 */
const Datastore = require('nedb');
const {app} = require('electron');
const userData = app.getAppPath('userData').replace('/app.asar', '');
const snips = new Datastore({ filename: userData+'/db/snips.db', autoload: true });

function insertSnip(snip, done) {
    snips.insert(snip, function (err, result) {
        done(result.ops);
    })
}

function searchSnip(title, done) {

    snips.find({

        "title": new RegExp(title)
    }).sort({"language": 1}).exec(
        function (err, result) {
            done(result);
        })
}

function findSnip(snipId, done) {
    snips.findOne({
        // _id: ObjectId(snipId.toString())
        _id: snipId
    }, function (err, result) {
        done(result);
    })
}


function allSnips(done) {

    snips.find({}).sort({"language": 1}).exec(function (err, result) {

        done(result)
    })
}

function updateSnip(snipId, snip, done) {

    snips.find({}).exec(function (err, result) {
        snips.update({
            // _id: ObjectId(snipId.toString())
            _id: snipId
        }, snip, function (err, result) {
            done(result);
        })
    })
}


function deleteSnip(snipId, done) {

    snips.remove({
        _id: snipId
    }, function (err, result) {
        done(result);
    })
}

module.exports = {
    insertSnip, findSnip, allSnips, updateSnip, deleteSnip, searchSnip
};
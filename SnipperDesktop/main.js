'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');

const path = require('path')
const url = require('url')
const db = require('./mongohandler');
let mainWindow = null;
let newSnipWindow = null;
let ObjectID = require('mongodb').ObjectID

app.on('ready', function () {


    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });
    mainWindow.webContents.openDevTools()
    mainWindowLoad();
});


ipcMain.on('get-snips', function () {
    sendAllSnips()
});


ipcMain.on('new-snip', function () {
    newSnipWindow = new BrowserWindow({
        height: 600,
        width: 800
    });
    newSnipWindow.webContents.openDevTools();
    newSnipWindow.loadURL(url.format({

        pathname: path.join(__dirname, 'snip.html'),
        protocol: 'file:',
        slashes: true
    }))

});

ipcMain.on('delete-snip', function (event, arg) {
    console.log(arg);


    db.deleteSnip(arg, function () {
       sendAllSnips()
    })
});


ipcMain.on('new-snip-add', function (event, arg) {

    let snip = JSON.parse(arg);
    console.log(snip);

    db.insertSnip(snip, function () {
        sendAllSnips();
        newSnipWindow.close()

    })
});

function mainWindowLoad() {
    mainWindow.loadURL(url.format({

        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
}

function sendAllSnips() {
    db.allSnips(function (snips) {
        let result = [];
        for (let i = 0; i < snips.length; i++) {
            result.push({
                title: snips[i].title,
                language: snips[i].language,
                id: snips[i]._id.toString(),
                code: snips[i].code
            })
        }
        mainWindow.webContents.send('all-snips', result);
    })
}
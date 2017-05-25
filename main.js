'use strict';

const {app, BrowserWindow, ipcMain, globalShortcut, clipboard} = require('electron');

const path = require('path');
const url = require('url');
const db = require('./mongohandler');
let mainWindow = null;
let snipWindow = null;


app.on('ready', function () {
    const screen = require('electron').screen;
    registerShortcut();
    const {width, height} = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({width, height});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public_static', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.openDevTools()

    require('./menu')
});

function registerShortcut() {
    const ret = globalShortcut.register('CommandOrControl+N', () => {
        newSnip();
    });

    if (!ret) {
        console.log('registration failed')
    }

    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('CommandOrControl+N'))

}

function newSnip() {
    snipWindow = new BrowserWindow({
        height: 578,
        width: 800,
        frame: false,

    });

    snipWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public_static', 'snip.html'),
        protocol: 'file:',
        slashes: true
    }));
    snipWindow.webContents.openDevTools()
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

/* IPC's */

ipcMain.on('get-snips', function () {
    sendAllSnips()
});

ipcMain.on('delete-snip', function (event, arg) {
    db.deleteSnip(arg, function () {
        sendAllSnips()
    })
});


ipcMain.on('edit-snip', function (event, arg) {
    db.findSnip(arg, function (result) {
        editSnip(result)
    })
});

ipcMain.on('close-snip-win', function (event, arg) {
    if (snipWindow) {
        snipWindow.close();
    }
});

ipcMain.on('new-snip-add', function (event, arg) {

    let snip = JSON.parse(arg);

    if (snip.id) {
        db.updateSnip(snip.id, {
            title: snip.title,
            language: snip.language,
            code: snip.code
        }, function () {
            sendAllSnips();
        });
    }
    else {
        db.insertSnip(snip, function () {
            sendAllSnips();
            if (snipWindow) {
                snipWindow.close();
            }
        })
    }
});

ipcMain.on('copy-to-clip', function (event, code) {
    clipboard.writeText(code);
});

module.exports = {sendAllSnips, newSnip}


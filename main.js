'use strict';

const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');

const path = require('path');
const url = require('url');
const db = require('./mongohandler');
let mainWindow = null;
let snipWindow = null;

let editReadySnip = null;

app.on('ready', function () {

    registerShortcut();


    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

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
        console.log('CommandOrControl+N is pressed')
        //TODO: New snip
    });

    if (!ret) {
        console.log('registration failed')
    }

    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('CommandOrControl+N'))

}


function editSnip(snip) {
    // snipWindow = new BrowserWindow({
    //     height: 600,
    //     width: 800
    // });
    //
    // snipWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, 'public_static', 'snip.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }));
    // snipWindow.webContents.openDevTools();
    editReadySnip = snip;
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

ipcMain.on('new-snip', function () {
    // TODO;
});

ipcMain.on('delete-snip', function (event, arg) {
    db.deleteSnip(arg, function () {
        sendAllSnips()
    })
});

ipcMain.on('edit-ready', function (event, arg) {
    let win = event.sender;
    if (editReadySnip) {
        let editReadyResult = {
            title: editReadySnip.title,
            id: editReadySnip._id.toString(),
            language: editReadySnip.language,
            code: editReadySnip.code
        };
        win.webContents.send('edit', editReadyResult);
    }
});

ipcMain.on('edit-snip', function (event, arg) {
    db.findSnip(arg, function (result) {
        editSnip(result)
    })
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
        })
    }
});


module.exports = {editSnip, sendAllSnips}


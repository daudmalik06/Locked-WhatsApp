// 'use strict';
const {app, BrowserWindow,Menu,Tray} = require('electron');
const path = require('path');
const url = require('url');
// require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 800,
        show: false,
        icon:__dirname + '/img/icon.ico',
        resizable: true,
        webSecurity: false,
    });
    win.maximize();

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // optional - open dev tools
    // win.webContents.openDevTools();

    win.once('ready-to-show', function() {
        win.show();
        win.focus();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

global.clearCache = function(){
    const ses = win.webContents.session;
    ses.clearStorageData(function () {
       console.log('done');
    });
}

"use strict";

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to remote control.
const remote = electron.remote;
// Module to shell control.
const shell = electron.shell;
// An instance of EventEmitter class.
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// 管理用変数
var DEV_EVENT = false; //true; // デバッグコンソール ON OR OFF

var mainWindow = null;
var onlineStatusWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 350, height: 600});
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  onlineStatusWindow.loadURL('file://' + __dirname + '/online-status.html');

  // Open the DevTools.
  if (DEV_EVENT) {
   mainWindow.webContents.openDevTools();
   onlineStatusWindow.webContents.openDevTools();
 };

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

ipcMain.on('online-status-changed', function(event, status) {
  console.log(status);
});

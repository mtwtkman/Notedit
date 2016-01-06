var path = require('path');
var electron = require('electron');
var app = electron.app;
var crashReporter = electron.crashReporter;
var BrowserWindow = electron.BrowserWindow;


var mainWindow = null;
if (process.env.NODE_ENV === 'develop') {
  crashReporter.start();
}

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  var width = 800;
  var height = 540;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    'min-width': width,
    'min-height': height
  });
  mainWindow.loadURL('file://' + path.resolve(__dirname, 'index.html'));
});

// main.js
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

var fs = require('fs');
var settings = JSON.parse(fs.readFileSync('./internal/settings.json'));

console.log(settings)

// Modules to control application life and create native browser window
const { app, BrowserWindow, shell, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: `MinePrompt v${require('./package.json').version}`,
    width: 900,
    minWidth: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false // Keep 'false' (Performance drops when window is minimized)
    }
  });

  mainWindow.removeMenu();

  // Send clicked links (such as wiki) to the user's browser
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  // and load the index.html of the app.
  mainWindow.loadFile('window/index.html');

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault();
      mainWindow.webContents.openDevTools();
    }
  });

  if(settings.devtools) mainWindow.webContents.openDevTools();

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
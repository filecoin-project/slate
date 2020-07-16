// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs-extra");

function bootServer() {
  // TODO(colin): Spin up server on a child process
  // const { fork } = require('child_process');
  // const ps = fork(path.join(__dirname, '../', 'index.js'));
  require(path.join(__dirname, "../", "index.js"));
  console.log("server running");
}

function fileOverrides() {
  fs.copy(
    path.join(__dirname, "./google-protobuf.js"),
    path.join(__dirname, "../node_modules/google-protbuf/google-protobuf.js"),
    (err) => {
      if (err) throw err;
      console.log("google-protobuf.js was copied to node_modules folder");
    }
  );
}
// require(path.join(__dirname, "../nodedistribution/", "main.js"));

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      experimentalFeatures: true,
    },
  });
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  // TODO(jim):
  // We shouldn't hardcode this port.
  mainWindow.loadURL("http://localhost:1337");
  console.log("window created");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  fileOverrides();
  bootServer();
  createWindow();

  app.on("activate", function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

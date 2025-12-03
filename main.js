console.log("Hello, World!", process.platform);
const { app, BrowserWindow , Menu} = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 333,
    height: 420,
  });

  win.loadFile("index.html");
};

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'Pause',
    click() { 
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.webContents.send('pause-audio');
      }
     }
  },
  
]);

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu);
  }
  createWindow();
});

app.on("window-all-closed", (event) => {
  // Prevent quitting the app when all windows are closed
  event.preventDefault();
});

app.on("activate", () => {
  // On macOS, re-create a window when the dock icon is clicked
  // and there are no other windows open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  // Allow the app to quit when explicitly requested
  app.removeAllListeners("window-all-closed");
});

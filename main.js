console.log("Hello, World!", process.platform);
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 333,
    height: 420,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

const dockMenu = Menu.buildFromTemplate([
  {
    label: "Stop Audio",
    click() {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.webContents.send("pause-audio");
      }
    },
  },
  {
    label: "Play Radio 1",
    click() {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.webContents.send("radio-1-audio");
      }
    },
  },
  {
    label: "Play Klara",
    click() {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.webContents.send("klara-audio");
      }
    },
  },
  {
    label: "Play Radio Centraal",
    click() {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.webContents.send("radio-centraal-audio");
      }
    },
  },
  ,
  {
    label: "Play Willy",
    click() {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.webContents.send("willy-audio");
      }
    },
  },
]);

app.whenReady().then(() => {
  if (process.platform === "darwin") {
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

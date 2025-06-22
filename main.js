console.log("Hello, World!",process.platform );
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 333,
    height: 333
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
app.on('window-all-closed', (event) => {
  // Prevent quitting the app when all windows are closed
  event.preventDefault();
});

app.on('before-quit', () => {
  // Allow the app to quit when explicitly requested
  app.removeAllListeners('window-all-closed');
});

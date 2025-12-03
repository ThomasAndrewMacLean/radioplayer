const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  onPauseAudio: (callback) => {
    ipcRenderer.on("pause-audio", callback);
  },
  onRadio1Audio: (callback) => {
    ipcRenderer.on("radio-1-audio", callback);
  },
  onKlaraAudio: (callback) => {
    ipcRenderer.on("klara-audio", callback);
  },
  onRadioCentraalAudio: (callback) => {
    ipcRenderer.on("radio-centraal-audio", callback);
  },
  onWillyAudio: (callback) => {
    ipcRenderer.on("willy-audio", callback);
  },
});

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // ipcRenderer: {
  //   // Example: expose a specific function if needed later
  //   send: (channel, data) => {
  //     // whitelist channels
  //     let validChannels = ['toMain'];
  //     if (validChannels.includes(channel)) {
  //       ipcRenderer.send(channel, data);
  //     }
  //   },
  //   on: (channel, func) => {
  //     let validChannels = ['fromMain'];
  //     if (validChannels.includes(channel)) {
  //       // Deliberately strip event as it includes `sender`
  //       ipcRenderer.on(channel, (event, ...args) => func(...args));
  //     }
  //   },
  // },
  // Add other APIs you want to expose here
  windowControls: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
  },
});

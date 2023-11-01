const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  open: () => ipcRenderer.invoke('open'),
  close: () => ipcRenderer.invoke('close'),
  watch: () => ipcRenderer.invoke('watch')
})
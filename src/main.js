const { app, ipcMain, BrowserWindow } = require('electron');
import { openApp, apps } from 'open';
import fkill from 'fkill';
import psList from 'ps-list';

if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
};

let exe = null;

async function openExe() {
  exe = await openApp(apps.chrome);
}

async function closeExe() {
  if (exe) {
    const pslist = await psList();
    console.log(psList)
    await fkill(apps.chrome)
  }
}

app.on('ready', () => {
  ipcMain.handle('open', openExe)
  ipcMain.handle('close', closeExe)
  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

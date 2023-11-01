const { app, ipcMain, BrowserWindow } = require('electron');
import { openApp, apps } from 'open';
import fkill from 'fkill';
import psList from 'ps-list';
const getActiveWin = require('active-win');

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
  exe = await openApp('Microsoft Teams classic', { wait: true });
}

async function closeExe() {
  if (exe) {
    const pslist = await psList();
    await fkill('Teams')
  }
}

async function watchExe() {
  const intervalId = setInterval(async () => {
    const activeWin = await getActiveWin()
    if (activeWin && activeWin.title.includes('Aditio Pangestu')) {
      clearInterval(intervalId)
      closeExe()
    }
  }, 1000)
}

app.on('ready', () => {
  ipcMain.handle('open', openExe)
  ipcMain.handle('close', closeExe)
  ipcMain.handle('watch', watchExe)
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

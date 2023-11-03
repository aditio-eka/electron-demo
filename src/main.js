const { app, ipcMain, BrowserWindow } = require('electron');
import { openApp } from 'open';
import fkill from 'fkill';
import { screen, imageResource, keyboard, Key } from '@nut-tree/nut-js';
import "@udarrr/template-matcher"

screen.config.confidence = 0.4
keyboard.config.autoDelayMs = 16

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
  exe = await openApp('C:/Users/aditio_pangestu/Downloads/Finger BPJS 64Bit/Aplikasi Sidik Jari BPJS Kesehatan/After.exe');
  await screen.waitFor(imageResource('./img/fingerprint-bpjs-title-ui.png'))
  await keyboard.type('BEFRIENTYOKTALITA')
  await keyboard.type(Key.Tab)
  await keyboard.type('Enty1234!')
  await keyboard.type(Key.Tab)
  await keyboard.type(Key.Enter)
}

async function closeExe() {
  if (exe) {
    await fkill('After.exe', { force: true })
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

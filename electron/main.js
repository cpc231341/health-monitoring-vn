'use strict';

const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

const DEV = process.argv.includes('--dev');
const SRC = path.join(__dirname, '..', 'src');
const START_PAGE = path.join(SRC, 'Equipe.dc.html');

function isInsideApp(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'file:' && decodeURIComponent(u.pathname).replace(/^\//, '').toLowerCase().startsWith(SRC.replace(/\\/g, '/').toLowerCase());
  } catch (e) {
    return false;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1024,
    minHeight: 680,
    title: 'Vento Norte Health',
    backgroundColor: '#06182E',
    icon: path.join(SRC, 'assets', 'vento-norte-logo.png'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: DEV
    }
  });

  // Só as telas do app abrem na janela; links externos vão para o navegador.
  win.webContents.on('will-navigate', (event, url) => {
    if (!isInsideApp(url)) {
      event.preventDefault();
      if (/^https:\/\//i.test(url)) { shell.openExternal(url); }
    }
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\//i.test(url)) { shell.openExternal(url); }
    return { action: 'deny' };
  });

  win.loadFile(START_PAGE);
  if (DEV) { win.webContents.openDevTools({ mode: 'detach' }); }
}

app.whenReady().then(() => {
  if (!DEV) { Menu.setApplicationMenu(null); }
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow(); } });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });

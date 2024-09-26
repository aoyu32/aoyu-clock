const { app, ipcMain, nativeTheme } = require('electron');
const { createMainWindow} = require('./src/main-win');
const { setupTray } = require('./src/tray');
// const { handleThemeUpdates } = require('src/theme');
// const { handlePowerEvents } = require('src/powerMonitor');
// const { setDPI } = require('src/utils');

let mainWin = null;

app.whenReady().then(() => {
  mainWin = createMainWindow();
  setupTray(mainWin);
//   handleThemeUpdates(mainWin);
//   handlePowerEvents(mainWin);

  mainWin.webContents.on('did-finish-load', () => {
    // Sync theme on load
    mainWin.webContents.send('set-win-theme', nativeTheme.shouldUseDarkColors ? 'dark' : 'light');
  });
});

app.on('activate', () => {
  if (!BrowserWindow.getAllWindows().length) createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

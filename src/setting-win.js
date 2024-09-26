const { BrowserWindow } = require('electron');
const path = require('path');
//设置窗口
let settingWin = null;
function createSettingsWindow() {
    settingWin = new BrowserWindow({
        width: 600,
        height: 500,
        show: true,
        frame: false,
        minWidth: 200,
        minHeight: 100,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, '../preload.js'),
        },
    });

    settingWin.loadFile('./html/setting.html');
    settingWin.on('resize', () => {
        settingWin.webContents.send("is-win-max", settingWin.isMaximized());
    });

    return settingWin;
}

module.exports = {
    createSettingsWindow,
};

const { Tray, Menu, app } = require('electron');
const {createSettingsWindow} = require('./setting-win')
const path = require('path');

let tray = null;
let settingWin = null;

function setupTray(mainWin) {
    tray = new Tray(path.join(__dirname, '../assets/aoyu2.ico'));
    const contextMenu = Menu.buildFromTemplate([
        { label: '时钟设置', type: 'normal', click: () => openSettings(mainWin) },
        { type: 'separator' },
        { label: '检查更新', type: 'normal', click: () => app.quit() },
        { label: '关于', type: 'normal', click: () => app.quit() },
        { type: 'separator' },
        { label: '退出', type: 'normal', click: () => app.quit() }
    ]);

    tray.setToolTip('aoyu\'s flip clock');
    tray.setContextMenu(contextMenu);
}

function openSettings(mainWin) {
    if (!settingWin) {
        settingWin = createSettingsWindow(mainWin);
    }
}

module.exports = {
    setupTray
};

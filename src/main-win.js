const { BrowserWindow, ipcMain } = require('electron');
const { createContextMenu } = require('./right-menu')
const { getWinSize} = require('./utils')
const path = require('path');

let mainWin = null;
// 主窗口
function createMainWindow() {
    mainWin = new BrowserWindow({
        width: getWinSize().w,
        height: getWinSize().h,
        transparent: true,
        frame: false,
        resizable: false,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, '../preload.js'),
        },
    });

    mainWin.loadFile('./html/flipclock.html');
    // mainWin.webContents.openDevTools();

    winMove(mainWin, getWinSize().w, getWinSize().h)

    rightMenu(mainWin)
    return mainWin;
}

//右键菜单
function rightMenu(win) {
    ipcMain.on('right-menu', (ev) => {
        createContextMenu(win, ev)
    })
}

//时钟窗口移动
function winMove(win, winWidth, winHeight) {

    ipcMain.handle('get-win-position', async (e) => {
        const [winX, winY] = await win.getPosition()
        return [winX, winY]
    })

    ipcMain.on('set-win-position', (event, data) => {
        winWidth=getWinSize().w
        winHeight=getWinSize().h
        win.setBounds({ x: data.x, y: data.y, width: winWidth, height: winHeight })
    })
}

module.exports = {
    createMainWindow,
    winMove,
};

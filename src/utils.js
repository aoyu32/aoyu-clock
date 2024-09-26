const koffi = require('koffi');
const user32 = koffi.load('user32.dll');
let winWidth = 1200
let winHeight = 280
const FindWindowA = user32.func('long FindWindowA(const char* lpClassName, const char* lpWindowName)');
const ShowWindow = user32.func('bool ShowWindow(long hWnd, int nCmdShow)');

function isHideTaskBar(isHide) {
    const taskbarHandle = FindWindowA('Shell_TrayWnd', null);
    ShowWindow(taskbarHandle, isHide ? 0 : 5);
}


function setWinSize(w, h) {
    winWidth = w
    winHeight = h
}

function getWinSize() {
    return {
        w: winWidth,
        h: winHeight
    }
}

function setDPI() {
    app.commandLine.appendSwitch('high-dpi-support', '1');
    app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

module.exports = {
    isHideTaskBar,
    setDPI,
    getWinSize,
    setWinSize
};

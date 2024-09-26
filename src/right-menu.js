const { Menu, BrowserWindow } = require('electron');
const {setWinSize}=require('./utils')
let selectOption = "system"; // 当前选择的主题
let selectSize = "middle";   // 当前选择的时钟大小
let ischecked = false;       // 是否开启屏保模式

function createContextMenu(mainWin, ev) {
    const rightMenu = Menu.buildFromTemplate([
        {
            label: "切换主题",
            submenu: [
                {
                    label: "深色模式",
                    type: "radio",
                    checked: selectOption === "dark",
                    click: () => {
                        selectOption = "dark";
                        setTheme("dark", mainWin);
                    }
                },
                {
                    label: "浅色模式",
                    type: "radio",
                    checked: selectOption === "light",
                    click: () => {
                        selectOption = "light";
                        setTheme("light", mainWin);
                    }
                },
                {
                    label: "跟随系统",
                    type: "radio",
                    checked: selectOption === "system",
                    click: () => {
                        selectOption = "system";
                        setTheme("system", mainWin);
                    }
                }
            ],
        },
        {
            label: '选择尺寸',
            submenu: [
                {
                    label: "小",
                    type: "radio",
                    checked: selectSize === "small",
                    click: () => {
                        selectSize = "small";
                        setClockSize("small", mainWin);

                    }
                },
                {
                    label: "中",
                    type: "radio",
                    checked: selectSize === "middle",
                    click: () => {
                        selectSize = "middle";
                        setClockSize("middle", mainWin);

                    }
                },
                {
                    label: "大",
                    type: "radio",
                    checked: selectSize === "large",
                    click: () => {
                        selectSize = "large";
                        setClockSize("large", mainWin);

                    }
                }
            ]
        },
        {
            label: "屏保模式",
            type: "checkbox",
            checked: ischecked,
            click: () => {
                ischecked = !ischecked;
                if (ischecked) {
                    mainWin.maximize();
                } else {
                    mainWin.unmaximize();
                }
                mainWin.webContents.send('is-win-max', ischecked);
            }
        },
        {
            label: "设置",
            type: "normal",
            click: () => {
                mainWin.webContents.send('open-settings-window');
            }
        },
        {
            label: "退出",
            type: "normal",
            click: () => {
                mainWin.close();
            }
        }
    ]);

    rightMenu.popup({ window: BrowserWindow.fromWebContents(ev.sender) })
}

function setClockSize(size, mainWin) {
    let w
    let h
    switch (size) {
        case 'small':
            w = 400
            h = 100
            break;
        case 'middle':
            w = 1200
            h = 280
            break;
        case 'large':
            w = 1600
            h = 400
            break;
    }

    setWinSize(w,h)
    mainWin.setBounds({width:w,height:h});
    mainWin.webContents.send('change-clock-size', size);
    if (ischecked) {
        mainWin.maximize()
    }

}

function setTheme(theme, mainWin) {
    mainWin.webContents.send('set-win-theme', theme);
}

module.exports = {
    createContextMenu,
};

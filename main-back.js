const { log } = require('console')
const { app, BrowserWindow, powerMonitor, nativeTheme, Menu, Tray, ipcMain } = require('electron')
const path = require('path')

const koffi = require('koffi');

let tray = null
let mainWin = null
let clockTyle = 'flipclock.html'
let mainWinW = 1200
let mainWinH = 280
let settingWin = null
let ischecked = false //是否开启屏保模式
let selectOption = "system"
let selectSize = "middle"
//热加载
try {
  require('electron-reloader')(module, {});
} catch (_) { }

const createWindow = () => {
  mainWin = new BrowserWindow({
    width: mainWinW,
    height: mainWinH,
    transparent: true,
    frame: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    focusable: false,
    skipTaskbar: true,
    // aspectRatio:mainWinW/mainWinH,
    "webPreferences": {
      nodeIntegration: true,//开启可以使用node api
      contextIsolation: true,//上下文隔离（主进程和渲染进程之间隔离，渲染进程不能直接使用主进程的东西）
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // mainWin.setAspectRatio(mainWinW/mainWinH)

  mainWin.loadFile('./html/' + clockTyle)

  mainWin.webContents.openDevTools()

}

app.whenReady().then(() => {
  createWindow()
  mainWinMove()

  //监听窗口是否完成加载，完成加载处理相应事件
  mainWin.webContents.on('did-finish-load', () => {
    setTheme("system")
  });

  // 监听主题模式变化
  nativeTheme.on('updated', () => {
    // 发送系统主题模式给渲染进程
    setTheme("system")
  });



  powerMonitor.on('resume', () => {
    console.log('System resumed from sleep.');
    // 发送消息到渲染进程，通知重新同步时间
    mainWin.webContents.send('system-resumed');
  });

  //阻止系统休眠应用关闭 
  // // const id = powerSaveBlocker.start('prevent-app-suspension')
  // console.log(powerSaveBlocker.isStarted(id))

  // powerSaveBlocker.stop(id)

  setTheme("system")
  tray = new Tray(path.join(__dirname, './assets/aoyu2.ico'))
  tray.setToolTip('aoyu\'s flip clock')
  const contextMenu = Menu.buildFromTemplate([

    {
      label: '时钟设置',
      type: 'normal',
      click: () => {
        if (settingWin === null) {
          settingEvent()
        }
      }

    },
    {
      type: "separator"
    },
    {
      label: '检查更新',
      type: 'normal',
      click: () => {
        app.quit()
      }
    },
    {
      label: '关于',
      type: 'normal',
      click: () => {
        app.quit()
      }
    },
    {
      type: 'separator'
    },
    // {
    //   label: '重启',
    //   type: 'normal',
    //   click: () => {
    //     app.relaunch()
    //     app.exit(0)
    //   }
    // },
    {
      label: '退出',
      type: 'normal',
      click: () => {
        app.quit()
        isHideTaskBar(false)
      }
    }
  ])
  tray.setContextMenu(contextMenu)
  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu)
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.on("right-menu", (ev) => {
  console.log('right-menu');
  const rightMenu = Menu.buildFromTemplate([
    {
      label: "切换主题",
      submenu: [
        {
          label: "深色模式",
          type: "radio",
          checked: selectOption === "dark",
          click: () => {
            selectOption = "dark"
            setTheme(selectOption)

          }
        },
        {
          label: "浅色模式",
          type: "radio",
          checked: selectOption === "light",
          click: () => {
            selectOption = "light"
            setTheme(selectOption)
          }

        },
        {
          label: "跟随系统",
          type: "radio",
          checked: selectOption === "system",
          click: () => {
            selectOption = "system"
            setTheme("system")
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
            selectSize = "small"
            setClockSize(selectSize)

          }
        },
        {
          label: "中",
          type: "radio",
          checked: selectSize === "middle",
          click: () => {
            selectSize = "middle"
            setClockSize(selectSize)
          }

        },
        {
          label: "大",
          type: "radio",
          checked: selectSize === "large",
          click: () => {
            selectSize = "large"
            setClockSize(selectSize)
          }
        }
      ]
    },
    {
      label: "屏保模式",
      type: "checkbox",
      checked: ischecked,

      click: () => {
        if (ischecked) {
          mainWin.unmaximize()
          mainWin.webContents.send('is-win-max', !ischecked)
          ischecked = false
          isHideTaskBar(false)
          rePosition(mainWinW, mainWinH)
        } else {
          mainWin.maximize()
          mainWin.webContents.send('is-win-max', !ischecked)
          ischecked = true
          isHideTaskBar(true)

        }
      }

    },
    {
      type: "separator"
    },
    {
      label: "设置",
      type: "normal",
      click: () => {
        if (settingWin === null) {
          settingEvent()
        }
      }
    },
    {
      label: "退出",
      type: "normal",
      click: () => {
        app.quit()
        isHideTaskBar(false)
      }
    }
  ])

  rightMenu.popup({ window: BrowserWindow.fromWebContents(ev.sender) })

})


function setClockSize(selectSize) {

  console.log(selectSize);

  switch (selectSize) {
    case 'small':
      mainWinW = 400
      mainWinH = 100
      mainWin.setSize(mainWinW, mainWinH)
      break;
    case 'middle':
      mainWinW = 1200
      mainWinH = 280
      mainWin.setSize(mainWinW, mainWinH)
      break
    case 'large':
      mainWinW = 1600
      mainWinH = 400
      mainWin.setSize(mainWinW, mainWinH)
      break;
  }

  mainWin.maximize()
  mainWin.webContents.send('change-clock-size', selectSize)
  rePosition(mainWinW, mainWinH)
}

//时钟窗口移动
function mainWinMove() {
  ipcMain.handle('get-win-position', async (e) => {
    const [winX, winY] = await mainWin.getPosition()
    return [winX, winY]
  })

  ipcMain.on('set-win-position', (event, data) => {

    mainWin.setBounds({ x: data.x, y: data.y, width: mainWinW, height: mainWinH })

    // mainWin.setPosition(data.x,data.y)
  })

}

//是否显示系统任务栏
function isHideTaskBar(isHide) {
  // 定义 Windows API 函数
  const user32 = koffi.load('user32.dll');

  // FindWindowA 用于获取任务栏窗口句柄
  const FindWindowA = user32.func('long FindWindowA(const char* lpClassName, const char* lpWindowName)');

  // ShowWindow 用于显示/隐藏窗口
  const ShowWindow = user32.func('bool ShowWindow(long hWnd, int nCmdShow)');

  // 获取任务栏窗口句柄
  const taskbarHandle = FindWindowA('Shell_TrayWnd', null);

  if (isHide) {
    ShowWindow(taskbarHandle, 0);
  } else {
    ShowWindow(taskbarHandle, 5)
  }
}

//设置
function setDPI() {
  app.commandLine.appendSwitch('high-dpi-support', '1'); // 启用高 DPI 支持
  app.commandLine.appendSwitch('force-device-scale-factor', '1'); // 禁用缩放调整
}


function setTheme(model) {
  switch (model) {
    case "dark":
      mainWin.webContents.send("set-win-theme", "dark")
      break;
    case "light":
      mainWin.webContents.send("set-win-theme", "light")
      break
    case "system":
      console.log(nativeTheme.shouldUseDarkColors ? "dark" : "light");
      mainWin.webContents.send("set-win-theme", nativeTheme.shouldUseDarkColors ? "dark" : "light")
      break
  }
}

//设置窗口
function settingEvent() {
  settingWin = new BrowserWindow({
    width: 600,
    height: 500,
    show: true,
    frame: false,
    minWidth: 200,
    minHeight: 100,
    "webPreferences": {
      nodeIntegration: true,//开启可以使用node api
      contextIsolation: true,//上下文隔离（主进程和渲染进程之间隔离，渲染进程不能直接使用主进程的东西）
      preload: path.join(__dirname, 'preload.js')
    }

  })

  settingWin.loadFile('./html/setting.html')

  // settingWin.webContents.openDevTools()

  settingWin.on('resize', () => {
    if (settingWin.isMaximized()) {
      settingWin.webContents.send("is-win-max", true)
    } else {
      settingWin.webContents.send("is-win-max", false)
    }
  })

}


//设置窗口最大化，最小化，关闭
ipcMain.on('win:status', (ev, action) => {

  const win = BrowserWindow.getFocusedWindow()
  if (action === "min") {
    win.minimize()
  } else if (action === "max") {
    win.isMaximized() ? win.unmaximize() : win.maximize()
  } else if (action === "close") {
    win.close()
    settingWin = null
  }
})

//关闭程序
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
  isHideTaskBar(false)
})



function rePosition(mainWinW, mainWinH) {

  const [positionX, positionY] = mainWin.getPosition()
  if (!ischecked) {
    mainWin.setBounds({ x: positionX, y: positionY, width: mainWinW, height: mainWinH })
  }

}
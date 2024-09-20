const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('api', {
    send: (channer, data) => {
        ipcRenderer.send(channer, data)
    },
    invoke:(channer,data)=>{
        return ipcRenderer.invoke(channer,data)
    },
    onMainMsg:(channer,data)=>{
        ipcRenderer.on(channer,data)
    }
})
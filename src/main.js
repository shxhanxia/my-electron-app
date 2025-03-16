const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const isDev = process.env.NODE_ENV === 'development'

// 添加以下代码以启用自动刷新
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules/electron')
    })
}
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        resizable: false, // 禁止调整窗口大小
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (isDev) {
        win.loadURL('http://localhost:5173')
        win.webContents.openDevTools();
    } else {
        win.loadFile('./vue/dist/index.html')
    }

}

app.on('ready', () => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    app.quit()
})
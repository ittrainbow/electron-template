const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600
  })
  window.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  )

  isDev && window.webContents.openDevTools()
  window.maximize()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

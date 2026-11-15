import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
import { PrivacyPolicy } from './privacy-policy.js'
import { Storage } from './storage.js'
import { DataSource } from './data-source/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

let mainWindow
const privacyPolicy = new PrivacyPolicy()
const storage = new Storage()
const dataSource = new DataSource()

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  const isDev = process.env.ELECTRON_DEV_SERVER_URL
  if (isDev) {
    mainWindow.loadURL(isDev)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  await dataSource.initialize()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC Handlers
ipcMain.handle('data:get-view', (event, options) => {
  const { role, environment } = options
  const data = dataSource.getData(environment)
  return privacyPolicy.filter(data, role)
})

ipcMain.handle('measure:submit', (event, measurement) => {
  return storage.saveMeasurement(measurement)
})

ipcMain.handle('alert:update', (event, alertUpdate) => {
  return storage.updateAlert(alertUpdate)
})

ipcMain.handle('diary:save', (event, entry) => {
  return storage.saveDiaryEntry(entry)
})

ipcMain.handle('diary:list', (event, astronautId) => {
  const entries = storage.getDiaryEntries(astronautId)
  return privacyPolicy.filterDiary(entries, astronautId)
})

ipcMain.handle('mood:checkin', (event, checkin) => {
  return storage.saveMoodCheckin(checkin)
})

ipcMain.handle('eva:start', (event, eventData) => {
  return storage.startEVA(eventData)
})

ipcMain.handle('eva:end', (event, eventData) => {
  return storage.endEVA(eventData)
})

ipcMain.handle('demo:set-scenario', (event, scenario) => {
  dataSource.setScenario(scenario)
  return { success: true }
})

ipcMain.handle('access:list', (event, astronautId) => {
  const accesses = storage.getAccessLog(astronautId)
  return privacyPolicy.filterAccessLog(accesses, astronautId)
})

export { mainWindow }

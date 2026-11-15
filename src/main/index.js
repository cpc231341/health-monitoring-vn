import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
import { PrivacyPolicy } from './privacy-policy.js'
import { Storage } from './storage.js'
import { DataSource } from './data-source/index.js'
import { validateLog } from '../shared/rules/food.js'
import { statusAtSave, validateMeasure } from '../shared/rules/measures.js'
import { validateRoutine, validateWorkout } from '../shared/rules/training.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

let mainWindow
const privacyPolicy = new PrivacyPolicy()
const storage = new Storage()
const dataSource = new DataSource()

app.on('ready', async () => {
  // Remove a barra de menu padrão (File, Edit, View, Window, Help)
  Menu.setApplicationMenu(null)

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    icon: path.join(app.getAppPath(), 'resources/icon.ico'),
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, '../preload/index.mjs')
    }
  })

  const devServerUrl = process.env.ELECTRON_RENDERER_URL
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
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
  const { valid, errors } = validateMeasure(measurement)
  if (!valid) return { success: false, errors }
  // O estado (normal/atenção/crítico) vai junto com a medida: o capitão vê o estado, nunca o valor (RN06).
  const status = statusAtSave(storage.getMeasurements(measurement.crew), measurement)
  return { success: storage.saveMeasurement({ ...measurement, status }) }
})

ipcMain.handle('measure:list', (event, astronautId) => {
  return storage.getMeasurements(astronautId)
})

ipcMain.handle('measure:days', () => {
  return storage.getMeasurementDays()
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

ipcMain.handle('workout:save', (event, workout) => {
  const { valid, errors } = validateWorkout(workout)
  if (!valid) return { success: false, errors }
  return { success: storage.saveWorkout(workout) }
})

ipcMain.handle('workout:list', (event, astronautId) => {
  return storage.getWorkouts(astronautId)
})

ipcMain.handle('routine:list', (event, astronautId) => {
  return storage.getRoutines(astronautId)
})

ipcMain.handle('routine:save', (event, routine) => {
  const { valid, errors } = validateRoutine(routine)
  if (!valid || typeof routine.astronautId !== 'string' || !routine.astronautId) {
    return { success: false, errors: valid ? ['astronautId'] : errors }
  }
  return { success: storage.saveRoutine(routine) }
})

ipcMain.handle('routine:reset', (event, astronautId, routineId) => {
  return { success: storage.resetRoutine(astronautId, routineId) }
})

ipcMain.handle('food:save', (event, log) => {
  const { valid, errors } = validateLog(log)
  if (!valid) return { success: false, errors }
  return { success: storage.saveFood(log) }
})

ipcMain.handle('food:list', (event, astronautId) => {
  return storage.getFood(astronautId)
})

ipcMain.handle('food:delete', (event, astronautId, id) => {
  return { success: storage.deleteFood(astronautId, id) }
})

ipcMain.handle('food:team-stock', () => {
  return storage.getTeamConsumption()
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

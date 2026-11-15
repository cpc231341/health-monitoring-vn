import fs from 'fs'
import path from 'path'
import { app } from 'electron'

export class Storage {
  constructor() {
    this.appDataPath = path.join(app.getPath('userData'), 'data')
    this.ensureDataDirectory()
  }

  ensureDataDirectory() {
    if (!fs.existsSync(this.appDataPath)) {
      fs.mkdirSync(this.appDataPath, { recursive: true })
    }
  }

  getFilePath(filename) {
    return path.join(this.appDataPath, filename)
  }

  readData(filename, defaultValue = {}) {
    try {
      const filePath = this.getFilePath(filename)
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(data)
      }
    } catch (error) {
      console.error(`Error reading ${filename}:`, error)
    }
    return defaultValue
  }

  writeData(filename, data) {
    try {
      const filePath = this.getFilePath(filename)
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
      return true
    } catch (error) {
      console.error(`Error writing ${filename}:`, error)
      return false
    }
  }

  saveMeasurement(measurement) {
    const measurements = this.readData('measurements.json', [])
    measurements.push({
      ...measurement,
      timestamp: new Date().toISOString()
    })
    return this.writeData('measurements.json', measurements)
  }

  updateAlert(alertUpdate) {
    const alerts = this.readData('alerts.json', [])
    const index = alerts.findIndex(a => a.id === alertUpdate.id)
    if (index >= 0) {
      alerts[index] = { ...alerts[index], ...alertUpdate }
    } else {
      alerts.push(alertUpdate)
    }
    return this.writeData('alerts.json', alerts)
  }

  saveDiaryEntry(entry) {
    const entries = this.readData('diary.json', [])
    entries.push({
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    })
    return this.writeData('diary.json', entries)
  }

  getDiaryEntries(astronautId) {
    const entries = this.readData('diary.json', [])
    return entries.filter(e => e.astronautId === astronautId)
  }

  saveMoodCheckin(checkin) {
    const checkins = this.readData('mood.json', [])
    checkins.push({
      ...checkin,
      timestamp: new Date().toISOString()
    })
    return this.writeData('mood.json', checkins)
  }

  startEVA(eventData) {
    const evaEvents = this.readData('eva.json', [])
    evaEvents.push({
      ...eventData,
      status: 'active',
      startTime: new Date().toISOString()
    })
    return this.writeData('eva.json', evaEvents)
  }

  endEVA(eventData) {
    const evaEvents = this.readData('eva.json', [])
    const lastEVA = evaEvents[evaEvents.length - 1]
    if (lastEVA && lastEVA.status === 'active') {
      lastEVA.status = 'completed'
      lastEVA.endTime = new Date().toISOString()
      return this.writeData('eva.json', evaEvents)
    }
    return false
  }

  getAccessLog(astronautId) {
    const logs = this.readData('access-log.json', [])
    return logs.filter(log => log.targetAstronautId === astronautId)
  }

  logAccess(accessData) {
    const logs = this.readData('access-log.json', [])
    logs.push({
      ...accessData,
      timestamp: new Date().toISOString()
    })
    return this.writeData('access-log.json', logs)
  }
}

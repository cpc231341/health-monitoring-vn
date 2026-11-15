import fs from 'fs'
import path from 'path'
import { app } from 'electron'
import { DEFAULT_ROUTINES, mergeRoutines } from '../shared/rules/training.js'

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

  // Registros manuais de pressão, glicose e massa. Cada tripulante lê só os próprios.
  getMeasurements(astronautId) {
    return this.readData('measurements.json', []).filter(m => m.crew === astronautId)
  }

  // Só a contagem por dia (tripulante × tipo), sem valores: serve ao painel do time.
  getMeasurementDays() {
    return this.readData('measurements.json', []).filter(m => m.crew && m.kind && m.at).map(m => ({ crew: m.crew, kind: m.kind, at: m.at, status: m.status }))
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

  saveWorkout(workout) {
    const workouts = this.readData('workouts.json', [])
    workouts.push({
      ...workout,
      id: workout.id || Date.now().toString(),
      timestamp: new Date().toISOString()
    })
    return this.writeData('workouts.json', workouts)
  }

  // Sem astronautId devolve os treinos de toda a tripulação (usado pelo painel do time).
  getWorkouts(astronautId) {
    const workouts = this.readData('workouts.json', [])
    return astronautId ? workouts.filter(w => w.astronautId === astronautId) : workouts
  }

  // Rotinas padrão com as personalizadas do astronauta por cima.
  getRoutines(astronautId) {
    return mergeRoutines(DEFAULT_ROUTINES, this.readData('routines.json', []), astronautId)
  }

  saveRoutine(routine) {
    const { customized, ...clean } = routine
    const routines = this.readData('routines.json', [])
    const index = routines.findIndex(r => r.id === clean.id && r.astronautId === clean.astronautId)
    if (index >= 0) routines[index] = clean
    else routines.push(clean)
    return this.writeData('routines.json', routines)
  }

  // Volta a rotina ao padrão apagando a versão personalizada.
  resetRoutine(astronautId, routineId) {
    const routines = this.readData('routines.json', [])
    return this.writeData('routines.json', routines.filter(r => !(r.id === routineId && r.astronautId === astronautId)))
  }

  saveFood(log) {
    const logs = this.readData('food.json', [])
    logs.push({ ...log, id: log.id || Date.now().toString(), timestamp: new Date().toISOString() })
    return this.writeData('food.json', logs)
  }

  // Detalhe da alimentação é pessoal: só o dono lê os próprios registros.
  getFood(astronautId) {
    return this.readData('food.json', []).filter(l => l.tripulante === astronautId)
  }

  deleteFood(astronautId, id) {
    const logs = this.readData('food.json', [])
    return this.writeData('food.json', logs.filter(l => !(l.id === id && l.tripulante === astronautId)))
  }

  // Estoque coletivo: só o total por item, sem nomes (vale para qualquer papel).
  getTeamConsumption() {
    const used = {}
    for (const log of this.readData('food.json', [])) {
      for (const it of log.itens || []) {
        if (it.itemId) used[it.itemId] = (used[it.itemId] || 0) + (it.porcoes || 0)
      }
    }
    return used
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

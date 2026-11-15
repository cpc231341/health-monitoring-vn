import { contextBridge, ipcRenderer } from 'electron'

const api = {
  // Data access
  getView: (options) => ipcRenderer.invoke('data:get-view', options),

  // Measurements
  submitMeasure: (measurement) => ipcRenderer.invoke('measure:submit', measurement),
  listMeasures: (astronautId) => ipcRenderer.invoke('measure:list', astronautId),
  listMeasureDays: () => ipcRenderer.invoke('measure:days'),

  // Alerts
  updateAlert: (alertUpdate) => ipcRenderer.invoke('alert:update', alertUpdate),

  // Diary
  saveDiary: (entry) => ipcRenderer.invoke('diary:save', entry),
  listDiary: (astronautId) => ipcRenderer.invoke('diary:list', astronautId),

  // Training
  saveWorkout: (workout) => ipcRenderer.invoke('workout:save', workout),
  listWorkouts: (astronautId) => ipcRenderer.invoke('workout:list', astronautId),
  saveRoutine: (routine) => ipcRenderer.invoke('routine:save', routine),
  resetRoutine: (astronautId, routineId) => ipcRenderer.invoke('routine:reset', astronautId, routineId),
  listRoutines: (astronautId) => ipcRenderer.invoke('routine:list', astronautId),

  // Food
  saveFood: (log) => ipcRenderer.invoke('food:save', log),
  listFood: (astronautId) => ipcRenderer.invoke('food:list', astronautId),
  deleteFood: (astronautId, id) => ipcRenderer.invoke('food:delete', astronautId, id),
  teamStock: () => ipcRenderer.invoke('food:team-stock'),

  // Mood
  checkinMood: (checkin) => ipcRenderer.invoke('mood:checkin', checkin),

  // EVA
  startEVA: (eventData) => ipcRenderer.invoke('eva:start', eventData),
  endEVA: (eventData) => ipcRenderer.invoke('eva:end', eventData),

  // Demo
  setScenario: (scenario) => ipcRenderer.invoke('demo:set-scenario', scenario),

  // Access log
  listAccesses: (astronautId) => ipcRenderer.invoke('access:list', astronautId)
}

contextBridge.exposeInMainWorld('api', api)

import { contextBridge, ipcRenderer } from 'electron'

const api = {
  // Data access
  getView: (options) => ipcRenderer.invoke('data:get-view', options),

  // Measurements
  submitMeasure: (measurement) => ipcRenderer.invoke('measure:submit', measurement),

  // Alerts
  updateAlert: (alertUpdate) => ipcRenderer.invoke('alert:update', alertUpdate),

  // Diary
  saveDiary: (entry) => ipcRenderer.invoke('diary:save', entry),
  listDiary: (astronautId) => ipcRenderer.invoke('diary:list', astronautId),

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

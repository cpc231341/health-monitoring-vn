import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class DataSource {
  constructor() {
    this.mockDataPath = path.join(__dirname, '../../..', 'resources', 'mock')
    this.currentScenario = 'normal'
    this.currentEnvironment = 'station'
    this.data = {}
  }

  async initialize() {
    try {
      // Carrega os dados mockados gerados pelo Python
      // Por enquanto, retorna uma estrutura vazia pronta para ser preenchida
      this.data = this.getDefaultData()
      return true
    } catch (error) {
      console.error('Error initializing data source:', error)
      return false
    }
  }

  getData(environment) {
    return {
      ...this.data,
      environment: environment || this.currentEnvironment,
      scenario: this.currentScenario
    }
  }

  setScenario(scenario) {
    this.currentScenario = scenario
    this.data = this.getDefaultData()
  }

  getDefaultData() {
    return {
      indicators: {
        heartRate: { value: 72, unit: 'bpm', status: 'normal', range: { min: 60, max: 100 } },
        bloodPressure: { value: '120/80', unit: 'mmHg', status: 'normal', range: { min: '90/60', max: '140/90' } },
        glucose: { value: 95, unit: 'mg/dL', status: 'normal', range: { min: 70, max: 110 } },
        temperature: { value: 37.0, unit: '°C', status: 'normal', range: { min: 36.5, max: 37.5 } },
        sleep: { value: 7.5, unit: 'h', status: 'normal', range: { min: 7, max: 9 } },
        mood: { value: 4, unit: 'scale 1-5', status: 'normal', range: { min: 1, max: 5 } },
        spO2: { value: 98, unit: '%', status: 'normal', range: { min: 95, max: 100 } },
        weight: { value: 75, unit: 'kg', status: 'normal', range: { min: 70, max: 80 } }
      },
      vitals: {
        heartRateHistory: [],
        bloodPressureHistory: [],
        sleepHistory: [],
        moodHistory: []
      },
      alerts: [],
      measurements: [],
      appointments: [
        { id: '1', type: 'meal', name: 'Café da manhã', time: '08:00', completed: false },
        { id: '2', type: 'exercise', name: 'Exercício', time: '14:00', completed: false },
        { id: '3', type: 'sleep', name: 'Hora de dormir', time: '22:00', completed: false }
      ],
      evaStatus: { active: false, plannedGap: false },
      crew: [
        { id: '1', name: 'Astronauta 1', role: 'astronaut', mood: 4, status: 'ok' },
        { id: '2', name: 'Astronauta 2', role: 'astronaut', mood: 3, status: 'ok' },
        { id: '3', name: 'Comandante', role: 'commander', mood: 4, status: 'ok' }
      ],
      radiation: { rate: 0.5, unit: 'mSv/day', accumulative: 50 },
      cabineAir: { co2: 400, o2: 20.9, pressure: 101.3 }
    }
  }
}

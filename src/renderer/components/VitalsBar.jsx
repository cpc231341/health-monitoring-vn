import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function VitalsBar() {
  const { state, environment, setEnvironment, scenario, setScenario } = useContext(AppContext)

  const vitals = [
    { label: 'FC', value: state.data.indicators.heartRate?.value || '-', unit: 'bpm' },
    { label: 'PA', value: state.data.indicators.bloodPressure?.value || '-', unit: 'mmHg' },
    { label: 'SpO2', value: state.data.indicators.spO2?.value || '-', unit: '%' },
    { label: 'Temp', value: state.data.indicators.temperature?.value || '-', unit: '°C' }
  ]

  return (
    <div className="vitals-bar">
      <div className="vitals-left">
        <div className="vento-norte-logo">
          <h2>Vento Norte</h2>
        </div>
        <div className="vitals-grid">
          {vitals.map((vital, idx) => (
            <div key={idx} className="vital-item">
              <span className="vital-label">{vital.label}</span>
              <span className="vital-value">{vital.value} {vital.unit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="vitals-right">
        <div className="environment-selector">
          <label>Ambiente:</label>
          <select value={environment} onChange={(e) => setEnvironment(e.target.value)}>
            <option value="station">Estação</option>
            <option value="moon">Lua</option>
            <option value="mars">Marte</option>
            <option value="remote">Terra Remota</option>
          </select>
        </div>

        <div className="scenario-selector">
          <label>Cenário:</label>
          <select value={scenario} onChange={(e) => setScenario(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="hypoxia">Hipóxia</option>
            <option value="fever">Febre</option>
            <option value="stress">Estresse</option>
            <option value="radiation">Radiação</option>
          </select>
        </div>

        <div className="ring-status">
          <span className="status-dot connected"></span>
          <span className="status-text">Anel Conectado</span>
        </div>
      </div>
    </div>
  )
}

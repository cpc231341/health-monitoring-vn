import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Health() {
  const { state } = useContext(AppContext)

  const indicators = [
    { key: 'heartRate', label: 'Frequência Cardíaca', unit: 'bpm', color: '#ef4444' },
    { key: 'bloodPressure', label: 'Pressão Arterial', unit: 'mmHg', color: '#f59e0b' },
    { key: 'glucose', label: 'Glicose', unit: 'mg/dL', color: '#eab308' },
    { key: 'temperature', label: 'Temperatura', unit: '°C', color: '#06b6d4' },
    { key: 'sleep', label: 'Sono', unit: 'horas', color: '#8b5cf6' },
    { key: 'mood', label: 'Humor', unit: 'escala 1-5', color: '#10b981' }
  ]

  return (
    <div className="screen-health">
      <div className="health-header">
        <h1>Saúde</h1>
      </div>

      <div className="indicators-grid">
        {indicators.map(indicator => {
          const data = state.data.indicators[indicator.key]
          if (!data) return null

          return (
            <div key={indicator.key} className="indicator-card">
              <div className="indicator-header">
                <h3>{indicator.label}</h3>
                <div className={`status-indicator status-${data.status}`}></div>
              </div>
              <div className="indicator-value">
                <span className="value">{data.value}</span>
                <span className="unit">{indicator.unit}</span>
              </div>
              <div className="indicator-range">
                <small>Normal: {typeof data.range.min === 'object'
                  ? `${data.range.min.min}-${data.range.max.max}`
                  : `${data.range.min}-${data.range.max}`}</small>
              </div>
              <button className="btn btn-sm">Detalhe</button>
            </div>
          )
        })}
      </div>

      <div className="indicators-section">
        <h2>Histórico</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[{ time: 'Hoje', value: 72 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

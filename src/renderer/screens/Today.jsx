import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Today() {
  const { state, dispatch, environment } = useContext(AppContext)
  const [mood, setMood] = useState(4)

  useEffect(() => {
    fetchData()
  }, [environment])

  const fetchData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const data = await window.api.getView({ role: 'astronaut', environment })
      dispatch({ type: 'UPDATE_DATA', payload: data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const handleMoodCheckin = async () => {
    try {
      await window.api.checkinMood({
        astronautId: state.user.id,
        value: mood,
        timestamp: new Date().toISOString()
      })
      // Feedback visual, se necessário
    } catch (error) {
      console.error('Error saving mood:', error)
    }
  }

  return (
    <div className="screen-today">
      <div className="today-header">
        <h1>Hoje</h1>
      </div>

      <div className="today-content">
        <div className="section general-status">
          <h2>Estado Geral</h2>
          <div className="status-badge status-normal">Normal</div>
          <p className="status-description">Todos os indicadores dentro dos limites normais</p>
        </div>

        <div className="section alerts">
          <h2>Alertas</h2>
          {state.data.alerts && state.data.alerts.length > 0 ? (
            state.data.alerts.map(alert => (
              <div key={alert.id} className={`alert alert-${alert.severity}`}>
                <span className="alert-icon">⚠️</span>
                <div className="alert-content">
                  <strong>{alert.indicator}</strong>
                  <p>{alert.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-alerts">Sem alertas no momento</p>
          )}
        </div>

        <div className="section next-activity">
          <h2>Próxima Atividade</h2>
          {state.data.appointments && state.data.appointments.length > 0 && (
            <div className="activity-item">
              <span className="activity-icon">🕐</span>
              <div className="activity-content">
                <strong>{state.data.appointments[0].name}</strong>
                <p>{state.data.appointments[0].time}</p>
              </div>
            </div>
          )}
        </div>

        <div className="section mood-checkin">
          <h2>Como você está se sentindo?</h2>
          <div className="mood-slider">
            <input
              type="range"
              min="1"
              max="5"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="mood-range"
            />
            <div className="mood-labels">
              <span>😢</span>
              <span>😕</span>
              <span>😐</span>
              <span>🙂</span>
              <span>😄</span>
            </div>
          </div>
          <button onClick={handleMoodCheckin} className="btn btn-primary">
            Registrar Humor
          </button>
        </div>
      </div>
    </div>
  )
}

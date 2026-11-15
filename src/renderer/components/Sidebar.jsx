import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Sidebar() {
  const { currentScreen, setCurrentScreen, state } = useContext(AppContext)

  const screens = [
    { id: 'today', label: '📅 Hoje' },
    { id: 'health', label: '❤️ Saúde' },
    { id: 'measurements', label: '📊 Medições' },
    { id: 'routine', label: '🏋️ Rotina' },
    { id: 'diary', label: '📝 Diário' }
  ]

  const adminScreens = [
    { id: 'alert-guide', label: '⚠️ Alerta' },
    { id: 'commander', label: '👨‍✈️ Comandante' },
    { id: 'public', label: '🌍 Público' }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>{state.user.name}</h3>
        <p className="role-badge">{state.user.role}</p>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h4>Menu Principal</h4>
          {screens.map(screen => (
            <button
              key={screen.id}
              className={`nav-item ${currentScreen === screen.id ? 'active' : ''}`}
              onClick={() => setCurrentScreen(screen.id)}
            >
              {screen.label}
            </button>
          ))}
        </div>

        <div className="nav-section">
          <h4>Admin</h4>
          {adminScreens.map(screen => (
            <button
              key={screen.id}
              className={`nav-item ${currentScreen === screen.id ? 'active' : ''}`}
              onClick={() => setCurrentScreen(screen.id)}
            >
              {screen.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <p className="version">v0.1.0</p>
        <p className="offline-indicator">🔌 Offline</p>
      </div>
    </div>
  )
}

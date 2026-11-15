import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom/client'
import { AppContext } from './context/AppContext'
import { appReducer, initialState } from './context/reducer'
import Layout from './screens/Layout'
import './styles/index.css'

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [currentScreen, setCurrentScreen] = useState('today')
  const [environment, setEnvironment] = useState('station')
  const [scenario, setScenario] = useState('normal')

  const handleScenarioChange = async (newScenario) => {
    setScenario(newScenario)
    await window.api.setScenario(newScenario)
    dispatch({ type: 'REFRESH_DATA' })
  }

  const handleEnvironmentChange = (newEnv) => {
    setEnvironment(newEnv)
  }

  const contextValue = {
    state,
    dispatch,
    currentScreen,
    setCurrentScreen,
    environment,
    setEnvironment: handleEnvironmentChange,
    scenario,
    setScenario: handleScenarioChange
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Layout />
    </AppContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import VitalsBar from '../components/VitalsBar'
import Sidebar from '../components/Sidebar'
import Today from './Today'
import Health from './Health'
import Measurements from './Measurements'
import Routine from './Routine'
import Diary from './Diary'
import AlertGuide from './AlertGuide'
import Commander from './Commander'
import PublicPanel from './PublicPanel'

export default function Layout() {
  const { currentScreen } = useContext(AppContext)

  const renderScreen = () => {
    switch (currentScreen) {
      case 'today':
        return <Today />
      case 'health':
        return <Health />
      case 'measurements':
        return <Measurements />
      case 'routine':
        return <Routine />
      case 'diary':
        return <Diary />
      case 'alert-guide':
        return <AlertGuide />
      case 'commander':
        return <Commander />
      case 'public':
        return <PublicPanel />
      default:
        return <Today />
    }
  }

  return (
    <div className="layout">
      <VitalsBar />
      <div className="main-content">
        <Sidebar />
        <div className="screen-container">
          {renderScreen()}
        </div>
      </div>
    </div>
  )
}

export const initialState = {
  user: {
    id: 'astronaut-1',
    name: 'Astronauta',
    role: 'astronaut'
  },
  data: {
    indicators: {},
    alerts: [],
    measurements: [],
    vitals: {
      heartRateHistory: [],
      bloodPressureHistory: [],
      sleepHistory: [],
      moodHistory: []
    }
  },
  ui: {
    loading: false,
    error: null
  }
}

export function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    case 'UPDATE_DATA':
      return {
        ...state,
        data: action.payload
      }

    case 'ADD_ALERT':
      return {
        ...state,
        data: {
          ...state.data,
          alerts: [...state.data.alerts, action.payload]
        }
      }

    case 'UPDATE_ALERT':
      return {
        ...state,
        data: {
          ...state.data,
          alerts: state.data.alerts.map(a =>
            a.id === action.payload.id ? { ...a, ...action.payload } : a
          )
        }
      }

    case 'ADD_MEASUREMENT':
      return {
        ...state,
        data: {
          ...state.data,
          measurements: [...state.data.measurements, action.payload]
        }
      }

    case 'SET_LOADING':
      return {
        ...state,
        ui: { ...state.ui, loading: action.payload }
      }

    case 'SET_ERROR':
      return {
        ...state,
        ui: { ...state.ui, error: action.payload }
      }

    case 'REFRESH_DATA':
      return state

    default:
      return state
  }
}

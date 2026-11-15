// RN01: Cada indicador tem faixas por ambiente, em arquivo de configuração e com fonte
// O status é Normal, Atenção ou Crítico

const INDICATOR_RANGES = {
  station: {
    heartRate: { normal: [60, 100], warning: [50, 120], critical: [40, 140], source: 'NASA HRP' },
    bloodPressure: { normal: ['90/60', '140/90'], warning: ['80/55', '150/95'], critical: ['70/50', '160/100'], source: 'NASA HRP' },
    glucose: { normal: [70, 110], warning: [60, 130], critical: [50, 150], source: 'NASA HRP' },
    temperature: { normal: [36.5, 37.5], warning: [36.0, 38.0], critical: [35.5, 38.5], source: 'NASA HRP' },
    sleep: { normal: [7, 9], warning: [6, 10], critical: [5, 11], source: 'NASA HRP' },
    spO2: { normal: [95, 100], warning: [90, 100], critical: [85, 100], source: 'NASA HRP' },
    weight: { normal: [-5, 5], warning: [-7, 7], critical: [-10, 10], source: 'NASA HRP' }
  },
  moon: {
    heartRate: { normal: [65, 110], warning: [55, 130], critical: [45, 150], source: 'NASA Moon Missions' },
    bloodPressure: { normal: ['95/65', '145/95'], warning: ['85/60', '155/100'], critical: ['75/55', '165/105'], source: 'NASA Moon Missions' },
    glucose: { normal: [75, 115], warning: [65, 135], critical: [55, 155], source: 'NASA Moon Missions' },
    temperature: { normal: [36.8, 37.6], warning: [36.3, 38.1], critical: [35.8, 38.6], source: 'NASA Moon Missions' },
    sleep: { normal: [6, 8], warning: [5, 9], critical: [4, 10], source: 'NASA Moon Missions' },
    spO2: { normal: [93, 100], warning: [88, 100], critical: [83, 100], source: 'NASA Moon Missions' },
    weight: { normal: [-7, 7], warning: [-10, 10], critical: [-15, 15], source: 'NASA Moon Missions' }
  },
  mars: {
    heartRate: { normal: [70, 120], warning: [60, 140], critical: [50, 160], source: 'NASA Mars Missions' },
    bloodPressure: { normal: ['100/70', '150/100'], warning: ['90/65', '160/105'], critical: ['80/60', '170/110'], source: 'NASA Mars Missions' },
    glucose: { normal: [80, 120], warning: [70, 140], critical: [60, 160], source: 'NASA Mars Missions' },
    temperature: { normal: [37.0, 37.8], warning: [36.5, 38.3], critical: [36.0, 38.8], source: 'NASA Mars Missions' },
    sleep: { normal: [5, 7], warning: [4, 8], critical: [3, 9], source: 'NASA Mars Missions' },
    spO2: { normal: [90, 100], warning: [85, 100], critical: [80, 100], source: 'NASA Mars Missions' },
    weight: { normal: [-10, 10], warning: [-15, 15], critical: [-20, 20], source: 'NASA Mars Missions' }
  },
  remote: {
    heartRate: { normal: [60, 100], warning: [50, 120], critical: [40, 140], source: 'WHO Guidelines' },
    bloodPressure: { normal: ['90/60', '140/90'], warning: ['80/55', '150/95'], critical: ['70/50', '160/100'], source: 'WHO Guidelines' },
    glucose: { normal: [70, 110], warning: [60, 130], critical: [50, 150], source: 'WHO Guidelines' },
    temperature: { normal: [36.5, 37.5], warning: [36.0, 38.0], critical: [35.5, 38.5], source: 'WHO Guidelines' },
    sleep: { normal: [7, 9], warning: [6, 10], critical: [5, 11], source: 'WHO Guidelines' },
    spO2: { normal: [95, 100], warning: [90, 100], critical: [85, 100], source: 'WHO Guidelines' },
    weight: { normal: [-5, 5], warning: [-7, 7], critical: [-10, 10], source: 'WHO Guidelines' }
  }
}

export function getIndicatorStatus(indicatorKey, value, environment = 'station') {
  const ranges = INDICATOR_RANGES[environment]?.[indicatorKey]
  if (!ranges) return 'unknown'

  const isInRange = (val, range) => {
    if (typeof range === 'string') return true // Para valores não numéricos como PA
    return val >= range[0] && val <= range[1]
  }

  if (isInRange(value, ranges.normal)) return 'normal'
  if (isInRange(value, ranges.warning)) return 'warning'
  if (isInRange(value, ranges.critical)) return 'critical'
  return 'critical'
}

export function getIndicatorRanges(environment = 'station') {
  return INDICATOR_RANGES[environment] || INDICATOR_RANGES.station
}

export function getOverallStatus(indicators, environment = 'station') {
  // RN02: O estado geral é o pior status entre os indicadores
  const statuses = Object.entries(indicators).map(([key, data]) =>
    getIndicatorStatus(key, data.value, environment)
  )

  if (statuses.includes('critical')) return 'critical'
  if (statuses.includes('warning')) return 'warning'
  return 'normal'
}

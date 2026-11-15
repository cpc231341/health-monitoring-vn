import { describe, it, expect } from 'vitest'
import { getIndicatorStatus, getOverallStatus } from './indicators.js'

describe('Indicators Rules (RN01, RN02)', () => {
  describe('getIndicatorStatus', () => {
    it('should return normal for heart rate in normal range', () => {
      const status = getIndicatorStatus('heartRate', 75, 'station')
      expect(status).toBe('normal')
    })

    it('should return warning for heart rate in warning range', () => {
      const status = getIndicatorStatus('heartRate', 55, 'station')
      expect(status).toBe('warning')
    })

    it('should return critical for heart rate in critical range', () => {
      const status = getIndicatorStatus('heartRate', 35, 'station')
      expect(status).toBe('critical')
    })

    it('should handle different environments', () => {
      // In Mars, heart rate 65 might be different from station
      const statusStation = getIndicatorStatus('heartRate', 65, 'station')
      const statusMars = getIndicatorStatus('heartRate', 65, 'mars')
      expect(statusStation).toBe('normal')
      expect(statusMars).toBe('normal')
    })
  })

  describe('getOverallStatus (RN02)', () => {
    it('should return critical if any indicator is critical', () => {
      const indicators = {
        heartRate: { value: 72 },
        bloodPressure: { value: '120/80' },
        glucose: { value: 30 } // critical low
      }
      const status = getOverallStatus(indicators, 'station')
      expect(status).toBe('critical')
    })

    it('should return warning if any indicator is warning (no critical)', () => {
      const indicators = {
        heartRate: { value: 72 },
        bloodPressure: { value: '120/80' },
        glucose: { value: 65 } // warning low
      }
      const status = getOverallStatus(indicators, 'station')
      expect(status).toBe('warning')
    })

    it('should return normal if all indicators are normal', () => {
      const indicators = {
        heartRate: { value: 72 },
        bloodPressure: { value: '120/80' },
        glucose: { value: 95 }
      }
      const status = getOverallStatus(indicators, 'station')
      expect(status).toBe('normal')
    })
  })
})

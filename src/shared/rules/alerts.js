// RN03: Atenção: 3 leituras seguidas fora da faixa
// RN03: Crítico: pede re-medição imediata antes de escalar, salvo sintomas graves
// RN04: Atenção só registra e monitora. Crítico notifica comandante e médico de voo

export function evaluateAlert(readings, indicator, threshold = 3) {
  if (readings.length < threshold) return null

  const recentReadings = readings.slice(-threshold)
  const allOutOfRange = recentReadings.every(r => r.status !== 'normal')

  if (allOutOfRange && recentReadings[recentReadings.length - 1].status === 'critical') {
    return {
      type: 'CRITICAL',
      action: 'REMEASURE_REQUIRED',
      severity: 'high'
    }
  }

  if (allOutOfRange) {
    return {
      type: 'ATTENTION',
      action: 'MONITOR',
      severity: 'medium'
    }
  }

  return null
}

export function createAlert(indicator, severity, message) {
  return {
    id: `${Date.now()}-${Math.random()}`,
    indicator,
    severity,
    message,
    state: 'open',
    timestamp: new Date().toISOString(),
    actionRequired: severity === 'critical',
    escalated: false
  }
}

export function shouldNotifyCommander(alert, environment = 'station') {
  // RN04: Crítico notifica comandante e médico de voo
  // RN05: Comunicação com a Terra depende do ambiente

  if (alert.severity !== 'critical') return false

  if (environment === 'mars') {
    // Em Marte, o guia local é obrigatório (RN05)
    return true // Registra para comunicação assíncrona
  }

  return true
}

export function getAlertGuidance(indicator, severity) {
  const guidance = {
    heartRate: {
      high: [
        'Meça novamente a frequência cardíaca após 5 minutos em repouso',
        'Registre qualquer sintoma como tontura, cansaço ou falta de ar',
        'Consulte o protocolo de taquicardia no painel de ações',
        'Se a frequência permanecer acima de 120, escale para o comandante'
      ],
      low: [
        'Meça novamente após descanso de 10 minutos',
        'Registre se sente tontura ou falta de energia',
        'Se permanecer abaixo de 50, comunique imediatamente'
      ]
    },
    bloodPressure: {
      high: [
        'Descanse por 10 minutos em posição sentada ou deitada',
        'Meça novamente a pressão',
        'Registre qualquer sintoma como dor de cabeça ou visão borrada',
        'Se permanecer elevada, não realize atividades extraveiculares'
      ],
      low: [
        'Beba água e aumente a ingestão de sal (sob orientação)',
        'Meça novamente em 15 minutos',
        'Se permanecer baixa, descanse e monitore constantemente'
      ]
    },
    glucose: {
      high: [
        'Registre sua última refeição e o que comeu',
        'Reduza o consumo de carboidratos simples nas próximas horas',
        'Meça novamente em 2 horas',
        'Beba água filtrada'
      ],
      low: [
        'Consuma algo com carboidrato imediatamente (suco, fruta)',
        'Meça novamente em 15 minutos',
        'Se ainda estiver baixa, avise o comandante'
      ]
    },
    temperature: {
      high: [
        'Descanse em local fresco',
        'Aumente a ingestão de líquidos',
        'Coloque uma toalha úmida na testa',
        'Se passar de 38.5°C, comunique imediatamente'
      ],
      low: [
        'Aqueça-se: use roupas extras e um cobertor',
        'Beba bebida quente',
        'Meça novamente em 30 minutos',
        'Se permanecer abaixo de 36°C, avise'
      ]
    }
  }

  return guidance[indicator]?.[severity] || [
    'Registre o evento',
    'Meça novamente em breve',
    'Monitore sua saúde'
  ]
}

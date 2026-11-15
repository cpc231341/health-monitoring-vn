export class PrivacyPolicy {
  // Níveis de privacidade: pessoal, comandante, público

  filter(data, role) {
    switch (role) {
      case 'astronaut':
        return this.filterForAstronaut(data)
      case 'commander':
        return this.filterForCommander(data)
      case 'public':
        return this.filterForPublic(data)
      default:
        return {}
    }
  }

  filterForAstronaut(data) {
    // Astronauta vê seus próprios dados pessoais + públicos
    return {
      personal: data.personal || {},
      public: data.public || {},
      indicators: data.indicators || []
    }
  }

  filterForCommander(data) {
    // Comandante vê resumos e alertas, mas não dados pessoais em detalhe
    return {
      summaries: this.summarizePersonalData(data.personal),
      alerts: data.alerts || [],
      crewStatus: data.crewStatus || {},
      public: data.public || {}
    }
  }

  filterForPublic(data) {
    // Público vê apenas dados públicos agregados
    return {
      radiation: data.public?.radiation || null,
      cabineAir: data.public?.cabineAir || null,
      crewClimate: data.public?.crewClimate || null,
      collectiveGoals: data.public?.collectiveGoals || []
    }
  }

  summarizePersonalData(personalData) {
    if (!personalData) return {}

    return {
      measurements: {
        heartRate: personalData.measurements?.heartRate?.latest,
        bloodPressure: personalData.measurements?.bloodPressure?.latest,
        glucose: personalData.measurements?.glucose?.latest,
        temperature: personalData.measurements?.temperature?.latest,
        sleep: personalData.measurements?.sleep?.latest,
        weight: personalData.measurements?.weight?.latest
      },
      alerts: personalData.alerts || []
    }
  }

  filterDiary(entries, viewerAstronautId, authorAstronautId) {
    // Diário é sempre pessoal - apenas o astronauta autor vê
    if (viewerAstronautId === authorAstronautId) {
      return entries
    }
    return []
  }

  filterAccessLog(accesses, astronautId) {
    // Astronauta vê quem acessou seus dados
    return accesses.filter(access => access.targetAstronautId === astronautId)
  }
}

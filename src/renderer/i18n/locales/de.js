// Deutsch. Dieselben Schlüssel wie in pt.js.
export default {
  lang: { label: 'Sprache' },
  brand: { logoAlt: 'Logo des Teams Vento Norte UEA', byline: 'von Vento Norte UEA' },
  status: { ok: 'Normal', warn: 'Achtung', crit: 'Kritisch' },
  time: {
    hm: '{h} Std. {m} Min.',
    day: 'Tag {n}',
    dayHour: 'Tag {n} · {time}',
    now: 'jetzt',
    yesterday: 'gestern {time}',
    daysAgo7: 'vor 7 Tagen',
    today: 'heute',
    hoursAgo24: 'vor 24 Std.'
  },
  src: { manual: 'Manuell', ring: 'Ring', ringManual: 'Ring + manuell', you: 'Du' },
  when: { ring: 'vor 4 Min.', yPa: 'gestern 19:40', wake: 'beim Aufwachen', yGl: 'gestern 07:35', yHu: 'gestern 21:40' },
  nav: {
    aria: 'App-Navigation',
    missionOpen: 'Missionsinformationen öffnen',
    patchAlt: 'Abzeichen des Teams {name}',
    team: 'Team',
    myDay: 'Mein Tag',
    teamSection: 'Team',
    today: 'Heute',
    indicators: 'Messwerte',
    measure: 'Jetzt messen',
    diary: 'Bordbuch',
    routine: 'Routine und Training',
    achievements: 'Erfolge',
    commander: 'Kapitänspanel',
    crewPanel: 'Crew-Panel',
    switchCrew: 'Crewmitglied wechseln',
    personalView: 'persönliche Ansicht',
    agenda: 'Heutiger Plan',
    recommendation: 'Empfehlung',
    collapse: 'Menü einklappen',
    expand: 'Menü ausklappen'
  },
  team: { missionId: 'Missions-ID: #102' },
  crew: {
    cristiano: { role: 'Kapitän', activity: 'Materialexperiment' },
    'luis-felipe': { role: 'Missionsspezialist', activity: 'Ausdauertraining' },
    mike: { role: 'Missionsspezialist', activity: 'Besprechung mit der Basis', until: 'bis 09:30' },
    ruan: { role: 'Pilot', activity: 'Außenbordeinsatz', until: 'zurück 15:30' },
    rita: { role: 'Missionsspezialistin', activity: 'Wartung des Luftfilters' },
    photoOf: 'Foto von {name}',
    captain: 'KAPITÄN',
    captainLabel: 'Kapitän',
    sex: { f: 'Weiblich', m: 'Männlich' }
  },
  pickTeam: {
    title: 'Team auswählen',
    label: 'Team',
    choose: 'Team auswählen',
    listAria: 'Teams',
    crewCount: '{n} Crewmitglieder',
    newTeam: 'Neue Mission',
    form: {
      title: 'Mission erstellen',
      teamName: 'Teamname',
      missionId: 'Missions-ID',
      days: 'Missionsdauer (Tage)',
      daysHint: 'Pflichtfeld. Gib eine ganze Zahl von Tagen größer als null ein.',
      daysError: 'Gib die Missionsdauer in Tagen an (ganze Zahl größer als null).',
      required: 'Pflichtfeld',
      cancel: 'Abbrechen',
      created: 'Mission {id} für Team {team} erstellt: {days} Tage. Die Besatzungsregistrierung folgt in einem späteren Bildschirm.'
    },
    missionLine: '{id} · {days} Tage'
  },
  pickCrew: { switchTeam: 'Team wechseln', who: 'Wer bist du?', team: 'Team' },
  mission: {
    label: 'MISSION',
    close: 'Schließen',
    tagline: 'Eine App, mit der Astronauten ihre eigene Gesundheit messen, verstehen und danach handeln können, auch wenn die Erde zu weit weg ist, um zu antworten.',
    patchAlt: 'Abzeichen {name} des Teams {org}, {label}',
    facts: { team: 'Team', patch: 'Abzeichen', challenge: 'Mission', crew: 'Crew', missionId: 'Missions-ID' },
    challengeValue: '7. Ausgabe der Latin American Space Challenge (LASC 2026)',
    footer: 'Erstellt vom Team Vento Norte UEA. Dies ist ein Prototyp für die Aufgabe „Software zur Gesundheitsüberwachung von Astronauten auf Weltraummissionen entwickeln“ beim Hackathon NASA Space Apps Challenge 2026, ohne offizielle Verbindung zur NASA oder zur AEB. Personen, Werte und Messwerte wurden aus Daten spezialisierter Bibliotheken erzeugt (z. B. NeuroKit2 und die KI von Claude Code).',
    missionIdValue: '#102 · Tag {day}',
    teamDesc: 'Erstes universitäres Team für Modell- und Hochleistungsraketen (High Power Rocketry) im Bundesstaat Amazonas und in der Region Nord Brasiliens'
  },
  link: {
    title: 'Verbindung zur Erde',
    close: 'Schließen',
    openAria: 'Verbindung zur Erde: {status}',
    lastSent: 'Letzte Übertragung: vor {ago} · Die Übertragungsbestätigung an die Basis erfolgt innerhalb von 12min',
    lastSentOffline: 'Letzte Übertragung: vor {ago}',
    sendNow: 'Jetzt senden',
    demoState: 'Demomodus · Zustand',
    stateAria: 'Verbindungsstatus',
    states: {
      online: {
        label: 'Mit Basis verbunden · 1 s Verzögerung',
        name: 'Verbunden',
        flow: 'Die Daten gehen normal an die Basis.'
      },
      lag: {
        label: 'Mit Basis verbunden · 12 Min. Verzögerung',
        name: 'Lange Verzögerung',
        flow: 'Die Daten erreichen die Basis mit 12 Min. Verzögerung.'
      },
      off: { label: 'Kein Kontakt zur Erde', name: 'Kein Kontakt', flow: 'Derzeit erreichen keine Daten die Basis.' },
      send: {
        label: 'Daten werden an die Basis gesendet',
        name: 'Senden',
        flow: 'Das Signal ist zurück und die Daten werden gesendet.'
      },
      warn: {
        label: 'Seit 6 h kein Kontakt zur Erde',
        name: 'Kein Kontakt seit 6 h',
        flow: 'Seit 6 h erreichen keine Daten die Basis. Die Besatzung wurde benachrichtigt.'
      }
    }
  },
  soon: {
    heading: 'Diese Ansicht wurde noch nicht gebaut',
    back: 'Zurück zu Heute',
    sub: 'Team {name}',
    pages: {
      medir: {
        title: 'Jetzt messen',
        desc: 'Eine manuelle Messung (Blutdruck, Glukose, Temperatur) erfassen oder den Ring auslesen, mit dem Bereich jedes Messwerts.'
      },
      comandante: {
        title: 'Kapitänspanel',
        desc: 'Zustand jedes Crewmitglieds, ohne persönliche Werte, um gemeinsam mit dem Team zu entscheiden.'
      }
    }
  },
  names: {
    pa: 'Blutdruck',
    fc: 'Herzfrequenz',
    gl: 'Glukose',
    tc: 'Temperatur',
    sn: 'Schlaf',
    hu: 'Stimmung',
    o2: 'Sauerstoffsättigung',
    rad: 'Strahlung'
  },
  cards: {
    pa: { name: 'Blutdruck' },
    fc: { name: 'Ruhepuls' },
    gl: { name: 'Nüchternglukose' },
    tc: { name: 'Körpertemperatur' },
    sn: { name: 'Schlafstunden' },
    hu: { name: 'Stimmungsniveau' },
    o2: { name: 'Sauerstoffsättigung (SpO₂)', short: 'Sauerstoff (SpO₂)' },
    kg: { name: 'Körpergewicht' },
    rad: { name: 'Strahlung des Tages', short: 'Strahlung' },
    ring: { name: 'Smarter Ring' },
    alim: { name: 'Ernährung' }
  },
  scenarios: { comum: 'Normaler Tag', febre: 'Fieber', hipoxia: 'Hypoxie', estresse: 'Stress', radiacao: 'Strahlung' },
  environments: {
    estacao: {
      label: 'Station',
      name: 'Raumstation',
      g: 'Schwerelosigkeit (etwa 0 g)',
      delay: 'Unter 1 s',
      light: '16 Sonnenaufgänge pro Tag',
      note: 'Das tägliche Krafttraining hilft, Muskeln und Knochen zu schützen. Halte dich beim Blutdruckmessen an der Halterung fest.'
    },
    lua: {
      label: 'Mond',
      name: 'Mondoberfläche',
      g: '1/6 der Erdschwerkraft',
      delay: 'Etwa 2,6 s, hin und zurück',
      light: 'Mondtag von etwa 29,5 Tagen',
      note: 'Bei geringer Schwerkraft braucht das Training zusätzliche Last. Der feine Staub erfordert Vorsicht für Augen und Atemwege.'
    },
    marte: {
      label: 'Mars',
      name: 'Marsoberfläche',
      g: '0,38 der Erdschwerkraft',
      delay: '3 bis 22 Min., nur einfache Strecke',
      light: 'Sol von 24 Std. 39 Min.',
      note: 'Der Marstag ist 39 Min. länger: Die Missionsuhr folgt diesem Rhythmus, damit der Schlaf nicht verrutscht. Ohne Erde in Echtzeit entscheide mit der Empfehlung.'
    },
    terra: {
      label: 'Abgelegene Erde',
      name: 'Abgelegene Gemeinde auf der Erde',
      g: 'Normale Schwerkraft (1 g)',
      delay: 'Satellit, unterbrochen',
      light: 'Normaler 24-Std.-Zyklus',
      note: 'Ohne Fachleute in der Nähe leitet die Empfehlung die Erstversorgung an, und die Zusammenfassung geht an das Gesundheitsteam, sobald ein Signal besteht.'
    }
  },
  agenda: {
    sync: 'Ring synchronisieren',
    cafe: 'Frühstück',
    almoco: 'Mittagessen',
    treino: 'Krafttraining',
    diario: 'Bordbuch',
    sono: 'Schlafenszeit',
    medpa: 'Blutdruck messen',
    medgl: 'Nüchternglukose messen',
    medkg: 'Gewicht (Masse) messen'
  },
  today: {
    greeting: 'Guten Morgen, {name}',
    signalsAria: 'Signalleiste',
    signalTitle: '{name}: {value}, {status}',
    demo: 'Demomodus',
    scenario: 'Szenario',
    environment: 'Umgebung',
    editHint: 'Am Griff ziehen zum Verschieben, den rechten Rand ziehen für die Breite oder archivieren, was du nicht brauchst.',
    restore: 'Standard wiederherstellen',
    finish: 'Fertig',
    customize: 'Anpassen',
    addToPanel: 'Zum Panel hinzufügen',
    indicatorsAria: 'Messwerte',
    normal: 'Normal: {range}',
    trend: 'Verlauf von {name} in den letzten 7 Tagen, letzter Wert {value}',
    dragMove: 'Zum Verschieben ziehen',
    archiveCard: 'Karte archivieren',
    archive: 'Archivieren',
    resize: 'Zum Ändern der Breite ziehen',
    agenda: 'Tagesplan',
    agendaDone: '{done} von {total} erledigt',
    open: 'Öffnen',
    markDone: 'Als erledigt markieren: {title}',
    envTitle: 'Umgebung: {name}',
    gravity: 'Schwerkraft',
    comms: 'Kommunikation',
    light: 'Lichtzyklus',
    normalRad: 'Normale Strahlung',
    radUnit: 'mSv/Tag',
    illustrative: 'Beispielwerte, vor jeder echten Anwendung mit offiziellen Quellen zu prüfen.',
    ranges: {
      pa: '90–119 / 60–79',
      fc: '50–95 in Ruhe',
      gl: '70–99 nüchtern',
      tc: '36,1–37,5',
      sn: '7–9 Std.',
      hu: '3 bis 5'
    },
    units: { sn: 'diese Nacht', hu: 'von 5', o2: '%', kg: 'kg', ring: 'Akku' },
    o2Cap: 'Ring · nachts',
    kgCap: 'Basiswert 74,0 kg · +0,3%',
    radCapHigh: 'Das {x}-Fache des Normalwerts der Umgebung',
    radCapOk: 'Im Normalbereich der Umgebung',
    ringCap: 'Vor 4 Min. synchronisiert · seit 31 Std. getragen',
    ringChip: 'Verbunden',
    details: {
      sync: 'Ring verbunden · Akku 78%',
      med: 'Angeleitete manuelle Messung, sitzend und in Ruhe',
      cafe: 'Zeit zum Essen. Trage es im Bordbuch ein.',
      almoco: 'Zeit zum Essen. Trage es im Bordbuch ein.',
      treinoCrit: 'Heute ausgesetzt: Ein Messwert ist kritisch. Ruhe dich aus und folge der Empfehlung.',
      treinoShort: 'Empfohlener Umfang: 3 × 7 (30% weniger wegen Schlaf oder Stimmung)',
      treinoFull: 'Empfohlener Umfang: 3 × 10, volle Last',
      diario: 'Stimmung, Mahlzeiten und Symptome des Tages',
      sono: 'Ziel: 7 Std. 30 Min. Gedämpftes Licht ab 21:30.',
      medgl: 'Nüchtern, vor dem Frühstück',
      medkg: 'Zur gewohnten Zeit, vor dem Essen'
    },
    alert: {
      contact: 'Kontakt zur Erde: {delay}.',
      guide: 'Empfehlung öffnen',
      cabin: 'Kabinenpanel ansehen',
      seeWhat: 'Ansehen, was zu tun ist',
      tcTitle: 'Temperatur bei {value} °C',
      tcText: 'Mit dem Bordthermometer bestätigen. Die Empfehlung erklärt, was jetzt zu tun ist.',
      o2Title: 'Niedrige Sauerstoffsättigung: {value}%',
      o2Text: 'Setze dich, atme tief durch und prüfe den Sitz des Sensors. Bleibt der Wert unter 92%, folge dem Protokoll.',
      radTitle: 'Strahlung: das {x}-Fache des Normalwerts',
      radText: 'Mögliches Sonnenpartikel-Ereignis. Begib dich in den Schutzbereich und warte auf Anweisungen.',
      critTitle: '{name} kritisch',
      critText: 'Messung wiederholen und der Empfehlung folgen.',
      warnOne: '{name} braucht Aufmerksamkeit',
      warnMany: '{n} Messwerte brauchen Aufmerksamkeit',
      warnSleep: 'Du hast {value} geschlafen. Das heutige Training wird um 30% gekürzt, um die Erholung zu schützen.',
      warnText: 'Außerhalb des Normalbereichs. Sieh nach, was zu tun ist.'
    },
    mock: {
      label: 'Beispieldaten',
      on: 'An',
      off: 'Aus',
      note: '3 Wochen Besatzungsverlauf, nur für die Demo. Es wird nichts auf die Festplatte geschrieben.'
    }
  },
  ind: {
    title: 'Messwerte',
    sub: 'Verlauf, Bedeutung und Handlungsempfehlung, ein Messwert nach dem anderen.',
    ringSync: 'Ring vor 4 Min. synchronisiert',
    pickAria: 'Messwert auswählen',
    periodAria: 'Zeitraum',
    legendAria: 'Legende',
    ranges: { '24h': '24 Stunden', '7d': '7 Tage', '30d': '30 Tage' },
    systolic: 'Systolisch',
    diastolic: 'Diastolisch',
    normalBand: 'Normalbereich',
    outBand: 'Außerhalb des Bereichs',
    stat: { avg: 'Durchschnitt', min: 'Niedrigster', max: 'Höchster', out: 'Außerhalb des Bereichs' },
    outOf: '{a} von {b}',
    wave: {
      title: 'Wellenform des Rings',
      simulated: 'SIMULIERT',
      ppg: 'Puls (PPG), 6 Sekunden',
      ecg: 'Elektrokardiogramm (EKG), 6 Sekunden',
      ppgAlt: 'Simulierte Pulswelle mit regelmäßigen Schlägen',
      ecgAlt: 'Simulierte EKG-Kurve mit regelmäßigen QRS-Komplexen',
      note: 'Für die Demo per Simulation erzeugte Signale. Der Ring misst den Puls (PPG); das EKG käme von einem zusätzlichen Sensor, der noch festzulegen ist.'
    },
    howTitle: 'So wird gemessen',
    whyTitle: 'Warum das wichtig ist',
    lastValue: 'Letzter Wert',
    normalLabel: 'Referenzwert',
    measurement: 'Messung',
    baseline: 'Dein Basiswert',
    whatToDo: 'Empfehlung',
    disclaimer: 'Bereiche, Grenzwerte und Hinweise sind beispielhaft und müssen vor jeder echten Anwendung vom medizinischen Team der Mission geprüft werden. Die App stellt keine Diagnosen.',
    per: {
      h24: 'letzte 24 Std. · alle 30 Min.',
      d7manual: 'letzte 7 Tage · {per}',
      d7: 'letzte 7 Tage · alle 2 Std.',
      d30manual: 'letzte 30 Tage · {per}',
      d30: 'letzte 30 Tage · Tagesdurchschnitt'
    },
    alt: 'Diagramm {name}, {range}. Letzter Wert {value} {unit}, {status}. Durchschnitt {avg}, niedrigster {min}, höchster {max}, {out} von {n} außerhalb des Normalbereichs.',
    pa: {
      name: 'Blutdruck',
      short: 'Blutdruck',
      unit: 'mmHg',
      axis: 'mmHg',
      bands: ['Systolisch normal', 'Diastolisch normal'],
      range: '90–119 / 60–79',
      base: '116/75',
      per: 'eine Messung pro Tag',
      msg: {
        ok: 'Im Normalbereich.',
        warn: 'Außerhalb des Normalbereichs. Wiederhole die Messung in Ruhe.',
        crit: 'Außerhalb des sicheren Grenzwerts. Bestätigen und den Kapitän informieren.'
      },
      why: [
        'Der Blutdruck zeigt, wie stark das Herz beim Pumpen des Bluts arbeiten muss. In der Schwerelosigkeit verlagern sich die Körperflüssigkeiten nach oben, und das kann den Blutdruck beeinflussen.'
      ],
      how: [
        'Setze dich mit gestütztem Rücken und festen Füßen. Auf der Station die Füße an der Halterung fixieren.',
        'Ruhe dich 5 Minuten lang schweigend aus.',
        'Lege die Manschette auf Herzhöhe am Arm an.',
        'Miss 2-mal im Abstand von 1 Minute. Die App speichert den Mittelwert.'
      ],
      acts: [
        { rule: '90–119 / 60–79', text: 'Folge der Routine und miss morgen zur selben Zeit erneut.' },
        {
          rule: '120–139 / 80–89 oder unter 90/60',
          text: 'Wiederhole nach 5 Minuten im Sitzen. Meide heute Koffein und Salz und notiere im Bordbuch, wie du dich fühlst.'
        },
        {
          rule: '140/90 oder mehr, oder unter 80/50',
          text: 'Unterbrich die Aktivität und setze dich. Wiederhole nach 5 Minuten. Bei Bestätigung den Kapitän informieren. Bei Brustschmerzen, Atemnot oder Schwindel sofort Hilfe rufen.'
        }
      ],
      cta: 'Jetzt Blutdruck messen'
    },
    fc: {
      name: 'Ruhepuls',
      short: 'Ruhepuls',
      unit: 'bpm',
      axis: 'bpm',
      bands: ['Normaler Ruhebereich'],
      range: '50–95 bpm in Ruhe',
      base: '60 bpm',
      per: 'vom Ring gemessen',
      msg: {
        ok: 'Im Ruhebereich.',
        warn: 'Außerhalb des Ruhebereichs. Setze dich und atme langsam.',
        crit: 'Weit außerhalb des Bereichs. Stoppe und prüfe den Puls.'
      },
      why: [
        'Die Ruheherzfrequenz zeigt, wie sich das Herz anpasst. Ein Anstieg ohne Anstrengung kann auf Stress, Fieber, Flüssigkeitsmangel oder Müdigkeit hinweisen.',
        'Der Ring misst den ganzen Tag. Entscheidend ist die Ruhe: sitzend und mindestens 15 Minuten ohne Training.'
      ],
      how: [
        'Trage den Ring eng am Finger, ohne Spiel.',
        'Synchronisiere beim Aufwachen und vor dem Schlafen.',
        'Für einen Ruhewert sitze 5 Minuten schweigend, bevor du auf den Bildschirm schaust.'
      ],
      acts: [
        { rule: '50–95 bpm in Ruhe', text: 'Alles in Ordnung. Folge dem Training und der Tagesroutine.' },
        {
          rule: '96–110 oder 40–49 bpm in Ruhe',
          text: 'Setze dich und atme 5 Minuten langsam. Denke an kürzliche Anstrengung, Koffein oder Stress. Hält es an, miss den Blutdruck.'
        },
        {
          rule: 'Über 110 oder unter 40 bpm in Ruhe',
          text: 'Höre auf, was du tust, und setze dich. Prüfe den Puls am Handgelenk 1 Minute lang und informiere den Kapitän. Bei Brustschmerzen, Ohnmacht oder Atemnot sofort Hilfe rufen.'
        }
      ],
      cta: 'Festhalten, wie ich mich fühle'
    },
    gl: {
      name: 'Nüchternglukose',
      short: 'Glukose',
      unit: 'mg/dL',
      axis: 'mg/dL',
      bands: ['Normaler Nüchternbereich'],
      range: '70–99 mg/dL nüchtern',
      base: '94 mg/dL',
      per: 'eine Messung pro Tag, nüchtern',
      msg: {
        ok: 'Im Nüchternbereich.',
        warn: 'Außerhalb des Bereichs. Wiederhole morgen nüchtern.',
        crit: 'Außerhalb des sicheren Grenzwerts. Miss jetzt erneut.'
      },
      why: [
        'Glukose ist der Treibstoff des Körpers. Bei einer Mission können Stress, kurzer Schlaf und Ernährungsumstellungen den Wert steigen oder fallen lassen.',
        'Die Nüchternmessung lässt sich von einem Tag zum nächsten am leichtesten vergleichen.'
      ],
      how: [
        'Bleibe 8 Stunden ohne Essen, nur mit Wasser.',
        'Wasche und trockne die Hände.',
        'Steche seitlich in die Fingerkuppe und halte den Tropfen an den Teststreifen des Messgeräts.',
        'Notiere den Wert. Die App speichert Datum und Uhrzeit.'
      ],
      acts: [
        { rule: '70–99 mg/dL nüchtern', text: 'Folge der Routine. Miss morgen wieder nüchtern.' },
        {
          rule: '100–125 oder 54–69 mg/dL',
          text: 'Wiederhole die Messung. Unter 70: 15 g schnell wirkenden Zucker essen und nach 15 Minuten erneut messen. Über 100: letzte Mahlzeit im Bordbuch notieren.'
        },
        {
          rule: '126 mg/dL oder mehr, oder unter 54',
          text: 'Miss jetzt erneut. Unter 54: 15 g schnell wirkenden Zucker essen, ruhig bleiben und den Kapitän informieren. Über 126 bestätigt: das medizinische Team informieren.'
        }
      ],
      cta: 'Jetzt Glukose messen'
    },
    tc: {
      name: 'Körpertemperatur',
      short: 'Temperatur',
      unit: '°C',
      axis: '°C',
      bands: ['Normalbereich'],
      range: '36,1–37,5 °C',
      base: '36,6 °C',
      per: 'vom Ring geschätzt',
      msg: {
        ok: 'Im Normalbereich.',
        warn: 'Leicht außerhalb des Bereichs. Mit dem Thermometer bestätigen.',
        crit: 'Mögliches Fieber. Bestätigen und der Empfehlung folgen.'
      },
      why: [
        'Die Temperatur steigt bei Infektion, Anstrengung und Stress. In der Schwerelosigkeit gibt der Körper Wärme anders ab, deshalb hilft der Verlauf mehr als ein einzelner Wert.',
        'Der Ring schätzt die Hauttemperatur. Liegt sie über dem Normalwert, bestätige sie mit dem Bordthermometer.'
      ],
      how: [
        'Der Ring schätzt die Hauttemperatur, tagsüber und nachts.',
        'Verlässt der Wert den Bereich, warte 15 Minuten nach Training oder Duschen.',
        'Miss mit dem Bordthermometer am Ohr oder an der Stirn.',
        'Trage den Wert ein. Die App vergleicht ihn mit der Schätzung des Rings.'
      ],
      acts: [
        { rule: '36,1–37,5 °C', text: 'Folge der Routine und trinke über den Tag verteilt Wasser.' },
        {
          rule: '37,6–37,9 °C oder 35,0–36,0 °C',
          text: 'Mit dem Bordthermometer bestätigen. Trinke genug, ruhe dich aus und miss nach 1 Stunde erneut.'
        },
        {
          rule: '38,0 °C oder mehr, oder unter 35,0 °C',
          text: 'Mit dem Thermometer bestätigen. Bei Fieber Abstand zu anderen halten und den Kapitän informieren. Dem Infektionsprotokoll an Bord folgen.'
        }
      ],
      cta: 'Jetzt Temperatur messen'
    },
    sn: {
      name: 'Schlafstunden',
      short: 'Schlafstunden',
      unit: 'diese Nacht',
      axis: 'Stunden pro Nacht',
      bands: ['Normalbereich'],
      range: '7 bis 9 Std. pro Nacht',
      base: '7 Std. 20 Min.',
      per: 'eine Nacht pro Balken',
      msg: {
        ok: 'Gute Nachtruhe.',
        warn: 'Kurze Nacht. Das heutige Training wird um 30% gekürzt.',
        crit: 'Sehr kurzer Schlaf. Leichtes Training und keine riskanten Aufgaben.'
      },
      why: [
        'Weniger als 7 Stunden Schlaf pro Nacht verschlechtern Aufmerksamkeit und Erholung. Bei einer Mission wirkt sich das auf riskante Aufgaben aus.',
        'Der Ring erfasst den Schlaf automatisch. Gedämpftes Licht am Abend und feste Zeiten unterstützen die innere Uhr.'
      ],
      how: [
        'Trage den Ring nachts, eng am Finger.',
        'Synchronisiere beim Aufwachen. Die App zeigt die Gesamtstunden.',
        'Ab 21:30 das Licht dämpfen und Bildschirme meiden.'
      ],
      acts: [
        { rule: '7 bis 9 Std.', text: 'Behalte den Rhythmus bei. Heute normales Training.' },
        {
          rule: '5 Std. bis 6 Std. 59 Min., oder mehr als 9 Std.',
          text: 'Das heutige Training wird um 30% gekürzt. Meide Koffein nach 14:00 und mache bei Bedarf ein Nickerchen von bis zu 20 Minuten.'
        },
        {
          rule: 'Weniger als 5 Std.',
          text: 'Leichtes Training und keine riskanten Aufgaben wie ein Außenbordeinsatz. Informiere den Kapitän und plane Ruhe ein.'
        }
      ],
      cta: 'Heutiges Training anpassen'
    },
    hu: {
      name: 'Stimmungsniveau',
      short: 'Stimmung',
      unit: 'von 5',
      axis: 'Note von 1 bis 5',
      bands: ['Normalbereich'],
      range: 'Note 3 bis 5',
      base: 'Note 4',
      per: 'ein Eintrag pro Tag',
      msg: {
        ok: 'Stabile Stimmung.',
        warn: 'Niedrige Stimmung. Sprich mit jemandem.',
        crit: 'Sehr niedrige Stimmung. Suche heute Unterstützung.'
      },
      why: [
        'Die Stimmung ändert sich, bevor andere Anzeichen von Müdigkeit und Stress auftreten. Täglich festzuhalten hilft, den Verlauf zu erkennen.',
        'Der Eintrag gehört nur dir. Du entscheidest, ob du die Stimmung mit dem Team teilst.'
      ],
      how: [
        'Frage dich: Wie war mein Tag?',
        'Wähle im Bordbuch von 1 (sehr schlecht) bis 5 (sehr gut).',
        'Wenn du möchtest, schreibe eine Notiz. Sie bleibt nur bei dir.'
      ],
      acts: [
        { rule: 'Note 3 bis 5', text: 'Folge der Routine. Trage morgen wieder ein.' },
        {
          rule: 'Note 2',
          text: 'Sprich mit jemandem im Team oder schreibe ins Bordbuch. Mache 15 Minuten Pause an einem hellen Ort.'
        },
        {
          rule: 'Note 1',
          text: 'Sprich noch heute mit einer Vertrauensperson. Wenn du möchtest, fordert der Kapitän psychologische Unterstützung von der Erde an.'
        }
      ],
      cta: 'Ins Bordbuch schreiben'
    },
    openRecommendation: 'Schritt für Schritt öffnen',
    infoOpen: 'Warum {name} wichtig ist'
  },
  panel: {
    title: 'Crew-Panel',
    eva: 'EVA',
    nowLabel: 'jetzt',
    whoTitle: 'Wer macht gerade was',
    whoSub: 'Aktivität jeder Person im Moment, ohne Gesundheitsdaten.',
    avgTitle: 'Teamdurchschnitte',
    avgSub: 'Durchschnitt von {n} Personen, ohne Namen.',
    sensorsTitle: 'Kabinensensoren',
    sensorsSub: 'Luft, Temperatur und Strahlung der gemeinsamen Umgebung.',
    goalsTitle: 'Teamziele',
    goalsSub: 'Was die Crew gemeinsam aufbaut.',
    tileAria: '{title}: {value} {unit}, {foot}',
    goalOf: 'von {total} {unit}',
    goalAria: '{pct}% des Ziels',
    footnote: 'Dieses Panel zeigt Aktivitäten, Kabinensensoren und Durchschnitte von 3 oder mehr Personen. Die Gesundheitswerte jeder Person bleiben nur in deren eigener Heute-Ansicht, und der Kapitän sieht nur den Zustand. Simulierte Daten, Beispielbereiche, mit offiziellen Quellen zu prüfen.',
    avg: {
      sleep: { title: 'Durchschnittlicher Schlaf', unit: 'pro Nacht', foot: 'Teamziel: 7 Std. oder mehr · letzte 7 Tage' },
      mood: { title: 'Durchschnittliche Stimmung', unit: 'von 5', foot: 'Durchschnitt von {n} Personen · ohne Namen' },
      train: {
        title: 'Teamtraining',
        value: '{done} von {n}',
        unit: 'haben heute trainiert',
        foot: 'Kraft- und Ausdauertraining'
      }
    },
    sensors: {
      radiation: { title: 'Strahlung', unit: 'mSv/Tag', foot: 'Normal auf der Station: 0,4 bis 0,8' },
      co2: { title: 'CO₂', unit: 'ppm', foot: 'Beispielbereich: 2.000 bis 3.600' },
      temp: { title: 'Temperatur', unit: '°C', foot: 'Normal: 20 bis 25' },
      humidity: { title: 'Luftfeuchtigkeit', unit: '%', foot: 'Über 60 seit 18:10 · Filter in Wartung' },
      pressure: { title: 'Druck', unit: 'kPa', foot: 'Normal: 99 bis 103' }
    },
    goals: {
      training: { title: 'Teamtrainings in der Woche', unit: 'Einheiten', note: 'Noch 7 Einheiten bis Sonntag.' },
      mood: {
        title: 'Stimmungs-Check-in aller',
        unit: 'Tage in Folge',
        note: 'Ein Ziel von 14 Tagen schaltet den Teamerfolg frei.'
      },
      reports: {
        title: 'An die Basis gesendete Berichte',
        unit: 'Tage',
        note: 'Der Bericht von Tag 47 ist in der Warteschlange.'
      },
      measures: {
        title: 'Heute erfasste Messungen',
        unit: 'Messungen',
        note: 'Nur die Zahl des Teams: Werte und Namen bleiben bei jeder Person.'
      }
    }
  },
  login: {
    back: 'Anderes Besatzungsmitglied wählen',
    title: 'Anmelden',
    as: 'Anmelden als {name}',
    password: 'Passwort',
    error: 'Gib das Passwort ein, um dich anzumelden.'
  },
  account: { label: 'Angemeldetes Konto', switch: 'Konto wechseln', signedAs: 'Angemeldet als {name}' },
  clock: { day: 'TAG {day}', aria: 'Missionstag {day}, {time}' },
  topbar: {
    gravity: 'Schwerkraftstation',
    notifications: 'Team-Benachrichtigungen',
    ring: { ok: 'Akku des Rings: {n} %. Synchronisierung öffnen', low: 'Ring lädt, Akku {n} %. Synchronisierung öffnen' }
  },
  notif: {
    sub: 'Ein kurzer Check-in hilft dem ganzen Team, gesund zu bleiben.',
    empty: 'Keine neuen Benachrichtigungen.',
    count: '{n} neu',
    go: 'Empfehlung ansehen',
    items: {
      mood: '{name} hat heute noch keine Stimmung erfasst. Frag, wie es geht.',
      sync: '{name} hat den Ring heute nicht synchronisiert. Erinnere an die Synchronisierung.',
      eva: '{name} ist im Außenbordeinsatz. Frag nach, wie es lief, wenn die Person zurück ist.'
    }
  },
  agendaPage: { sub: 'Messungen, Mahlzeiten und Training im Tagesverlauf.' },
  rec: {
    sub: 'Schritt für Schritt entscheiden, was jetzt zu messen und zu tun ist, wie bei einer Triage.',
    step: 'Schritt {n}',
    overall: 'Gesamtlage',
    s1: {
      title: 'Miss, was die Routine verlangt',
      sub: 'Folge der Tagesreihenfolge. Jede Messung dauert nur wenige Minuten.'
    },
    s2: {
      title: 'Mit dem Normalbereich vergleichen',
      sub: 'Prüfe, ob jeder Wert innerhalb, nahe oder außerhalb der Grenze liegt.'
    },
    s3: { title: 'Tu, was die Empfehlung vorgibt', sub: 'Nur Messwerte, die Handlung erfordern, erscheinen hier.' },
    s4: { title: 'Melden und festhalten', sub: 'Die Zusammenfassung unten dient auch dem Arzt der Basis.' },
    state: { done: 'Erledigt', next: 'Als Nächstes', later: 'Später' },
    valueCol: 'Aktueller Wert',
    focus: 'Im Fokus',
    openIndicator: 'Messwert ansehen',
    allGood: 'Derzeit erfordert kein Messwert eine Handlung. Folge der Routine und miss zur nächsten Zeit erneut.',
    notify: {
      ok: 'Derzeit nichts zu melden. Der Tagesbericht geht zur üblichen Zeit an die Basis.',
      warn: 'Trage es ins Bordbuch ein und informiere den Kapitän, wenn der Wert erneut außerhalb liegt.',
      crit: 'Informiere jetzt den Kapitän und sende die Zusammenfassung an den Arzt der Basis.'
    },
    baseTitle: 'Zusammenfassung für den Arzt der Basis',
    baseHint: 'Aktuelle Werte des Tages. Kommunikationsverzögerung zur Erde: {delay}.'
  },
  diary: {
    sub: 'Privates Protokoll: Nur du siehst, was du hier schreibst.',
    private: 'Privat',
    privateInfo: 'Die Daten deines Bordbuchs (Stimmung und Notizen) sind nur für dich zugänglich und für niemanden sonst. Weder das restliche Team noch der Kapitän sehen, was du hier erfasst.',
    moodTitle: 'Wie war dein Tag?',
    moodHint: 'Wähle von 1 (sehr schlecht) bis 5 (sehr gut). Der Eintrag gehört nur dir.',
    mood: { '1': 'Sehr schlecht', '2': 'Schlecht', '3': 'Mittel', '4': 'Gut', '5': 'Sehr gut' },
    savedMood: 'Stimmung heute: {label}',
    weekTitle: 'Letzte 7 Tage',
    weekAlert: 'Tage mit niedriger Stimmung werden hervorgehoben.',
    weekOk: 'Keine Tage mit niedriger Stimmung in den letzten 7 Tagen.',
    noteTitle: 'Notiz des Tages',
    notePlaceholder: 'Schreibe, wie du dich fühlst, Symptome oder Ereignisse des Tages.',
    sensitive: 'Hochsensible Daten: Text ausblenden',
    sensitiveHint: 'Der Text bleibt auf dem Bildschirm maskiert und ist nicht im an die Basis gesendeten Bericht enthalten.',
    save: 'Notiz speichern',
    entriesTitle: 'Notizen',
    empty: 'Noch keine Notizen.',
    masked: 'Ausgeblendeter Inhalt',
    show: 'Anzeigen',
    hide: 'Ausblenden',
    remove: 'Löschen',
    sensitiveTag: 'Sensibel',
    howSub: 'Kurze Hinweise zu jedem Messwert.',
    tabMood: 'Stimmung und Notizen',
    tabsAria: 'Bereiche des Bordbuchs'
  },
  train: {
    sub: 'Heutiges Training, Sätze, Pause und Volumenverlauf.',
    streak: 'Serie',
    streakDays: '{n} T',
    points: 'Punkte',
    streakNote: 'Die Serie reißt an Alarmtagen, bei Außenbordeinsätzen oder während des Ladens des Rings nicht ab.',
    suggest: {
      rest: 'Training heute ausgesetzt: Ein Messwert ist kritisch. Ruhe dich aus und folge der Empfehlung.',
      light: 'Kurzer Schlaf: Das heutige Training ist 30 % leichter.',
      full: 'Alles gut: heute volles Training.'
    },
    routines: { 'full-a': 'Ganzkörper A', 'full-b': 'Ganzkörper B' },
    ex: {
      squat: 'Kniebeuge',
      bench: 'Bankdrücken',
      row: 'Langhantelrudern',
      press: 'Schulterdrücken',
      rdl: 'Rumänisches Kreuzheben',
      plank: 'Unterarmstütz'
    },
    mg: { legs: 'Beine', chest: 'Brust', back: 'Rücken', shoulders: 'Schultern', core: 'Rumpf' },
    todayTitle: 'Heutige Routine',
    exercisesCount: '{n} Übungen',
    lighter: '30 % weniger Wiederholungen',
    start: 'Training starten',
    restDay: 'Ruhetag',
    col: {
      set: 'Satz',
      exercise: 'Übung',
      kind: 'Art',
      plan: 'Plan',
      load: 'Last (kg)',
      reps: 'Wdh.',
      rpe: 'Anstrengung',
      done: 'Erledigt',
      sets: 'Sätze',
      restSec: 'Pause (s)'
    },
    kind: { warmup: 'Aufwärmen', normal: 'Normal' },
    rpeHint: 'Empfundene Anstrengung: 1 (leicht) bis 10 (maximal)',
    setAria: 'Satz {n} von {exercise} als erledigt markieren',
    rest: 'Pause',
    restSkip: 'Pause überspringen',
    restDone: 'Pause vorbei. Nächster Satz.',
    finish: 'Training beenden',
    saved: 'Training gespeichert: {volume} kg Volumen.',
    needSet: 'Markiere mindestens einen Satz als erledigt, um zu speichern.',
    historyTitle: 'Verlauf',
    historyEmpty: 'Noch keine Trainings gespeichert.',
    volumeTitle: 'Volumen pro Tag',
    volumeAria: 'Trainingsvolumen der letzten 7 Tage: {values}',
    lastVolume: 'Letztes Training',
    best1rm: 'Beste geschätzte 1RM',
    setsByGroup: 'Sätze pro Muskelgruppe (7 Tage)',
    workoutLine: '{routine} · {sets} Sätze · {volume} kg',
    setsUnit: 'Sätze',
    setsReps: '{sets} × {reps}',
    customize: 'Training anpassen',
    editTitle: 'Anpassen: {routine}',
    addExercise: 'Übung hinzufügen',
    removeExercise: '{exercise} entfernen',
    saveRoutine: 'Routine speichern',
    resetRoutine: 'Standard wiederherstellen',
    routineSaved: 'Routine gespeichert.',
    routineReset: 'Routine auf Standard zurückgesetzt.',
    customized: 'Angepasst',
    invalidRoutine: 'Prüfe Sätze, Wiederholungen und Pause: ganze Zahlen größer als null verwenden.',
    emptyRoutine: 'Füge mindestens eine Übung hinzu.'
  },
  food: {
    tab: 'Ernährung',
    phaseLabel: 'Phase',
    phase: { lancamento: 'Start', orbita: 'Orbit', reentrada: 'Wiedereintritt' },
    phaseNote: {
      lancamento: 'Wasserspender aus: nur verzehrfertige Artikel, ohne Wasser oder Erwärmen.',
      orbita: 'Alle Artikel des Menüs sind verfügbar.',
      reentrada: 'Wasserspender aus: nur verzehrfertige Artikel, ohne Wasser oder Erwärmen.'
    },
    counter: { meals: 'Mahlzeiten', drinks: 'Aromatisierte Getränke', desserts: 'Desserts' },
    ofMax: '{n} von {max}',
    dessertsLeft: 'heute noch {n}',
    register: 'Mahlzeit erfassen',
    meal: 'Mahlzeit',
    meals: { cafe: 'Frühstück', almoco: 'Mittagessen', jantar: 'Abendessen', lanche: 'Snack' },
    pick: 'Tippe auf Artikel, um sie hinzuzufügen. Erneut tippen für weitere Portionen.',
    categories: {
      principal: 'Hauptgerichte',
      acompanhamento: 'Beilagen und Basen',
      'cafe-lanche': 'Frühstück und Snacks',
      sobremesa: 'Desserts',
      bebida: 'Getränke'
    },
    reasons: {
      'needs-water': 'braucht Wasser, Spender ist aus',
      'needs-heat': 'braucht Erwärmen, in dieser Phase nicht verfügbar',
      'out-of-stock': 'ausverkauft',
      'wrong-meal': 'passt nicht zu dieser Mahlzeit'
    },
    forceHint: 'Trotzdem erfassen',
    pending: 'Artikel dieser Mahlzeit',
    pendingEmpty: 'Keine Artikel gewählt.',
    freeItem: 'Anderer Artikel',
    freePlaceholder: 'Etwas, das nicht auf dem Menü steht',
    addFree: 'Hinzufügen',
    save: 'Erfassen',
    saved: 'Mahlzeit erfasst.',
    removeItem: '{item} entfernen',
    qtyAria: '{item}: {n} Portionen',
    todayTitle: 'Heute',
    historyEmpty: 'Heute keine Einträge.',
    delete: 'Eintrag löschen',
    warningsTitle: 'Hinweise',
    noWarnings: 'Keine Hinweise.',
    info: 'Info',
    warn: {
      'dessert-left': 'Du hattest heute schon {n} von {max} Desserts.',
      'dessert-last': 'Das ist das letzte Dessert für heute. Der Vorrat wird mit dem Team geteilt.',
      'dessert-over': 'Du hast das Dessert-Limit für heute überschritten. Erfasst.',
      'dessert-streak': 'Drei Tage über dem Dessert-Limit. Der Vorrat des Teams geht schneller zur Neige.',
      'team-stock-low': 'Die Desserts des Teams gehen zur Neige.',
      'drink-last': 'Das ist dein letztes aromatisiertes Getränk heute.',
      'drink-over': 'Du hast die {max} aromatisierten Getränke von heute überschritten. Erfasst.',
      bread: 'Normales Brot ist an Bord nicht erlaubt: Krümel schweben. Trotzdem erfasst.',
      'out-of-rule': 'Außerhalb der Regel erfasst: {item} ({reason}).',
      'meal-not-scheduled': 'Beim Start und Wiedereintritt gibt es keine geplante Mahlzeit: nur einen Snack mit verzehrfertigen Artikeln. Erfasst.',
      'meal-duplicate': 'Für {meal} gibt es heute schon die maximale Zahl an Einträgen ({max}).',
      'meal-over-cap': 'Zu viele Artikel aus {category} in dieser Mahlzeit: vorgesehen sind bis zu {max}. Erfasst.'
    },
    stockTitle: 'Vorrat des Teams',
    stockSub: 'Ohne Namen: nur, was vom Menü übrig ist.',
    portionsUnit: 'Portionen',
    stockLeft: '{left} von {total} Portionen',
    openLog: 'Ernährung öffnen',
    disclaimer: 'Grenzen und Vorrat sind illustrativ und müssen vom medizinischen und Ernährungsteam validiert werden.',
    items: {
      brisket: 'Geräuchertes Rinderbrustfleisch (Brisket)',
      'macarrao-queijo': 'Makkaroni mit Käse',
      'quiche-vegetais': 'Gemüsequiche',
      'curry-camarao': 'Garnelencurry',
      'mordidas-salmao': 'Wildlachs-Häppchen',
      tortilhas: 'Weizentortillas',
      'cuscuz-castanhas': 'Couscous mit Nüssen',
      'brocolis-gratinado': 'Überbackener Brokkoli',
      'vagem-apimentada': 'Scharfe grüne Bohnen',
      abobora: 'Butternusskürbis',
      'ovos-mexidos': 'Rührei',
      salsichas: 'Würstchen',
      aveia: 'Haferbrei',
      'granola-mirtilo': 'Granola mit Heidelbeeren',
      'cereal-morango': 'Erdbeer-Cerealien mit Lavendel',
      amendoas: 'Mandeln',
      'castanha-caju': 'Cashewkerne',
      pudim: 'Pudding',
      bolo: 'Kuchen',
      'biscoito-bordo': 'Ahornsirup-Cremekeks',
      muffin: 'Muffin',
      chocolate: 'Schokolade',
      cafe: 'Kaffee',
      'cha-verde': 'Grüner Tee',
      smoothie: 'Mango-Pfirsich-Smoothie',
      limonada: 'Limonade',
      cidra: 'Apfelwein',
      achocolatado: 'Kakaogetränk'
    },
    capHint: 'bis zu {n} in dieser Mahlzeit',
    showOthers: 'Artikel anderer Mahlzeiten zeigen',
    hideOthers: 'Artikel anderer Mahlzeiten ausblenden',
    qtyMore: 'Eine Portion mehr {item}',
    qtyLess: 'Eine Portion weniger {item}',
    selectedCount: '{n} gewählt'
  },
  measure: {
    open: 'Erfassen',
    title: '{name} erfassen',
    hint: 'Das Erfassen dauert 20 Sekunden. Die Daten bleiben bei dir, außer sie sind kritisch.',
    field: {
      sys: 'Systolisch (oberer Wert)',
      dia: 'Diastolisch (unterer Wert)',
      gl: 'Glukose (mg/dL)',
      kg: 'Masse (kg)',
      device: 'Gerät',
      note: 'Notiz (optional)'
    },
    deviceOther: 'Anderes oder kein Gerät',
    save: 'Messung speichern',
    saved: 'Messung erfasst',
    state: 'Status',
    avg: 'Durchschnitt der letzten {n} Einträge: {value}',
    trend: '7-Tage-Trend',
    noTrend: 'Erfasse an mehr Tagen, um den Trend zu sehen.',
    massDelta: 'Massenänderung: {pct} % gegenüber der Referenz',
    massNoBase: 'Erfasse 7 Tage lang, um die Massenreferenz aufzubauen.',
    critical: 'Außerhalb des Bereichs. Messung wiederholen und die Empfehlung ansehen.',
    err: {
      range: 'Unmöglicher Wert. Prüfe die Eingabe: {min} bis {max}.',
      sysdia: 'Systolisch muss höher als diastolisch sein.',
      required: 'Fülle den Wert aus.'
    },
    why: {
      title: 'Warum Blutdruck, Glukose und Gewicht messen',
      intro: 'Der Ring misst Herzfrequenz, Temperatur und Schlaf von selbst. Blutdruck, Glukose und Gewicht gibt es nur, wenn du sie misst und erfasst.',
      pa: 'Zeigt, wie sich Herz und Gefäße an die Schwerelosigkeit anpassen, wenn Körperflüssigkeiten zum Kopf steigen. Hilft, Schwindel bei der Rückkehr in die Schwerkraft zu vermeiden.',
      gl: 'Zeigt, wie der Körper unter Stress, gestörtem Schlaf und Bordkost mit Energie umgeht.',
      kg: 'Zeigt, ob die Nahrung den Energieverbrauch deckt und ob Muskeln verloren gehen. Verbindet Ernährung, Training und Gesundheit.',
      freqPa: 'Einmal täglich, morgens, sitzend und in Ruhe',
      freqGl: 'Einmal täglich, vor dem Frühstück',
      freqKg: 'Einmal täglich, zur selben Zeit, vor dem Essen',
      when: 'Wann messen',
      message: 'Wir messen nicht, um beurteilt zu werden, sondern damit der Körper früh warnt. Das Erfassen dauert 20 Sekunden und die Daten bleiben bei dir, außer sie sind kritisch.',
      disclaimer: 'Werte und Häufigkeiten sind Referenzwerte für den Prototyp und müssen vor jedem realen Einsatz von Fachpersonal validiert werden.'
    },
    registerNow: 'Jetzt erfassen',
    mine: 'Deine Einträge',
    mineEmpty: 'Noch keine Einträge.',
    lastReg: 'Dein letzter Eintrag',
    remind: '{name}: Zeit zum Erfassen. Es dauert 20 Sekunden.',
    ach: {
      sub: 'Belohnt die Gewohnheit zu messen, nicht den gemessenen Wert.',
      streak: 'Messserie',
      streakNote: 'Zählt Tage mit erfasstem Blutdruck, Glukose und Gewicht. Ein Tag ohne Eintrag ist kein Vorwurf: Die Serie beginnt einfach neu.',
      days: '{n} Tage in Folge',
      grid: 'Letzte 14 Tage',
      dayAria: '{date}: {n} von 3 Messungen'
    }
  },
  gm: {
    sub: 'Belohnt die Gewohnheit, nicht den gemessenen Wert. Hier vergleichst du dich nur mit dir selbst.',
    level: {
      title: 'Dein Level',
      points: '{n} Punkte',
      toNext: 'Noch {n} Punkte bis {name}',
      max: 'Höchstes Level erreicht',
      howTitle: 'So sammelst du Punkte',
      how: 'Training +{workout} · jede Messung +{measure} (alle 3 zusammen +{complete}) · Stimmung +{mood} · Mahlzeit +{meal} · Tagesmission +{mission}',
      l0: 'Kadett',
      l1: 'Besatzungsmitglied',
      l2: 'Spezialist',
      l3: 'Navigator',
      l4: 'Pilot',
      l5: 'Veteran'
    },
    mission: {
      title: 'Tagesmission',
      sub: 'Drei kurze Schritte, um den Tag abzuschließen.',
      measures: 'Blutdruck, Glukose und Gewicht erfassen',
      train: 'Das Tagestraining machen',
      rest: 'Ruhetag: Training entfällt',
      mood: 'Stimmung erfassen',
      done: 'Erledigt',
      todo: 'Offen',
      open: 'Öffnen',
      reward: 'Erledige alle 3 Punkte für +{n} Punkte',
      complete: 'Mission erfüllt! +{n} Punkte'
    },
    streak: {
      title: 'Missionsserie',
      shields: 'Schilde: {left} von {max} in diesem Monat',
      note: 'Ein Schild deckt einen verpassten Tag ab und die Serie läuft weiter. Sie erneuern sich jeden Monat.'
    },
    badge: {
      title: 'Abzeichen',
      sub: 'Jedes Abzeichen steht für eine Gewohnheit, nicht für einen Messwert.',
      earned: 'Erreicht',
      progress: '{value} von {target}',
      measureStreak: '{n} Tage in Folge gemessen',
      trainStreak: '{n} Tage in Folge trainiert',
      workouts: '{n} Trainings absolviert',
      moodDays: '{n} Tage mit erfasster Stimmung',
      mealDays: '{n} Tage mit erfasster Ernährung',
      missionStreak: '{n} Missionen in Folge'
    },
    team: {
      title: 'Teamziele',
      note: 'Nur Summen der Besatzung: keine Namen, keine Werte und kein Ranking.',
      measures: 'Messungen der Woche',
      train: 'Trainings der Woche',
      count: '{done} von {total}',
      goal: 'Ziel: {pct} %',
      reached: 'Ziel erreicht',
      badgeMeasures: 'Team bei den Messungen auf Kurs',
      badgeTrain: 'Team in Bewegung'
    },
    recap: {
      title: 'Deine Woche',
      sub: 'Verglichen nur mit deiner Vorwoche.',
      points: 'Punkte',
      missions: 'Erfüllte Missionen',
      measures: 'Erfasste Messungen',
      workouts: 'Trainings',
      moodDays: 'Tage mit Stimmung',
      mealDays: 'Tage mit Ernährung',
      up: '+{n} Punkte gegenüber der Vorwoche',
      down: '{n} Punkte weniger als in der Vorwoche. Kein Problem: Jede Woche ist ein Neustart.',
      same: 'Gleiche Punktzahl wie in der Vorwoche'
    }
  },
  cap: {
    sub: 'Der Zustand jedes Besatzungsmitglieds, ohne persönliche Werte, um gemeinsam mit dem Team zu entscheiden.',
    privacy: 'Das Panel zeigt nur den Zustand jeder Person. Werte, Tagebuch, individuelle Stimmung und Ernährung bleiben bei jedem Besatzungsmitglied.',
    decision: {
      title: 'Entscheidung nötig',
      sub: 'Kritische Messungen, die bei der Wiederholung kritisch blieben (RN03, RN04).',
      empty: 'Keine Entscheidung offen.',
      item: '{name}: {measure} kritisch, bei der Wiederholungsmessung bestätigt',
      hint: 'Sprich das Vorgehen mit der Person ab. Die Werte bleiben bei ihr.',
      ack: 'Als begleitet markieren',
      ackAria: 'Als begleitet markieren: {name}, {measure}'
    },
    crew: {
      title: 'Zustand der Besatzung',
      battery: 'Ring {n} %',
      charging: 'Ring lädt',
      measures: 'Messungen {n}/3',
      trained: 'Heute trainiert',
      notTrained: 'Heute kein Training'
    },
    ready: {
      title: 'Einsatzbereitschaft',
      fit: '{n} von {total} einsatzbereit',
      attention: 'Mit Hinweis: {n}',
      charging: 'Ringe laden: {n}',
      note: 'Einsatzbereit ist, wer nicht in einem kritischen Zustand ist.'
    },
    notify: '{name}: {measure} im kritischen Bereich, bei der Wiederholungsmessung bestätigt. Siehe das Kapitänspanel.',
    go: 'Panel öffnen'
  },
  syncPage: {
    hello: 'Hallo, {name}',
    title: 'Ring synchronisieren',
    sub: 'Vor dem Start holt die App die Messwerte des Rings und prüft die heutigen Messungen.',
    ring: { connected: 'Ring verbunden', charging: 'Ring lädt', battery: 'Akku {n} %' },
    steps: {
      find: 'Ring wird gesucht',
      fetch: 'Messwerte seit der letzten Synchronisierung werden geladen',
      check: 'Heutige Messungen werden geprüft'
    },
    done: {
      findOk: 'Ring gefunden',
      findWarn: 'Ring in der Ladestation',
      fetchOk: 'Messwerte aktuell',
      fetchWarn: 'Vorerst keine neuen Messwerte',
      checkOk: 'Heutige Messungen geprüft'
    },
    running: 'Synchronisierung läuft…',
    ready: 'Alles bereit.',
    result: {
      connected: 'Ring synchronisiert. Die heutigen Messwerte sind schon in der App.',
      charging: 'Der Ring lädt, daher gibt es keine neuen Messwerte. Deine Serie bleibt erhalten, und du kannst unter „Jetzt messen“ von Hand messen.'
    },
    today: 'Heutige Messungen: {n} von 3 erfasst',
    enter: 'Zum Dashboard',
    skip: 'Vorerst überspringen',
    retry: 'Erneut versuchen'
  }
};

// Italiano. Same keys as pt.js.
export default {
  lang: { label: 'Lingua' },
  brand: { logoAlt: 'Logo del team Vento Norte UEA', byline: 'di Vento Norte UEA' },
  status: { ok: 'Normale', warn: 'Attenzione', crit: 'Critico' },
  time: {
    hm: '{h} h {m}',
    day: 'giorno {n}',
    dayHour: 'giorno {n} · {time}',
    now: 'adesso',
    yesterday: 'ieri {time}',
    daysAgo7: '7 giorni fa',
    today: 'oggi',
    hoursAgo24: '24 h fa'
  },
  src: { manual: 'Manuale', ring: 'Ring', ringManual: 'Ring + manuale', you: 'Tu' },
  when: { ring: '4 min fa', yPa: 'ieri 19:40', wake: 'al risveglio', yGl: 'ieri 07:35', yHu: 'ieri 21:40' },
  nav: {
    aria: 'Navigazione app',
    missionOpen: 'Apri le informazioni sulla missione',
    patchAlt: 'Stemma del team {name}',
    team: 'Team',
    myDay: 'La mia giornata',
    teamSection: 'Team',
    today: 'Oggi',
    indicators: 'Indicatori',
    measure: 'Misura adesso',
    diary: 'Diario di volo',
    routine: 'Routine e allenamento',
    achievements: 'Obiettivi',
    commander: 'Pannello del capitano',
    crewPanel: 'Pannello equipaggio',
    switchCrew: 'Cambia membro equipaggio',
    personalView: 'vista personale',
    agenda: 'Programma di oggi',
    recommendation: 'Raccomandazione',
    collapse: 'Comprimi menu',
    expand: 'Espandi menu'
  },
  team: { missionId: 'ID missione: #102' },
  crew: {
    cristiano: { role: 'Capitano', activity: 'Esperimento sui materiali' },
    'luis-felipe': { role: 'Specialista di missione', activity: 'Allenamento di resistenza' },
    mike: { role: 'Specialista di missione', activity: 'Riunione con la base', until: 'fino alle 09:30' },
    ruan: { role: 'Pilota', activity: 'Attività extraveicolare', until: 'ritorno 15:30' },
    rita: { role: 'Specialista di missione', activity: 'Manutenzione del filtro aria' },
    photoOf: 'Foto di {name}',
    captain: 'CAPITANO',
    captainLabel: 'capitano',
    sex: { f: 'Donna', m: 'Uomo' }
  },
  pickTeam: {
    title: 'Seleziona team',
    label: 'Team',
    choose: 'Scegli un team',
    listAria: 'Team',
    crewCount: '{n} membri dell\'equipaggio',
    newTeam: 'Nuova missione',
    form: {
      title: 'Crea missione',
      teamName: 'Nome del team',
      missionId: 'ID missione',
      days: 'Durata della missione (giorni)',
      daysHint: 'Obbligatorio. Inserisci un numero intero di giorni, maggiore di zero.',
      daysError: 'Inserisci la durata della missione in giorni (numero intero maggiore di zero).',
      required: 'Campo obbligatorio',
      cancel: 'Annulla',
      created: 'Missione {id} creata per il team {team}: {days} giorni. La registrazione dell’equipaggio sarà disponibile in una schermata successiva.'
    },
    missionLine: '{id} · {days} giorni'
  },
  pickCrew: { switchTeam: 'Cambia team', who: 'Chi sei?', team: 'Team' },
  mission: {
    label: 'MISSIONE',
    close: 'Chiudi',
    tagline: 'Un\'app per astronauti per misurare, comprendere e agire sulla propria salute, anche quando la Terra è troppo lontana per rispondere.',
    patchAlt: 'Stemma {name} del team {org}, {label}',
    facts: { team: 'Team', patch: 'Stemma', challenge: 'Missione', crew: 'Equipaggio', missionId: 'ID missione' },
    challengeValue: '7ª edizione del Latin American Space Challenge (LASC 2026)',
    footer: 'Creato dal team Vento Norte UEA. Questo è un prototipo della sfida «Creare un software di monitoraggio della salute per gli astronauti nelle missioni spaziali» dell’hackathon NASA Space Apps Challenge 2026, senza legami ufficiali con la NASA o con l’AEB. Persone, valori e letture sono stati generati da dati di librerie dedicate (es. NeuroKit2 e l’IA di Claude Code).',
    missionIdValue: '#102 · giorno {day}',
    teamDesc: 'Prima squadra universitaria di modellismo missilistico e di razzi ad alta potenza (high power rocketry) dello Stato di Amazonas e della Regione Nord del Brasile'
  },
  link: {
    title: 'Connessione con la Terra',
    close: 'Chiudi',
    openAria: 'Connessione con la Terra: {status}',
    lastSent: 'Ultimo invio: {ago} fa · La conferma di invio alla base arriverà entro 12min',
    lastSentOffline: 'Ultimo invio: {ago} fa',
    sendNow: 'Invia adesso',
    demoState: 'Modalità demo · stato',
    stateAria: 'Stato connessione',
    states: {
      online: {
        label: 'Connesso alla base · ritardo di 1 s',
        name: 'Connesso',
        flow: 'I dati arrivano normalmente alla base.'
      },
      lag: {
        label: 'Connesso alla base · ritardo di 12 min',
        name: 'Ritardo lungo',
        flow: 'I dati raggiungono la base con 12 min di ritardo.'
      },
      off: {
        label: 'Nessun contatto con la Terra',
        name: 'Nessun contatto',
        flow: 'Al momento nessun dato raggiunge la base.'
      },
      send: { label: 'Invio dei dati alla base', name: 'Invio', flow: 'Il segnale è tornato e i dati vengono inviati.' },
      warn: {
        label: 'Nessun contatto con la Terra da 6 h',
        name: 'Nessun contatto da 6 h',
        flow: 'Da 6 h nessun dato raggiunge la base. L’equipaggio è stato avvisato.'
      }
    }
  },
  soon: {
    heading: 'Questa schermata non è ancora disponibile',
    back: 'Torna a Oggi',
    sub: 'Team {name}',
    pages: {
      medir: {
        title: 'Misura adesso',
        desc: 'Registra una misurazione manuale (pressione arteriosa, glucosio, temperatura) o leggi l\'anello, con l\'intervallo per ogni indicatore.'
      },
      comandante: {
        title: 'Pannello del capitano',
        desc: 'Stato di ogni membro dell\'equipaggio, senza valori personali, per decidere insieme al team.'
      }
    }
  },
  names: {
    pa: 'Pressione arteriosa',
    fc: 'Frequenza cardiaca',
    gl: 'Glucosio',
    tc: 'Temperatura',
    sn: 'Sonno',
    hu: 'Umore',
    o2: 'Ossigenazione',
    rad: 'Radiazione'
  },
  cards: {
    pa: { name: 'Pressione arteriosa' },
    fc: { name: 'Frequenza cardiaca a riposo' },
    gl: { name: 'Glicemia a digiuno' },
    tc: { name: 'Temperatura corporea' },
    sn: { name: 'Ore di sonno' },
    hu: { name: 'Livello di umore' },
    o2: { name: 'Saturazione di ossigeno (SpO₂)', short: 'Ossigeno (SpO₂)' },
    kg: { name: 'Peso corporeo' },
    rad: { name: 'Radiazione oggi', short: 'Radiazione' },
    ring: { name: 'Anello smart' },
    alim: { name: 'Alimentazione' }
  },
  scenarios: { comum: 'Giornata ordinaria', febre: 'Febbre', hipoxia: 'Ipossia', estresse: 'Stress', radiacao: 'Radiazione' },
  environments: {
    estacao: {
      label: 'Stazione',
      name: 'Stazione spaziale',
      g: 'Microgravità (circa 0 g)',
      delay: 'Meno di 1 s',
      light: '16 albe al giorno',
      note: 'L\'allenamento di resistenza quotidiano aiuta a proteggere muscoli e ossa. Fissare i piedi al supporto durante la misurazione della pressione arteriosa.'
    },
    lua: {
      label: 'Luna',
      name: 'Superficie lunare',
      g: '1/6 della gravità terrestre',
      delay: 'Circa 2,6 s, andata e ritorno',
      light: 'Giorno lunare di circa 29,5 giorni',
      note: 'Con bassa gravità, l\'allenamento richiede un carico extra. La polvere fine richiede cura per occhi e vie respiratorie.'
    },
    marte: {
      label: 'Marte',
      name: 'Superficie di Marte',
      g: '0,38 della gravità terrestre',
      delay: '3–22 min, solo andata',
      light: 'Sol di 24 h 39 min',
      note: 'Il giorno marziano è più lungo di 39 min: l’orologio della missione segue quel ritmo affinché il sonno non si sfasi. Senza la Terra in tempo reale, decidi con la raccomandazione.'
    },
    terra: {
      label: 'Terra remota',
      name: 'Comunità remota sulla Terra',
      g: 'Gravità normale (1 g)',
      delay: 'Satellite, intermittente',
      light: 'Ciclo normale di 24 h',
      note: 'Senza specialisti nelle vicinanze, la raccomandazione illustra il primo soccorso e il riepilogo va al team sanitario quando c’è segnale.'
    }
  },
  agenda: {
    sync: 'Sincronizza l\'anello',
    cafe: 'Colazione',
    almoco: 'Pranzo',
    treino: 'Allenamento di forza',
    diario: 'Diario di volo',
    sono: 'Ora di dormire',
    medpa: 'Misurare la pressione',
    medgl: 'Misurare la glicemia a digiuno',
    medkg: 'Misurare il peso (massa)'
  },
  today: {
    greeting: 'Buongiorno, {name}',
    signalsAria: 'Barra dei segnali',
    signalTitle: '{name}: {value}, {status}',
    demo: 'Modalità demo',
    scenario: 'Scenario',
    environment: 'Ambiente',
    editHint: 'Trascina il cursore per spostare, trascina il bordo destro per cambiare la larghezza, o archivia ciò che non ti serve.',
    restore: 'Ripristina predefinito',
    finish: 'Fatto',
    customize: 'Personalizza',
    addToPanel: 'Aggiungi al pannello',
    indicatorsAria: 'Indicatori',
    normal: 'Normale: {range}',
    trend: 'Tendenza di {name} negli ultimi 7 giorni, ultimo valore {value}',
    dragMove: 'Trascina per spostare',
    archiveCard: 'Archivia scheda',
    archive: 'Archivia',
    resize: 'Trascina per cambiare la larghezza',
    agenda: 'Programma di oggi',
    agendaDone: '{done} di {total} fatto',
    open: 'Apri',
    markDone: 'Segna come fatto: {title}',
    envTitle: 'Ambiente: {name}',
    gravity: 'Gravità',
    comms: 'Comunicazione',
    light: 'Ciclo di luce',
    normalRad: 'Radiazione normale',
    radUnit: 'mSv/giorno',
    illustrative: 'Valori illustrativi, da validare con fonti ufficiali prima di qualsiasi uso reale.',
    ranges: {
      pa: '90–119 / 60–79',
      fc: '50–95 a riposo',
      gl: '70–99 a digiuno',
      tc: '36,1–37,5',
      sn: '7–9 h',
      hu: 'da 3 a 5'
    },
    units: { sn: 'stanotte', hu: 'su 5', o2: '%', kg: 'kg', ring: 'batteria' },
    o2Cap: 'Anello · notturno',
    kgCap: 'Basale 74,0 kg · +0,3%',
    radCapHigh: '{x} volte il normale per l\'ambiente',
    radCapOk: 'Entro il normale per l\'ambiente',
    ringCap: 'Sincronizzato 4 min fa · indossato da 31 h',
    ringChip: 'Connesso',
    details: {
      sync: 'Anello connesso · batteria 78%',
      med: 'Misurazione manuale guidata, seduto e a riposo',
      cafe: 'Ora di mangiare. Registralo nel diario di volo.',
      almoco: 'Ora di mangiare. Registralo nel diario di volo.',
      treinoCrit: 'Sospeso oggi: un indicatore è critico. Riposa e segui la raccomandazione.',
      treinoShort: 'Volume suggerito: 3 × 7 (30% in meno per sonno o umore)',
      treinoFull: 'Volume suggerito: 3 × 10, carico completo',
      diario: 'Umore, pasti e sintomi della giornata',
      sono: 'Obiettivo: 7 h 30. Luce bassa dalle 21:30.',
      medgl: 'A digiuno, prima della colazione',
      medkg: 'All’ora di sempre, prima di mangiare'
    },
    alert: {
      contact: 'Contatto con la Terra: {delay}.',
      guide: 'Apri la raccomandazione',
      cabin: 'Vedi pannello cabina',
      seeWhat: 'Vedi cosa fare',
      tcTitle: 'Temperatura a {value} °C',
      tcText: 'Conferma con il termometro di bordo. La raccomandazione spiega cosa fare adesso.',
      o2Title: 'Bassa ossigenazione: {value}%',
      o2Text: 'Siediti, respira profondamente e controlla la posizione del sensore. Se rimane sotto 92%, segui il protocollo.',
      radTitle: 'Radiazione {x} volte sopra la norma',
      radText: 'Possibile evento solare. Vai nell\'area rifugio e attendi istruzioni.',
      critTitle: '{name} critico',
      critText: 'Ripeti la misurazione e segui la raccomandazione.',
      warnOne: '{name} richiede attenzione',
      warnMany: '{n} indicatori richiedono attenzione',
      warnSleep: 'Hai dormito {value}. L\'allenamento di oggi è ridotto del 30% per proteggere il recupero.',
      warnText: 'Fuori dall\'intervallo normale. Vedi cosa fare.'
    },
    mock: {
      label: 'Dati fittizi',
      on: 'Attivi',
      off: 'Disattivati',
      note: 'Storico di 3 settimane dell’equipaggio, solo per la dimostrazione. Non viene scritto nulla su disco.'
    }
  },
  ind: {
    title: 'Indicatori',
    sub: 'Tendenza, significato e cosa fare, un indicatore alla volta.',
    ringSync: 'Anello sincronizzato 4 min fa',
    pickAria: 'Scegli l\'indicatore',
    periodAria: 'Periodo',
    legendAria: 'Legenda',
    ranges: { '24h': '24 ore', '7d': '7 giorni', '30d': '30 giorni' },
    systolic: 'Sistolica',
    diastolic: 'Diastolica',
    normalBand: 'Intervallo normale',
    outBand: 'Fuori intervallo',
    stat: { avg: 'Media', min: 'Minimo', max: 'Massimo', out: 'Fuori intervallo' },
    outOf: '{a} di {b}',
    wave: {
      title: 'Forma d\'onda dell\'anello',
      simulated: 'SIMULATO',
      ppg: 'Polso (PPG), 6 secondi',
      ecg: 'Elettrocardiogramma (ECG), 6 secondi',
      ppgAlt: 'Onda del polso simulata con battiti regolari',
      ecgAlt: 'Tracciato ECG simulato con complessi QRS regolari',
      note: 'Segnali generati dalla simulazione per la demo. L\'anello misura il polso (PPG); l\'ECG verrebbe da un sensore aggiuntivo, ancora da definire.'
    },
    howTitle: 'Come misurare',
    whyTitle: 'Perché è importante',
    lastValue: 'Ultimo valore',
    normalLabel: 'Valore di riferimento',
    measurement: 'Misurazione',
    baseline: 'Il tuo basale',
    whatToDo: 'Raccomandazione',
    disclaimer: 'Intervalli, limiti e indicazioni sono illustrativi e devono essere validati dal team medico della missione prima di qualsiasi uso reale. L\'app non fornisce diagnosi.',
    per: {
      h24: 'ultime 24 h · ogni 30 min',
      d7manual: 'ultimi 7 giorni · {per}',
      d7: 'ultimi 7 giorni · ogni 2 h',
      d30manual: 'ultimi 30 giorni · {per}',
      d30: 'ultimi 30 giorni · media giornaliera'
    },
    alt: 'Grafico di {name}, {range}. Ultimo valore {value} {unit}, {status}. Media {avg}, minimo {min}, massimo {max}, {out} di {n} fuori dall\'intervallo normale.',
    pa: {
      name: 'Pressione arteriosa',
      short: 'Pressione',
      unit: 'mmHg',
      axis: 'mmHg',
      bands: ['Sistolica normale', 'Diastolica normale'],
      range: '90–119 / 60–79',
      base: '116/75',
      per: 'una misurazione al giorno',
      msg: {
        ok: 'Nell\'intervallo normale.',
        warn: 'Fuori dall\'intervallo normale. Ripeti la misurazione con calma.',
        crit: 'Oltre il limite sicuro. Conferma e avvisa il capitano.'
      },
      why: [
        'La pressione arteriosa mostra quanto il cuore lavora per pompare il sangue. In microgravità, i fluidi corporei si spostano verso l\'alto e ciò può influenzare la pressione.'
      ],
      how: [
        'Siediti con la schiena supportata e i piedi fermi. Sulla stazione, fissa i piedi al supporto.',
        'Riposa per 5 minuti, in silenzio.',
        'Posiziona il bracciale sul braccio, all\'altezza del cuore.',
        'Misura due volte, a 1 minuto di distanza. L\'app salva la media.'
      ],
      acts: [
        { rule: '90–119 / 60–79', text: 'Segui la routine e misura di nuovo domani, alla stessa ora.' },
        {
          rule: '120–139 / 80–89, o sotto 90/60',
          text: 'Ripeti in 5 minuti, seduto. Evita caffeina e sale oggi e annota come ti senti nel diario di volo.'
        },
        {
          rule: '140/90 o più, o sotto 80/50',
          text: 'Interrompi l\'attività e siediti. Ripeti in 5 minuti. Se confermato, avvisa il capitano. Con dolore al petto, respiro corto o vertigini, chiedi aiuto subito.'
        }
      ],
      cta: 'Misura la pressione adesso'
    },
    fc: {
      name: 'Frequenza cardiaca a riposo',
      short: 'FC a riposo',
      unit: 'bpm',
      axis: 'bpm',
      bands: ['Intervallo normale a riposo'],
      range: '50–95 bpm a riposo',
      base: '60 bpm',
      per: 'misurato dall\'anello',
      msg: {
        ok: 'Nell\'intervallo a riposo.',
        warn: 'Fuori dall\'intervallo a riposo. Siediti e respira lentamente.',
        crit: 'Molto fuori dall\'intervallo. Fermati e controlla il polso.'
      },
      why: [
        'La frequenza cardiaca a riposo mostra come il cuore si sta adattando. Un aumento senza sforzo può indicare stress, febbre, disidratazione o stanchezza.',
        'L\'anello misura tutto il giorno. Ciò che conta è il riposo: seduto, senza allenamento da almeno 15 minuti.'
      ],
      how: [
        'Indossa l\'anello ben aderente al dito, senza gioco.',
        'Sincronizza al risveglio e prima di dormire.',
        'Per un valore a riposo, siediti in silenzio per 5 minuti prima di guardare lo schermo.'
      ],
      acts: [
        { rule: '50–95 bpm a riposo', text: 'Tutto bene. Continua l\'allenamento e la routine quotidiana.' },
        {
          rule: '96–110 o 40–49 bpm a riposo',
          text: 'Siediti e respira lentamente per 5 minuti. Pensa a sforzo recente, caffeina o stress. Se persiste, misura la pressione arteriosa.'
        },
        {
          rule: 'Sopra 110 o sotto 40 bpm a riposo',
          text: 'Interrompi ciò che stai facendo e siediti. Controlla il polso al polso per 1 minuto e avvisa il capitano. Con dolore al petto, svenimento o respiro corto, chiedi aiuto subito.'
        }
      ],
      cta: 'Registra come mi sento'
    },
    gl: {
      name: 'Glicemia a digiuno',
      short: 'Glicemia',
      unit: 'mg/dL',
      axis: 'mg/dL',
      bands: ['Intervallo normale a digiuno'],
      range: '70–99 mg/dL a digiuno',
      base: '94 mg/dL',
      per: 'una misurazione al giorno, a digiuno',
      msg: {
        ok: 'Nell\'intervallo a digiuno.',
        warn: 'Fuori dall\'intervallo. Ripeti domani a digiuno.',
        crit: 'Oltre il limite sicuro. Misura di nuovo adesso.'
      },
      why: [
        'Il glucosio è il carburante del corpo. Durante una missione, stress, poco sonno e cambiamenti nella dieta possono far salire o scendere il valore.',
        'La misurazione a digiuno è la più facile da confrontare da un giorno all\'altro.'
      ],
      how: [
        'Stai senza mangiare per 8 ore, solo acqua.',
        'Lavati e asciugati le mani.',
        'Pungiti il lato del polpastrello e tocca la goccia sulla striscia del glucometro.',
        'Annota il valore. L\'app salva data e ora.'
      ],
      acts: [
        { rule: '70–99 mg/dL a digiuno', text: 'Segui la routine. Misura di nuovo a digiuno domani.' },
        {
          rule: '100–125 o 54–69 mg/dL',
          text: 'Ripeti la misurazione. Sotto 70: mangia 15 g di zucchero rapido e misura di nuovo in 15 minuti. Sopra 100: annota l\'ultimo pasto nel diario di volo.'
        },
        {
          rule: '126 mg/dL o più, o sotto 54',
          text: 'Misura di nuovo adesso. Sotto 54: mangia 15 g di zucchero rapido, stai fermo e avvisa il capitano. Sopra 126 confermato: avvisa il team medico.'
        }
      ],
      cta: 'Misura il glucosio adesso'
    },
    tc: {
      name: 'Temperatura corporea',
      short: 'Temperatura',
      unit: '°C',
      axis: '°C',
      bands: ['Intervallo normale'],
      range: '36,1–37,5 °C',
      base: '36,6 °C',
      per: 'stimato dall\'anello',
      msg: {
        ok: 'Nell\'intervallo normale.',
        warn: 'Leggermente fuori dall\'intervallo. Conferma con il termometro.',
        crit: 'Possibile febbre. Conferma e segui la raccomandazione.'
      },
      why: [
        'La temperatura sale con infezioni, sforzo e stress. In microgravità il corpo perde calore in modo diverso, quindi seguire la tendenza è più utile di un singolo valore.',
        'L\'anello stima la temperatura cutanea. Se supera la norma, conferma con il termometro di bordo.'
      ],
      how: [
        'L\'anello stima la temperatura cutanea, giorno e notte.',
        'Se il valore esce dall\'intervallo, attendi 15 minuti dopo l\'allenamento o la doccia.',
        'Misura con il termometro di bordo, all\'orecchio o alla fronte.',
        'Registra il valore. L\'app lo confronta con la stima dell\'anello.'
      ],
      acts: [
        { rule: '36,1–37,5 °C', text: 'Segui la routine e bevi acqua durante la giornata.' },
        {
          rule: '37,6–37,9 °C, o 35,0–36,0 °C',
          text: 'Conferma con il termometro di bordo. Idratati, riposati e misura di nuovo in 1 ora.'
        },
        {
          rule: '38,0 °C o più, o sotto 35,0 °C',
          text: 'Conferma con il termometro. Con febbre, stai lontano dagli altri e avvisa il capitano. Segui il protocollo di infezione di bordo.'
        }
      ],
      cta: 'Misura la temperatura adesso'
    },
    sn: {
      name: 'Ore di sonno',
      short: 'Ore di sonno',
      unit: 'stanotte',
      axis: 'ore per notte',
      bands: ['Intervallo normale'],
      range: '7–9 h per notte',
      base: '7 h 20',
      per: 'una notte per barra',
      msg: {
        ok: 'Notte riposante.',
        warn: 'Notte breve. L\'allenamento di oggi è ridotto del 30%.',
        crit: 'Sonno molto breve. Allenamento leggero e nessun compito rischioso.'
      },
      why: [
        'Dormire meno di 7 ore a notte peggiora l\'attenzione e il recupero. Durante una missione, ciò pesa sui compiti rischiosi.',
        'L\'anello registra il sonno da solo. Luce bassa di notte e un orario fisso aiutano l\'orologio biologico.'
      ],
      how: [
        'Indossa l\'anello di notte, ben aderente al dito.',
        'Sincronizza al risveglio. L\'app mostra le ore totali.',
        'Dalle 21:30, tieni la luce bassa ed evita gli schermi.'
      ],
      acts: [
        { rule: '7–9 h', text: 'Mantieni l\'orario. Allenamento normale oggi.' },
        {
          rule: '5 h a 6 h 59, o più di 9 h',
          text: 'L\'allenamento di oggi è ridotto del 30%. Evita la caffeina dopo le 14:00 e fai un pisolino di massimo 20 minuti se necessario.'
        },
        {
          rule: 'Meno di 5 h',
          text: 'Allenamento leggero e nessun compito rischioso, come un\'uscita extraveicolare. Avvisa il capitano e organizza il riposo.'
        }
      ],
      cta: 'Adatta l\'allenamento di oggi'
    },
    hu: {
      name: 'Livello di umore',
      short: 'Umore',
      unit: 'su 5',
      axis: 'punteggio da 1 a 5',
      bands: ['Intervallo normale'],
      range: 'punteggio 3–5',
      base: 'punteggio 4',
      per: 'una voce al giorno',
      msg: {
        ok: 'Umore stabile.',
        warn: 'Umore basso. Vale la pena parlare con qualcuno.',
        crit: 'Umore molto basso. Cerca supporto oggi.'
      },
      why: [
        'L\'umore cambia prima che compaiano altri segni di stanchezza e stress. Registrare ogni giorno aiuta a notare la tendenza.',
        'La voce è solo tua. Sei tu a decidere se condividere il tuo umore con il team.'
      ],
      how: [
        'Chiediti: com\'è andata la mia giornata?',
        'Scegli da 1 (molto male) a 5 (molto bene) nel diario di volo.',
        'Se vuoi, scrivi una nota. Rimane solo tua.'
      ],
      acts: [
        { rule: 'Punteggio 3–5', text: 'Segui la routine. Registra di nuovo domani.' },
        {
          rule: 'Punteggio 2',
          text: 'Parla con qualcuno del team o scrivi nel diario di volo. Fai una pausa di 15 minuti in un luogo con luce intensa.'
        },
        {
          rule: 'Punteggio 1',
          text: 'Parla oggi con qualcuno di cui ti fidi. Se vuoi, il capitano richiederà supporto psicologico dalla Terra.'
        }
      ],
      cta: 'Scrivi nel diario di volo'
    },
    openRecommendation: 'Apri passo dopo passo',
    infoOpen: 'Perché {name} è importante'
  },
  panel: {
    title: 'Pannello equipaggio',
    eva: 'EVA',
    nowLabel: 'adesso',
    whoTitle: 'Chi sta facendo cosa',
    whoSub: 'L\'attività attuale di ogni persona, senza dati sanitari.',
    avgTitle: 'Medie del team',
    avgSub: 'Media di {n} persone, senza nomi.',
    sensorsTitle: 'Sensori della cabina',
    sensorsSub: 'Aria, temperatura e radiazione dell\'ambiente condiviso.',
    goalsTitle: 'Obiettivi del team',
    goalsSub: 'Ciò che l\'equipaggio costruisce insieme.',
    tileAria: '{title}: {value} {unit}, {foot}',
    goalOf: 'di {total} {unit}',
    goalAria: '{pct}% dell\'obiettivo',
    footnote: 'Questo pannello mostra attività, sensori della cabina e medie di 3 o più persone. I valori sanitari di ogni persona rimangono solo nella propria schermata Oggi, e il capitano vede solo lo stato. Dati simulati, intervalli illustrativi da validare con fonti ufficiali.',
    avg: {
      sleep: { title: 'Sonno medio', unit: 'per notte', foot: 'Obiettivo team: 7 h o più · ultimi 7 giorni' },
      mood: { title: 'Umore medio', unit: 'su 5', foot: 'Media di {n} persone · senza nomi' },
      train: {
        title: 'Allenamento team',
        value: '{done} di {n}',
        unit: 'allenati oggi',
        foot: 'Allenamento di resistenza e cardio'
      }
    },
    sensors: {
      radiation: { title: 'Radiazione', unit: 'mSv/giorno', foot: 'Normale stazione: 0,4–0,8' },
      co2: { title: 'CO₂', unit: 'ppm', foot: 'Intervallo illustrativo: 2.000–3.600' },
      temp: { title: 'Temperatura', unit: '°C', foot: 'Normale: 20–25' },
      humidity: { title: 'Umidità', unit: '%', foot: 'Sopra 60 dalle 18:10 · filtro in manutenzione' },
      pressure: { title: 'Pressione', unit: 'kPa', foot: 'Normale: 99–103' }
    },
    goals: {
      training: { title: 'Allenamenti del team questa settimana', unit: 'sessioni', note: '7 sessioni mancano a domenica.' },
      mood: {
        title: 'Check-in umore da tutti',
        unit: 'giorni di fila',
        note: 'Un obiettivo di 14 giorni sblocca il traguardo del team.'
      },
      reports: { title: 'Rapporti inviati alla base', unit: 'giorni', note: 'Il rapporto del giorno 47 è in coda.' },
      measures: {
        title: 'Misurazioni registrate oggi',
        unit: 'misurazioni',
        note: 'Solo il conteggio del team: valori e nomi restano a ogni persona.'
      }
    }
  },
  login: {
    back: 'Scegli un altro membro',
    title: 'Accedi',
    as: 'Accedi come {name}',
    password: 'Password',
    error: 'Inserisci la password per accedere.'
  },
  account: { label: 'Account connesso', switch: 'Cambia account', signedAs: 'Connesso come {name}' },
  clock: { day: 'GIORNO {day}', aria: 'Giorno di missione {day}, {time}' },
  topbar: {
    gravity: 'Stazione di gravità',
    notifications: 'Notifiche del team',
    ring: {
      ok: 'Batteria dell’anello: {n}%. Apri la sincronizzazione',
      low: 'Anello in carica, batteria {n}%. Apri la sincronizzazione'
    }
  },
  notif: {
    sub: 'Un check-in veloce aiuta tutto il team a stare bene.',
    empty: 'Nessuna nuova notifica.',
    count: '{n} nuove',
    go: 'Vedi raccomandazione',
    items: {
      mood: '{name} non ha ancora registrato l’umore oggi. Chiedi come sta.',
      sync: '{name} non ha sincronizzato l’anello oggi. Ricorda di sincronizzare.',
      eva: '{name} è in attività extraveicolare. Chiedi com’è andata al rientro.'
    }
  },
  agendaPage: { sub: 'Misurazioni, pasti e allenamento nel corso della giornata.' },
  rec: {
    sub: 'Passo dopo passo per decidere cosa misurare e cosa fare adesso, come in un triage.',
    step: 'Passo {n}',
    overall: 'Situazione generale',
    s1: {
      title: 'Misura ciò che la routine richiede',
      sub: 'Segui l’ordine della giornata. Ogni misurazione richiede pochi minuti.'
    },
    s2: {
      title: 'Confronta con l’intervallo normale',
      sub: 'Verifica se ogni valore è dentro, vicino o fuori dal limite.'
    },
    s3: { title: 'Fai ciò che la raccomandazione indica', sub: 'Compaiono solo gli indicatori che richiedono un’azione.' },
    s4: { title: 'Avvisa e registra', sub: 'Il riepilogo qui sotto serve anche al medico della base.' },
    state: { done: 'Fatto', next: 'Prossima', later: 'Più tardi' },
    valueCol: 'Valore attuale',
    focus: 'In evidenza',
    openIndicator: 'Vedi indicatore',
    allGood: 'Nessun indicatore richiede un’azione adesso. Segui la routine e misura di nuovo al prossimo orario.',
    notify: {
      ok: 'Niente da segnalare adesso. Il rapporto giornaliero va alla base all’orario normale.',
      warn: 'Annotalo nel diario e avvisa il capitano se la misura resta fuori intervallo.',
      crit: 'Avvisa subito il capitano e invia il riepilogo al medico della base.'
    },
    baseTitle: 'Riepilogo per il medico della base',
    baseHint: 'Valori attuali del giorno. Ritardo di comunicazione con la Terra: {delay}.'
  },
  diary: {
    sub: 'Registro privato: solo tu vedi ciò che scrivi qui.',
    private: 'Privato',
    privateInfo: 'I dati del tuo diario (umore e note) sono riservati solo a te e a nessun altro. Né il resto del team né il capitano vedono ciò che registri qui.',
    moodTitle: 'Com’è andata la tua giornata?',
    moodHint: 'Scegli da 1 (molto male) a 5 (molto bene). La voce è solo tua.',
    mood: { '1': 'Molto male', '2': 'Male', '3': 'Così così', '4': 'Bene', '5': 'Molto bene' },
    savedMood: 'Umore di oggi: {label}',
    weekTitle: 'Ultimi 7 giorni',
    weekAlert: 'I giorni con umore basso sono evidenziati.',
    weekOk: 'Nessun giorno con umore basso negli ultimi 7 giorni.',
    noteTitle: 'Nota del giorno',
    notePlaceholder: 'Scrivi come ti senti, sintomi o eventi della giornata.',
    sensitive: 'Dato altamente sensibile: nascondi il testo',
    sensitiveHint: 'Il testo resta mascherato a schermo e non è incluso nel rapporto inviato alla base.',
    save: 'Salva nota',
    entriesTitle: 'Note',
    empty: 'Ancora nessuna nota.',
    masked: 'Contenuto nascosto',
    show: 'Mostra',
    hide: 'Nascondi',
    remove: 'Elimina',
    sensitiveTag: 'Sensibile',
    howSub: 'Indicazioni rapide per ogni indicatore.',
    tabMood: 'Umore e note',
    tabsAria: 'Sezioni del diario'
  },
  train: {
    sub: 'Allenamento del giorno, serie, recupero e storico del volume.',
    streak: 'Serie',
    streakDays: '{n} g',
    points: 'Punti',
    streakNote: 'La serie non si interrompe nei giorni di allerta, in attività extraveicolare o con l’anello in carica.',
    suggest: {
      rest: 'Allenamento sospeso oggi: un indicatore è critico. Riposa e segui la raccomandazione.',
      light: 'Sonno breve: l’allenamento di oggi è più leggero del 30%.',
      full: 'Tutto bene: allenamento completo oggi.'
    },
    routines: { 'full-a': 'Corpo intero A', 'full-b': 'Corpo intero B' },
    ex: {
      squat: 'Squat',
      bench: 'Panca piana',
      row: 'Rematore',
      press: 'Military press',
      rdl: 'Stacco rumeno',
      plank: 'Plank'
    },
    mg: { legs: 'Gambe', chest: 'Petto', back: 'Schiena', shoulders: 'Spalle', core: 'Addome' },
    todayTitle: 'Routine di oggi',
    exercisesCount: '{n} esercizi',
    lighter: '30% di ripetizioni in meno',
    start: 'Inizia allenamento',
    restDay: 'Giorno di riposo',
    col: {
      set: 'Serie',
      exercise: 'Esercizio',
      kind: 'Tipo',
      plan: 'Piano',
      load: 'Carico (kg)',
      reps: 'Rip.',
      rpe: 'Sforzo',
      done: 'Fatta',
      sets: 'Serie',
      restSec: 'Recupero (s)'
    },
    kind: { warmup: 'Riscaldamento', normal: 'Normale' },
    rpeHint: 'Sforzo percepito: da 1 (leggero) a 10 (massimo)',
    setAria: 'Segna la serie {n} di {exercise} come fatta',
    rest: 'Recupero',
    restSkip: 'Salta recupero',
    restDone: 'Recupero finito. Prossima serie.',
    finish: 'Termina allenamento',
    saved: 'Allenamento salvato: {volume} kg di volume.',
    needSet: 'Segna almeno una serie come fatta per salvare.',
    historyTitle: 'Storico',
    historyEmpty: 'Ancora nessun allenamento salvato.',
    volumeTitle: 'Volume al giorno',
    volumeAria: 'Volume di allenamento degli ultimi 7 giorni: {values}',
    lastVolume: 'Ultimo allenamento',
    best1rm: 'Miglior 1RM stimato',
    setsByGroup: 'Serie per gruppo muscolare (7 giorni)',
    workoutLine: '{routine} · {sets} serie · {volume} kg',
    setsUnit: 'serie',
    setsReps: '{sets} × {reps}',
    customize: 'Personalizza allenamento',
    editTitle: 'Personalizza: {routine}',
    addExercise: 'Aggiungi esercizio',
    removeExercise: 'Rimuovi {exercise}',
    saveRoutine: 'Salva routine',
    resetRoutine: 'Ripristina predefinita',
    routineSaved: 'Routine salvata.',
    routineReset: 'Routine ripristinata.',
    customized: 'Personalizzata',
    invalidRoutine: 'Controlla serie, ripetizioni e recupero: usa numeri interi maggiori di zero.',
    emptyRoutine: 'Aggiungi almeno un esercizio.'
  },
  food: {
    tab: 'Alimentazione',
    phaseLabel: 'Fase',
    phase: { lancamento: 'Lancio', orbita: 'Orbita', reentrada: 'Rientro' },
    phaseNote: {
      lancamento: 'Erogatore d’acqua spento: solo alimenti pronti, senza acqua né riscaldamento.',
      orbita: 'Tutti gli articoli del menu sono disponibili.',
      reentrada: 'Erogatore d’acqua spento: solo alimenti pronti, senza acqua né riscaldamento.'
    },
    counter: { meals: 'Pasti', drinks: 'Bevande aromatizzate', desserts: 'Dolci' },
    ofMax: '{n} di {max}',
    dessertsLeft: 'ne restano {n} oggi',
    register: 'Registra pasto',
    meal: 'Pasto',
    meals: { cafe: 'Colazione', almoco: 'Pranzo', jantar: 'Cena', lanche: 'Spuntino' },
    pick: 'Tocca gli articoli per aggiungerli. Tocca di nuovo per aggiungere porzioni.',
    categories: {
      principal: 'Piatti principali',
      acompanhamento: 'Contorni e basi',
      'cafe-lanche': 'Colazione e spuntini',
      sobremesa: 'Dolci',
      bebida: 'Bevande'
    },
    reasons: {
      'needs-water': 'richiede acqua, erogatore spento',
      'needs-heat': 'richiede riscaldamento, non disponibile in questa fase',
      'out-of-stock': 'scorte esaurite',
      'wrong-meal': 'non adatto a questo pasto'
    },
    forceHint: 'Registra comunque',
    pending: 'Articoli di questo pasto',
    pendingEmpty: 'Nessun articolo scelto.',
    freeItem: 'Altro articolo',
    freePlaceholder: 'Qualcosa che non è nel menu',
    addFree: 'Aggiungi',
    save: 'Registra',
    saved: 'Pasto registrato.',
    removeItem: 'Rimuovi {item}',
    qtyAria: '{item}: {n} porzioni',
    todayTitle: 'Oggi',
    historyEmpty: 'Nessun registro oggi.',
    delete: 'Elimina registro',
    warningsTitle: 'Avvisi',
    noWarnings: 'Nessun avviso.',
    info: 'Informativo',
    warn: {
      'dessert-left': 'Oggi hai già mangiato {n} dolci su {max}.',
      'dessert-last': 'Questo è l’ultimo dolce di oggi. Le scorte sono condivise con il team.',
      'dessert-over': 'Hai superato il limite di dolci di oggi. Registrato.',
      'dessert-streak': 'Tre giorni sopra il limite di dolci. Le scorte del team finiscono più in fretta.',
      'team-stock-low': 'I dolci del team stanno finendo.',
      'drink-last': 'Questa è la tua ultima bevanda aromatizzata di oggi.',
      'drink-over': 'Hai superato le {max} bevande aromatizzate di oggi. Registrato.',
      bread: 'Il pane comune non va a bordo: le briciole fluttuano. Registrato comunque.',
      'out-of-rule': 'Registrato fuori regola: {item} ({reason}).',
      'meal-not-scheduled': 'In lancio e rientro non ci sono pasti programmati: solo uno spuntino con alimenti pronti. Registrato.',
      'meal-duplicate': '{meal} ha già il numero massimo di registri di oggi ({max}).',
      'meal-over-cap': 'Troppi articoli di {category} in questo pasto: previsti fino a {max}. Registrato.'
    },
    stockTitle: 'Scorte del team',
    stockSub: 'Senza nomi: solo ciò che resta del menu.',
    portionsUnit: 'porzioni',
    stockLeft: '{left} di {total} porzioni',
    openLog: 'Apri alimentazione',
    disclaimer: 'Limiti e scorte sono illustrativi e vanno convalidati dal team medico e nutrizionale.',
    items: {
      brisket: 'Brisket di manzo affumicato',
      'macarrao-queijo': 'Maccheroni al formaggio',
      'quiche-vegetais': 'Quiche di verdure',
      'curry-camarao': 'Curry di gamberi',
      'mordidas-salmao': 'Bocconcini di salmone selvaggio',
      tortilhas: 'Tortillas di grano',
      'cuscuz-castanhas': 'Couscous con frutta secca',
      'brocolis-gratinado': 'Broccoli gratinati',
      'vagem-apimentada': 'Fagiolini piccanti',
      abobora: 'Zucca butternut',
      'ovos-mexidos': 'Uova strapazzate',
      salsichas: 'Salsicce',
      aveia: 'Porridge d’avena',
      'granola-mirtilo': 'Granola ai mirtilli',
      'cereal-morango': 'Cereali alla fragola e lavanda',
      amendoas: 'Mandorle',
      'castanha-caju': 'Anacardi',
      pudim: 'Budino',
      bolo: 'Torta',
      'biscoito-bordo': 'Biscotto alla crema d’acero',
      muffin: 'Muffin',
      chocolate: 'Cioccolato',
      cafe: 'Caffè',
      'cha-verde': 'Tè verde',
      smoothie: 'Smoothie di mango e pesca',
      limonada: 'Limonata',
      cidra: 'Sidro di mele',
      achocolatado: 'Bevanda al cioccolato'
    },
    capHint: 'fino a {n} in questo pasto',
    showOthers: 'Mostra articoli di altri pasti',
    hideOthers: 'Nascondi articoli di altri pasti',
    qtyMore: 'Una porzione in più di {item}',
    qtyLess: 'Una porzione in meno di {item}',
    selectedCount: '{n} selezionati'
  },
  measure: {
    open: 'Registra',
    title: 'Registra {name}',
    hint: 'Registrare richiede 20 secondi. Il dato resta solo con te, a meno che non sia critico.',
    field: {
      sys: 'Sistolica (massima)',
      dia: 'Diastolica (minima)',
      gl: 'Glicemia (mg/dL)',
      kg: 'Massa (kg)',
      device: 'Dispositivo',
      note: 'Nota (facoltativa)'
    },
    deviceOther: 'Altro o senza dispositivo',
    save: 'Salva misurazione',
    saved: 'Misurazione registrata',
    state: 'Stato',
    avg: 'Media degli ultimi {n} registri: {value}',
    trend: 'Tendenza a 7 giorni',
    noTrend: 'Registra per più giorni per vedere la tendenza.',
    massDelta: 'Variazione della massa: {pct}% rispetto al riferimento',
    massNoBase: 'Registra per 7 giorni per creare il riferimento di massa.',
    critical: 'Fuori intervallo. Ripeti la misurazione e vedi la Raccomandazione.',
    err: {
      range: 'Valore impossibile. Controlla quanto digitato: da {min} a {max}.',
      sysdia: 'La sistolica deve essere maggiore della diastolica.',
      required: 'Inserisci il valore.'
    },
    why: {
      title: 'Perché misurare pressione, glicemia e peso',
      intro: 'L’anello misura da solo frequenza cardiaca, temperatura e sonno. Pressione, glicemia e peso esistono solo se li misuri e li registri.',
      pa: 'Mostra come cuore e vasi si adattano alla microgravità, quando i liquidi del corpo salgono verso la testa. Aiuta a prevenire le vertigini al ritorno alla gravità.',
      gl: 'Mostra come il corpo gestisce l’energia sotto stress, con sonno alterato e dieta di bordo.',
      kg: 'Mostra se il cibo copre il dispendio di energia e se si perde muscolo. Collega alimentazione, allenamento e salute.',
      freqPa: '1 volta al giorno, al mattino, seduto e a riposo',
      freqGl: '1 volta al giorno, prima della colazione',
      freqKg: '1 volta al giorno, alla stessa ora, prima di mangiare',
      when: 'Quando misurare',
      message: 'Non misuriamo per essere giudicati: misuriamo perché il corpo avvisi presto. Registrare richiede 20 secondi e il dato resta solo con te, a meno che non sia critico.',
      disclaimer: 'Valori e frequenze sono di riferimento per il prototipo e vanno convalidati da un professionista sanitario prima di qualsiasi uso reale.'
    },
    registerNow: 'Registra ora',
    mine: 'I tuoi registri',
    mineEmpty: 'Ancora nessun registro.',
    lastReg: 'Il tuo ultimo registro',
    remind: '{name}: è ora di registrare. Bastano 20 secondi.',
    ach: {
      sub: 'Premia l’abitudine di misurare, non il valore misurato.',
      streak: 'Serie di misurazioni',
      streakNote: 'Conta i giorni con pressione, glicemia e peso registrati. Un giorno senza registri non è un rimprovero: la serie ricomincia.',
      days: '{n} giorni di fila',
      grid: 'Ultimi 14 giorni',
      dayAria: '{date}: {n} misurazioni su 3'
    }
  },
  gm: {
    sub: 'Premia l’abitudine, non il valore misurato. Qui ti confronti solo con te stesso.',
    level: {
      title: 'Il tuo livello',
      points: '{n} punti',
      toNext: 'Mancano {n} punti a {name}',
      max: 'Livello massimo raggiunto',
      howTitle: 'Come guadagnare punti',
      how: 'Allenamento +{workout} · ogni misurazione +{measure} (tutte e 3 insieme +{complete}) · umore +{mood} · pasto +{meal} · missione del giorno +{mission}',
      l0: 'Cadetto',
      l1: 'Membro d’equipaggio',
      l2: 'Specialista',
      l3: 'Navigatore',
      l4: 'Pilota',
      l5: 'Veterano'
    },
    mission: {
      title: 'Missione del giorno',
      sub: 'Tre brevi passi per chiudere la giornata.',
      measures: 'Registrare pressione, glicemia e peso',
      train: 'Fare l’allenamento del giorno',
      rest: 'Giorno di riposo: allenamento esentato',
      mood: 'Registrare l’umore',
      done: 'Fatto',
      todo: 'In sospeso',
      open: 'Apri',
      reward: 'Completa tutti e 3 gli elementi per ottenere +{n} punti',
      complete: 'Missione compiuta! +{n} punti'
    },
    streak: {
      title: 'Serie di missioni',
      shields: 'Scudi: {left} su {max} questo mese',
      note: 'Uno scudo copre un giorno perso e la serie continua. Si rinnovano ogni mese.'
    },
    badge: {
      title: 'Distintivi',
      sub: 'Ogni distintivo segna un’abitudine, non un valore misurato.',
      earned: 'Ottenuto',
      progress: '{value} su {target}',
      measureStreak: '{n} giorni di fila di misurazioni',
      trainStreak: '{n} giorni di fila di allenamento',
      workouts: '{n} allenamenti fatti',
      moodDays: '{n} giorni con l’umore registrato',
      mealDays: '{n} giorni con l’alimentazione registrata',
      missionStreak: '{n} missioni di fila'
    },
    team: {
      title: 'Obiettivi del team',
      note: 'Solo totali dell’equipaggio: niente nomi, niente valori e niente classifica.',
      measures: 'Misurazioni della settimana',
      train: 'Allenamenti della settimana',
      count: '{done} su {total}',
      goal: 'Obiettivo: {pct}%',
      reached: 'Obiettivo raggiunto',
      badgeMeasures: 'Team in regola con le misurazioni',
      badgeTrain: 'Team in movimento'
    },
    recap: {
      title: 'La tua settimana',
      sub: 'Confrontata solo con la tua settimana precedente.',
      points: 'Punti',
      missions: 'Missioni completate',
      measures: 'Misurazioni registrate',
      workouts: 'Allenamenti',
      moodDays: 'Giorni con umore',
      mealDays: 'Giorni con alimentazione',
      up: '+{n} punti rispetto alla settimana precedente',
      down: '{n} punti in meno rispetto alla settimana precedente. Nessun problema: ogni settimana è un nuovo inizio.',
      same: 'Stesso punteggio della settimana precedente'
    }
  },
  cap: {
    sub: 'Lo stato di ogni membro dell’equipaggio, senza valori personali, per decidere insieme al team.',
    privacy: 'Il pannello mostra solo lo stato di ogni persona. Valori, diario, umore individuale e alimentazione restano a ogni membro.',
    decision: {
      title: 'Serve una decisione',
      sub: 'Misurazioni critiche rimaste critiche alla ripetizione (RN03, RN04).',
      empty: 'Nessuna decisione in sospeso.',
      item: '{name}: {measure} critico, confermato alla nuova misurazione',
      hint: 'Concorda la condotta con la persona. I valori restano con lei.',
      ack: 'Segna come seguito',
      ackAria: 'Segna come seguito: {name}, {measure}'
    },
    crew: {
      title: 'Stato dell’equipaggio',
      battery: 'Anello {n}%',
      charging: 'Anello in carica',
      measures: 'Misurazioni {n}/3',
      trained: 'Si è allenato oggi',
      notTrained: 'Nessun allenamento oggi'
    },
    ready: {
      title: 'Prontezza della missione',
      fit: '{n} su {total} idonei',
      attention: 'In attenzione: {n}',
      charging: 'Anelli in carica: {n}',
      note: 'Idoneo è chi non è in stato critico.'
    },
    notify: '{name}: {measure} in stato critico, confermato alla nuova misurazione. Vedi il pannello del capitano.',
    go: 'Apri il pannello'
  },
  syncPage: {
    hello: 'Ciao, {name}',
    title: 'Sincronizza l’anello',
    sub: 'Prima di entrare, l’app recupera le letture dell’anello e controlla le misurazioni di oggi.',
    ring: { connected: 'Anello connesso', charging: 'Anello in carica', battery: 'Batteria {n}%' },
    steps: {
      find: 'Ricerca dell’anello',
      fetch: 'Download delle letture dall’ultima sincronizzazione',
      check: 'Controllo delle misurazioni di oggi'
    },
    done: {
      findOk: 'Anello trovato',
      findWarn: 'Anello sulla base, in carica',
      fetchOk: 'Letture aggiornate',
      fetchWarn: 'Nessuna nuova lettura per ora',
      checkOk: 'Misurazioni di oggi controllate'
    },
    running: 'Sincronizzazione…',
    ready: 'Tutto pronto.',
    result: {
      connected: 'Anello sincronizzato. Le letture di oggi sono già nell’app.',
      charging: 'L’anello è in carica, quindi non ci sono nuove letture. La tua serie non si interrompe e puoi misurare a mano in Misura ora.'
    },
    today: 'Misurazioni di oggi: {n} su 3 registrate',
    enter: 'Entra nel pannello',
    skip: 'Salta per ora',
    retry: 'Riprova'
  }
};

// Français. Mêmes clés que pt.js.
export default {
  lang: { label: 'Langue' },
  brand: { logoAlt: 'Logo de l’équipe Vento Norte UEA', byline: 'par Vento Norte UEA' },
  status: { ok: 'Normal', warn: 'Attention', crit: 'Critique' },
  time: {
    hm: '{h} h {m}',
    day: 'jour {n}',
    dayHour: 'jour {n} · {time}',
    now: 'maintenant',
    yesterday: 'hier {time}',
    daysAgo7: 'il y a 7 jours',
    today: 'aujourd’hui',
    hoursAgo24: 'il y a 24 h'
  },
  src: { manual: 'Manuel', ring: 'Bague', ringManual: 'Bague + manuel', you: 'Vous' },
  when: { ring: 'il y a 4 min', yPa: 'hier 19:40', wake: 'au réveil', yGl: 'hier 07:35', yHu: 'hier 21:40' },
  nav: {
    aria: 'Navigation de l’application',
    missionOpen: 'Ouvrir les informations de la mission',
    patchAlt: 'Écusson de l’équipe {name}',
    team: 'Équipe',
    myDay: 'Ma journée',
    teamSection: 'Équipe',
    today: 'Aujourd’hui',
    indicators: 'Indicateurs',
    measure: 'Mesurer maintenant',
    diary: 'Journal de bord',
    routine: 'Routine et entraînement',
    achievements: 'Réussites',
    commander: 'Tableau du capitaine',
    crewPanel: 'Tableau de l’équipage',
    switchCrew: 'Changer de membre d’équipage',
    personalView: 'vue personnelle',
    agenda: 'Agenda du jour',
    recommendation: 'Recommandation',
    collapse: 'Réduire le menu',
    expand: 'Développer le menu'
  },
  team: { missionId: 'ID de mission : #102' },
  crew: {
    cristiano: { role: 'Capitaine', activity: 'Expérience sur les matériaux' },
    'luis-felipe': { role: 'Spécialiste de mission', activity: 'Entraînement d’endurance' },
    mike: { role: 'Spécialiste de mission', activity: 'Réunion avec la base', until: 'jusqu’à 09:30' },
    ruan: { role: 'Pilote', activity: 'Activité extravéhiculaire', until: 'retour 15:30' },
    rita: { role: 'Spécialiste de mission', activity: 'Entretien du filtre à air' },
    photoOf: 'Photo de {name}',
    captain: 'CAPITAINE',
    captainLabel: 'capitaine',
    sex: { f: 'Féminin', m: 'Masculin' }
  },
  pickTeam: {
    title: 'Choisir l’équipe',
    label: 'Équipe',
    choose: 'Choisissez une équipe',
    listAria: 'Équipes',
    crewCount: '{n} membres d’équipage',
    newTeam: 'Nouvelle mission',
    form: {
      title: 'Créer une mission',
      teamName: 'Nom de l’équipe',
      missionId: 'ID de mission',
      days: 'Durée de la mission (jours)',
      daysHint: 'Obligatoire. Indiquez un nombre entier de jours, supérieur à zéro.',
      daysError: 'Indiquez la durée de la mission en jours (nombre entier supérieur à zéro).',
      required: 'Champ obligatoire',
      cancel: 'Annuler',
      created: 'Mission {id} créée pour l’équipe {team} : {days} jours. L’enregistrement de l’équipage viendra dans un écran ultérieur.'
    },
    missionLine: '{id} · {days} jours'
  },
  pickCrew: { switchTeam: 'Changer d’équipe', who: 'Qui êtes-vous ?', team: 'Équipe' },
  mission: {
    label: 'MISSION',
    close: 'Fermer',
    tagline: 'Une application pour que l’astronaute mesure, comprenne et agisse sur sa propre santé, même lorsque la Terre est trop loin pour répondre.',
    patchAlt: 'Écusson {name} de l’équipe {org}, {label}',
    facts: { team: 'Équipe', patch: 'Écusson', challenge: 'Mission', crew: 'Équipage', missionId: 'ID de mission' },
    challengeValue: '7e édition du Latin American Space Challenge (LASC 2026)',
    footer: 'Créé par l’équipe Vento Norte UEA. Ceci est un prototype du défi « Créer un logiciel de suivi de la santé des astronautes en mission spatiale » du hackathon NASA Space Apps Challenge 2026, sans lien officiel avec la NASA ni l’AEB. Les personnes, valeurs et mesures ont été générées à partir de données de bibliothèques dédiées (ex. NeuroKit2 et l’IA de Claude Code).',
    missionIdValue: '#102 · jour {day}',
    teamDesc: 'Première équipe universitaire de fusées expérimentales et de haute puissance (high power rocketry) de l’État d’Amazonas et de la région Nord du Brésil'
  },
  link: {
    title: 'Connexion avec la Terre',
    close: 'Fermer',
    openAria: 'Connexion avec la Terre : {status}',
    lastSent: 'Dernier envoi : il y a {ago} · La confirmation d’envoi à la base sera transmise sous 12min',
    lastSentOffline: 'Dernier envoi : il y a {ago}',
    sendNow: 'Envoyer maintenant',
    demoState: 'Mode démonstration · état',
    stateAria: 'État de la connexion',
    states: {
      online: {
        label: 'Connecté à la base · délai de 1 s',
        name: 'Connecté',
        flow: 'Les données partent normalement vers la base.'
      },
      lag: {
        label: 'Connecté à la base · délai de 12 min',
        name: 'Long délai',
        flow: 'Les données atteignent la base avec 12 min de délai.'
      },
      off: {
        label: 'Aucun contact avec la Terre',
        name: 'Aucun contact',
        flow: 'Aucune donnée n’atteint la base pour le moment.'
      },
      send: {
        label: 'Envoi des données à la base',
        name: 'Envoi',
        flow: 'Le signal est revenu et les données sont envoyées.'
      },
      warn: {
        label: 'Aucun contact avec la Terre depuis 6 h',
        name: 'Aucun contact depuis 6 h',
        flow: 'Aucune donnée n’atteint la base depuis 6 h. L’équipage a été prévenu.'
      }
    }
  },
  soon: {
    heading: 'Cet écran n’a pas encore été construit',
    back: 'Retour à Aujourd’hui',
    sub: 'Équipe {name}',
    pages: {
      medir: {
        title: 'Mesurer maintenant',
        desc: 'Saisie d’une mesure manuelle (tension, glycémie, température) ou lecture de la bague, avec la plage de chaque indicateur.'
      },
      comandante: {
        title: 'Tableau du capitaine',
        desc: 'État de chaque membre d’équipage, sans valeurs personnelles, pour décider avec l’équipe.'
      }
    }
  },
  names: {
    pa: 'Tension artérielle',
    fc: 'Fréquence cardiaque',
    gl: 'Glycémie',
    tc: 'Température',
    sn: 'Sommeil',
    hu: 'Humeur',
    o2: 'Oxygénation',
    rad: 'Rayonnement'
  },
  cards: {
    pa: { name: 'Tension artérielle' },
    fc: { name: 'Fréquence cardiaque au repos' },
    gl: { name: 'Glycémie à jeun' },
    tc: { name: 'Température corporelle' },
    sn: { name: 'Heures de sommeil' },
    hu: { name: 'Niveau d’humeur' },
    o2: { name: 'Saturation en oxygène (SpO₂)', short: 'Oxygène (SpO₂)' },
    kg: { name: 'Poids corporel' },
    rad: { name: 'Rayonnement du jour', short: 'Rayonnement' },
    ring: { name: 'Bague connectée' },
    alim: { name: 'Alimentation' }
  },
  scenarios: { comum: 'Journée normale', febre: 'Fièvre', hipoxia: 'Hypoxie', estresse: 'Stress', radiacao: 'Rayonnement' },
  environments: {
    estacao: {
      label: 'Station',
      name: 'Station spatiale',
      g: 'Microgravité (environ 0 g)',
      delay: 'Moins de 1 s',
      light: '16 levers de soleil par jour',
      note: 'L’entraînement de résistance quotidien aide à protéger les muscles et les os. Calez-vous sur le support pour mesurer la tension.'
    },
    lua: {
      label: 'Lune',
      name: 'Surface lunaire',
      g: '1/6 de la gravité terrestre',
      delay: 'Environ 2,6 s, aller-retour',
      light: 'Jour lunaire d’environ 29,5 jours',
      note: 'Avec une faible gravité, l’entraînement demande une charge supplémentaire. La poussière fine exige de protéger les yeux et les voies respiratoires.'
    },
    marte: {
      label: 'Mars',
      name: 'Surface de Mars',
      g: '0,38 de la gravité terrestre',
      delay: '3 à 22 min, à sens unique',
      light: 'Sol de 24 h 39 min',
      note: 'Le jour martien dure 39 min de plus : l’horloge de mission suit ce rythme pour que le sommeil ne dérive pas. Sans la Terre en temps réel, décidez avec la recommandation.'
    },
    terra: {
      label: 'Terre isolée',
      name: 'Communauté isolée sur Terre',
      g: 'Gravité normale (1 g)',
      delay: 'Satellite, intermittent',
      light: 'Cycle normal de 24 h',
      note: 'Sans spécialistes à proximité, la recommandation oriente les premiers soins et le résumé part vers l’équipe de santé dès qu’il y a du signal.'
    }
  },
  agenda: {
    sync: 'Synchroniser la bague',
    cafe: 'Petit-déjeuner',
    almoco: 'Déjeuner',
    treino: 'Renforcement musculaire',
    diario: 'Journal de bord',
    sono: 'Heure du coucher',
    medpa: 'Mesurer la tension',
    medgl: 'Mesurer la glycémie à jeun',
    medkg: 'Mesurer le poids (masse)'
  },
  today: {
    greeting: 'Bonjour, {name}',
    signalsAria: 'Barre de signaux',
    signalTitle: '{name} : {value}, {status}',
    demo: 'Mode démonstration',
    scenario: 'Scénario',
    environment: 'Environnement',
    editHint: 'Faites glisser la poignée pour déplacer, tirez le bord droit pour changer la largeur ou archivez ce dont vous n’avez pas besoin.',
    restore: 'Rétablir par défaut',
    finish: 'Terminer',
    customize: 'Personnaliser',
    addToPanel: 'Ajouter au tableau',
    indicatorsAria: 'Indicateurs',
    normal: 'Normal : {range}',
    trend: 'Évolution de {name} sur les 7 derniers jours, dernière valeur {value}',
    dragMove: 'Faire glisser pour déplacer',
    archiveCard: 'Archiver la carte',
    archive: 'Archiver',
    resize: 'Faire glisser pour changer la largeur',
    agenda: 'Programme du jour',
    agendaDone: '{done} sur {total} faits',
    open: 'Ouvrir',
    markDone: 'Marquer comme fait : {title}',
    envTitle: 'Environnement : {name}',
    gravity: 'Gravité',
    comms: 'Communication',
    light: 'Cycle de lumière',
    normalRad: 'Rayonnement normal',
    radUnit: 'mSv/jour',
    illustrative: 'Valeurs illustratives, à valider avec des sources officielles avant tout usage réel.',
    ranges: { pa: '90–119 / 60–79', fc: '50–95 au repos', gl: '70–99 à jeun', tc: '36,1–37,5', sn: '7–9 h', hu: '3 à 5' },
    units: { sn: 'cette nuit', hu: 'sur 5', o2: '%', kg: 'kg', ring: 'de batterie' },
    o2Cap: 'Bague · de nuit',
    kgCap: 'Valeur de référence 74,0 kg · +0,3 %',
    radCapHigh: '{x} fois la normale de l’environnement',
    radCapOk: 'Dans la normale de l’environnement',
    ringCap: 'Synchronisée il y a 4 min · portée depuis 31 h',
    ringChip: 'Connectée',
    details: {
      sync: 'Bague connectée · batterie 78 %',
      med: 'Mesure manuelle guidée, assis et au repos',
      cafe: 'L’heure de manger. Notez-le dans le journal.',
      almoco: 'L’heure de manger. Notez-le dans le journal.',
      treinoCrit: 'Suspendu aujourd’hui : un indicateur est critique. Reposez-vous et suivez la recommandation.',
      treinoShort: 'Volume conseillé : 3 × 7 (30 % de moins à cause du sommeil ou de l’humeur)',
      treinoFull: 'Volume conseillé : 3 × 10, charge complète',
      diario: 'Humeur, repas et symptômes du jour',
      sono: 'Objectif de 7 h 30. Lumière tamisée à partir de 21:30.',
      medgl: 'À jeun, avant le petit-déjeuner',
      medkg: 'À l’heure habituelle, avant de manger'
    },
    alert: {
      contact: 'Contact avec la Terre : {delay}.',
      guide: 'Ouvrir la recommandation',
      cabin: 'Voir le tableau de la cabine',
      seeWhat: 'Voir quoi faire',
      tcTitle: 'Température à {value} °C',
      tcText: 'Confirmez avec le thermomètre de bord. La recommandation explique quoi faire maintenant.',
      o2Title: 'Oxygénation basse : {value} %',
      o2Text: 'Asseyez-vous, respirez profondément et vérifiez la position du capteur. Si elle reste sous 92 %, suivez le protocole.',
      radTitle: 'Rayonnement {x} fois supérieur à la normale',
      radText: 'Possible événement de particules solaires. Rejoignez la zone de refuge et attendez les instructions.',
      critTitle: '{name} critique',
      critText: 'Refaites la mesure et suivez la recommandation.',
      warnOne: '{name} demande de l’attention',
      warnMany: '{n} indicateurs demandent de l’attention',
      warnSleep: 'Vous avez dormi {value}. L’entraînement d’aujourd’hui est réduit de 30 % pour protéger la récupération.',
      warnText: 'Hors de la plage normale. Voyez quoi faire.'
    },
    mock: {
      label: 'Données fictives',
      on: 'Activées',
      off: 'Désactivées',
      note: 'Historique de 3 semaines de l’équipage, uniquement pour la démonstration. Rien n’est écrit sur le disque.'
    }
  },
  ind: {
    title: 'Indicateurs',
    sub: 'Évolution, signification et conduite à tenir, un indicateur à la fois.',
    ringSync: 'Bague synchronisée il y a 4 min',
    pickAria: 'Choisir l’indicateur',
    periodAria: 'Période',
    legendAria: 'Légende',
    ranges: { '24h': '24 heures', '7d': '7 jours', '30d': '30 jours' },
    systolic: 'Systolique',
    diastolic: 'Diastolique',
    normalBand: 'Plage normale',
    outBand: 'Hors plage',
    stat: { avg: 'Moyenne', min: 'Minimum', max: 'Maximum', out: 'Hors plage' },
    outOf: '{a} sur {b}',
    wave: {
      title: 'Forme d’onde de la bague',
      simulated: 'SIMULÉ',
      ppg: 'Pouls (PPG), 6 secondes',
      ecg: 'Électrocardiogramme (ECG), 6 secondes',
      ppgAlt: 'Onde de pouls simulée, avec des battements réguliers',
      ecgAlt: 'Tracé d’ECG simulé, avec des complexes QRS réguliers',
      note: 'Signaux générés par simulation pour la démonstration. La bague mesure le pouls (PPG) ; l’ECG viendrait d’un capteur supplémentaire, encore à définir.'
    },
    howTitle: 'Comment mesurer',
    whyTitle: 'Pourquoi c’est important',
    lastValue: 'Dernière valeur',
    normalLabel: 'Valeur de référence',
    measurement: 'Mesure',
    baseline: 'Votre valeur de référence',
    whatToDo: 'Recommandation',
    disclaimer: 'Les plages, les limites et les conseils sont illustratifs et doivent être validés par l’équipe médicale de la mission avant tout usage réel. L’application ne pose pas de diagnostic.',
    per: {
      h24: '24 dernières heures · toutes les 30 min',
      d7manual: '7 derniers jours · {per}',
      d7: '7 derniers jours · toutes les 2 h',
      d30manual: '30 derniers jours · {per}',
      d30: '30 derniers jours · moyenne quotidienne'
    },
    alt: 'Graphique de {name}, {range}. Dernière valeur {value} {unit}, {status}. Moyenne {avg}, minimum {min}, maximum {max}, {out} sur {n} hors de la plage normale.',
    pa: {
      name: 'Tension artérielle',
      short: 'Tension artérielle',
      unit: 'mmHg',
      axis: 'mmHg',
      bands: ['Systolique normale', 'Diastolique normale'],
      range: '90–119 / 60–79',
      base: '116/75',
      per: 'une mesure par jour',
      msg: {
        ok: 'Dans la plage normale.',
        warn: 'Hors de la plage normale. Refaites la mesure calmement.',
        crit: 'Au-delà de la limite de sécurité. Confirmez et prévenez le capitaine.'
      },
      why: [
        'La tension montre l’effort du cœur pour pomper le sang. En microgravité, les liquides du corps se déplacent vers le haut, ce qui peut modifier la tension.'
      ],
      how: [
        'Asseyez-vous le dos soutenu et les pieds bien posés. Sur la station, calez les pieds sur le support.',
        'Reposez-vous 5 minutes, en silence.',
        'Placez le brassard sur le bras, à hauteur du cœur.',
        'Mesurez 2 fois, à 1 minute d’intervalle. L’appli enregistre la moyenne.'
      ],
      acts: [
        { rule: '90–119 / 60–79', text: 'Suivez la routine et mesurez de nouveau demain, à la même heure.' },
        {
          rule: '120–139 / 80–89, ou en dessous de 90/60',
          text: 'Refaites la mesure dans 5 minutes, assis. Évitez la caféine et le sel aujourd’hui et notez comment vous vous sentez dans le journal.'
        },
        {
          rule: '140/90 ou plus, ou en dessous de 80/50',
          text: 'Arrêtez l’activité et asseyez-vous. Refaites la mesure dans 5 minutes. Si elle est confirmée, prévenez le capitaine. En cas de douleur thoracique, d’essoufflement ou de vertige, demandez de l’aide tout de suite.'
        }
      ],
      cta: 'Mesurer la tension maintenant'
    },
    fc: {
      name: 'Fréquence cardiaque au repos',
      short: 'FC au repos',
      unit: 'bpm',
      axis: 'bpm',
      bands: ['Plage normale au repos'],
      range: '50–95 bpm au repos',
      base: '60 bpm',
      per: 'mesurée par la bague',
      msg: {
        ok: 'Dans la plage au repos.',
        warn: 'Hors de la plage au repos. Asseyez-vous et respirez lentement.',
        crit: 'Très hors de la plage. Arrêtez-vous et vérifiez le pouls.'
      },
      why: [
        'La fréquence cardiaque au repos montre comment le cœur s’adapte. Une hausse sans effort peut indiquer du stress, de la fièvre, un manque de liquide ou de la fatigue.',
        'La bague mesure toute la journée. Ce qui compte, c’est le repos : assis, sans avoir fait d’effort depuis au moins 15 minutes.'
      ],
      how: [
        'Portez la bague bien ajustée au doigt, sans jeu.',
        'Synchronisez au réveil et avant de dormir.',
        'Pour une valeur au repos, restez assis en silence 5 minutes avant de regarder l’écran.'
      ],
      acts: [
        { rule: '50–95 bpm au repos', text: 'Tout va bien. Suivez l’entraînement et la routine du jour.' },
        {
          rule: '96–110 ou 40–49 bpm au repos',
          text: 'Asseyez-vous et respirez lentement pendant 5 minutes. Pensez à un effort, à la caféine ou à un stress récents. Si cela continue, mesurez la tension.'
        },
        {
          rule: 'Au-dessus de 110 ou en dessous de 40 bpm au repos',
          text: 'Arrêtez ce que vous faites et asseyez-vous. Vérifiez le pouls au poignet pendant 1 minute et prévenez le capitaine. En cas de douleur thoracique, de malaise ou d’essoufflement, demandez de l’aide tout de suite.'
        }
      ],
      cta: 'Noter comment je me sens'
    },
    gl: {
      name: 'Glycémie à jeun',
      short: 'Glycémie',
      unit: 'mg/dL',
      axis: 'mg/dL',
      bands: ['Plage normale à jeun'],
      range: '70–99 mg/dL à jeun',
      base: '94 mg/dL',
      per: 'une mesure par jour, à jeun',
      msg: {
        ok: 'Dans la plage à jeun.',
        warn: 'Hors de la plage. Refaites la mesure demain à jeun.',
        crit: 'Au-delà de la limite de sécurité. Mesurez de nouveau maintenant.'
      },
      why: [
        'Le glucose est le carburant du corps. En mission, le stress, un sommeil court et les changements d’alimentation peuvent faire monter ou baisser la valeur.',
        'La mesure à jeun est la plus facile à comparer d’un jour à l’autre.'
      ],
      how: [
        'Restez 8 heures sans manger, avec de l’eau seulement.',
        'Lavez-vous et séchez-vous les mains.',
        'Piquez le côté du bout du doigt et approchez la goutte de la bandelette du lecteur de glycémie.',
        'Notez la valeur. L’appli enregistre la date et l’heure.'
      ],
      acts: [
        { rule: '70–99 mg/dL à jeun', text: 'Suivez la routine. Mesurez de nouveau à jeun demain.' },
        {
          rule: '100–125 ou 54–69 mg/dL',
          text: 'Refaites la mesure. En dessous de 70 : prenez 15 g de sucre à action rapide et mesurez de nouveau dans 15 minutes. Au-dessus de 100 : notez le dernier repas dans le journal.'
        },
        {
          rule: '126 mg/dL ou plus, ou en dessous de 54',
          text: 'Mesurez de nouveau maintenant. En dessous de 54 : prenez 15 g de sucre à action rapide, restez immobile et prévenez le capitaine. Au-dessus de 126 confirmé : prévenez l’équipe médicale.'
        }
      ],
      cta: 'Mesurer la glycémie maintenant'
    },
    tc: {
      name: 'Température corporelle',
      short: 'Température',
      unit: '°C',
      axis: '°C',
      bands: ['Plage normale'],
      range: '36,1–37,5 °C',
      base: '36,6 °C',
      per: 'estimée par la bague',
      msg: {
        ok: 'Dans la plage normale.',
        warn: 'Légèrement hors de la plage. Confirmez avec le thermomètre.',
        crit: 'Fièvre possible. Confirmez et suivez la recommandation.'
      },
      why: [
        'La température monte avec une infection, l’effort et le stress. En microgravité, le corps évacue la chaleur autrement ; suivre l’évolution aide donc plus qu’une valeur isolée.',
        'La bague estime la température de la peau. Si elle dépasse la normale, confirmez avec le thermomètre de bord.'
      ],
      how: [
        'La bague estime la température de la peau, de jour comme de nuit.',
        'Si la valeur sort de la plage, attendez 15 minutes après l’entraînement ou la douche.',
        'Mesurez avec le thermomètre de bord, à l’oreille ou au front.',
        'Notez la valeur. L’appli la compare à l’estimation de la bague.'
      ],
      acts: [
        { rule: '36,1–37,5 °C', text: 'Suivez la routine et buvez de l’eau tout au long de la journée.' },
        {
          rule: '37,6–37,9 °C, ou 35,0–36,0 °C',
          text: 'Confirmez avec le thermomètre de bord. Hydratez-vous, reposez-vous et mesurez de nouveau dans 1 heure.'
        },
        {
          rule: '38,0 °C ou plus, ou en dessous de 35,0 °C',
          text: 'Confirmez avec le thermomètre. En cas de fièvre, éloignez-vous des autres et prévenez le capitaine. Suivez le protocole d’infection de bord.'
        }
      ],
      cta: 'Mesurer la température maintenant'
    },
    sn: {
      name: 'Heures de sommeil',
      short: 'Heures de sommeil',
      unit: 'cette nuit',
      axis: 'heures par nuit',
      bands: ['Plage normale'],
      range: '7 à 9 h par nuit',
      base: '7 h 20',
      per: 'une nuit par barre',
      msg: {
        ok: 'Une bonne nuit de sommeil.',
        warn: 'Nuit courte. L’entraînement d’aujourd’hui est réduit de 30 %.',
        crit: 'Sommeil très court. Entraînement léger et aucune tâche à risque.'
      },
      why: [
        'Dormir moins de 7 heures par nuit nuit à l’attention et à la récupération. En mission, cela pèse sur les tâches à risque.',
        'La bague enregistre le sommeil toute seule. Une lumière tamisée le soir et des horaires fixes aident l’horloge du corps.'
      ],
      how: [
        'Portez la bague la nuit, bien ajustée au doigt.',
        'Synchronisez au réveil. L’appli affiche le total d’heures.',
        'À partir de 21:30, tamisez la lumière et évitez les écrans.'
      ],
      acts: [
        { rule: '7 à 9 h', text: 'Gardez le même horaire. Entraînement normal aujourd’hui.' },
        {
          rule: '5 h à 6 h 59, ou plus de 9 h',
          text: 'L’entraînement d’aujourd’hui est réduit de 30 %. Évitez la caféine après 14:00 et faites une sieste de 20 minutes au maximum, si besoin.'
        },
        {
          rule: 'Moins de 5 h',
          text: 'Entraînement léger et aucune tâche à risque, comme une sortie extravéhiculaire. Prévenez le capitaine et prévoyez du repos.'
        }
      ],
      cta: 'Ajuster l’entraînement du jour'
    },
    hu: {
      name: 'Niveau d’humeur',
      short: 'Humeur',
      unit: 'sur 5',
      axis: 'note de 1 à 5',
      bands: ['Plage normale'],
      range: 'note de 3 à 5',
      base: 'note 4',
      per: 'une saisie par jour',
      msg: {
        ok: 'Humeur stable.',
        warn: 'Humeur basse. Cela vaut la peine d’en parler à quelqu’un.',
        crit: 'Humeur très basse. Cherchez du soutien aujourd’hui.'
      },
      why: [
        'L’humeur change avant que d’autres signes de fatigue et de stress n’apparaissent. La noter chaque jour aide à repérer la tendance.',
        'La saisie n’appartient qu’à vous. Vous choisissez de partager ou non votre humeur avec l’équipe.'
      ],
      how: [
        'Demandez-vous : comment s’est passée ma journée ?',
        'Choisissez de 1 (très mal) à 5 (très bien) dans le journal de bord.',
        'Si vous le souhaitez, écrivez une note. Elle reste uniquement avec vous.'
      ],
      acts: [
        { rule: 'Note de 3 à 5', text: 'Suivez la routine. Notez de nouveau demain.' },
        {
          rule: 'Note 2',
          text: 'Parlez à quelqu’un de l’équipe ou écrivez dans le journal. Faites une pause de 15 minutes dans un endroit bien éclairé.'
        },
        {
          rule: 'Note 1',
          text: 'Parlez à une personne de confiance dès aujourd’hui. Si vous le souhaitez, le capitaine demande un soutien psychologique à la Terre.'
        }
      ],
      cta: 'Écrire dans le journal'
    },
    openRecommendation: 'Ouvrir pas à pas',
    infoOpen: 'Pourquoi {name} compte'
  },
  panel: {
    title: 'Tableau de l’équipage',
    eva: 'AEV',
    nowLabel: 'maintenant',
    whoTitle: 'Qui fait quoi',
    whoSub: 'Activité de chacun en ce moment, sans données de santé.',
    avgTitle: 'Moyennes de l’équipe',
    avgSub: 'Moyenne de {n} personnes, sans noms.',
    sensorsTitle: 'Capteurs de la cabine',
    sensorsSub: 'Air, température et rayonnement de l’environnement partagé.',
    goalsTitle: 'Objectifs de l’équipe',
    goalsSub: 'Ce que l’équipage construit ensemble.',
    tileAria: '{title} : {value} {unit}, {foot}',
    goalOf: 'sur {total} {unit}',
    goalAria: '{pct} % de l’objectif',
    footnote: 'Ce tableau montre les activités, les capteurs de la cabine et des moyennes d’au moins 3 personnes. Les valeurs de santé de chacun restent uniquement dans l’écran Aujourd’hui de la personne, et le capitaine ne voit que l’état. Données simulées, plages illustratives à valider avec des sources officielles.',
    avg: {
      sleep: { title: 'Sommeil moyen', unit: 'par nuit', foot: 'Objectif de l’équipe : 7 h ou plus · 7 derniers jours' },
      mood: { title: 'Humeur moyenne', unit: 'sur 5', foot: 'Moyenne de {n} personnes · sans noms' },
      train: {
        title: 'Entraînement de l’équipe',
        value: '{done} sur {n}',
        unit: 'se sont entraînés aujourd’hui',
        foot: 'Entraînement de résistance et de cardio'
      }
    },
    sensors: {
      radiation: { title: 'Rayonnement', unit: 'mSv/jour', foot: 'Normal de la station : 0,4 à 0,8' },
      co2: { title: 'CO₂', unit: 'ppm', foot: 'Plage illustrative : 2 000 à 3 600' },
      temp: { title: 'Température', unit: '°C', foot: 'Normal : 20 à 25' },
      humidity: { title: 'Humidité', unit: '%', foot: 'Au-dessus de 60 depuis 18:10 · filtre en maintenance' },
      pressure: { title: 'Pression', unit: 'kPa', foot: 'Normal : 99 à 103' }
    },
    goals: {
      training: {
        title: 'Entraînements de l’équipe dans la semaine',
        unit: 'séances',
        note: 'Il reste 7 séances jusqu’à dimanche.'
      },
      mood: {
        title: 'Suivi d’humeur de tous',
        unit: 'jours de suite',
        note: 'Un objectif de 14 jours débloque la réussite collective.'
      },
      reports: { title: 'Rapports envoyés à la base', unit: 'jours', note: 'Le rapport du jour 47 est dans la file.' },
      measures: {
        title: 'Mesures enregistrées aujourd’hui',
        unit: 'mesures',
        note: 'Seulement le décompte de l’équipe : valeurs et noms restent à chaque personne.'
      }
    }
  },
  login: {
    back: 'Choisir un autre membre',
    title: 'Connexion',
    as: 'Se connecter en tant que {name}',
    password: 'Mot de passe',
    error: 'Saisissez le mot de passe pour vous connecter.'
  },
  account: { label: 'Compte connecté', switch: 'Changer de compte', signedAs: 'Connecté en tant que {name}' },
  clock: { day: 'JOUR {day}', aria: 'Jour de mission {day}, {time}' },
  topbar: {
    gravity: 'Station de gravité',
    notifications: 'Notifications de l’équipe',
    ring: {
      ok: 'Batterie de la bague : {n} %. Ouvrir la synchronisation',
      low: 'Bague en charge, batterie {n} %. Ouvrir la synchronisation'
    }
  },
  notif: {
    sub: 'Un court point aide toute l’équipe à rester en forme.',
    empty: 'Aucune nouvelle notification.',
    count: '{n} nouvelles',
    go: 'Voir la recommandation',
    items: {
      mood: '{name} n’a pas encore noté son humeur aujourd’hui. Demandez comment ça va.',
      sync: '{name} n’a pas synchronisé la bague aujourd’hui. Rappelez-lui de la synchroniser.',
      eva: '{name} est en activité extravéhiculaire. Demandez comment ça s’est passé à son retour.'
    }
  },
  agendaPage: { sub: 'Mesures, repas et entraînement tout au long de la journée.' },
  rec: {
    sub: 'Pas à pas pour décider quoi mesurer et quoi faire maintenant, comme un triage.',
    step: 'Étape {n}',
    overall: 'Situation générale',
    s1: {
      title: 'Mesurez ce que la routine demande',
      sub: 'Suivez l’ordre de la journée. Chaque mesure prend quelques minutes.'
    },
    s2: {
      title: 'Comparez avec la plage normale',
      sub: 'Vérifiez si chaque valeur est dans, proche ou hors de la limite.'
    },
    s3: {
      title: 'Faites ce que la recommandation indique',
      sub: 'Seuls les indicateurs qui demandent une action apparaissent ici.'
    },
    s4: { title: 'Prévenez et notez', sub: 'Le résumé ci-dessous sert aussi au médecin de la base.' },
    state: { done: 'Fait', next: 'Suivante', later: 'Plus tard' },
    valueCol: 'Valeur actuelle',
    focus: 'En évidence',
    openIndicator: 'Voir l’indicateur',
    allGood: 'Aucun indicateur ne demande d’action pour le moment. Suivez la routine et mesurez à nouveau à l’heure suivante.',
    notify: {
      ok: 'Rien à signaler pour le moment. Le rapport quotidien part vers la base à l’heure habituelle.',
      warn: 'Notez-le dans le journal et prévenez le capitaine si la mesure reste hors de la plage.',
      crit: 'Prévenez le capitaine maintenant et envoyez le résumé au médecin de la base.'
    },
    baseTitle: 'Résumé pour le médecin de la base',
    baseHint: 'Valeurs actuelles du jour. Délai de communication avec la Terre : {delay}.'
  },
  diary: {
    sub: 'Journal privé : vous seul voyez ce que vous écrivez ici.',
    private: 'Privé',
    privateInfo: 'Les données de votre journal (humeur et notes) vous sont réservées et ne sont accessibles à personne d’autre. Ni le reste de l’équipe ni le capitaine ne voient ce que vous notez ici.',
    moodTitle: 'Comment s’est passée votre journée ?',
    moodHint: 'Choisissez de 1 (très mal) à 5 (très bien). L’entrée n’est qu’à vous.',
    mood: { '1': 'Très mal', '2': 'Mal', '3': 'Moyen', '4': 'Bien', '5': 'Très bien' },
    savedMood: 'Humeur du jour : {label}',
    weekTitle: '7 derniers jours',
    weekAlert: 'Les jours d’humeur basse sont mis en évidence.',
    weekOk: 'Aucun jour d’humeur basse ces 7 derniers jours.',
    noteTitle: 'Note du jour',
    notePlaceholder: 'Écrivez comment vous vous sentez, vos symptômes ou les événements du jour.',
    sensitive: 'Donnée très sensible : masquer le texte',
    sensitiveHint: 'Le texte reste masqué à l’écran et n’est pas inclus dans le rapport envoyé à la base.',
    save: 'Enregistrer la note',
    entriesTitle: 'Notes',
    empty: 'Aucune note pour l’instant.',
    masked: 'Contenu masqué',
    show: 'Afficher',
    hide: 'Masquer',
    remove: 'Supprimer',
    sensitiveTag: 'Sensible',
    howSub: 'Conseils rapides pour chaque indicateur.',
    tabMood: 'Humeur et notes',
    tabsAria: 'Sections du journal'
  },
  train: {
    sub: 'Entraînement du jour, séries, repos et historique du volume.',
    streak: 'Série',
    streakDays: '{n} j',
    points: 'Points',
    streakNote: 'La série ne se brise pas les jours d’alerte, en activité extravéhiculaire ou quand la bague charge.',
    suggest: {
      rest: 'Entraînement suspendu aujourd’hui : un indicateur est critique. Reposez-vous et suivez la recommandation.',
      light: 'Sommeil court : l’entraînement du jour est 30 % plus léger.',
      full: 'Tout va bien : entraînement complet aujourd’hui.'
    },
    routines: { 'full-a': 'Corps entier A', 'full-b': 'Corps entier B' },
    ex: {
      squat: 'Squat',
      bench: 'Développé couché',
      row: 'Rowing penché',
      press: 'Développé militaire',
      rdl: 'Soulevé de terre roumain',
      plank: 'Gainage'
    },
    mg: { legs: 'Jambes', chest: 'Pectoraux', back: 'Dos', shoulders: 'Épaules', core: 'Abdominaux' },
    todayTitle: 'Routine du jour',
    exercisesCount: '{n} exercices',
    lighter: '30 % de répétitions en moins',
    start: 'Démarrer l’entraînement',
    restDay: 'Jour de repos',
    col: {
      set: 'Série',
      exercise: 'Exercice',
      kind: 'Type',
      plan: 'Prévu',
      load: 'Charge (kg)',
      reps: 'Reps',
      rpe: 'Effort',
      done: 'Faite',
      sets: 'Séries',
      restSec: 'Repos (s)'
    },
    kind: { warmup: 'Échauffement', normal: 'Normale' },
    rpeHint: 'Effort perçu : de 1 (léger) à 10 (maximal)',
    setAria: 'Marquer la série {n} de {exercise} comme faite',
    rest: 'Repos',
    restSkip: 'Passer le repos',
    restDone: 'Repos terminé. Série suivante.',
    finish: 'Terminer l’entraînement',
    saved: 'Entraînement enregistré : {volume} kg de volume.',
    needSet: 'Marquez au moins une série comme faite pour enregistrer.',
    historyTitle: 'Historique',
    historyEmpty: 'Aucun entraînement enregistré.',
    volumeTitle: 'Volume par jour',
    volumeAria: 'Volume d’entraînement des 7 derniers jours : {values}',
    lastVolume: 'Dernier entraînement',
    best1rm: 'Meilleur 1RM estimé',
    setsByGroup: 'Séries par groupe musculaire (7 jours)',
    workoutLine: '{routine} · {sets} séries · {volume} kg',
    setsUnit: 'séries',
    setsReps: '{sets} × {reps}',
    customize: 'Personnaliser l’entraînement',
    editTitle: 'Personnaliser : {routine}',
    addExercise: 'Ajouter un exercice',
    removeExercise: 'Retirer {exercise}',
    saveRoutine: 'Enregistrer la routine',
    resetRoutine: 'Rétablir par défaut',
    routineSaved: 'Routine enregistrée.',
    routineReset: 'Routine rétablie par défaut.',
    customized: 'Personnalisée',
    invalidRoutine: 'Vérifiez séries, répétitions et repos : utilisez des nombres entiers supérieurs à zéro.',
    emptyRoutine: 'Ajoutez au moins un exercice.'
  },
  food: {
    tab: 'Alimentation',
    phaseLabel: 'Phase',
    phase: { lancamento: 'Lancement', orbita: 'Orbite', reentrada: 'Rentrée' },
    phaseNote: {
      lancamento: 'Distributeur d’eau coupé : seulement des produits prêts, sans eau ni chauffage.',
      orbita: 'Tous les produits du menu sont disponibles.',
      reentrada: 'Distributeur d’eau coupé : seulement des produits prêts, sans eau ni chauffage.'
    },
    counter: { meals: 'Repas', drinks: 'Boissons aromatisées', desserts: 'Desserts' },
    ofMax: '{n} sur {max}',
    dessertsLeft: 'il en reste {n} aujourd’hui',
    register: 'Enregistrer un repas',
    meal: 'Repas',
    meals: { cafe: 'Petit-déjeuner', almoco: 'Déjeuner', jantar: 'Dîner', lanche: 'Collation' },
    pick: 'Touchez les produits pour les ajouter. Touchez encore pour ajouter des portions.',
    categories: {
      principal: 'Plats principaux',
      acompanhamento: 'Accompagnements et bases',
      'cafe-lanche': 'Petit-déjeuner et collations',
      sobremesa: 'Desserts',
      bebida: 'Boissons'
    },
    reasons: {
      'needs-water': 'demande de l’eau, distributeur coupé',
      'needs-heat': 'demande du chauffage, indisponible dans cette phase',
      'out-of-stock': 'stock épuisé',
      'wrong-meal': 'ne convient pas à ce repas'
    },
    forceHint: 'Enregistrer quand même',
    pending: 'Produits de ce repas',
    pendingEmpty: 'Aucun produit choisi.',
    freeItem: 'Autre produit',
    freePlaceholder: 'Quelque chose qui n’est pas au menu',
    addFree: 'Ajouter',
    save: 'Enregistrer',
    saved: 'Repas enregistré.',
    removeItem: 'Retirer {item}',
    qtyAria: '{item} : {n} portions',
    todayTitle: 'Aujourd’hui',
    historyEmpty: 'Aucune entrée aujourd’hui.',
    delete: 'Supprimer l’entrée',
    warningsTitle: 'Avis',
    noWarnings: 'Aucun avis.',
    info: 'Information',
    warn: {
      'dessert-left': 'Vous avez déjà pris {n} dessert(s) sur {max} aujourd’hui.',
      'dessert-last': 'C’est le dernier dessert d’aujourd’hui. Le stock est partagé avec l’équipe.',
      'dessert-over': 'Vous avez dépassé la limite de desserts d’aujourd’hui. Enregistré.',
      'dessert-streak': 'Trois jours au-dessus de la limite de desserts. Le stock de l’équipe s’épuise plus vite.',
      'team-stock-low': 'Les desserts de l’équipe touchent à leur fin.',
      'drink-last': 'C’est votre dernière boisson aromatisée aujourd’hui.',
      'drink-over': 'Vous avez dépassé les {max} boissons aromatisées d’aujourd’hui. Enregistré.',
      bread: 'Le pain ordinaire est interdit à bord : les miettes flottent. Enregistré quand même.',
      'out-of-rule': 'Enregistré hors règle : {item} ({reason}).',
      'meal-not-scheduled': 'Au lancement et à la rentrée, aucun repas n’est programmé : seulement une collation de produits prêts. Enregistré.',
      'meal-duplicate': '{meal} a déjà le nombre maximal d’entrées aujourd’hui ({max}).',
      'meal-over-cap': 'Trop de produits de {category} dans ce repas : {max} maximum prévu. Enregistré.'
    },
    stockTitle: 'Stock de l’équipe',
    stockSub: 'Sans noms : seulement ce qui reste du menu.',
    portionsUnit: 'portions',
    stockLeft: '{left} sur {total} portions',
    openLog: 'Ouvrir l’alimentation',
    disclaimer: 'Les limites et le stock sont illustratifs et doivent être validés par l’équipe médicale et nutritionnelle.',
    items: {
      brisket: 'Poitrine de bœuf fumée (brisket)',
      'macarrao-queijo': 'Macaronis au fromage',
      'quiche-vegetais': 'Quiche aux légumes',
      'curry-camarao': 'Curry de crevettes',
      'mordidas-salmao': 'Bouchées de saumon sauvage',
      tortilhas: 'Tortillas de blé',
      'cuscuz-castanhas': 'Couscous aux noix',
      'brocolis-gratinado': 'Brocoli gratiné',
      'vagem-apimentada': 'Haricots verts épicés',
      abobora: 'Courge butternut',
      'ovos-mexidos': 'Œufs brouillés',
      salsichas: 'Saucisses',
      aveia: 'Flocons d’avoine',
      'granola-mirtilo': 'Granola aux myrtilles',
      'cereal-morango': 'Céréales à la fraise et à la lavande',
      amendoas: 'Amandes',
      'castanha-caju': 'Noix de cajou',
      pudim: 'Pudding',
      bolo: 'Gâteau',
      'biscoito-bordo': 'Biscuit à la crème d’érable',
      muffin: 'Muffin',
      chocolate: 'Chocolat',
      cafe: 'Café',
      'cha-verde': 'Thé vert',
      smoothie: 'Smoothie mangue-pêche',
      limonada: 'Limonade',
      cidra: 'Cidre de pomme',
      achocolatado: 'Boisson chocolatée'
    },
    capHint: 'jusqu’à {n} dans ce repas',
    showOthers: 'Afficher les produits des autres repas',
    hideOthers: 'Masquer les produits des autres repas',
    qtyMore: 'Une portion de plus de {item}',
    qtyLess: 'Une portion de moins de {item}',
    selectedCount: '{n} sélectionnés'
  },
  measure: {
    open: 'Enregistrer',
    title: 'Enregistrer {name}',
    hint: 'L’enregistrement prend 20 secondes. La donnée reste avec vous, sauf si elle est critique.',
    field: {
      sys: 'Systolique (haute)',
      dia: 'Diastolique (basse)',
      gl: 'Glycémie (mg/dL)',
      kg: 'Masse (kg)',
      device: 'Appareil',
      note: 'Note (facultatif)'
    },
    deviceOther: 'Autre ou sans appareil',
    save: 'Enregistrer la mesure',
    saved: 'Mesure enregistrée',
    state: 'État',
    avg: 'Moyenne des {n} dernières entrées : {value}',
    trend: 'Tendance sur 7 jours',
    noTrend: 'Enregistrez plus de jours pour voir la tendance.',
    massDelta: 'Variation de la masse : {pct} % par rapport à la référence',
    massNoBase: 'Enregistrez pendant 7 jours pour créer la référence de masse.',
    critical: 'Hors de la plage. Refaites la mesure et consultez la Recommandation.',
    err: {
      range: 'Valeur impossible. Vérifiez la saisie : de {min} à {max}.',
      sysdia: 'La systolique doit être supérieure à la diastolique.',
      required: 'Renseignez la valeur.'
    },
    why: {
      title: 'Pourquoi mesurer la tension, la glycémie et le poids',
      intro: 'La bague mesure seule la fréquence cardiaque, la température et le sommeil. La tension, la glycémie et le poids n’existent que si vous les mesurez et les enregistrez.',
      pa: 'Montre comment le cœur et les vaisseaux s’adaptent à la microgravité, quand les liquides du corps montent vers la tête. Aide à prévenir les vertiges au retour à la gravité.',
      gl: 'Montre comment le corps gère l’énergie sous stress, avec un sommeil perturbé et le régime de bord.',
      kg: 'Montre si la nourriture couvre la dépense d’énergie et s’il y a perte de muscle. Relie alimentation, entraînement et santé.',
      freqPa: '1 fois par jour, le matin, assis et au repos',
      freqGl: '1 fois par jour, avant le petit-déjeuner',
      freqKg: '1 fois par jour, à la même heure, avant de manger',
      when: 'Quand mesurer',
      message: 'On ne mesure pas pour être jugé : on mesure pour que le corps prévienne tôt. L’enregistrement prend 20 secondes et la donnée reste avec vous, sauf si elle est critique.',
      disclaimer: 'Les valeurs et fréquences sont des références pour le prototype et doivent être validées par un professionnel de santé avant tout usage réel.'
    },
    registerNow: 'Enregistrer maintenant',
    mine: 'Vos entrées',
    mineEmpty: 'Aucune entrée pour l’instant.',
    lastReg: 'Votre dernière entrée',
    remind: '{name} : c’est l’heure d’enregistrer. Cela prend 20 secondes.',
    ach: {
      sub: 'Récompense l’habitude de mesurer, pas la valeur mesurée.',
      streak: 'Série de mesures',
      streakNote: 'Compte les jours avec tension, glycémie et poids enregistrés. Un jour sans entrée n’est pas un reproche : la série recommence simplement.',
      days: '{n} jours de suite',
      grid: '14 derniers jours',
      dayAria: '{date} : {n} mesures sur 3'
    }
  },
  gm: {
    sub: 'Récompense l’habitude, pas la valeur mesurée. Ici, vous ne vous comparez qu’à vous-même.',
    level: {
      title: 'Votre niveau',
      points: '{n} points',
      toNext: 'Encore {n} points pour {name}',
      max: 'Niveau maximal atteint',
      howTitle: 'Comment gagner des points',
      how: 'Entraînement +{workout} · chaque mesure +{measure} (les 3 ensemble +{complete}) · humeur +{mood} · repas +{meal} · mission du jour +{mission}',
      l0: 'Cadet',
      l1: 'Équipier',
      l2: 'Spécialiste',
      l3: 'Navigateur',
      l4: 'Pilote',
      l5: 'Vétéran'
    },
    mission: {
      title: 'Mission du jour',
      sub: 'Trois petites étapes pour clore la journée.',
      measures: 'Enregistrer tension, glycémie et poids',
      train: 'Faire l’entraînement du jour',
      rest: 'Jour de repos : entraînement dispensé',
      mood: 'Enregistrer l’humeur',
      done: 'Fait',
      todo: 'À faire',
      open: 'Ouvrir',
      reward: 'Terminez les 3 éléments pour gagner +{n} points',
      complete: 'Mission accomplie ! +{n} points'
    },
    streak: {
      title: 'Série de missions',
      shields: 'Boucliers : {left} sur {max} ce mois-ci',
      note: 'Un bouclier couvre un jour manqué et la série continue. Ils se renouvellent chaque mois.'
    },
    badge: {
      title: 'Badges',
      sub: 'Chaque badge marque une habitude, pas une valeur mesurée.',
      earned: 'Obtenu',
      progress: '{value} sur {target}',
      measureStreak: '{n} jours de suite de mesures',
      trainStreak: '{n} jours de suite d’entraînement',
      workouts: '{n} entraînements faits',
      moodDays: '{n} jours d’humeur enregistrée',
      mealDays: '{n} jours d’alimentation enregistrée',
      missionStreak: '{n} missions de suite'
    },
    team: {
      title: 'Objectifs de l’équipe',
      note: 'Seulement les totaux de l’équipage : ni noms, ni valeurs, ni classement.',
      measures: 'Mesures de la semaine',
      train: 'Entraînements de la semaine',
      count: '{done} sur {total}',
      goal: 'Objectif : {pct} %',
      reached: 'Objectif atteint',
      badgeMeasures: 'Équipe à jour sur les mesures',
      badgeTrain: 'Équipe en mouvement'
    },
    recap: {
      title: 'Votre semaine',
      sub: 'Comparée seulement à votre semaine précédente.',
      points: 'Points',
      missions: 'Missions accomplies',
      measures: 'Mesures enregistrées',
      workouts: 'Entraînements',
      moodDays: 'Jours avec humeur',
      mealDays: 'Jours avec alimentation',
      up: '+{n} points par rapport à la semaine précédente',
      down: '{n} points de moins que la semaine précédente. Pas de souci : chaque semaine est un nouveau départ.',
      same: 'Même score que la semaine précédente'
    }
  },
  cap: {
    sub: 'L’état de chaque équipier, sans valeurs personnelles, pour décider avec l’équipe.',
    privacy: 'Le panneau montre seulement l’état de chaque personne. Les valeurs, le journal, l’humeur individuelle et l’alimentation restent à chaque équipier.',
    decision: {
      title: 'Décision requise',
      sub: 'Mesures critiques restées critiques à la nouvelle mesure (RN03, RN04).',
      empty: 'Aucune décision en attente.',
      item: '{name} : {measure} critique, confirmé à la nouvelle mesure',
      hint: 'Convenez de la conduite avec la personne. Les valeurs restent chez elle.',
      ack: 'Marquer comme suivi',
      ackAria: 'Marquer comme suivi : {name}, {measure}'
    },
    crew: {
      title: 'État de l’équipage',
      battery: 'Bague {n} %',
      charging: 'Bague en charge',
      measures: 'Mesures {n}/3',
      trained: 'S’est entraîné aujourd’hui',
      notTrained: 'Pas d’entraînement aujourd’hui'
    },
    ready: {
      title: 'Aptitude de la mission',
      fit: '{n} sur {total} aptes',
      attention: 'En vigilance : {n}',
      charging: 'Bagues en charge : {n}',
      note: 'Apte signifie ne pas être en état critique.'
    },
    notify: '{name} : {measure} en état critique, confirmé à la nouvelle mesure. Voir le panneau du capitaine.',
    go: 'Ouvrir le panneau'
  },
  syncPage: {
    hello: 'Bonjour, {name}',
    title: 'Synchroniser la bague',
    sub: 'Avant d’entrer, l’app récupère les mesures de la bague et vérifie celles d’aujourd’hui.',
    ring: { connected: 'Bague connectée', charging: 'Bague en charge', battery: 'Batterie {n} %' },
    steps: {
      find: 'Recherche de la bague',
      fetch: 'Téléchargement des mesures depuis la dernière synchronisation',
      check: 'Vérification des mesures d’aujourd’hui'
    },
    done: {
      findOk: 'Bague trouvée',
      findWarn: 'Bague sur sa base, en charge',
      fetchOk: 'Mesures à jour',
      fetchWarn: 'Pas de nouvelles mesures pour l’instant',
      checkOk: 'Mesures d’aujourd’hui vérifiées'
    },
    running: 'Synchronisation…',
    ready: 'Tout est prêt.',
    result: {
      connected: 'Bague synchronisée. Les mesures d’aujourd’hui sont déjà dans l’app.',
      charging: 'La bague est en charge, il n’y a donc pas de nouvelles mesures. Votre série n’est pas rompue et vous pouvez mesurer à la main dans Mesurer maintenant.'
    },
    today: 'Mesures d’aujourd’hui : {n} sur 3 enregistrées',
    enter: 'Entrer dans le tableau de bord',
    skip: 'Passer pour l’instant',
    retry: 'Réessayer'
  }
};

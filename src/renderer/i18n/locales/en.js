// English. Same keys as pt.js.
export default {
  lang: { label: 'Language' },
  brand: { logoAlt: 'Vento Norte UEA team logo', byline: 'by Vento Norte UEA' },
  status: { ok: 'Normal', warn: 'Attention', crit: 'Critical' },
  time: {
    hm: '{h} h {m}',
    day: 'day {n}',
    dayHour: 'day {n} · {time}',
    now: 'now',
    yesterday: 'yesterday {time}',
    daysAgo7: '7 days ago',
    today: 'today',
    hoursAgo24: '24 h ago'
  },
  src: { manual: 'Manual', ring: 'Ring', ringManual: 'Ring + manual', you: 'You' },
  when: { ring: '4 min ago', yPa: 'yesterday 19:40', wake: 'on waking', yGl: 'yesterday 07:35', yHu: 'yesterday 21:40' },
  nav: {
    aria: 'App navigation',
    missionOpen: 'Open mission information',
    patchAlt: 'Team {name} patch',
    team: 'Team',
    myDay: 'My day',
    teamSection: 'Team',
    today: 'Today',
    indicators: 'Indicators',
    measure: 'Measure now',
    diary: 'Flight log',
    routine: 'Routine and training',
    achievements: 'Achievements',
    commander: 'Captain panel',
    crewPanel: 'Crew panel',
    switchCrew: 'Switch crew member',
    personalView: 'personal view',
    agenda: 'Today’s schedule',
    recommendation: 'Recommendation',
    collapse: 'Collapse menu',
    expand: 'Expand menu'
  },
  team: { missionId: 'Mission ID: #102' },
  crew: {
    cristiano: { role: 'Captain', activity: 'Materials experiment' },
    'luis-felipe': { role: 'Mission specialist', activity: 'Endurance training' },
    mike: { role: 'Mission specialist', activity: 'Meeting with base', until: 'until 09:30' },
    ruan: { role: 'Pilot', activity: 'Extravehicular activity', until: 'back 15:30' },
    rita: { role: 'Mission specialist', activity: 'Air filter maintenance' },
    photoOf: 'Photo of {name}',
    captain: 'CAPTAIN',
    captainLabel: 'captain',
    sex: { f: 'Female', m: 'Male' }
  },
  pickTeam: {
    title: 'Select team',
    label: 'Team',
    choose: 'Choose a team',
    listAria: 'Teams',
    crewCount: '{n} crew members',
    newTeam: 'New mission',
    form: {
      title: 'Create mission',
      teamName: 'Team name',
      missionId: 'Mission ID',
      days: 'Mission duration (days)',
      daysHint: 'Required. Enter a whole number of days, greater than zero.',
      daysError: 'Enter the mission duration in days (a whole number greater than zero).',
      required: 'Required field',
      cancel: 'Cancel',
      created: 'Mission {id} created for team {team}: {days} days. Crew registration comes in a later screen.'
    },
    missionLine: '{id} · {days} days'
  },
  pickCrew: { switchTeam: 'Switch team', who: 'Who are you?', team: 'Team' },
  mission: {
    label: 'MISSION',
    close: 'Close',
    tagline: 'An app for astronauts to measure, understand and act on their own health, even when Earth is too far away to answer.',
    patchAlt: '{name} patch of team {org}, {label}',
    facts: { team: 'Team', patch: 'Patch', challenge: 'Mission', crew: 'Crew', missionId: 'Mission ID' },
    challengeValue: '7th edition of the Latin American Space Challenge (LASC 2026)',
    footer: 'Created by team Vento Norte UEA. This is a prototype for the challenge “Create health-monitoring software for astronauts on space missions” at the NASA Space Apps Challenge 2026 hackathon, with no official link to NASA or AEB. People, values and readings were generated from dedicated libraries (e.g. NeuroKit2 and Claude Code AI).',
    missionIdValue: '#102 · day {day}',
    teamDesc: 'First university team in model and high-power rocketry in the State of Amazonas and in Brazil’s North Region'
  },
  link: {
    title: 'Connection with Earth',
    close: 'Close',
    openAria: 'Connection with Earth: {status}',
    lastSent: 'Last sent: {ago} ago · Confirmation of delivery to base will be sent within 12min',
    lastSentOffline: 'Last sent: {ago} ago',
    sendNow: 'Send now',
    demoState: 'Demo mode · state',
    stateAria: 'Connection state',
    states: {
      online: { label: 'Connected to base · 1 s delay', name: 'Connected', flow: 'Data is flowing normally to the base.' },
      lag: {
        label: 'Connected to base · 12 min delay',
        name: 'Long delay',
        flow: 'Data is reaching the base with a 12 min delay.'
      },
      off: { label: 'No contact with Earth', name: 'No contact', flow: 'No data is reaching the base right now.' },
      send: { label: 'Sending data to base', name: 'Sending', flow: 'The signal is back and data is being sent.' },
      warn: {
        label: 'No contact with Earth for 6 h',
        name: 'No contact for 6 h',
        flow: 'No data has reached the base for 6 h. The crew was notified.'
      }
    }
  },
  soon: {
    heading: 'This screen has not been built yet',
    back: 'Back to Today',
    sub: 'Team {name}',
    pages: {
      medir: {
        title: 'Measure now',
        desc: 'Log a manual measurement (blood pressure, glucose, temperature) or read the ring, with the range for each indicator.'
      },
      comandante: {
        title: 'Captain panel',
        desc: 'Status of each crew member, without personal values, to decide together with the team.'
      }
    }
  },
  names: {
    pa: 'Blood pressure',
    fc: 'Heart rate',
    gl: 'Glucose',
    tc: 'Temperature',
    sn: 'Sleep',
    hu: 'Mood',
    o2: 'Oxygenation',
    rad: 'Radiation'
  },
  cards: {
    pa: { name: 'Blood pressure' },
    fc: { name: 'Resting heart rate' },
    gl: { name: 'Fasting glucose' },
    tc: { name: 'Body temperature' },
    sn: { name: 'Hours of sleep' },
    hu: { name: 'Mood level' },
    o2: { name: 'Oxygen saturation (SpO₂)', short: 'Oxygen (SpO₂)' },
    kg: { name: 'Body weight' },
    rad: { name: 'Radiation today', short: 'Radiation' },
    ring: { name: 'Smart ring' },
    alim: { name: 'Food' }
  },
  scenarios: { comum: 'Ordinary day', febre: 'Fever', hipoxia: 'Hypoxia', estresse: 'Stress', radiacao: 'Radiation' },
  environments: {
    estacao: {
      label: 'Station',
      name: 'Space station',
      g: 'Microgravity (about 0 g)',
      delay: 'Under 1 s',
      light: '16 sunrises per day',
      note: 'Daily resistance training helps protect muscles and bones. Anchor yourself to the support when measuring blood pressure.'
    },
    lua: {
      label: 'Moon',
      name: 'Lunar surface',
      g: '1/6 of Earth’s gravity',
      delay: 'About 2.6 s, round trip',
      light: 'Lunar day of about 29.5 days',
      note: 'With low gravity, training needs extra load. The fine dust calls for care with eyes and airways.'
    },
    marte: {
      label: 'Mars',
      name: 'Surface of Mars',
      g: '0.38 of Earth’s gravity',
      delay: '3 to 22 min, one way',
      light: 'Sol of 24 h 39 min',
      note: 'The Martian day is 39 min longer: the mission clock follows that rhythm so sleep does not drift. Without Earth in real time, decide with the recommendation.'
    },
    terra: {
      label: 'Remote Earth',
      name: 'Remote community on Earth',
      g: 'Normal gravity (1 g)',
      delay: 'Satellite, intermittent',
      light: 'Normal 24 h cycle',
      note: 'With no specialists nearby, the recommendation walks through first aid and the summary goes to the health team when there is a signal.'
    }
  },
  agenda: {
    sync: 'Sync the ring',
    cafe: 'Breakfast',
    almoco: 'Lunch',
    treino: 'Strength training',
    diario: 'Flight log',
    sono: 'Bedtime',
    medpa: 'Measure blood pressure',
    medgl: 'Measure fasting glucose',
    medkg: 'Measure weight (mass)'
  },
  today: {
    greeting: 'Good morning, {name}',
    signalsAria: 'Signal bar',
    signalTitle: '{name}: {value}, {status}',
    demo: 'Demo mode',
    scenario: 'Scenario',
    environment: 'Environment',
    editHint: 'Drag the handle to move, pull the right edge to change the width, or archive what you do not need.',
    restore: 'Restore default',
    finish: 'Done',
    customize: 'Customize',
    addToPanel: 'Add to panel',
    indicatorsAria: 'Indicators',
    normal: 'Normal: {range}',
    trend: '{name} trend over the last 7 days, latest value {value}',
    dragMove: 'Drag to move',
    archiveCard: 'Archive card',
    archive: 'Archive',
    resize: 'Drag to change the width',
    agenda: 'Today’s schedule',
    agendaDone: '{done} of {total} done',
    open: 'Open',
    markDone: 'Mark as done: {title}',
    envTitle: 'Environment: {name}',
    gravity: 'Gravity',
    comms: 'Communication',
    light: 'Light cycle',
    normalRad: 'Normal radiation',
    radUnit: 'mSv/day',
    illustrative: 'Illustrative values, to be validated with official sources before any real use.',
    ranges: { pa: '90–119 / 60–79', fc: '50–95 at rest', gl: '70–99 fasting', tc: '36.1–37.5', sn: '7–9 h', hu: '3 to 5' },
    units: { sn: 'last night', hu: 'out of 5', o2: '%', kg: 'kg', ring: 'battery' },
    o2Cap: 'Ring · overnight',
    kgCap: 'Baseline 74.0 kg · +0.3%',
    radCapHigh: '{x} times the normal for the environment',
    radCapOk: 'Within the normal for the environment',
    ringCap: 'Synced 4 min ago · worn for 31 h',
    ringChip: 'Connected',
    details: {
      sync: 'Ring connected · battery 78%',
      med: 'Guided manual measurement, seated and at rest',
      cafe: 'Time to eat. Log it in the flight log.',
      almoco: 'Time to eat. Log it in the flight log.',
      treinoCrit: 'Suspended today: an indicator is critical. Rest and follow the recommendation.',
      treinoShort: 'Suggested volume: 3 × 7 (30% less due to sleep or mood)',
      treinoFull: 'Suggested volume: 3 × 10, full load',
      diario: 'Mood, meals and symptoms of the day',
      sono: 'Goal: 7 h 30. Low light from 21:30.',
      medgl: 'Fasting, before breakfast',
      medkg: 'At the usual time, before eating'
    },
    alert: {
      contact: 'Contact with Earth: {delay}.',
      guide: 'Open the recommendation',
      cabin: 'See cabin panel',
      seeWhat: 'See what to do',
      tcTitle: 'Temperature at {value} °C',
      tcText: 'Confirm with the onboard thermometer. The recommendation explains what to do now.',
      o2Title: 'Low oxygenation: {value}%',
      o2Text: 'Sit down, breathe deeply and check the sensor position. If it stays below 92%, follow the protocol.',
      radTitle: 'Radiation {x} times above normal',
      radText: 'Possible solar particle event. Go to the shelter area and wait for instructions.',
      critTitle: '{name} critical',
      critText: 'Repeat the measurement and follow the recommendation.',
      warnOne: '{name} needs attention',
      warnMany: '{n} indicators need attention',
      warnSleep: 'You slept {value}. Today’s training is cut by 30% to protect your recovery.',
      warnText: 'Outside the normal range. See what to do.'
    },
    mock: {
      label: 'Sample data',
      on: 'On',
      off: 'Off',
      note: '3 weeks of crew history, for the demo only. Nothing is written to disk.'
    }
  },
  ind: {
    title: 'Indicators',
    sub: 'Trend, what it means and what to do, one indicator at a time.',
    ringSync: 'Ring synced 4 min ago',
    pickAria: 'Choose the indicator',
    periodAria: 'Period',
    legendAria: 'Legend',
    ranges: { '24h': '24 hours', '7d': '7 days', '30d': '30 days' },
    systolic: 'Systolic',
    diastolic: 'Diastolic',
    normalBand: 'Normal range',
    outBand: 'Out of range',
    stat: { avg: 'Average', min: 'Lowest', max: 'Highest', out: 'Out of range' },
    outOf: '{a} of {b}',
    wave: {
      title: 'Ring waveform',
      simulated: 'SIMULATED',
      ppg: 'Pulse (PPG), 6 seconds',
      ecg: 'Electrocardiogram (ECG), 6 seconds',
      ppgAlt: 'Simulated pulse wave with regular beats',
      ecgAlt: 'Simulated ECG trace with regular QRS complexes',
      note: 'Signals generated by simulation for the demo. The ring measures the pulse (PPG); the ECG would come from an additional sensor, still to be defined.'
    },
    howTitle: 'How to measure',
    whyTitle: 'Why it matters',
    lastValue: 'Latest value',
    normalLabel: 'Reference value',
    measurement: 'Measurement',
    baseline: 'Your baseline',
    whatToDo: 'Recommendation',
    disclaimer: 'Ranges, limits and guidance are illustrative and must be validated by the mission’s medical team before any real use. The app does not provide diagnosis.',
    per: {
      h24: 'last 24 h · every 30 min',
      d7manual: 'last 7 days · {per}',
      d7: 'last 7 days · every 2 h',
      d30manual: 'last 30 days · {per}',
      d30: 'last 30 days · daily average'
    },
    alt: 'Chart of {name}, {range}. Latest value {value} {unit}, {status}. Average {avg}, lowest {min}, highest {max}, {out} of {n} out of the normal range.',
    pa: {
      name: 'Blood pressure',
      short: 'Blood pressure',
      unit: 'mmHg',
      axis: 'mmHg',
      bands: ['Normal systolic', 'Normal diastolic'],
      range: '90–119 / 60–79',
      base: '116/75',
      per: 'one measurement per day',
      msg: {
        ok: 'Within the normal range.',
        warn: 'Outside the normal range. Repeat the measurement calmly.',
        crit: 'Beyond the safe limit. Confirm and notify the captain.'
      },
      why: [
        'Blood pressure shows how hard the heart works to pump blood. In microgravity, body fluids shift upward, and that can affect blood pressure.'
      ],
      how: [
        'Sit with your back supported and feet firm. On the station, anchor your feet to the support.',
        'Rest for 5 minutes, in silence.',
        'Place the cuff on your arm, at heart level.',
        'Measure twice, 1 minute apart. The app stores the average.'
      ],
      acts: [
        { rule: '90–119 / 60–79', text: 'Follow the routine and measure again tomorrow, at the same time.' },
        {
          rule: '120–139 / 80–89, or below 90/60',
          text: 'Repeat in 5 minutes, seated. Avoid caffeine and salt today and note how you feel in the flight log.'
        },
        {
          rule: '140/90 or more, or below 80/50',
          text: 'Stop the activity and sit down. Repeat in 5 minutes. If confirmed, notify the captain. With chest pain, shortness of breath or dizziness, call for help now.'
        }
      ],
      cta: 'Measure blood pressure now'
    },
    fc: {
      name: 'Resting heart rate',
      short: 'Resting HR',
      unit: 'bpm',
      axis: 'bpm',
      bands: ['Normal resting range'],
      range: '50–95 bpm at rest',
      base: '60 bpm',
      per: 'measured by the ring',
      msg: {
        ok: 'Within the resting range.',
        warn: 'Outside the resting range. Sit down and breathe slowly.',
        crit: 'Far outside the range. Stop and check your pulse.'
      },
      why: [
        'Resting heart rate shows how the heart is adapting. A rise without effort can point to stress, fever, dehydration or fatigue.',
        'The ring measures all day. What counts is rest: seated, with no training for at least 15 minutes.'
      ],
      how: [
        'Wear the ring snug on your finger, with no slack.',
        'Sync when you wake up and before going to sleep.',
        'For a resting value, sit in silence for 5 minutes before looking at the screen.'
      ],
      acts: [
        { rule: '50–95 bpm at rest', text: 'All good. Keep up the training and the day’s routine.' },
        {
          rule: '96–110 or 40–49 bpm at rest',
          text: 'Sit down and breathe slowly for 5 minutes. Think about recent effort, caffeine or stress. If it persists, measure blood pressure.'
        },
        {
          rule: 'Above 110 or below 40 bpm at rest',
          text: 'Stop what you are doing and sit down. Check your pulse at the wrist for 1 minute and notify the captain. With chest pain, fainting or shortness of breath, call for help now.'
        }
      ],
      cta: 'Log how I feel'
    },
    gl: {
      name: 'Fasting glucose',
      short: 'Glucose',
      unit: 'mg/dL',
      axis: 'mg/dL',
      bands: ['Normal fasting range'],
      range: '70–99 mg/dL fasting',
      base: '94 mg/dL',
      per: 'one measurement per day, fasting',
      msg: {
        ok: 'Within the fasting range.',
        warn: 'Outside the range. Repeat tomorrow while fasting.',
        crit: 'Beyond the safe limit. Measure again now.'
      },
      why: [
        'Glucose is the body’s fuel. On a mission, stress, short sleep and diet changes can push the value up or down.',
        'The fasting measurement is the easiest to compare from one day to the next.'
      ],
      how: [
        'Go 8 hours without eating, water only.',
        'Wash and dry your hands.',
        'Prick the side of your fingertip and touch the drop to the glucometer strip.',
        'Note the value. The app stores the date and time.'
      ],
      acts: [
        { rule: '70–99 mg/dL fasting', text: 'Follow the routine. Measure fasting again tomorrow.' },
        {
          rule: '100–125 or 54–69 mg/dL',
          text: 'Repeat the measurement. Below 70: eat 15 g of fast-acting sugar and measure again in 15 minutes. Above 100: note your last meal in the flight log.'
        },
        {
          rule: '126 mg/dL or more, or below 54',
          text: 'Measure again now. Below 54: eat 15 g of fast-acting sugar, stay still and notify the captain. Above 126 confirmed: notify the medical team.'
        }
      ],
      cta: 'Measure glucose now'
    },
    tc: {
      name: 'Body temperature',
      short: 'Temperature',
      unit: '°C',
      axis: '°C',
      bands: ['Normal range'],
      range: '36.1–37.5 °C',
      base: '36.6 °C',
      per: 'estimated by the ring',
      msg: {
        ok: 'Within the normal range.',
        warn: 'Slightly outside the range. Confirm with the thermometer.',
        crit: 'Possible fever. Confirm and follow the recommendation.'
      },
      why: [
        'Temperature rises with infection, effort and stress. In microgravity the body loses heat differently, so following the trend helps more than a single value.',
        'The ring estimates skin temperature. If it goes above normal, confirm with the onboard thermometer.'
      ],
      how: [
        'The ring estimates skin temperature, day and night.',
        'If the value leaves the range, wait 15 minutes after training or a shower.',
        'Measure with the onboard thermometer, at the ear or forehead.',
        'Log the value. The app compares it with the ring’s estimate.'
      ],
      acts: [
        { rule: '36.1–37.5 °C', text: 'Follow the routine and drink water throughout the day.' },
        {
          rule: '37.6–37.9 °C, or 35.0–36.0 °C',
          text: 'Confirm with the onboard thermometer. Hydrate, rest and measure again in 1 hour.'
        },
        {
          rule: '38.0 °C or more, or below 35.0 °C',
          text: 'Confirm with the thermometer. With a fever, keep away from others and notify the captain. Follow the onboard infection protocol.'
        }
      ],
      cta: 'Measure temperature now'
    },
    sn: {
      name: 'Hours of sleep',
      short: 'Sleep hours',
      unit: 'last night',
      axis: 'hours per night',
      bands: ['Normal range'],
      range: '7 to 9 h per night',
      base: '7 h 20',
      per: 'one night per bar',
      msg: {
        ok: 'A good night’s sleep.',
        warn: 'Short night. Today’s training is cut by 30%.',
        crit: 'Very short sleep. Light training and no risky tasks.'
      },
      why: [
        'Sleeping less than 7 hours a night hurts attention and recovery. On a mission, that weighs on risky tasks.',
        'The ring records sleep on its own. Low light at night and a fixed schedule help the body clock.'
      ],
      how: [
        'Wear the ring at night, snug on your finger.',
        'Sync when you wake up. The app shows the total hours.',
        'From 21:30, keep the light low and avoid screens.'
      ],
      acts: [
        { rule: '7 to 9 h', text: 'Keep the schedule. Normal training today.' },
        {
          rule: '5 h to 6 h 59, or more than 9 h',
          text: 'Today’s training is cut by 30%. Avoid caffeine after 14:00 and take a nap of up to 20 minutes if needed.'
        },
        {
          rule: 'Less than 5 h',
          text: 'Light training and no risky tasks, such as an extravehicular outing. Notify the captain and arrange rest.'
        }
      ],
      cta: 'Adjust today’s training'
    },
    hu: {
      name: 'Mood level',
      short: 'Mood',
      unit: 'out of 5',
      axis: 'score from 1 to 5',
      bands: ['Normal range'],
      range: 'score 3 to 5',
      base: 'score 4',
      per: 'one entry per day',
      msg: {
        ok: 'Stable mood.',
        warn: 'Low mood. It is worth talking to someone.',
        crit: 'Very low mood. Seek support today.'
      },
      why: [
        'Mood changes before other signs of fatigue and stress appear. Logging every day helps you notice the trend.',
        'The entry is yours alone. You choose whether to share your mood with the team.'
      ],
      how: [
        'Ask yourself: how was my day?',
        'Choose from 1 (very bad) to 5 (very good) in the flight log.',
        'If you like, write a note. It stays with you only.'
      ],
      acts: [
        { rule: 'Score 3 to 5', text: 'Follow the routine. Log again tomorrow.' },
        {
          rule: 'Score 2',
          text: 'Talk to someone on the team or write in the flight log. Take a 15-minute break in a place with bright light.'
        },
        {
          rule: 'Score 1',
          text: 'Talk to someone you trust today. If you want, the captain will request psychological support from Earth.'
        }
      ],
      cta: 'Write in the flight log'
    },
    openRecommendation: 'Open step by step',
    infoOpen: 'Why {name} matters'
  },
  panel: {
    title: 'Crew panel',
    eva: 'EVA',
    nowLabel: 'now',
    whoTitle: 'Who is doing what',
    whoSub: 'Each person’s activity right now, with no health data.',
    avgTitle: 'Team averages',
    avgSub: 'Average of {n} people, no names.',
    sensorsTitle: 'Cabin sensors',
    sensorsSub: 'Air, temperature and radiation of the shared environment.',
    goalsTitle: 'Team goals',
    goalsSub: 'What the crew builds together.',
    tileAria: '{title}: {value} {unit}, {foot}',
    goalOf: 'of {total} {unit}',
    goalAria: '{pct}% of the goal',
    footnote: 'This panel shows activities, cabin sensors and averages of 3 or more people. Each person’s health values stay only in their own Today screen, and the captain sees only the status. Simulated data, illustrative ranges to be validated with official sources.',
    avg: {
      sleep: { title: 'Average sleep', unit: 'per night', foot: 'Team goal: 7 h or more · last 7 days' },
      mood: { title: 'Average mood', unit: 'out of 5', foot: 'Average of {n} people · no names' },
      train: {
        title: 'Team training',
        value: '{done} of {n}',
        unit: 'trained today',
        foot: 'Resistance and cardio training'
      }
    },
    sensors: {
      radiation: { title: 'Radiation', unit: 'mSv/day', foot: 'Station normal: 0.4 to 0.8' },
      co2: { title: 'CO₂', unit: 'ppm', foot: 'Illustrative range: 2,000 to 3,600' },
      temp: { title: 'Temperature', unit: '°C', foot: 'Normal: 20 to 25' },
      humidity: { title: 'Humidity', unit: '%', foot: 'Above 60 since 18:10 · filter under maintenance' },
      pressure: { title: 'Pressure', unit: 'kPa', foot: 'Normal: 99 to 103' }
    },
    goals: {
      training: { title: 'Team workouts this week', unit: 'sessions', note: '7 sessions to go until Sunday.' },
      mood: {
        title: 'Mood check-in from everyone',
        unit: 'days in a row',
        note: 'A 14-day goal unlocks the team achievement.'
      },
      reports: { title: 'Reports sent to base', unit: 'days', note: 'The day 47 report is in the queue.' },
      measures: {
        title: 'Measurements logged today',
        unit: 'measurements',
        note: 'Team count only: values and names stay with each person.'
      }
    }
  },
  login: {
    back: 'Choose another crew member',
    title: 'Sign in',
    as: 'Sign in as {name}',
    password: 'Password',
    error: 'Enter the password to sign in.'
  },
  account: { label: 'Signed-in account', switch: 'Switch account', signedAs: 'Signed in as {name}' },
  clock: { day: 'DAY {day}', aria: 'Mission day {day}, {time}' },
  topbar: {
    gravity: 'Gravity station',
    notifications: 'Team notifications',
    ring: { ok: 'Ring battery: {n}%. Open sync', low: 'Ring charging, battery {n}%. Open sync' }
  },
  notif: {
    sub: 'A quick check-in helps the whole team stay well.',
    empty: 'No new notifications.',
    count: '{n} new',
    go: 'See recommendation',
    items: {
      mood: '{name} has not logged mood today. Ask how they are doing.',
      sync: '{name} has not synced the ring today. Remind them to sync.',
      eva: '{name} is on a spacewalk. Ask how it went when they return.'
    }
  },
  agendaPage: { sub: 'Measurements, meals and training throughout the day.' },
  rec: {
    sub: 'Step by step to decide what to measure and what to do now, like a triage.',
    step: 'Step {n}',
    overall: 'Overall status',
    s1: {
      title: 'Measure what the routine calls for',
      sub: 'Follow the order of the day. Each measurement takes a few minutes.'
    },
    s2: { title: 'Compare with the normal range', sub: 'See whether each value is inside, near or outside the limit.' },
    s3: { title: 'Do what the recommendation says', sub: 'Only indicators that call for action appear here.' },
    s4: { title: 'Notify and log', sub: 'The summary below also serves the base doctor.' },
    state: { done: 'Done', next: 'Next', later: 'Later' },
    valueCol: 'Current value',
    focus: 'In focus',
    openIndicator: 'View indicator',
    allGood: 'No indicator calls for action right now. Follow the routine and measure again at the next time.',
    notify: {
      ok: 'Nothing to report now. The daily report goes to the base at the usual time.',
      warn: 'Log it in the flight log and tell the captain if the measurement stays out of range.',
      crit: 'Notify the captain now and send the summary to the base doctor.'
    },
    baseTitle: 'Summary for the base doctor',
    baseHint: 'Current values of the day. Communication delay with Earth: {delay}.'
  },
  diary: {
    sub: 'Private log: only you see what you write here.',
    private: 'Private',
    privateInfo: 'Your log data (mood and notes) is restricted to you and no one else. Neither the rest of the team nor the captain can see what you record here.',
    moodTitle: 'How was your day?',
    moodHint: 'Choose from 1 (very bad) to 5 (very good). The entry is yours alone.',
    mood: { '1': 'Very bad', '2': 'Bad', '3': 'So-so', '4': 'Good', '5': 'Very good' },
    savedMood: 'Today’s mood: {label}',
    weekTitle: 'Last 7 days',
    weekAlert: 'Days with low mood are highlighted.',
    weekOk: 'No days with low mood in the last 7 days.',
    noteTitle: 'Note of the day',
    notePlaceholder: 'Write how you feel, symptoms or events of the day.',
    sensitive: 'Highly sensitive data: hide the text',
    sensitiveHint: 'The text stays masked on screen and is not included in the report sent to the base.',
    save: 'Save note',
    entriesTitle: 'Notes',
    empty: 'No notes yet.',
    masked: 'Hidden content',
    show: 'Show',
    hide: 'Hide',
    remove: 'Delete',
    sensitiveTag: 'Sensitive',
    howSub: 'Quick guidance for each indicator.',
    tabMood: 'Mood and notes',
    tabsAria: 'Log sections'
  },
  train: {
    sub: 'Today’s workout, sets, rest and volume history.',
    streak: 'Streak',
    streakDays: '{n} d',
    points: 'Points',
    streakNote: 'The streak does not break on alert days, spacewalks or while the ring is charging.',
    suggest: {
      rest: 'Workout suspended today: an indicator is critical. Rest and follow the recommendation.',
      light: 'Short sleep: today’s workout is 30% lighter.',
      full: 'All good: full workout today.'
    },
    routines: { 'full-a': 'Full body A', 'full-b': 'Full body B' },
    ex: {
      squat: 'Squat',
      bench: 'Bench press',
      row: 'Bent-over row',
      press: 'Overhead press',
      rdl: 'Romanian deadlift',
      plank: 'Plank'
    },
    mg: { legs: 'Legs', chest: 'Chest', back: 'Back', shoulders: 'Shoulders', core: 'Core' },
    todayTitle: 'Today’s routine',
    exercisesCount: '{n} exercises',
    lighter: '30% fewer reps',
    start: 'Start workout',
    restDay: 'Rest day',
    col: {
      set: 'Set',
      exercise: 'Exercise',
      kind: 'Type',
      plan: 'Plan',
      load: 'Load (kg)',
      reps: 'Reps',
      rpe: 'Effort',
      done: 'Done',
      sets: 'Sets',
      restSec: 'Rest (s)'
    },
    kind: { warmup: 'Warm-up', normal: 'Working' },
    rpeHint: 'Perceived effort: 1 (easy) to 10 (max)',
    setAria: 'Mark set {n} of {exercise} as done',
    rest: 'Rest',
    restSkip: 'Skip rest',
    restDone: 'Rest over. Next set.',
    finish: 'Finish workout',
    saved: 'Workout saved: {volume} kg of volume.',
    needSet: 'Mark at least one set as done to save.',
    historyTitle: 'History',
    historyEmpty: 'No workouts saved yet.',
    volumeTitle: 'Volume per day',
    volumeAria: 'Training volume over the last 7 days: {values}',
    lastVolume: 'Last workout',
    best1rm: 'Best estimated 1RM',
    setsByGroup: 'Sets per muscle group (7 days)',
    workoutLine: '{routine} · {sets} sets · {volume} kg',
    setsUnit: 'sets',
    setsReps: '{sets} × {reps}',
    customize: 'Customize workout',
    editTitle: 'Customize: {routine}',
    addExercise: 'Add exercise',
    removeExercise: 'Remove {exercise}',
    saveRoutine: 'Save routine',
    resetRoutine: 'Restore default',
    routineSaved: 'Routine saved.',
    routineReset: 'Routine restored to default.',
    customized: 'Customized',
    invalidRoutine: 'Check sets, reps and rest: use whole numbers greater than zero.',
    emptyRoutine: 'Add at least one exercise.'
  },
  food: {
    tab: 'Food',
    phaseLabel: 'Phase',
    phase: { lancamento: 'Launch', orbita: 'Orbit', reentrada: 'Re-entry' },
    phaseNote: {
      lancamento: 'Water dispenser off: only ready-to-eat items, no water or heating.',
      orbita: 'All menu items are available.',
      reentrada: 'Water dispenser off: only ready-to-eat items, no water or heating.'
    },
    counter: { meals: 'Meals', drinks: 'Flavored drinks', desserts: 'Desserts' },
    ofMax: '{n} of {max}',
    dessertsLeft: '{n} left today',
    register: 'Log a meal',
    meal: 'Meal',
    meals: { cafe: 'Breakfast', almoco: 'Lunch', jantar: 'Dinner', lanche: 'Snack' },
    pick: 'Tap items to add them. Tap again to add portions.',
    categories: {
      principal: 'Main dishes',
      acompanhamento: 'Sides and bases',
      'cafe-lanche': 'Breakfast and snacks',
      sobremesa: 'Desserts',
      bebida: 'Drinks'
    },
    reasons: {
      'needs-water': 'needs water, dispenser is off',
      'needs-heat': 'needs heating, unavailable in this phase',
      'out-of-stock': 'out of stock',
      'wrong-meal': 'does not suit this meal'
    },
    forceHint: 'Log anyway',
    pending: 'Items in this meal',
    pendingEmpty: 'No items chosen.',
    freeItem: 'Other item',
    freePlaceholder: 'Something not on the menu',
    addFree: 'Add',
    save: 'Log',
    saved: 'Meal logged.',
    removeItem: 'Remove {item}',
    qtyAria: '{item}: {n} portions',
    todayTitle: 'Today',
    historyEmpty: 'No entries today.',
    delete: 'Delete entry',
    warningsTitle: 'Notices',
    noWarnings: 'No notices.',
    info: 'Info',
    warn: {
      'dessert-left': 'You have had {n} of {max} desserts today.',
      'dessert-last': 'This is today’s last dessert. The stock is shared with the team.',
      'dessert-over': 'You went over today’s dessert limit. Logged.',
      'dessert-streak': 'Three days over the dessert limit. The team’s stock is running out faster.',
      'team-stock-low': 'The team’s desserts are running out.',
      'drink-last': 'This is your last flavored drink today.',
      'drink-over': 'You went over today’s {max} flavored drinks. Logged.',
      bread: 'Regular bread is not allowed on board: crumbs float. Logged anyway.',
      'out-of-rule': 'Logged outside the rules: {item} ({reason}).',
      'meal-not-scheduled': 'There is no scheduled meal during launch and re-entry: only a snack of ready-to-eat items. Logged.',
      'meal-duplicate': '{meal} already has the maximum number of entries today ({max}).',
      'meal-over-cap': 'Too many {category} items in this meal: up to {max} is planned. Logged.'
    },
    stockTitle: 'Team stock',
    stockSub: 'No names: only what is left of the menu.',
    portionsUnit: 'portions',
    stockLeft: '{left} of {total} portions',
    openLog: 'Open food log',
    disclaimer: 'Limits and stock are illustrative and need validation by the medical and nutrition team.',
    items: {
      brisket: 'Smoked beef brisket',
      'macarrao-queijo': 'Macaroni and cheese',
      'quiche-vegetais': 'Vegetable quiche',
      'curry-camarao': 'Shrimp curry',
      'mordidas-salmao': 'Wild salmon bites',
      tortilhas: 'Wheat tortillas',
      'cuscuz-castanhas': 'Couscous with nuts',
      'brocolis-gratinado': 'Broccoli gratin',
      'vagem-apimentada': 'Spicy green beans',
      abobora: 'Butternut squash',
      'ovos-mexidos': 'Scrambled eggs',
      salsichas: 'Sausages',
      aveia: 'Oatmeal',
      'granola-mirtilo': 'Granola with blueberries',
      'cereal-morango': 'Strawberry cereal with lavender',
      amendoas: 'Almonds',
      'castanha-caju': 'Cashews',
      pudim: 'Pudding',
      bolo: 'Cake',
      'biscoito-bordo': 'Maple cream cookie',
      muffin: 'Muffin',
      chocolate: 'Chocolate',
      cafe: 'Coffee',
      'cha-verde': 'Green tea',
      smoothie: 'Mango and peach smoothie',
      limonada: 'Lemonade',
      cidra: 'Apple cider',
      achocolatado: 'Chocolate drink'
    },
    capHint: 'up to {n} in this meal',
    showOthers: 'Show items for other meals',
    hideOthers: 'Hide items for other meals',
    qtyMore: 'One more portion of {item}',
    qtyLess: 'One less portion of {item}',
    selectedCount: '{n} selected'
  },
  measure: {
    open: 'Log',
    title: 'Log {name}',
    hint: 'Logging takes 20 seconds. The data stays with you, unless it is critical.',
    field: {
      sys: 'Systolic (upper)',
      dia: 'Diastolic (lower)',
      gl: 'Glucose (mg/dL)',
      kg: 'Mass (kg)',
      device: 'Device',
      note: 'Note (optional)'
    },
    deviceOther: 'Other or no device',
    save: 'Save measurement',
    saved: 'Measurement logged',
    state: 'Status',
    avg: 'Average of the last {n} entries: {value}',
    trend: '7-day trend',
    noTrend: 'Log for more days to see the trend.',
    massDelta: 'Mass change: {pct}% from the baseline',
    massNoBase: 'Log for 7 days to build the mass baseline.',
    critical: 'Out of range. Repeat the measurement and see the Recommendation.',
    err: {
      range: 'Impossible value. Check what you typed: {min} to {max}.',
      sysdia: 'Systolic must be higher than diastolic.',
      required: 'Fill in the value.'
    },
    why: {
      title: 'Why measure blood pressure, glucose and weight',
      intro: 'The ring measures heart rate, temperature and sleep on its own. Blood pressure, glucose and weight exist only if you measure and log them.',
      pa: 'Shows how the heart and vessels adapt to microgravity, when body fluids shift toward the head. Helps prevent dizziness on return to gravity.',
      gl: 'Shows how the body handles energy under stress, disrupted sleep and the onboard diet.',
      kg: 'Shows whether food covers energy use and whether muscle is being lost. Links food, training and health.',
      freqPa: 'Once a day, in the morning, seated and at rest',
      freqGl: 'Once a day, before breakfast',
      freqKg: 'Once a day, at the same time, before eating',
      when: 'When to measure',
      message: 'We do not measure to be judged: we measure so the body can warn us early. Logging takes 20 seconds and the data stays with you, unless it is critical.',
      disclaimer: 'Values and frequencies are reference values for the prototype and need validation by a health professional before any real use.'
    },
    registerNow: 'Log now',
    mine: 'Your entries',
    mineEmpty: 'No entries yet.',
    lastReg: 'Your last entry',
    remind: '{name}: time to log. It takes 20 seconds.',
    ach: {
      sub: 'Rewards the habit of measuring, not the measured value.',
      streak: 'Measurement streak',
      streakNote: 'Counts days with blood pressure, glucose and weight logged. A day without entries is no scolding: the streak just starts over.',
      days: '{n} days in a row',
      grid: 'Last 14 days',
      dayAria: '{date}: {n} of 3 measurements'
    }
  },
  gm: {
    sub: 'Rewards the habit, not the measured value. Here you only compare yourself with yourself.',
    level: {
      title: 'Your level',
      points: '{n} points',
      toNext: '{n} points to {name}',
      max: 'Top level reached',
      howTitle: 'How to earn points',
      how: 'Workout +{workout} · each measurement +{measure} (all 3 together +{complete}) · mood +{mood} · meal +{meal} · daily mission +{mission}',
      l0: 'Cadet',
      l1: 'Crew member',
      l2: 'Specialist',
      l3: 'Navigator',
      l4: 'Pilot',
      l5: 'Veteran'
    },
    mission: {
      title: 'Daily mission',
      sub: 'Three short steps to close the day.',
      measures: 'Log blood pressure, glucose and weight',
      train: 'Do today’s workout',
      rest: 'Rest day: workout waived',
      mood: 'Log your mood',
      done: 'Done',
      todo: 'Pending',
      open: 'Open',
      reward: 'Complete all 3 items to earn +{n} points',
      complete: 'Mission accomplished! +{n} points'
    },
    streak: {
      title: 'Mission streak',
      shields: 'Shields: {left} of {max} this month',
      note: 'A shield covers one missed day and the streak goes on. They renew every month.'
    },
    badge: {
      title: 'Badges',
      sub: 'Each badge marks a habit, not a measured value.',
      earned: 'Earned',
      progress: '{value} of {target}',
      measureStreak: '{n} days in a row of measurements',
      trainStreak: '{n} days in a row of training',
      workouts: '{n} workouts done',
      moodDays: '{n} days with mood logged',
      mealDays: '{n} days with food logged',
      missionStreak: '{n} missions in a row'
    },
    team: {
      title: 'Team goals',
      note: 'Crew totals only: no names, no values and no ranking.',
      measures: 'Measurements this week',
      train: 'Workouts this week',
      count: '{done} of {total}',
      goal: 'Goal: {pct}%',
      reached: 'Goal reached',
      badgeMeasures: 'Team up to date on measurements',
      badgeTrain: 'Team on the move'
    },
    recap: {
      title: 'Your week',
      sub: 'Compared only with your own previous week.',
      points: 'Points',
      missions: 'Missions completed',
      measures: 'Measurements logged',
      workouts: 'Workouts',
      moodDays: 'Days with mood',
      mealDays: 'Days with food',
      up: '+{n} points over the previous week',
      down: '{n} points fewer than the previous week. No problem: every week is a fresh start.',
      same: 'Same score as the previous week'
    }
  },
  cap: {
    sub: 'The state of each crew member, without personal values, to decide together with the team.',
    privacy: 'The panel shows only each person’s state. Values, diary, individual mood and food stay with each crew member.',
    decision: {
      title: 'Needs a decision',
      sub: 'Critical measurements that stayed critical on the repeat (RN03, RN04).',
      empty: 'No decisions pending.',
      item: '{name}: {measure} critical, repeated on re-measurement',
      hint: 'Agree on the course of action with the person. The values stay with them.',
      ack: 'Mark as followed up',
      ackAria: 'Mark as followed up: {name}, {measure}'
    },
    crew: {
      title: 'Crew status',
      battery: 'Ring {n}%',
      charging: 'Ring charging',
      measures: 'Measurements {n}/3',
      trained: 'Trained today',
      notTrained: 'No workout today'
    },
    ready: {
      title: 'Mission readiness',
      fit: '{n} of {total} fit',
      attention: 'Need attention: {n}',
      charging: 'Rings charging: {n}',
      note: 'Fit means not in a critical state.'
    },
    notify: '{name}: {measure} in a critical state, repeated on re-measurement. See the captain’s panel.',
    go: 'Open panel'
  },
  syncPage: {
    hello: 'Hello, {name}',
    title: 'Sync the ring',
    sub: 'Before you go in, the app fetches the ring’s readings and checks today’s measurements.',
    ring: { connected: 'Ring connected', charging: 'Ring charging', battery: 'Battery {n}%' },
    steps: {
      find: 'Looking for the ring',
      fetch: 'Downloading readings since the last sync',
      check: 'Checking today’s measurements'
    },
    done: {
      findOk: 'Ring found',
      findWarn: 'Ring on its base, charging',
      fetchOk: 'Readings up to date',
      fetchWarn: 'No new readings for now',
      checkOk: 'Today’s measurements checked'
    },
    running: 'Syncing…',
    ready: 'All set.',
    result: {
      connected: 'Ring synced. Today’s readings are already in the app.',
      charging: 'The ring is charging, so there are no new readings. Your streak is safe and you can measure by hand in Measure now.'
    },
    today: 'Today’s measurements: {n} of 3 logged',
    enter: 'Go to the dashboard',
    skip: 'Skip for now',
    retry: 'Try again'
  }
};

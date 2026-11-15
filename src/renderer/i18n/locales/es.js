// Español. Mismas claves que pt.js.
export default {
  lang: { label: 'Idioma' },
  brand: { logoAlt: 'Logo del equipo Vento Norte UEA', byline: 'por Vento Norte UEA' },
  status: { ok: 'Normal', warn: 'Atención', crit: 'Crítico' },
  time: {
    hm: '{h} h {m}',
    day: 'día {n}',
    dayHour: 'día {n} · {time}',
    now: 'ahora',
    yesterday: 'ayer {time}',
    daysAgo7: 'hace 7 días',
    today: 'hoy',
    hoursAgo24: 'hace 24 h'
  },
  src: { manual: 'Manual', ring: 'Anillo', ringManual: 'Anillo + manual', you: 'Tú' },
  when: { ring: 'hace 4 min', yPa: 'ayer 19:40', wake: 'al despertar', yGl: 'ayer 07:35', yHu: 'ayer 21:40' },
  nav: {
    aria: 'Navegación de la aplicación',
    missionOpen: 'Abrir información de la misión',
    patchAlt: 'Parche del equipo {name}',
    team: 'Equipo',
    myDay: 'Mi día',
    teamSection: 'Equipo',
    today: 'Hoy',
    indicators: 'Indicadores',
    measure: 'Medir ahora',
    diary: 'Diario de a bordo',
    routine: 'Rutina y entrenamiento',
    achievements: 'Logros',
    commander: 'Panel del capitán',
    crewPanel: 'Panel de la tripulación',
    switchCrew: 'Cambiar de tripulante',
    personalView: 'vista personal',
    agenda: 'Agenda de hoy',
    recommendation: 'Recomendación',
    collapse: 'Contraer menú',
    expand: 'Expandir menú'
  },
  team: { missionId: 'ID de misión: #102' },
  crew: {
    cristiano: { role: 'Capitán', activity: 'Experimento de materiales' },
    'luis-felipe': { role: 'Especialista de misión', activity: 'Entrenamiento de resistencia' },
    mike: { role: 'Especialista de misión', activity: 'Reunión con la base', until: 'hasta 09:30' },
    ruan: { role: 'Piloto', activity: 'Actividad extravehicular', until: 'vuelve 15:30' },
    rita: { role: 'Especialista de misión', activity: 'Mantenimiento del filtro de aire' },
    photoOf: 'Foto de {name}',
    captain: 'CAPITÁN',
    captainLabel: 'capitán',
    sex: { f: 'Femenino', m: 'Masculino' }
  },
  pickTeam: {
    title: 'Seleccionar equipo',
    label: 'Equipo',
    choose: 'Elige un equipo',
    listAria: 'Equipos',
    crewCount: '{n} tripulantes',
    newTeam: 'Nueva misión',
    form: {
      title: 'Crear misión',
      teamName: 'Nombre del equipo',
      missionId: 'ID de misión',
      days: 'Duración de la misión (días)',
      daysHint: 'Obligatorio. Indica un número entero de días, mayor que cero.',
      daysError: 'Indica la duración de la misión en días (número entero mayor que cero).',
      required: 'Campo obligatorio',
      cancel: 'Cancelar',
      created: 'Misión {id} creada para el equipo {team}: {days} días. El registro de la tripulación llegará en una pantalla posterior.'
    },
    missionLine: '{id} · {days} días'
  },
  pickCrew: { switchTeam: 'Cambiar de equipo', who: '¿Quién eres?', team: 'Equipo' },
  mission: {
    label: 'MISIÓN',
    close: 'Cerrar',
    tagline: 'Una aplicación para que el astronauta mida, entienda y actúe sobre su propia salud, incluso cuando la Tierra está demasiado lejos para responder.',
    patchAlt: 'Parche {name} del equipo {org}, {label}',
    facts: { team: 'Equipo', patch: 'Parche', challenge: 'Misión', crew: 'Tripulación', missionId: 'ID de misión' },
    challengeValue: '7.ª edición del Latin American Space Challenge (LASC 2026)',
    footer: 'Creado por el equipo Vento Norte UEA. Este es un prototipo del desafío «Crear software de monitoreo de salud para astronautas en misiones espaciales» del hackathon NASA Space Apps Challenge 2026, sin vínculo oficial con la NASA ni con la AEB. Las personas, los valores y las lecturas se generaron a partir de datos de bibliotecas especializadas (p. ej., NeuroKit2 y la IA de Claude Code).',
    missionIdValue: '#102 · día {day}',
    teamDesc: 'Primer equipo universitario de cohetería modelo y de alta potencia (high power rocketry) del Estado de Amazonas y de la Región Norte de Brasil'
  },
  link: {
    title: 'Conexión con la Tierra',
    close: 'Cerrar',
    openAria: 'Conexión con la Tierra: {status}',
    lastSent: 'Último envío: hace {ago} · La confirmación de envío a la base se enviará en un máximo de 12min',
    lastSentOffline: 'Último envío: hace {ago}',
    sendNow: 'Enviar ahora',
    demoState: 'Modo demostración · estado',
    stateAria: 'Estado de la conexión',
    states: {
      online: {
        label: 'Conectado con la base · retraso de 1 s',
        name: 'Conectado',
        flow: 'Los datos llegan con normalidad a la base.'
      },
      lag: {
        label: 'Conectado con la base · retraso de 12 min',
        name: 'Retraso largo',
        flow: 'Los datos llegan a la base con 12 min de retraso.'
      },
      off: { label: 'Sin contacto con la Tierra', name: 'Sin contacto', flow: 'Ningún dato llega a la base ahora.' },
      send: { label: 'Enviando datos a la base', name: 'Enviando', flow: 'La señal volvió y los datos se están enviando.' },
      warn: {
        label: 'Sin contacto con la Tierra desde hace 6 h',
        name: 'Sin contacto 6 h',
        flow: 'Ningún dato llega a la base desde hace 6 h. Se avisó a la tripulación.'
      }
    }
  },
  soon: {
    heading: 'Esta pantalla aún no se ha construido',
    back: 'Volver a Hoy',
    sub: 'Equipo {name}',
    pages: {
      medir: {
        title: 'Medir ahora',
        desc: 'Registro de una medida manual (presión, glucosa, temperatura) o lectura del anillo, con el rango de cada indicador.'
      },
      comandante: {
        title: 'Panel del capitán',
        desc: 'Estado de cada tripulante, sin valores personales, para decidir junto con el equipo.'
      }
    }
  },
  names: {
    pa: 'Presión arterial',
    fc: 'Frecuencia cardíaca',
    gl: 'Glucosa',
    tc: 'Temperatura',
    sn: 'Sueño',
    hu: 'Ánimo',
    o2: 'Oxigenación',
    rad: 'Radiación'
  },
  cards: {
    pa: { name: 'Presión arterial' },
    fc: { name: 'Frecuencia cardíaca en reposo' },
    gl: { name: 'Glucemia en ayunas' },
    tc: { name: 'Temperatura corporal' },
    sn: { name: 'Horas de sueño' },
    hu: { name: 'Nivel de ánimo' },
    o2: { name: 'Saturación de oxígeno (SpO₂)', short: 'Oxígeno (SpO₂)' },
    kg: { name: 'Peso corporal' },
    rad: { name: 'Radiación del día', short: 'Radiación' },
    ring: { name: 'Anillo inteligente' },
    alim: { name: 'Alimentación' }
  },
  scenarios: { comum: 'Día normal', febre: 'Fiebre', hipoxia: 'Hipoxia', estresse: 'Estrés', radiacao: 'Radiación' },
  environments: {
    estacao: {
      label: 'Estación',
      name: 'Estación espacial',
      g: 'Microgravedad (cerca de 0 g)',
      delay: 'Menos de 1 s',
      light: '16 amaneceres por día',
      note: 'El entrenamiento de resistencia diario ayuda a proteger músculos y huesos. Sujétate al apoyo al medir la presión.'
    },
    lua: {
      label: 'Luna',
      name: 'Superficie lunar',
      g: '1/6 de la gravedad de la Tierra',
      delay: 'Cerca de 2,6 s, ida y vuelta',
      light: 'Día lunar de cerca de 29,5 días',
      note: 'Con gravedad baja, el entrenamiento necesita carga extra. El polvo fino exige cuidado con los ojos y las vías respiratorias.'
    },
    marte: {
      label: 'Marte',
      name: 'Superficie de Marte',
      g: '0,38 de la gravedad de la Tierra',
      delay: '3 a 22 min, solo de ida',
      light: 'Sol de 24 h 39 min',
      note: 'El día marciano dura 39 min más: el reloj de la misión sigue ese ritmo para que el sueño no se desfase. Sin la Tierra en tiempo real, decide con la recomendación.'
    },
    terra: {
      label: 'Tierra remota',
      name: 'Comunidad remota en la Tierra',
      g: 'Gravedad normal (1 g)',
      delay: 'Satélite, intermitente',
      light: 'Ciclo normal de 24 h',
      note: 'Sin especialistas cerca, la recomendación orienta los primeros auxilios y el resumen llega al equipo de salud cuando haya señal.'
    }
  },
  agenda: {
    sync: 'Sincronizar el anillo',
    cafe: 'Desayuno',
    almoco: 'Almuerzo',
    treino: 'Entrenamiento de fuerza',
    diario: 'Diario de a bordo',
    sono: 'Hora de dormir',
    medpa: 'Medir la presión arterial',
    medgl: 'Medir la glucosa en ayunas',
    medkg: 'Medir el peso (masa)'
  },
  today: {
    greeting: 'Buenos días, {name}',
    signalsAria: 'Barra de señales',
    signalTitle: '{name}: {value}, {status}',
    demo: 'Modo demostración',
    scenario: 'Escenario',
    environment: 'Entorno',
    editHint: 'Arrastra por el asa para mover, tira del borde derecho para cambiar el ancho o archiva lo que no necesites.',
    restore: 'Restaurar valores',
    finish: 'Terminar',
    customize: 'Personalizar',
    addToPanel: 'Añadir al panel',
    indicatorsAria: 'Indicadores',
    normal: 'Normal: {range}',
    trend: 'Tendencia de {name} en los últimos 7 días, último valor {value}',
    dragMove: 'Arrastra para mover',
    archiveCard: 'Archivar tarjeta',
    archive: 'Archivar',
    resize: 'Arrastra para cambiar el ancho',
    agenda: 'Agenda de hoy',
    agendaDone: '{done} de {total} hechos',
    open: 'Abrir',
    markDone: 'Marcar como hecho: {title}',
    envTitle: 'Entorno: {name}',
    gravity: 'Gravedad',
    comms: 'Comunicación',
    light: 'Ciclo de luz',
    normalRad: 'Radiación normal',
    radUnit: 'mSv/día',
    illustrative: 'Valores ilustrativos, que deben validarse con fuentes oficiales antes de cualquier uso real.',
    ranges: { pa: '90–119 / 60–79', fc: '50–95 en reposo', gl: '70–99 en ayunas', tc: '36,1–37,5', sn: '7–9 h', hu: '3 a 5' },
    units: { sn: 'esta noche', hu: 'de 5', o2: '%', kg: 'kg', ring: 'de batería' },
    o2Cap: 'Anillo · nocturno',
    kgCap: 'Línea base 74,0 kg · +0,3%',
    radCapHigh: '{x} veces lo normal del entorno',
    radCapOk: 'Dentro de lo normal del entorno',
    ringCap: 'Sincronizado hace 4 min · en uso desde hace 31 h',
    ringChip: 'Conectado',
    details: {
      sync: 'Anillo conectado · batería 78%',
      med: 'Medición manual guiada, sentado y en reposo',
      cafe: 'Hora de comer. Anótalo en el diario.',
      almoco: 'Hora de comer. Anótalo en el diario.',
      treinoCrit: 'Suspendido hoy: hay un indicador crítico. Descansa y sigue la recomendación.',
      treinoShort: 'Volumen sugerido: 3 × 7 (30% menos por sueño o ánimo)',
      treinoFull: 'Volumen sugerido: 3 × 10, carga completa',
      diario: 'Ánimo, comidas y síntomas del día',
      sono: 'Meta de 7 h 30. Luz tenue desde las 21:30.',
      medgl: 'En ayunas, antes del desayuno',
      medkg: 'A la hora de siempre, antes de comer'
    },
    alert: {
      contact: 'Contacto con la Tierra: {delay}.',
      guide: 'Abrir la recomendación',
      cabin: 'Ver panel de la cabina',
      seeWhat: 'Ver qué hacer',
      tcTitle: 'Temperatura en {value} °C',
      tcText: 'Confirma con el termómetro de a bordo. La recomendación explica qué hacer ahora.',
      o2Title: 'Oxigenación baja: {value}%',
      o2Text: 'Siéntate, respira hondo y comprueba la posición del sensor. Si sigue por debajo del 92%, sigue el protocolo.',
      radTitle: 'Radiación {x} veces por encima de lo normal',
      radText: 'Posible evento de partículas solares. Ve a la zona de refugio y espera las instrucciones.',
      critTitle: '{name} crítico',
      critText: 'Repite la medición y sigue la recomendación.',
      warnOne: '{name} requiere atención',
      warnMany: '{n} indicadores requieren atención',
      warnSleep: 'Dormiste {value}. El entrenamiento de hoy baja un 30% para proteger la recuperación.',
      warnText: 'Fuera del rango normal. Mira qué hacer.'
    },
    mock: {
      label: 'Datos ficticios',
      on: 'Activados',
      off: 'Desactivados',
      note: 'Historial de 3 semanas de la tripulación, solo para la demostración. No se escribe nada en disco.'
    }
  },
  ind: {
    title: 'Indicadores',
    sub: 'Tendencia, qué significa y qué hacer, un indicador a la vez.',
    ringSync: 'Anillo sincronizado hace 4 min',
    pickAria: 'Elige el indicador',
    periodAria: 'Período',
    legendAria: 'Leyenda',
    ranges: { '24h': '24 horas', '7d': '7 días', '30d': '30 días' },
    systolic: 'Sistólica',
    diastolic: 'Diastólica',
    normalBand: 'Rango normal',
    outBand: 'Fuera de rango',
    stat: { avg: 'Media', min: 'Mínimo', max: 'Máximo', out: 'Fuera de rango' },
    outOf: '{a} de {b}',
    wave: {
      title: 'Forma de onda del anillo',
      simulated: 'SIMULADO',
      ppg: 'Pulso (PPG), 6 segundos',
      ecg: 'Electrocardiograma (ECG), 6 segundos',
      ppgAlt: 'Onda de pulso simulada, con latidos regulares',
      ecgAlt: 'Trazado de ECG simulado, con complejos QRS regulares',
      note: 'Señales generadas por simulación para la demostración. El anillo mide el pulso (PPG); el ECG vendría de un sensor adicional, aún por definir.'
    },
    howTitle: 'Cómo medir',
    whyTitle: 'Por qué importa',
    lastValue: 'Último valor',
    normalLabel: 'Valor de referencia',
    measurement: 'Medición',
    baseline: 'Tu línea base',
    whatToDo: 'Recomendación',
    disclaimer: 'Los rangos, límites y orientaciones son ilustrativos y deben ser validados por el equipo médico de la misión antes de cualquier uso real. La aplicación no hace diagnósticos.',
    per: {
      h24: 'últimas 24 h · cada 30 min',
      d7manual: 'últimos 7 días · {per}',
      d7: 'últimos 7 días · cada 2 h',
      d30manual: 'últimos 30 días · {per}',
      d30: 'últimos 30 días · media diaria'
    },
    alt: 'Gráfico de {name}, {range}. Último valor {value} {unit}, {status}. Media {avg}, mínimo {min}, máximo {max}, {out} de {n} fuera del rango normal.',
    pa: {
      name: 'Presión arterial',
      short: 'Presión arterial',
      unit: 'mmHg',
      axis: 'mmHg',
      bands: ['Sistólica normal', 'Diastólica normal'],
      range: '90–119 / 60–79',
      base: '116/75',
      per: 'una medición por día',
      msg: {
        ok: 'Dentro del rango normal.',
        warn: 'Fuera del rango normal. Repite la medición con calma.',
        crit: 'Fuera del límite seguro. Confirma y avisa al capitán.'
      },
      why: [
        'La presión muestra el esfuerzo del corazón para bombear la sangre. En microgravedad, los líquidos del cuerpo se desplazan hacia arriba, y eso puede alterar la presión.'
      ],
      how: [
        'Siéntate con la espalda apoyada y los pies firmes. En la estación, sujeta los pies al apoyo.',
        'Descansa 5 minutos, en silencio.',
        'Coloca el manguito en el brazo, a la altura del corazón.',
        'Mide 2 veces, con 1 minuto de intervalo. La app guarda la media.'
      ],
      acts: [
        { rule: '90–119 / 60–79', text: 'Sigue la rutina y mide de nuevo mañana, a la misma hora.' },
        {
          rule: '120–139 / 80–89, o por debajo de 90/60',
          text: 'Repite en 5 minutos, sentado. Evita la cafeína y la sal hoy y anota cómo te sientes en el diario.'
        },
        {
          rule: '140/90 o más, o por debajo de 80/50',
          text: 'Detén la actividad y siéntate. Repite en 5 minutos. Si se confirma, avisa al capitán. Con dolor en el pecho, falta de aire o mareo, pide ayuda ahora.'
        }
      ],
      cta: 'Medir la presión ahora'
    },
    fc: {
      name: 'Frecuencia cardíaca en reposo',
      short: 'FC en reposo',
      unit: 'lpm',
      axis: 'lpm',
      bands: ['Rango normal en reposo'],
      range: '50–95 lpm en reposo',
      base: '60 lpm',
      per: 'medida por el anillo',
      msg: {
        ok: 'Dentro del rango en reposo.',
        warn: 'Fuera del rango en reposo. Siéntate y respira despacio.',
        crit: 'Muy fuera del rango. Detente y comprueba el pulso.'
      },
      why: [
        'La frecuencia cardíaca en reposo muestra cómo se está adaptando el corazón. Subir sin esfuerzo puede indicar estrés, fiebre, falta de líquido o cansancio.',
        'El anillo mide todo el día. Lo que vale es el reposo: sentado, sin haber entrenado en al menos 15 minutos.'
      ],
      how: [
        'Lleva el anillo bien ajustado en el dedo, sin holgura.',
        'Sincroniza al despertar y antes de dormir.',
        'Para un valor en reposo, siéntate en silencio durante 5 minutos antes de mirar la pantalla.'
      ],
      acts: [
        { rule: '50–95 lpm en reposo', text: 'Todo bien. Sigue el entrenamiento y la rutina del día.' },
        {
          rule: '96–110 o 40–49 lpm en reposo',
          text: 'Siéntate y respira despacio durante 5 minutos. Piensa en esfuerzo, cafeína o estrés recientes. Si continúa, mide la presión.'
        },
        {
          rule: 'Más de 110 o menos de 40 lpm en reposo',
          text: 'Deja lo que estás haciendo y siéntate. Comprueba el pulso en la muñeca durante 1 minuto y avisa al capitán. Con dolor en el pecho, desmayo o falta de aire, pide ayuda ahora.'
        }
      ],
      cta: 'Registrar cómo me siento'
    },
    gl: {
      name: 'Glucemia en ayunas',
      short: 'Glucemia',
      unit: 'mg/dL',
      axis: 'mg/dL',
      bands: ['Rango normal en ayunas'],
      range: '70–99 mg/dL en ayunas',
      base: '94 mg/dL',
      per: 'una medición por día, en ayunas',
      msg: {
        ok: 'Dentro del rango en ayunas.',
        warn: 'Fuera del rango. Repite mañana en ayunas.',
        crit: 'Fuera del límite seguro. Mide de nuevo ahora.'
      },
      why: [
        'La glucosa es el combustible del cuerpo. En misión, el estrés, el sueño corto y los cambios en la dieta pueden hacer que el valor suba o baje.',
        'La medición en ayunas es la más fácil de comparar de un día a otro.'
      ],
      how: [
        'Pasa 8 horas sin comer, solo con agua.',
        'Lávate y sécate las manos.',
        'Pínchate el lateral de la yema del dedo y acerca la gota a la tira del glucómetro.',
        'Anota el valor. La app guarda la fecha y la hora.'
      ],
      acts: [
        { rule: '70–99 mg/dL en ayunas', text: 'Sigue la rutina. Mide en ayunas de nuevo mañana.' },
        {
          rule: '100–125 o 54–69 mg/dL',
          text: 'Repite la medición. Por debajo de 70: toma 15 g de azúcar de acción rápida y mide de nuevo en 15 minutos. Por encima de 100: anota la última comida en el diario.'
        },
        {
          rule: '126 mg/dL o más, o por debajo de 54',
          text: 'Mide de nuevo ahora. Por debajo de 54: toma 15 g de azúcar de acción rápida, quédate quieto y avisa al capitán. Por encima de 126 confirmado: avisa al equipo médico.'
        }
      ],
      cta: 'Medir la glucosa ahora'
    },
    tc: {
      name: 'Temperatura corporal',
      short: 'Temperatura',
      unit: '°C',
      axis: '°C',
      bands: ['Rango normal'],
      range: '36,1–37,5 °C',
      base: '36,6 °C',
      per: 'estimada por el anillo',
      msg: {
        ok: 'Dentro del rango normal.',
        warn: 'Ligeramente fuera del rango. Confirma con el termómetro.',
        crit: 'Posible fiebre. Confirma y sigue la recomendación.'
      },
      why: [
        'La temperatura sube con la infección, el esfuerzo y el estrés. En microgravedad el cuerpo pierde calor de otra manera, por eso seguir la tendencia ayuda más que un valor aislado.',
        'El anillo estima la temperatura de la piel. Si supera lo normal, confirma con el termómetro de a bordo.'
      ],
      how: [
        'El anillo estima la temperatura de la piel, de día y de noche.',
        'Si el valor sale del rango, espera 15 minutos después de entrenar o ducharte.',
        'Mide con el termómetro de a bordo, en el oído o la frente.',
        'Registra el valor. La app lo compara con la estimación del anillo.'
      ],
      acts: [
        { rule: '36,1–37,5 °C', text: 'Sigue la rutina y bebe agua a lo largo del día.' },
        {
          rule: '37,6–37,9 °C, o 35,0–36,0 °C',
          text: 'Confirma con el termómetro de a bordo. Hidrátate, descansa y mide de nuevo en 1 hora.'
        },
        {
          rule: '38,0 °C o más, o por debajo de 35,0 °C',
          text: 'Confirma con el termómetro. Con fiebre, aléjate del resto y avisa al capitán. Sigue el protocolo de infección de a bordo.'
        }
      ],
      cta: 'Medir la temperatura ahora'
    },
    sn: {
      name: 'Horas de sueño',
      short: 'Horas de sueño',
      unit: 'esta noche',
      axis: 'horas por noche',
      bands: ['Rango normal'],
      range: '7 a 9 h por noche',
      base: '7 h 20',
      per: 'una noche por barra',
      msg: {
        ok: 'Buena noche de sueño.',
        warn: 'Noche corta. El entrenamiento de hoy baja un 30%.',
        crit: 'Sueño muy corto. Entrenamiento ligero y sin tareas de riesgo.'
      },
      why: [
        'Dormir menos de 7 horas por noche empeora la atención y la recuperación. En misión, eso pesa en las tareas de riesgo.',
        'El anillo registra el sueño solo. Luz tenue por la noche y un horario fijo ayudan al reloj del cuerpo.'
      ],
      how: [
        'Usa el anillo por la noche, bien ajustado en el dedo.',
        'Sincroniza al despertar. La app muestra el total de horas.',
        'A partir de las 21:30, deja la luz tenue y evita las pantallas.'
      ],
      acts: [
        { rule: '7 a 9 h', text: 'Mantén el horario. Entrenamiento normal hoy.' },
        {
          rule: '5 h a 6 h 59, o más de 9 h',
          text: 'El entrenamiento de hoy baja un 30%. Evita la cafeína después de las 14:00 y haz una siesta de hasta 20 minutos, si lo necesitas.'
        },
        {
          rule: 'Menos de 5 h',
          text: 'Entrenamiento ligero y sin tareas de riesgo, como una salida extravehicular. Avisa al capitán y acuerda un descanso.'
        }
      ],
      cta: 'Ajustar el entrenamiento de hoy'
    },
    hu: {
      name: 'Nivel de ánimo',
      short: 'Ánimo',
      unit: 'de 5',
      axis: 'nota de 1 a 5',
      bands: ['Rango normal'],
      range: 'nota 3 a 5',
      base: 'nota 4',
      per: 'un registro por día',
      msg: {
        ok: 'Ánimo estable.',
        warn: 'Ánimo bajo. Conviene hablar con alguien.',
        crit: 'Ánimo muy bajo. Busca apoyo hoy.'
      },
      why: [
        'El ánimo cambia antes de que aparezcan otras señales de cansancio y estrés. Anotarlo cada día ayuda a notar la tendencia.',
        'El registro es solo tuyo. Tú eliges si quieres compartir el ánimo con el equipo.'
      ],
      how: [
        'Pregúntate: ¿cómo fue mi día?',
        'Elige de 1 (muy mal) a 5 (muy bien) en el diario de a bordo.',
        'Si quieres, escribe una nota. Se queda solo contigo.'
      ],
      acts: [
        { rule: 'Nota 3 a 5', text: 'Sigue la rutina. Registra de nuevo mañana.' },
        {
          rule: 'Nota 2',
          text: 'Habla con alguien del equipo o escribe en el diario. Haz una pausa de 15 minutos en un lugar con luz clara.'
        },
        {
          rule: 'Nota 1',
          text: 'Habla con alguien de confianza hoy mismo. Si quieres, el capitán pide apoyo psicológico desde la Tierra.'
        }
      ],
      cta: 'Escribir en el diario'
    },
    openRecommendation: 'Abrir paso a paso',
    infoOpen: 'Por qué importa {name}'
  },
  panel: {
    title: 'Panel de la tripulación',
    eva: 'AEV',
    nowLabel: 'ahora',
    whoTitle: 'Quién está haciendo qué',
    whoSub: 'Actividad de cada persona ahora, sin datos de salud.',
    avgTitle: 'Medias del equipo',
    avgSub: 'Media de {n} personas, sin nombres.',
    sensorsTitle: 'Sensores de la cabina',
    sensorsSub: 'Aire, temperatura y radiación del entorno compartido.',
    goalsTitle: 'Metas del equipo',
    goalsSub: 'Lo que la tripulación construye junta.',
    tileAria: '{title}: {value} {unit}, {foot}',
    goalOf: 'de {total} {unit}',
    goalAria: '{pct}% de la meta',
    footnote: 'Este panel muestra actividades, sensores de la cabina y medias de 3 o más personas. Los valores de salud de cada uno quedan solo en el Hoy de la propia persona, y el capitán ve únicamente el estado. Datos simulados, rangos ilustrativos que deben validarse con fuentes oficiales.',
    avg: {
      sleep: { title: 'Sueño medio', unit: 'por noche', foot: 'Meta del equipo: 7 h o más · últimos 7 días' },
      mood: { title: 'Ánimo medio', unit: 'de 5', foot: 'Media de {n} personas · sin nombres' },
      train: {
        title: 'Entrenamiento del equipo',
        value: '{done} de {n}',
        unit: 'entrenaron hoy',
        foot: 'Entrenamiento de resistencia y cardio'
      }
    },
    sensors: {
      radiation: { title: 'Radiación', unit: 'mSv/día', foot: 'Normal de la estación: 0,4 a 0,8' },
      co2: { title: 'CO₂', unit: 'ppm', foot: 'Rango ilustrativo: 2000 a 3600' },
      temp: { title: 'Temperatura', unit: '°C', foot: 'Normal: 20 a 25' },
      humidity: { title: 'Humedad', unit: '%', foot: 'Por encima de 60 desde las 18:10 · filtro en mantenimiento' },
      pressure: { title: 'Presión', unit: 'kPa', foot: 'Normal: 99 a 103' }
    },
    goals: {
      training: {
        title: 'Entrenamientos del equipo en la semana',
        unit: 'sesiones',
        note: 'Faltan 7 sesiones hasta el domingo.'
      },
      mood: {
        title: 'Registro de ánimo de todos',
        unit: 'días seguidos',
        note: 'Una meta de 14 días desbloquea el logro colectivo.'
      },
      reports: { title: 'Informes enviados a la base', unit: 'días', note: 'El informe del día 47 está en la cola.' },
      measures: {
        title: 'Mediciones registradas hoy',
        unit: 'mediciones',
        note: 'Solo el recuento del equipo: los valores y los nombres quedan con cada persona.'
      }
    }
  },
  login: {
    back: 'Elegir otro tripulante',
    title: 'Iniciar sesión',
    as: 'Iniciar sesión como {name}',
    password: 'Contraseña',
    error: 'Escribe la contraseña para entrar.'
  },
  account: { label: 'Cuenta conectada', switch: 'Cambiar de cuenta', signedAs: 'Conectado como {name}' },
  clock: { day: 'DÍA {day}', aria: 'Día de la misión {day}, {time}' },
  topbar: {
    gravity: 'Estación de gravedad',
    notifications: 'Notificaciones del equipo',
    ring: {
      ok: 'Batería del anillo: {n}%. Abrir la sincronización',
      low: 'Anillo cargando, batería {n}%. Abrir la sincronización'
    }
  },
  notif: {
    sub: 'Un chequeo rápido ayuda a todo el equipo a estar bien.',
    empty: 'No hay notificaciones nuevas.',
    count: '{n} nuevas',
    go: 'Ver recomendación',
    items: {
      mood: '{name} aún no registró el ánimo hoy. Pregunta cómo está.',
      sync: '{name} no sincronizó el anillo hoy. Recuérdale sincronizar.',
      eva: '{name} está en actividad extravehicular. Pregunta cómo fue cuando vuelva.'
    }
  },
  agendaPage: { sub: 'Mediciones, comidas y entrenamiento a lo largo del día.' },
  rec: {
    sub: 'Paso a paso para decidir qué medir y qué hacer ahora, al estilo de un triaje.',
    step: 'Paso {n}',
    overall: 'Situación general',
    s1: { title: 'Mide lo que pide la rutina', sub: 'Sigue el orden del día. Cada medición lleva pocos minutos.' },
    s2: { title: 'Compara con el rango normal', sub: 'Mira si cada valor está dentro, cerca o fuera del límite.' },
    s3: { title: 'Haz lo que indica la recomendación', sub: 'Solo aparecen los indicadores que piden acción.' },
    s4: { title: 'Avisa y registra', sub: 'El resumen de abajo también sirve al médico de la base.' },
    state: { done: 'Hecho', next: 'Siguiente', later: 'Más tarde' },
    valueCol: 'Valor actual',
    focus: 'En foco',
    openIndicator: 'Ver indicador',
    allGood: 'Ningún indicador pide acción ahora. Sigue la rutina y mide de nuevo en el próximo horario.',
    notify: {
      ok: 'Nada que avisar ahora. El informe diario llega a la base en el horario normal.',
      warn: 'Anótalo en el diario y avisa al capitán si la medición se repite fuera del rango.',
      crit: 'Avisa al capitán ahora y envía el resumen al médico de la base.'
    },
    baseTitle: 'Resumen para el médico de la base',
    baseHint: 'Valores actuales del día. Retraso de comunicación con la Tierra: {delay}.'
  },
  diary: {
    sub: 'Registro privado: solo tú ves lo que escribes aquí.',
    private: 'Privado',
    privateInfo: 'Los datos de tu diario (ánimo y notas) quedan restringidos solo a ti y a nadie más. Ni el resto del equipo ni el capitán ven lo que registras aquí.',
    moodTitle: '¿Cómo fue tu día?',
    moodHint: 'Elige de 1 (muy mal) a 5 (muy bien). El registro es solo tuyo.',
    mood: { '1': 'Muy mal', '2': 'Mal', '3': 'Regular', '4': 'Bien', '5': 'Muy bien' },
    savedMood: 'Ánimo de hoy: {label}',
    weekTitle: 'Últimos 7 días',
    weekAlert: 'Los días con ánimo bajo aparecen destacados.',
    weekOk: 'Ningún día con ánimo bajo en los últimos 7 días.',
    noteTitle: 'Nota del día',
    notePlaceholder: 'Escribe cómo te sientes, síntomas o eventos del día.',
    sensitive: 'Dato altamente sensible: ocultar el texto',
    sensitiveHint: 'El texto queda enmascarado en pantalla y no va en el informe enviado a la base.',
    save: 'Guardar nota',
    entriesTitle: 'Notas',
    empty: 'Aún no hay notas.',
    masked: 'Contenido oculto',
    show: 'Mostrar',
    hide: 'Ocultar',
    remove: 'Eliminar',
    sensitiveTag: 'Sensible',
    howSub: 'Orientaciones rápidas para cada indicador.',
    tabMood: 'Ánimo y notas',
    tabsAria: 'Secciones del diario'
  },
  train: {
    sub: 'Entrenamiento del día, series, descanso e historial de volumen.',
    streak: 'Racha',
    streakDays: '{n} d',
    points: 'Puntos',
    streakNote: 'La racha no se rompe en días de alerta, actividad extravehicular o con el anillo cargando.',
    suggest: {
      rest: 'Entrenamiento suspendido hoy: hay un indicador crítico. Descansa y sigue la recomendación.',
      light: 'Sueño corto: el entrenamiento de hoy es 30% más ligero.',
      full: 'Todo bien: entrenamiento completo hoy.'
    },
    routines: { 'full-a': 'Cuerpo completo A', 'full-b': 'Cuerpo completo B' },
    ex: {
      squat: 'Sentadilla',
      bench: 'Press de banca',
      row: 'Remo inclinado',
      press: 'Press militar',
      rdl: 'Peso muerto rumano',
      plank: 'Plancha'
    },
    mg: { legs: 'Piernas', chest: 'Pecho', back: 'Espalda', shoulders: 'Hombros', core: 'Abdomen' },
    todayTitle: 'Rutina de hoy',
    exercisesCount: '{n} ejercicios',
    lighter: '30% menos repeticiones',
    start: 'Iniciar entrenamiento',
    restDay: 'Día de descanso',
    col: {
      set: 'Serie',
      exercise: 'Ejercicio',
      kind: 'Tipo',
      plan: 'Plan',
      load: 'Carga (kg)',
      reps: 'Reps',
      rpe: 'Esfuerzo',
      done: 'Hecha',
      sets: 'Series',
      restSec: 'Descanso (s)'
    },
    kind: { warmup: 'Calentamiento', normal: 'Normal' },
    rpeHint: 'Esfuerzo percibido: 1 (ligero) a 10 (máximo)',
    setAria: 'Marcar la serie {n} de {exercise} como hecha',
    rest: 'Descanso',
    restSkip: 'Saltar descanso',
    restDone: 'Descanso terminado. Siguiente serie.',
    finish: 'Finalizar entrenamiento',
    saved: 'Entrenamiento guardado: {volume} kg de volumen.',
    needSet: 'Marca al menos una serie como hecha para guardar.',
    historyTitle: 'Historial',
    historyEmpty: 'Aún no hay entrenamientos guardados.',
    volumeTitle: 'Volumen por día',
    volumeAria: 'Volumen de entrenamiento de los últimos 7 días: {values}',
    lastVolume: 'Último entrenamiento',
    best1rm: 'Mejor 1RM estimado',
    setsByGroup: 'Series por grupo muscular (7 días)',
    workoutLine: '{routine} · {sets} series · {volume} kg',
    setsUnit: 'series',
    setsReps: '{sets} × {reps}',
    customize: 'Personalizar entrenamiento',
    editTitle: 'Personalizar: {routine}',
    addExercise: 'Añadir ejercicio',
    removeExercise: 'Quitar {exercise}',
    saveRoutine: 'Guardar rutina',
    resetRoutine: 'Restaurar predeterminada',
    routineSaved: 'Rutina guardada.',
    routineReset: 'Rutina restaurada a la predeterminada.',
    customized: 'Personalizada',
    invalidRoutine: 'Revisa series, repeticiones y descanso: usa números enteros mayores que cero.',
    emptyRoutine: 'Añade al menos un ejercicio.'
  },
  food: {
    tab: 'Alimentación',
    phaseLabel: 'Fase',
    phase: { lancamento: 'Lanzamiento', orbita: 'Órbita', reentrada: 'Reentrada' },
    phaseNote: {
      lancamento: 'Dispensador de agua apagado: solo alimentos listos, sin agua ni calor.',
      orbita: 'Todos los artículos del menú están disponibles.',
      reentrada: 'Dispensador de agua apagado: solo alimentos listos, sin agua ni calor.'
    },
    counter: { meals: 'Comidas', drinks: 'Bebidas saborizadas', desserts: 'Postres' },
    ofMax: '{n} de {max}',
    dessertsLeft: 'quedan {n} hoy',
    register: 'Registrar comida',
    meal: 'Comida',
    meals: { cafe: 'Desayuno', almoco: 'Almuerzo', jantar: 'Cena', lanche: 'Merienda' },
    pick: 'Toca los artículos para añadirlos. Toca de nuevo para sumar porciones.',
    categories: {
      principal: 'Platos principales',
      acompanhamento: 'Guarniciones y bases',
      'cafe-lanche': 'Desayuno y snacks',
      sobremesa: 'Postres',
      bebida: 'Bebidas'
    },
    reasons: {
      'needs-water': 'necesita agua, dispensador apagado',
      'needs-heat': 'necesita calor, no disponible en esta fase',
      'out-of-stock': 'sin existencias',
      'wrong-meal': 'no combina con esta comida'
    },
    forceHint: 'Registrar de todos modos',
    pending: 'Artículos de esta comida',
    pendingEmpty: 'Ningún artículo elegido.',
    freeItem: 'Otro artículo',
    freePlaceholder: 'Algo que no está en el menú',
    addFree: 'Añadir',
    save: 'Registrar',
    saved: 'Comida registrada.',
    removeItem: 'Quitar {item}',
    qtyAria: '{item}: {n} porciones',
    todayTitle: 'Hoy',
    historyEmpty: 'Ningún registro hoy.',
    delete: 'Eliminar registro',
    warningsTitle: 'Avisos',
    noWarnings: 'Sin avisos.',
    info: 'Informativo',
    warn: {
      'dessert-left': 'Hoy ya has comido {n} de {max} postres.',
      'dessert-last': 'Este es el último postre de hoy. Las existencias se reparten con el equipo.',
      'dessert-over': 'Superaste el límite de postres de hoy. Registrado.',
      'dessert-streak': 'Tres días por encima del límite de postres. Las existencias del equipo se agotan más rápido.',
      'team-stock-low': 'Los postres del equipo se están acabando.',
      'drink-last': 'Esta es tu última bebida saborizada de hoy.',
      'drink-over': 'Superaste las {max} bebidas saborizadas de hoy. Registrado.',
      bread: 'El pan común no va a bordo: las migas flotan. Registrado de todos modos.',
      'out-of-rule': 'Registrado fuera de la regla: {item} ({reason}).',
      'meal-not-scheduled': 'En el lanzamiento y la reentrada no hay comida programada: solo merienda con alimentos listos. Registrado.',
      'meal-duplicate': '{meal} ya tiene el máximo de registros de hoy ({max}).',
      'meal-over-cap': 'Demasiados artículos de {category} en esta comida: lo previsto es hasta {max}. Registrado.'
    },
    stockTitle: 'Existencias del equipo',
    stockSub: 'Sin nombres: solo lo que queda del menú.',
    portionsUnit: 'porciones',
    stockLeft: '{left} de {total} porciones',
    openLog: 'Abrir alimentación',
    disclaimer: 'Los límites y las existencias son ilustrativos y requieren validación del equipo médico y de nutrición.',
    items: {
      brisket: 'Brisket de res ahumado',
      'macarrao-queijo': 'Macarrones con queso',
      'quiche-vegetais': 'Quiche de verduras',
      'curry-camarao': 'Curry de camarones',
      'mordidas-salmao': 'Bocados de salmón salvaje',
      tortilhas: 'Tortillas de trigo',
      'cuscuz-castanhas': 'Cuscús con frutos secos',
      'brocolis-gratinado': 'Brócoli gratinado',
      'vagem-apimentada': 'Judías verdes picantes',
      abobora: 'Calabaza butternut',
      'ovos-mexidos': 'Huevos revueltos',
      salsichas: 'Salchichas',
      aveia: 'Avena',
      'granola-mirtilo': 'Granola con arándanos',
      'cereal-morango': 'Cereal de fresa con lavanda',
      amendoas: 'Almendras',
      'castanha-caju': 'Anacardos',
      pudim: 'Pudin',
      bolo: 'Pastel',
      'biscoito-bordo': 'Galleta de crema de arce',
      muffin: 'Muffin',
      chocolate: 'Chocolate',
      cafe: 'Café',
      'cha-verde': 'Té verde',
      smoothie: 'Batido de mango y melocotón',
      limonada: 'Limonada',
      cidra: 'Sidra de manzana',
      achocolatado: 'Bebida de chocolate'
    },
    capHint: 'hasta {n} en esta comida',
    showOthers: 'Mostrar artículos de otras comidas',
    hideOthers: 'Ocultar artículos de otras comidas',
    qtyMore: 'Una porción más de {item}',
    qtyLess: 'Una porción menos de {item}',
    selectedCount: '{n} seleccionados'
  },
  measure: {
    open: 'Registrar',
    title: 'Registrar {name}',
    hint: 'Registrar lleva 20 segundos. El dato queda solo contigo, salvo que sea crítico.',
    field: {
      sys: 'Sistólica (máxima)',
      dia: 'Diastólica (mínima)',
      gl: 'Glucosa (mg/dL)',
      kg: 'Masa (kg)',
      device: 'Aparato',
      note: 'Nota (opcional)'
    },
    deviceOther: 'Otro o sin aparato',
    save: 'Guardar medición',
    saved: 'Medición registrada',
    state: 'Estado',
    avg: 'Media de los últimos {n} registros: {value}',
    trend: 'Tendencia de 7 días',
    noTrend: 'Registra durante más días para ver la tendencia.',
    massDelta: 'Variación de la masa: {pct}% sobre la referencia',
    massNoBase: 'Registra durante 7 días para crear la referencia de masa.',
    critical: 'Fuera del rango. Repite la medición y mira la Recomendación.',
    err: {
      range: 'Valor imposible. Revisa lo escrito: de {min} a {max}.',
      sysdia: 'La sistólica debe ser mayor que la diastólica.',
      required: 'Rellena el valor.'
    },
    why: {
      title: 'Por qué medir presión, glucosa y peso',
      intro: 'El anillo mide la frecuencia cardíaca, la temperatura y el sueño solo. La presión, la glucosa y el peso solo existen si los mides y los registras.',
      pa: 'Muestra cómo se adaptan el corazón y los vasos a la microgravedad, cuando los líquidos del cuerpo suben hacia la cabeza. Ayuda a prevenir mareos al volver a la gravedad.',
      gl: 'Muestra cómo maneja el cuerpo la energía bajo estrés, sueño alterado y dieta de a bordo.',
      kg: 'Muestra si la comida cubre el gasto de energía y si hay pérdida de músculo. Une alimentación, entrenamiento y salud.',
      freqPa: '1 vez al día, por la mañana, sentado y en reposo',
      freqGl: '1 vez al día, antes del desayuno',
      freqKg: '1 vez al día, a la misma hora, antes de comer',
      when: 'Cuándo medir',
      message: 'No medimos para ser juzgados: medimos para que el cuerpo avise pronto. Registrar lleva 20 segundos y el dato queda solo contigo, salvo que sea crítico.',
      disclaimer: 'Los valores y las frecuencias son de referencia para el prototipo y requieren validación de un profesional de salud antes de cualquier uso real.'
    },
    registerNow: 'Registrar ahora',
    mine: 'Tus registros',
    mineEmpty: 'Aún no hay registros.',
    lastReg: 'Tu último registro',
    remind: '{name}: hora de registrar. Lleva 20 segundos.',
    ach: {
      sub: 'Premia el hábito de medir, no el valor medido.',
      streak: 'Racha de mediciones',
      streakNote: 'Cuenta los días con presión, glucosa y peso registrados. Un día sin registro no es un regaño: la racha solo vuelve a empezar.',
      days: '{n} días seguidos',
      grid: 'Últimos 14 días',
      dayAria: '{date}: {n} de 3 mediciones'
    }
  },
  gm: {
    sub: 'Premia el hábito, no el valor medido. Aquí solo te comparas contigo mismo.',
    level: {
      title: 'Tu nivel',
      points: '{n} puntos',
      toNext: 'Faltan {n} puntos para {name}',
      max: 'Nivel máximo alcanzado',
      howTitle: 'Cómo ganar puntos',
      how: 'Entrenamiento +{workout} · cada medición +{measure} (las 3 juntas +{complete}) · ánimo +{mood} · comida +{meal} · misión del día +{mission}',
      l0: 'Cadete',
      l1: 'Tripulante',
      l2: 'Especialista',
      l3: 'Navegante',
      l4: 'Piloto',
      l5: 'Veterano'
    },
    mission: {
      title: 'Misión del día',
      sub: 'Tres pasos cortos para cerrar el día.',
      measures: 'Registrar presión, glucosa y peso',
      train: 'Hacer el entrenamiento del día',
      rest: 'Día de descanso: entrenamiento exento',
      mood: 'Registrar el ánimo',
      done: 'Hecho',
      todo: 'Pendiente',
      open: 'Abrir',
      reward: 'Completa los 3 elementos para ganar +{n} puntos',
      complete: '¡Misión cumplida! +{n} puntos'
    },
    streak: {
      title: 'Racha de misiones',
      shields: 'Escudos: {left} de {max} este mes',
      note: 'Un escudo cubre un día perdido y la racha continúa. Se renuevan cada mes.'
    },
    badge: {
      title: 'Insignias',
      sub: 'Cada insignia marca un hábito, no un valor medido.',
      earned: 'Conseguida',
      progress: '{value} de {target}',
      measureStreak: '{n} días seguidos de mediciones',
      trainStreak: '{n} días seguidos de entrenamiento',
      workouts: '{n} entrenamientos hechos',
      moodDays: '{n} días con el ánimo registrado',
      mealDays: '{n} días con la alimentación registrada',
      missionStreak: '{n} misiones seguidas'
    },
    team: {
      title: 'Metas del equipo',
      note: 'Solo totales de la tripulación: sin nombres, sin valores y sin ranking.',
      measures: 'Mediciones de la semana',
      train: 'Entrenamientos de la semana',
      count: '{done} de {total}',
      goal: 'Meta: {pct}%',
      reached: 'Meta alcanzada',
      badgeMeasures: 'Equipo al día con las mediciones',
      badgeTrain: 'Equipo en movimiento'
    },
    recap: {
      title: 'Tu semana',
      sub: 'Comparada solo con tu semana anterior.',
      points: 'Puntos',
      missions: 'Misiones cumplidas',
      measures: 'Mediciones registradas',
      workouts: 'Entrenamientos',
      moodDays: 'Días con ánimo',
      mealDays: 'Días con alimentación',
      up: '+{n} puntos respecto a la semana anterior',
      down: '{n} puntos menos que la semana anterior. No pasa nada: cada semana es nueva.',
      same: 'La misma puntuación que la semana anterior'
    }
  },
  cap: {
    sub: 'El estado de cada tripulante, sin valores personales, para decidir junto con el equipo.',
    privacy: 'El panel muestra solo el estado de cada persona. Los valores, el diario, el ánimo individual y la alimentación quedan con cada tripulante.',
    decision: {
      title: 'Requiere decisión',
      sub: 'Mediciones críticas que siguieron críticas en la repetición (RN03, RN04).',
      empty: 'Ninguna decisión pendiente.',
      item: '{name}: {measure} en estado crítico, repetido en la nueva medición',
      hint: 'Acuerda la conducta con la persona. Los valores quedan con ella.',
      ack: 'Marcar como atendido',
      ackAria: 'Marcar como atendido: {name}, {measure}'
    },
    crew: {
      title: 'Estado de la tripulación',
      battery: 'Anillo {n}%',
      charging: 'Anillo cargando',
      measures: 'Mediciones {n}/3',
      trained: 'Entrenó hoy',
      notTrained: 'Sin entrenamiento hoy'
    },
    ready: {
      title: 'Preparación de la misión',
      fit: '{n} de {total} aptos',
      attention: 'En atención: {n}',
      charging: 'Anillos cargando: {n}',
      note: 'Apto es quien no está en estado crítico.'
    },
    notify: '{name}: {measure} en estado crítico, repetido en la nueva medición. Mira el panel del capitán.',
    go: 'Abrir panel'
  },
  syncPage: {
    hello: 'Hola, {name}',
    title: 'Sincronizar el anillo',
    sub: 'Antes de entrar, la app busca las lecturas del anillo y revisa las mediciones de hoy.',
    ring: { connected: 'Anillo conectado', charging: 'Anillo cargando', battery: 'Batería {n}%' },
    steps: {
      find: 'Buscando el anillo',
      fetch: 'Descargando las lecturas desde la última sincronización',
      check: 'Revisando las mediciones de hoy'
    },
    done: {
      findOk: 'Anillo encontrado',
      findWarn: 'Anillo en la base, cargando',
      fetchOk: 'Lecturas actualizadas',
      fetchWarn: 'Sin lecturas nuevas por ahora',
      checkOk: 'Mediciones de hoy revisadas'
    },
    running: 'Sincronizando…',
    ready: 'Todo listo.',
    result: {
      connected: 'Anillo sincronizado. Las lecturas de hoy ya están en la app.',
      charging: 'El anillo está cargando, así que no hay lecturas nuevas. Tu racha no se rompe y puedes medir a mano en Medir ahora.'
    },
    today: 'Mediciones de hoy: {n} de 3 registradas',
    enter: 'Entrar al panel',
    skip: 'Omitir por ahora',
    retry: 'Intentar de nuevo'
  }
};

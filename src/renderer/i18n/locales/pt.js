// Português (Brasil). Base das demais traduções: toda chave daqui existe nos outros idiomas.
// Textos com {nome} recebem valores em tempo de execução.
export default {
  lang: { label: 'Idioma' },
  brand: { logoAlt: 'Logo do time Vento Norte UEA', byline: 'por Vento Norte UEA' },
  status: { ok: 'Normal', warn: 'Atenção', crit: 'Crítico' },
  time: {
    hm: '{h} h {m}',
    day: 'dia {n}',
    dayHour: 'dia {n} · {time}',
    now: 'agora',
    yesterday: 'ontem {time}',
    daysAgo7: 'há 7 dias',
    today: 'hoje',
    hoursAgo24: 'há 24 h'
  },
  src: { manual: 'Manual', ring: 'Anel', ringManual: 'Anel + manual', you: 'Você' },
  when: { ring: 'há 4 min', yPa: 'ontem 19:40', wake: 'ao acordar', yGl: 'ontem 07:35', yHu: 'ontem 21:40' },
  nav: {
    aria: 'Navegação do aplicativo',
    missionOpen: 'Abrir informações da missão',
    patchAlt: 'Patch do time {name}',
    team: 'Time',
    myDay: 'Meu dia',
    teamSection: 'Time',
    today: 'Hoje',
    indicators: 'Indicadores',
    measure: 'Medir agora',
    diary: 'Diário de bordo',
    routine: 'Rotina e treino',
    achievements: 'Conquistas',
    commander: 'Painel do capitão',
    crewPanel: 'Painel da tripulação',
    switchCrew: 'Trocar de tripulante',
    personalView: 'visão pessoal',
    agenda: 'Agenda de hoje',
    recommendation: 'Recomendação',
    collapse: 'Recolher menu',
    expand: 'Expandir menu'
  },
  team: { missionId: 'ID da Missão: #102' },
  crew: {
    cristiano: { role: 'Capitão', activity: 'Experimento de materiais' },
    'luis-felipe': { role: 'Especialista em missão', activity: 'Treino de resistência' },
    mike: { role: 'Especialista em missão', activity: 'Reunião com a base', until: 'até 09:30' },
    ruan: { role: 'Piloto', activity: 'Atividade extraveicular', until: 'volta 15:30' },
    rita: { role: 'Especialista em missão', activity: 'Manutenção do filtro de ar' },
    photoOf: 'Foto de {name}',
    captain: 'CAPITÃO',
    captainLabel: 'capitão',
    sex: { f: 'Feminino', m: 'Masculino' }
  },
  pickTeam: {
    title: 'Selecionar time',
    label: 'Time',
    choose: 'Escolha um time',
    listAria: 'Times',
    crewCount: '{n} tripulantes',
    newTeam: 'Nova missão',
    form: {
      title: 'Criar missão',
      teamName: 'Nome do time',
      missionId: 'ID da Missão',
      days: 'Duração da missão (dias)',
      daysHint: 'Obrigatório. Informe um número inteiro de dias, maior que zero.',
      daysError: 'Informe a duração da missão em dias (número inteiro maior que zero).',
      required: 'Campo obrigatório',
      cancel: 'Cancelar',
      created: 'Missão {id} criada para o time {team}: {days} dias. O cadastro da tripulação fica para uma próxima tela.'
    },
    missionLine: '{id} · {days} dias'
  },
  pickCrew: { switchTeam: 'Trocar de time', who: 'Quem é você?', team: 'Time' },
  mission: {
    label: 'MISSÃO',
    close: 'Fechar',
    tagline: 'Um aplicativo para o astronauta medir, entender e agir sobre a própria saúde, mesmo quando a Terra está longe demais para responder.',
    patchAlt: 'Patch {name} do time {org}, {label}',
    facts: { team: 'Time', patch: 'Patch', challenge: 'Missão', crew: 'Tripulação', missionId: 'ID da Missão' },
    challengeValue: '7ª edição da Latin American Space Challenge (LASC 2026)',
    footer: 'Criado pelo time Vento Norte UEA. Este é um protótipo do desafio “Criar software de monitoramento de saúde para astronautas em missões espaciais” no hackathon NASA Space Apps Challenge 2026, sem vínculo oficial com a NASA ou com a AEB. Pessoas, valores e leituras foram gerados a partir de dados de bibliotecas dedicadas (ex: NeuroKit2 e IA do Claude Code).',
    missionIdValue: '#102 · dia {day}',
    teamDesc: 'Primeira equipe universitária de foguetemodelismo e alta potência (high power rocketry) do Estado do Amazonas e da Região Norte do Brasil'
  },
  link: {
    title: 'Conexão com a Terra',
    close: 'Fechar',
    openAria: 'Conexão com a Terra: {status}',
    lastSent: 'Último envio: há {ago} · Confirmação de envio para a base será enviada em até 12min',
    lastSentOffline: 'Último envio: há {ago}',
    sendNow: 'Enviar agora',
    demoState: 'Modo demonstração · estado',
    stateAria: 'Estado da conexão',
    states: {
      online: {
        label: 'Conectado à base · atraso de 1 s',
        name: 'Conectado',
        flow: 'Os dados seguem normalmente para a base.'
      },
      lag: {
        label: 'Conectado à base · atraso de 12 min',
        name: 'Atraso longo',
        flow: 'Os dados seguem para a base, com 12 min de atraso.'
      },
      off: { label: 'Sem contato com a Terra', name: 'Sem contato', flow: 'Nenhum dado chega à base agora.' },
      send: { label: 'Enviando dados à base', name: 'Enviando', flow: 'O sinal voltou e os dados estão sendo enviados.' },
      warn: {
        label: 'Sem contato com a Terra há 6 h',
        name: 'Sem contato há 6 h',
        flow: 'Nenhum dado chega à base há 6 h. A tripulação foi avisada.'
      }
    }
  },
  soon: {
    heading: 'Esta tela ainda não foi construída',
    back: 'Voltar ao Hoje',
    sub: 'Time {name}',
    pages: {
      medir: {
        title: 'Medir agora',
        desc: 'Registro de uma medida manual (pressão, glicose, temperatura) ou leitura do anel, com a faixa de cada indicador.'
      },
      comandante: {
        title: 'Painel do capitão',
        desc: 'Estado de cada tripulante, sem valores pessoais, para decidir junto com o time.'
      }
    }
  },
  names: {
    pa: 'Pressão arterial',
    fc: 'Frequência cardíaca',
    gl: 'Glicose',
    tc: 'Temperatura',
    sn: 'Sono',
    hu: 'Humor',
    o2: 'Oxigenação',
    rad: 'Radiação'
  },
  cards: {
    pa: { name: 'Pressão arterial' },
    fc: { name: 'Frequência cardíaca em repouso' },
    gl: { name: 'Glicemia em jejum' },
    tc: { name: 'Temperatura corporal' },
    sn: { name: 'Horas de sono' },
    hu: { name: 'Nível de humor' },
    o2: { name: 'Saturação de oxigênio (SpO₂)', short: 'Oxigênio (SpO₂)' },
    kg: { name: 'Peso corporal' },
    rad: { name: 'Radiação do dia', short: 'Radiação' },
    ring: { name: 'Anel inteligente' },
    alim: { name: 'Alimentação' }
  },
  scenarios: { comum: 'Dia comum', febre: 'Febre', hipoxia: 'Hipóxia', estresse: 'Estresse', radiacao: 'Radiação' },
  environments: {
    estacao: {
      label: 'Estação',
      name: 'Estação espacial',
      g: 'Microgravidade (cerca de 0 g)',
      delay: 'Menos de 1 s',
      light: '16 nasceres do sol por dia',
      note: 'O treino de resistência diário ajuda a proteger músculos e ossos. Prenda-se ao apoio ao medir a pressão.'
    },
    lua: {
      label: 'Lua',
      name: 'Superfície lunar',
      g: '1/6 da gravidade da Terra',
      delay: 'Cerca de 2,6 s, ida e volta',
      light: 'Dia lunar de cerca de 29,5 dias',
      note: 'Com gravidade baixa, o treino precisa de carga extra. A poeira fina exige cuidado com olhos e vias aéreas.'
    },
    marte: {
      label: 'Marte',
      name: 'Superfície de Marte',
      g: '0,38 da gravidade da Terra',
      delay: '3 a 22 min, só de ida',
      light: 'Sol de 24 h 39 min',
      note: 'O dia marciano é 39 min mais longo: o relógio de missão acompanha esse ritmo para o sono não derivar. Sem a Terra em tempo real, decida com a recomendação.'
    },
    terra: {
      label: 'Terra remota',
      name: 'Comunidade remota na Terra',
      g: 'Gravidade normal (1 g)',
      delay: 'Satélite, intermitente',
      light: 'Ciclo normal de 24 h',
      note: 'Sem especialistas por perto, a recomendação orienta o primeiro atendimento e o resumo vai para o time de saúde quando houver sinal.'
    }
  },
  agenda: {
    sync: 'Sincronizar o anel',
    cafe: 'Café da manhã',
    almoco: 'Almoço',
    treino: 'Treino de força',
    diario: 'Diário de bordo',
    sono: 'Hora de dormir',
    medpa: 'Medir pressão arterial',
    medgl: 'Medir glicose em jejum',
    medkg: 'Medir peso (massa)'
  },
  today: {
    greeting: 'Bom dia, {name}',
    signalsAria: 'Barra de sinais',
    signalTitle: '{name}: {value}, {status}',
    demo: 'Modo demonstração',
    scenario: 'Cenário',
    environment: 'Ambiente',
    editHint: 'Arraste pela alça para mover, puxe a borda direita para mudar a largura ou arquive o que não precisa.',
    restore: 'Restaurar padrão',
    finish: 'Concluir',
    customize: 'Personalizar',
    addToPanel: 'Adicionar ao painel',
    indicatorsAria: 'Indicadores',
    normal: 'Normal: {range}',
    trend: 'Tendência de {name} nos últimos 7 dias, último valor {value}',
    dragMove: 'Arraste para mover',
    archiveCard: 'Arquivar cartão',
    archive: 'Arquivar',
    resize: 'Arraste para mudar a largura',
    agenda: 'Agenda de hoje',
    agendaDone: '{done} de {total} feitos',
    open: 'Abrir',
    markDone: 'Marcar como feito: {title}',
    envTitle: 'Ambiente: {name}',
    gravity: 'Gravidade',
    comms: 'Comunicação',
    light: 'Ciclo de luz',
    normalRad: 'Radiação normal',
    radUnit: 'mSv/dia',
    illustrative: 'Valores ilustrativos, a validar com fontes oficiais antes de qualquer uso real.',
    ranges: { pa: '90–119 / 60–79', fc: '50–95 em repouso', gl: '70–99 em jejum', tc: '36,1–37,5', sn: '7–9 h', hu: '3 a 5' },
    units: { sn: 'esta noite', hu: 'de 5', o2: '%', kg: 'kg', ring: 'de bateria' },
    o2Cap: 'Anel · noturno',
    kgCap: 'Linha de base 74,0 kg · +0,3%',
    radCapHigh: '{x} vezes o normal do ambiente',
    radCapOk: 'Dentro do normal do ambiente',
    ringCap: 'Sincronizado há 4 min · em uso há 31 h',
    ringChip: 'Conectado',
    details: {
      sync: 'Anel conectado · bateria 78%',
      med: 'Medição manual guiada, sentado e em repouso',
      cafe: 'Hora de comer. Registre no diário.',
      almoco: 'Hora de comer. Registre no diário.',
      treinoCrit: 'Suspenso hoje: há um indicador crítico. Descanse e siga a recomendação.',
      treinoShort: 'Volume sugerido: 3 × 7 (30% a menos por sono ou humor)',
      treinoFull: 'Volume sugerido: 3 × 10, carga completa',
      diario: 'Humor, refeições e sintomas do dia',
      sono: 'Meta de 7 h 30. Luz baixa a partir das 21:30.',
      medgl: 'Em jejum, antes do café da manhã',
      medkg: 'No mesmo horário de sempre, antes de comer'
    },
    alert: {
      contact: 'Contato com a Terra: {delay}.',
      guide: 'Abrir a recomendação',
      cabin: 'Ver painel da cabine',
      seeWhat: 'Ver o que fazer',
      tcTitle: 'Temperatura em {value} °C',
      tcText: 'Confirme com o termômetro de bordo. A recomendação explica o que fazer agora.',
      o2Title: 'Oxigenação baixa: {value}%',
      o2Text: 'Sente-se, respire fundo e confira a posição do sensor. Se continuar abaixo de 92%, siga o protocolo.',
      radTitle: 'Radiação {x} vezes acima do normal',
      radText: 'Possível evento de partículas solares. Vá para a área de abrigo e aguarde as instruções.',
      critTitle: '{name} crítico',
      critText: 'Repita a medição e siga a recomendação.',
      warnOne: '{name} pede atenção',
      warnMany: '{n} indicadores pedem atenção',
      warnSleep: 'Você dormiu {value}. O treino de hoje cai 30% para proteger a recuperação.',
      warnText: 'Fora da faixa normal. Veja o que fazer.'
    },
    mock: {
      label: 'Dados fictícios',
      on: 'Ligados',
      off: 'Desligados',
      note: 'Histórico de 3 semanas da tripulação, só para a demonstração. Nada é gravado em disco.'
    }
  },
  ind: {
    title: 'Indicadores',
    sub: 'Tendência, o que significa e o que fazer, um indicador por vez.',
    ringSync: 'Anel sincronizado há 4 min',
    pickAria: 'Escolha o indicador',
    periodAria: 'Período',
    legendAria: 'Legenda',
    ranges: { '24h': '24 horas', '7d': '7 dias', '30d': '30 dias' },
    systolic: 'Sistólica',
    diastolic: 'Diastólica',
    normalBand: 'Faixa normal',
    outBand: 'Fora da faixa',
    stat: { avg: 'Média', min: 'Menor', max: 'Maior', out: 'Fora da faixa' },
    outOf: '{a} de {b}',
    wave: {
      title: 'Forma de onda do anel',
      simulated: 'SIMULADO',
      ppg: 'Pulso (PPG), 6 segundos',
      ecg: 'Eletrocardiograma (ECG), 6 segundos',
      ppgAlt: 'Onda de pulso simulada, com batimentos regulares',
      ecgAlt: 'Traçado de ECG simulado, com complexos QRS regulares',
      note: 'Sinais gerados por simulação para a demonstração. O anel mede o pulso (PPG); o ECG viria de um sensor adicional, ainda a definir.'
    },
    howTitle: 'Como medir',
    whyTitle: 'Por que importa',
    lastValue: 'Último valor',
    normalLabel: 'Valor de referência',
    measurement: 'Medição',
    baseline: 'Sua linha de base',
    whatToDo: 'Recomendação',
    disclaimer: 'Faixas, limites e orientações são ilustrativos e precisam ser validados pelo time médico da missão antes de qualquer uso real. O aplicativo não faz diagnóstico.',
    per: {
      h24: 'últimas 24 h · a cada 30 min',
      d7manual: 'últimos 7 dias · {per}',
      d7: 'últimos 7 dias · a cada 2 h',
      d30manual: 'últimos 30 dias · {per}',
      d30: 'últimos 30 dias · média diária'
    },
    alt: 'Gráfico de {name}, {range}. Último valor {value} {unit}, {status}. Média {avg}, menor {min}, maior {max}, {out} de {n} fora da faixa normal.',
    pa: {
      name: 'Pressão arterial',
      short: 'Pressão arterial',
      unit: 'mmHg',
      axis: 'mmHg',
      bands: ['Sistólica normal', 'Diastólica normal'],
      range: '90–119 / 60–79',
      base: '116/75',
      per: 'uma medição por dia',
      msg: {
        ok: 'Dentro da faixa normal.',
        warn: 'Fora da faixa normal. Repita a medição com calma.',
        crit: 'Fora do limite seguro. Confirme e avise o capitão.'
      },
      why: [
        'A pressão mostra o esforço do coração para bombear o sangue. Na microgravidade, os líquidos do corpo se deslocam para cima, e isso pode mexer com a pressão.'
      ],
      how: [
        'Sente-se com as costas apoiadas e os pés firmes. Na estação, prenda os pés no apoio.',
        'Descanse por 5 minutos, em silêncio.',
        'Coloque o manguito no braço, na altura do coração.',
        'Meça 2 vezes, com 1 minuto de intervalo. O app guarda a média.'
      ],
      acts: [
        { rule: '90–119 / 60–79', text: 'Siga a rotina e meça de novo amanhã, no mesmo horário.' },
        {
          rule: '120–139 / 80–89, ou abaixo de 90/60',
          text: 'Repita em 5 minutos, sentado. Evite cafeína e sal hoje e anote como se sente no diário.'
        },
        {
          rule: '140/90 ou mais, ou abaixo de 80/50',
          text: 'Pare a atividade e sente-se. Repita em 5 minutos. Se confirmar, avise o capitão. Com dor no peito, falta de ar ou tontura, peça ajuda agora.'
        }
      ],
      cta: 'Medir pressão agora'
    },
    fc: {
      name: 'Frequência cardíaca em repouso',
      short: 'FC em repouso',
      unit: 'bpm',
      axis: 'bpm',
      bands: ['Faixa normal em repouso'],
      range: '50–95 bpm em repouso',
      base: '60 bpm',
      per: 'medido pelo anel',
      msg: {
        ok: 'Dentro da faixa em repouso.',
        warn: 'Fora da faixa em repouso. Sente-se e respire devagar.',
        crit: 'Muito fora da faixa. Pare e confirme a pulsação.'
      },
      why: [
        'A frequência cardíaca em repouso mostra como o coração está se adaptando. Subir sem esforço pode indicar estresse, febre, falta de líquido ou cansaço.',
        'O anel mede o dia todo. O que vale é o repouso: sentado, sem ter treinado há pelo menos 15 minutos.'
      ],
      how: [
        'Use o anel bem ajustado no dedo, sem folga.',
        'Sincronize ao acordar e antes de dormir.',
        'Para um valor em repouso, fique sentado em silêncio por 5 minutos antes de olhar a tela.'
      ],
      acts: [
        { rule: '50–95 bpm em repouso', text: 'Tudo certo. Siga o treino e a rotina do dia.' },
        {
          rule: '96–110 ou 40–49 bpm em repouso',
          text: 'Sente-se e respire devagar por 5 minutos. Pense em esforço, cafeína ou estresse recentes. Se continuar, meça a pressão.'
        },
        {
          rule: 'Acima de 110 ou abaixo de 40 bpm em repouso',
          text: 'Pare o que está fazendo e sente-se. Confirme a pulsação no pulso por 1 minuto e avise o capitão. Com dor no peito, desmaio ou falta de ar, peça ajuda agora.'
        }
      ],
      cta: 'Registrar como me sinto'
    },
    gl: {
      name: 'Glicemia em jejum',
      short: 'Glicemia',
      unit: 'mg/dL',
      axis: 'mg/dL',
      bands: ['Faixa normal em jejum'],
      range: '70–99 mg/dL em jejum',
      base: '94 mg/dL',
      per: 'uma medição por dia, em jejum',
      msg: {
        ok: 'Dentro da faixa em jejum.',
        warn: 'Fora da faixa. Repita amanhã em jejum.',
        crit: 'Fora do limite seguro. Meça de novo agora.'
      },
      why: [
        'A glicose é o combustível do corpo. Em missão, estresse, sono curto e mudanças na dieta podem fazer o valor subir ou cair.',
        'A medição em jejum é a mais fácil de comparar de um dia para o outro.'
      ],
      how: [
        'Fique 8 horas sem comer, só com água.',
        'Lave e seque as mãos.',
        'Pique a lateral da ponta do dedo e encoste a gota na tira do glicosímetro.',
        'Anote o valor. O app guarda a data e a hora.'
      ],
      acts: [
        { rule: '70–99 mg/dL em jejum', text: 'Siga a rotina. Meça em jejum de novo amanhã.' },
        {
          rule: '100–125 ou 54–69 mg/dL',
          text: 'Repita a medição. Abaixo de 70: coma 15 g de açúcar de ação rápida e meça de novo em 15 minutos. Acima de 100: anote a última refeição no diário.'
        },
        {
          rule: '126 mg/dL ou mais, ou abaixo de 54',
          text: 'Meça de novo agora. Abaixo de 54: coma 15 g de açúcar de ação rápida, fique parado e avise o capitão. Acima de 126 confirmado: avise o time médico.'
        }
      ],
      cta: 'Medir glicose agora'
    },
    tc: {
      name: 'Temperatura corporal',
      short: 'Temperatura',
      unit: '°C',
      axis: '°C',
      bands: ['Faixa normal'],
      range: '36,1–37,5 °C',
      base: '36,6 °C',
      per: 'estimada pelo anel',
      msg: {
        ok: 'Dentro da faixa normal.',
        warn: 'Levemente fora da faixa. Confirme com o termômetro.',
        crit: 'Possível febre. Confirme e siga a recomendação.'
      },
      why: [
        'A temperatura sobe com infecção, esforço e estresse. Na microgravidade o corpo perde calor de outro jeito, por isso acompanhar a tendência ajuda mais do que um valor isolado.',
        'O anel estima a temperatura da pele. Se passar do normal, confirme com o termômetro de bordo.'
      ],
      how: [
        'O anel estima a temperatura da pele, de dia e de noite.',
        'Se o valor sair da faixa, espere 15 minutos depois de treino ou banho.',
        'Meça com o termômetro de bordo, no ouvido ou na testa.',
        'Registre o valor. O app compara com a estimativa do anel.'
      ],
      acts: [
        { rule: '36,1–37,5 °C', text: 'Siga a rotina e beba água ao longo do dia.' },
        {
          rule: '37,6–37,9 °C, ou 35,0–36,0 °C',
          text: 'Confirme com o termômetro de bordo. Hidrate-se, descanse e meça de novo em 1 hora.'
        },
        {
          rule: '38,0 °C ou mais, ou abaixo de 35,0 °C',
          text: 'Confirme no termômetro. Com febre, afaste-se do convívio e avise o capitão. Siga o protocolo de infecção de bordo.'
        }
      ],
      cta: 'Medir temperatura agora'
    },
    sn: {
      name: 'Horas de sono',
      short: 'Horas de sono',
      unit: 'esta noite',
      axis: 'horas por noite',
      bands: ['Faixa normal'],
      range: '7 a 9 h por noite',
      base: '7 h 20',
      per: 'uma noite por barra',
      msg: {
        ok: 'Boa noite de sono.',
        warn: 'Noite curta. O treino de hoje cai 30%.',
        crit: 'Sono muito curto. Treino leve e sem tarefas de risco.'
      },
      why: [
        'Dormir menos de 7 horas por noite piora a atenção e a recuperação. Em missão, isso pesa nas tarefas de risco.',
        'O anel registra o sono sozinho. Luz baixa à noite e horário fixo ajudam o relógio do corpo.'
      ],
      how: [
        'Use o anel à noite, bem ajustado no dedo.',
        'Sincronize ao acordar. O app mostra o total de horas.',
        'A partir das 21:30, deixe a luz baixa e evite telas.'
      ],
      acts: [
        { rule: '7 a 9 h', text: 'Mantenha o horário. Treino normal hoje.' },
        {
          rule: '5 h a 6 h 59, ou mais de 9 h',
          text: 'O treino de hoje cai 30%. Evite cafeína depois das 14:00 e faça um cochilo de até 20 minutos, se precisar.'
        },
        {
          rule: 'Menos de 5 h',
          text: 'Treino leve e sem tarefas de risco, como saída extraveicular. Avise o capitão e combine descanso.'
        }
      ],
      cta: 'Ajustar o treino de hoje'
    },
    hu: {
      name: 'Nível de humor',
      short: 'Humor',
      unit: 'de 5',
      axis: 'nota de 1 a 5',
      bands: ['Faixa normal'],
      range: 'nota 3 a 5',
      base: 'nota 4',
      per: 'um registro por dia',
      msg: {
        ok: 'Humor estável.',
        warn: 'Humor baixo. Vale conversar com alguém.',
        crit: 'Humor muito baixo. Procure apoio hoje.'
      },
      why: [
        'O humor muda antes de aparecerem outros sinais de cansaço e estresse. Anotar todo dia ajuda a perceber a tendência.',
        'O registro é só seu. Você escolhe se quer compartilhar o humor com o time.'
      ],
      how: [
        'Pergunte-se: como foi meu dia?',
        'Escolha de 1 (muito mal) a 5 (muito bem) no diário de bordo.',
        'Se quiser, escreva uma nota. Ela fica só com você.'
      ],
      acts: [
        { rule: 'Nota 3 a 5', text: 'Siga a rotina. Registre de novo amanhã.' },
        {
          rule: 'Nota 2',
          text: 'Converse com alguém do time ou escreva no diário. Faça uma pausa de 15 minutos em um lugar com luz clara.'
        },
        {
          rule: 'Nota 1',
          text: 'Fale com alguém de confiança ainda hoje. Se você quiser, o capitão pede apoio psicológico da Terra.'
        }
      ],
      cta: 'Escrever no diário'
    },
    openRecommendation: 'Abrir passo a passo',
    infoOpen: 'Por que {name} importa'
  },
  panel: {
    title: 'Painel da tripulação',
    eva: 'EVA',
    nowLabel: 'agora',
    whoTitle: 'Quem está fazendo o quê',
    whoSub: 'Atividade de cada pessoa agora, sem dados de saúde.',
    avgTitle: 'Médias do time',
    avgSub: 'Média de {n} pessoas, sem nomes.',
    sensorsTitle: 'Sensores da cabine',
    sensorsSub: 'Ar, temperatura e radiação do ambiente compartilhado.',
    goalsTitle: 'Metas do time',
    goalsSub: 'O que a tripulação constrói junta.',
    tileAria: '{title}: {value} {unit}, {foot}',
    goalOf: 'de {total} {unit}',
    goalAria: '{pct}% da meta',
    footnote: 'Este painel mostra atividades, sensores da cabine e médias de 3 ou mais pessoas. Valores de saúde de cada um ficam só no Hoje da própria pessoa, e o capitão vê apenas o estado. Dados simulados, faixas ilustrativas a validar com fontes oficiais.',
    avg: {
      sleep: { title: 'Sono médio', unit: 'por noite', foot: 'Meta do time: 7 h ou mais · últimos 7 dias' },
      mood: { title: 'Humor médio', unit: 'de 5', foot: 'Média de {n} pessoas · sem nomes' },
      train: {
        title: 'Treino do time',
        value: '{done} de {n}',
        unit: 'treinaram hoje',
        foot: 'Treino de resistência e cardio'
      }
    },
    sensors: {
      radiation: { title: 'Radiação', unit: 'mSv/dia', foot: 'Normal da estação: 0,4 a 0,8' },
      co2: { title: 'CO₂', unit: 'ppm', foot: 'Faixa ilustrativa: 2 000 a 3 600' },
      temp: { title: 'Temperatura', unit: '°C', foot: 'Normal: 20 a 25' },
      humidity: { title: 'Umidade', unit: '%', foot: 'Acima de 60 desde as 18:10 · filtro em manutenção' },
      pressure: { title: 'Pressão', unit: 'kPa', foot: 'Normal: 99 a 103' }
    },
    goals: {
      training: { title: 'Treinos do time na semana', unit: 'sessões', note: 'Faltam 7 sessões até domingo.' },
      mood: {
        title: 'Check-in de humor de todos',
        unit: 'dias seguidos',
        note: 'Meta de 14 dias libera a conquista coletiva.'
      },
      reports: { title: 'Relatórios enviados à base', unit: 'dias', note: 'O relatório do dia 47 está na fila.' },
      measures: {
        title: 'Medidas registradas hoje',
        unit: 'medidas',
        note: 'Só a contagem do time: valores e nomes ficam com cada pessoa.'
      }
    }
  },
  login: {
    back: 'Escolher outro tripulante',
    title: 'Entrar',
    as: 'Entrar como {name}',
    password: 'Senha',
    error: 'Digite a senha para entrar.'
  },
  account: { label: 'Conta conectada', switch: 'Trocar de conta', signedAs: 'Conectado como {name}' },
  clock: { day: 'DIA {day}', aria: 'Dia da missão {day}, {time}' },
  topbar: {
    gravity: 'Estação de gravidade',
    notifications: 'Notificações do time',
    ring: {
      ok: 'Bateria do anel: {n}%. Abrir a sincronização',
      low: 'Anel carregando, bateria {n}%. Abrir a sincronização'
    }
  },
  notif: {
    sub: 'Um check-in rápido ajuda todo o time a ficar bem.',
    empty: 'Nenhuma notificação nova.',
    count: '{n} novas',
    go: 'Ver recomendação',
    items: {
      mood: '{name} ainda não registrou o humor hoje. Pergunte como está.',
      sync: '{name} não sincronizou o anel hoje. Lembre de sincronizar.',
      eva: '{name} está em atividade extraveicular. Pergunte como foi quando voltar.'
    }
  },
  agendaPage: { sub: 'Medições, refeições e treino ao longo do dia.' },
  rec: {
    sub: 'Passo a passo para decidir o que medir e o que fazer agora, no estilo de uma triagem.',
    step: 'Passo {n}',
    overall: 'Situação geral',
    s1: { title: 'Meça o que a rotina pede', sub: 'Siga a ordem do dia. Cada medida leva poucos minutos.' },
    s2: { title: 'Compare com a faixa normal', sub: 'Veja se cada valor está dentro, perto ou fora do limite.' },
    s3: { title: 'Faça o que a recomendação indica', sub: 'Só aparecem os indicadores que pedem ação.' },
    s4: { title: 'Avise e registre', sub: 'O resumo abaixo também serve ao médico da base.' },
    state: { done: 'Feito', next: 'Próxima', later: 'Mais tarde' },
    valueCol: 'Valor atual',
    focus: 'Em foco',
    openIndicator: 'Ver indicador',
    allGood: 'Nenhum indicador pede ação agora. Siga a rotina e meça de novo no próximo horário.',
    notify: {
      ok: 'Nada a avisar agora. O relatório diário segue para a base no horário normal.',
      warn: 'Anote no diário e avise o capitão se a medida se repetir fora da faixa.',
      crit: 'Avise o capitão agora e envie o resumo ao médico da base.'
    },
    baseTitle: 'Resumo para o médico da base',
    baseHint: 'Valores atuais do dia. Atraso de comunicação com a Terra: {delay}.'
  },
  diary: {
    sub: 'Registro privado: só você vê o que escreve aqui.',
    private: 'Privado',
    privateInfo: 'Os dados do seu diário (humor e anotações) ficam restritos só a você e a mais ninguém. Nem o restante da equipe nem o capitão veem o que você registra aqui.',
    moodTitle: 'Como foi o seu dia?',
    moodHint: 'Escolha de 1 (muito mal) a 5 (muito bem). O registro é só seu.',
    mood: { '1': 'Muito mal', '2': 'Mal', '3': 'Mais ou menos', '4': 'Bem', '5': 'Muito bem' },
    savedMood: 'Humor de hoje: {label}',
    weekTitle: 'Últimos 7 dias',
    weekAlert: 'Dias com humor baixo aparecem em destaque.',
    weekOk: 'Nenhum dia com humor baixo nos últimos 7 dias.',
    noteTitle: 'Anotação do dia',
    notePlaceholder: 'Escreva como se sente, sintomas ou eventos do dia.',
    sensitive: 'Dado altamente sensível: ocultar o texto',
    sensitiveHint: 'O texto fica mascarado na tela e não segue no relatório enviado à base.',
    save: 'Salvar anotação',
    entriesTitle: 'Anotações',
    empty: 'Nenhuma anotação ainda.',
    masked: 'Conteúdo oculto',
    show: 'Mostrar',
    hide: 'Ocultar',
    remove: 'Excluir',
    sensitiveTag: 'Sensível',
    howSub: 'Orientações rápidas para cada indicador.',
    tabMood: 'Humor e anotações',
    tabsAria: 'Seções do diário'
  },
  train: {
    sub: 'Treino do dia, séries, descanso e histórico de volume.',
    streak: 'Sequência',
    streakDays: '{n} d',
    points: 'Pontos',
    streakNote: 'A sequência não quebra em dia de alerta, atividade extraveicular ou anel carregando.',
    suggest: {
      rest: 'Treino suspenso hoje: há um indicador crítico. Descanse e siga a recomendação.',
      light: 'Sono curto: o treino de hoje vem 30% mais leve.',
      full: 'Tudo certo: treino completo hoje.'
    },
    routines: { 'full-a': 'Corpo inteiro A', 'full-b': 'Corpo inteiro B' },
    ex: {
      squat: 'Agachamento',
      bench: 'Supino reto',
      row: 'Remada curvada',
      press: 'Desenvolvimento',
      rdl: 'Levantamento terra romeno',
      plank: 'Prancha'
    },
    mg: { legs: 'Pernas', chest: 'Peito', back: 'Costas', shoulders: 'Ombros', core: 'Abdômen' },
    todayTitle: 'Rotina de hoje',
    exercisesCount: '{n} exercícios',
    lighter: '30% menos repetições',
    start: 'Iniciar treino',
    restDay: 'Dia de descanso',
    col: {
      set: 'Série',
      exercise: 'Exercício',
      kind: 'Tipo',
      plan: 'Plano',
      load: 'Carga (kg)',
      reps: 'Reps',
      rpe: 'Esforço',
      done: 'Feita',
      sets: 'Séries',
      restSec: 'Descanso (s)'
    },
    kind: { warmup: 'Aquecimento', normal: 'Normal' },
    rpeHint: 'Esforço percebido: 1 (leve) a 10 (máximo)',
    setAria: 'Marcar série {n} de {exercise} como feita',
    rest: 'Descanso',
    restSkip: 'Pular descanso',
    restDone: 'Descanso concluído. Próxima série.',
    finish: 'Finalizar treino',
    saved: 'Treino salvo: {volume} kg de volume.',
    needSet: 'Marque ao menos uma série como feita para salvar.',
    historyTitle: 'Histórico',
    historyEmpty: 'Nenhum treino salvo ainda.',
    volumeTitle: 'Volume por dia',
    volumeAria: 'Volume de treino dos últimos 7 dias: {values}',
    lastVolume: 'Último treino',
    best1rm: 'Melhor 1RM estimado',
    setsByGroup: 'Séries por grupo muscular (7 dias)',
    workoutLine: '{routine} · {sets} séries · {volume} kg',
    setsUnit: 'séries',
    setsReps: '{sets} × {reps}',
    customize: 'Personalizar treino',
    editTitle: 'Personalizar: {routine}',
    addExercise: 'Adicionar exercício',
    removeExercise: 'Remover {exercise}',
    saveRoutine: 'Salvar rotina',
    resetRoutine: 'Restaurar padrão',
    routineSaved: 'Rotina salva.',
    routineReset: 'Rotina restaurada ao padrão.',
    customized: 'Personalizada',
    invalidRoutine: 'Confira séries, repetições e descanso: use números inteiros maiores que zero.',
    emptyRoutine: 'Adicione ao menos um exercício.'
  },
  food: {
    tab: 'Alimentação',
    phaseLabel: 'Fase',
    phase: { lancamento: 'Lançamento', orbita: 'Órbita', reentrada: 'Reentrada' },
    phaseNote: {
      lancamento: 'Dispensador de água desligado: só itens prontos, sem água nem aquecimento.',
      orbita: 'Todos os itens do cardápio estão disponíveis.',
      reentrada: 'Dispensador de água desligado: só itens prontos, sem água nem aquecimento.'
    },
    counter: { meals: 'Refeições', drinks: 'Bebidas saborizadas', desserts: 'Sobremesas' },
    ofMax: '{n} de {max}',
    dessertsLeft: 'restam {n} hoje',
    register: 'Registrar refeição',
    meal: 'Refeição',
    meals: { cafe: 'Café da manhã', almoco: 'Almoço', jantar: 'Jantar', lanche: 'Lanche' },
    pick: 'Toque nos itens para adicionar. Toque de novo para somar porções.',
    categories: {
      principal: 'Pratos principais',
      acompanhamento: 'Acompanhamentos e bases',
      'cafe-lanche': 'Café da manhã e lanches',
      sobremesa: 'Sobremesas',
      bebida: 'Bebidas'
    },
    reasons: {
      'needs-water': 'precisa de água, dispensador desligado',
      'needs-heat': 'precisa de aquecimento, indisponível nesta fase',
      'out-of-stock': 'estoque esgotado',
      'wrong-meal': 'não combina com esta refeição'
    },
    forceHint: 'Registrar mesmo assim',
    pending: 'Itens desta refeição',
    pendingEmpty: 'Nenhum item escolhido.',
    freeItem: 'Outro item',
    freePlaceholder: 'Algo que não está no cardápio',
    addFree: 'Adicionar',
    save: 'Registrar',
    saved: 'Refeição registrada.',
    removeItem: 'Remover {item}',
    qtyAria: '{item}: {n} porções',
    todayTitle: 'Hoje',
    historyEmpty: 'Nenhum registro hoje.',
    delete: 'Excluir registro',
    warningsTitle: 'Avisos',
    noWarnings: 'Sem avisos.',
    info: 'Informativo',
    warn: {
      'dessert-left': 'Você já comeu {n} de {max} sobremesas hoje.',
      'dessert-last': 'Essa é a última sobremesa de hoje. O estoque é dividido com o time.',
      'dessert-over': 'Você passou do limite de sobremesas de hoje. Registrado.',
      'dessert-streak': 'Três dias acima do limite de sobremesas. O estoque do time está acabando mais rápido.',
      'team-stock-low': 'As sobremesas do time estão acabando.',
      'drink-last': 'Essa é sua última bebida saborizada de hoje.',
      'drink-over': 'Você passou das {max} bebidas saborizadas de hoje. Registrado.',
      bread: 'Pão comum não vai a bordo: as migalhas flutuam. Registrado mesmo assim.',
      'out-of-rule': 'Registrado fora da regra: {item} ({reason}).',
      'meal-not-scheduled': 'No lançamento e na reentrada não há refeição programada: só lanche com itens prontos. Registrado.',
      'meal-duplicate': '{meal} já tem o máximo de registros de hoje ({max}).',
      'meal-over-cap': 'Muitos itens de {category} nesta refeição: o previsto é até {max}. Registrado.'
    },
    stockTitle: 'Estoque do time',
    stockSub: 'Sem nomes: só o que restou do cardápio.',
    portionsUnit: 'porções',
    stockLeft: '{left} de {total} porções',
    openLog: 'Abrir alimentação',
    disclaimer: 'Limites e estoque são ilustrativos e precisam de validação do time médico e de nutrição.',
    items: {
      brisket: 'Peito bovino defumado (brisket)',
      'macarrao-queijo': 'Macarrão com queijo',
      'quiche-vegetais': 'Quiche de vegetais',
      'curry-camarao': 'Curry de camarão',
      'mordidas-salmao': 'Mordidas de salmão',
      tortilhas: 'Tortilhas de trigo',
      'cuscuz-castanhas': 'Cuscuz com castanhas',
      'brocolis-gratinado': 'Brócolis gratinado',
      'vagem-apimentada': 'Vagem apimentada',
      abobora: 'Abóbora',
      'ovos-mexidos': 'Ovos mexidos',
      salsichas: 'Salsichas',
      aveia: 'Aveia',
      'granola-mirtilo': 'Granola com mirtilo',
      'cereal-morango': 'Cereal de morango com lavanda',
      amendoas: 'Amêndoas',
      'castanha-caju': 'Castanhas de caju',
      pudim: 'Pudim',
      bolo: 'Bolo',
      'biscoito-bordo': 'Biscoito de creme de bordo',
      muffin: 'Muffin',
      chocolate: 'Chocolate',
      cafe: 'Café',
      'cha-verde': 'Chá verde',
      smoothie: 'Smoothie de manga e pêssego',
      limonada: 'Limonada',
      cidra: 'Cidra de maçã',
      achocolatado: 'Achocolatado'
    },
    capHint: 'até {n} nesta refeição',
    showOthers: 'Mostrar itens de outras refeições',
    hideOthers: 'Ocultar itens de outras refeições',
    qtyMore: 'Mais uma porção de {item}',
    qtyLess: 'Uma porção a menos de {item}',
    selectedCount: '{n} selecionados'
  },
  measure: {
    open: 'Registrar',
    title: 'Registrar {name}',
    hint: 'Registrar leva 20 segundos. O dado fica só com você, a menos que seja crítico.',
    field: {
      sys: 'Sistólica (máxima)',
      dia: 'Diastólica (mínima)',
      gl: 'Glicose (mg/dL)',
      kg: 'Massa (kg)',
      device: 'Aparelho',
      note: 'Anotação (opcional)'
    },
    deviceOther: 'Outro ou sem aparelho',
    save: 'Salvar medida',
    saved: 'Medida registrada',
    state: 'Estado',
    avg: 'Média dos últimos {n} registros: {value}',
    trend: 'Tendência de 7 dias',
    noTrend: 'Registre por mais dias para ver a tendência.',
    massDelta: 'Variação da massa: {pct}% sobre a referência',
    massNoBase: 'Registre por 7 dias para criar a referência de massa.',
    critical: 'Fora da faixa. Repita a medição e veja a Recomendação.',
    err: {
      range: 'Valor impossível. Confira a digitação: de {min} a {max}.',
      sysdia: 'A sistólica precisa ser maior que a diastólica.',
      required: 'Preencha o valor.'
    },
    why: {
      title: 'Por que medir pressão, glicose e peso',
      intro: 'O anel mede frequência cardíaca, temperatura e sono sozinho. Pressão, glicose e peso só existem se você medir e registrar.',
      pa: 'Mostra como o coração e os vasos se adaptam à microgravidade, quando os líquidos do corpo sobem para a cabeça. Ajuda a prevenir tontura na volta à gravidade.',
      gl: 'Mostra como o corpo lida com energia sob estresse, sono alterado e dieta de bordo.',
      kg: 'Mostra se a comida cobre o gasto de energia e se há perda de músculo. Liga alimentação, treino e saúde.',
      freqPa: '1 vez por dia, de manhã, sentado e em repouso',
      freqGl: '1 vez por dia, antes do café da manhã',
      freqKg: '1 vez por dia, no mesmo horário, antes de comer',
      when: 'Quando medir',
      message: 'A gente não mede para ser julgado: mede para o corpo avisar cedo. Registrar leva 20 segundos e o dado fica só com você, a menos que seja crítico.',
      disclaimer: 'Valores e frequências são de referência para o protótipo e precisam de validação por um profissional de saúde antes de qualquer uso real.'
    },
    registerNow: 'Registrar agora',
    mine: 'Seus registros',
    mineEmpty: 'Nenhum registro ainda.',
    lastReg: 'Seu último registro',
    remind: '{name}: hora de registrar. Leva 20 segundos.',
    ach: {
      sub: 'Premia o hábito de medir, não o valor medido.',
      streak: 'Sequência de medidas',
      streakNote: 'Conta os dias com pressão, glicose e peso registrados. Dia sem registro não vira bronca: a sequência só recomeça.',
      days: '{n} dias seguidos',
      grid: 'Últimos 14 dias',
      dayAria: '{date}: {n} de 3 medidas'
    }
  },
  gm: {
    sub: 'Premia o hábito, não o valor medido. Aqui você só se compara a você mesmo.',
    level: {
      title: 'Seu nível',
      points: '{n} pontos',
      toNext: 'Faltam {n} pontos para {name}',
      max: 'Nível máximo alcançado',
      howTitle: 'Como ganhar pontos',
      how: 'Treino +{workout} · cada medida +{measure} (as 3 juntas +{complete}) · humor +{mood} · refeição +{meal} · missão do dia +{mission}',
      l0: 'Cadete',
      l1: 'Tripulante',
      l2: 'Especialista',
      l3: 'Navegador',
      l4: 'Piloto',
      l5: 'Veterano'
    },
    mission: {
      title: 'Missão do dia',
      sub: 'Três passos curtos para fechar o dia.',
      measures: 'Registrar pressão, glicose e peso',
      train: 'Fazer o treino do dia',
      rest: 'Dia de descanso: treino dispensado',
      mood: 'Registrar o humor',
      done: 'Feito',
      todo: 'Pendente',
      open: 'Abrir',
      reward: 'Complete os 3 itens para ganhar +{n} pontos',
      complete: 'Missão cumprida! +{n} pontos'
    },
    streak: {
      title: 'Sequência de missões',
      shields: 'Escudos: {left} de {max} neste mês',
      note: 'Um escudo cobre um dia perdido e a sequência continua. Eles se renovam todo mês.'
    },
    badge: {
      title: 'Selos',
      sub: 'Cada selo marca um hábito, não um valor medido.',
      earned: 'Conquistado',
      progress: '{value} de {target}',
      measureStreak: '{n} dias seguidos de medidas',
      trainStreak: '{n} dias seguidos de treino',
      workouts: '{n} treinos feitos',
      moodDays: '{n} dias com humor registrado',
      mealDays: '{n} dias com alimentação registrada',
      missionStreak: '{n} missões seguidas'
    },
    team: {
      title: 'Metas do time',
      note: 'Só totais da tripulação: sem nomes, sem valores e sem ranking.',
      measures: 'Medidas da semana',
      train: 'Treinos da semana',
      count: '{done} de {total}',
      goal: 'Meta: {pct}%',
      reached: 'Meta batida',
      badgeMeasures: 'Time em dia com as medidas',
      badgeTrain: 'Time em movimento'
    },
    recap: {
      title: 'Sua semana',
      sub: 'Comparada só com a sua semana anterior.',
      points: 'Pontos',
      missions: 'Missões cumpridas',
      measures: 'Medidas registradas',
      workouts: 'Treinos',
      moodDays: 'Dias com humor',
      mealDays: 'Dias com alimentação',
      up: '+{n} pontos em relação à semana anterior',
      down: '{n} pontos a menos que na semana anterior. Sem problema: cada semana é uma semana nova.',
      same: 'Mesma pontuação da semana anterior'
    }
  },
  cap: {
    sub: 'Estado de cada tripulante, sem valores pessoais, para decidir junto com o time.',
    privacy: 'O painel mostra só o estado de cada pessoa. Valores, diário, humor individual e alimentação ficam com cada tripulante.',
    decision: {
      title: 'Precisa de decisão',
      sub: 'Medidas críticas que continuaram críticas na re-medição (RN03, RN04).',
      empty: 'Nenhuma decisão pendente.',
      item: '{name}: {measure} em estado crítico, repetido na re-medição',
      hint: 'Combine a conduta com a pessoa. Os valores ficam com ela.',
      ack: 'Marcar como acompanhado',
      ackAria: 'Marcar como acompanhado: {name}, {measure}'
    },
    crew: {
      title: 'Estado da tripulação',
      battery: 'Anel {n}%',
      charging: 'Anel carregando',
      measures: 'Medidas {n}/3',
      trained: 'Treinou hoje',
      notTrained: 'Sem treino hoje'
    },
    ready: {
      title: 'Prontidão da missão',
      fit: '{n} de {total} aptos',
      attention: 'Em atenção: {n}',
      charging: 'Anéis carregando: {n}',
      note: 'Apto é quem não está em estado crítico.'
    },
    notify: '{name}: {measure} em estado crítico, repetido na re-medição. Veja o painel do capitão.',
    go: 'Abrir painel'
  },
  syncPage: {
    hello: 'Olá, {name}',
    title: 'Sincronizar o anel',
    sub: 'Antes de entrar, o app busca as leituras do anel e confere as medidas de hoje.',
    ring: { connected: 'Anel conectado', charging: 'Anel carregando', battery: 'Bateria {n}%' },
    steps: {
      find: 'Procurando o anel',
      fetch: 'Baixando as leituras desde a última sincronização',
      check: 'Conferindo as medidas de hoje'
    },
    done: {
      findOk: 'Anel encontrado',
      findWarn: 'Anel na base, carregando',
      fetchOk: 'Leituras atualizadas',
      fetchWarn: 'Sem leituras novas por enquanto',
      checkOk: 'Medidas de hoje conferidas'
    },
    running: 'Sincronizando…',
    ready: 'Tudo pronto.',
    result: {
      connected: 'Anel sincronizado. As leituras de hoje já estão no app.',
      charging: 'O anel está carregando, então não há leituras novas. Sua sequência não quebra e você pode medir à mão em Medir agora.'
    },
    today: 'Medidas de hoje: {n} de 3 registradas',
    enter: 'Entrar no painel',
    skip: 'Pular por agora',
    retry: 'Tentar de novo'
  }
};

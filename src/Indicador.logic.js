window.__dcDefine(function (DCLogic) {
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { id: 'sn', range: '7d' };
  }

  stx(st) {
    const M = {
      ok: { status: 'Normal', col: '#46D39A', bg: 'rgba(70,211,154,0.14)', bd: 'rgba(70,211,154,0.45)' },
      warn: { status: 'Atenção', col: '#FFC24B', bg: 'rgba(255,194,75,0.14)', bd: 'rgba(255,194,75,0.45)' },
      crit: { status: 'Crítico', col: '#FF7B7B', bg: 'rgba(255,123,123,0.16)', bd: 'rgba(255,123,123,0.55)' }
    };
    return Object.assign({ isOk: st === 'ok', isWarn: st === 'warn', isCrit: st === 'crit', st: st }, M[st]);
  }
  num(n, d) { return Number(n).toFixed(d).replace('.', ','); }
  classify(id, v) {
    if (id === 'pa') {
      const s = v[0], d = v[1];
      if (s >= 140 || d >= 90 || s < 80 || d < 50) { return 'crit'; }
      if (s >= 120 || d >= 80 || s < 90 || d < 60) { return 'warn'; }
      return 'ok';
    }
    if (id === 'fc') { return (v > 110 || v < 40) ? 'crit' : ((v > 95 || v < 50) ? 'warn' : 'ok'); }
    if (id === 'gl') { return (v >= 126 || v < 54) ? 'crit' : ((v >= 100 || v < 70) ? 'warn' : 'ok'); }
    if (id === 'tc') { return (v >= 38 || v < 35) ? 'crit' : ((v >= 37.6 || v < 36.1) ? 'warn' : 'ok'); }
    if (id === 'sn') { return v < 5 ? 'crit' : ((v < 7 || v > 9) ? 'warn' : 'ok'); }
    if (id === 'hu') { return v <= 1 ? 'crit' : (v <= 2 ? 'warn' : 'ok'); }
    if (id === 'o2') { return v < 92 ? 'crit' : (v < 95 ? 'warn' : 'ok'); }
    if (id === 'rad') { return v >= 3 ? 'crit' : (v >= 1.5 ? 'warn' : 'ok'); }
    return 'ok';
  }
  hm(h) {
    const t = Math.round(h * 60), hh = Math.floor(t / 60), mm = t % 60;
    return hh + ' h ' + (mm < 10 ? '0' + mm : mm);
  }

  linkVals() {
    const s = this.state, k = s.link || 'online';
    const C = {
      online: { col: '#46D39A', bg: 'rgba(70,211,154,0.14)', bd: 'rgba(70,211,154,0.45)', bs: 'solid', label: 'Base online · atraso 1 s', last: 'Último envio: agora há pouco' },
      lag: { col: '#62C3FF', bg: 'rgba(98,195,255,0.12)', bd: 'rgba(98,195,255,0.45)', bs: 'solid', label: 'Base online · atraso 12 min', last: 'Último envio: há 2 min · confirmação em até 12 min' },
      off: { col: '#A9BDD2', bg: 'rgba(169,189,210,0.12)', bd: '#5B7894', bs: 'dashed', label: 'Sem contato com a base · 3 na fila', last: 'Último envio: hoje 06:42' },
      send: { col: '#62C3FF', bg: 'rgba(98,195,255,0.12)', bd: 'rgba(98,195,255,0.45)', bs: 'solid', label: 'Enviando 3 itens…', last: 'Sinal de volta · esvaziando a fila' },
      warn: { col: '#FFC24B', bg: 'rgba(255,194,75,0.14)', bd: 'rgba(255,194,75,0.5)', bs: 'solid', label: 'Sem contato há 6 h · 14 na fila', last: 'Último envio: hoje 01:10 · o comandante foi avisado' }
    };
    const items = ['Relatório diário (dia 47)', 'Evento: temperatura 38,2 °C', 'Evento: sono abaixo de 5 h'];
    let rows;
    if (k === 'online') { rows = [{ t: 'Nada na fila', s: 'Tudo enviado', col: '#46D39A' }]; }
    else if (k === 'lag') { rows = [{ t: items[0], s: 'Enviado', col: '#46D39A' }, { t: 'Aguardando resposta da Terra', s: '12 min', col: '#62C3FF' }]; }
    else if (k === 'send') { rows = items.map((t, i) => ({ t: t, s: i === 0 ? 'Enviando' : 'Na fila', col: '#62C3FF' })); }
    else if (k === 'warn') { rows = items.map((t) => ({ t: t, s: 'Aguardando', col: '#FFC24B' })).concat([{ t: 'e mais 11 itens', s: 'Aguardando', col: '#FFC24B' }]); }
    else { rows = items.map((t) => ({ t: t, s: 'Aguardando', col: '#FFC24B' })); }
    const names = { online: 'Online', lag: 'Atraso longo', off: 'Offline', send: 'Enviando', warn: 'Offline há 6 h' };
    const opts = Object.keys(names).map((o) => ({ label: names[o], on: o === k ? 'true' : 'false', bd: o === k ? '#62C3FF' : '#2F5C8A', bg: o === k ? '#133559' : 'transparent', pick: () => this.setState({ link: o }) }));
    return { lk: Object.assign({}, C[k], { open: s.linkOpen ? 'true' : 'false', isOpen: !!s.linkOpen, toggle: () => this.setState({ linkOpen: !this.state.linkOpen }),
      iOn: k === 'online', iLag: k === 'lag', iOff: k === 'off', iSend: k === 'send', iWarn: k === 'warn', rows: rows, opts: opts,
      sendNow: () => this.setState({ link: k === 'off' || k === 'warn' ? 'send' : k }) }) };
  }

  meVals() {
    const L = [{"key": "c0", "name": "Cristiano Peniche", "first": "Cristiano", "role": "Engenheiro de voo", "ini": "CP", "photo": "assets/crew/cristiano.png"}, {"key": "c1", "name": "Luis Felipe", "first": "Luis Felipe", "role": "Especialista de missão", "ini": "LF", "photo": "assets/crew/luis-felipe.png"}, {"key": "c2", "name": "Mike", "first": "Mike", "role": "Comandante", "ini": "MI", "photo": "assets/crew/mike.png"}, {"key": "c3", "name": "Ruan", "first": "Ruan", "role": "Piloto", "ini": "RU", "photo": "assets/crew/ruan.png"}, {"key": "c4", "name": "Rita de Cássia", "first": "Rita", "role": "Médica de bordo", "ini": "RC", "photo": "assets/crew/rita.png"}];
    let id = '';
    try { id = localStorage.getItem('vn.user') || ''; } catch (e) { id = ''; }
    return L.filter((p) => p.key === id)[0] || L[0];
  }
  misVals() {
    const close = () => { if (this._misKey) { window.removeEventListener('keydown', this._misKey); this._misKey = null; } this.setState({ misOpen: false }); const o = this._misOpener; this._misOpener = null; if (o && o.focus) { setTimeout(() => o.focus(), 0); } };
    const open = () => { this._misOpener = document.activeElement; setTimeout(() => { const b = document.querySelector('[role=dialog] button'); if (b) { b.focus(); } }, 0); this._misKey = (e) => { if (e.key === 'Escape') { close(); } }; window.addEventListener('keydown', this._misKey); this.setState({ misOpen: true }); };
    return { me: this.meVals(), mis: { isOpen: !!this.state.misOpen, open: open, close: close, stop: (e) => { if (e && e.stopPropagation) { e.stopPropagation(); } } } };
  }

  SER() {
    return {"fc":{"24h":[60.0,63.0,61.0,60.0,61.0,62.0,63.0,64.0,64.0,65.0,68.0,69.0,67.0,67.0,69.0,66.0,69.0,66.0,70.0,83.0,94.0,83.0,70.0,68.0,68.0,68.0,64.0,62.0,61.0,65.0,63.0,56.0,56.0,55.0,54.0,54.0,54.0,56.0,55.0,53.0,55.0,55.0,54.0,54.0,55.0,55.0,59.0,61.0],"7d":[62.0,63.0,64.0,67.0,69.0,84.0,68.0,63.0,58.0,54.0,54.0,55.0,63.0,62.0,63.0,69.0,68.0,81.0,68.0,66.0,57.0,56.0,56.0,56.0,59.0,60.0,63.0,67.0,65.0,80.0,66.0,64.0,57.0,53.0,55.0,56.0,58.0,62.0,64.0,64.0,65.0,80.0,65.0,61.0,55.0,54.0,53.0,55.0,60.0,63.0,65.0,68.0,67.0,84.0,68.0,66.0,56.0,56.0,54.0,55.0,63.0,66.0,63.0,68.0,70.0,84.0,70.0,67.0,59.0,57.0,58.0,55.0,60.0,59.0,63.0,68.0,66.0,82.0,64.0,63.0,56.0,55.0,56.0,61.0],"30d":[60.0,61.0,60.0,62.0,63.0,62.0,61.0,62.0,62.0,60.0,62.0,62.0,61.0,60.0,60.0,60.0,60.0,58.0,59.0,59.0,60.0,59.0,59.0,60.0,59.0,61.0,60.0,62.0,61.0,61.0]},"tc":{"24h":[36.62,36.72,36.7,36.72,36.67,36.83,36.81,36.92,36.98,36.88,37.06,37.15,37.11,37.21,37.13,37.16,37.24,37.2,37.31,37.3,37.22,37.25,37.27,37.24,37.22,37.14,37.09,37.1,36.98,37.0,36.97,36.87,36.83,36.87,36.74,36.73,36.69,36.67,36.6,36.61,36.53,36.5,36.65,36.62,36.49,36.56,36.55,36.7],"7d":[36.61,36.7,36.97,37.03,37.14,37.26,37.27,36.93,36.93,36.73,36.64,36.6,36.57,36.77,36.91,37.07,37.17,37.2,37.28,37.04,36.89,36.75,36.53,36.52,36.56,36.73,36.88,37.05,37.14,37.24,37.2,37.09,36.86,36.7,36.62,36.55,36.52,36.68,36.91,37.08,37.28,37.25,37.15,37.04,36.91,36.69,36.58,36.52,36.6,36.74,36.9,37.14,37.11,37.26,37.2,37.08,36.85,36.69,36.67,36.59,36.62,36.77,36.83,37.13,37.13,37.19,37.19,37.12,36.85,36.77,36.68,36.6,36.61,36.66,36.87,37.03,37.19,37.24,37.17,37.15,36.98,36.74,36.6,36.7],"30d":[36.69,36.51,36.66,36.68,36.74,36.74,36.58,36.59,36.62,36.68,36.51,36.73,36.63,36.59,36.62,36.75,36.62,36.63,36.61,36.69,36.7,36.65,36.73,36.6,36.7,36.6,36.6,36.7,36.7,36.7]},"pa":{"7d":[[116,118,115,119,117,118,118],[74,76,73,77,75,76,76]],"30d":[[119.0,118.0,118.0,116.0,115.0,120.0,116.0,116.0,122.0,116.0,117.0,116.0,119.0,115.0,116.0,119.0,112.0,118.0,113.0,117.0,120.0,115.0,120.0,116.0,118.0,115.0,119.0,117.0,118.0,118.0],[78.0,74.0,77.0,75.0,75.0,73.0,73.0,74.0,76.0,72.0,73.0,76.0,76.0,75.0,73.0,76.0,75.0,71.0,72.0,76.0,73.0,77.0,78.0,74.0,76.0,73.0,77.0,75.0,76.0,76.0]]},"gl":{"7d":[94,92,95,96,93,95,96],"30d":[91.0,99.0,92.0,94.0,96.0,98.0,94.0,94.0,91.0,97.0,96.0,96.0,90.0,96.0,95.0,97.0,88.0,96.0,91.0,94.0,93.0,90.0,95.0,94.0,92.0,95.0,96.0,93.0,95.0,96.0]},"sn":{"7d":[7.4,7.1,7.6,6.9,7.2,6.7,6.08],"30d":[8.21,7.92,7.71,7.58,7.29,7.03,7.11,7.35,6.84,6.75,6.59,6.91,7.44,7.94,6.87,6.61,7.26,7.26,7.82,7.15,7.7,7.58,7.52,7.4,7.1,7.6,6.9,7.2,6.7,6.08]},"hu":{"7d":[4,4,3,4,4,3,3],"30d":[4,3,3,4,4,4,3,3,4,5,5,4,4,3,3,4,3,4,4,4,4,5,3,4,4,3,4,4,3,3]}};
  }
  CFG() {
    return {
      pa: {
        name: 'Pressão arterial', unit: 'mmHg', axis: 'mmHg', src: 'Manual', when: 'ontem 19:40', ranges: ['7d', '30d'], mode: 'line', dual: true, manual: true,
        lo: 60, hi: 140, ticks: [60, 80, 100, 120, 140], bands: [{ lo: 90, hi: 119, label: 'Sistólica normal' }, { lo: 60, hi: 79, label: 'Diastólica normal' }],
        range: '90–119 / 60–79', base: '116/75', per: 'uma medição por dia',
        msg: { ok: 'Dentro da faixa normal.', warn: 'Fora da faixa normal. Repita a medição com calma.', crit: 'Fora do limite seguro. Confirme e avise o comandante.' },
        why: ['A pressão mostra o esforço do coração para bombear o sangue. Na microgravidade, os líquidos do corpo se deslocam para cima, e isso pode mexer com a pressão.', 'Uma medição isolada diz pouco. O que importa é a tendência ao longo dos dias.'],
        how: ['Sente-se com as costas apoiadas e os pés firmes. Na estação, prenda os pés no apoio.', 'Descanse por 5 minutos, em silêncio.', 'Coloque o manguito no braço, na altura do coração.', 'Meça 2 vezes, com 1 minuto de intervalo. O app guarda a média.'],
        acts: [
          ['90–119 / 60–79', 'Siga a rotina e meça de novo amanhã, no mesmo horário.'],
          ['120–139 / 80–89, ou abaixo de 90/60', 'Repita em 5 minutos, sentado. Evite cafeína e sal hoje e anote como se sente no diário.'],
          ['140/90 ou mais, ou abaixo de 80/50', 'Pare a atividade e sente-se. Repita em 5 minutos. Se confirmar, avise o comandante. Com dor no peito, falta de ar ou tontura, peça ajuda agora.']
        ],
        cta: ['Medir pressão agora', 'Medicao.dc.html']
      },
      fc: {
        name: 'Frequência cardíaca', unit: 'bpm', axis: 'bpm', src: 'Anel', when: 'há 4 min', ranges: ['24h', '7d', '30d'], mode: 'line', wave: true,
        lo: 40, hi: 120, ticks: [40, 60, 80, 100, 120], bands: [{ lo: 50, hi: 95, label: 'Faixa normal em repouso', tl: true }],
        range: '50–95 bpm em repouso', base: '60 bpm', per: 'medido pelo anel',
        msg: { ok: 'Dentro da faixa em repouso.', warn: 'Fora da faixa em repouso. Sente-se e respire devagar.', crit: 'Muito fora da faixa. Pare e confirme a pulsação.' },
        why: ['A frequência cardíaca em repouso mostra como o coração está se adaptando. Subir sem esforço pode indicar estresse, febre, falta de líquido ou cansaço.', 'O anel mede o dia todo. O que vale é o repouso: sentado, sem ter treinado há pelo menos 15 minutos.'],
        how: ['Use o anel bem ajustado no dedo, sem folga.', 'Sincronize ao acordar e antes de dormir.', 'Para um valor em repouso, fique sentado em silêncio por 5 minutos antes de olhar a tela.'],
        acts: [
          ['50–95 bpm em repouso', 'Tudo certo. Siga o treino e a rotina do dia.'],
          ['96–110 ou 40–49 bpm em repouso', 'Sente-se e respire devagar por 5 minutos. Pense em esforço, cafeína ou estresse recentes. Se continuar, meça a pressão.'],
          ['Acima de 110 ou abaixo de 40 bpm em repouso', 'Pare o que está fazendo e sente-se. Confirme a pulsação no pulso por 1 minuto e avise o comandante. Com dor no peito, desmaio ou falta de ar, peça ajuda agora.']
        ],
        cta: ['Registrar como me sinto', 'Diario.dc.html']
      },
      gl: {
        name: 'Glicose', unit: 'mg/dL', axis: 'mg/dL', src: 'Manual', when: 'ontem 07:35', ranges: ['7d', '30d'], mode: 'line', manual: true,
        lo: 60, hi: 140, ticks: [60, 80, 100, 120, 140], bands: [{ lo: 70, hi: 99, label: 'Faixa normal em jejum' }],
        range: '70–99 mg/dL em jejum', base: '94 mg/dL', per: 'uma medição por dia, em jejum',
        msg: { ok: 'Dentro da faixa em jejum.', warn: 'Fora da faixa. Repita amanhã em jejum.', crit: 'Fora do limite seguro. Meça de novo agora.' },
        why: ['A glicose é o combustível do corpo. Em missão, estresse, sono curto e mudanças na dieta podem fazer o valor subir ou cair.', 'A medição em jejum é a mais fácil de comparar de um dia para o outro.'],
        how: ['Fique 8 horas sem comer, só com água.', 'Lave e seque as mãos.', 'Pique a lateral da ponta do dedo e encoste a gota na tira do glicosímetro.', 'Anote o valor. O app guarda a data e a hora.'],
        acts: [
          ['70–99 mg/dL em jejum', 'Siga a rotina. Meça em jejum de novo amanhã.'],
          ['100–125 ou 54–69 mg/dL', 'Repita a medição. Abaixo de 70: coma 15 g de açúcar de ação rápida e meça de novo em 15 minutos. Acima de 100: anote a última refeição no diário.'],
          ['126 mg/dL ou mais, ou abaixo de 54', 'Meça de novo agora. Abaixo de 54: coma 15 g de açúcar de ação rápida, fique parado e avise o comandante. Acima de 126 confirmado: avise o time médico.']
        ],
        cta: ['Medir glicose agora', 'Medicao.dc.html']
      },
      tc: {
        name: 'Temperatura corporal', unit: '°C', axis: '°C', src: 'Anel + manual', when: 'há 4 min', ranges: ['24h', '7d', '30d'], mode: 'line', dec: 1,
        lo: 36, hi: 38, ticks: [36, 36.5, 37, 37.5, 38], bands: [{ lo: 36.1, hi: 37.5, label: 'Faixa normal' }],
        range: '36,1–37,5 °C', base: '36,6 °C', per: 'estimada pelo anel',
        msg: { ok: 'Dentro da faixa normal.', warn: 'Levemente fora da faixa. Confirme com o termômetro.', crit: 'Possível febre. Confirme e siga o guia.' },
        why: ['A temperatura sobe com infecção, esforço e estresse. Na microgravidade o corpo perde calor de outro jeito, por isso acompanhar a tendência ajuda mais do que um valor isolado.', 'O anel estima a temperatura da pele. Se passar do normal, confirme com o termômetro de bordo.'],
        how: ['O anel estima a temperatura da pele, de dia e de noite.', 'Se o valor sair da faixa, espere 15 minutos depois de treino ou banho.', 'Meça com o termômetro de bordo, no ouvido ou na testa.', 'Registre o valor. O app compara com a estimativa do anel.'],
        acts: [
          ['36,1–37,5 °C', 'Siga a rotina e beba água ao longo do dia.'],
          ['37,6–37,9 °C, ou 35,0–36,0 °C', 'Confirme com o termômetro de bordo. Hidrate-se, descanse e meça de novo em 1 hora.'],
          ['38,0 °C ou mais, ou abaixo de 35,0 °C', 'Confirme no termômetro. Com febre, afaste-se do convívio e avise o comandante. Siga o protocolo de infecção de bordo.']
        ],
        cta: ['Medir temperatura agora', 'Medicao.dc.html']
      },
      sn: {
        name: 'Sono', unit: 'esta noite', axis: 'horas por noite', src: 'Anel', when: 'ao acordar', ranges: ['7d', '30d'], mode: 'bars', hm: true,
        lo: 0, hi: 10, ticks: [0, 2, 4, 6, 8, 10], bands: [{ lo: 7, hi: 9, label: 'Faixa normal' }],
        range: '7 a 9 h por noite', base: '7 h 20', per: 'uma noite por barra',
        msg: { ok: 'Boa noite de sono.', warn: 'Noite curta. O treino de hoje cai 30%.', crit: 'Sono muito curto. Treino leve e sem tarefas de risco.' },
        why: ['Dormir menos de 7 horas por noite piora a atenção e a recuperação. Em missão, isso pesa nas tarefas de risco.', 'O anel registra o sono sozinho. Luz baixa à noite e horário fixo ajudam o relógio do corpo.'],
        how: ['Use o anel à noite, bem ajustado no dedo.', 'Sincronize ao acordar. O app mostra o total de horas.', 'A partir das 21:30, deixe a luz baixa e evite telas.'],
        acts: [
          ['7 a 9 h', 'Mantenha o horário. Treino normal hoje.'],
          ['5 h a 6 h 59, ou mais de 9 h', 'O treino de hoje cai 30%. Evite cafeína depois das 14:00 e faça um cochilo de até 20 minutos, se precisar.'],
          ['Menos de 5 h', 'Treino leve e sem tarefas de risco, como saída extraveicular. Avise o comandante e combine descanso.']
        ],
        cta: ['Ajustar o treino de hoje', 'Rotina.dc.html']
      },
      hu: {
        name: 'Humor', unit: 'de 5', axis: 'nota de 1 a 5', src: 'Você', when: 'ontem 21:40', ranges: ['7d', '30d'], mode: 'bars',
        lo: 0, hi: 5.5, ticks: [1, 2, 3, 4, 5], bands: [{ lo: 3, hi: 5, label: 'Faixa normal' }],
        range: 'nota 3 a 5', base: 'nota 4', per: 'um registro por dia',
        msg: { ok: 'Humor estável.', warn: 'Humor baixo. Vale conversar com alguém.', crit: 'Humor muito baixo. Procure apoio hoje.' },
        why: ['O humor muda antes de aparecerem outros sinais de cansaço e estresse. Anotar todo dia ajuda a perceber a tendência.', 'O registro é só seu. Você escolhe se quer compartilhar o humor com o time.'],
        how: ['Pergunte-se: como foi meu dia?', 'Escolha de 1 (muito mal) a 5 (muito bem) no diário de bordo.', 'Se quiser, escreva uma nota. Ela fica só com você.'],
        acts: [
          ['Nota 3 a 5', 'Siga a rotina. Registre de novo amanhã.'],
          ['Nota 2', 'Converse com alguém do time ou escreva no diário. Faça uma pausa de 15 minutos em um lugar com luz clara.'],
          ['Nota 1', 'Fale com alguém de confiança ainda hoje. Se você quiser, o comandante pede apoio psicológico da Terra.']
        ],
        cta: ['Escrever no diário', 'Diario.dc.html']
      }
    };
  }
  fmt(id, v) {
    if (id === 'sn') { return this.hm(v); }
    if (id === 'tc') { return this.num(v, 1); }
    if (id === 'hu') { return String(Math.round(v)); }
    return String(Math.round(v));
  }
  renderVals() {
    const s = this.state, CFG = this.CFG(), SER = this.SER();
    const ids = ['pa', 'fc', 'gl', 'tc', 'sn', 'hu'];
    const cf = CFG[s.id];
    const range = cf.ranges.indexOf(s.range) >= 0 ? s.range : '7d';
    const raw = SER[s.id][range];
    const dual = !!cf.dual;
    const A = dual ? raw[0] : raw, B = dual ? raw[1] : null;
    const n = A.length;
    const val = (i) => (dual ? [A[i], B[i]] : A[i]);
    const sts = A.map((_, i) => this.classify(s.id, val(i)));
    const lastSt = sts[n - 1];
    const last = val(n - 1);

    // --- tabs
    const tabs = {};
    ids.forEach((k) => {
      const q = SER[k]['7d'];
      const isDual = !!CFG[k].dual;
      const v = isDual ? [q[0][q[0].length - 1], q[1][q[1].length - 1]] : q[q.length - 1];
      const st = this.classify(k, v);
      const txt = k === 'pa' ? v[0] + '/' + v[1] : this.fmt(k, v);
      tabs[k] = Object.assign({
        val: txt, on: s.id === k ? 'true' : 'false',
        tbd: s.id === k ? '#62C3FF' : '#1F4469', tbg: s.id === k ? '#133559' : '#0C2442', tsh: s.id === k ? 'inset 0 -4px 0 #62C3FF' : 'none',
        pick: () => this.setState({ id: k, range: CFG[k].ranges.indexOf(this.state.range) >= 0 ? this.state.range : '7d' })
      }, this.stx(st));
    });

    // --- range buttons
    const RL = { '24h': '24 horas', '7d': '7 dias', '30d': '30 dias' };
    const rangeBtns = cf.ranges.map((r) => ({
      label: RL[r], on: r === range ? 'true' : 'false', bg: r === range ? '#62C3FF' : 'transparent', fg: r === range ? '#04162B' : '#E8F0F8',
      pick: () => this.setState({ range: r })
    }));

    // --- geometry
    const W = 600, H = 260, lo = cf.lo, hi = cf.hi;
    const yp = (v) => 100 - ((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * 100;
    const fx = (i) => (n === 1 ? 0.5 : i / (n - 1));
    const lineOf = (arr) => arr.map((v, i) => (fx(i) * W).toFixed(1) + ',' + ((yp(v) / 100) * H).toFixed(1)).join(' ');
    const tickTxt = (t) => (s.id === 'tc' ? this.num(t, 1) : String(t));
    const grid = cf.ticks.map((t) => ({ top: yp(t).toFixed(2), label: tickTxt(t) }));
    const bands = cf.bands.map((b) => ({ top: yp(b.hi).toFixed(2), h: (yp(b.lo) - yp(b.hi)).toFixed(2), label: b.label,
      ly: (cf.mode === 'bars' ? yp(b.hi) : (b.tl ? yp(b.hi) : yp(b.lo))).toFixed(2), tf: b.tl ? 'none' : 'translateY(-100%)', side: b.tl ? 'left:0' : 'right:0' }));

    // --- series drawing
    let lineA = '', lineB = '', areaA = '', dotsA = '', dotsB = '', dotsW = '', dotsC = '', bars = [], marks = [];
    const isLine = cf.mode === 'line', isBars = cf.mode === 'bars';
    const dotsOK = n <= 31;
    if (isLine) {
      lineA = lineOf(A);
      if (dual) { lineB = lineOf(B); }
      if (!dual) { areaA = lineA + ' ' + W + ',' + H + ' 0,' + H; }
      if (dotsOK) {
        const dot = (i, arr) => 'M' + (fx(i) * W).toFixed(1) + ',' + ((yp(arr[i]) / 100) * H).toFixed(1) + ' h0 ';
        for (let i = 0; i < n; i++) {
          let stA = sts[i];
          if (dual) {
            const sysOut = A[i] >= 120 || A[i] < 90, diaOut = B[i] >= 80 || B[i] < 60;
            const crit = sts[i] === 'crit';
            if (sysOut) { if (crit) { dotsC += dot(i, A); } else { dotsW += dot(i, A); } } else { dotsA += dot(i, A); }
            if (diaOut) { if (crit) { dotsC += dot(i, B); } else { dotsW += dot(i, B); } } else { dotsB += dot(i, B); }
          } else {
            if (stA === 'crit') { dotsC += dot(i, A); } else if (stA === 'warn') { dotsW += dot(i, A); } else { dotsA += dot(i, A); }
          }
        }
      }
      const mk = (v) => ({ top: yp(v).toFixed(2), col: this.stx(lastSt).col });
      marks = dual ? [mk(A[n - 1]), mk(B[n - 1])] : [mk(A[n - 1])];
    } else {
      const showLbl = n <= 8;
      bars = A.map((v, i) => {
        const st = sts[i];
        const bg = st === 'ok' ? '#62C3FF' : (st === 'warn' ? 'repeating-linear-gradient(135deg,#FFC24B 0 6px,#8A6410 6px 12px)' : 'repeating-linear-gradient(45deg,#FF7B7B 0 5px,#7A2A2A 5px 10px)');
        const tc = st === 'ok' ? '#A9BDD2' : this.stx(st).col;
        return { h: (100 - yp(v)).toFixed(2), bg: bg, tc: tc, label: showLbl ? (s.id === 'sn' ? this.num(v, 1) : String(v)) : '' };
      });
    }
    const gap = n <= 8 ? 16 : 4;

    // --- x axis labels
    let xl;
    if (range === '24h') {
      xl = [[0, 'ontem 07:30'], [12 / 47, '13:30'], [24 / 47, '19:30'], [36 / 47, '01:30'], [1, 'agora']];
    } else if (range === '7d') {
      xl = [41, 42, 43, 44, 45, 46, 47].map((d, i) => [i / 6, 'dia ' + d]);
      if (isBars) { xl = [41, 42, 43, 44, 45, 46, 47].map((d, i) => [(i + 0.5) / 7, 'dia ' + d]); }
    } else {
      xl = [18, 25, 33, 40, 47].map((d) => [(d - 18) / 29, 'dia ' + d]);
      if (isBars) { xl = [18, 25, 33, 40, 47].map((d) => [(d - 18 + 0.5) / 30, 'dia ' + d]); }
    }
    xl = xl.map((q) => ({ left: (q[0] * 100).toFixed(2), text: q[1] }));

    // --- stats
    const outN = sts.filter((q) => q !== 'ok').length;
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    let stats;
    const st3 = (a, b, c) => [{ k: 'Média', v: a }, { k: 'Menor', v: b }, { k: 'Maior', v: c }];
    if (dual) {
      stats = st3(Math.round(avg(A)) + '/' + Math.round(avg(B)), Math.min.apply(null, A) + '/' + Math.min.apply(null, B), Math.max.apply(null, A) + '/' + Math.max.apply(null, B));
    } else if (s.id === 'hu') {
      stats = st3(this.num(avg(A), 1), String(Math.min.apply(null, A)), String(Math.max.apply(null, A)));
    } else {
      stats = st3(this.fmt(s.id, avg(A)), this.fmt(s.id, Math.min.apply(null, A)), this.fmt(s.id, Math.max.apply(null, A)));
    }
    stats.push({ k: 'Fora da faixa', v: outN + ' de ' + n });

    // --- legend
    const bandSw = 'width:18px;height:12px;background:rgba(70,211,154,0.18);border:1px dashed rgba(70,211,154,0.6)';
    const legend = [];
    if (dual) {
      legend.push({ sw: 'width:22px;height:0;border-top:3px solid #62C3FF', label: 'Sistólica' });
      legend.push({ sw: 'width:22px;height:0;border-top:3px dashed #A9BDD2', label: 'Diastólica' });
    }
    legend.push({ sw: bandSw, label: 'Faixa normal' });
    if (isLine && dotsOK) { legend.push({ sw: 'width:11px;height:11px;border-radius:50%;background:#FFC24B', label: 'Fora da faixa' }); }
    if (isBars) {
      legend.push({ sw: 'width:14px;height:14px;border-radius:3px;background:#62C3FF', label: 'Normal' });
      legend.push({ sw: 'width:14px;height:14px;border-radius:3px;background:repeating-linear-gradient(135deg,#FFC24B 0 6px,#8A6410 6px 12px)', label: 'Atenção' });
      legend.push({ sw: 'width:14px;height:14px;border-radius:3px;background:repeating-linear-gradient(45deg,#FF7B7B 0 5px,#7A2A2A 5px 10px)', label: 'Crítico' });
    }

    // --- texts
    const per = range === '24h' ? 'últimas 24 h · a cada 30 min' : (range === '7d' ? (cf.manual || isBars ? 'últimos 7 dias · ' + cf.per : 'últimos 7 dias · a cada 2 h') : (cf.manual || isBars ? 'últimos 30 dias · ' + cf.per : 'últimos 30 dias · média diária'));
    const sub = per + ' · ' + cf.axis;
    const valueTxt = s.id === 'pa' ? last[0] + '/' + last[1] : this.fmt(s.id, last);
    const alt = 'Gráfico de ' + cf.name.toLowerCase() + ', ' + RL[range] + '. Último valor ' + valueTxt + ' ' + cf.unit + ', ' + this.stx(lastSt).status.toLowerCase() + '. Média ' + stats[0].v + ', menor ' + stats[1].v + ', maior ' + stats[2].v + ', ' + outN + ' de ' + n + ' fora da faixa normal.';

    const how = cf.how.map((t, i) => ({ n: String(i + 1), t: t }));
    const stNames = ['ok', 'warn', 'crit'];
    const acts = cf.acts.map((a, i) => {
      const here = stNames[i] === lastSt;
      return Object.assign({
        rule: a[0], text: a[1], here: here ? 'Você está aqui agora' : '', cur: here ? 'true' : 'false',
        line: here ? this.stx(stNames[i]).bd : '#1F4469', fill: here ? this.stx(stNames[i]).bg : '#071D38', tcol: here ? '#E8F0F8' : '#A9BDD2'
      }, this.stx(stNames[i]));
    });

    const c = {
      title: cf.name, sub: sub, alt: alt, whyLeft: !cf.wave, whyRight: !!cf.wave, isLine: isLine, isBars: isBars, hasWave: !!cf.wave,
      grid: grid, bands: bands, lineA: lineA, lineB: lineB, areaA: areaA, dotsA: dotsA, dotsB: dotsB, dotsW: dotsW, dotsC: dotsC,
      bars: bars, gap: gap, marks: marks, xl: xl, legend: legend, stats: stats,
      value: valueTxt, unit: cf.unit, src: cf.src, when: cf.when, now: this.stx(lastSt), nowText: cf.msg[lastSt],
      range: cf.range, base: cf.base, why1: cf.why[0], why2: cf.why[1], how: how, acts: acts,
      ctaLabel: cf.cta[0], ctaHref: cf.cta[1]
    };
    return Object.assign({ tabs: tabs, rangeBtns: rangeBtns, c: c }, this.linkVals(), this.misVals());
  }
}
return Component;
});

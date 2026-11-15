window.__dcDefine(function (DCLogic) {
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { scen: 'comum', env: 'estacao', done: { sync: true }, edit: false, lay: null };
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


  layDefault() {
    const o = {};
    ['pa', 'fc', 'gl', 'tc', 'sn', 'hu'].forEach((k) => { o[k] = { on: true, span: 6 }; });
    ['o2', 'kg', 'rad', 'ring'].forEach((k) => { o[k] = { on: true, span: 3 }; });
    return o;
  }
  layVals() {
    const lay = this.state.lay || this.layDefault();
    const NAMES = { pa: 'Pressão arterial', fc: 'Frequência cardíaca', gl: 'Glicose', tc: 'Temperatura', sn: 'Sono', hu: 'Humor', o2: 'Oxigenação', kg: 'Peso', rad: 'Radiação', ring: 'Anel inteligente' };
    const hFor = (sp) => Math.round(84 + Math.max(0, Math.min(8, sp - 4)) * 15.75);
    const ord = this.state.ord || Object.keys(lay);
    const reorder = (from, to) => { if (from === to || !from) { return; } const a = ord.filter((x) => x !== from); a.splice(a.indexOf(to), 0, from); this.setState({ ord: a, over: '' }); };
    const set = (k, patch) => { const cur = Object.assign({}, this.state.lay || this.layDefault()); cur[k] = Object.assign({}, cur[k], patch); this.setState({ lay: cur }); };
    const out = {}, hidden = [];
    Object.keys(lay).forEach((k) => {
      const z = lay[k];
      out[k] = {
        on: z.on, span: z.span, h: hFor(z.span),
        hide: () => set(k, { on: false }),
        ord: ord.indexOf(k), ol: this.state.over === k ? '2px dashed #62C3FF' : 'none',
        rs: (e) => {
          const el = e.currentTarget && e.currentTarget.closest ? e.currentTarget.closest('[data-vn-card]') : e.target.closest('[data-vn-card]');
          if (!el) { return; }
          e.preventDefault();
          const grid = el.parentElement, gs = getComputedStyle(grid), gap = parseFloat(gs.columnGap) || 0;
          const col = (grid.getBoundingClientRect().width + gap) / 12, x0 = e.clientX, w0 = el.getBoundingClientRect().width;
          const min = ['o2', 'kg', 'rad', 'ring'].indexOf(k) >= 0 ? 3 : 4;
          const mv = (ev) => { const sp = Math.max(min, Math.min(12, Math.round((w0 + (ev.clientX - x0) + gap) / col))); const cur = this.state.lay || this.layDefault(); if (cur[k].span !== sp) { set(k, { span: sp }); } };
          const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); };
          window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
        },
        dragStart: (e) => { this.dragK = k; if (e.dataTransfer) { e.dataTransfer.setData('text/plain', k); e.dataTransfer.effectAllowed = 'move'; const card = e.target && e.target.closest ? e.target.closest('[data-vn-card]') : null; if (card && e.dataTransfer.setDragImage) { e.dataTransfer.setDragImage(card, 24, 24); } } },
        over: (e) => { if (!this.state.edit) { return; } e.preventDefault(); if (this.state.over !== k) { this.setState({ over: k }); } },
        drop: (e) => { if (!this.state.edit) { return; } e.preventDefault(); reorder(this.dragK, k); },
        end: () => { this.dragK = ''; if (this.state.over) { this.setState({ over: '' }); } }
      };
      if (!z.on) { hidden.push({ label: NAMES[k], show: () => set(k, { on: true }) }); }
    });
    const edit = !!this.state.edit;
    return {
      lay: out, edit: edit, hiddenBtns: hidden, showTray: edit && hidden.length > 0,
      editLabel: edit ? 'Concluir' : 'Personalizar', dr: edit ? "true" : "false", editHint: edit ? 'Arraste pela alça para mover, puxe a borda direita para mudar a largura ou arquive o que não precisa.' : '',
      toggleEdit: () => this.setState({ edit: !this.state.edit }), resetLay: () => this.setState({ lay: null, ord: null })
    };
  }

  D() {
    return {
      scen: {
        comum: { label: 'Dia comum', pa: [[116, 74], [118, 76], [115, 73], [119, 77], [117, 75], [118, 76], [118, 76]], fc: [60, 59, 61, 60, 62, 61, 61], gl: [94, 92, 95, 96, 93, 95, 96], tc: [36.6, 36.7, 36.6, 36.6, 36.7, 36.7, 36.7], sn: [7.4, 7.1, 7.6, 6.9, 7.2, 6.7, 6.08], hu: [4, 4, 3, 4, 4, 3, 3], o2: 97, rad: 1.0 },
        febre: { label: 'Febre', pa: [[116, 74], [117, 75], [118, 76], [119, 77], [121, 78], [123, 79], [124, 81]], fc: [60, 60, 62, 66, 74, 86, 98], gl: [94, 92, 95, 96, 93, 95, 97], tc: [36.7, 36.8, 36.9, 37.4, 37.8, 38.0, 38.2], sn: [7.2, 7.0, 6.5, 6.0, 5.6, 5.2, 5.4], hu: [4, 4, 3, 3, 3, 2, 2], o2: 96, rad: 1.0 },
        hipoxia: { label: 'Hipóxia', pa: [[116, 74], [118, 76], [117, 75], [119, 77], [120, 78], [121, 79], [122, 80]], fc: [60, 61, 62, 64, 70, 88, 104], gl: [94, 92, 95, 96, 93, 95, 96], tc: [36.6, 36.7, 36.6, 36.6, 36.7, 36.7, 36.7], sn: [7.2, 7.1, 6.8, 6.6, 6.5, 6.4, 6.4], hu: [4, 4, 4, 3, 3, 3, 3], o2: 91, rad: 1.0 },
        estresse: { label: 'Estresse', pa: [[116, 74], [120, 78], [124, 80], [128, 82], [130, 84], [133, 85], [134, 86]], fc: [60, 63, 66, 70, 74, 78, 80], gl: [94, 96, 98, 101, 104, 106, 108], tc: [36.6, 36.7, 36.6, 36.7, 36.7, 36.8, 36.8], sn: [7.2, 6.8, 6.4, 6.0, 5.7, 5.4, 5.3], hu: [4, 3, 3, 3, 2, 2, 2], o2: 97, rad: 1.0 },
        radiacao: { label: 'Radiação', pa: [[116, 74], [118, 76], [117, 75], [119, 77], [117, 75], [118, 76], [118, 76]], fc: [60, 59, 61, 60, 62, 64, 68], gl: [94, 92, 95, 96, 93, 95, 96], tc: [36.6, 36.7, 36.6, 36.6, 36.7, 36.7, 36.7], sn: [7.2, 7.0, 7.3, 7.1, 7.4, 7.0, 7.1], hu: [4, 4, 3, 4, 3, 3, 3], o2: 97, rad: 4.2 }
      },
      env: {
        estacao: { label: 'Estação', name: 'Estação espacial', g: 'Microgravidade (cerca de 0 g)', delay: 'Menos de 1 s', light: '16 nasceres do sol por dia', rad: 0.6, note: 'O treino de resistência diário ajuda a proteger músculos e ossos. Prenda-se ao apoio ao medir a pressão.' },
        lua: { label: 'Lua', name: 'Superfície lunar', g: '1/6 da gravidade da Terra', delay: 'Cerca de 2,6 s, ida e volta', light: 'Dia lunar de cerca de 29,5 dias', rad: 1.4, note: 'Com gravidade baixa, o treino precisa de carga extra. A poeira fina exige cuidado com olhos e vias aéreas.' },
        marte: { label: 'Marte', name: 'Superfície de Marte', g: '0,38 da gravidade da Terra', delay: '3 a 22 min, só de ida', light: 'Sol de 24 h 39 min', rad: 0.7, note: 'O dia marciano é 39 min mais longo: o relógio de missão acompanha esse ritmo para o sono não derivar. Sem a Terra em tempo real, decida com o guia.' },
        terra: { label: 'Terra remota', name: 'Comunidade remota na Terra', g: 'Gravidade normal (1 g)', delay: 'Satélite, intermitente', light: 'Ciclo normal de 24 h', rad: 0.007, note: 'Sem especialistas por perto, o guia de ação orienta o primeiro atendimento e o resumo vai para o time de saúde quando houver sinal.' }
      }
    };
  }
  renderVals() {
    const s = this.state, D = this.D();
    const sc = D.scen[s.scen], ev = D.env[s.env];
    const spark = (vals, lo, hi, band) => {
      const W = 120, n = vals.length;
      const yp = (v) => 100 - ((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * 100;
      const p = vals.map((v, i) => [(i / (n - 1)) * W, yp(v)]);
      const pts = p.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');
      return { pts: pts, area: pts + ' ' + W + ',100 0,100', dotY: p[n - 1][1].toFixed(1), bandTop: yp(band[1]).toFixed(1), bandH: (yp(band[0]) - yp(band[1])).toFixed(1) };
    };
    const last = (a) => a[a.length - 1];
    const R = {};
    const mk = (id, v, valueTxt, unit, range, src, when, sigTxt, sparkVals, lo, hi, band) => {
      const st = this.classify(id, v);
      return Object.assign({ value: valueTxt, unit: unit, range: range, src: src, when: when, sig: sigTxt }, this.stx(st), spark(sparkVals, lo, hi, band));
    };
    const pa = last(sc.pa), fc = last(sc.fc), gl = last(sc.gl), tc = last(sc.tc), sn = last(sc.sn), hu = last(sc.hu);
    R.pa = mk('pa', pa, pa[0] + '/' + pa[1], 'mmHg', '90–119 / 60–79', 'Manual', 'ontem 19:40', pa[0] + '/' + pa[1], sc.pa.map((q) => q[0]), 80, 140, [90, 119]);
    R.fc = mk('fc', fc, String(fc), 'bpm', '50–95 em repouso', 'Anel', 'há 4 min', fc + ' bpm', sc.fc, 40, 120, [50, 95]);
    R.gl = mk('gl', gl, String(gl), 'mg/dL', '70–99 em jejum', 'Manual', 'ontem 07:35', gl + ' mg/dL', sc.gl, 60, 140, [70, 99]);
    R.tc = mk('tc', tc, this.num(tc, 1), '°C', '36,1–37,5', 'Anel + manual', 'há 4 min', this.num(tc, 1) + ' °C', sc.tc, 36, 38.5, [36.1, 37.5]);
    R.sn = mk('sn', sn, this.hm(sn), 'esta noite', '7–9 h', 'Anel', 'ao acordar', this.hm(sn), sc.sn, 4, 10, [7, 9]);
    R.hu = mk('hu', hu, String(hu), 'de 5', '3 a 5', 'Você', 'ontem 21:40', hu + '/5', sc.hu, 0.5, 5.5, [3, 5]);
    // secondary
    const o2 = sc.o2, ratio = sc.rad, radVal = ev.rad * ratio;
    const radTxt = radVal < 0.1 ? this.num(radVal, 3) : this.num(radVal, 2);
    R.o2 = Object.assign({ value: String(o2), unit: '%', cap: 'Anel · noturno' }, this.stx(this.classify('o2', o2)));
    R.kg = Object.assign({ value: '74,2', unit: 'kg', cap: 'Linha de base 74,0 kg · +0,3%' }, this.stx('ok'));
    R.rad = Object.assign({ value: radTxt, unit: 'mSv/dia', cap: ratio > 1 ? ratio.toFixed(1).replace('.', ',') + ' vezes o normal do ambiente' : 'Dentro do normal do ambiente' }, this.stx(this.classify('rad', ratio)));
    // alert
    const names = { pa: 'Pressão arterial', fc: 'Frequência cardíaca', gl: 'Glicose', tc: 'Temperatura', sn: 'Sono', hu: 'Humor', o2: 'Oxigenação', rad: 'Radiação' };
    const hrefs = { pa: 'Medicao.dc.html', gl: 'Medicao.dc.html', tc: 'Medicao.dc.html', o2: 'Medicao.dc.html', fc: 'Indicador.dc.html', sn: 'Indicador.dc.html', hu: 'Indicador.dc.html', rad: 'Publico.dc.html' };
    const prio = ['tc', 'o2', 'rad', 'pa', 'fc', 'gl', 'sn', 'hu'];
    const crit = prio.filter((k) => R[k].st === 'crit'), warn = prio.filter((k) => R[k].st === 'warn');
    let alert = null;
    const delay = ' Contato com a Terra: ' + ev.delay.toLowerCase() + '.';
    if (crit.length) {
      const k = crit[0];
      const T = {
        tc: ['Temperatura em ' + R.tc.value + ' °C', 'Confirme com o termômetro de bordo. O guia de ação explica o que fazer agora.', 'Abrir o guia de ação'],
        o2: ['Oxigenação baixa: ' + o2 + '%', 'Sente-se, respire fundo e confira a posição do sensor. Se continuar abaixo de 92%, siga o protocolo.', 'Abrir o guia de ação'],
        rad: ['Radiação ' + ratio.toFixed(1).replace('.', ',') + ' vezes acima do normal', 'Possível evento de partículas solares. Vá para a área de abrigo e aguarde as instruções.', 'Ver painel da cabine']
      };
      const t = T[k] || [names[k] + ' crítico', 'Repita a medição e siga o guia de ação.', 'Abrir o guia de ação'];
      alert = Object.assign({ title: t[0], text: t[1] + (k === 'rad' ? '' : delay), cta: t[2], href: hrefs[k] }, this.stx('crit'));
    } else if (warn.length) {
      const k = warn[0];
      alert = Object.assign({
        title: warn.length === 1 ? names[k] + ' pede atenção' : warn.length + ' indicadores pedem atenção',
        text: warn.length === 1 ? (k === 'sn' ? 'Você dormiu ' + R.sn.value + '. O treino de hoje cai 30% para proteger a recuperação.' : 'Fora da faixa normal. Veja o que fazer.') : warn.map((q) => names[q]).join(', ') + '.',
        cta: 'Ver o que fazer', href: hrefs[k]
      }, this.stx('warn'));
    }
    // training suggestion
    const anyCrit = crit.length > 0;
    const shortSleep = R.sn.st !== 'ok' || R.hu.st === 'warn';
    const trainDetail = anyCrit ? 'Suspenso hoje: há um indicador crítico. Descanse e siga o guia.' : (shortSleep ? 'Volume sugerido: 3 × 7 (30% a menos por sono ou humor)' : 'Volume sugerido: 3 × 10, carga completa');
    const dets = {
      sync: 'Anel conectado · bateria 78%', med: 'Medição manual guiada, sentado e em repouso', cafe: 'Hora de comer. Registre no diário.',
      almoco: 'Hora de comer. Registre no diário.', treino: trainDetail, diario: 'Humor, refeições e sintomas do dia', sono: 'Meta de 7 h 30. Luz baixa a partir das 21:30.'
    };
    const ag = {};
    Object.keys(dets).forEach((k) => {
      const d = !!s.done[k];
      ag[k] = {
        detail: dets[k], done: d, pressed: d ? 'true' : 'false',
        bd: d ? '#46D39A' : '#2F5C8A', bg: d ? '#46D39A' : 'transparent',
        toggle: () => { const nd = Object.assign({}, this.state.done); nd[k] = !nd[k]; this.setState({ done: nd }); }
      };
    });
    const btn = (obj, cur, key) => Object.keys(obj).map((k) => ({
      label: obj[k].label, on: cur === k ? 'true' : 'false',
      bd: cur === k ? '#62C3FF' : '#2F5C8A', bg: cur === k ? '#133559' : 'transparent',
      pick: () => this.setState({ [key]: k })
    }));
    return Object.assign({}, this.linkVals(), this.misVals(), this.layVals(), R, {
      alert: alert || this.stx('ok'), hasAlert: !!alert,
      env: { g: ev.g, delay: ev.delay, light: ev.light, rad: ev.rad < 0.1 ? this.num(ev.rad, 3) : this.num(ev.rad, 1), note: ev.note },
      envName: ev.name, ag: ag, doneCount: Object.keys(dets).filter((k) => s.done[k]).length,
      scenBtns: btn(D.scen, s.scen, 'scen'), envBtns: btn(D.env, s.env, 'env')
    });
  }
}
return Component;
});

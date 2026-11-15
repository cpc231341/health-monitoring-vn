window.__dcDefine(function (DCLogic) {
class Component extends DCLogic {
  constructor(props) { super(props); this.state = {}; }

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

  renderVals() { return Object.assign({}, this.linkVals(), this.misVals()); }
}
return Component;
});

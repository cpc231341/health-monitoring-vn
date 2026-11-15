from common import *

def dchip(p, size=14):
    """Status chip driven by a bundle returned from renderVals: {col,bg,bd,status,isOk,isWarn,isCrit}."""
    return ('<span style="display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:2px;font-size:%dpx;font-weight:600;line-height:1.4;'
            'color:{{%s.col}};background:{{%s.bg}};border:1px solid {{%s.bd}}">'
            '<sc-if value="{{%s.isOk}}" hint-placeholder-val="{{ true }}">%s</sc-if>'
            '<sc-if value="{{%s.isWarn}}" hint-placeholder-val="{{ false }}">%s</sc-if>'
            '<sc-if value="{{%s.isCrit}}" hint-placeholder-val="{{ false }}">%s</sc-if>{{%s.status}}</span>'
            % (size, p, p, p, p, glyph("ok", 11), p, glyph("warn", 11), p, glyph("crit", 11), p))

def dglyph(p, size=11):
    return ('<sc-if value="{{%s.isOk}}" hint-placeholder-val="{{ true }}">%s</sc-if>'
            '<sc-if value="{{%s.isWarn}}" hint-placeholder-val="{{ false }}">%s</sc-if>'
            '<sc-if value="{{%s.isCrit}}" hint-placeholder-val="{{ false }}">%s</sc-if>'
            % (p, glyph("ok", size), p, glyph("warn", size), p, glyph("crit", size)))

# JS helpers shared by several screens (pasted inside each Component as methods)
JS_STATUS = r'''
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
'''

JS_LINK = r'''
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
'''


from crew import CREW, crew_json
import common as _c
JS_MISSION = (r'''
  meVals() {
    const L = ''' + crew_json(lambda s: _c.asset("crew/" + s)) + r''';
    let id = '';
    try { id = localStorage.getItem('vn.user') || ''; } catch (e) { id = ''; }
    return L.filter((p) => p.key === id)[0] || L[0];
  }
  misVals() {
    const close = () => { if (this._misKey) { window.removeEventListener('keydown', this._misKey); this._misKey = null; } this.setState({ misOpen: false }); const o = this._misOpener; this._misOpener = null; if (o && o.focus) { setTimeout(() => o.focus(), 0); } };
    const open = () => { this._misOpener = document.activeElement; setTimeout(() => { const b = document.querySelector('[role=dialog] button'); if (b) { b.focus(); } }, 0); this._misKey = (e) => { if (e.key === 'Escape') { close(); } }; window.addEventListener('keydown', this._misKey); this.setState({ misOpen: true }); };
    return { me: this.meVals(), mis: { isOpen: !!this.state.misOpen, open: open, close: close, stop: (e) => { if (e && e.stopPropagation) { e.stopPropagation(); } } } };
  }
''')

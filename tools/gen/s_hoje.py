from common import *
from dyn import *

IND_CARDS = [
    ("pa", "Pressão arterial", "gauge", "Indicador.dc.html"),
    ("fc", "Frequência cardíaca", "heart", "Indicador.dc.html"),
    ("gl", "Glicose", "droplet", "Indicador.dc.html"),
    ("tc", "Temperatura corporal", "thermo", "Indicador.dc.html"),
    ("sn", "Sono", "moon", "Indicador.dc.html"),
    ("hu", "Humor", "smile", "Indicador.dc.html"),
]


def tools(k, resizable):
    return ('<sc-if value="{{edit}}" hint-placeholder-val="{{ false }}"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-bottom:10px;border-bottom:1px dashed #2F5C8A;width:100%%">'
            '<span draggable="{{dr}}" onDragStart="{{lay.%s.dragStart}}" onDragEnd="{{lay.%s.end}}" role="img" aria-label="Arraste para mover" title="Arraste para mover" style="cursor:grab;display:flex;padding:8px">%s</span>'
            '<button type="button" aria-label="Arquivar cartão" title="Arquivar" onClick="{{lay.%s.hide}}" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:2px;border:1px solid #2F5C8A;background:transparent;color:#E8F0F8;padding:0">%s</button></div></sc-if>'
            % (k, k, icon("grip", 18, "#8AA3BD"), k, icon("archive", 18)))

def wrap(k, card):
    return ('<sc-if value="{{lay.%s.on}}" hint-placeholder-val="{{ true }}"><div data-vn-card="1" onDragOver="{{lay.%s.over}}" onDrop="{{lay.%s.drop}}" style="position:relative;grid-column:span {{lay.%s.span}};order:{{lay.%s.ord}};min-width:0;display:flex;flex-direction:column;outline:{{lay.%s.ol}};outline-offset:4px">%s'
            '<sc-if value="{{edit}}" hint-placeholder-val="{{ false }}"><div role="separator" aria-orientation="vertical" aria-label="Arraste para mudar a largura" title="Arraste para mudar a largura" onPointerDown="{{lay.%s.rs}}" style="position:absolute;top:0;bottom:0;right:-8px;width:16px;cursor:col-resize;touch-action:none;display:flex;align-items:center;justify-content:center;z-index:2"><span style="width:4px;height:44px;border-radius:2px;background:#62C3FF;opacity:.85"></span></div></sc-if></div></sc-if>' % (k, k, k, k, k, k, card, k))

BAR = '''
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px">
    <span style="font-size:15px;color:§muted">{{editHint}}</span>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      <sc-if value="{{edit}}" hint-placeholder-val="{{ false }}"><button type="button" class="btn-s" onClick="{{resetLay}}" style="@BTNS;min-height:40px;border-radius:2px;padding:6px 14px">Restaurar padrão</button></sc-if>
      <button type="button" class="btn-s" onClick="{{toggleEdit}}" style="@BTNS;min-height:40px;border-radius:2px;padding:6px 14px">{{editLabel}}</button>
    </div>
  </div>
  <sc-if value="{{showTray}}" hint-placeholder-val="{{ false }}"><div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:12px 14px;border:1px dashed #2F5C8A;border-radius:2px"><span style="font-size:15px;color:§muted">Adicionar ao painel</span>
    <sc-for list="{{hiddenBtns}}" as="h" hint-placeholder-count="2"><button type="button" onClick="{{h.show}}" style="display:flex;align-items:center;gap:6px;min-height:36px;padding:4px 12px;border-radius:2px;border:1px solid #2F5C8A;background:transparent;color:#E8F0F8;font-size:14px">@PLUS{{h.label}}</button></sc-for></div></sc-if>
'''.replace("@BTNS", BTN_S).replace("@PLUS", icon("plus", 16))

def ind_card(i, name, ic, href):
    return '''
<div class="hov" style="@CARD;padding:16px 18px 14px;display:flex;flex-direction:column;gap:12px;color:§text;min-width:0;flex:1">
  @TOOLS
  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><a href="@HREF" style="display:flex;align-items:center;gap:10px;font-size:17px;font-weight:600;color:§text">@ICON@NAME</a>@CHIP</div>
  <div style="position:relative;height:{{lay.@I.h}}px;border-bottom:1px solid #1F4469;border-left:1px solid #1F4469">
    <div aria-hidden="true" style="position:absolute;left:0;right:0;top:{{@I.bandTop}}%;height:{{@I.bandH}}%;background:rgba(70,211,154,0.10);border-top:1px dashed rgba(70,211,154,0.5);border-bottom:1px dashed rgba(70,211,154,0.5)"></div>
    <svg viewBox="0 0 120 100" preserveAspectRatio="none" role="img" aria-label="Tendência de @NAME nos últimos 7 dias, último valor {{@I.sig}}" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible">
      <polygon points="{{@I.area}}" fill="{{@I.col}}" fill-opacity="0.12"/>
      <polyline points="{{@I.pts}}" fill="none" stroke="{{@I.col}}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    </svg>
    <span aria-hidden="true" style="position:absolute;right:0;top:{{@I.dotY}}%;width:12px;height:12px;margin:-6px -6px 0 0;border-radius:50%;background:{{@I.col}};border:2px solid #0C2442"></span>
  </div>
  <div aria-hidden="true" style="display:flex;justify-content:space-between;font-size:13px;color:§subtle;margin-top:-6px"><span>há 7 dias</span><span>hoje</span></div>
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px;flex-wrap:wrap"><span style="display:flex;align-items:baseline;gap:6px"><span style="font-size:30px;font-weight:600;line-height:1;font-variant-numeric:tabular-nums">{{@I.value}}</span><span style="color:§muted;font-size:15px">{{@I.unit}}</span></span><span style="font-size:14px;color:§subtle">{{@I.src}} · {{@I.when}}</span></div>
  <div style="font-size:14px;color:§subtle;margin-top:-6px">Normal: {{@I.range}}</div>
</div>'''.replace("@TOOLS", tools(i, True)).replace("@HREF", href).replace("@CARD", CARD).replace("@ICON", icon(ic, 20, "§accent")).replace("@NAME", name)\
        .replace("@CHIP", dchip(i, 13)).replace("@I", i)

def sig_dyn(i, name, ic):
    return ('<div title="%s: {{%s.sig}}, {{%s.status}}" style="display:flex;align-items:center;gap:7px;padding:6px 11px;border-radius:999px;background:§surface;border:1px solid {{%s.bd}};min-height:34px">%s%s'
            '<span style="font-size:15px;font-weight:600;font-variant-numeric:tabular-nums">{{%s.sig}}</span><span class="sr-only">%s, {{%s.status}}</span></div>'
            % (name, i, i, i, dglyph(i), icon(ic, 17, "{{%s.col}}" % i), i, name, i))

def sec_card(i, name, ic, extra=""):
    return '''
<div style="@CARD;padding:16px 18px;display:flex;flex-direction:column;gap:10px;min-width:0;align-items:flex-start;flex:1">
  @TOOLS
  <span style="display:flex;align-items:center;gap:8px;color:§muted">@ICON@NAME</span>
  <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap"><span style="font-family:§disp;font-size:38px;font-weight:600;line-height:1;font-variant-numeric:tabular-nums">{{@I.value}}</span><span style="color:§muted;font-size:15px">{{@I.unit}}</span></div>
  @CHIP
  <div style="font-size:14px;color:§subtle">{{@I.cap}}</div>
</div>'''.replace("@TOOLS", tools(i, False)).replace("@CARD", CARD).replace("@ICON", icon(ic, 19, "§accent")).replace("@NAME", name).replace("@CHIP", dchip(i, 13)).replace("@I", i)

AGENDA = [
    ("sync", "06:45", "radio", "Sincronizar o anel", None),
    ("med", "07:30", "gauge", "Medir pressão e peso", "Medicao.dc.html"),
    ("cafe", "08:00", "utensils", "Café da manhã", "Diario.dc.html"),
    ("almoco", "12:30", "utensils", "Almoço", "Diario.dc.html"),
    ("treino", "17:00", "dumbbell", "Treino de força", "Rotina.dc.html"),
    ("diario", "21:30", "book", "Diário de bordo", "Diario.dc.html"),
    ("sono", "22:30", "moon", "Hora de dormir", "Rotina.dc.html"),
]

def agenda_row(k, t, ic, title, href):
    link = ('<a href="%s" style="display:inline-flex;align-items:center;gap:6px;min-height:44px;font-size:15px;font-weight:600">Abrir%s</a>' % (href, icon("arrowright", 16))) if href else ""
    return '''
<li style="display:grid;grid-template-columns:58px 24px minmax(0,1fr) auto auto;gap:6px 14px;align-items:center;padding:12px 0;border-bottom:1px solid §line">
  <span style="font-family:§mono;font-size:15px;color:§muted">@TIME</span>
  @ICON
  <div style="min-width:0"><div style="font-weight:600;font-size:17px">@TITLE</div><div style="font-size:15px;color:§muted">{{ag.@K.detail}}</div></div>
  <span>@LINK</span>
  <button type="button" onClick="{{ag.@K.toggle}}" aria-pressed="{{ag.@K.pressed}}" aria-label="Marcar como feito: @TITLE" style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1.5px solid {{ag.@K.bd}};background:{{ag.@K.bg}};padding:0">
    <sc-if value="{{ag.@K.done}}" hint-placeholder-val="{{ false }}">@CHECK</sc-if>
  </button>
</li>'''.replace("@TIME", t).replace("@ICON", icon(ic, 22, "§accent")).replace("@TITLE", title).replace("@K", k)\
        .replace("@LINK", link).replace("@CHECK", icon("check", 20, "#04162B", 2.6))

def build():
    cards = "".join(wrap(c[0], ind_card(*c)) for c in IND_CARDS)
    sigs = "".join(sig_dyn(i, n, ic) for i, n, ic in IND)
    sec = (wrap("o2", sec_card("o2", "Oxigenação (SpO₂)", "wind")) + wrap("kg", sec_card("kg", "Peso", "scale")) + wrap("rad", sec_card("rad", "Radiação do dia", "atom"))
           + wrap("ring", '''
<div style="@CARD;padding:16px 18px;display:flex;flex-direction:column;gap:10px;min-width:0;align-items:flex-start;flex:1">
  @TOOLS
  <span style="display:flex;align-items:center;gap:8px;color:§muted">@RING Anel inteligente</span>
  <div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:§disp;font-size:38px;font-weight:600;line-height:1">78%</span><span style="color:§muted;font-size:15px">de bateria</span></div>
  @CHIPOK
  <div style="font-size:14px;color:§subtle">Sincronizado há 4 min · em uso há 31 h</div>
</div>'''.replace("@TOOLS", tools("ring", False)).replace("@CARD", CARD).replace("@RING", icon("ring", 19, "§accent")).replace("@CHIPOK", chip("ok", "Conectado", 13))))
    agenda = "".join(agenda_row(*a) for a in AGENDA)

    header = '''
<header style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px 28px;padding:20px 32px;border-bottom:1px solid §line">
  <div style="min-width:0">
    <h1 style="margin:0;font-family:§disp;font-size:32px;font-weight:600;line-height:1.1">Bom dia, {{me.first}}</h1>
    <div style="margin-top:4px;font-size:16px;color:§muted"><span style="font-family:§mono;font-size:14px;color:§text">DIA 47 · 07:12</span> · {{envName}}</div>
  </div>
  <div role="group" aria-label="Barra de sinais" style="display:flex;flex-wrap:wrap;gap:8px">@SIGS</div>
</header>'''.replace("@SIGS", sigs)

    demo = '''
<div style="padding:12px 32px;border-bottom:1px solid §line;background:§side;display:flex;flex-wrap:wrap;gap:10px 28px;align-items:center">
  <span style="font-family:§mono;font-size:12px;letter-spacing:.08em;color:§accent">MODO DEMONSTRAÇÃO</span>
  <div role="group" aria-label="Cenário" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
    <span style="font-size:15px;color:§muted">Cenário</span>
    <sc-for list="{{scenBtns}}" as="b" hint-placeholder-count="5"><button type="button" aria-pressed="{{b.on}}" onClick="{{b.pick}}" style="min-height:40px;padding:6px 14px;border-radius:999px;border:1px solid {{b.bd}};background:{{b.bg}};color:#E8F0F8;font-size:15px;font-weight:500">{{b.label}}</button></sc-for>
  </div>
  <div role="group" aria-label="Ambiente" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
    <span style="font-size:15px;color:§muted">Ambiente</span>
    <sc-for list="{{envBtns}}" as="b" hint-placeholder-count="4"><button type="button" aria-pressed="{{b.on}}" onClick="{{b.pick}}" style="min-height:40px;padding:6px 14px;border-radius:999px;border:1px solid {{b.bd}};background:{{b.bg}};color:#E8F0F8;font-size:15px;font-weight:500">{{b.label}}</button></sc-for>
  </div>
</div>'''

    alert = '''
<sc-if value="{{hasAlert}}" hint-placeholder-val="{{ true }}">
<div role="alert" style="display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center;justify-content:space-between;padding:18px 20px;border-radius:14px;background:{{alert.bg}};border:1px solid {{alert.bd}}">
  <div style="display:flex;gap:14px;align-items:flex-start;min-width:0;flex:1 1 380px">
    <sc-if value="{{alert.isCrit}}" hint-placeholder-val="{{ false }}">@OCT</sc-if>
    <sc-if value="{{alert.isWarn}}" hint-placeholder-val="{{ true }}">@ALR</sc-if>
    <div><div style="font-weight:600;font-size:19px;line-height:1.3">{{alert.title}}</div><div style="color:§text;font-size:16px;margin-top:2px;opacity:.9">{{alert.text}}</div></div>
  </div>
  <a class="btn-p" href="{{alert.href}}" style="@BTNP">{{alert.cta}}</a>
</div>
</sc-if>'''.replace("@OCT", icon("octagon", 28, "§crit")).replace("@ALR", icon("alert", 28, "§warn")).replace("@BTNP", BTN_P)

    agenda_card = '''
<section aria-labelledby="agh" style="@CARD;padding:20px 22px;display:flex;flex-direction:column;gap:6px;flex:3 1 460px;min-width:0">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><h2 id="agh" style="margin:0;font-family:§disp;font-size:26px;font-weight:600">Agenda de hoje</h2><span style="font-size:15px;color:§muted">{{doneCount}} de 7 feitos</span></div>
  <ul style="list-style:none;margin:0;padding:0">@AGENDA</ul>
</section>'''.replace("@CARD", CARD).replace("@AGENDA", agenda)

    env_card = '''
<section aria-labelledby="envh" style="@CARD;padding:20px 22px;display:flex;flex-direction:column;gap:16px;flex:2 1 340px;min-width:0;align-self:flex-start">
  <h2 id="envh" style="margin:0;font-family:§disp;font-size:26px;font-weight:600;line-height:1.15">Ambiente: {{envName}}</h2>
  <dl style="margin:0;display:grid;grid-template-columns:minmax(112px,max-content) minmax(0,1fr);gap:12px 18px">
    <dt style="color:§muted">Gravidade</dt><dd style="margin:0;font-weight:600">{{env.g}}</dd>
    <dt style="color:§muted">Comunicação</dt><dd style="margin:0;font-weight:600">{{env.delay}}</dd>
    <dt style="color:§muted">Ciclo de luz</dt><dd style="margin:0;font-weight:600">{{env.light}}</dd>
    <dt style="color:§muted">Radiação normal</dt><dd style="margin:0;font-weight:600">{{env.rad}} mSv/dia</dd>
  </dl>
  <p style="margin:0;padding:12px 14px;border-radius:10px;background:§field;color:§muted;font-size:15px">{{env.note}}</p>
  <p style="margin:0;font-size:13px;color:§subtle">Valores ilustrativos, a validar com fontes oficiais antes de qualquer uso real.</p>
</section>'''.replace("@CARD", CARD)

    main_body = '''
@DEMO
<div style="padding:24px 32px 48px;display:flex;flex-direction:column;gap:22px">
  @ALERT
  @BAR
  <section aria-label="Indicadores" style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:16px;align-items:stretch;grid-auto-flow:row dense">@CARDS@SEC</section>
  <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start">@AG@ENV</div>
</div>'''.replace("@DEMO", demo).replace("@ALERT", alert).replace("@BAR", BAR).replace("@CARDS", cards).replace("@SEC", sec).replace("@AG", agenda_card).replace("@ENV", env_card)

    body = shell("Hoje", header, main_body, 1200)

    script = r'''class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { scen: 'comum', env: 'estacao', done: { sync: true }, edit: false, lay: null };
  }
''' + JS_STATUS + JS_LINK + JS_MISSION + r'''

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
}'''
    return page("Hoje", body, script, h=2100)

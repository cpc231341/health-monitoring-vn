import math
from common import *
from dyn import *
from crew import CREW

def line_svg(vals, lo, hi, b0, b1, col, h=96, w=400, grid=True):
    n = len(vals)
    def X(i): return 6 + i * (w - 12) / (n - 1)
    def Y(v): return h - 6 - (v - lo) / (hi - lo) * (h - 12)
    pts = " ".join("%.1f,%.1f" % (X(i), Y(v)) for i, v in enumerate(vals))
    band = '<rect x="0" y="%.1f" width="%d" height="%.1f" fill="rgba(70,211,154,0.12)"/>' % (Y(b1), w, Y(b0) - Y(b1))
    edges = ('<line x1="0" x2="%d" y1="%.1f" y2="%.1f" stroke="#2F5C8A" stroke-dasharray="3 4"/><line x1="0" x2="%d" y1="%.1f" y2="%.1f" stroke="#2F5C8A" stroke-dasharray="3 4"/>' % (w, Y(b1), Y(b1), w, Y(b0), Y(b0)))
    return ('<svg viewBox="0 0 %d %d" preserveAspectRatio="none" width="100%%" height="%d" aria-hidden="true" style="display:block;background:#071D38;border:1px solid #1F4469">%s%s'
            '<polyline points="%s" fill="none" stroke="%s" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>' % (w, h, h, band, edges, pts, col))

def bars_svg(vals, ref, col, h=96, w=400, top=10):
    n = len(vals); gap = 10; bw = (w - gap * (n + 1)) / n
    out = ""
    for i, v in enumerate(vals):
        bh = v / top * (h - 8)
        out += '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' % (gap + i * (bw + gap), h - bh, bw, bh, col if i < n - 1 else "#62C3FF")
    ry = h - ref / top * (h - 8)
    out += '<line x1="0" x2="%d" y1="%.1f" y2="%.1f" stroke="#8AA3BD" stroke-dasharray="3 4"/>' % (w, ry, ry)
    return '<svg viewBox="0 0 %d %d" preserveAspectRatio="none" width="100%%" height="%d" aria-hidden="true" style="display:block;background:#071D38;border:1px solid #1F4469">%s</svg>' % (w, h, h, out)

def tile(ic, title, st, stxt, chart, value, unit, foot, labels=("há 24 h", "agora"), span=2):
    return '''
<div style="@CARD;grid-column:span %d;padding:16px 18px;display:flex;flex-direction:column;gap:12px;min-width:0">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><span style="display:flex;align-items:center;gap:10px;font-size:17px;font-weight:600">%s%s</span>%s</div>
  %s
  <div aria-hidden="true" style="display:flex;justify-content:space-between;font-size:13px;color:§subtle;margin-top:-6px"><span>%s</span><span>%s</span></div>
  <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap"><span style="font-size:30px;font-weight:600;line-height:1;font-variant-numeric:tabular-nums">%s</span><span style="color:§muted;font-size:15px">%s</span></div>
  <div style="font-size:14px;color:§subtle;margin-top:-4px">%s</div>
</div>'''.replace("@CARD", CARD) % (span, icon(ic, 20, "§accent"), title, chip(st, stxt, 13), chart, labels[0], labels[1], value, unit, foot)

def series(base, amp, ph, n=24, drift=0.0):
    return [base + amp * math.sin(i / 3.2 + ph) + drift * i for i in range(n)]

ROSTER = [(c, c['activity'], c['until']) for c in CREW]

def person(c, act, until):
    name, role, cap = c['name'], c['role'], c['captain']
    eva = act.startswith("Atividade extra")
    bd = "#FFC24B" if cap else "#1F4469"
    tag = ('<span style="display:inline-flex;align-items:center;gap:4px;color:#FFC24B;font-size:12px;font-weight:600;letter-spacing:.1em">%s CAPITÃO</span>' % icon("star", 12, "#FFC24B", 2.2)) if cap else ""
    evat = ('<span style="padding:2px 8px;border:1px solid #62C3FF;color:#62C3FF;font-size:12px;font-weight:600;letter-spacing:.08em;border-radius:2px">EVA</span>') if eva else ""
    return '''
<li style="@CARD;border-color:%s;padding:14px;display:flex;flex-direction:column;gap:10px;min-width:0">
  <div style="display:flex;align-items:center;gap:12px"><span aria-hidden="true" style="flex:none;width:44px;height:44px;border-radius:50%%;background-color:§surface2;background-image:url(%s);background-repeat:no-repeat;background-size:230%% auto;background-position:50%% 9%%"></span>
    <span style="display:flex;flex-direction:column;min-width:0"><span style="font-weight:600;font-size:16px;line-height:1.2">%s</span><span style="font-size:14px;color:§muted">%s</span></span></div>
  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px dashed #1F4469;padding-top:10px"><span style="font-size:15px">%s</span>%s</div>
  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:18px"><span style="font-size:13px;color:§subtle">%s</span>%s</div>
</li>'''.replace("@CARD", CARD) % (bd, asset("crew/" + c["slug"]), name, role, act, evat, until or "agora", tag)

def goal(title, done, total, unit, note):
    pct = int(done / total * 100)
    return '''
<div style="display:flex;flex-direction:column;gap:8px">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px"><span style="font-size:16px;font-weight:600">%s</span><span style="font-size:15px;color:§muted;font-variant-numeric:tabular-nums"><b style="color:§text;font-size:18px">%d</b> de %d %s</span></div>
  <div role="img" aria-label="%d%% da meta" style="height:10px;background:#071D38;border:1px solid #1F4469"><div style="width:%d%%;height:100%%;background:#62C3FF"></div></div>
  <span style="font-size:14px;color:§subtle">%s</span>
</div>''' % (title, done, total, unit, pct, pct, note)

def h2(t, sub):
    return '<div style="display:flex;flex-direction:column;gap:2px"><h2 style="margin:0;font-family:§disp;font-size:22px;font-weight:600">%s</h2><span style="font-size:15px;color:§muted">%s</span></div>' % (t, sub)

def build():
    roster = "".join(person(*p) for p in ROSTER)
    sleep = bars_svg([7.1, 6.9, 7.2, 6.6, 6.8, 6.7, 6.8], 7, "#46D39A", top=9)
    mood = line_svg([3.8, 3.6, 3.9, 3.5, 3.7, 3.4, 3.6], 1, 5, 3, 5, "#46D39A", w=400)
    medias = (tile("moon", "Sono médio", "warn", "Atenção", sleep, "6 h 48", "por noite", "Meta do time: 7 h ou mais · últimos 7 dias", ("há 7 dias", "hoje"))
              + tile("smile", "Humor médio", "ok", "Normal", mood, "3,6", "de 5", "Média de 5 pessoas · sem nomes", ("há 7 dias", "hoje"))
              + tile("dumbbell", "Treino do time", "ok", "Normal", bars_svg([3, 4, 5, 3, 4, 4, 4], 4, "#46D39A", top=5), "4 de 5", "treinaram hoje", "Treino de resistência e cardio", ("há 7 dias", "hoje")))
    sens = (tile("atom", "Radiação", "ok", "Normal", line_svg(series(0.6, 0.05, 0.2), 0.3, 1.0, 0.4, 0.8, "#46D39A"), "0,60", "mSv/dia", "Normal da estação: 0,4 a 0,8")
            + tile("wind", "CO₂", "ok", "Normal", line_svg(series(2800, 260, 1.0), 1500, 4500, 2000, 3600, "#46D39A"), "2 800", "ppm", "Faixa ilustrativa: 2 000 a 3 600")
            + tile("thermo", "Temperatura", "ok", "Normal", line_svg(series(22.5, 0.5, 2.0), 19, 26, 20, 25, "#46D39A"), "22,5", "°C", "Normal: 20 a 25")
            + tile("droplet", "Umidade", "warn", "Atenção", line_svg(series(55, 4, 0.5, drift=0.35), 30, 70, 40, 60, "#FFC24B"), "63", "%", "Acima de 60 desde as 18:10 · filtro em manutenção", span=3)
            + tile("gauge", "Pressão", "ok", "Normal", line_svg(series(101.3, 0.35, 1.6), 98, 104, 99, 103, "#46D39A"), "101,3", "kPa", "Normal: 99 a 103", span=3))
    goals = (goal("Treinos do time na semana", 18, 25, "sessões", "Faltam 7 sessões até domingo.")
             + goal("Check-in de humor de todos", 12, 14, "dias seguidos", "Meta de 14 dias libera a conquista coletiva.")
             + goal("Relatórios enviados à base", 46, 47, "dias", "O relatório do dia 47 está na fila."))
    header = '''
<header style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px 28px;padding:20px 32px;border-bottom:1px solid §line">
  <div style="min-width:0">
    <h1 style="margin:0;font-family:§disp;font-size:32px;font-weight:600;line-height:1.1">Painel da tripulação</h1>
    <div style="margin-top:4px;font-size:16px;color:§muted"><span style="font-size:14px;color:§text">DIA 47 · 07:12</span> · Time Zagaia · todos veem este painel</div>
  </div>
  <span style="display:flex;align-items:center;gap:10px;padding:8px 14px;border:1px solid §line2;border-radius:2px;font-size:15px">@USERS <b>5 a bordo</b> <span style="color:§muted">· 1 em atividade extraveicular</span></span>
</header>'''.replace("@USERS", icon("users", 18, "§accent"))
    body_main = '''
<div style="padding:24px 32px 40px;display:flex;flex-direction:column;gap:30px">
  <section style="display:flex;flex-direction:column;gap:14px">@H1<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(170px,100%),1fr));gap:14px">@ROSTER</ul></section>
  <section style="display:flex;flex-direction:column;gap:14px">@H2<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:16px">@MEDIAS</div></section>
  <section style="display:flex;flex-direction:column;gap:14px">@H3<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:16px">@SENS</div></section>
  <section style="display:flex;flex-direction:column;gap:14px">@H4<div style="@CARD;padding:20px 22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:26px">@GOALS</div></section>
  <p style="margin:0;display:flex;gap:10px;align-items:flex-start;font-size:14px;color:§subtle;border-top:1px solid §line;padding-top:16px">@INFO<span>Este painel mostra atividades, sensores da cabine e médias de 3 ou mais pessoas. Valores de saúde de cada um ficam só no Hoje da própria pessoa, e o comandante vê apenas o estado. Dados simulados, faixas ilustrativas a validar com fontes oficiais.</span></p>
</div>'''
    body_main = (body_main.replace("@H1", h2("Quem está fazendo o quê", "Atividade de cada pessoa agora, sem dados de saúde."))
                 .replace("@H2", h2("Médias do time", "Média de 5 pessoas, sem nomes."))
                 .replace("@H3", h2("Sensores da cabine", "Ar, temperatura e radiação do ambiente compartilhado."))
                 .replace("@H4", h2("Metas do time", "O que a tripulação constrói junta."))
                 .replace("@ROSTER", roster).replace("@MEDIAS", medias).replace("@SENS", sens).replace("@GOALS", goals)
                 .replace("@CARD", CARD).replace("@INFO", icon("info", 18, "#8AA3BD")))
    body = shell("Painel da tripulação", header, body_main, 1500)
    script = '''class Component extends DCLogic {
  constructor(props) { super(props); this.state = {}; }
''' + JS_LINK + JS_MISSION + '''
  renderVals() { return Object.assign({}, this.linkVals(), this.misVals()); }
}'''
    return page("Painel da tripulação", body, script, h=1500)

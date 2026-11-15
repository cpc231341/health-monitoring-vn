# Tokens, ícones e utilitários de layout compartilhados pelas telas do Vento Norte Health.
import re, json, os

_HERE = os.path.dirname(os.path.abspath(__file__))
TARGET = os.environ.get("VN_TARGET", "electron")   # "electron" (app) ou "artifact" (canvas de design)
OUT = os.environ.get("VN_OUT") or os.path.normpath(os.path.join(_HERE, "..", "..", "src"))
_BLOBS = json.load(open(os.path.join(_HERE, "blobs.json")))
_LOCAL = {"patch": "assets/patch-zagaia.png", "logo": "assets/vento-norte-logo.png"}

def asset(name):
    """URL de uma imagem: blob do artefato ou caminho relativo no app Electron."""
    if TARGET == "artifact":
        return _BLOBS[name]
    return _LOCAL.get(name) or "assets/crew/%s.png" % name[5:]

PATCH = asset("patch")
LOGO = asset("logo")

# ---- design tokens (the direction: sala de controle em azul-marinho, derivada do logo da Vento Norte) ----
C = dict(
    bg="#06182E", side="#041224", surface="#0C2442", surface2="#133559", field="#071D38",
    line="#1F4469", line2="#2F5C8A",
    text="#E8F0F8", muted="#A9BDD2", subtle="#8AA3BD",
    accent="#62C3FF", accentHi="#8AD3FF", accentInk="#04162B", accent2="#FF9A5A",
    ok="#46D39A", warn="#FFC24B", crit="#FF7B7B",
    okBg="rgba(70,211,154,0.14)", warnBg="rgba(255,194,75,0.14)", critBg="rgba(255,123,123,0.16)",
    okLine="rgba(70,211,154,0.45)", warnLine="rgba(255,194,75,0.45)", critLine="rgba(255,123,123,0.55)",
    body="'Source Sans Pro', 'Source Sans 3', 'Segoe UI', system-ui, sans-serif",
    disp="'Source Sans Pro', 'Source Sans 3', 'Segoe UI', system-ui, sans-serif",
    mono="'Source Sans Pro', 'Source Sans 3', 'Segoe UI', system-ui, sans-serif",
)

def T(s, **kw):
    d = dict(C)
    d.update(kw)
    def rep(m):
        k = m.group(1)
        if k not in d:
            raise KeyError("token §%s not defined" % k)
        return str(d[k])
    return re.sub(r"§([A-Za-z0-9_]+)", rep, s)

# ---- icons (24x24, stroke) ----
ICON = {
    "home": '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5.5h4V20"/>',
    "activity": '<polyline points="3 12 7 12 10 5 14 19 17 12 21 12"/>',
    "gauge": '<path d="M4.5 17a8.5 8.5 0 1 1 15 0"/><path d="M12 14.5 15.5 9.5"/><circle cx="12" cy="14.5" r="1.3"/>',
    "heart": '<path d="M12 20.5s-8-4.8-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.2-8 11-8 11z"/>',
    "droplet": '<path d="M12 3.5s6 6.3 6 10.5a6 6 0 0 1-12 0C6 9.8 12 3.5 12 3.5z"/>',
    "thermo": '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/><line x1="12" y1="9" x2="12" y2="15"/>',
    "moon": '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
    "smile": '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5s1.3 2 3.5 2 3.5-2 3.5-2"/><line x1="9" y1="9.5" x2="9.01" y2="9.5"/><line x1="15" y1="9.5" x2="15.01" y2="9.5"/>',
    "book": '<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17H7.5A2.5 2.5 0 0 0 5 21.5z"/><path d="M5 21.5V4.5"/><line x1="9" y1="7" x2="15" y2="7"/>',
    "calendar": '<rect x="4" y="5" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="9" y1="3" x2="9" y2="7"/><line x1="15" y1="3" x2="15" y2="7"/>',
    "trophy": '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a2 2 0 0 0 2 4"/><path d="M16 6h3a2 2 0 0 1-2 4"/><line x1="12" y1="13" x2="12" y2="17"/><path d="M8 21h8"/><line x1="12" y1="17" x2="12" y2="21"/>',
    "shield": '<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    "users": '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 0 1 4.5 5"/>',
    "userplus": '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/>',
    "user": '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    "lock": '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    "radio": '<circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4"/><path d="M4.9 4.9a10 10 0 0 0 0 14.2"/><path d="M19.1 4.9a10 10 0 0 1 0 14.2"/>',
    "alert": '<path d="M12 3.5 2.5 20h19z"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    "checkc": '<circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9"/>',
    "check": '<polyline points="5 12.5 10 17.5 19 7"/>',
    "octagon": '<polygon points="8 2.5 16 2.5 21.5 8 21.5 16 16 21.5 8 21.5 2.5 16 2.5 8"/><line x1="12" y1="7.5" x2="12" y2="13"/><line x1="12" y1="16.5" x2="12.01" y2="16.5"/>',
    "info": '<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    "chevron": '<polyline points="9 6 15 12 9 18"/>',
    "arrowright": '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>',
    "upload": '<path d="M12 16V4"/><polyline points="7 9 12 4 17 9"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
    "image": '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/>',
    "flag": '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3 3 15 0 18"/><path d="M12 3c-3 3-3 15 0 18"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
    "plus": '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    "x": '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
    "ring": '<circle cx="12" cy="14.5" r="5.5"/><path d="M9.5 9.5 10.5 5.5h3l1 4"/>',
    "scale": '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 10a3.5 3.5 0 0 1 7 0"/><line x1="12" y1="10" x2="13.5" y2="8"/>',
    "atom": '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    "send": '<line x1="21" y1="3" x2="10" y2="14"/><polygon points="21 3 14 21 10 14 3 10"/>',
    "star": '<polygon points="12 3 14.8 9 21.5 9.8 16.5 14.4 17.9 21 12 17.6 6.1 21 7.5 14.4 2.5 9.8 9.2 9"/>',
    "flame": '<path d="M12 3c.8 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
    "dumbbell": '<line x1="6.5" y1="7" x2="6.5" y2="17"/><line x1="3.5" y1="9.5" x2="3.5" y2="14.5"/><line x1="17.5" y1="7" x2="17.5" y2="17"/><line x1="20.5" y1="9.5" x2="20.5" y2="14.5"/><line x1="6.5" y1="12" x2="17.5" y2="12"/>',
    "utensils": '<path d="M6 3v7a2 2 0 0 0 4 0V3"/><line x1="8" y1="3" x2="8" y2="21"/><path d="M17 21V3c-2.2 1.2-3.5 3.8-3.5 7.5H17"/>',
    "bed": '<path d="M3 18V7"/><path d="M3 14h18v4"/><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/>',
    "bolt": '<polygon points="13 2 4 14 11 14 10 22 20 9.5 13 9.5"/>',
    "sun": '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="5.3" y1="5.3" x2="7" y2="7"/><line x1="17" y1="17" x2="18.7" y2="18.7"/><line x1="5.3" y1="18.7" x2="7" y2="17"/><line x1="17" y1="7" x2="18.7" y2="5.3"/>',
    "wind": '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
    "door": '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><line x1="3" y1="21" x2="21" y2="21"/><line x1="14" y1="12" x2="14.01" y2="12"/>',
    "list": '<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><line x1="4" y1="6" x2="4.01" y2="6"/><line x1="4" y1="12" x2="4.01" y2="12"/><line x1="4" y1="18" x2="4.01" y2="18"/>',
    "pause": '<line x1="9" y1="5" x2="9" y2="19"/><line x1="15" y1="5" x2="15" y2="19"/>',
    "wifi": '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.7 16a5 5 0 0 1 6.6 0"/><line x1="12" y1="19.5" x2="12.01" y2="19.5"/>',
    "wifioff": '<line x1="3" y1="3" x2="21" y2="21"/><path d="M8.7 16a5 5 0 0 1 6.6 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 4-2.4"/><path d="M13.5 9.6a9.5 9.5 0 0 1 5 2.9"/><path d="M2.5 9a14 14 0 0 1 4.2-2.6"/><line x1="12" y1="19.5" x2="12.01" y2="19.5"/>',
    "refresh": '<path d="M20 11a8 8 0 0 0-14.5-3.5L4 9"/><polyline points="4 4 4 9 9 9"/><path d="M4 13a8 8 0 0 0 14.5 3.5L20 15"/><polyline points="20 20 20 15 15 15"/>',
    "archive": '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12h4"/>',
    "grip": '<circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/>',
    "battery": '<rect x="2.5" y="7" width="17" height="10" rx="2"/><line x1="22" y1="10.5" x2="22" y2="13.5"/><line x1="6" y1="10.5" x2="6" y2="13.5"/><line x1="9.5" y1="10.5" x2="9.5" y2="13.5"/>',
}

def icon(name, size=20, color="currentColor", sw=1.8, style=""):
    return ('<svg width="%d" height="%d" viewBox="0 0 24 24" fill="none" stroke="%s" stroke-width="%s" '
            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none;%s">%s</svg>'
            % (size, size, color, sw, style, ICON[name]))

GLYPH = {
    "ok": '<circle cx="6" cy="6" r="5" fill="%s"/>',
    "warn": '<path d="M6 0.8 11.6 11H0.4z" fill="%s"/>',
    "crit": '<path d="M6 0.4 11.6 6 6 11.6 0.4 6z" fill="%s"/>',
}
STATUS_TXT = {"ok": "Normal", "warn": "Atenção", "crit": "Crítico"}
STATUS_COL = {"ok": "§ok", "warn": "§warn", "crit": "§crit"}
STATUS_ICON = {"ok": "checkc", "warn": "alert", "crit": "octagon"}

def glyph(kind, size=12):
    col = STATUS_COL[kind]
    return ('<svg width="%d" height="%d" viewBox="0 0 12 12" aria-hidden="true" style="flex:none">%s</svg>'
            % (size, size, GLYPH[kind] % col))

def chip(kind, text=None, size=13):
    """Static status chip: shape + color + text (never color alone)."""
    text = text or STATUS_TXT[kind]
    return ('<span style="display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:2px;'
            'font-size:%dpx;font-weight:600;line-height:1.4;color:%s;background:%s;border:1px solid %s">%s%s</span>'
            % (size, STATUS_COL[kind], {"ok": "§okBg", "warn": "§warnBg", "crit": "§critBg"}[kind],
               {"ok": "§okLine", "warn": "§warnLine", "crit": "§critLine"}[kind], glyph(kind, 11), text))

# ---- navigation ----
NAV_MAIN = [
    ("Hoje", "Hoje.dc.html", "home"),
    ("Indicadores", "Indicador.dc.html", "activity"),
    ("Medir agora", "Medicao.dc.html", "gauge"),
    ("Diário de bordo", "Diario.dc.html", "book"),
    ("Rotina e treino", "Rotina.dc.html", "calendar"),
    ("Conquistas", "Conquistas.dc.html", "trophy"),
]
NAV_TEAM = [
    ("Painel do comandante", "Comandante.dc.html", "shield"),
    ("Painel da tripulação", "Publico.dc.html", "users"),
    ("Cadastro de astronauta", "Cadastro.dc.html", "userplus"),
]

IND = [
    ("pa", "Pressão arterial", "gauge"),
    ("fc", "Frequência cardíaca", "heart"),
    ("gl", "Glicose", "droplet"),
    ("tc", "Temperatura", "thermo"),
    ("sn", "Sono", "moon"),
    ("hu", "Humor", "smile"),
]
DEFAULT_SIG = [("pa", "118/76", "ok"), ("fc", "61 bpm", "ok"), ("gl", "96 mg/dL", "ok"),
               ("tc", "36,7 °C", "ok"), ("sn", "6 h 05", "warn"), ("hu", "3/5", "ok")]

def signals(sig=None):
    sig = sig or DEFAULT_SIG
    names = {i: (n, ic) for i, n, ic in IND}
    out = []
    for iid, val, st in sig:
        n, ic = names[iid]
        out.append(
            '<div title="%s: %s, %s" style="display:flex;align-items:center;gap:7px;padding:6px 11px;border-radius:999px;'
            'background:§surface;border:1px solid %s;min-height:34px">%s%s'
            '<span style="font-size:15px;font-weight:600;font-variant-numeric:tabular-nums">%s</span>'
            '<span class="sr-only">%s, %s</span></div>'
            % (n, val, STATUS_TXT[st], {"ok": "§okLine", "warn": "§warnLine", "crit": "§critLine"}[st],
               glyph(st, 11), icon(ic, 17, STATUS_COL[st]), val, n, STATUS_TXT[st]))
    return '<div role="group" aria-label="Barra de sinais" style="display:flex;flex-wrap:wrap;gap:8px">%s</div>' % "".join(out)

def navlink(label, href, ic, active):
    if active:
        st = "background:§surface2;color:§text;font-weight:600"
        extra = ' aria-current="page"'
        icol = "§accent"
    else:
        st = "color:§muted"
        extra = ""
        icol = "currentColor"
    return ('<a class="navlink" href="%s"%s style="display:flex;align-items:center;gap:12px;min-height:44px;padding:8px 12px;'
            'border-radius:10px;font-size:16px;%s">%s<span>%s</span></a>' % (href, extra, st, icon(ic, 20, icol), label))

def sidebar(active):
    main = "".join(navlink(l, h, i, l == active) for l, h, i in NAV_MAIN)
    team = "".join(navlink(l, h, i, l == active) for l, h, i in NAV_TEAM)
    html = '''
<nav aria-label="Navegação do aplicativo" style="flex:1 1 268px;max-width:300px;min-width:236px;background:§side;border-right:1px solid §line"><div style="position:sticky;top:0;height:100vh;max-height:100vh;overflow-y:auto;display:flex;flex-direction:column;gap:22px;padding:22px 16px">
  <div style="display:flex;align-items:center;gap:12px;color:§text">
    <img src="@LOGO" width="44" height="44" alt="Logo do time Vento Norte UEA" style="border-radius:50%;flex:none">
    <span style="display:flex;flex-direction:column;gap:2px"><span style="font-family:§disp;font-size:21px;font-weight:700;line-height:1">Vento Norte Health</span><span style="font-size:13px;color:§subtle">por Vento Norte UEA</span></span>
  </div>
  <button type="button" class="hov" aria-haspopup="dialog" aria-label="Abrir informações da missão" onClick="{{mis.open}}" style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid §line;border-radius:2px;background:§surface;color:§text;text-align:left;width:100%">
    <img src="@PATCH" width="50" height="48" alt="Patch do time Vento Norte UEA" style="flex:none;object-fit:contain">
    <div style="display:flex;flex-direction:column;gap:1px;min-width:0">
      <span style="font-size:12px;color:§subtle">Time</span>
      <span style="font-weight:600;font-size:16px">Vento Norte UEA</span>
      <span style="font-size:13px;color:§muted">Expedição 01</span>
    </div>
    <span style="margin-left:auto;display:flex;color:§subtle">@INFO</span>
  </button>
  <div style="display:flex;flex-direction:column;gap:4px">
    <span style="font-size:12px;color:§subtle;padding:0 12px 4px;letter-spacing:.06em;text-transform:uppercase">Meu dia</span>
    @MAIN
  </div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <span style="font-size:12px;color:§subtle;padding:0 12px 4px;letter-spacing:.06em;text-transform:uppercase">Time</span>
    @TEAM
  </div>
  <div style="margin-top:auto;display:flex;align-items:center;gap:12px;padding:12px;border-radius:2px;background:§surface;border:1px solid §line">
    <span role="img" aria-label="Foto de {{me.name}}" style="flex:none;width:40px;height:40px;border-radius:50%;background-color:§surface2;background-image:url({{me.photo}});background-repeat:no-repeat;background-size:230% auto;background-position:50% 9%"></span>
    <span style="display:flex;flex-direction:column;min-width:0"><span style="font-weight:600;font-size:15px">{{me.name}}</span><span style="font-size:13px;color:§muted">{{me.role}} · visão pessoal</span></span>
  </div>
</div></nav>'''
    return html.replace("@MAIN", main).replace("@TEAM", team).replace("@LOGO", LOGO).replace("@PATCH", PATCH).replace("@INFO", icon("info", 18, "#8AA3BD"))

def topbar(title, sub, right=""):
    return '''
<header style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px 28px;padding:20px 32px;border-bottom:1px solid §line">
  <div style="min-width:0">
    <h1 style="margin:0;font-family:§disp;font-size:32px;font-weight:600;line-height:1.1;text-wrap:balance">%s</h1>
    <div style="margin-top:4px;font-size:16px;color:§muted">%s</div>
  </div>
  %s
</header>''' % (title, sub, right)


MISSION_HTML = '''
<sc-if value="{{mis.isOpen}}" hint-placeholder-val="{{ false }}">
<div onClick="{{mis.close}}" style="position:fixed;inset:0;z-index:60;overflow-y:auto;background:rgba(2,9,18,0.82);display:flex;justify-content:center;align-items:flex-start;padding:56px 24px">
  <div role="dialog" aria-modal="true" aria-labelledby="mis-t" onClick="{{mis.stop}}" style="width:min(720px,100%);background:§bg;border:1px solid §line2;border-radius:2px;display:flex;flex-direction:column">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 20px;border-bottom:1px solid §line">
      <span style="font-size:12px;letter-spacing:.12em;color:§accent;font-weight:600">MISSÃO</span>
      <button type="button" aria-label="Fechar" onClick="{{mis.close}}" style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:2px;border:1px solid §line2;background:transparent;padding:0">@X</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center;padding:28px 24px 8px">
      <img src="@PATCH" width="132" height="127" alt="Patch Zagaia do time Vento Norte UEA, LASC 7" style="flex:none;object-fit:contain">
      <div style="flex:1 1 320px;display:flex;flex-direction:column;gap:8px;min-width:0">
        <h2 id="mis-t" style="margin:0;font-family:§disp;font-size:36px;font-weight:700;line-height:1.05">Vento Norte Health</h2>
        <p style="margin:0;font-size:18px;color:§muted">Um aplicativo para o astronauta medir, entender e agir sobre a própria saúde, mesmo quando a Terra está longe demais para responder.</p>
      </div>
    </div>
    <dl style="margin:0;padding:16px 24px 8px;display:grid;grid-template-columns:max-content 1fr;gap:0 28px;font-size:16px">@FACTS</dl>
    <div style="padding:12px 24px 4px">
      <div style="font-size:12px;letter-spacing:.12em;color:§subtle;font-weight:600;padding-bottom:10px">CINCO RISCOS DO VOO ESPACIAL</div>
      <ul style="list-style:none;margin:0;padding:0;border-top:1px solid §line">@RISKS</ul>
    </div>
    <div style="display:flex;align-items:center;gap:14px;padding:18px 24px 22px;margin-top:8px;border-top:1px solid §line">
      <img src="@LOGO" width="40" height="40" alt="" style="border-radius:50%;flex:none">
      <p style="margin:0;font-size:14px;color:§subtle">Criado pelo time Vento Norte UEA. Protótipo independente para o NASA Space Apps Challenge 2026, sem vínculo oficial com a NASA ou com a AEB. Pessoas, valores e leituras são fictícios.</p>
    </div>
  </div>
</div>
</sc-if>
'''

from crew import CAPTAIN
_FACTS = [("Time", "Vento Norte UEA"), ("Patch", "Zagaia, LASC 7"), ("Desafio", "NASA Space Apps 2026 · AEB · monitoramento de saúde de astronautas"),
          ("Expedição", "Simulada 01 · dia 47"), ("Tripulação", "5 pessoas · comandante " + CAPTAIN["name"]), ("Dados", "Simulados. Nada aqui é uso clínico real")]
_RISKS = [("atom", "Radiação espacial"), ("users", "Isolamento e confinamento"), ("radio", "Distância da Terra"),
          ("globe", "Campos gravitacionais variados"), ("door", "Ambientes fechados e hostis")]

def mission_ui():
    facts = "".join('<dt style="padding:9px 0;color:§subtle;border-bottom:1px solid §line">%s</dt><dd style="margin:0;padding:9px 0;border-bottom:1px solid §line">%s</dd>' % f for f in _FACTS)
    risks = "".join('<li style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid §line">%s<span style="font-size:16px">%s</span></li>' % (icon(i, 20, "§accent"), t) for i, t in _RISKS)
    return MISSION_HTML.replace("@FACTS", facts).replace("@RISKS", risks).replace("@X", icon("x", 18, "#A9BDD2")).replace("@PATCH", PATCH).replace("@LOGO", LOGO)

LINK_HTML = '''
<div style="position:relative;z-index:20">
  <div style="display:flex;align-items:center;justify-content:flex-end;gap:12px;padding:10px 32px 0">
    <button type="button" aria-expanded="{{lk.open}}" aria-controls="lk-panel" onClick="{{lk.toggle}}" style="display:flex;align-items:center;gap:8px;min-height:40px;padding:6px 14px;border-radius:2px;font-size:15px;font-weight:500;color:{{lk.col}};background:{{lk.bg}};border:1px {{lk.bs}} {{lk.bd}}">
      <sc-if value="{{lk.iOn}}" hint-placeholder-val="{{ true }}">@WIFI</sc-if><sc-if value="{{lk.iLag}}" hint-placeholder-val="{{ false }}">@CLOCK</sc-if><sc-if value="{{lk.iOff}}" hint-placeholder-val="{{ false }}">@WOFF</sc-if><sc-if value="{{lk.iSend}}" hint-placeholder-val="{{ false }}">@SPIN</sc-if><sc-if value="{{lk.iWarn}}" hint-placeholder-val="{{ false }}">@ALR</sc-if>
      <span>{{lk.label}}</span>
    </button>
  </div>
  <sc-if value="{{lk.isOpen}}" hint-placeholder-val="{{ false }}">
  <div id="lk-panel" role="dialog" aria-label="Base na Terra" style="position:absolute;right:32px;top:54px;width:min(420px,calc(100% - 64px));background:#071D38;border:1px solid #2F5C8A;border-radius:2px;padding:16px;box-shadow:0 12px 32px rgba(0,0,0,.45)">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><span style="font-size:18px;font-weight:600">Base na Terra</span><button type="button" onClick="{{lk.toggle}}" aria-label="Fechar" style="width:36px;height:36px;border:0;background:transparent;display:flex;align-items:center;justify-content:center;border-radius:2px">@X</button></div>
    <div style="font-size:14px;color:#A9BDD2;margin:2px 0 10px">{{lk.last}}</div>
    <ul style="list-style:none;margin:0;padding:0">
      <sc-for list="{{lk.rows}}" as="r" hint-placeholder-count="3"><li style="display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid #1F4469;font-size:15px"><span>{{r.t}}</span><span style="color:{{r.col}};white-space:nowrap">{{r.s}}</span></li></sc-for>
    </ul>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 14px"><button type="button" class="btn-s" onClick="{{lk.sendNow}}" style="@BTNS;min-height:40px;border-radius:2px;padding:6px 14px">Enviar agora</button></div>
    <div style="border-top:1px solid #1F4469;padding-top:12px"><div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#8AA3BD;margin-bottom:8px">Modo demonstração · estado</div>
      <div role="group" aria-label="Estado da conexão" style="display:flex;flex-wrap:wrap;gap:6px">
        <sc-for list="{{lk.opts}}" as="o" hint-placeholder-count="5"><button type="button" aria-pressed="{{o.on}}" onClick="{{o.pick}}" style="min-height:36px;padding:4px 12px;border-radius:2px;border:1px solid {{o.bd}};background:{{o.bg}};color:#E8F0F8;font-size:14px">{{o.label}}</button></sc-for>
      </div></div>
  </div>
  </sc-if>
</div>'''

def link_ui():
    return (LINK_HTML.replace("@WIFI", icon("wifi", 20)).replace("@CLOCK", icon("clock", 20)).replace("@WOFF", icon("wifioff", 20))
            .replace("@SPIN", icon("refresh", 20).replace('style="flex:none;', 'class="lkspin" style="flex:none;')).replace("@ALR", icon("alert", 20))
            .replace("@X", icon("x", 18, "#A9BDD2")).replace("@BTNS", BTN_S))

def shell(active, header, body, min_h=900):
    """App shell: sidebar + (header + body). `header` is html for the top bar."""
    return ('<div style="position:relative;display:flex;flex-wrap:wrap;min-height:%dpx;background:§bg;color:§text;font-family:§body;font-size:16px;line-height:1.45">'
            '%s<main style="flex:999 1 560px;min-width:0;display:flex;flex-direction:column">%s%s%s</main></div>'
            % (min_h, sidebar(active), link_ui(), header, body)).replace('</main></div>', '</main>' + mission_ui() + '</div>', 1)

FONT_LINK = '<link rel="stylesheet" href="fonts/fonts.css">' if TARGET == "electron" else ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
             '<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&amp;display=swap" rel="stylesheet">')

BASE_CSS = '''
body{margin:0;background:#06182E;color:#E8F0F8}
*,*::before,*::after{box-sizing:border-box}
a{color:#62C3FF;text-decoration:none}
a:hover{color:#8AD3FF}
button,input,select,textarea{font:inherit;color:inherit}
button{cursor:pointer}
:focus-visible{outline:2px solid #62C3FF;outline-offset:2px}
.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.navlink:not([aria-current]):hover{background:#0C2442!important;color:#E8F0F8!important}
.btn-p:hover{background:#8AD3FF!important;color:#04162B!important}
.btn-s:hover{background:#0C2442!important;color:#E8F0F8!important}
.hov:hover{border-color:#62C3FF!important}
input::placeholder,textarea::placeholder{color:#8AA3BD}
.pick:has(input:focus-visible){outline:2px solid #62C3FF;outline-offset:2px}
.pick:has(input:checked){border-color:#62C3FF;background:#0F2E52}
@keyframes lkspin{to{transform:rotate(360deg)}}
.lkspin{animation:lkspin 1.2s linear infinite}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}}
'''

FLD = ("width:100%;min-height:44px;padding:10px 12px;border-radius:10px;border:1px solid §line2;"
       "background:§field;color:§text;font-size:16px;font-family:inherit")
BTN_P = ("display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:10px 20px;border-radius:10px;"
         "border:0;background:§accent;color:§accentInk;font-weight:600;font-size:16px;font-family:inherit")
BTN_S = ("display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:10px 18px;border-radius:10px;"
         "border:1px solid §line2;background:transparent;color:§text;font-weight:500;font-size:16px;font-family:inherit")
CARD = "background:§surface;border:1px solid §line;border-radius:4px"

def page(title, body, script, h, w=1280, helmet_extra=""):
    props = json.dumps({"$preview": {"width": w, "height": h}}, ensure_ascii=False)
    html = '''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>@TITLE</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
@FONT
<style>
@CSS
</style>
</helmet>
@BODY
</x-dc>
<script type="text/x-dc" data-dc-script data-props='@PROPS'>
@SCRIPT
</script>
</body>
</html>
'''
    html = (html.replace("@TITLE", title).replace("@FONT", FONT_LINK).replace("@CSS", BASE_CSS + helmet_extra)
            .replace("@PROPS", props).replace("@SCRIPT", script).replace("@BODY", T(body)))
    return html

def write(name, html):
    os.makedirs(OUT, exist_ok=True)
    if TARGET == "electron":
        m = re.search(r'<script type="text/x-dc"[^>]*>\n(.*?)\n</script>', html, re.S)
        base = name.replace(".dc.html", "")
        with open(os.path.join(OUT, base + ".logic.js"), "w", encoding="utf-8") as f:
            f.write("window.__dcDefine(function (DCLogic) {\n" + m.group(1) + "\nreturn Component;\n});\n")
        csp = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data:; font-src \'self\'; object-src \'none\'; base-uri \'none\'">'
        html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + csp, 1)
        html = re.sub(r'<title>(.*?)</title>', lambda t: '<title>Vento Norte Health · %s</title>' % t.group(1), html, count=1)
        html = html.replace('<x-dc>', '<template id="dc-tpl"><x-dc>', 1).replace('</x-dc>', '</x-dc></template>', 1)
        html = html.replace(m.group(0), '<script src="%s.logic.js"></script>' % base).replace('<script src="./support.js"></script>', '<script src="support.js"></script>')
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(html)
    return os.path.join(OUT, name)

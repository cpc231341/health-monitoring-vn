from common import *
from crew import CREW
SEX = {"f": ('<circle cx="12" cy="9" r="5"/><line x1="12" y1="14" x2="12" y2="22"/><line x1="8.5" y1="18" x2="15.5" y2="18"/>', "Feminino", "#FF8FC7"),
       "m": ('<circle cx="10" cy="14" r="5"/><line x1="14" y1="10" x2="20" y2="4"/><polyline points="14 4 20 4 20 10"/>', "Masculino", "#62C3FF")}

def card(c):
    path, sexname, scol = SEX[c["sex"]]
    name, role, cap = c["name"], c["role"], c["captain"]
    tag = ('<span style="position:absolute;top:10px;left:10px;display:inline-flex;align-items:center;gap:6px;padding:4px 9px;background:#FFC24B;color:#04162B;border-radius:2px;font-family:§mono;font-size:11px;font-weight:600;letter-spacing:.12em">%s CAPITÃO</span>' % icon("star", 13, "#04162B", 2.2)) if cap else ""
    bd = "#FFC24B" if cap else "#1F4469"
    return '''
<a class="hov" href="Hoje.dc.html" onClick="{{pick.%s}}" aria-label="%s, %s%s, %s" style="flex:1 1 170px;max-width:%dpx;min-width:150px;overflow:hidden;border-radius:2px;border:1px solid %s;background:#071426;color:#E8F0F8;display:flex;flex-direction:column;position:relative">
  <div style="position:relative;background:radial-gradient(ellipse at 50%% 38%%,#12355E 0%%,#0A2142 55%%,#071426 100%%)"><img src="%s" alt="" style="display:block;width:100%%;aspect-ratio:3/4;object-fit:contain;object-position:center bottom">%s</div>
  <span style="display:flex;align-items:stretch;justify-content:space-between;gap:8px;padding:14px;flex:1">
    <span style="display:flex;flex-direction:column;gap:3px;min-width:0"><span style="font-size:18px;font-weight:600;line-height:1.25">%s</span><span style="font-size:15px;color:§muted">%s</span></span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%s" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="%s" style="flex:none;align-self:flex-end">%s</svg>
  </span>
</a>''' % (c["key"], name, role, ", capitão" if cap else "", sexname, 230 if cap else 210, bd, asset("crew/" + c["slug"]), tag, name, role, scol, sexname, path)

def build():
    cards = "".join(card(c) for c in CREW)
    body = '''
<div style="min-height:900px;background:#030D1A;color:§text;font-family:§body;font-size:16px;line-height:1.45;display:flex;flex-direction:column">
  <header style="display:flex;align-items:center;gap:14px;padding:0 24px;height:72px;font-family:§mono;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:§muted">
    <img src="@LOGO" width="40" height="40" alt="Logo do time Vento Norte UEA" style="border-radius:50%">
    <span style="color:§text;font-size:20px;letter-spacing:.14em">Vento Norte Health</span>
  </header>
  <main style="flex:1;display:flex;justify-content:center;padding:48px 32px 64px">
    <div style="width:100%;max-width:1100px;display:flex;flex-direction:column;gap:28px">
      <a href="Equipe.dc.html" style="display:inline-flex;align-items:center;gap:8px;min-height:44px;font-size:16px;width:fit-content;font-family:§mono;font-size:12px;letter-spacing:.1em;text-transform:uppercase"><span style="transform:rotate(180deg);display:flex">@CHEV</span>Trocar de time</a>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:20px;justify-content:space-between">
        <div style="display:flex;flex-direction:column;gap:8px">
          <h1 style="margin:0;font-family:§mono;font-size:15px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.2">Quem é você?</h1>
        </div>
        <div style="display:flex;align-items:center;gap:14px;padding:10px 16px;border:1px solid §line;border-radius:2px;background:transparent">
          <img src="@PATCH" width="48" height="46" alt="Patch do time Zagaia" style="object-fit:contain"><span style="display:flex;flex-direction:column"><span style="font-family:§mono;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:§subtle">Time</span><span style="font-size:16px;font-weight:600;line-height:1.2">Zagaia</span></span>
        </div>
      </div>
      <div role="group" aria-label="Tripulantes do time Zagaia" style="display:flex;flex-wrap:wrap;gap:18px;align-items:stretch;">@CARDS</div>
      <p style="margin:0;font-family:§mono;font-size:11px;letter-spacing:.08em;color:§subtle">FUNÇÕES DE BORDO DEFINIDAS PARA A SIMULAÇÃO</p>
    </div>
  </main>
</div>'''
    body = body.replace("@CARDS", cards).replace("@LOGO", LOGO).replace("@PATCH", PATCH).replace("@BTNP", BTN_P)\
        .replace("@CHEV", icon("chevron", 20, "#62C3FF", 2)).replace("@ARR", icon("arrowright", 20, "#04162B", 2.2))
    script = r'''class Component extends DCLogic {
  constructor(props) { super(props); this.state = {}; }
  pickUser(k) { return () => { try { localStorage.setItem('vn.user', k); } catch (e) { /* sem armazenamento: usa o primeiro tripulante */ } }; }
  renderVals() {
    const p = {};
    ['c0', 'c1', 'c2', 'c3', 'c4'].forEach((k) => { p[k] = this.pickUser(k); });
    return { pick: p };
  }
}'''
    return page("Quem é você?", body, script, h=760)

from common import *

def build():
    chev = icon("chevron", 22, "§muted", 2, "transform:{{chevRot}}")
    body = '''
<div style="min-height:900px;background:#030D1A;color:§text;font-family:§body;font-size:16px;line-height:1.45;display:flex;flex-direction:column">
  <header style="display:flex;align-items:center;gap:14px;padding:0 24px;height:72px;font-family:§mono;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:§muted">
    <img src="@LOGO" width="40" height="40" alt="Logo do time Vento Norte UEA" style="border-radius:50%">
    <span style="color:§text;font-size:20px;letter-spacing:.14em">Vento Norte Health</span>
  </header>
  <main style="flex:1;display:flex;justify-content:center;padding:56px 24px 64px" onKeyDown="{{onKey}}">
    <div style="width:100%;max-width:640px;display:flex;flex-direction:column;gap:28px">
      <div style="display:flex;flex-direction:column;gap:8px">
        <h1 style="margin:0;font-family:§mono;font-size:15px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.2">Selecionar time</h1>
      </div>
      <div style="position:relative">
        <label id="dd-l" for="dd" style="display:block;font-family:§mono;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:§subtle;margin-bottom:8px">Time</label>
        <button id="dd" type="button" aria-haspopup="listbox" aria-expanded="{{open}}" aria-labelledby="dd-l dd" onClick="{{toggle}}" class="hov" style="width:100%;min-height:76px;display:flex;align-items:center;gap:16px;padding:10px 16px;border-radius:2px;border:1px solid §line2;background:transparent;text-align:left">
          <sc-if value="{{has}}" hint-placeholder-val="{{ true }}"><img src="@PATCH" width="56" height="54" alt="" style="flex:none;object-fit:contain"><span style="flex:1;display:flex;flex-direction:column;min-width:0"><span style="font-size:20px;font-weight:600;line-height:1.2">Zagaia</span><span style="font-size:15px;color:§muted">Vento Norte UEA · LASC 7</span></span></sc-if>
          <sc-if value="{{none}}" hint-placeholder-val="{{ false }}"><span style="flex:1;font-size:18px;color:§muted">Escolha um time</span></sc-if>
          @CHEV
        </button>
        <sc-if value="{{isOpen}}" hint-placeholder-val="{{ false }}">
          <div role="listbox" aria-label="Times" style="position:absolute;left:0;right:0;top:100%;margin-top:8px;z-index:5;border-radius:2px;border:1px solid §line2;background:#071D38;padding:4px;box-shadow:0 12px 32px rgba(0,0,0,.4)">
            <a role="option" aria-selected="false" href="Tripulantes.dc.html" class="hov" style="width:100%;min-height:76px;display:flex;align-items:center;gap:16px;padding:8px 12px;border-radius:2px;border:1px solid transparent;background:transparent;text-align:left;color:#E8F0F8">
              <img src="@PATCH" width="56" height="54" alt="" style="flex:none;object-fit:contain"><span style="flex:1;display:flex;flex-direction:column"><span style="font-size:18px;font-weight:600;line-height:1.2">Zagaia</span><span style="font-size:15px;color:§muted">Vento Norte UEA · LASC 7 · 5 tripulantes</span></span>
            </a>
            <button type="button" role="option" aria-selected="false" onClick="{{newTeam}}" class="hov" style="width:100%;min-height:64px;display:flex;align-items:center;gap:16px;padding:8px 12px;border-radius:2px;border:1px solid transparent;background:transparent;text-align:left;margin-top:4px">
              <span aria-hidden="true" style="flex:none;width:56px;height:54px;display:flex;align-items:center;justify-content:center;border:1.5px dashed #2F5C8A;border-radius:2px">@PLUS</span><span style="font-size:20px;font-weight:600">Novo time</span>
            </button>
          </div>
        </sc-if>
      </div>
      <div role="status" aria-live="polite" style="min-height:24px;color:§muted;font-size:15px">{{msg}}</div>
    </div>
  </main>
</div>'''
    body = body.replace("@LOGO", LOGO).replace("@PATCH", PATCH).replace("@PLUS", icon("plus", 24, "§accent")).replace("@CHEV", chev).replace("@CARD", CARD)\
        .replace("@BTNP", BTN_P).replace("@ARR", icon("arrowright", 20, "#04162B", 2.2))
    script = r'''class Component extends DCLogic {
  constructor(props) { super(props); this.state = { open: false, sel: false, went: false }; }
  renderVals() {
    const s = this.state;
    return {
      open: s.open ? 'true' : 'false', isOpen: s.open, has: s.sel, none: !s.sel,
      chevRot: s.open ? 'rotate(-90deg)' : 'rotate(90deg)',
      toggle: () => this.setState({ open: !this.state.open }),
      pick: () => this.setState({ sel: true, open: false, went: false }),
      onKey: (e) => { if (e.key === 'Escape' && this.state.open) { this.setState({ open: false }); } },
      go: () => this.setState({ went: true }),
      newTeam: () => this.setState({ open: false, msg2: true }),
      msg: s.msg2 ? 'Novo time: o cadastro do time fica para uma próxima tela.' : !s.sel ? 'Selecione um time para continuar.' : (s.went ? 'Time Zagaia confirmado. A próxima tela é a escolha do astronauta.' : '')
    };
  }
}'''
    helmet = "button:disabled{opacity:.45;cursor:not-allowed}\n"
    return page("Selecionar time", body, script, h=900, helmet_extra=helmet)

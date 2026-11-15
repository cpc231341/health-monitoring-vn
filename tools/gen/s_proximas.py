# Telas ainda não construídas: mantêm a barra lateral funcionando em vez de abrir uma página em branco.
from common import *
from dyn import *

STUBS = {
    "Medicao": ("Medir agora", "gauge", "Registro de uma medida manual (pressão, glicose, temperatura) ou leitura do anel, com a faixa de cada indicador."),
    "Diario": ("Diário de bordo", "book", "Anotações de humor, sintomas e eventos do dia, que seguem no relatório enviado à base."),
    "Rotina": ("Rotina e treino", "calendar", "Treino, descanso e agenda do dia, ajustados ao sono e à recuperação de cada pessoa."),
    "Conquistas": ("Conquistas", "trophy", "Metas pessoais e do time para manter bons hábitos a bordo."),
    "Comandante": ("Painel do comandante", "shield", "Estado de cada tripulante, sem valores pessoais, para decidir junto com o time."),
    "Cadastro": ("Cadastro de astronauta", "userplus", "Adicionar ou editar as pessoas do time."),
}

def make(key):
    title, ic, desc = STUBS[key]
    def build():
        header = topbar(title, "Time Zagaia")
        body = ('''
<div style="flex:1;display:flex;align-items:center;justify-content:center;padding:48px 32px">
  <div style="max-width:520px;display:flex;flex-direction:column;align-items:flex-start;gap:16px">
    <span style="display:flex;width:56px;height:56px;align-items:center;justify-content:center;border:1px solid §line2;border-radius:2px">@IC</span>
    <h2 style="margin:0;font-family:§disp;font-size:26px;font-weight:600">Esta tela ainda não foi construída</h2>
    <p style="margin:0;font-size:17px;color:§muted">@DESC</p>
    <a class="hov" href="Hoje.dc.html" style="display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:2px;background:§accent;color:§accentInk;font-weight:600;font-size:16px">Voltar ao Hoje</a>
  </div>
</div>''').replace("@IC", icon(ic, 26, "§accent")).replace("@DESC", desc)
        script = '''class Component extends DCLogic {
  constructor(props) { super(props); this.state = {}; }
''' + JS_LINK + JS_MISSION + '''
  renderVals() { return Object.assign({}, this.linkVals(), this.misVals()); }
}'''
        return page(title, shell(title, header, body, 900), script, h=900)
    return build

for _k in STUBS:
    globals()["build_" + _k] = make(_k)

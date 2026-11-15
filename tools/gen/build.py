import sys, importlib, os
sys.path.insert(0, os.path.dirname(__file__))
from common import write

SCREENS = {
    "Equipe": "s_equipe",
    "Tripulantes": "s_tripulantes",
    "Hoje": "s_hoje",
    "Indicador": "s_indicador",
    "Publico": "s_publico",
    "Medicao": "s_proximas:build_Medicao",
    "Diario": "s_proximas:build_Diario",
    "Rotina": "s_proximas:build_Rotina",
    "Conquistas": "s_proximas:build_Conquistas",
    "Comandante": "s_proximas:build_Comandante",
    "Cadastro": "s_proximas:build_Cadastro",
}

if __name__ == "__main__":
    names = sys.argv[1:] or list(SCREENS)
    for n in names:
        mod_name, _, fn = SCREENS[n].partition(":")
        html = getattr(importlib.import_module(mod_name), fn or "build")()
        p = write(n + ".dc.html", html)
        print("wrote", p, len(html), "bytes")

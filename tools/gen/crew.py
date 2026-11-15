# Tripulação do time Zagaia (Vento Norte UEA). Papéis e quem é capitão são provisórios: edite aqui.
import json

CREW = [
    dict(key="c0", slug="cristiano", name="Cristiano Peniche", first="Cristiano", role="Engenheiro de voo", sex="m", captain=False,
         activity="Experimento de materiais", until=""),
    dict(key="c1", slug="luis-felipe", name="Luis Felipe", first="Luis Felipe", role="Especialista de missão", sex="m", captain=False,
         activity="Treino de resistência", until=""),
    dict(key="c2", slug="mike", name="Mike", first="Mike", role="Comandante", sex="m", captain=True,
         activity="Reunião com a base", until="até 09:30"),
    dict(key="c3", slug="ruan", name="Ruan", first="Ruan", role="Piloto", sex="m", captain=False,
         activity="Atividade extraveicular", until="volta 15:30"),
    dict(key="c4", slug="rita", name="Rita de Cássia", first="Rita", role="Médica de bordo", sex="f", captain=False,
         activity="Manutenção do filtro de ar", until=""),
]
for c in CREW:
    parts = c["name"].split()
    c["ini"] = (parts[0][0] + (parts[-1][0] if len(parts) > 1 else parts[0][1])).upper()
CAPTAIN = [c for c in CREW if c["captain"]][0]

def crew_json(photo):
    return json.dumps([dict(key=c["key"], name=c["name"], first=c["first"], role=c["role"], ini=c["ini"], photo=photo(c["slug"])) for c in CREW], ensure_ascii=False)

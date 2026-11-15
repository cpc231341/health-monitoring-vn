from common import *
from dyn import *
import json
from data_series import build_series, build_waves

H2 = "margin:0;font-family:§disp;font-size:26px;font-weight:600;line-height:1.15"

TABS = [
    ("pa", "Pressão arterial", "gauge"),
    ("fc", "Frequência cardíaca", "heart"),
    ("gl", "Glicose", "droplet"),
    ("tc", "Temperatura", "thermo"),
    ("sn", "Sono", "moon"),
    ("hu", "Humor", "smile"),
]


def tab(k, name, ic):
    return '''
<button type="button" class="hov" onClick="{{tabs.%%K%%.pick}}" aria-pressed="{{tabs.%%K%%.on}}" style="display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;gap:10px;min-width:0;padding:12px 14px;border-radius:12px;border:1px solid {{tabs.%%K%%.tbd}};background:{{tabs.%%K%%.tbg}};box-shadow:{{tabs.%%K%%.tsh}};color:#E8F0F8;text-align:left">
  <span style="display:flex;align-items:center;gap:8px;font-size:15px;color:§muted;line-height:1.25">%%ICON%%<span>%%NAME%%</span></span>
  <span style="display:flex;align-items:center;gap:8px"><span style="font-family:§disp;font-size:26px;font-weight:600;line-height:1;font-variant-numeric:tabular-nums">{{tabs.%%K%%.val}}</span>%%GLYPH%%<span class="sr-only">{{tabs.%%K%%.status}}</span></span>
</button>'''.replace("%%K%%", k).replace("%%ICON%%", icon(ic, 18, "§accent")).replace("%%NAME%%", name)\
        .replace("%%GLYPH%%", dglyph("tabs." + k))


def build():
    tabs = "".join(tab(*t) for t in TABS)
    ser = build_series()
    waves = build_waves()

    header = topbar(
        "Indicadores",
        "Tendência, o que significa e o que fazer, um indicador por vez.",
        '<div style="display:flex;align-items:center;gap:10px;color:§muted;font-size:15px">%s<span>Anel sincronizado há 4 min</span></div>' % icon("radio", 20, "§accent"))

    chart = '''
<section aria-labelledby="chh" style="@CARD;padding:20px 22px;display:flex;flex-direction:column;gap:16px;min-width:0">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 18px">
    <div style="min-width:0"><h2 id="chh" style="@H2">{{c.title}}</h2><div style="font-size:15px;color:§muted;margin-top:2px">{{c.sub}}</div></div>
    <div role="group" aria-label="Período" style="display:flex;gap:4px;padding:4px;border-radius:12px;background:§field;border:1px solid §line">
      <sc-for list="{{rangeBtns}}" as="b" hint-placeholder-count="3"><button type="button" aria-pressed="{{b.on}}" onClick="{{b.pick}}" style="min-height:40px;padding:6px 14px;border-radius:9px;border:0;background:{{b.bg}};color:{{b.fg}};font-weight:600;font-size:15px">{{b.label}}</button></sc-for>
    </div>
  </div>
  <div role="img" aria-label="{{c.alt}}" style="position:relative;height:260px;margin:14px 14px 0 56px">
    <sc-for list="{{c.grid}}" as="g" hint-placeholder-count="5">
      <div aria-hidden="true" style="position:absolute;left:0;right:0;top:{{g.top}}%;height:0;border-top:1px solid #1F4469"></div>
      <span aria-hidden="true" style="position:absolute;right:100%;top:{{g.top}}%;transform:translateY(-50%);padding-right:10px;font-family:§mono;font-size:13px;color:§muted;white-space:nowrap">{{g.label}}</span>
    </sc-for>
    <sc-for list="{{c.bands}}" as="b" hint-placeholder-count="1">
      <div aria-hidden="true" style="position:absolute;left:0;right:0;top:{{b.top}}%;height:{{b.h}}%;background:rgba(70,211,154,0.10);border-top:1px dashed rgba(70,211,154,0.55);border-bottom:1px dashed rgba(70,211,154,0.55)"></div>
      <span aria-hidden="true" style="position:absolute;{{b.side}};top:{{b.ly}}%;transform:{{b.tf}};padding:2px 6px;font-size:13px;color:#46D39A;white-space:nowrap">{{b.label}}</span>
    </sc-for>
    <sc-if value="{{c.isLine}}" hint-placeholder-val="{{ false }}">
      <svg viewBox="0 0 600 260" preserveAspectRatio="none" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible">
        <polygon points="{{c.areaA}}" fill="#62C3FF" fill-opacity="0.08"/>
        <polyline points="{{c.lineA}}" fill="none" stroke="#62C3FF" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
        <polyline points="{{c.lineB}}" fill="none" stroke="#A9BDD2" stroke-width="2.5" stroke-dasharray="7 5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
        <path d="{{c.dotsA}}" fill="none" stroke="#62C3FF" stroke-width="7" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
        <path d="{{c.dotsB}}" fill="none" stroke="#A9BDD2" stroke-width="7" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
        <path d="{{c.dotsW}}" fill="none" stroke="#FFC24B" stroke-width="9" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
        <path d="{{c.dotsC}}" fill="none" stroke="#FF7B7B" stroke-width="9" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
      </svg>
    </sc-if>
    <sc-if value="{{c.isBars}}" hint-placeholder-val="{{ true }}">
      <div aria-hidden="true" style="position:absolute;inset:0;display:flex;align-items:stretch;gap:{{c.gap}}px">
        <sc-for list="{{c.bars}}" as="b" hint-placeholder-count="7">
          <div style="flex:1 1 0;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:4px">
            <span style="font-family:§mono;font-size:13px;line-height:17px;color:{{b.tc}};font-variant-numeric:tabular-nums">{{b.label}}</span>
            <div style="width:100%;height:{{b.h}}%;border-radius:5px 5px 0 0;background:{{b.bg}}"></div>
          </div>
        </sc-for>
      </div>
    </sc-if>
    <sc-for list="{{c.marks}}" as="m" hint-placeholder-count="1">
      <span aria-hidden="true" style="position:absolute;left:100%;top:{{m.top}}%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:{{m.col}};border:3px solid #0C2442;box-shadow:0 0 0 2px {{m.col}}"></span>
    </sc-for>
  </div>
  <div aria-hidden="true" style="position:relative;height:20px;margin:0 14px 0 56px">
    <sc-for list="{{c.xl}}" as="x" hint-placeholder-count="5"><span style="position:absolute;left:{{x.left}}%;top:0;transform:translateX(-50%);font-family:§mono;font-size:13px;color:§muted;white-space:nowrap">{{x.text}}</span></sc-for>
  </div>
  <ul aria-label="Legenda" style="list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px 20px">
    <sc-for list="{{c.legend}}" as="l" hint-placeholder-count="4"><li style="display:flex;align-items:center;gap:8px;font-size:14px;color:§muted"><span aria-hidden="true" style="flex:none;{{l.sw}}"></span>{{l.label}}</li></sc-for>
  </ul>
  <dl style="margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(112px,100%),1fr));gap:12px">
    <sc-for list="{{c.stats}}" as="s" hint-placeholder-count="4"><div style="padding:12px 12px;border-radius:10px;background:§field;border:1px solid §line;min-width:0"><dt style="font-size:14px;color:§muted">{{s.k}}</dt><dd style="margin:2px 0 0;font-family:§disp;font-size:24px;font-weight:600;line-height:1.2;font-variant-numeric:tabular-nums;white-space:nowrap">{{s.v}}</dd></div></sc-for>
  </dl>
</section>'''.replace("@CARD", CARD).replace("@H2", H2)

    wave_card = '''
<sc-if value="{{c.hasWave}}" hint-placeholder-val="{{ false }}">
<section aria-labelledby="wvh" style="@CARD;padding:20px 22px;display:flex;flex-direction:column;gap:14px;min-width:0">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 16px">
    <h2 id="wvh" style="@H2">Forma de onda do anel</h2>
    <span style="font-family:§mono;font-size:12px;letter-spacing:.08em;padding:3px 10px;border-radius:999px;border:1px dashed §line2;color:§muted">SIMULADO</span>
  </div>
  <div>
    <div style="font-size:15px;color:§muted;margin-bottom:6px">Pulso (PPG), 6 segundos</div>
    <svg viewBox="0 0 600 70" preserveAspectRatio="none" role="img" aria-label="Onda de pulso simulada, com batimentos regulares" style="display:block;width:100%;height:70px;border-radius:8px;background-color:#071D38;background-image:linear-gradient(#12365C 1px,transparent 1px),linear-gradient(90deg,#12365C 1px,transparent 1px);background-size:20px 20px">
      <path d="@PPG" fill="none" stroke="#62C3FF" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    </svg>
  </div>
  <div>
    <div style="font-size:15px;color:§muted;margin-bottom:6px">Eletrocardiograma (ECG), 6 segundos</div>
    <svg viewBox="0 0 600 70" preserveAspectRatio="none" role="img" aria-label="Traçado de ECG simulado, com complexos QRS regulares" style="display:block;width:100%;height:70px;border-radius:8px;background-color:#071D38;background-image:linear-gradient(#12365C 1px,transparent 1px),linear-gradient(90deg,#12365C 1px,transparent 1px);background-size:20px 20px">
      <path d="@ECG" fill="none" stroke="#46D39A" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    </svg>
  </div>
  <p style="margin:0;font-size:14px;color:§subtle">Sinais gerados por simulação para a demonstração. O anel mede o pulso (PPG); o ECG viria de um sensor adicional, ainda a definir.</p>
</section>
</sc-if>'''.replace("@CARD", CARD).replace("@H2", H2).replace("@PPG", waves["ppg"]).replace("@ECG", waves["ecg"])

    how_card = '''
<section aria-labelledby="hwh" style="@CARD;padding:20px 22px;display:flex;flex-direction:column;gap:14px;min-width:0">
  <h2 id="hwh" style="@H2">Como medir</h2>
  <ol style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px">
    <sc-for list="{{c.how}}" as="h" hint-placeholder-count="4"><li style="display:flex;gap:14px;align-items:flex-start"><span aria-hidden="true" style="flex:none;width:32px;height:32px;border-radius:50%;background:#133559;color:#62C3FF;display:flex;align-items:center;justify-content:center;font-family:'Source Sans 3',sans-serif;font-size:15px;font-weight:500">{{h.n}}</span><span style="font-size:17px;padding-top:3px;min-width:0">{{h.t}}</span></li></sc-for>
  </ol>
</section>'''.replace("@CARD", CARD).replace("@H2", H2)

    now_card = '''
<section aria-labelledby="nwh" style="@CARD;padding:20px 22px;display:flex;flex-direction:column;gap:14px;min-width:0">
  <h2 id="nwh" style="margin:0;font-size:16px;font-weight:500;color:§muted">Último valor</h2>
  <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><span style="font-family:§disp;font-size:66px;font-weight:600;line-height:1;font-variant-numeric:tabular-nums">{{c.value}}</span><span style="color:§muted;font-size:18px">{{c.unit}}</span></div>
  <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px">@CHIP<span style="font-size:15px;color:§subtle">{{c.src}} · {{c.when}}</span></div>
  <p style="margin:0;font-size:17px">{{c.nowText}}</p>
  <dl style="margin:0;display:grid;grid-template-columns:minmax(120px,max-content) minmax(0,1fr);gap:10px 18px;padding-top:14px;border-top:1px solid §line">
    <dt style="color:§muted">Faixa normal</dt><dd style="margin:0;font-weight:600">{{c.range}}</dd>
    <dt style="color:§muted">Sua linha de base</dt><dd style="margin:0;font-weight:600">{{c.base}}</dd>
  </dl>
</section>'''.replace("@CARD", CARD).replace("@CHIP", dchip("c.now", 15))

    act_card = '''
<section aria-labelledby="doh" style="@CARD;padding:20px 22px;display:flex;flex-direction:column;gap:14px;min-width:0">
  <h2 id="doh" style="@H2">O que fazer</h2>
  <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px">
    <sc-for list="{{c.acts}}" as="a" hint-placeholder-count="3">
      <li aria-current="{{a.cur}}" style="padding:14px 16px;border-radius:12px;border:1px solid {{a.line}};background:{{a.fill}};display:flex;flex-direction:column;gap:8px;min-width:0">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 12px">@ACHIP<span style="font-size:14px;color:§muted">{{a.rule}}</span></div>
        <div style="font-size:16px;color:{{a.tcol}}">{{a.text}}</div>
        <div style="font-size:14px;font-weight:600;color:§accent">{{a.here}}</div>
      </li>
    </sc-for>
  </ul>
</section>'''.replace("@CARD", CARD).replace("@H2", H2).replace("@ACHIP", dchip("a", 14))

    why_card = '''
<section aria-labelledby="wyh" style="@CARD;padding:20px 22px;display:flex;flex-direction:column;gap:12px;min-width:0">
  <h2 id="wyh" style="@H2">Por que importa</h2>
  <p style="margin:0;font-size:16px">{{c.why1}}</p>
  <p style="margin:0;font-size:16px;color:§muted">{{c.why2}}</p>
</section>'''.replace("@CARD", CARD).replace("@H2", H2)

    cta = '''
<a class="btn-p" href="{{c.ctaHref}}" style="@BTNP;width:100%">{{c.ctaLabel}}@ARROW</a>'''.replace("@BTNP", BTN_P).replace("@ARROW", icon("arrowright", 18, "#04162B", 2.2))

    body = '''
<div style="padding:22px 32px 0">
  <div role="group" aria-label="Escolha o indicador" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(140px,100%),1fr));gap:10px">@TABS</div>
</div>
<div style="padding:20px 32px 48px;display:flex;flex-direction:column;gap:20px">
  <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start">
    <div style="flex:5 1 520px;min-width:0;display:flex;flex-direction:column;gap:20px">@CHART@WAVE@HOW@WHYL</div>
    <div style="flex:3 1 340px;min-width:0;display:flex;flex-direction:column;gap:20px">@NOW@ACT@WHYR@CTA</div>
  </div>
  <p style="margin:0;display:flex;gap:10px;align-items:flex-start;font-size:14px;color:§subtle">@INFO<span>Faixas, limites e orientações são ilustrativos e precisam ser validados pelo time médico da missão antes de qualquer uso real. O aplicativo não faz diagnóstico.</span></p>
</div>'''.replace("@TABS", tabs).replace("@CHART", chart).replace("@WAVE", wave_card).replace("@HOW", how_card)\
        .replace("@NOW", now_card).replace("@ACT", act_card).replace("@WHYL", '<sc-if value="{{c.whyLeft}}" hint-placeholder-val="{{ true }}">' + why_card + '</sc-if>')\
        .replace("@WHYR", '<sc-if value="{{c.whyRight}}" hint-placeholder-val="{{ false }}">' + why_card.replace('id="wyh"', 'id="wyh2"').replace('aria-labelledby="wyh"', 'aria-labelledby="wyh2"') + '</sc-if>').replace("@CTA", cta)\
        .replace("@INFO", icon("info", 18, "§subtle", 1.8, "margin-top:1px"))

    html_body = shell("Indicadores", header, body, 1200)

    script = r'''class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { id: 'sn', range: '7d' };
  }
''' + JS_STATUS + JS_LINK + JS_MISSION + r'''
  SER() {
    return @SER;
  }
  CFG() {
    return {
      pa: {
        name: 'Pressão arterial', unit: 'mmHg', axis: 'mmHg', src: 'Manual', when: 'ontem 19:40', ranges: ['7d', '30d'], mode: 'line', dual: true, manual: true,
        lo: 60, hi: 140, ticks: [60, 80, 100, 120, 140], bands: [{ lo: 90, hi: 119, label: 'Sistólica normal' }, { lo: 60, hi: 79, label: 'Diastólica normal' }],
        range: '90–119 / 60–79', base: '116/75', per: 'uma medição por dia',
        msg: { ok: 'Dentro da faixa normal.', warn: 'Fora da faixa normal. Repita a medição com calma.', crit: 'Fora do limite seguro. Confirme e avise o comandante.' },
        why: ['A pressão mostra o esforço do coração para bombear o sangue. Na microgravidade, os líquidos do corpo se deslocam para cima, e isso pode mexer com a pressão.', 'Uma medição isolada diz pouco. O que importa é a tendência ao longo dos dias.'],
        how: ['Sente-se com as costas apoiadas e os pés firmes. Na estação, prenda os pés no apoio.', 'Descanse por 5 minutos, em silêncio.', 'Coloque o manguito no braço, na altura do coração.', 'Meça 2 vezes, com 1 minuto de intervalo. O app guarda a média.'],
        acts: [
          ['90–119 / 60–79', 'Siga a rotina e meça de novo amanhã, no mesmo horário.'],
          ['120–139 / 80–89, ou abaixo de 90/60', 'Repita em 5 minutos, sentado. Evite cafeína e sal hoje e anote como se sente no diário.'],
          ['140/90 ou mais, ou abaixo de 80/50', 'Pare a atividade e sente-se. Repita em 5 minutos. Se confirmar, avise o comandante. Com dor no peito, falta de ar ou tontura, peça ajuda agora.']
        ],
        cta: ['Medir pressão agora', 'Medicao.dc.html']
      },
      fc: {
        name: 'Frequência cardíaca', unit: 'bpm', axis: 'bpm', src: 'Anel', when: 'há 4 min', ranges: ['24h', '7d', '30d'], mode: 'line', wave: true,
        lo: 40, hi: 120, ticks: [40, 60, 80, 100, 120], bands: [{ lo: 50, hi: 95, label: 'Faixa normal em repouso', tl: true }],
        range: '50–95 bpm em repouso', base: '60 bpm', per: 'medido pelo anel',
        msg: { ok: 'Dentro da faixa em repouso.', warn: 'Fora da faixa em repouso. Sente-se e respire devagar.', crit: 'Muito fora da faixa. Pare e confirme a pulsação.' },
        why: ['A frequência cardíaca em repouso mostra como o coração está se adaptando. Subir sem esforço pode indicar estresse, febre, falta de líquido ou cansaço.', 'O anel mede o dia todo. O que vale é o repouso: sentado, sem ter treinado há pelo menos 15 minutos.'],
        how: ['Use o anel bem ajustado no dedo, sem folga.', 'Sincronize ao acordar e antes de dormir.', 'Para um valor em repouso, fique sentado em silêncio por 5 minutos antes de olhar a tela.'],
        acts: [
          ['50–95 bpm em repouso', 'Tudo certo. Siga o treino e a rotina do dia.'],
          ['96–110 ou 40–49 bpm em repouso', 'Sente-se e respire devagar por 5 minutos. Pense em esforço, cafeína ou estresse recentes. Se continuar, meça a pressão.'],
          ['Acima de 110 ou abaixo de 40 bpm em repouso', 'Pare o que está fazendo e sente-se. Confirme a pulsação no pulso por 1 minuto e avise o comandante. Com dor no peito, desmaio ou falta de ar, peça ajuda agora.']
        ],
        cta: ['Registrar como me sinto', 'Diario.dc.html']
      },
      gl: {
        name: 'Glicose', unit: 'mg/dL', axis: 'mg/dL', src: 'Manual', when: 'ontem 07:35', ranges: ['7d', '30d'], mode: 'line', manual: true,
        lo: 60, hi: 140, ticks: [60, 80, 100, 120, 140], bands: [{ lo: 70, hi: 99, label: 'Faixa normal em jejum' }],
        range: '70–99 mg/dL em jejum', base: '94 mg/dL', per: 'uma medição por dia, em jejum',
        msg: { ok: 'Dentro da faixa em jejum.', warn: 'Fora da faixa. Repita amanhã em jejum.', crit: 'Fora do limite seguro. Meça de novo agora.' },
        why: ['A glicose é o combustível do corpo. Em missão, estresse, sono curto e mudanças na dieta podem fazer o valor subir ou cair.', 'A medição em jejum é a mais fácil de comparar de um dia para o outro.'],
        how: ['Fique 8 horas sem comer, só com água.', 'Lave e seque as mãos.', 'Pique a lateral da ponta do dedo e encoste a gota na tira do glicosímetro.', 'Anote o valor. O app guarda a data e a hora.'],
        acts: [
          ['70–99 mg/dL em jejum', 'Siga a rotina. Meça em jejum de novo amanhã.'],
          ['100–125 ou 54–69 mg/dL', 'Repita a medição. Abaixo de 70: coma 15 g de açúcar de ação rápida e meça de novo em 15 minutos. Acima de 100: anote a última refeição no diário.'],
          ['126 mg/dL ou mais, ou abaixo de 54', 'Meça de novo agora. Abaixo de 54: coma 15 g de açúcar de ação rápida, fique parado e avise o comandante. Acima de 126 confirmado: avise o time médico.']
        ],
        cta: ['Medir glicose agora', 'Medicao.dc.html']
      },
      tc: {
        name: 'Temperatura corporal', unit: '°C', axis: '°C', src: 'Anel + manual', when: 'há 4 min', ranges: ['24h', '7d', '30d'], mode: 'line', dec: 1,
        lo: 36, hi: 38, ticks: [36, 36.5, 37, 37.5, 38], bands: [{ lo: 36.1, hi: 37.5, label: 'Faixa normal' }],
        range: '36,1–37,5 °C', base: '36,6 °C', per: 'estimada pelo anel',
        msg: { ok: 'Dentro da faixa normal.', warn: 'Levemente fora da faixa. Confirme com o termômetro.', crit: 'Possível febre. Confirme e siga o guia.' },
        why: ['A temperatura sobe com infecção, esforço e estresse. Na microgravidade o corpo perde calor de outro jeito, por isso acompanhar a tendência ajuda mais do que um valor isolado.', 'O anel estima a temperatura da pele. Se passar do normal, confirme com o termômetro de bordo.'],
        how: ['O anel estima a temperatura da pele, de dia e de noite.', 'Se o valor sair da faixa, espere 15 minutos depois de treino ou banho.', 'Meça com o termômetro de bordo, no ouvido ou na testa.', 'Registre o valor. O app compara com a estimativa do anel.'],
        acts: [
          ['36,1–37,5 °C', 'Siga a rotina e beba água ao longo do dia.'],
          ['37,6–37,9 °C, ou 35,0–36,0 °C', 'Confirme com o termômetro de bordo. Hidrate-se, descanse e meça de novo em 1 hora.'],
          ['38,0 °C ou mais, ou abaixo de 35,0 °C', 'Confirme no termômetro. Com febre, afaste-se do convívio e avise o comandante. Siga o protocolo de infecção de bordo.']
        ],
        cta: ['Medir temperatura agora', 'Medicao.dc.html']
      },
      sn: {
        name: 'Sono', unit: 'esta noite', axis: 'horas por noite', src: 'Anel', when: 'ao acordar', ranges: ['7d', '30d'], mode: 'bars', hm: true,
        lo: 0, hi: 10, ticks: [0, 2, 4, 6, 8, 10], bands: [{ lo: 7, hi: 9, label: 'Faixa normal' }],
        range: '7 a 9 h por noite', base: '7 h 20', per: 'uma noite por barra',
        msg: { ok: 'Boa noite de sono.', warn: 'Noite curta. O treino de hoje cai 30%.', crit: 'Sono muito curto. Treino leve e sem tarefas de risco.' },
        why: ['Dormir menos de 7 horas por noite piora a atenção e a recuperação. Em missão, isso pesa nas tarefas de risco.', 'O anel registra o sono sozinho. Luz baixa à noite e horário fixo ajudam o relógio do corpo.'],
        how: ['Use o anel à noite, bem ajustado no dedo.', 'Sincronize ao acordar. O app mostra o total de horas.', 'A partir das 21:30, deixe a luz baixa e evite telas.'],
        acts: [
          ['7 a 9 h', 'Mantenha o horário. Treino normal hoje.'],
          ['5 h a 6 h 59, ou mais de 9 h', 'O treino de hoje cai 30%. Evite cafeína depois das 14:00 e faça um cochilo de até 20 minutos, se precisar.'],
          ['Menos de 5 h', 'Treino leve e sem tarefas de risco, como saída extraveicular. Avise o comandante e combine descanso.']
        ],
        cta: ['Ajustar o treino de hoje', 'Rotina.dc.html']
      },
      hu: {
        name: 'Humor', unit: 'de 5', axis: 'nota de 1 a 5', src: 'Você', when: 'ontem 21:40', ranges: ['7d', '30d'], mode: 'bars',
        lo: 0, hi: 5.5, ticks: [1, 2, 3, 4, 5], bands: [{ lo: 3, hi: 5, label: 'Faixa normal' }],
        range: 'nota 3 a 5', base: 'nota 4', per: 'um registro por dia',
        msg: { ok: 'Humor estável.', warn: 'Humor baixo. Vale conversar com alguém.', crit: 'Humor muito baixo. Procure apoio hoje.' },
        why: ['O humor muda antes de aparecerem outros sinais de cansaço e estresse. Anotar todo dia ajuda a perceber a tendência.', 'O registro é só seu. Você escolhe se quer compartilhar o humor com o time.'],
        how: ['Pergunte-se: como foi meu dia?', 'Escolha de 1 (muito mal) a 5 (muito bem) no diário de bordo.', 'Se quiser, escreva uma nota. Ela fica só com você.'],
        acts: [
          ['Nota 3 a 5', 'Siga a rotina. Registre de novo amanhã.'],
          ['Nota 2', 'Converse com alguém do time ou escreva no diário. Faça uma pausa de 15 minutos em um lugar com luz clara.'],
          ['Nota 1', 'Fale com alguém de confiança ainda hoje. Se você quiser, o comandante pede apoio psicológico da Terra.']
        ],
        cta: ['Escrever no diário', 'Diario.dc.html']
      }
    };
  }
  fmt(id, v) {
    if (id === 'sn') { return this.hm(v); }
    if (id === 'tc') { return this.num(v, 1); }
    if (id === 'hu') { return String(Math.round(v)); }
    return String(Math.round(v));
  }
  renderVals() {
    const s = this.state, CFG = this.CFG(), SER = this.SER();
    const ids = ['pa', 'fc', 'gl', 'tc', 'sn', 'hu'];
    const cf = CFG[s.id];
    const range = cf.ranges.indexOf(s.range) >= 0 ? s.range : '7d';
    const raw = SER[s.id][range];
    const dual = !!cf.dual;
    const A = dual ? raw[0] : raw, B = dual ? raw[1] : null;
    const n = A.length;
    const val = (i) => (dual ? [A[i], B[i]] : A[i]);
    const sts = A.map((_, i) => this.classify(s.id, val(i)));
    const lastSt = sts[n - 1];
    const last = val(n - 1);

    // --- tabs
    const tabs = {};
    ids.forEach((k) => {
      const q = SER[k]['7d'];
      const isDual = !!CFG[k].dual;
      const v = isDual ? [q[0][q[0].length - 1], q[1][q[1].length - 1]] : q[q.length - 1];
      const st = this.classify(k, v);
      const txt = k === 'pa' ? v[0] + '/' + v[1] : this.fmt(k, v);
      tabs[k] = Object.assign({
        val: txt, on: s.id === k ? 'true' : 'false',
        tbd: s.id === k ? '#62C3FF' : '#1F4469', tbg: s.id === k ? '#133559' : '#0C2442', tsh: s.id === k ? 'inset 0 -4px 0 #62C3FF' : 'none',
        pick: () => this.setState({ id: k, range: CFG[k].ranges.indexOf(this.state.range) >= 0 ? this.state.range : '7d' })
      }, this.stx(st));
    });

    // --- range buttons
    const RL = { '24h': '24 horas', '7d': '7 dias', '30d': '30 dias' };
    const rangeBtns = cf.ranges.map((r) => ({
      label: RL[r], on: r === range ? 'true' : 'false', bg: r === range ? '#62C3FF' : 'transparent', fg: r === range ? '#04162B' : '#E8F0F8',
      pick: () => this.setState({ range: r })
    }));

    // --- geometry
    const W = 600, H = 260, lo = cf.lo, hi = cf.hi;
    const yp = (v) => 100 - ((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * 100;
    const fx = (i) => (n === 1 ? 0.5 : i / (n - 1));
    const lineOf = (arr) => arr.map((v, i) => (fx(i) * W).toFixed(1) + ',' + ((yp(v) / 100) * H).toFixed(1)).join(' ');
    const tickTxt = (t) => (s.id === 'tc' ? this.num(t, 1) : String(t));
    const grid = cf.ticks.map((t) => ({ top: yp(t).toFixed(2), label: tickTxt(t) }));
    const bands = cf.bands.map((b) => ({ top: yp(b.hi).toFixed(2), h: (yp(b.lo) - yp(b.hi)).toFixed(2), label: b.label,
      ly: (cf.mode === 'bars' ? yp(b.hi) : (b.tl ? yp(b.hi) : yp(b.lo))).toFixed(2), tf: b.tl ? 'none' : 'translateY(-100%)', side: b.tl ? 'left:0' : 'right:0' }));

    // --- series drawing
    let lineA = '', lineB = '', areaA = '', dotsA = '', dotsB = '', dotsW = '', dotsC = '', bars = [], marks = [];
    const isLine = cf.mode === 'line', isBars = cf.mode === 'bars';
    const dotsOK = n <= 31;
    if (isLine) {
      lineA = lineOf(A);
      if (dual) { lineB = lineOf(B); }
      if (!dual) { areaA = lineA + ' ' + W + ',' + H + ' 0,' + H; }
      if (dotsOK) {
        const dot = (i, arr) => 'M' + (fx(i) * W).toFixed(1) + ',' + ((yp(arr[i]) / 100) * H).toFixed(1) + ' h0 ';
        for (let i = 0; i < n; i++) {
          let stA = sts[i];
          if (dual) {
            const sysOut = A[i] >= 120 || A[i] < 90, diaOut = B[i] >= 80 || B[i] < 60;
            const crit = sts[i] === 'crit';
            if (sysOut) { if (crit) { dotsC += dot(i, A); } else { dotsW += dot(i, A); } } else { dotsA += dot(i, A); }
            if (diaOut) { if (crit) { dotsC += dot(i, B); } else { dotsW += dot(i, B); } } else { dotsB += dot(i, B); }
          } else {
            if (stA === 'crit') { dotsC += dot(i, A); } else if (stA === 'warn') { dotsW += dot(i, A); } else { dotsA += dot(i, A); }
          }
        }
      }
      const mk = (v) => ({ top: yp(v).toFixed(2), col: this.stx(lastSt).col });
      marks = dual ? [mk(A[n - 1]), mk(B[n - 1])] : [mk(A[n - 1])];
    } else {
      const showLbl = n <= 8;
      bars = A.map((v, i) => {
        const st = sts[i];
        const bg = st === 'ok' ? '#62C3FF' : (st === 'warn' ? 'repeating-linear-gradient(135deg,#FFC24B 0 6px,#8A6410 6px 12px)' : 'repeating-linear-gradient(45deg,#FF7B7B 0 5px,#7A2A2A 5px 10px)');
        const tc = st === 'ok' ? '#A9BDD2' : this.stx(st).col;
        return { h: (100 - yp(v)).toFixed(2), bg: bg, tc: tc, label: showLbl ? (s.id === 'sn' ? this.num(v, 1) : String(v)) : '' };
      });
    }
    const gap = n <= 8 ? 16 : 4;

    // --- x axis labels
    let xl;
    if (range === '24h') {
      xl = [[0, 'ontem 07:30'], [12 / 47, '13:30'], [24 / 47, '19:30'], [36 / 47, '01:30'], [1, 'agora']];
    } else if (range === '7d') {
      xl = [41, 42, 43, 44, 45, 46, 47].map((d, i) => [i / 6, 'dia ' + d]);
      if (isBars) { xl = [41, 42, 43, 44, 45, 46, 47].map((d, i) => [(i + 0.5) / 7, 'dia ' + d]); }
    } else {
      xl = [18, 25, 33, 40, 47].map((d) => [(d - 18) / 29, 'dia ' + d]);
      if (isBars) { xl = [18, 25, 33, 40, 47].map((d) => [(d - 18 + 0.5) / 30, 'dia ' + d]); }
    }
    xl = xl.map((q) => ({ left: (q[0] * 100).toFixed(2), text: q[1] }));

    // --- stats
    const outN = sts.filter((q) => q !== 'ok').length;
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    let stats;
    const st3 = (a, b, c) => [{ k: 'Média', v: a }, { k: 'Menor', v: b }, { k: 'Maior', v: c }];
    if (dual) {
      stats = st3(Math.round(avg(A)) + '/' + Math.round(avg(B)), Math.min.apply(null, A) + '/' + Math.min.apply(null, B), Math.max.apply(null, A) + '/' + Math.max.apply(null, B));
    } else if (s.id === 'hu') {
      stats = st3(this.num(avg(A), 1), String(Math.min.apply(null, A)), String(Math.max.apply(null, A)));
    } else {
      stats = st3(this.fmt(s.id, avg(A)), this.fmt(s.id, Math.min.apply(null, A)), this.fmt(s.id, Math.max.apply(null, A)));
    }
    stats.push({ k: 'Fora da faixa', v: outN + ' de ' + n });

    // --- legend
    const bandSw = 'width:18px;height:12px;background:rgba(70,211,154,0.18);border:1px dashed rgba(70,211,154,0.6)';
    const legend = [];
    if (dual) {
      legend.push({ sw: 'width:22px;height:0;border-top:3px solid #62C3FF', label: 'Sistólica' });
      legend.push({ sw: 'width:22px;height:0;border-top:3px dashed #A9BDD2', label: 'Diastólica' });
    }
    legend.push({ sw: bandSw, label: 'Faixa normal' });
    if (isLine && dotsOK) { legend.push({ sw: 'width:11px;height:11px;border-radius:50%;background:#FFC24B', label: 'Fora da faixa' }); }
    if (isBars) {
      legend.push({ sw: 'width:14px;height:14px;border-radius:3px;background:#62C3FF', label: 'Normal' });
      legend.push({ sw: 'width:14px;height:14px;border-radius:3px;background:repeating-linear-gradient(135deg,#FFC24B 0 6px,#8A6410 6px 12px)', label: 'Atenção' });
      legend.push({ sw: 'width:14px;height:14px;border-radius:3px;background:repeating-linear-gradient(45deg,#FF7B7B 0 5px,#7A2A2A 5px 10px)', label: 'Crítico' });
    }

    // --- texts
    const per = range === '24h' ? 'últimas 24 h · a cada 30 min' : (range === '7d' ? (cf.manual || isBars ? 'últimos 7 dias · ' + cf.per : 'últimos 7 dias · a cada 2 h') : (cf.manual || isBars ? 'últimos 30 dias · ' + cf.per : 'últimos 30 dias · média diária'));
    const sub = per + ' · ' + cf.axis;
    const valueTxt = s.id === 'pa' ? last[0] + '/' + last[1] : this.fmt(s.id, last);
    const alt = 'Gráfico de ' + cf.name.toLowerCase() + ', ' + RL[range] + '. Último valor ' + valueTxt + ' ' + cf.unit + ', ' + this.stx(lastSt).status.toLowerCase() + '. Média ' + stats[0].v + ', menor ' + stats[1].v + ', maior ' + stats[2].v + ', ' + outN + ' de ' + n + ' fora da faixa normal.';

    const how = cf.how.map((t, i) => ({ n: String(i + 1), t: t }));
    const stNames = ['ok', 'warn', 'crit'];
    const acts = cf.acts.map((a, i) => {
      const here = stNames[i] === lastSt;
      return Object.assign({
        rule: a[0], text: a[1], here: here ? 'Você está aqui agora' : '', cur: here ? 'true' : 'false',
        line: here ? this.stx(stNames[i]).bd : '#1F4469', fill: here ? this.stx(stNames[i]).bg : '#071D38', tcol: here ? '#E8F0F8' : '#A9BDD2'
      }, this.stx(stNames[i]));
    });

    const c = {
      title: cf.name, sub: sub, alt: alt, whyLeft: !cf.wave, whyRight: !!cf.wave, isLine: isLine, isBars: isBars, hasWave: !!cf.wave,
      grid: grid, bands: bands, lineA: lineA, lineB: lineB, areaA: areaA, dotsA: dotsA, dotsB: dotsB, dotsW: dotsW, dotsC: dotsC,
      bars: bars, gap: gap, marks: marks, xl: xl, legend: legend, stats: stats,
      value: valueTxt, unit: cf.unit, src: cf.src, when: cf.when, now: this.stx(lastSt), nowText: cf.msg[lastSt],
      range: cf.range, base: cf.base, why1: cf.why[0], why2: cf.why[1], how: how, acts: acts,
      ctaLabel: cf.cta[0], ctaHref: cf.cta[1]
    };
    return Object.assign({ tabs: tabs, rangeBtns: rangeBtns, c: c }, this.linkVals(), this.misVals());
  }
}'''.replace("@SER", json.dumps(ser, separators=(",", ":")))
    return page("Indicadores", html_body, script, h=1700)

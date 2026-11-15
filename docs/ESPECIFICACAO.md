# Especificação - Vento Norte Health

Documento de referência para desenvolvimento. Veja `REQUISITOS.md` para a especificação completa.

## Conceito

Aplicativo desktop (Electron + React) que funciona como assistente de bordo para astronautas monitorarem sua saúde com autonomia da Terra.

**4 Pilares**: Medir → Entender → Agir → Conviver

## Requisitos Funcionais Essenciais (Fase 1 MVP)

| RF | Descrição | Prioridade |
|----|-----------|-----------|
| RF01 | Entrar como astronauta ou comandante (papéis simulados) | E |
| RF02 | Escolher ambiente (Estação, Lua, Marte, Terra remota) | E |
| RF03 | Tela "Hoje": estado geral, alertas, próxima atividade, humor | E |
| RF04 | 6 indicadores: FC, PA, glicose, temp, sono, humor | E |
| RF06 | Gráficos de evolução com período selecionável | E |
| RF07 | Cores (verde, amarelo, vermelho) com ícone + texto | E |
| RF12 | Check-in de humor rápido | E |
| RF16 | Gamificação: pontos e sequência | E |
| RF21 | Modo demonstração com cenários (normal, hipóxia, febre, stress, radiação) | E |
| RF26 | Barra de sinais vitais fixa no topo | E |
| RF27 | Estado do anel (conectado, sincronizando, carregando) | E |

## Requisitos Não-Funcionais

| RNF | Descrição | Prioridade |
|-----|-----------|-----------|
| RNF01 | Offline: sem internet ou CDN | E |
| RNF02 | Executável desktop Windows (Mac/Linux desejáveis) | E |
| RNF03 | Abrir em ≤5s, sinais a 1Hz, gráficos 30fps+ | I |
| RNF04 | Linguagem simples para não-médicos | E |
| RNF05 | Contraste WCAG AA, tema escuro, fonte ajustável | E |
| RNF06 | Segurança: contextIsolation, sem Node no renderer, IPC validado | E |
| RNF08 | Faixas e protocolos em arquivos; RN com testes automatizados | I |

## Regras de Negócio Essenciais

| RN | Descrição |
|----|-----------|
| RN01 | Cada indicador tem faixas por ambiente com fonte. Status: Normal/Atenção/Crítico |
| RN02 | Estado geral = pior status entre indicadores |
| RN03 | Atenção: 3 leituras fora da faixa. Crítico: pede re-medição antes de escalar |
| RN04 | Atenção registra. Crítico notifica comandante |
| RN05 | Em Marte: atraso de minutos, guia local obrigatório |
| RN06 | Privacidade 3 níveis: Pessoal (astronauta), Comandante (resumos), Público (agregados) |
| RN07 | Diário sempre pessoal. Humor agregado |
| RN14 | Pontos por hábitos. Sequência não quebra em alerta/EVA/anel carregando |

## Estrutura de Dados

### Indicador
```json
{
  "heartRate": {
    "value": 72,
    "unit": "bpm",
    "status": "normal",
    "range": { "min": 60, "max": 100 }
  }
}
```

### Alerta
```json
{
  "id": "unique",
  "indicator": "heartRate",
  "severity": "critical",
  "message": "Frequência cardíaca acima do normal",
  "state": "open",
  "timestamp": "2026-11-15T10:00:00Z",
  "actionRequired": true
}
```

### Medição Manual
```json
{
  "type": "bloodPressure",
  "value": "120/80",
  "timestamp": "2026-11-15T10:00:00Z",
  "confirmed": true,
  "source": "manual"
}
```

## Canais IPC

### Main → Renderer
- `data:tick` - Envia leituras simuladas

### Renderer → Main
- `data:get-view` - Pede dados filtrados por papel
- `measure:submit` - Registra medição manual
- `alert:update` - Muda estado do alerta
- `mood:checkin` - Registra humor
- `eva:start` / `eva:end` - Modo EVA
- `demo:set-scenario` - Troca cenário

## Ambientes

| Ambiente | Características |
|----------|-----------------|
| Estação | Baixa radiação, resposta rápida da Terra |
| Lua | Radiação moderada, atraso ~1s |
| Marte | Radiação alta, atraso ~13min |
| Terra Remota | Sem médico próximo, sem equipamento clínico |

## Cenários Demo

- **Normal**: valores dentro da faixa
- **Hipóxia**: SpO2 cai, FC sobe
- **Febre**: temperatura e FC elevadas
- **Stress**: FC alta, HRV baixa, humor baixo
- **Radiação**: evento de partículas, dose acumulada sobe

## Telas Principais

1. **Hoje** (RF03): Estado geral, alertas, próxima atividade, check-in humor
2. **Saúde** (RF04-07): 6 indicadores em cards + gráficos
3. **Medições** (RF30): Agenda + entrada manual guiada
4. **Rotina**: Refeições, treino, sono, pontos
5. **Diário**: Entradas pessoais (sempre privadas)
6. **Alerta**: Guia passo a passo
7. **Comandante**: Status da tripulação
8. **Público**: Radiação, ar, clima da equipe

## Componentes Reutilizáveis

- `VitalsBar` - Barra fixa no topo com FC, PA, SpO2, Temp
- `IndicatorCard` - Card com valor, faixa, cor, status
- `Chart` - Gráfico de evolução com Recharts
- `AlertGuide` - Passos do protocolo
- `Sidebar` - Navegação

## Fluxos Críticos

### Fluxo do Alerta
1. Detecção: 3 leituras fora da faixa
2. Estado: Atenção (monitora) ou Crítico (re-mede)
3. Protocolo: Passo a passo (re-medir, sintomas, condutas)
4. Escalação: Se permanecer crítico, avisa comandante
5. Desfecho: Fechado, escalado ou aguardando

### Fluxo EVA (Atividade Extraveicular)
1. Astronauta ativa EVA mode
2. App propõe check pré-saída
3. Pausa alertas, registra lacuna planejada
4. Na volta: pede recolocar anel, sincroniza
5. Sugere check-in humor
6. Gráficos mostram lacuna, sequência gamif. não quebra

## Performance

- App abre em ≤5 segundos
- Sinais atualizados a 1 Hz
- Gráficos renderizam a 30 fps ou mais
- Mudança de tela em ≤300ms

## Segurança

- Sem Node no renderer
- contextIsolation ativado
- Canais IPC nomeados e validados
- Nenhum dado enviado para externa
- Diário nunca sai do nível pessoal
- Exceção de emergência com log

## Dados Mock

Gerados por Python (`tools/mock_data/generate.py`):
- 30 dias de série diária
- Tripulação de 4 pessoas
- ECG e PPG simulados com NeuroKit2
- Tendência + ruído para realismo
- Semente fixa para reprodutibilidade

## Fases

| Fase | Goal | Duração |
|------|------|---------|
| 0 | App abre offline | 1 sem |
| 1 | MVP completo: 6 indicadores, cores, gráficos | 2 sem |
| 2 | Autonomia: alerta → protocolo → resolução | 2 sem |
| 3 | Convivência: diário, privacidade | 2 sem |
| 4 | Entrega: instalador, i18n, polimento | 2 sem |

---

**Última atualização**: 2026-11-15

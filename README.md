# Vento Norte Health

**Monitoramento de saúde para astronautas em missões espaciais.**

O Vento Norte Health é um aplicativo desktop que ajuda astronautas não-médicos a medir, entender e agir sobre a própria saúde, inclusive quando a Terra demora a responder. Protótipo da equipe Vento Norte UEA para o NASA Space Apps Challenge 2026.

## Conceito

O app funciona como um assistente de bordo com quatro pilares:

- **Medir**: Ensina a medir cada sinal e agenda as medições
- **Entender**: Explica por que o sinal importa e mostra a faixa normal e a cor
- **Agir**: Guia o astronauta diante de uma alteração, sem esperar a Terra
- **Conviver**: Cuida de rotina, humor e relação entre a tripulação

## Stack Tecnológico

- **Desktop**: Electron (Windows, Mac, Linux)
- **Interface**: React 18 com Vite (JavaScript)
- **Gráficos**: Recharts (empacotado offline)
- **Estado**: React Context + useReducer
- **Testes**: Vitest
- **Mock Data**: Python 3 + NeuroKit2 + NumPy
- **Build**: electron-builder

## Como Rodar

### Requisitos

- Node.js 18+
- Python 3.8+ (para gerar dados mock)

### Instalação

```bash
npm install

# Gerar dados mockados (opcional - dados de exemplo já inclusos)
npm run mock:generate

# Desenvolvimento
npm run dev

# Build
npm run build

# Distribuição (gera .exe, .dmg, AppImage)
npm run dist
```

## Estrutura do Projeto

```
vento-norte-health/
├── package.json
├── electron.vite.config.js       # Configuração Electron + Vite
├── .env.example                   # Variáveis de ambiente
│
├── src/
│   ├── main/                      # Node: processo principal
│   │   ├── index.js               # Entry point, IPC handlers
│   │   ├── privacy-policy.js      # Política de 3 níveis de privacidade
│   │   ├── storage.js             # Persistência em disco local
│   │   └── data-source/
│   │       └── index.js           # Camada de dados (mock hoje, anel depois)
│   │
│   ├── preload/
│   │   └── index.js               # Canais IPC expostos ao renderer
│   │
│   ├── renderer/                  # React + Vite
│   │   ├── App.jsx                # Componente raiz
│   │   ├── index.html             # HTML template
│   │   ├── context/
│   │   │   ├── AppContext.js
│   │   │   └── reducer.js         # Estado global com useReducer
│   │   ├── screens/
│   │   │   ├── Layout.jsx         # Layout principal
│   │   │   ├── Today.jsx          # Tela "Hoje"
│   │   │   ├── Health.jsx         # Indicadores + gráficos
│   │   │   ├── Measurements.jsx   # Agenda de medições
│   │   │   ├── Routine.jsx        # Refeições, treino, sono
│   │   │   ├── Diary.jsx          # Diário pessoal
│   │   │   ├── AlertGuide.jsx     # Guia de alerta passo a passo
│   │   │   ├── Commander.jsx      # Painel do comandante
│   │   │   └── PublicPanel.jsx    # Painel público
│   │   ├── components/
│   │   │   ├── VitalsBar.jsx      # Barra fixa de sinais vitais
│   │   │   └── Sidebar.jsx        # Navegação lateral
│   │   ├── styles/
│   │   │   └── index.css          # Estilos (tema escuro, responsivo)
│   │   └── i18n/                  # Internacionalização (pt-BR, en)
│   │
│   ├── shared/rules/              # Regras de negócio (puro JavaScript)
│   │   ├── indicators.js          # RN01, RN02 (faixas, status geral)
│   │   └── alerts.js              # RN03, RN04 (alertas, severidade)
│   │
│   └── config/
│       └── ranges.json            # Faixas de referência por ambiente
│
├── resources/
│   └── mock/                      # Dados simulados gerados (entrada no build)
│       ├── scenarios/             # normal, hypoxia, fever, stress, radiation
│       └── profiles/              # station, moon, mars, remote
│
├── tools/
│   └── mock_data/
│       ├── generate.py            # Gerador usando NeuroKit2
│       └── requirements.txt       # Dependências Python
│
└── docs/
    └── REQUISITOS.md              # Especificação completa
```

## Segurança

- ✅ `contextIsolation` habilitado
- ✅ Sem Node no renderer
- ✅ Canais IPC validados
- ✅ Nenhum envio externo (offline)
- ✅ Política de privacidade em 3 níveis

## Regras de Negócio

As 17 regras de negócio (RN01 a RN17) estão em módulos puros dentro de `src/shared/rules/` com testes automatizados em `vitest`.

Alguns exemplos:

- **RN01**: Faixas de referência por ambiente (Estação, Lua, Marte, Terra remota)
- **RN02**: Estado geral = pior status entre indicadores
- **RN03**: Atenção = 3 leituras seguidas fora da faixa
- **RN04**: Crítico notifica comandante
- **RN05**: Comunicação assíncrona em Marte (minutos de atraso)

## Plano de Entregas

| Fase | O que | Prazo |
|------|-------|-------|
| 0 - Fundação | App abre offline, dados chegam ao renderer | MVP |
| 1 - MVP | 6 indicadores, cores, gráficos, gamificação | MVP + 2 sem |
| 2 - Autonomia | Alerta → re-medição → protocolo → resolução | MVP + 4 sem |
| 3 - Convivência | Diário, gamificação avançada, privacidade | MVP + 6 sem |
| 4 - Entrega | Instalador, i18n, polimento | MVP + 8 sem |

## Limites Conhecidos

- Papéis simulados em uma única máquina (autenticação fica para versão real)
- Anel inteligente é mockado (leitura real via Bluetooth fica como trabalho futuro)
- Faixas clínicas são ilustrativas (validação com NASA/clínicas é pré-requisito)

## Fontes de Referência

- [NASA Human Research Program](https://www.nasa.gov/hrp/)
- [5 Hazards of Human Spaceflight](https://www.nasa.gov/hrp/hazards/)
- [Open Science Data Repository (OSDR)](https://osdr.nasa.gov/)

---

**Desenvolvido por**: Vento Norte UEA | **Desafio**: NASA Space Apps Challenge 2026

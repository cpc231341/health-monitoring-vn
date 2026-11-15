# Início Rápido - Vento Norte Health

Guia para começar o desenvolvimento em 5 minutos.

## ✅ Setup Completado

```bash
✓ npm install - Todas as dependências instaladas
✓ Estrutura de pastas criada
✓ Electron + React + Vite configurado
✓ Regras de negócio em módulos puros
✓ Testes com Vitest preparados
✓ Documentação técnica completa
```

## 🚀 Como Rodar

### Desenvolvimento
```bash
npm run dev
```
Abre o Electron com React Dev Tools. A cada mudança em `src/`, recompila automaticamente.

### Testes
```bash
npm test
```
Roda testes com Vitest. Exemplo: `src/shared/rules/indicators.test.js`

### Build
```bash
npm run build
```
Compila `src/main`, `src/preload` e `src/renderer` para `dist/` e `dist-electron/`.

### Distribuição (Windows)
```bash
npm run dist
```
Gera `.exe` e `.AppImage` em `dist/`.

## 📁 Estrutura Principal

```
src/
├── main/                    # Electron Main (Node.js)
│   ├── index.js             # IPC handlers, janela
│   ├── privacy-policy.js    # Filtra dados por papel
│   ├── storage.js           # Salva em disco local
│   └── data-source/index.js # Camada de dados (mock)
│
├── preload/
│   └── index.js             # Bridge seguro (IPC expostos)
│
├── renderer/                # React + Vite
│   ├── App.jsx              # Componente raiz
│   ├── index.html           # Template
│   ├── screens/             # 8 telas principais
│   │   ├── Today.jsx
│   │   ├── Health.jsx
│   │   ├── ... (+ 6 telas)
│   ├── components/          # Reutilizáveis
│   │   ├── VitalsBar.jsx    # Barra fixa no topo
│   │   └── Sidebar.jsx      # Navegação
│   ├── context/
│   │   ├── AppContext.js    # Estado global
│   │   └── reducer.js       # Actions
│   └── styles/
│       └── index.css        # Design responsivo
│
└── shared/rules/            # Lógica pura (testável)
    ├── indicators.js        # RN01, RN02
    ├── indicators.test.js   # Testes
    └── alerts.js            # RN03, RN04
```

## 🔍 Próximos Passos

### Fase 1: Conectar Interface
- [ ] Tela "Hoje" fetching dados via `window.api.getView()`
- [ ] Indicadores renderizando valores reais do state
- [ ] Gráficos "Saúde" com Recharts

### Fase 2: Alertas
- [ ] Lógica de alerta ao detectar 3 leituras fora da faixa
- [ ] Guia de alerta passo a passo
- [ ] Notificação ao comandante

### Fase 3: Dados Mock
- [ ] Rodar `npm run mock:generate` com Python
- [ ] Carregar JSON em `resources/mock/` no Data Source

## 🐛 Troubleshooting

### "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Electron não abre
```bash
npm run dev  # Verificar erros no console
```

### Erro de IPC
Garantir que o canal está:
1. Definido em `src/preload/index.js`
2. Implementado em `src/main/index.js`
3. Chamado em React via `window.api.*`

## 📚 Documentação

- **README.md** - Visão geral e como rodar
- **ESPECIFICACAO.md** - Requisitos funcionais (RF) e não-funcionais (RNF)
- **ARQUITETURA.md** - Fluxos, camadas, segurança
- **docs/RUAN_*.md** - Notas técnicas da equipe

## 🔐 Segurança

Garantir que:
- ✅ Nunca escrever Node.js no renderer
- ✅ Validar argumentos nos handlers IPC
- ✅ Usar apenas canais expostos em preload
- ✅ Manter diário em nível pessoal

## 📊 17 Regras de Negócio

Implementadas em `src/shared/rules/`:

| RN | Descrição | Arquivo |
|----|-----------|---------|
| RN01 | Faixas por ambiente | indicators.js |
| RN02 | Estado geral = pior | indicators.js |
| RN03 | Atenção/Crítico | alerts.js |
| RN04 | Notifica comandante | alerts.js |
| ... | (13 mais) | ... |

Cada uma tem testes em `.test.js`

## ⚡ Performance

Metas:
- App abre em ≤5s
- Sinais a 1Hz
- Gráficos 30fps+

## 🎮 Demo

Para testar rápido:
1. `npm run dev`
2. Trocar "Cenário" em cima: Normal → Hipóxia → Febre
3. Ver cores mudando em tempo real

---

**Última atualização**: 2026-11-15 | **Stack**: Electron 30 + React 18 + Vite 5

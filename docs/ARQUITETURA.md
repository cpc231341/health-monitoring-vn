# Arquitetura - Vento Norte Health

## Visão Geral

```
┌─────────────────────────────────────────────────────────┐
│                    Vento Norte Health                    │
│                 Electron Desktop App                     │
└─────────────────────────────────────────────────────────┘
         │                                    │
         ├──────────────────┬─────────────────┤
         │                  │                  │
    ┌────▼─────┐     ┌─────▼──────┐    ┌─────▼──────┐
    │   Main    │     │ Preload    │    │ Renderer   │
    │ (Node.js) │     │   Bridge   │    │   (React)  │
    └────┬─────┘     └─────┬──────┘    └─────┬──────┘
         │                  │                  │
         │          IPC Channels          React UI
         │         (Validados)          (Components)
         │                  │                  │
    ┌────▼──────────────────▼──────────────────▼────┐
    │             Context Isolation                  │
    │          (sem Node no renderer)                │
    └──────────────────────────────────────────────┘
         │
    ┌────▼────────────────────────────┐
    │   Privacy Policy Layer           │
    │  (Filtra dados por papel)        │
    │  - Pessoal (Astronauta)         │
    │  - Comandante (Resumos)         │
    │  - Público (Agregados)          │
    └────┬────────────────────────────┘
         │
    ┌────▼────────────────────────────┐
    │   Data Source Layer              │
    │  (Trocável: Mock hoje, Real depois) │
    │  - Mock Data (JSON)             │
    │  - Future: Smart Ring API       │
    └────┬────────────────────────────┘
         │
    ┌────▼────────────────────────────┐
    │   Storage Layer                  │
    │  (Disco local - JSON files)      │
    │  - userData/measurements.json    │
    │  - userData/diary.json           │
    │  - userData/alerts.json          │
    │  - userData/mood.json            │
    │  - userData/access-log.json      │
    └─────────────────────────────────┘
```

## Camadas

### 1. Main Process (Node.js)
- **Arquivo**: `src/main/index.js`
- **Responsabilidades**:
  - Criar e gerenciar janela Electron
  - Implementar handlers IPC (comunicação com renderer)
  - Aplicar política de privacidade
  - Persistir dados em disco local
  - Fornecer dados filtrados por papel

**Handlers IPC**:
- `data:get-view` → Retorna dados filtrados por papel + ambiente
- `measure:submit` → Salva medição manual
- `alert:update` → Atualiza estado do alerta
- `diary:save` → Salva entrada (sempre pessoal)
- `mood:checkin` → Registra humor
- `eva:start/end` → Controla modo EVA
- `demo:set-scenario` → Muda cenário de simulação

### 2. Preload Script
- **Arquivo**: `src/preload/index.js`
- **Responsabilidades**:
  - Expor apenas canais IPC nomeados
  - Validar chamadas do renderer
  - Servir como bridge seguro

**API Exposta** (`window.api`):
```javascript
window.api.getView(options)
window.api.submitMeasure(measurement)
window.api.updateAlert(alertUpdate)
window.api.saveDiary(entry)
window.api.checkinMood(checkin)
// ... etc
```

### 3. Renderer (React)
- **Arquivos**: `src/renderer/*.jsx`
- **Responsabilidades**:
  - Renderizar UI com React
  - Gerenciar estado global com Context + useReducer
  - Fazer chamadas IPC para main
  - Apresentar dados filtrados

**Contexto Global** (`AppContext`):
- `state`: Dados do usuário, indicadores, alertas
- `dispatch`: Ações para atualizar estado
- `currentScreen`: Tela ativa
- `environment`: Ambiente selecionado
- `scenario`: Cenário de simulação

### 4. Shared Rules (JavaScript Puro)
- **Arquivo**: `src/shared/rules/*.js`
- **Responsabilidades**:
  - Implementar regras de negócio (RN01 a RN17)
  - Ser reutilizável entre main e renderer
  - Ter testes automatizados com Vitest

**Exemplo**:
```javascript
// Usado no main ao processar dados
import { getIndicatorStatus } from './shared/rules/indicators'

const status = getIndicatorStatus('heartRate', 72, 'station')
// Retorna: 'normal'
```

### 5. Privacy Policy
- **Arquivo**: `src/main/privacy-policy.js`
- **Responsabilidades**:
  - Filtrar dados por papel (Pessoal, Comandante, Público)
  - Impedir vazamento de dados
  - Logar acessos

**Três Níveis**:
1. **Pessoal**: Diário, refeições, peso, glicose, ECG, dados brutos do anel
2. **Comandante**: Resumos, alertas, status do anel, adesão às medições
3. **Público**: Radiação, ar da cabine, clima geral (sem nomes)

### 6. Storage
- **Arquivo**: `src/main/storage.js`
- **Responsabilidades**:
  - Ler/escrever JSON no disco local (`userData/`)
  - Garantir persistência offline
  - Gerenciar múltiplos arquivos de dados

**Arquivos**:
- `measurements.json` - Medições manuais
- `alerts.json` - Histórico de alertas
- `diary.json` - Entradas pessoais
- `mood.json` - Check-ins de humor
- `eva.json` - Eventos EVA
- `access-log.json` - Log de acessos

### 7. Data Source
- **Arquivo**: `src/main/data-source/index.js`
- **Responsabilidades**:
  - Fornecer dados (mock ou real)
  - Ser trocável por implementação real

**Hoje**: Mock (JSON estático)
**Futuro**: Smart Ring API via Bluetooth

## Fluxo de Dados

### Fluxo de Leitura (Renderer → Main → Renderer)
```
1. Renderer chama: window.api.getView({ role, environment })
2. IPC: Preload envia para main via canal 'data:get-view'
3. Main: 
   - DataSource.getData(environment)
   - PrivacyPolicy.filter(data, role)
4. Main retorna dados filtrados
5. Renderer: dispatch({ type: 'UPDATE_DATA', payload: data })
6. React renderiza interface atualizada
```

### Fluxo de Escrita (Renderer → Main → Storage)
```
1. Renderer: window.api.submitMeasure(measurement)
2. IPC: Preload envia para main via 'measure:submit'
3. Main:
   - Storage.saveMeasurement(measurement)
   - Escreve em userData/measurements.json
4. Storage retorna true/false
5. Renderer recebe confirmação e atualiza UI
```

## Segurança

### Context Isolation
- ✅ Habilitado: Renderer não tem acesso direto ao Node
- ✅ Sem `nodeIntegration`
- ✅ Sem `enableRemoteModule`

### IPC Validação
- Preload expõe apenas canais nomeados
- Cada handler no main valida argumentos
- Sem `eval()` ou `Function()`

### Dados Locais
- Nenhum envio externo
- Tudo armazenado em `userData/` local
- Diário nunca sai do nível pessoal

### Exceção de Emergência
- Sinal vital crítico chega ao comandante mesmo sem consentimento
- Astronauta é avisado no log de acessos
- Acesso fica registrado em `access-log.json`

## Componentes React

```
Layout
├── VitalsBar (RF26)
│   ├── Logo
│   ├── VitalsGrid
│   ├── Environment Selector
│   ├── Scenario Selector
│   └── Ring Status
├── Sidebar
│   ├── User Info
│   ├── Navigation
│   └── Version
└── Screen Container
    ├── Today (RF03)
    ├── Health (RF04-07)
    ├── Measurements (RF30)
    ├── Routine (RF15-16)
    ├── Diary (RF13)
    ├── AlertGuide (RF10)
    ├── Commander (RF17)
    └── PublicPanel (RF18)
```

## Estado Global (Context)

```javascript
{
  user: {
    id: 'astronaut-1',
    name: 'Cristiano',
    role: 'astronaut' // ou 'commander'
  },
  data: {
    indicators: {
      heartRate: { value, unit, status, range },
      // ...
    },
    alerts: [...],
    measurements: [...],
    vitals: {
      heartRateHistory: [...],
      // ...
    }
  },
  ui: {
    loading: false,
    error: null
  }
}
```

## Regras de Negócio (Módulos Puros)

### `src/shared/rules/indicators.js`
- `getIndicatorStatus(key, value, environment)` → 'normal' | 'warning' | 'critical'
- `getOverallStatus(indicators, environment)` → Pior status
- `getIndicatorRanges(environment)` → Objeto com faixas

### `src/shared/rules/alerts.js`
- `evaluateAlert(readings, indicator)` → Alert object ou null
- `createAlert(indicator, severity, message)` → Alert
- `shouldNotifyCommander(alert, environment)` → boolean
- `getAlertGuidance(indicator, severity)` → Array de passos

## Testes

- **Vitest** para testes unitários
- Cobertura das 17 regras de negócio (RN01-RN17)
- Cada handler IPC tem validação

```bash
npm test
```

## Performance

- App abre em ≤5s
- Dados sincronizam a ~1Hz
- Gráficos a 30 fps+
- Mudança de tela em ≤300ms

## Build

```bash
npm run build        # Compila main + preload + renderer
npm run dist         # Gera .exe / .dmg / AppImage
```

**Saída**: `dist-electron/main/`, `dist/`, `dist-electron/preload/`

---

**Última atualização**: 2026-11-15

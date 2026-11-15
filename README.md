# Vento Norte Health

**Monitoramento de saúde para astronautas em missões espaciais.**

Aplicativo desktop que ajuda astronautas não-médicos a medir, entender e agir sobre a própria saúde, inclusive quando a Terra demora a responder. Protótipo da equipe **Vento Norte UEA** para o **NASA Space Apps Challenge 2026**.

A demonstração acompanha a missão **Zagaia** (missão #102, dia 47) com cinco tripulantes: Cristiano Peniche (capitão), Luis Felipe, Mike, Ruan (piloto) e Rita de Cássia.

## Conceito

O app é um assistente de bordo com quatro pilares:

| Pilar | O que faz |
|---|---|
| **Medir** | Ensina a medir cada sinal, registra as medidas e lembra do horário |
| **Entender** | Explica por que o sinal importa e mostra a faixa normal e a cor do estado |
| **Agir** | Guia o astronauta diante de uma alteração, sem esperar a Terra |
| **Conviver** | Cuida de rotina, alimentação, humor e da relação entre a tripulação |

Princípios de design: interface escura e de cantos retos; recompensar **hábitos**, nunca valores de saúde; sem ranking público nem culpa; dado pessoal é pessoal (o capitão vê só o **estado**, o time vê só **agregados**).

## O que já funciona

| Tela | Rota | O que mostra |
|---|---|---|
| Selecionar time e tripulante | `#/`, `#/tripulantes` | Entrada da demonstração |
| Login | `#/login/:key` | Senha do tripulante (protótipo: qualquer senha) |
| Sincronização do anel | `#/sincronizar` | Busca o anel, baixa e confere as medidas antes do painel (RF27) |
| Hoje | `#/hoje` | Painel pessoal personalizável, com cenários de demonstração |
| Agenda | `#/agenda` | Medições e atividades do dia |
| Indicadores | `#/indicadores` | Faixa normal, gráfico e "o que fazer" de cada indicador |
| Recomendação | `#/recomendacao` | Orientação a partir do estado atual |
| Medir | `#/medir` | Pressão, glicose e massa: validação, média dos últimos 3 registros e tendência |
| Rotina | `#/rotina` | Treino, refeições (cardápio de espaço profundo) e hábitos |
| Diário | `#/diario` | Humor e anotações pessoais |
| Conquistas | `#/conquistas` | Nível, missão do dia, sequência com escudos, 10 selos, metas do time e resumo semanal |
| Painel da tripulação | `#/tripulacao` | Visão agregada do time |
| Painel do capitão | `#/comandante` | Fila de decisão, estado de cada tripulante e prontidão (só para o capitão) |

Também: interface em **7 idiomas** (pt, en, es, de, fr, it, ja), bateria do smartring na barra superior e dados de demonstração gerados por uma camada de *mock* que pode ser desligada na tela Hoje.

## Stack

- **Desktop**: Electron 30
- **Interface**: React 18, Vite (electron-vite), Tailwind CSS 3, Tremor e Recharts
- **Rotas**: React Router em modo hash (carrega por arquivo no Electron)
- **Internacionalização**: dicionários próprios com teste de paridade entre idiomas
- **Testes**: Vitest (regras de negócio e renderização no servidor das telas)
- **Dados de exemplo**: Python 3 + NeuroKit2 (opcional)
- **Empacotamento**: electron-builder

## Como rodar

Requisitos: Node.js 18 ou superior. Python 3.8+ só se for regenerar os dados de exemplo.

```bash
npm install

npm run dev       # desenvolvimento, com recarga automática
npm test          # testes (vitest)
npm run build     # compila para out/
npm start         # compila e abre o app compilado
npm run dist      # gera o instalador (.exe, .dmg, AppImage)

npm run mock:generate   # opcional: regenera os dados simulados em Python
```

Depois de mudar `src/main` ou `src/preload`, reinicie o `npm run dev`. O guia curto está em [INICIO_RAPIDO.md](INICIO_RAPIDO.md).

## Estrutura

```
src/
├── main/                  # Processo principal (Node): IPC, armazenamento em disco, privacidade
│   ├── index.js
│   ├── storage.js
│   ├── privacy-policy.js
│   └── data-source/       # Camada de dados (simulada hoje, anel depois)
├── preload/               # Canais IPC expostos ao renderer
├── renderer/              # React
│   ├── App.jsx            # Rotas e proteção de login
│   ├── pages/             # Uma tela por rota
│   ├── components/        # Barra superior, menu, cartões, bateria do anel...
│   ├── lib/               # Usuário, relógio, medidas, treino, comida, mock, conquistas, capitão
│   ├── data/              # Tripulação, indicadores, cenários, cardápio, equipamentos
│   └── i18n/              # Idiomas e testes de paridade e renderização
└── shared/rules/          # Regras de negócio em JavaScript puro, com testes
    ├── measures.js        # Validação, faixas, média de 3, massa, sequência de medidas
    ├── training.js        # Treino e sequência
    ├── food.js            # Alimentação
    ├── achievements.js    # Pontos, níveis, selos, missão do dia, metas do time
    ├── captain.js         # Estado da tripulação, escalação e prontidão
    ├── ring.js            # Estado do anel na sincronização
    ├── indicators.js
    └── alerts.js
docs/                      # Especificação, arquitetura e notas de pesquisa
tools/mock_data/           # Gerador de dados simulados (Python)
resources/                 # Ícones
```

## Regras de negócio

As regras ficam em módulos puros de `src/shared/rules/`, sem acesso a disco, cada um com seu teste. A especificação completa (RFs, RNs e requisitos não funcionais) está em [docs/ESPECIFICACAO.md](docs/ESPECIFICACAO.md) e a arquitetura em [docs/ARQUITETURA.md](docs/ARQUITETURA.md).

Exemplos:

- **RN02**: o estado geral é o pior estado entre os indicadores.
- **RN03**: um crítico isolado pede re-medição; só dois críticos seguidos escalam.
- **RN04**: o capitão recebe a escalação sem ver os valores.
- **RN06**: cada nível de acesso vê apenas o que lhe cabe (pessoal, comandante, time).
- **RN14**: sequências de hábito não quebram quando o anel está carregando.

## Privacidade e segurança

- `contextIsolation` ligado e nenhum Node no renderer.
- Canais IPC validados no processo principal.
- Nenhum envio externo: tudo roda offline, com dados em disco local.
- Privacidade em três níveis: pessoal, comandante (só estado) e time (só agregados).

## Limites conhecidos

- Papéis simulados em uma única máquina; a autenticação real fica para uma versão futura.
- O anel inteligente é simulado; a leitura real por Bluetooth é trabalho futuro.
- As faixas clínicas são ilustrativas e precisam de validação por profissional de saúde.
- As faixas ainda não variam por ambiente (estação, Lua, Marte) em todas as telas, e `shared/rules/indicators.js` tem 3 testes falhando por isso.
- Os valores de alimentação são provisórios.

## Referências

- [NASA Human Research Program](https://www.nasa.gov/hrp/)
- [Cinco riscos do voo espacial humano](https://www.nasa.gov/hrp/hazards/)
- [Open Science Data Repository (OSDR)](https://osdr.nasa.gov/)

---

**Desenvolvido por** Vento Norte UEA · **Desafio**: NASA Space Apps Challenge 2026

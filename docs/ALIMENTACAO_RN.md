# Regras de negócio da alimentação (RN15–RN22)

Pesquisa e análise das regras do registro de alimentação do Diário de bordo.
Implementação: `src/shared/rules/food.js` (testes em `food.test.js`) e `src/renderer/data/cardapio.js`.

## 1. O que a pesquisa confirmou

| Fato | Fonte | Vira a regra |
|------|-------|--------------|
| Em um dia típico, a tripulação tem tempo programado para **café da manhã, almoço e jantar**, "excluindo lançamento e reentrada". Para essas duas fases a página não dá horário de refeição e diz que a comida "precisa estar pronta para comer". | [NASA, Artemis II: What's on the Menu?](https://www.nasa.gov/missions/artemis/artemis-ii/artemis-ii-whats-on-the-menu) | RN15, RN20 |
| "Cada astronauta tem direito a **duas bebidas saborizadas por dia**, que podem incluir café." O café entra na conta. | mesma página | RN18 (responde a pergunta 2 do plano) |
| O dispensador de água potável da Orion "não está disponível em algumas fases, incluindo lançamento e pouso". As refeições são aquecidas em um aquecedor portátil. | mesma página | RN20 |
| Não há comida fresca: a Orion não tem refrigeração. Os alimentos são prontos, reidratáveis, termoestabilizados ou irradiados. Dois a três dias de comida por tripulante vão juntos em um único contêiner. | mesma página | RN21 |
| O cardápio do Artemis II tem **189 itens**, mais de 10 tipos de bebida e **58 tortilhas**. As tortilhas aparecem como o item mais comum. Há bebidas "de café da manhã" (achocolatado, baunilha, morango). | [Infográfico oficial da NASA (PDF)](https://www.nasa.gov/wp-content/uploads/2026/03/np-2026-01-001-jsc-artemis-ii-crew-menu-infographic-3-06-26.pdf) | RN16 (tortilha serve a toda refeição) |
| Pão comum fica de fora a bordo porque as migalhas flutuam; tortilhas são a base. | [Solving Space: Tortillas](https://spacecenter.org/solving-space-tortillas/) e a planilha `cardapio_espaco_profundo.xlsx` | RN22 |
| O cardápio padrão da ISS tem cerca de 200 itens em 8 categorias, em ciclo de 16 dias. A meta de energia da NASA-STD-3001 é de cerca de 3.035 kcal por dia por tripulante. | [NASA, ISS Food System Overview](https://ntrs.nasa.gov/api/citations/20250004456/downloads/ISS%20Food%20System%20Overview%20-%20ION%20052025.pdf) e [NASA-STD-3001, resumo técnico](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-013-food-and-nutrition.pdf), pelo resumo da busca | fora de escopo (a planilha não tem calorias) |

## 2. O que a pesquisa NÃO encontrou

A NASA **não publica qual item vai em qual refeição nem quantos por refeição**. A página e o infográfico do Artemis II listam os itens sem associá-los a refeições. A escolha é da tripulação, com apoio de nutricionistas.

Por isso **RN16 e RN17 são propostas do time**, derivadas das categorias da planilha. Elas precisam de validação por nutrição antes de qualquer uso real. Todos os números ficam em arquivo (`MEAL_CAPS`, `MEAL_MAX_ENTRIES`, `FOOD_LIMITS` em `food.js` e `refeicoes` em `cardapio.js`).

## 3. As regras

| RN | Regra | Base | Onde |
|----|-------|------|------|
| RN15 | **Refeições programadas.** Café, almoço e jantar valem **1 registro por dia** cada; o lanche, até 2. Em lançamento e reentrada não há refeição programada: só o lanche com itens prontos. | Confirmada (NASA) para as fases; o limite de registros é proposta | `MEAL_MAX_ENTRIES`, `mealNotices` |
| RN16 | **O item combina com a refeição.** Cada item tem a lista de refeições em que serve. Fora dela, o seletor esconde o item (há "mostrar itens de outras refeições") e, se registrado, gera aviso. | Proposta | `refeicoes` no cardápio |
| RN17 | **Composição da refeição.** Teto de porções por categoria em cada refeição (por exemplo, 1 prato principal no almoço e no jantar; até 3 itens de café e lanches no café). Passou do teto, gera aviso. | Proposta | `MEAL_CAPS` |
| RN18 | **Bebidas saborizadas:** 2 por dia por astronauta, incluindo café, chá e achocolatado. 2ª bebida avisa "última de hoje"; 3ª avisa e registra. | Confirmada (Artemis II) | `FOOD_LIMITS` |
| RN19 | **Sobremesas:** limite diário por pessoa (valor provisório: 2), 1 por refeição, aviso de 3 dias seguidos acima do limite e aviso de estoque coletivo baixo. | Limite provisório; o resto é proposta | `FOOD_LIMITS` |
| RN20 | **Fase da missão.** Em lançamento e reentrada, só itens prontos (sem água nem aquecimento). Em órbita, tudo. | Confirmada (NASA e planilha) | `unavailableReasons` |
| RN21 | **Estoque.** Pratos principais e sobremesas são finitos e coletivos (sem refrigeração e sem nave de reposição). O estoque do time aparece sem nomes. | Confirmada na lógica; as quantidades são provisórias | `remainingStock` |
| RN22 | **Pão comum é proibido** (migalhas). Item livre "pão" gera aviso. | Confirmada (planilha e NASA) | `isBread` |

**Decisão de projeto:** o diário registra a realidade. Nenhuma regra bloqueia o registro: o item fora da regra aparece tracejado, com o motivo escrito e a opção "registrar mesmo assim", e o aviso fica no histórico (ícone, texto e cor).

## 4. Matriz refeição × categoria (RN16)

| Categoria | Café | Almoço | Jantar | Lanche |
|-----------|:----:|:------:|:------:|:------:|
| Pratos principais | | ✔ | ✔ | |
| Acompanhamentos e bases | | ✔ | ✔ | |
| Tortilhas (exceção: base de tudo) | ✔ | ✔ | ✔ | ✔ |
| Café da manhã e lanches (ovos, salsichas, aveia, granola, cereal) | ✔ | | | |
| Café da manhã e lanches (amêndoas, castanhas de caju) | ✔ | | | ✔ |
| Sobremesas | | ✔ | ✔ | ✔ |
| Muffin (exceção) | ✔ | | | ✔ |
| Bebidas | ✔ | ✔ | ✔ | ✔ |

Tetos por refeição (RN17): café (café e lanches 3, acompanhamento 1, sobremesa 1, bebida 2); almoço e jantar (principal 1, acompanhamento 2, sobremesa 1, bebida 2); lanche (café e lanches 2, acompanhamento 1, sobremesa 1, bebida 1).

## 5. Perguntas para a nutrição e o time médico

1. A divisão por refeição (matriz acima) e os tetos por categoria estão adequados?
2. Café, almoço e jantar de fato valem 1 registro por dia, ou a tripulação pode dividir em mais momentos?
3. Qual o limite diário de sobremesas (por unidade ou por gramas) e o mínimo de estoque coletivo?
4. Quais itens são prontos, quais pedem água e quais pedem aquecimento? (a coluna `preparo` do cardápio é hipótese)
5. Qual o estoque inicial por item?
6. Os itens de condimento do Artemis II (xarope de bordo, mel, pasta de amendoim, molhos) entram no registro?

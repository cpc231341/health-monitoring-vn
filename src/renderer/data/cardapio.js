// Cardápio de espaço profundo (docs/cardapio_espaco_profundo.xlsx): 28 itens em 5 categorias.
// A planilha só traz categoria, ingredientes e restrições. As colunas `preparo` e `estoqueInicial` ainda
// NÃO existem nela: os valores abaixo são provisórios (hipótese do plano, perguntas 1 e 4) e devem ser
// corrigidos aqui quando o time definir. Os nomes ficam em i18n: food.items.<id>.
//
// preparo: 'pronto' (sem água nem calor) | 'agua' | 'aquece'
// saborizada: conta nas 2 bebidas saborizadas por dia (as 6 contam: no Artemis II o café entra nas 2)
// estoqueInicial: porções do time inteiro (null = sem controle de estoque)
// refeicoes: refeições em que o item combina (RN16). Padrão por categoria; alguns itens têm exceção.
const ALL_MEALS = ['cafe', 'almoco', 'jantar', 'lanche'];
const MEALS_BY_CATEGORY = {
  principal: ['almoco', 'jantar'],
  acompanhamento: ['almoco', 'jantar'],
  'cafe-lanche': ['cafe', 'lanche'],
  sobremesa: ['almoco', 'jantar', 'lanche'],
  bebida: ALL_MEALS
};
const item = (id, categoria, preparo, extra = {}) => ({ id, categoria, preparo, saborizada: false, estoqueInicial: null, refeicoes: MEALS_BY_CATEGORY[categoria], ...extra });

export const CARDAPIO = [
  // Prato principal: sem refrigeração e sem nave de reposição, então o estoque é finito e coletivo
  item('brisket', 'principal', 'aquece', { estoqueInicial: 12 }),
  item('macarrao-queijo', 'principal', 'aquece', { estoqueInicial: 12 }),
  item('quiche-vegetais', 'principal', 'aquece', { estoqueInicial: 12 }),
  item('curry-camarao', 'principal', 'aquece', { estoqueInicial: 12 }),
  item('mordidas-salmao', 'principal', 'aquece', { estoqueInicial: 12 }),
  // Acompanhamentos e bases (pão comum é proibido: migalhas flutuantes)
  item('tortilhas', 'acompanhamento', 'pronto', { refeicoes: ALL_MEALS }), // a base de tudo a bordo: serve a qualquer refeição
  item('cuscuz-castanhas', 'acompanhamento', 'agua'),
  item('brocolis-gratinado', 'acompanhamento', 'aquece'),
  item('vagem-apimentada', 'acompanhamento', 'aquece'),
  item('abobora', 'acompanhamento', 'aquece'),
  // Café da manhã e lanches
  item('ovos-mexidos', 'cafe-lanche', 'agua', { refeicoes: ['cafe'] }),
  item('salsichas', 'cafe-lanche', 'aquece', { refeicoes: ['cafe'] }),
  item('aveia', 'cafe-lanche', 'agua', { refeicoes: ['cafe'] }),
  item('granola-mirtilo', 'cafe-lanche', 'agua', { refeicoes: ['cafe'] }),
  item('cereal-morango', 'cafe-lanche', 'agua', { refeicoes: ['cafe'] }),
  item('amendoas', 'cafe-lanche', 'pronto'),
  item('castanha-caju', 'cafe-lanche', 'pronto'),
  // Sobremesas: itens calóricos extras, com espaço limitado
  item('pudim', 'sobremesa', 'agua', { estoqueInicial: 6 }),
  item('bolo', 'sobremesa', 'pronto', { estoqueInicial: 6 }),
  item('biscoito-bordo', 'sobremesa', 'pronto', { estoqueInicial: 6 }),
  item('muffin', 'sobremesa', 'pronto', { estoqueInicial: 6, refeicoes: ['cafe', 'lanche'] }),
  item('chocolate', 'sobremesa', 'pronto', { estoqueInicial: 6 }),
  // Bebidas: 2 saborizadas por dia por astronauta
  item('cafe', 'bebida', 'agua', { saborizada: true }),
  item('cha-verde', 'bebida', 'agua', { saborizada: true }),
  item('smoothie', 'bebida', 'agua', { saborizada: true }),
  item('limonada', 'bebida', 'agua', { saborizada: true }),
  item('cidra', 'bebida', 'agua', { saborizada: true }),
  item('achocolatado', 'bebida', 'agua', { saborizada: true })
];

// Renderiza as telas em todos os idiomas e procura erros e textos sem tradução
// (uma chave como "today.greeting" aparecendo na tela é sinal de tradução faltando).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { I18nProvider, LANGS, makeI18n } from './index.jsx';
import { UserProvider } from '../lib/user.jsx';
import { DemoProvider } from '../lib/demo.jsx';
import { SCENARIOS, ENVIRONMENTS } from '../data/hoje.js';
import Hoje, { alertFor, compute } from '../pages/Hoje.jsx';
import Agenda from '../pages/Agenda.jsx';
import Recomendacao from '../pages/Recomendacao.jsx';
import Diario from '../pages/Diario.jsx';
import Login from '../pages/Login.jsx';
import Indicadores from '../pages/Indicadores.jsx';
import PainelTripulacao from '../pages/PainelTripulacao.jsx';
import SelecionarTime from '../pages/SelecionarTime.jsx';
import Tripulantes from '../pages/Tripulantes.jsx';
import Rotina from '../pages/Rotina.jsx';
import Medir from '../pages/Medir.jsx';
import Conquistas from '../pages/Conquistas.jsx';
import Comandante from '../pages/Comandante.jsx';
import Sincronizar from '../pages/Sincronizar.jsx';
import MissionDialog from '../components/MissionDialog.jsx';
import LinkStatus from '../components/LinkStatus.jsx';

// Gráficos dependem de medidas reais de tela; aqui só interessa o texto.
vi.mock('@tremor/react', () => ({
  ProgressBar: () => null,
  SparkAreaChart: () => null,
  SparkBarChart: () => null,
  SparkLineChart: () => null
}));
vi.mock('recharts', () => {
  const Null = () => null;
  return { Bar: Null, CartesianGrid: Null, Cell: Null, ComposedChart: Null, Line: Null, Area: Null, ReferenceArea: Null, ReferenceDot: Null, ResponsiveContainer: Null, Tooltip: Null, XAxis: Null, YAxis: Null };
});

// Qualquer chave de i18n que apareça escrita na tela (ex.: "today.greeting").
const TOP = 'lang|brand|status|time|src|when|nav|team|crew|pickTeam|pickCrew|mission|link|soon|names|cards|scenarios|environments|agenda|agendaPage|today|ind|panel|clock|topbar|notif|account|login|rec|diary|food|measure|gm|cap|syncPage';
const LEAKED = new RegExp(`(?<![\\w-])(?:${TOP})\\.[A-Za-z][\\w.-]*`, 'g');

const ROUTES = {
  '/': () => <SelecionarTime />,
  '/tripulantes': () => <Tripulantes />,
  '/login/cristiano': () => <Routes><Route path="/login/:key" element={<Login />} /></Routes>,
  '/hoje': () => <Hoje />,
  '/agenda': () => <Agenda />,
  '/recomendacao': () => <Recomendacao />,
  '/recomendacao?ind=gl': () => <Recomendacao />,
  '/diario': () => <Diario />,
  '/diario?aba=alimentacao&refeicao=cafe': () => <Diario />,
  '/tripulacao': () => <PainelTripulacao />,
  '/medir': () => <Medir />,
  '/medir?registrar=pa': () => <Medir />,
  '/medir?registrar=gl': () => <Medir />,
  '/medir?registrar=kg': () => <Medir />,
  '/conquistas': () => <Conquistas />,
  '/rotina': () => <Rotina />,
  '/comandante': () => <Comandante />,
  '/mission': () => <MissionDialog onClose={() => {}} />,
  '/link': () => <LinkStatus />,
  ...Object.fromEntries(['pa', 'fc', 'gl', 'tc', 'sn', 'hu'].map((id) => [`/indicadores?ind=${id}`, () => <Indicadores />]))
};

function renderAt(lang, url, element, demo) {
  globalThis.localStorage = { getItem: (k) => (k === 'vn.lang' ? lang : null), setItem() {} };
  return renderToString(
    <I18nProvider>
      <UserProvider>
        <DemoProvider initial={demo}>
          <StaticRouter location={url}>{element}</StaticRouter>
        </DemoProvider>
      </UserProvider>
    </I18nProvider>
  );
}

const text = (html) => html.replace(/<[^>]+>/g, ' ');

describe('telas em todos os idiomas', () => {
  for (const { code } of LANGS) {
    for (const [url, make] of Object.entries(ROUTES)) {
      it(`${code} ${url}: renderiza sem erro e sem chave solta`, () => {
        const html = renderAt(code, url, make());
        expect(html.length).toBeGreaterThan(200);
        // atributos (aria-label, title, alt) também contam
        const leaked = html.match(LEAKED) || [];
        expect(leaked).toEqual([]);
        expect(text(html)).not.toMatch(/undefined|NaN|\[object Object\]/);
      });
    }

    it(`${code}: alertas de todos os cenários e ambientes`, () => {
      const i18n = makeI18n(code);
      const seen = [];
      for (const [sk, sc] of Object.entries(SCENARIOS)) {
        for (const [ek, ev] of Object.entries(ENVIRONMENTS)) {
          const R = compute(sc, ev, i18n);
          const a = alertFor(R, sc, i18n.t(`environments.${ek}.delay`), i18n);
          const blob = JSON.stringify([R, a]);
          expect(blob.match(LEAKED) || []).toEqual([]);
          expect(blob).not.toMatch(/undefined|NaN/);
          if (a) seen.push(`${sk}/${ek}: ${a.title}`);
        }
      }
      expect(seen.length).toBeGreaterThan(0);
    });
  }

  it('o idioma muda mesmo o texto da tela', () => {
    const pattern = /Crew panel|Painel da tripulação|Panel de la tripulación|Crew-Panel|Tableau de l.équipage|Pannello equipaggio|クルーパネル/;
    const titles = LANGS.map(({ code }) => text(renderAt(code, '/tripulacao', <PainelTripulacao />)).match(pattern)?.[0]);
    expect(titles.filter(Boolean).length).toBe(LANGS.length);
  });

  it('o detector de chave solta funciona', () => {
    expect('<span>today.greeting</span>'.match(LEAKED)).toEqual(['today.greeting']);
    expect('<b>ind.pa.msg.ok</b> e nav.today'.match(LEAKED)).toEqual(['ind.pa.msg.ok', 'nav.today']);
    expect('Suspended today: rest. mSv/day.'.match(LEAKED)).toBeNull();
  });

  it('o seletor de idioma aparece nas telas de entrada e na barra lateral', () => {
    for (const url of ['/', '/tripulantes', '/hoje']) {
      const html = renderAt('en', url, url === '/' ? <SelecionarTime /> : url === '/hoje' ? <Hoje /> : <Tripulantes />);
      expect(html).toContain('aria-haspopup="listbox"');
      // bandeira SVG do idioma atual aparece no botão
      expect(html).toContain('title="English"');
    }
    // o idioma salvo aparece no botão
    expect(renderAt('de', '/', <SelecionarTime />)).toContain('title="Deutsch"');
    expect(renderAt('ja', '/', <SelecionarTime />)).toContain('title="日本語"');
  });

  it('formata números e horas conforme o idioma', () => {
    expect(makeI18n('pt').num(36.6, 1)).toBe('36,6');
    expect(makeI18n('en').num(36.6, 1)).toBe('36.6');
    expect(makeI18n('de').num(36.6, 1)).toBe('36,6');
    expect(makeI18n('en').hm(7.3333)).toBe('7 h 20');
    expect(makeI18n('de').hm(6.8)).toBe('6 Std. 48 Min.');
  });

  it('barra lateral: tem Agenda e Recomendação, é retrátil e não tem cadastro nem o ícone de informações', () => {
    const html = renderAt('pt', '/hoje', <Hoje />);
    expect(html).toContain('href="/agenda"');
    expect(html).toContain('href="/recomendacao"');
    expect(html).not.toContain('/cadastro');
    expect(html).toContain('aria-label="Recolher menu"');
    // o cartão do time não tem mais o ícone (i) ao lado
    const team = html.slice(html.indexOf('aria-label="Abrir informações da missão"'), html.indexOf('aria-label="Abrir informações da missão"') + 900);
    expect(team).not.toMatch(/<svg[^>]*class="flex-none ml-auto"/);
    expect(team).toContain('ID da Missão: #102');
  });

  it('todas as telas internas mostram dia da missão, horário e a conta conectada (na barra lateral)', () => {
    for (const url of ['/hoje', '/agenda', '/indicadores?ind=pa', '/recomendacao', '/diario', '/tripulacao']) {
      const Page = { '/hoje': Hoje, '/agenda': Agenda, '/indicadores?ind=pa': Indicadores, '/recomendacao': Recomendacao, '/diario': Diario, '/tripulacao': PainelTripulacao }[url];
      const html = renderAt('pt', url, <Page />);
      expect(html).toMatch(/role="timer" aria-label="Dia da missão 47, \d\d:\d\d"/);
      expect(html).toContain('Cristiano Peniche</span><span class="text-[13px] text-vn-muted">Capitão');
      expect(html).toContain('aria-label="Notificações do time');
      expect(html).toContain('aria-label="Estação de gravidade"');
      expect(html).toContain('aria-label="Conexão com a Terra: Conectado à base');
    }
  });

  it('o aviso legal aparece no rodapé das telas', () => {
    for (const [url, el] of [['/', <SelecionarTime />], ['/tripulantes', <Tripulantes />], ['/hoje', <Hoje />], ['/agenda', <Agenda />]]) {
      expect(renderAt('pt', url, el)).toContain('NeuroKit2 e IA do Claude Code');
    }
  });

  it('Hoje não traz mais a agenda nem o cartão de ambiente; a agenda tem aba própria', () => {
    const hoje = renderAt('pt', '/hoje', <Hoje />);
    expect(hoje).not.toContain('Marcar como feito');
    expect(hoje).not.toContain('Ambiente: Estação espacial');
    const agenda = renderAt('pt', '/agenda', <Agenda />);
    expect(agenda).toContain('Marcar como feito: Café da manhã');
  });

  it('os indicadores têm títulos objetivos e o "por que importa" fica no modal de informações', () => {
    const hoje = renderAt('pt', '/hoje', <Hoje />);
    for (const name of ['Horas de sono', 'Glicemia em jejum', 'Frequência cardíaca em repouso']) expect(hoje).toContain(name);
    expect(hoje).toContain('aria-label="Por que Horas de sono importa"');
    const ind = renderAt('pt', '/indicadores?ind=pa', <Indicadores />);
    expect(ind).not.toContain('Por que importa');
    expect(ind).not.toContain('Uma medição isolada diz pouco');
    expect(ind).toContain('aria-label="Por que Pressão arterial importa"');
  });

  it('a Recomendação é um passo a passo em 4 etapas', () => {
    const html = renderAt('pt', '/recomendacao', <Recomendacao />);
    for (const n of [1, 2, 3, 4]) expect(html).toContain(`Passo ${n}`);
    expect(html).toContain('Meça o que a rotina pede');
    expect(html).not.toMatch(/guia de ação/i);
  });

  it('o diário é privado, tem as 5 carinhas de humor e orientações de como medir', () => {
    const html = renderAt('pt', '/diario', <Diario />);
    expect(html).toContain('Registro privado');
    expect(html).toContain('Dado altamente sensível: ocultar o texto');
    expect(html.match(/aria-pressed="false"/g).length).toBeGreaterThanOrEqual(5);
    expect(html).not.toContain('Como medir');
    expect(renderAt('pt', '/medir', <Medir />)).toContain('Pressão arterial');
  });

  it('o login mostra o astronauta escolhido e pede a senha', () => {
    const html = renderAt('pt', '/login/rita', <Routes><Route path="/login/:key" element={<Login />} /></Routes>);
    expect(html).toContain('Entrar como Rita');
    expect(html).toContain('type="password"');
    expect(html).toContain('Rita de Cássia');
    expect(html).not.toContain('Protótipo');
    expect(html).not.toContain('qualquer senha');
  });

  it('a sincronização vem depois da senha: busca o anel em 3 passos e só então libera a entrada', () => {
    const user = { vn_session: 'cristiano' };
    globalThis.window = { sessionStorage: { getItem: (k) => (k === 'vn.session' ? user.vn_session : null), setItem() {}, removeItem() {} }, localStorage: { getItem: () => null, setItem() {} } };
    try {
      const html = renderAt('pt', '/sincronizar', <Sincronizar />);
      expect(html).toContain('Olá, Cristiano');
      expect(html).toContain('Sincronizar o anel');
      expect(html).toContain('Procurando o anel');
      expect(html).toContain('Baixando as leituras desde a última sincronização');
      expect(html).toContain('Conferindo as medidas de hoje');
      expect(html).toContain('Bateria 64%');
      expect(html).toContain('Pular por agora');
      // a entrada só libera quando termina
      expect(html).toMatch(/<button[^>]*disabled[^>]*>Entrar no painel/);
      for (const code of ['en', 'es', 'de', 'fr', 'it', 'ja']) {
        const h = renderAt(code, '/sincronizar', <Sincronizar />);
        expect(h.match(LEAKED) || []).toEqual([]);
        expect(h).not.toContain('{n}');
      }
      expect(renderAt('en', '/sincronizar', <Sincronizar />)).toContain('Sync the ring');
    } finally {
      delete globalThis.window;
    }
  });

  it('a barra do topo mostra a bateria do anel e leva à sincronização', () => {
    const html = renderAt('pt', '/hoje', <Hoje />);
    expect(html).toContain('Bateria do anel: 64%. Abrir a sincronização');
    expect(html).toContain('href="/sincronizar"');
    expect(html).toMatch(/>64(<!-- -->)?%</);
    expect(renderAt('en', '/hoje', <Hoje />)).toContain('Ring battery: 64%. Open sync');
  });

  it('sem sessão, a sincronização manda de volta para a escolha do time', () => {
    const html = renderAt('pt', '/sincronizar', <Sincronizar />);
    expect(html).not.toContain('Sincronizar o anel');
  });

  it('o painel da tripulação não traz mais o rótulo do time nem a métrica de bordo/EVA', () => {
    const html = renderAt('pt', '/tripulacao', <PainelTripulacao />);
    expect(html).not.toContain('todos veem este painel');
    expect(html).not.toContain('a bordo');
    expect(html).not.toContain('border-dashed');
  });

  it('o lobby não mostra mais as funções de bordo e a criação de missão exige a duração', () => {
    expect(renderAt('pt', '/tripulantes', <Tripulantes />)).not.toMatch(/Funções de bordo/i);
    expect(renderAt('pt', '/tripulantes', <Tripulantes />)).toContain('Especialista em missão');
  });

  it('a Rotina mostra o treino do dia, a sequência e os pontos', () => {
    const html = renderAt('pt', '/rotina', <Rotina />);
    expect(html).toContain('Rotina e treino');
    expect(html).toContain('Rotina de hoje');
    expect(html).toContain('Corpo inteiro B');
    expect(html).toContain('Iniciar treino');
    expect(html).toContain('Personalizar treino');
    expect(html).toContain('Sequência');
    expect(html).toContain('Pontos');
    // sono curto no dia comum: treino 30% mais leve
    expect(html).toContain('Sono curto: o treino de hoje vem 30% mais leve.');
    expect(html).toContain('Nenhum treino salvo ainda.');
  });

  it('a Agenda mostra o treino planejado de verdade', () => {
    const html = renderAt('pt', '/agenda', <Agenda />);
    expect(html).toContain('Corpo inteiro B · 4 exercícios · 30% menos repetições');
  });

  it('Alimentação: aba no Diário com fase, contadores, avisos, cardápio, estoque e histórico', () => {
    const html = renderAt('pt', '/diario?aba=alimentacao&refeicao=jantar', <Diario />);
    expect(html).toContain('role="tablist"');
    expect(html).toContain('Humor e anotações');
    expect(html).toMatch(/Fase.*Órbita/);
    expect(html).toContain('Todos os itens do cardápio estão disponíveis.');
    expect(html).toContain('Bebidas saborizadas');
    expect(html).toContain('0 de 2');
    expect(html).toContain('Registrar refeição');
    expect(html).toContain('restam 2 hoje');
    expect(html).toContain('Estoque do time');
    expect(html).toContain('Nenhum registro hoje.');
    // categorias em dropdown: a primeira vem aberta, as outras mostram só o título
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('Peito bovino defumado (brisket)');
    expect(html).not.toContain('Smoothie de manga e pêssego');
    const bebidas = renderAt('pt', '/diario?aba=alimentacao&refeicao=jantar&categoria=bebida', <Diario />);
    expect(bebidas).toContain('Smoothie de manga e pêssego');
    expect(bebidas).not.toContain('Peito bovino defumado (brisket)');
    const sobremesas = renderAt('pt', '/diario?aba=alimentacao&refeicao=jantar&categoria=sobremesa', <Diario />);
    expect(sobremesas).toContain('Biscoito de creme de bordo');
    expect(sobremesas).toContain('Você já comeu 0 de 2 sobremesas hoje.');
    // o Diário continua com humor e anotações, escondido nesta aba
    expect(html).toContain('id="panel-humor"');
  });

  it('Alimentação: no lançamento os itens que pedem água ou calor ficam tracejados, com o motivo', () => {
    const html = renderAt('pt', '/diario?aba=alimentacao&refeicao=jantar', <Diario />, { fase: 'lancamento' });
    expect(html).toMatch(/Fase.*Lançamento/);
    expect(html).toContain('Dispensador de água desligado');
    expect(html).toContain('precisa de aquecimento, indisponível nesta fase');
    expect(html).toContain('border-dashed');
    expect(html).toContain('Registrar mesmo assim');
    const bebidas = renderAt('pt', '/diario?aba=alimentacao&refeicao=jantar&categoria=bebida', <Diario />, { fase: 'lancamento' });
    expect(bebidas).toContain('precisa de água, dispensador desligado');
  });

  it('Alimentação: cada refeição mostra só as categorias e itens que combinam com ela', () => {
    const cafe = renderAt('pt', '/diario?aba=alimentacao&refeicao=cafe&categoria=cafe-lanche', <Diario />);
    for (const name of ['Ovos mexidos', 'Cereal de morango com lavanda', 'Granola com mirtilo']) expect(cafe).toContain(name);
    for (const title of ['Acompanhamentos e bases', 'Café da manhã e lanches', 'Sobremesas', 'Bebidas']) expect(cafe).toContain(title);
    expect(cafe).not.toContain('id="cat-principal"');
    expect(cafe).toContain('até 3 nesta refeição');
    expect(cafe).toContain('Mostrar itens de outras refeições');
    expect(renderAt('pt', '/diario?aba=alimentacao&refeicao=cafe&categoria=sobremesa', <Diario />)).toContain('Muffin');
    expect(renderAt('pt', '/diario?aba=alimentacao&refeicao=cafe&categoria=sobremesa', <Diario />)).not.toContain('Pudim');

    const jantar = renderAt('pt', '/diario?aba=alimentacao&refeicao=jantar', <Diario />);
    for (const title of ['Pratos principais', 'Acompanhamentos e bases', 'Sobremesas', 'Bebidas']) expect(jantar).toContain(title);
    expect(jantar).not.toContain('id="cat-cafe-lanche"');
    expect(jantar).toContain('até 1 nesta refeição');
    expect(jantar).toContain('Curry de camarão');
    expect(renderAt('pt', '/diario?aba=alimentacao&refeicao=jantar&categoria=acompanhamento', <Diario />)).toContain('Brócolis gratinado');

    const lanche = renderAt('pt', '/diario?aba=alimentacao&refeicao=lanche&categoria=cafe-lanche', <Diario />);
    for (const name of ['Amêndoas', 'Castanhas de caju']) expect(lanche).toContain(name);
    expect(lanche).not.toContain('Ovos mexidos');
    expect(lanche).not.toContain('id="cat-principal"');
  });

  it('Alimentação: no lançamento só o lanche é programado', () => {
    const jantar = renderAt('pt', '/diario?aba=alimentacao&refeicao=jantar', <Diario />, { fase: 'lancamento' });
    expect(jantar).toContain('não há refeição programada');
    const lanche = renderAt('pt', '/diario?aba=alimentacao&refeicao=lanche', <Diario />, { fase: 'lancamento' });
    expect(lanche).not.toContain('não há refeição programada');
  });

  it('Alimentação: cartão no Hoje, links da Agenda e estoque no painel da tripulação', () => {
    const hoje = renderAt('pt', '/hoje', <Hoje />);
    expect(hoje).toContain('href="/diario?aba=alimentacao"');
    expect(hoje).toContain('Sobremesas');
    expect(hoje).toContain('Fase');
    expect(hoje).toContain('Lançamento');
    const agenda = renderAt('pt', '/agenda', <Agenda />);
    expect(agenda).toContain('/diario?aba=alimentacao&amp;refeicao=cafe');
    expect(agenda).toContain('/diario?aba=alimentacao&amp;refeicao=almoco');
    const painel = renderAt('pt', '/tripulacao', <PainelTripulacao />);
    expect(painel).toContain('Estoque do time · Pratos principais');
    expect(painel).toContain('Estoque do time · Sobremesas');
    expect(painel).not.toContain('Rita de Cássia: ');
  });


  it('Medir agora: registrar pressão, glicose e peso, por que medir e os registros pessoais', () => {
    const html = renderAt('pt', '/medir', <Medir />);
    expect(html).toContain('Registrar agora');
    for (const name of ['Pressão arterial', 'Glicemia em jejum', 'Peso corporal']) expect(html).toContain(name);
    expect(html).toContain('aria-label="Registrar: Pressão arterial"');
    expect(html).toContain('aria-label="Registrar: Glicemia em jejum"');
    expect(html).toContain('aria-label="Registrar: Peso corporal"');
    expect(html).toContain('Por que medir pressão, glicose e peso');
    expect(html).toContain('O anel mede frequência cardíaca, temperatura e sono sozinho.');
    expect(html).toContain('A gente não mede para ser julgado');
    expect(html).toContain('1 vez por dia, antes do café da manhã');
    expect(html).toContain('Seus registros');
    expect(html).toContain('profissional de saúde');
    // o que a tela já tinha continua: equipamentos usados no espaço
    expect(html).toContain('Tempus Pro (kit CHeCS)');
  });

  it('Registro rápido: um campo para glicose e massa, dois para pressão, com o aparelho e a dica de 20 segundos', () => {
    const pa = renderAt('pt', '/medir?registrar=pa', <Medir />);
    expect(pa).toContain('role="dialog"');
    expect(pa).toContain('Registrar Pressão arterial');
    expect(pa).toContain('Sistólica (máxima)');
    expect(pa).toContain('Diastólica (mínima)');
    expect(pa).toContain('Registrar leva 20 segundos');
    expect(pa).toContain('<option value="tempus"');
    expect(pa).toContain('Salvar medida');
    const gl = renderAt('pt', '/medir?registrar=gl', <Medir />);
    expect(gl).toContain('Glicose (mg/dL)');
    expect(gl).not.toContain('Sistólica');
    expect(gl).toContain('<option value="istat"');
    const kg = renderAt('pt', '/medir?registrar=kg', <Medir />);
    expect(kg).toContain('Massa (kg)');
    expect(kg).toContain('<option value="slammd"');
  });

  it('Hoje e Indicadores têm o botão Registrar; a Agenda lembra as 3 medidas no horário', () => {
    const hoje = renderAt('pt', '/hoje', <Hoje />);
    expect(hoje).toContain('aria-label="Registrar: Pressão arterial"');
    expect(hoje).toContain('aria-label="Registrar: Glicemia em jejum"');
    expect(hoje).toContain('aria-label="Registrar: Peso corporal"');
    const ind = renderAt('pt', '/indicadores?ind=pa', <Indicadores />);
    expect(ind).toContain('aria-label="Registrar: Pressão arterial"');
    expect(ind).toContain('Seus registros');
    const gl = renderAt('pt', '/indicadores?ind=gl', <Indicadores />);
    expect(gl).toContain('Seus registros');
    const agenda = renderAt('pt', '/agenda', <Agenda />);
    for (const item of ['Medir pressão arterial', 'Medir glicose em jejum', 'Medir peso (massa)']) expect(agenda).toContain(item);
    expect(agenda).not.toContain('Medir pressão e peso');
    for (const k of ['pa', 'gl', 'kg']) expect(agenda).toContain('/medir?registrar=' + k);
    expect(agenda).toContain('Em jejum, antes do café da manhã');
  });

  it('Conquistas: sequência de dias com as 3 medidas e dos últimos 14 dias, sem cobrança', () => {
    const html = renderAt('pt', '/conquistas', <Conquistas />);
    expect(html).toContain('Sequência de medidas');
    expect(html).toContain('0 dias seguidos');
    expect(html).toContain('Últimos 14 dias');
    expect(html).toContain('Dia sem registro não vira bronca');
    expect((html.match(/de 3 medidas/g) || []).length).toBe(14);
    expect(html).not.toContain('Esta tela ainda não foi construída');
  });

  it('Conquistas: nível, missão do dia, escudos, selos, metas do time e semana, sem ranking', () => {
    const html = renderAt('pt', '/conquistas', <Conquistas />);
    expect(html).toContain('Premia o hábito, não o valor medido. Aqui você só se compara a você mesmo.');
    expect(html).toMatch(/Cadete/);
    expect(html).toContain('Faltam 50 pontos para Tripulante');
    expect(html).toContain('Como ganhar pontos');
    expect(html).toContain('Missão do dia');
    for (const item of ['Registrar pressão, glicose e peso', 'Registrar o humor']) expect(html).toContain(item);
    expect(html).toContain('/medir');
    expect(html).toContain('/diario');
    expect(html).toContain('Sequência de missões');
    expect(html).toContain('Escudos: 2 de 2 neste mês');
    expect(html).toContain('Selos');
    expect(html).toContain('dias seguidos de medidas');
    expect(html).toContain('Metas do time');
    expect(html).toContain('Só totais da tripulação: sem nomes, sem valores e sem ranking.');
    expect(html).toContain('Sua semana');
    expect(html).toContain('Comparada só com a sua semana anterior.');
    expect(html).not.toMatch(/ranking:|posição|1º lugar/i);
  });

  it('Conquistas: todas as línguas mostram os textos da gamificação, sem chave escrita', () => {
    for (const code of ['en', 'es', 'de', 'fr', 'it', 'ja']) {
      const html = renderAt(code, '/conquistas', <Conquistas />);
      expect(html.match(LEAKED) || []).toEqual([]);
      expect(html).not.toContain('{n}');
      expect(html).not.toContain('{left}');
    }
    expect(renderAt('en', '/conquistas', <Conquistas />)).toContain('Daily mission');
    expect(renderAt('ja', '/conquistas', <Conquistas />)).toContain('今日のミッション');
  });

  it('Painel do capitão: estado de cada tripulante, fila de decisão vazia e aviso de privacidade', () => {
    const html = renderAt('pt', '/comandante', <Comandante />);
    expect(html).toContain('Painel do capitão');
    expect(html).toContain('Estado de cada tripulante, sem valores pessoais, para decidir junto com o time.');
    expect(html).toContain('Precisa de decisão');
    expect(html).toContain('Nenhuma decisão pendente.');
    expect(html).toContain('Estado da tripulação');
    for (const name of ['Cristiano Peniche', 'Luis Felipe', 'Mike', 'Ruan', 'Rita de Cássia']) expect(html).toContain(name);
    expect(html).toContain('Prontidão da missão');
    expect(html).toContain('5 de 5 aptos');
    expect(html).toContain('Metas do time');
    expect(html).toContain('O painel mostra só o estado de cada pessoa.');
    // nunca mostra valores de saúde
    expect(html).not.toMatch(/mmHg|mg\/dL|bpm/);
  });

  it('Painel do capitão: todas as línguas, sem chave escrita', () => {
    for (const code of ['en', 'es', 'de', 'fr', 'it', 'ja']) {
      const html = renderAt(code, '/comandante', <Comandante />);
      expect(html.match(LEAKED) || []).toEqual([]);
      expect(html).not.toContain('{n}');
    }
    expect(renderAt('en', '/comandante', <Comandante />)).toContain('Needs a decision');
    expect(renderAt('ja', '/comandante', <Comandante />)).toContain('判断が必要');
  });

  it('Painel da tripulação: só a contagem de medidas do dia, sem valores nem nomes', () => {
    const html = renderAt('pt', '/tripulacao', <PainelTripulacao />);
    expect(html).toContain('Medidas registradas hoje');
    expect(html).toContain('Só a contagem do time: valores e nomes ficam com cada pessoa.');
    expect(html).toContain('de 15');
  });
});

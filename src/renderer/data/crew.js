// Tripulação do time Zagaia (Vento Norte UEA).
// A função do Luis Felipe é provisória (o 5º integrante ainda não foi definido): ajuste aqui e em i18n/locales (crew.<key>.role).
// Os textos que mudam com o idioma (função, atividade, horário) ficam em i18n/locales, em crew.<key>.
import cristiano from '../assets/crew/cristiano.png';
import luisFelipe from '../assets/crew/luis-felipe.png';
import mike from '../assets/crew/mike.png';
import ruan from '../assets/crew/ruan.png';
import rita from '../assets/crew/rita.png';

export const CREW = [
  { key: 'cristiano', name: 'Cristiano Peniche', first: 'Cristiano', sex: 'm', photo: cristiano, captain: true },
  { key: 'luis-felipe', name: 'Luis Felipe', first: 'Luis Felipe', sex: 'm', photo: luisFelipe },
  { key: 'mike', name: 'Mike', first: 'Mike', sex: 'm', photo: mike, hasUntil: true },
  { key: 'ruan', name: 'Ruan', first: 'Ruan', sex: 'm', photo: ruan, eva: true, hasUntil: true },
  { key: 'rita', name: 'Rita de Cássia', first: 'Rita', sex: 'f', photo: rita }
];

export const CAPTAIN = CREW.find((c) => c.captain);

export const TEAM = {
  name: 'Zagaia',
  org: 'Vento Norte UEA',
  patchLabel: 'LASC 7',
  day: 47
};

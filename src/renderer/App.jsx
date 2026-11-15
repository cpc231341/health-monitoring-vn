import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { I18nProvider } from './i18n/index.jsx';
import { UserProvider, useUser } from './lib/user.jsx';
import { DemoProvider } from './lib/demo.jsx';
import SelecionarTime from './pages/SelecionarTime.jsx';
import Tripulantes from './pages/Tripulantes.jsx';
import Login from './pages/Login.jsx';
import Hoje from './pages/Hoje.jsx';
import Agenda from './pages/Agenda.jsx';
import Indicadores from './pages/Indicadores.jsx';
import Recomendacao from './pages/Recomendacao.jsx';
import Diario from './pages/Diario.jsx';
import PainelTripulacao from './pages/PainelTripulacao.jsx';
import Rotina from './pages/Rotina.jsx';
import Medir from './pages/Medir.jsx';
import Conquistas from './pages/Conquistas.jsx';
import Comandante from './pages/Comandante.jsx';
import Sincronizar from './pages/Sincronizar.jsx';

// As telas internas só abrem com o tripulante conectado (login feito na tela anterior).
function RequireLogin() {
  const { authed, synced } = useUser();
  if (!authed) return <Navigate to="/" replace />;
  return synced ? <Outlet /> : <Navigate to="/sincronizar" replace />;
}

// HashRouter: funciona carregando o app por arquivo (file://) dentro do Electron.
export default function App() {
  return (
    <I18nProvider>
      <UserProvider>
        <DemoProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<SelecionarTime />} />
              <Route path="/tripulantes" element={<Tripulantes />} />
              <Route path="/login/:key" element={<Login />} />
              <Route path="/sincronizar" element={<Sincronizar />} />
              <Route element={<RequireLogin />}>
                <Route path="/hoje" element={<Hoje />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/indicadores" element={<Indicadores />} />
                <Route path="/recomendacao" element={<Recomendacao />} />
                <Route path="/tripulacao" element={<PainelTripulacao />} />
                <Route path="/medir" element={<Medir />} />
                <Route path="/diario" element={<Diario />} />
                <Route path="/rotina" element={<Rotina />} />
                <Route path="/conquistas" element={<Conquistas />} />
                <Route path="/comandante" element={<Comandante />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </DemoProvider>
      </UserProvider>
    </I18nProvider>
  );
}

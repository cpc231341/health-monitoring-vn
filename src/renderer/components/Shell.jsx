import { useCallback, useState } from 'react';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import LegalFooter from './LegalFooter.jsx';
import MissionDialog from './MissionDialog.jsx';

/** Moldura das telas internas: barra lateral, barra superior (relógio, conexão, conta) e janela da missão. */
export default function Shell({ header, children }) {
  const [mission, setMission] = useState(false);
  const close = useCallback(() => setMission(false), []);
  return (
    <div className="flex h-screen overflow-hidden bg-vn-bg text-vn-text">
      <Sidebar onMission={() => setMission(true)} />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
        <TopBar />
        {header}
        {children}
        <LegalFooter />
      </main>
      {mission && <MissionDialog onClose={close} />}
    </div>
  );
}

export function PageHeader({ title, sub, right }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 border-b border-vn-line px-8 py-5">
      <div className="min-w-0">
        <h1 className="text-[32px] font-semibold leading-tight">{title}</h1>
        <div className="mt-1 text-base text-vn-muted">{sub}</div>
      </div>
      {right}
    </header>
  );
}

export function Card({ className = '', children, ...rest }) {
  return <div className={'rounded-[4px] border border-vn-line bg-vn-surface ' + className} {...rest}>{children}</div>;
}

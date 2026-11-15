import { createContext, useContext, useMemo, useState } from 'react';

// Cenário, ambiente e fase da missão do modo demonstração, compartilhados entre as telas e a barra superior.
const DEFAULT = { scen: 'comum', env: 'estacao', fase: 'orbita', setScen() {}, setEnv() {}, setFase() {} };
const DemoCtx = createContext(DEFAULT);

export function DemoProvider({ children, initial = {} }) {
  const [scen, setScen] = useState(initial.scen || 'comum');
  const [env, setEnv] = useState(initial.env || 'estacao');
  const [fase, setFase] = useState(initial.fase || 'orbita');
  const value = useMemo(() => ({ scen, env, fase, setScen, setEnv, setFase }), [scen, env, fase]);
  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>;
}

export const useDemo = () => useContext(DemoCtx);

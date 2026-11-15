import { createContext, useContext, useState } from 'react';
import { CREW } from '../data/crew.js';

const UserCtx = createContext(null);

function read(store, key, fallback) {
  try { return window[store].getItem(key) || fallback; } catch (e) { return fallback; }
}
function write(store, key, value) {
  try { window[store].setItem(key, value); } catch (e) { /* sem armazenamento: fica só na sessão */ }
}
function erase(store, key) {
  try { window[store].removeItem(key); } catch (e) { /* sem armazenamento */ }
}

// O tripulante escolhido fica no computador (localStorage); a sessão de login vale só até fechar o app (sessionStorage).
export function UserProvider({ children }) {
  const [key, setKey] = useState(() => read('localStorage', 'vn.user', CREW[0].key));
  const [authed, setAuthed] = useState(() => !!read('sessionStorage', 'vn.session', ''));
  // A sincronização do anel vem depois da senha e vale uma vez por sessão (some ao trocar de conta).
  const [synced, setSynced] = useState(() => !!read('sessionStorage', 'vn.synced', ''));
  const signIn = (k) => {
    setKey(k);
    setAuthed(true);
    setSynced(false);
    write('localStorage', 'vn.user', k);
    write('sessionStorage', 'vn.session', k);
    erase('sessionStorage', 'vn.synced');
  };
  const signOut = () => {
    setAuthed(false);
    setSynced(false);
    erase('sessionStorage', 'vn.session');
    erase('sessionStorage', 'vn.synced');
  };
  const markSynced = () => {
    setSynced(true);
    write('sessionStorage', 'vn.synced', '1');
  };
  const me = CREW.find((c) => c.key === key) || CREW[0];
  return <UserCtx.Provider value={{ me, authed, synced, signIn, signOut, markSynced }}>{children}</UserCtx.Provider>;
}

export const useUser = () => useContext(UserCtx);

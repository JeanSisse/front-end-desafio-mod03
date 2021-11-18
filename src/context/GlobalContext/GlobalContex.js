import { createContext } from 'react';
import useGlobalContextProvider from '../../hooks/useGlobalContexProvider';

const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const globalContextProvider = useGlobalContextProvider();

  return(
    <GlobalContext.Provider value={globalContextProvider}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;

import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext/GlobalContex';

function useGlobalContext() {
  return useContext(GlobalContext);
}

export default useGlobalContext;

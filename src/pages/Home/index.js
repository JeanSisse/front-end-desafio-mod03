import Header from "../../Components/Header";
import Main from "../../Components/Main";

import { GlobalContextProvider } from '../../context/GlobalContext/GlobalContex';

function Home() {
  return (
    <div className="card-controle">
      <Header />
      <GlobalContextProvider>
        <Main/>
      </GlobalContextProvider>
    </div>
  );
}

export default Home;

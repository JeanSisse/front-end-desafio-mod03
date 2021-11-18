/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useGlobalContext from '../../hooks/useGloblaContext';
import BotaoRegistrar from '../BotaoRegistrar';
import CardRegistro from '../CardRegistro';
import CardResumo from '../CardResumo';
import FieldsFilter from '../FieldsFilter';
import Filter from '../Filter';
import TabelaDeRegistros from '../TabelaDeRegistro';
import './style.css';

function Main() {

  const {
    displayFiltro,
    displayCardRegister,
    setDisplayCardRegister,
    registers,
    setRegisters,
    updateResumo,
    setUpdateResumo,
    transactionEditing,
    setTransactionEditing,
    updateCatReg,
    setUpdateCatReg,
    categories,
    setCategories,
    loadTransactions,
    loadCategory,
    handleDisplayFiltro
  } = useGlobalContext();

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    if (updateCatReg)
      loadCategory();
  }, [registers, updateCatReg])

  return (
    <div className="main">
      <Filter
        handleDisplayFiltro={handleDisplayFiltro}
      />
      <div className="registro-resumo flex-row  justify-between">
        <div className="filtro-table">
          {
            displayFiltro && 
            <FieldsFilter
              registers={registers}
              setRegisters={setRegisters}
              categories={categories}
              setCategories={setCategories}
              setUpdateResumo={setUpdateResumo}
              loadTransactions={loadTransactions}
              setUpdateCatReg={setUpdateCatReg}
              updateCatReg={updateCatReg}
            />
          }
          <TabelaDeRegistros
            registers={registers}
            setRegisters={setRegisters}
            setDisplayCardRegister={setDisplayCardRegister}
            loadTransactions={loadTransactions}
            setTransactionEditing={setTransactionEditing}
            loadCategory={loadCategory}
            setUpdateCatReg={setUpdateCatReg}
          />
        </div>
        <div className="resumo-botao flex-column">
          <CardResumo
            registers={registers}
            updateResumo={updateResumo}
            setUpdateResumo={setUpdateResumo}
          />
          <BotaoRegistrar
            setDisplayCardRegister={setDisplayCardRegister}
          />
        </div>
      </div>
      { displayCardRegister && 
        <CardRegistro 
          setDisplayCardRegister={setDisplayCardRegister}
          setRegisters={setRegisters}
          registers={registers}
          loadTransactions={loadTransactions}
          transactionEditing={transactionEditing}
          setTransactionEditing={setTransactionEditing}
          setUpdateResumo={setUpdateResumo}
          setUpdateCatReg={setUpdateCatReg}
        /> 
      }
    </div>
  )
}

export default Main;
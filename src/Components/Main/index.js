/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import { useState, useEffect } from 'react';

import CardResumo from '../CardResumo';
import BotaoRegistrar from '../BotaoRegistrar';
import FieldsFilter from '../FieldsFilter';
import TabelaDeRegistros from '../TabelaDeRegistro';
import Filter from '../Filter';
import CardRegistro from '../CardRegistro';

import useGlobalContext from '../../hooks/useGloblaContext';

function Main() {

  const [displayCardRegister, setDisplayCardRegister] = useState(false);
  const [registers, setRegisters] = useState([]);
  const [updateResumo, setUpdateResumo] = useState(false);
  const [transactionEditing, setTransactionEditing] = useState(false);
  const [updateCatReg, setUpdateCatReg] = useState(false);

  const [categories, setCategories] = useState([{}]);

  const {
    displayFiltro,
    setDisplayFiltro
  } = useGlobalContext();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3334/transactions', {
        method: 'GET'
      });

      const data = await response.json();
      
      setRegisters(data);
      setUpdateResumo(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (updateCatReg)
      loadCategory();
  }, [registers, updateCatReg])

  function loadCategory() {
    const category = [];
    const objOfCategoris = [];
    
    registers.filter((register) => {
      if (category.indexOf(register.category) === -1){
        category.push(register.category);
        objOfCategoris.push({field: register.category, selected: false})
      }
      return objOfCategoris;
    });
    
    setCategories(objOfCategoris);
  }

  const handleDisplayFiltro = () => {
    loadCategory();
    const copiDisplayFiltro = !displayFiltro;
    setDisplayFiltro(copiDisplayFiltro);
  }

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
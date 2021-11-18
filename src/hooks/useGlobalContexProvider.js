import { useState } from "react";

function useGlobalContextProvider() {

  const [displayFiltro, setDisplayFiltro] = useState(false);
  const [displayCardRegister, setDisplayCardRegister] = useState(false);
  const [registers, setRegisters] = useState([]);
  const [updateResumo, setUpdateResumo] = useState(false);
  const [transactionEditing, setTransactionEditing] = useState(false);
  const [updateCatReg, setUpdateCatReg] = useState(false);

  const [categories, setCategories] = useState([{}]);

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

  return {
    displayFiltro,
    setDisplayFiltro,
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
  }
}

export default useGlobalContextProvider;
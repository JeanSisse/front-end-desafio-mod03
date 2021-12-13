import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

import './style.css';

function TypeOfRegister({ className, children, handleRegisterType, inputType }) {
  return (
    <button
      className={`${className} font-lato font-bold`}
      onClick={() => handleRegisterType(inputType)}
    >
      {children}
    </button>
  )
}

function CardRegistro(
  { setDisplayCardRegister,
    setRegisters,
    registers,
    loadTransactions,
    transactionEditing,
    setTransactionEditing,
    setUpdateResumo,
    setUpdateCatReg
  }) {
  const [inputSelected, setInputSelected] = useState(false);
  const [outputSelected, setOutputSelected] = useState(true);

  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [date, setDate] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (transactionEditing) {
      setValor(transactionEditing.value);
      setDate(transactionEditing.date);
      setDescricao(transactionEditing.description);
      setCategoria(transactionEditing.category);
    }
  }, [transactionEditing]);

  function handleRegisterType(selected) {
    const ifSelected = inputSelected;

    if ((selected === 'input' && !ifSelected) || (selected === 'output' && ifSelected)) {
      setInputSelected(!ifSelected);
      setOutputSelected(ifSelected);
    }
  }

  function getDayOfWeek(dayInNumber) {
    
    switch (dayInNumber) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda';
      case 2:
        return 'Terça';
      case 3:
        return 'Quarta';
      case 4:
        return 'Quinta';
      case 5:
        return 'Sexta';
      case 6:
        return 'Sábado'
      default:
        console.log(dayInNumber);
        break;
    }
  }

  function dateFormat(date) {
    const dia = date.substring(0, 2);
    const mes = date.substring(3, 5);
    const ano = date.substring(6);

    return `${ano}/${mes}/${dia}`;
  }

  function validateInputvValue(target) {
    
    if(!target[0].value ||
       !target[1].value ||
       !target[2].value ||
       !target[3].value) {return false};

    return true;
  }

  async function handleRegisterTransaction(event) {
    event.preventDefault();
    
    if (!validateInputvValue(event.target)) return;

    try {
      const newDate = dateFormat(date);

      const body = {
        "date": date,
        "week_day": getDayOfWeek(new Date(newDate).getDay()),
        "description": descricao,
        "value": valor,
        "category": categoria,
        "type": inputSelected ? "credit" : "debit"
      }
        
      const response = await fetch('https://dindin-api-cubos.herokuapp.com/transactions', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      const copyOfRegister = [...registers, data];
      setRegisters(copyOfRegister);

      setUpdateResumo(true);

      await loadTransactions();
      setUpdateCatReg(true);

      setValor('');
      setDate('');
      setDescricao('');
      setCategoria('');

      handleDisplayCardRegister();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleEditTransaction(event) {
    event.preventDefault();

    if (!validateInputvValue(event.target)) return;

    try {

      const newDate = dateFormat(date);
      
      const body = {
        "date": date,
        "week_day": getDayOfWeek(new Date(newDate).getDay()),
        "description": descricao,
        "value": valor,
        "category": categoria,
        "type": inputSelected ? "credit" : "debit"
      }
  
      const response = await fetch(`https://dindin-api-cubos.herokuapp.com/transactions/${transactionEditing.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      const copyOfRegister = [...registers, data];
      setRegisters(copyOfRegister);

      setUpdateResumo(true);

      await loadTransactions();
      setUpdateCatReg(true);

      setValor('');
      setDate('');
      setDescricao('');
      setCategoria('');

      handleDisplayCardRegister();
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleDisplayCardRegister(){
    setDisplayCardRegister(false);
    setTransactionEditing(false);
  }

  return (
    <div className="modal">
      <div className="cardRegistro font-rubik flex-column">
        <h2>{transactionEditing ? 'Editar' : 'Adicionar'} Registro</h2>
        
        <img
          className="close-registro" src="./assets/close-modal.svg" alt="Fechar registro"
          onClick={handleDisplayCardRegister}
        />

        <div className="registerType flex-row">
          <TypeOfRegister
            className={ inputSelected ? "inputRegister-selected" : "inputRegister" }
            handleRegisterType={handleRegisterType}
            inputType="input"
          >
            Entrada
          </TypeOfRegister>

          <TypeOfRegister
            className={ outputSelected ? "outputRegister-selected" : "outputRegister" }
            handleRegisterType={handleRegisterType}
            inputType="output"
          >
            Saída
          </TypeOfRegister>
        </div>

        <form 
          onSubmit={
            transactionEditing
              ? handleEditTransaction
              : handleRegisterTransaction
          }
          className="flex-column"
        >
          <div className="input-form flex-column">
            <label htmlFor="valor">Valor</label>
            <input 
              id="valor"
              type="number"
              placeholder="R$ 2500"
              onChange={(e) => setValor(e.target.value)}
              value={valor}
            />
          </div>

          <div className="input-form flex-column">
            <label htmlFor="categoria">Categoria</label>
            <input 
              id="categoria" 
              type="text"
              onChange={(e) => setCategoria(e.target.value)}
              value={categoria}
            />
          </div>

          <div className="input-form flex-column">
            <label htmlFor="data">Data</label>
            <InputMask
              id="data"
              mask="99/99/9999"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          <div className="input-form flex-column">
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              type="text"
              onChange={(e) => setDescricao(e.target.value)}
              value={descricao}
            />
          </div>

          <button
            className="btn-confirmar"
            type="submit"
          >
            Comfirmar
          </button>
        </form>
      </div>
    </div>
  )
}

export default CardRegistro;

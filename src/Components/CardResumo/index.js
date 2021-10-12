/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import './style.css';

function CardResumo({ updateResumo, setUpdateResumo, registers }) {
  const objResumo = {
    "Entradas": 0,
    "Saidas": 0,
    "Saldos": 0
  };

  const [resumo, setResumo] = useState(objResumo);

  useEffect(() => {
    if (updateResumo) {
      handleResumo();
    }
  }, [updateResumo]);

  const handleResumo = () => {
    const copyOfRegister = [...registers];

    copyOfRegister.forEach(register => {
      if (register.type === "credit") {
        objResumo.Entradas += Number(register.value);
      } else if(register.type === "debit") {
        objResumo.Saidas += Number(register.value);
      }
    });

    objResumo.Saldos = objResumo.Entradas - objResumo.Saidas;
    setResumo(objResumo);
    setUpdateResumo(false);
  }

  return (
    <div className="card-resumo font-rubik">
      <h4>Resumo</h4>

      <div>
        <div className="resumo-registros flex-row justify-between">
          <b className="resumo-label">Entradas</b>
          <span className="entradas">R$ {resumo.Entradas}</span>
        </div>

        <div className="resumo-registros flex-row justify-between">
          <b className="resumo-label">Saídas</b>
          <span className="saidas">R$ {resumo.Saidas}</span>
        </div>
        <hr />
        <div className="resumo-registros flex-row justify-between">
          <b className="resumo-label">Saldo</b>
          <span className="saldos">{resumo.Saldos < 0 ? `-R$ ${Math.abs(resumo.Saldos)}` : `R$ ${resumo.Saldos}`}</span>
        </div>
      </div>
    </div>
  )
}

export default CardResumo;
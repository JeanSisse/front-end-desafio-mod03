import { useState } from 'react';
import './style.css';

import ModalExcluirItem from '../ModalExcluirItem';

function AlterarItem({ setDisplayCardRegister, handleDelete, register, setTransactionEditing }) {
  const [modalExluir, setModalExcluir] = useState(false);

  function handleEditTransaction() {
    setTransactionEditing(register);
    setDisplayCardRegister(true);
  }

  return (
    <div className="alterRegister font-rubik">
      <img
        src="./assets/editar.svg"
        className="alterar" alt="Editar"
        onClick={handleEditTransaction}
      />
      
      <img
        src="./assets/excluir.svg"
        className="excluir" alt="Excluír"
        onClick={() => setModalExcluir(true)}
      />

      {
        modalExluir && 
        <ModalExcluirItem
          setModalExcluir={setModalExcluir}
          handleDelete={handleDelete}
          registerID={register.id}
        />
      }
    </div>
  )
}

export default AlterarItem;

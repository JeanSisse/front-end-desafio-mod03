import './style.css';

function ModalExcluirItem({ setModalExcluir, handleDelete, registerID }) {
  return (
    <div className="modal-excluirItem">
      <img src="./assets/polygon.svg" className="polygon" alt="Confirma apagar item" />
      <p>Apagar item?</p>
      <div className="confirmar-exclusao">
        <button
          className="btn-exclusao"
          onClick={() => handleDelete(registerID)}
        >
          Sim
        </button>

        <button
          className="btn-cancelar"
          onClick={() => setModalExcluir(false)}
        >
          Não
        </button>
      </div>
    </div>
  )
}

export default ModalExcluirItem;
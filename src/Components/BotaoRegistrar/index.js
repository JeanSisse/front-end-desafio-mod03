import './style.css';

function BotaoRegistrar({ setDisplayCardRegister }) {
  return (
    <button
      className="botao font-rubik flex-row font-bold"
      onClick={ () => setDisplayCardRegister(true) }
    >Adicionar Registro</button>
  )
}

export default BotaoRegistrar;
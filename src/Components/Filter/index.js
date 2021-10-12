import './style.css';

function Filter({ handleDisplayFiltro }) {

  return (
    <div
      className="filter flex-row justify-center"
      onClick={handleDisplayFiltro}
    >
      <img src="./assets/filtro.png" alt="Filtro" />
      <span className="span-filter font-lato">Filtro</span>
    </div>
  )
}

export default Filter;
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import './style.css';

function ButtonOfFilter({ className, children, handleFilter }) {
  return (
    <button
      className={`${className}
      font-lato font-bold`}
      onClick={handleFilter}
    >
      {children}
    </button>
  )
}

function FilterForValues({ maxValue, setMaxValue, minValue, setMinValue }) {
  return (
    <div className="filterValue flex-column">
      <h5>Valor</h5>

      <div className="inputs-div flex-column">
          <label htmlFor="min">Min</label>
          <input
            id="min"
            type="number"
            className="min"
            onChange={(e) => setMinValue(e.target.value)}
            value={minValue}
          />
      </div>
      
      <div className="inputs-div flex-column">
        <label htmlFor="max">Max</label>
        <input
          id="max"
          type="number"
          className="max"
          onChange={(e) => setMaxValue(e.target.value)}
          value={maxValue}
        />
      </div>
    </div>
  )
}

function OptionsOfFilter({ day, handleSelectedFilterField, type, array }) {
  return (
    <span
      className={`fields ${day.selected ? 'fields-selected': ''}`}
      onClick={() => handleSelectedFilterField(day, type, array)}
    >
      {day.field}
      <img
        src= {day.selected ? "./assets/remov-filter.svg" : "./assets/add.svg"} alt="Adicionar filtro"
      />
    </span>
  )
}

function CategoryFields({ categories, handleSelectedFilterField }) {
  
  return (
    <div className="category">
      <h5>Cagetorias</h5>
      <div className="categories flex-column">
        {
          categories.map((register) => (
            <OptionsOfFilter
              key={register.field}
              day={register}
              handleSelectedFilterField={handleSelectedFilterField}
              array={categories}
              type='category'
            />
          ))
        }
      </div>
    </div>
  )
}

function DaysOfWeek({ daysOfWeek, handleSelectedFilterField }) {

  return (
    <div className="dias-de-semana">
      <h5>Dia da semana</h5>
      <div className="dias flex-column">
        {
          daysOfWeek.map((day => (
            <OptionsOfFilter
              key={day.field}
              day={day}
              handleSelectedFilterField={handleSelectedFilterField}
              array={daysOfWeek}
              type='week_day'
            />
          )))
        }
      </div>
    </div>
  )
}

function FieldsFilter(
  {
    registers, setRegisters,
    categories, setCategories,
    loadTransactions,
    setUpdateResumo,
    setUpdateCatReg,
    updateCatReg
  }) {
  
    const days = [
    {field:'Segunda', selected: false},
    {field: 'Terça', selected: false},
    {field: 'Quarta', selected: false},
    {field: 'Quinta', selected: false},
    {field: 'Sexta', selected: false},
    {field: 'Sábado', selected: false},
    {field: 'Domingo', selected: false}
  ];

  const [filterSelected, setFilterSelected] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState(days);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const registersRef = useRef(registers);

  useEffect(() => {
    if (updateCatReg) registersRef.current = registers;
  }, [ updateCatReg])

  function filterMinMaxValueInReg(min, max) {
    const filterValueInReg = registersRef.current.filter((reg) => {
      if (min !== 0 && max !== 0) {
        return Number(reg.value) >= Number(min) && Number(reg.value) <= Number(max);
      } else if (min === 0 && max !== 0) {
        return Number((reg.value) <= Number(max));
      } else if (min !== 0 && max === 0) {
        return Number((reg.value) >= Number(min));
      }

      return reg;
    });
    return filterValueInReg;
  }

  const handleFilterSelected = () => {

    setUpdateCatReg(false);
    
    const min = minValue;
    const max = maxValue;
    const daysSelected = daysOfWeek.filter((day) => day.selected);
    const categorySelected = categories.filter((category) => category.selected);

    const arrayOfValueFiltered = filterMinMaxValueInReg(min, max);
    const arrayOfCategoryFiltered = [];
    const arrayOfDaysFiltered = [];

    if ((categorySelected.length > 0)) {
      arrayOfValueFiltered.filter((reg) =>  {
        categorySelected.forEach((r) => {
          if (r.field.toLowerCase() === reg.category.toLowerCase()) {
            arrayOfCategoryFiltered.push(reg);
          }
        })
        return  reg;
      });
    }

    if (daysSelected.length > 0 && arrayOfCategoryFiltered.length > 0) {
      arrayOfCategoryFiltered.filter((reg) =>  {
        daysSelected.forEach((r) => {
          if (r.field.toLowerCase() === reg.week_day.toLowerCase()) {
            arrayOfDaysFiltered.push(reg);
          }
        });
        return  reg;
      });
    } else if (daysSelected.length > 0) {
      arrayOfValueFiltered.filter((reg) =>  {
        daysSelected.forEach((r) => {
          if (r.field.toLowerCase() === reg.week_day.toLowerCase()) {
            arrayOfDaysFiltered.push(reg);
          }
        })
        return  reg;
      });
    }

    if (categorySelected.length === 0 && daysSelected.length === 0) {
      setRegisters(arrayOfValueFiltered);
    } else if (categorySelected.length > 0 && daysSelected.length === 0) {
      setRegisters(arrayOfCategoryFiltered);
    } else {
      setRegisters(arrayOfDaysFiltered);
    }

    setUpdateResumo(true);
  }

  function handleSelectedFilterField(fieldSelected, type, array) {

    const arrayOfFields = [...array];
    const temp = arrayOfFields.find(selected => selected.field === fieldSelected.field);
    temp.selected = !temp.selected;

    switch (type) {
      case 'category':
        setCategories(arrayOfFields);
        break;
      case 'week_day':
        setDaysOfWeek(arrayOfFields);
        break;
      default:
        break;
    }
  }

  const handleClearFilterSelected = () => {
    const copyCategories = [...categories];
    copyCategories.map(cat => cat.selected = false);

    const copyDaysOfWeek = [...daysOfWeek];
    copyDaysOfWeek.map(day => day.selected = false);

    setMaxValue(0);
    setMinValue(0);
    loadTransactions();
  }

  return (
    <div className="fields-filtro flex-column font-rubik font-normal">
      
      <DaysOfWeek
        filterSelected={filterSelected}
        setFilterSelected={setFilterSelected}
        daysOfWeek={daysOfWeek}
        handleSelectedFilterField={handleSelectedFilterField}
      />

      <hr className="linha-vertical-esquerda"/>

      <CategoryFields
        registers={registers}
        categories={categories}
        handleSelectedFilterField={handleSelectedFilterField}
      />

      <hr className="linha-vertical-direita"/>

      <FilterForValues
        setMinValue={setMinValue}
        minValue={minValue}
        setMaxValue={setMaxValue}
        maxValue={maxValue}
      />

      <ButtonOfFilter 
        className="limpar-filtros"
        handleFilter={handleClearFilterSelected}
      >
        Limpar Filtros
      </ButtonOfFilter>

      <ButtonOfFilter
        className="aplicar-filtros"
        handleFilter={handleFilterSelected}
      >
        Aplicar Filtros
      </ButtonOfFilter>
    </div> 
  )
}

export default FieldsFilter;
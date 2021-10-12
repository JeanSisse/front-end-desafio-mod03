import { useState } from 'react';
import './style.css';

import AlterarItem from '../EditarItem';

function TabelaDeRegistros(
  { registers, setRegisters,
    setDisplayCardRegister,
    loadTransactions,
    setTransactionEditing,
    setUpdateCatReg
  }) {

  const [orderDate, setOrderDate] = useState(true);
  const [orderDayWeek, setOrderDayWeek] = useState(false);
  const [orderValue, setOrderValue] = useState(false);
  const [filterIcon, setFilterIcon] = useState('./assets/up-filter.png');
  const [orderAscOrDesc, setOrderAscOrDesc] = useState(true);

  const ascFilterIcon = './assets/up-filter.png';
  const descFilterIcon = './assets/down-filter.svg';

  const handleDelete = async (registerId) => {
    try {
      await fetch(`http://localhost:3334/transactions/${registerId}`, {
        method: 'DELETE'
      });

      await loadTransactions();
      setUpdateCatReg(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  function formateDate(datesOrderd) {
    datesOrderd.forEach((reg) => {
      const dia = reg.date.substring(6);
      const mes = reg.date.substring(4, 6);
      const ano = reg.date.substring(0, 4);
      reg.date = (`${dia}/${mes}/${ano}`);
    });

    return datesOrderd;
  }

  function orderReg(orderType) {
    switch (orderType) {
      case 'date':
        const datesOrderd = [...registers];
        datesOrderd.sort(
          function(a, b) {
            a.date = a.date.split('/').reverse().join('');
            b.date = b.date.split('/').reverse().join('');
            return a.date.localeCompare(b.date);
          }
        );
        
        return formateDate(datesOrderd);
      case 'value':
        const orderRegForValue = [...registers];
        orderRegForValue.sort((a, b) => Number(a.value) - Number(b.value));
        return orderRegForValue;

      case 'week_day':
        const dias = {
          Domingo: 1,
          Segunda: 2,
          Terça: 3,
          Quarta: 4,
          Quinta: 5,
          Sexta: 6,
          Sábado: 7
        };

        const daysOfWeekOrdered = [...registers];
        daysOfWeekOrdered.sort((a, b) => {
          return dias[a.week_day] - dias[b.week_day];
        });
        return daysOfWeekOrdered;

      default:
        return 'Tipo inválido';
    }
  }

  function handleIcon(setIconUpOrDown) {
    if (setIconUpOrDown) {
      setFilterIcon(descFilterIcon);
    } else {
      setFilterIcon(ascFilterIcon);
    }

    setOrderAscOrDesc(!setIconUpOrDown);
  }

  function handleOrderDate() {
    const orderdDates = orderReg('date');
    
    if (orderAscOrDesc) orderdDates.reverse();

    handleIcon(orderAscOrDesc);
    
    setOrderDate(true);
    setOrderDayWeek(false);
    setOrderValue(false);
    setRegisters(orderdDates);
  }

  function handleOrderDayWeek() {
    const orderDaysOfWeek = orderReg('week_day');

    if (orderAscOrDesc) orderDaysOfWeek.reverse();
    
    handleIcon(orderAscOrDesc);

    setOrderDate(false);
    setOrderDayWeek(true);
    setOrderValue(false);
    setRegisters(orderDaysOfWeek);
  }

  function handleOrderValue() {
    const orderRegForValue = orderReg('value');

    if (orderAscOrDesc) orderRegForValue.reverse();

    handleIcon(orderAscOrDesc);

    setOrderDate(false);
    setOrderDayWeek(false);
    setOrderValue(true);
    setRegisters(orderRegForValue);
  }

  return (
    <div className="registros">
      <table className="font-lato">
        <thead>
          <tr className="th-label">
            <th onClick={handleOrderDate}>
              Data {orderDate && <img src={filterIcon} className="orderBy" alt="Ordenar" />}
            </th>
            <th onClick={handleOrderDayWeek}>
              Dia da semana {orderDayWeek && <img src={filterIcon} className="orderBy" alt="Ordenar" />}
            </th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th onClick={handleOrderValue}>
              Valor {orderValue && <img src={filterIcon} className="orderBy" alt="Ordenar" />}
            </th>
          </tr>
        </thead>
        
        <tbody>
          {registers.map(register => (
            <tr key={Math.random()}>
              <td>{`${register.date.substring(0,6)}${register.date.substring(8)}`}</td>
              <td>{register.week_day}</td>
              <td>{register.description}</td>
              <td>{register.category}</td>
              <td
                className={register.type === 'debit' ? 'saidas' : 'entradas'}
              >
                {register.type === 'debit' ? `-${register.value}` : register.value}
              </td>

              <td>
                <AlterarItem
                  setDisplayCardRegister={setDisplayCardRegister}
                  handleDelete={handleDelete}
                  register={register}
                  setTransactionEditing={setTransactionEditing}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TabelaDeRegistros;
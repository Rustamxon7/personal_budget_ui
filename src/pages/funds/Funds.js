/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import dateFormat from 'dateformat';
import UpdateFund from './UpdateFund';

import { removeFundFromAllPersons } from '../../redux/funds/funds';

const Funds = ({ funds, startDate, endDate }) => {
  const [open, setOpen] = useState('disabled');
  const [selectedFund, setSelectedFund] = useState('');
  const [openNote, setOpenNote] = useState('');

  const filteredFunds = funds.filter((fund) => {
    if (startDate && endDate) {
      return dateFormat(fund.date, 'yyyy-mm-dd') >= startDate && dateFormat(fund.date, 'yyyy-mm-dd') <= endDate;
    }
    return true;
  });

  const dispatch = useDispatch();

  const handleRemove = (categoryId, fundId) => {
    dispatch(removeFundFromAllPersons(categoryId, fundId));
    window.location.reload();
  };

  const handleClick = (fund) => {
    setOpenNote(fund);
  };

  const updateFund = (fund) => {
    setSelectedFund(fund);
    setOpen('');
  };

  return (
    <>
      {filteredFunds.map((fund) => (
        <>
          <div className="table__row" key={fund.id} onClick={() => handleClick(fund.id)} style={fund.type_operation === 't' ? { backgroundColor: '#eab208b5' } : {}}>
            <div className="table__cell table__cell--first">{fund.title}</div>
            <div className="table__cell">{fund.amount}</div>
            <div className="table__cell">{dateFormat(fund.date, 'ddd mmm dd yyyy', true)}</div>
            <ion-icon name="close-circle-outline" onClick={() => handleRemove(fund.category_id, fund.id)} />
            {openNote === fund.id ? (
              <>
                <div className="note">
                  <div className="note__content">
                    <span>{fund.note}</span>
                    <ion-icon className="" name="create-outline" onClick={() => updateFund(fund.id)} />
                  </div>
                </div>
              </>
            ) : null}
          </div>
          {selectedFund === fund.id ? (
            <>
              <UpdateFund open={open} setOpen={setOpen} category={fund} />
            </>
          ) : null}
        </>
      ))}
    </>
  );
};

export default Funds;

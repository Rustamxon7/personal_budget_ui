/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategory, removeCategoryAction } from '../../redux/categories/categories';
import { fetchFunds } from '../../redux/funds/funds';
import EditCategory from './UpdateCategory';
import Funds from '../funds/Funds';
import AddFund from '../funds/AddFund';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const Category = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState('hidden');
  const [openEdit, setOpenEdit] = useState('disabled');

  const currentLocation = location.pathname.split('/')[1];

  const validateCurrentPerson = () => {
    if (currentLocation === 'people') {
      return parseInt(location.pathname.split('/')[4], 10);
    }
    return parseInt(location.pathname.split('/')[2], 10);
  };

  // select by date startDate endDate

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const category = useSelector((state) => state.categories.category);
  const loading = useSelector((state) => state.categories.loading);

  useEffect(() => {
    dispatch(fetchCategory(validateCurrentPerson(), location.pathname.split('/')[3]));
    dispatch(fetchFunds(validateCurrentPerson()));
  }, [dispatch]);

  const handleRemove = () => {
    dispatch(removeCategoryAction(validateCurrentPerson()));
    navigate('/');
    window.location.reload();
  };

  const funds = useSelector((state) => state.funds.funds.funds);

  const filterdFunds = funds.filter((fund) => fund.category_id === category.id) || [];

  const fundsAmount = filterdFunds.reduce((acc, curr) => acc + curr.amount, 0);

  const fundsCount = filterdFunds.length;

  const selectByDate = () => {
    if (startDate !== '' && endDate !== '') {
      return funds.filter((fund) => {
        const date = new Date(fund.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return date >= start && date <= end;
      });
    }
    return funds;
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Header />
        {loading ? (
          <div className="app category-page loader--container">
            <img className="loader" src="img/loader.svg" alt="Loading" />
          </div>
        ) : (
          <>
            <EditCategory open={openEdit} setOpen={setOpenEdit} category={category.id} />
            <div className="app category-page">
              <div className="category-page__header">
                <div className="category-page__header-left" onClick={handleRemove} onKeyPress={handleRemove} role="button" tabIndex={0}>
                  <ion-icon name="close-circle-outline" />
                </div>
              </div>
              <div className="app-container">
                <h1 className="heading-primary">
                  {category.title} | ${fundsAmount} | {fundsCount} |{' '}
                  <div className="category-page__link" onClick={() => setOpenEdit('')}>
                    <ion-icon name="create-outline" />
                  </div>{' '}
                  |
                  <ion-icon name="trash-outline" onClick={handleRemove} onKeyPress={handleRemove} role="button" tabIndex={0} />
                </h1>
                <div className="table">
                  <h3 className="table__heading">
                    <span>
                      <ion-icon name="calendar-outline" onClick={selectByDate} onKeyPress={selectByDate} role="button" tabIndex={0} />
                      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                      -
                      <input type="date" onChange={(e) => setEndDate(e.target.value)} />
                    </span>
                    <button type="button" className="btn" onClick={() => setOpen('')}>
                      Add
                    </button>
                  </h3>
                  <div className="table__body">
                    <Funds funds={filterdFunds} category={category} startDate={startDate} endDate={endDate} />
                    <AddFund open={open} setOpen={setOpen} category={category} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Category;

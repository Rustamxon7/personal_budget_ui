/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, removeCategoryAction } from '../../redux/categories/categories';
import { fetchFunds } from '../../redux/funds/funds';
import Funds from '../funds/Funds';
import AddFund from '../funds/AddFund';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const Category = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [open, setOpen] = useState('hidden');

  const currentLocation = location.pathname.split('/')[1];

  const validateCurrentPerson = () => {
    if (currentLocation === 'people') {
      return parseInt(location.pathname.split('/')[4], 10);
    }
    return parseInt(location.pathname.split('/')[2], 10);
  };

  const category = useSelector((state) => state.categories.category);

  useEffect(() => {
    dispatch(fetchCategory(validateCurrentPerson(), location.pathname.split('/')[3]));
    dispatch(fetchFunds(validateCurrentPerson()));
  }, [dispatch]);

  const handleRemove = () => {
    dispatch(removeCategoryAction(location.pathname.split('/')[2]));
    window.history.back();
    window.location.reload();
  };

  const funds = useSelector((state) => state.funds.funds);

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Header />

        <div className="app category-page">
          <div className="category-page__header">
            <div className="category-page__header-left" onClick={handleRemove} onKeyPress={handleRemove} role="button" tabIndex={0}>
              <ion-icon name="close-circle-outline" />
            </div>
          </div>
          <div className="app-container">
            <h1 className="heading-primary">{category.title} | 2560$ | 36</h1>
            <div className="table">
              <h3 className="table__heading">
                <span>📆 Dec 01 - May 22, 22</span>
                <button type="button" className="btn" onClick={() => setOpen('')}>
                  Add
                </button>
              </h3>
              <div className="table__body">
                <Funds funds={funds} />
                <AddFund open={open} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Category;

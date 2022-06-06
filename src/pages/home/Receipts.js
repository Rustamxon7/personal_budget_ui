/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Categories from '../categories/Categories';
import Transactions from '../../components/Transactions';
import CurrentPersonCategories from '../categories/CurrentPersonCategories';
import CreatePerson from '../people/CreatePerson';
import EditPerson from '../people/EditPerson';
import Chart from '../../components/chart';
import { fetchFunds } from '../../redux/funds/funds';

import './main.css';

const Receipts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLocation = location.pathname.split('/')[3];
  const mainLocation = location.pathname.split('/')[1];
  const person = location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(fetchFunds(1));
  }, [dispatch]);

  const incomes = useSelector((state) => state.funds.funds.incomes);

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Header />

        <div className="app main">
          <div className="app-container grid grid--1-3cols">
            <div className="app-flex">
              {currentLocation === 'incomes' ? (
                <>
                  <CurrentPersonCategories type={currentLocation} person={person} />
                  <CreatePerson />
                  <EditPerson person={person} />
                </>
              ) : (
                <>
                  <Categories type={mainLocation} />
                  <CreatePerson />
                </>
              )}
              <Chart />
            </div>
            <Transactions data={incomes} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Receipts;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactions } from '../../redux/funds/transactions';

import Chart from '../../components/chart';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Categories from '../categories/Categories';
import Transactions from '../../components/Transactions';

import EditPerson from '../people/EditPerson';
import CreatePerson from '../people/CreatePerson';
import CurrentPersonCategories from '../categories/CurrentPersonCategories';

import './main.css';

const Receipts = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [open, setOpen] = useState('hidden');

  const currentLocation = location.pathname.split('/')[3];
  const mainLocation = location.pathname.split('/')[1];
  const person = location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const incomes = useSelector((state) => state.transactions.transactions.incomes);

  return (
    <div className="dashboard">
      <Sidebar setOpen={setOpen} />
      <main>
        <Header />

        <div className="app main">
          <div className="app-container grid grid--1-3cols">
            <div className="app-flex">
              {currentLocation === 'incomes' ? (
                <>
                  <CurrentPersonCategories type={currentLocation} person={person} />
                  <CreatePerson />
                  <EditPerson open={open} setOpen={setOpen} />
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

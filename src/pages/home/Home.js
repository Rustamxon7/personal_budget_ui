import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactions } from '../../redux/funds/transactions';

import Chart from '../../components/chart';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Transactions from '../../components/Transactions';

import CreatePerson from '../people/CreatePerson';
import Categories from '../categories/Categories';

import './main.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const transactions = useSelector((state) => state.transactions.transactions.transactions);

  return (
    <div className="dashboard">
      <Sidebar home />
      <main>
        <Header />
        <div className="app main">
          <div className="app-container grid grid--1-3cols">
            <div className="app-flex">
              <Categories />
              <Chart />
              <CreatePerson />
            </div>
            <Transactions data={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFunds } from '../../redux/funds/funds';

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
    dispatch(fetchFunds(1));
  }, [dispatch]);

  const funds = useSelector((state) => state.funds.funds.recent);

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
            <Transactions data={funds} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

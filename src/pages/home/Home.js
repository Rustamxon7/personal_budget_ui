/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Categories from '../categories/Categories';
import Chart from '../../components/chart';
import Transactions from '../../components/Transactions';
import CreatePerson from '../people/CreatePerson';
import { fetchFunds } from '../../redux/funds/funds';

import './main.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFunds(1));
  }, [dispatch]);

  const funds = useSelector((state) => state.funds.funds.funds);

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

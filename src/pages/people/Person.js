/* eslint-disable func-names */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactions } from '../../redux/funds/transactions';
import { fetchPersons } from '../../redux/people/person';

import EditPerson from './EditPerson';
import CreatePerson from './CreatePerson';
import CurrentPersonCategories from '../categories/CurrentPersonCategories';

import Chart from '../../components/chart';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import Transactions from '../../components/Transactions';

const PersonInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  localStorage.setItem('currentPerson', location.pathname.split('/')[2]);

  const [open, setOpen] = useState('hidden');

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchTransactions());
  }, [dispatch, location]);

  const persons = useSelector((state) => state.people.people);

  const person = persons.find((person) => person.id === Number(location.pathname.split('/')[2]));

  const transactions = useSelector((state) => state.transactions.transactions.transactions);

  return (
    <div className="dashboard">
      {person ? (
        <>
          <Sidebar setOpen={setOpen} />
          <main>
            <Header />
            <div className="app main">
              <div className="app-container grid grid--1-3cols">
                <div className="app-flex">
                  <CurrentPersonCategories type={person.id} />
                  <Chart />
                  <CreatePerson />
                  <EditPerson open={open} setOpen={setOpen} />
                </div>
                <div>
                  <Transactions data={transactions} />
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <p>No person found</p>
      )}
    </div>
  );
};

export default PersonInfo;

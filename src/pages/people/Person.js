import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFunds } from '../../redux/funds/funds';
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

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchFunds(1));
  }, [dispatch, location]);

  const persons = useSelector((state) => state.people.people);

  const person = persons.find((person) => person.id === Number(location.pathname.split('/')[2]));

  const funds = useSelector((state) => state.funds.funds.funds);

  return (
    <div className="dashboard">
      {person ? (
        <>
          <Sidebar personId={person.id} />
          <main>
            <Header />
            <div className="app main">
              <div className="app-container grid grid--1-3cols">
                <div className="app-flex">
                  <CurrentPersonCategories type={person.id} />
                  <Chart />
                  <CreatePerson />
                  <EditPerson person={person} />
                </div>
                <div>
                  <Transactions data={funds} />
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

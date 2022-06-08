import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { fetchPersons } from '../../redux/people/person';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import CurrentPersonCategories from '../categories/CurrentPersonCategories';

const PersonInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPersons());
  }, [dispatch, location]);

  const persons = useSelector((state) => state.people.people);

  const person = persons.find((person) => person.id === Number(location.pathname.split('/')[2]));

  return (
    <div className="app">
      {person ? (
        <>
          <div className="dashboard">
            <Sidebar id={person.id} />
            <Header />
            <div className="container">
              <div className="main">
                <div className="main--title">
                  <h2>Monthly Budget</h2>
                  <NavLink to={`/people/${person.id}/create-category`}>
                    <ion-icon name="add-outline" />
                  </NavLink>
                </div>

                <CurrentPersonCategories id={person.id} />

                <div className="main--chart" />
              </div>
              <div className="right--sidebar">
                <div className="right--sidebar__title">
                  <h2>This week</h2>
                  <span className="transactions">-$2400</span>
                </div>

                <div className="transactions--cards">
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                  <div className="transaction--card" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No person found</p>
      )}
    </div>
  );
};

export default PersonInfo;

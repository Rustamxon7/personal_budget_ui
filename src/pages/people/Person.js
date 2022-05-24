import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPerson } from '../../redux/people/loadPerson';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const PersonInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPerson(location.pathname.split('/')[2]));
  }, [dispatch, location]);

  const person = useSelector((state) => state.persons.people);

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
                  <ion-icon name="add-outline" />
                </div>

                <div className="categories--cards">
                  <div className="card">
                    <ion-icon name="car-outline" />
                    <div className="card--info">
                      <h3>Shopping</h3>
                      <p>
                        <span>$</span>
                        <span>0</span>
                      </p>
                    </div>
                  </div>
                  <div className="card">
                    <ion-icon name="home-outline" />
                    <div className="card--info">
                      <h3>Shopping</h3>
                      <p>
                        <span>$</span>
                        <span>0</span>
                      </p>
                    </div>
                  </div>
                  <div className="card">
                    <ion-icon name="cart-outline" />
                    <div className="card--info">
                      <h3>Shopping</h3>
                      <p>
                        <span>$</span>
                        <span>0</span>
                      </p>
                    </div>
                  </div>
                  <div className="card">
                    <ion-icon name="construct-outline" />
                    <div className="card--info">
                      <h3>Shopping</h3>
                      <p>
                        <span>$</span>
                        <span>0</span>
                      </p>
                    </div>
                  </div>
                  <div className="card">
                    <ion-icon name="videocam-outline" />
                    <div className="card--info">
                      <h3>Shopping</h3>
                      <p>
                        <span>$</span>
                        <span>0</span>
                      </p>
                    </div>
                  </div>
                  <div className="card">
                    <ion-icon name="airplane" />
                    <div className="card--info">
                      <h3>Shopping</h3>
                      <p>
                        <span>$</span>
                        <span>0</span>
                      </p>
                    </div>
                  </div>
                </div>

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

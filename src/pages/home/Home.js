/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import './main.css';

const Home = () => (
  <div className="dashboard">
    <Sidebar />
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
);

export default Home;

import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Categories from '../categories/Categories';
import './main.css';

const Home = () => (
  <div className="dashboard">
    <Sidebar />
    <Header />
    <div className="container">
      <div className="main">
        <div className="main--title">
          <h2>Monthly Budget</h2>
          <NavLink to="/create-category">
            <ion-icon name="add-outline" />
          </NavLink>
        </div>

        <Categories />

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

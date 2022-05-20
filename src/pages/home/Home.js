/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import NavBar from '../../components/NavBar';
import PeopleSidenav from '../people/People';
import './main.scss';

const Home = () => (
  <div className="app">
    <main>
      <NavBar />
      <section className="section-dashboard">
        <div className="container">
          <div className="dashboard">test</div>
        </div>
      </section>
    </main>
    <PeopleSidenav />
  </div>
);

export default Home;

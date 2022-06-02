/* eslint-disable max-len */
/* eslint-disable indent */
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentUser, logout } from '../redux/auth';

const Sidebar = () => {
  const currentPerson = useLocation().pathname.split('/')[2];

  const isAuthenticated = useSelector(loadCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar__title">
        <img className="logo" src="img/beedget.svg" alt="Beedget logo" />
        <span>beedget</span>
      </div>
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {!currentPerson && (
            <>
              <li>
                <NavLink activeclassname="active" className="sidebar__nav-link" to="/" exact="true">
                  <ion-icon name="home" />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" className="sidebar__nav-link" to="/incomes" exact="true">
                  <ion-icon name="cash-outline" />
                  <span>Receipts</span>
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" className="sidebar__nav-link" to="/expenses" exact="true">
                  <ion-icon name="wallet-outline" />
                  <span>Expenses</span>
                </NavLink>
              </li>
            </>
          )}

          {currentPerson && (
            <>
              <li>
                <NavLink activeclassname="active" className="sidebar__nav-link" to={`/people/${currentPerson}`} exact="true">
                  <ion-icon name="home" />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="sidebar__nav-link" activeclassname="active" to={`/people/${currentPerson}/incomes`} exact="true">
                  <ion-icon name="cash-outline" />
                  <span>Receipts</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="sidebar__nav-link" activeclassname="active" to={`/people/${currentPerson}/expenses`} exact="true">
                  <ion-icon name="wallet-outline" />
                  <span>Expences</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="sidebar__nav-link" activeclassname="active" to={`/people/${currentPerson}/edit`} exact="true">
                  <ion-icon name="create-outline" />
                  <span>Edit Person</span>
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <li>
              <NavLink className="sidebar__nav-link" type="button" onClick={handleLogout} to="/">
                <ion-icon icon="log-out" />
                <span>Log Out</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </nav>
  );
};

Sidebar.defaultProps = {
  name: '',
};

export default Sidebar;

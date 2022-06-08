/* eslint-disable max-len */
/* eslint-disable indent */
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentUser, logout } from '../redux/auth';

const Sidebar = ({ setOpen }) => {
  const currentPerson = useLocation().pathname.split('/')[2];

  const validateCurrentPerson = localStorage.getItem('currentPerson');

  const isAuthenticated = useSelector(loadCurrentUser);
  const dispatch = useDispatch();

  const location = useLocation();

  const homeLocation = location.pathname.split('/')[1];

  const handleLogout = () => {
    dispatch(logout);
    localStorage.clear();
    window.location.reload();
  };

  const handleClick = () => {
    setOpen('');
  };

  return (
    <nav className="sidebar">
      <NavLink className="sidebar__title" to="/">
        <img className="logo" src="img/beedget.svg" alt="Beedget logo" />
        <span>beedget</span>
      </NavLink>
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {currentPerson !== 'people' && homeLocation !== 'people' && (
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
                  <span>Receiptss</span>
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" className="sidebar__nav-link" to="/expenses" exact="true">
                  <ion-icon name="wallet-outline" />
                  <span>Expensess</span>
                </NavLink>
              </li>
            </>
          )}

          {homeLocation === 'people' && (
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
              {validateCurrentPerson === currentPerson && (
                <li>
                  <NavLink className="sidebar__nav-link" onClick={handleClick} to="#">
                    <ion-icon name="create-outline" />
                    <span>Edit Person</span>
                  </NavLink>
                </li>
              )}
            </>
          )}

          {isAuthenticated && !homeLocation && (
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

export default Sidebar;

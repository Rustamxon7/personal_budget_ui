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

  const links = [
    {
      id: 1,
      path: '/',
      text: 'Home',
      icon: 'home',
    },
    {
      id: 2,
      path: '/',
      text: 'Receipts',
      icon: 'cash-outline',
    },
    {
      id: 3,
      path: '/',
      text: 'Expenses',
      icon: 'wallet-outline',
    },
  ];

  return (
    <nav className="left--sidebar">
      <div className="sidebar--title">Personal Budget</div>
      <div className="sidebar--menu">
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <NavLink activeclassname="active" to={link.path} exact="true">
                <ion-icon name={link.icon} />
                <span>{link.text}</span>
              </NavLink>
            </li>
          ))}
          {currentPerson && (
            <li>
              <NavLink activeclassname="active" to={`/people/${currentPerson}/edit`} exact="true">
                <ion-icon name="create-outline" />
                <span>Edit Person</span>
              </NavLink>
            </li>
          )}

          {isAuthenticated && (
            <li className="log-out">
              <a href="/" className="" type="button" onClick={handleLogout}>
                <ion-icon icon="log-out" />
                <span>Log Out</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

Sidebar.defaultProps = {
  name: '',
};

export default Sidebar;

/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentUser, logout } from '../redux/auth';

const Sidebar = (props) => {
  const { id } = props;

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
    {
      id: 4,
      path: '/people',
      text: 'People',
      icon: 'users',
    },
  ];

  console.log(props);

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

          {id && (
            <li>
              <NavLink activeclassname="active" to={`/people/${id}/edit`} exact="true">
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

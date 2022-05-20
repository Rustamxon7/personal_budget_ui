/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentUser, logout } from '../redux/auth';

const NavBar = (props) => {
  const { name, id } = props;

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
    },
    {
      id: 2,
      path: '/people',
      text: 'People',
    },
    {
      id: 3,
      path: `/people/${id}/edit`,
      text: 'Edit Person',
    },
  ];

  return (
    <nav className="nav">
      <a className="nav__logo" href="/">
        {name ? (
          <span className="nav__logo-person">
            {name}
            &apos;s Personal Budget
          </span>
        ) : (
          <span className="nav__logo-person">Personal Budget</span>
        )}
      </a>
      <ul className="nav__list">
        {links.map((link) => (
          <li key={link.id}>
            <NavLink activeclassname="active" to={link.path} exact="true">
              {link.text}
            </NavLink>
          </li>
        ))}
        {isAuthenticated && (
          <li className="log-out">
            <a href="/" className="" type="button" onClick={handleLogout}>
              Log Out
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

NavBar.defaultProps = {
  name: '',
};

export default NavBar;

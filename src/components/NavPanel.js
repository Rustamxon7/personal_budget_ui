import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentUser, logout } from '../redux/auth';

const NavPanel = () => {
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
  ];

  return (
    <section>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.id} className="">
              <NavLink activeclassname="active" to={link.path} exact="true">
                {link.text}
              </NavLink>
            </li>
          ))}

          {isAuthenticated && (
            <li className="log-out">
              <a href="/" className="" type="button" onClick={handleLogout}>Log Out</a>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default NavPanel;

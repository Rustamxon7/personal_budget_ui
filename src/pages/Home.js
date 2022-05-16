import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentUser, logout } from '../redux/auth';

const Home = () => {
  const isAuthenticated = useSelector(loadCurrentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout);
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        {isAuthenticated ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button type="button">Login</button>
        )}
      </div>
    </div>
  );
};

export default Home;

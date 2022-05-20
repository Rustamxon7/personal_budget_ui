import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentUser, logout } from '../redux/auth';
import NavPanel from '../components/NavPanel';

const Home = () => {
  const isAuthenticated = useSelector(loadCurrentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout);
    window.location.reload();
  };

  // if authtoken is not set show link to login

  return (
    <>
      <div>
        <h1>Home</h1>
        <div>{isAuthenticated.data.id}</div>
        {handleLogout}
      </div>
      <NavPanel />
    </>
  );
};

export default Home;

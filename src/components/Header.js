import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentUser } from '../redux/auth';
import PeopleList from '../pages/people/PeopleList';
import { fetchCurrentUser } from '../redux/users/currentUser';

const Headers = () => {
  const isAuthenticated = useSelector(loadCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.user.user);

  const [isHover, setIsHover] = useState('hidden');

  const handleHover = () => {
    setIsHover(isHover === 'hidden' ? 'show' : 'hidden');
  };

  return (
    <header className="header">
      <ion-icon class="header--icon" name="search" />
      <input type="text" placeholder="Search" />
      <ion-icon class="notification header--icon" name="notifications-outline" />
      {isAuthenticated.data.email ? <ion-icon class="profile--icon header--icon" name="person-circle-outline" onClick={handleHover} /> : <ion-icon class="profile--icon header--icon" name="person-outline" />}
      <PeopleList currentUser={currentUser} isHover={isHover} setIsHover={setIsHover} />
    </header>
  );
};

export default Headers;

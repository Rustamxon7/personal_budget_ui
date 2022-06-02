/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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

  const handleHover = () => {
    const peopleMenu = document.querySelector('.persons--menu');

    if (peopleMenu.classList.contains('hidden')) {
      peopleMenu.classList.remove('hidden');
    } else {
      peopleMenu.classList.add('hidden');
    }
  };

  return (
    <header className="header">
      <ion-icon name="search" />
      <input type="text" placeholder="Search" />
      <ion-icon class="notification" name="notifications-outline" />
      {isAuthenticated.data.email ? <ion-icon class="profile--icon header__profile-icon" name="person-circle-outline" onClick={handleHover} /> : <ion-icon class="profile--icon header__profile-icon" name="person-outline" />}
      <div className="persons--menu hidden">
        <div className="persons--menu__title">
          <span className="menu--user__name">{currentUser.name}</span>
          <span className="user--avatar">
            <ion-icon name="person-circle-outline" />
          </span>
          <NavLink to="/user/edit" className="edit--person">
            <ion-icon name="create-outline" />
          </NavLink>
        </div>
        <PeopleList />
      </div>
    </header>
  );
};

export default Headers;

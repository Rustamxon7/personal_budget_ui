import React from 'react';
import { useSelector } from 'react-redux';
import { loadCurrentUser } from '../redux/auth';
import PeopleList from '../pages/people/PeopleList';

const Headers = () => {
  const isAuthenticated = useSelector(loadCurrentUser);

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
      <div className="searchbar">
        <ion-icon name="search-outline" class="searchbar--icon" />
        <input type="text" placeholder="Search" className="searchbar--input" />
      </div>
      <div className="profile">
        <ion-icon class="notification" name="notifications-outline" />
        {isAuthenticated.data.email ? <ion-icon class="profile--icon" name="person-circle-outline" onClick={handleHover} /> : <ion-icon class="profile--icon" name="person-outline" />}
      </div>
      <div className="persons--menu hidden">
        <h3 className="persons--menu__title">All Persons list...</h3>
        <PeopleList />
      </div>
    </header>
  );
};

export default Headers;

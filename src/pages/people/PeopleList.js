import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import Reloader from '../../components/Reload';
import { fetchCurrentUser } from '../../redux/users/currentUser';
import { fetchPersons, deletePersonAction } from '../../redux/people/person';

const PeopleList = ({ currentUser, isHover }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const people = useSelector((state) => state.people.people);

  const navigate = useNavigate();

  const handleHover = () => {
    const personOverlay = document.querySelector('.person--overlay');
    const personPopup = document.querySelector('.person--popup');

    if (personOverlay.classList.contains('hidden')) {
      personOverlay.classList.remove('hidden');
      personPopup.classList.remove('hidden');
    }
  };

  const deletePerson = (id) => {
    dispatch(deletePersonAction(id));
    navigate('/');
    Reloader(1000);
  };

  const peopleList = people.length ? (
    people.map((person) => (
      <li className="sidebar__user" key={person.id}>
        <NavLink to={`/people/${person.id}`}>
          <span>
            <img className="person--profile__icon" src={`img/icons/${person.icon}.svg`} alt="Profile" />
            {person.name}
          </span>
          <ion-icon class="trash--icon" name="trash-outline" onClick={() => deletePerson(person.id)} />
        </NavLink>
      </li>
    ))
  ) : (
    <span>No people yet</span>
  );

  return (
    <>
      <div className={`persons--menu ${isHover}`}>
        <div className="persons--menu__title">
          <span className="menu--user__header">{currentUser.name}</span>
          <span className="user--avatar">
            <ion-icon name="person-circle-outline" class="user--avatar__icon" />
          </span>
        </div>
        <ul>
          {peopleList}
          <li>
            <button type="button" className="btn btn--small add--person" onClick={handleHover}>
              Add
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PeopleList;

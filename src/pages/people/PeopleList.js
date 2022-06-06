import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchPersons, deletePersonAction } from '../../redux/people/person';
import { fetchCurrentUser } from '../../redux/users/currentUser';

const PeopleList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const people = useSelector((state) => state.people.people);

  const handleCreatePerson = () => {
    const overlay = document.querySelector('.person--overlay');
    overlay.classList.remove('hidden');
    const popup = document.querySelector('.person--popup');
    popup.classList.remove('hidden');
  };

  const navigate = useNavigate();

  const deletePerson = (id) => {
    dispatch(deletePersonAction(id));
    setTimeout(() => {
      navigate('/');
      window.location.reload(true);
    }, 1000);
  };

  const peopleList =
    people.length > 0 ? (
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
      <ul>
        {peopleList}
        <li>
          <button type="button" className="btn btn--small add--person" onClick={handleCreatePerson}>
            Add
          </button>
        </li>
      </ul>
    </>
  );
};

export default PeopleList;

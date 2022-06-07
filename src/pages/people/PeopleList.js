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
            <img className="person--profile__icon" src={`img/icons/${person.icon}.svg`} alt="Profile" />
            <span>{person.name}</span>
            <ion-icon name="trash-outline" onClick={() => deletePerson(person.id)} />
          </NavLink>
        </li>
      ))
    ) : (
      <span>No people yet</span>
    );

  return (
    <ul>
      {peopleList}
      <li>
        <NavLink to="/create_person">
          <ion-icon name="add-outline" />
          <span>Add</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default PeopleList;

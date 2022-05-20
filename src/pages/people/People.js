import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loadCurrentUser } from '../../redux/auth';
import { fetchPeople } from '../../redux/people/loadPerson';
import { deletePersonAction } from '../../redux/people/person';

const PeopleSidenav = () => {
  const isAuthenticated = useSelector(loadCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  const people = useSelector((state) => state.persons.people);

  const navigate = useNavigate();

  const deletePerson = (id) => {
    dispatch(deletePersonAction(id));
    setTimeout(() => {
      navigate('/');
      window.location.reload(true);
    }, 1000);
  };

  const peopleList = people.length > 0 ? (
    people.map((person) => (
      <li className="sidebar__user" key={person.id}>
        <NavLink to={`/people/${person.id}`}>
          <img src={`img/icons/${person.icon}.svg`} alt="Profile" />
          <span>{person.name}</span>
          <ion-icon name="chevron-forward-outline" />
        </NavLink>
        <ion-icon name="trash-outline" onClick={() => deletePerson(person.id)} />
      </li>
    ))
  ) : (
    <span>No people yet</span>
  );

  return (
    <aside className="sidebar sidebar-container">
      <div className="sidebar-profile">
        <img src="img/profile-1.jpg" alt="Profile" />
        <p className="sidebar-profile__name">{isAuthenticated.data.email}</p>
      </div>
      <div className="sidebar__list">
        <div className="sidebar__list-header">
          <div className="sidebar__list-title">Persons</div>
          <NavLink to="/create_person" className="sidebar__list-add-icon">
            <ion-icon name="add-outline" />
          </NavLink>
        </div>
        <ul className="sidebar__users">{peopleList}</ul>
      </div>
    </aside>
  );
};

export default PeopleSidenav;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadCurrentUser } from '../../redux/auth';
import { fetchPerson } from '../../redux/people/loadPerson';
import { updatePersonAction } from '../../redux/people/person';

function EditPerson() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loadCurrentUser);
  const location = useLocation();

  const person = useSelector((state) => state.persons.people);
  const loading = useSelector((state) => state.persons.loading);

  useEffect(() => {
    dispatch(fetchPerson(location.pathname.split('/')[2]));
  }, [dispatch, location]);

  const navigate = useNavigate();

  const [name, setName] = useState(person.name);
  const [icon, setIcon] = useState(person.icon);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePersonAction({
        id: person.id,
        name,
        icon,
        user_id: isAuthenticated.data.id,
      }),
    );
    setName('');
    setIcon('');
    navigate('/');
    window.location.reload();
  };

  const userImages = document.querySelectorAll('#user-image');

  userImages.forEach((img) => {
    if (img.dataset.userType === person.icon) {
      img.classList.add('selected');
    }
  });

  const handleChange = (e) => {
    setIcon(e.target.dataset.userType);
    userImages.forEach((img) => {
      img.classList.remove('active');
      img.classList.remove('selected');
    });
    e.target.classList.add('active');
  };

  const iconsList = (
    <>
      <img id="user-image" src="img/icons/man.svg" alt="Man" data-user-type="man" />
      <img id="user-image" src="img/icons/woman.svg" alt="Woman" data-user-type="woman" />
      <img id="user-image" src="img/icons/child.svg" alt="Child" data-user-type="child" />
    </>
  );
  return (
    <div className="container container--center">
      <div className="login">
        <div className="login__header">
          <h1 className="login__title">Edit Person</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form action="" className="login__form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={person.name} />
            </div>
            <div className="login__option" onClick={handleChange} onKeyDown={handleChange} role="button" tabIndex="0">
              {iconsList}
            </div>
            <button type="submit">Add</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditPerson;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPersonAction } from '../../redux/people/person';
import { loadCurrentUser } from '../../redux/auth';

function CreatePerson() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loadCurrentUser);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  // after the form is submitted, we want to clear the form and redirect to home page

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPersonAction({
        name,
        icon,
        user_id: isAuthenticated.data.id,
      })
    );
    setName('');
    setIcon('');
    navigate('/');
    window.location.reload();
  };

  const userImages = document.querySelectorAll('#user-image');

  const handleChange = (e) => {
    setIcon(e.target.dataset.userType);
    userImages.forEach((img) => img.classList.remove('active'));
    e.target.classList.add('active');
  };

  return (
    <div className="container container--center">
      <div className="login">
        <div className="login__header">
          <h1 className="login__title">Add Other Person</h1>
        </div>

        <form action="" className="login__form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="login__option" onClick={handleChange}>
            <img value={icon} id="user-image" src="img/icons/man.svg" alt="Man" data-user-type="man" />
            <img value={icon} id="user-image" src="img/icons/woman.svg" alt="Woman" data-user-type="woman" />
            <img value={icon} id="user-image" src="img/icons/child.svg" alt="Child" data-user-type="child" />
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePerson;

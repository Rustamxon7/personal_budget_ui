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
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 1000);
  };

  const userImages = document.querySelectorAll('#user-image');

  const handleChange = (e) => {
    setIcon(e.target.dataset.userType);
    userImages.forEach((img) => img.classList.remove('active--person'));
    e.target.classList.add('active--person');
  };

  return (
    <div className="contents">
      <div className="content--right">
        <div className="header">
          <h1 className="sessions--title">Personal Budget</h1>
        </div>
        <form action="#" method="post" className="form" onSubmit={handleSubmit}>
          <h2 className="form--title">Create Person</h2>
          <p className="sub--title">Please fill out the form below to create a new person.</p>
          <div className="form--group">
            <label htmlFor="name">Name</label>
            <input className="form--control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form--group persons--choice" id="description" onClick={handleChange} role="button" tabIndex="0" onKeyDown={handleChange}>
            <img value={icon} id="user-image" src="img/icons/man.svg" alt="Man" data-user-type="man" />
            <img value={icon} id="user-image" src="img/icons/woman.svg" alt="Woman" data-user-type="woman" />
            <img value={icon} id="user-image" src="img/icons/child.svg" alt="Child" data-user-type="child" />
          </div>
          <div className="form--group">
            <input type="submit" value="Sign in" className="submit--btn" />
          </div>
        </form>
      </div>
      <div className="content--left">
        <img src="img/success_factors.svg" alt="Success Factors" className="welcome--img" />
      </div>
    </div>
  );
}

export default CreatePerson;

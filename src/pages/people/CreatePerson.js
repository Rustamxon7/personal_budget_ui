import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Reloader from '../../components/Reload';
import { loadCurrentUser } from '../../redux/auth';
import { createPersonAction } from '../../redux/people/person';

function CreatePerson() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loadCurrentUser);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  const closePopup = () => {
    const overlay = document.querySelector('.person--overlay');
    overlay.classList.add('hidden');
    const popup = document.querySelector('.person--popup');
    popup.classList.add('hidden');
  };

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
    Reloader(1000);
    navigate('/');
  };

  const userImages = document.querySelectorAll('#user-image');

  const handleChange = (e) => {
    setIcon(e.target.dataset.userType);
    userImages.forEach((img) => img.classList.remove('active--person'));
    e.target.classList.add('active--person');
  };

  return (
    <>
      <div className="overlay person--overlay hidden" onClick={closePopup} onKeyDown={closePopup} role="button" tabIndex="0" aria-label="overlay" />
      <div className="popup person--popup hidden">
        <form action="#" className="popup__form popup__form--one" onSubmit={handleSubmit}>
          <div className="form--group">
            <label htmlFor="name">Name</label>
            <input className="form--control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form--group persons--choice" id="description" onClick={handleChange} role="button" tabIndex="0" onKeyDown={handleChange}>
            <img value={icon} id="user-image" src="img/icons/man.svg" alt="Man" data-user-type="man" />
            <img value={icon} id="user-image" src="img/icons/woman.svg" alt="Woman" data-user-type="woman" />
            <img value={icon} id="user-image" src="img/icons/child.svg" alt="Child" data-user-type="child" />
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePerson;

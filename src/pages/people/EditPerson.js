import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { loadCurrentUser } from '../../redux/auth';
import { updatePersonAction, fetchPersons } from '../../redux/people/person';

function EditPerson() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loadCurrentUser);
  const location = useLocation();

  const persons = useSelector((state) => state.people.people);
  const person = persons.find((person) => person.id === Number(location.pathname.split('/')[2]));

  useEffect(() => {
    dispatch(fetchPersons(location.pathname.split('/')[2]));
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
      })
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
      img.classList.remove('active--person');
      img.classList.remove('selected');
    });
    e.target.classList.add('active--person');
  };

  const handleClick = () => {
    const overlay = document.querySelector('.edit--person__overlay');
    const popUp = document.querySelector('.edit--person__popup');

    if (overlay.classList.contains('hidden')) {
      overlay.classList.remove('hidden');
      popUp.classList.remove('hidden');
    } else {
      overlay.classList.add('hidden');
      popUp.classList.add('hidden');
    }
  };

  const iconsList = (
    <>
      <img id="user-image" src="img/icons/man.svg" alt="Man" data-user-type="man" />
      <img id="user-image" src="img/icons/woman.svg" alt="Woman" data-user-type="woman" />
      <img id="user-image" src="img/icons/child.svg" alt="Child" data-user-type="child" />
    </>
  );
  return (
    <>
      <div className="overlay hidden edit--person__overlay" onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex="0" aria-label="overlay" />
      <div className="popup hidden person--popup edit--person__popup">
        <form action="" className="popup__form popup__form--one" onSubmit={handleSubmit}>
          <div className="form--group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="input-feedback" value={name} onChange={(e) => setName(e.target.value)} placeholder={person.name} />
          </div>
          <div className="form--group persons--choice" onClick={handleChange} onKeyDown={handleChange} role="button" tabIndex="0">
            {iconsList}
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditPerson;

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
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 1000);
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

  const iconsList = (
    <>
      <img id="user-image" src="img/icons/man.svg" alt="Man" data-user-type="man" />
      <img id="user-image" src="img/icons/woman.svg" alt="Woman" data-user-type="woman" />
      <img id="user-image" src="img/icons/child.svg" alt="Child" data-user-type="child" />
    </>
  );
  return (
    <div className="contents">
      <div className="content--right">
        <div className="header">
          <h1 className="sessions--title">Edit Person</h1>
        </div>
        <form action="" className="form" onSubmit={handleSubmit}>
          <h2 className="form--title">Edit Person</h2>
          <p className="sub--title">Please fill out the form below to create a new person.</p>
          <div className="form--group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form--control" value={name} onChange={(e) => setName(e.target.value)} placeholder={person.name} />
          </div>
          <div className="form--group persons--choice" onClick={handleChange} onKeyDown={handleChange} role="button" tabIndex="0">
            {iconsList}
          </div>
          <div className="form--group">
            <input type="submit" value="Edit" className="submit--btn" />
          </div>
        </form>
      </div>
      <div className="content--left">
        <img src="img/success_factors.svg" alt="Success Factors" className="welcome--img" />
      </div>
    </div>
  );
}

export default EditPerson;

/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadCurrentUser } from '../../redux/auth';
import { fetchCurrentUser } from '../../redux/users/currentUser';
import { fetchUpdateUser } from '../../redux/users/editUser';

function EditCurrentUser() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loadCurrentUser);
  const location = useLocation();

  const currentUser = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch, location]);

  const navigate = useNavigate();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchUpdateUser({
        id: isAuthenticated.data.id,
        name,
      })
    );
    setName('');
    setEmail('');
    navigate('/');
    window.location.reload();
  };

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
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={currentUser.name} />
              <label htmlFor="email">Email</label>
              <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={currentUser.email} />
            </div>
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditCurrentUser;

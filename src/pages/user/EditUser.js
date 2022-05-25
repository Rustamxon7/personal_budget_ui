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
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 1000);
  };

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
            <input type="text" id="name" className="form--control" value={name} onChange={(e) => setName(e.target.value)} placeholder={currentUser.name} />
          </div>

          <div className="form--group">
            <label htmlFor="name">Email</label>
            <input type="text" id="email" className="form--control" value={email} onChange={(e) => setName(e.target.value)} placeholder={currentUser.email} />
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

export default EditCurrentUser;

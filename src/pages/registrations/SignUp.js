import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '../../redux/auth';
import '../../sass/main.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email').required('Email is required!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required!'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required!'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        dispatch(signup(values));
        setSubmitting(false);
        navigate('/');
      }}
      className="form"
    >
      {({
        values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
      }) => (
        <>
          <div className="login">
            <div className="login__content-box">
              <div className="login__logo">
                <img className="logo" src="img/beedget.svg" alt="Beedget logo" />
                <span>beedget</span>
              </div>
              <div className="login__box">
                <div className="login__form" action="">
                  <h1 className="heading-primary">Welcome to beedget!</h1>
                  <h4 className="subheading">Please enter your details.</h4>
                  <form onSubmit={handleSubmit}>
                    <label className="login__label" htmlFor="name">
                      Name
                    </label>
                    <input className="login__input" type="text" name="name" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && touched.name && <div className="error">{errors.name}</div>}
                    <br />

                    <label className="login__label" htmlFor="email">
                      Email
                    </label>

                    <input className="login__input" type="email" name="email" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                    {errors.email && touched.email && <div className="error">{errors.email}</div>}
                    <br />

                    <label className="login__label" htmlFor="password">
                      Password
                    </label>

                    <input className="login__input" type="password" name="password" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                    {errors.password && touched.password && <div className="error">{errors.password}</div>}
                    <br />

                    <label className="login__label" htmlFor="password_confirmation">
                      Password Confirmation
                    </label>

                    <input className="login__input" type="password" name="password_confirmation" id="password_confirmation" value={values.password_confirmation} onChange={handleChange} onBlur={handleBlur} />
                    {errors.password_confirmation && touched.password_confirmation && <div className="error">{errors.password_confirmation}</div>}
                    <br />

                    <button className="btn" type="submit" disabled={isSubmitting}>
                      Sign Up
                    </button>
                  </form>
                  <p className="login__text">
                    Already have an account?
                    <strong>
                      <Link to="/users/login">Login</Link>
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="login__image-box">&nbsp;</div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default SignUp;

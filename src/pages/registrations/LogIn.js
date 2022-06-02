/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/auth';
import '../../sass/main.scss';

const LogIn = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required!'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        dispatch(login(values));
        setSubmitting(false);
      }}
      className="form"
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <>
          <div className="login">
            <div className="login__content-box">
              <div className="login__logo">
                <img className="logo" src="img/beedget.svg" alt="Beedget logo" />
                <span>beedget</span>
              </div>
              <div className="login__box">
                <div className="login__form" action="">
                  <h1 className="heading-primary">Welcome back!</h1>
                  <h4 className="subheading">Please enter your details.</h4>
                  <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn" disabled={isSubmitting}>
                      Submit
                    </button>
                    <br />
                    <br />
                    <p className="login__text">
                      Don&apos;t have an account?
                      <strong>
                        <Link to="/users/signup">Sign up</Link>
                      </strong>
                    </p>
                  </form>
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

export default LogIn;

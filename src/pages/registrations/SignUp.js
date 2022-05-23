/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../../redux/auth';

const SignUp = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(signup(data));
  };

  const error = useSelector((state) => state.auth.error);

  return (
    <div className="contents">
      <div className="content--right">
        <div className="header">
          <h1 className="sessions--title">Personal Budget</h1>
        </div>
        <form action="#" method="post" className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form--title">Welcome</h2>
          <p className="sub--title">Welcome! Please enter your details.</p>
          <div className="form--group">
            <label htmlFor="username">Email</label>
            <input type="text" name="username" id="username" className="form--control" {...register('email', { required: true })} />
          </div>
          <div className="form--group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="form--control" {...register('password', { required: true })} />
          </div>
          <div className="form--group">
            <input type="submit" value="Sign up" className="submit--btn" />
          </div>
          {
            // show error if there any error else show login
            error && <p className="error">{error}</p>
          }
          <p className="link-to">
            Already have an account?
            {' '}
            <Link to="/users/login">Login</Link>
          </p>
        </form>
      </div>
      <div className="content--left">
        <img src="img/success_factors.svg" alt="Success Factors" className="welcome--img" />
      </div>
    </div>
  );
};

export default SignUp;

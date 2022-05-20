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
    <div className="container container--center">
      <div className="login">
        <div className="login__header">
          <h1 className="login__title">Log In</h1>
        </div>

        <form action="" className="login__form" onSubmit={handleSubmit(onSubmit)} method="post">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register('email', { required: true })} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register('password', { required: true })} />
          </div>
          <button type="submit">Sign Up</button>
          {
            // show error if there any error else show login
            error && <p className="error">{error}</p>
          }
          <p>
            Already have an account?
            <Link to="/users/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
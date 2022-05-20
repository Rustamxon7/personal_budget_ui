/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../redux/auth';

const SignUp = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(signup(data));
  };

  const error = useSelector((state) => state.auth.error);

  return (
    <div className="">
      <div className="">
        <form className="col" onSubmit={handleSubmit(onSubmit)} method="post">
          <input className="" name="email" placeholder="Email" {...register('email', { required: true })} />
          <input className="" name="password" type="password" placeholder="Password" {...register('password', { required: true })} />
          <input className="" type="submit" value="Sign Up" />
        </form>
        <small className="">
          Already have an account?
          <Link className="" to="/users/login">
            Log In
          </Link>
        </small>
        {error}
      </div>
    </div>
  );
};

export default SignUp;

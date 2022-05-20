/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/auth';

const LogIn = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className="">
      <div className="">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <input className="" name="email" placeholder="Email" {...register('email', { required: true })} />
          <input className="" type="password" name="password" placeholder="Password" {...register('password', { required: true })} />
          <input
            className=""
            type="submit"
            value="Log In"
          />
        </form>
        <small className="">
          Don&apos;t have an account?
          <Link className="" to="/users/signup">Sign Up</Link>
        </small>
      </div>
    </div>
  );
};

export default LogIn;

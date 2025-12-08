import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate(); // for navigation

  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then(result => console.log('Logged in user:', result.user))
      .catch(error => console.log('Login error:', error.message));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => console.log('Google user:', result.user))
      .catch(error => console.log('Google SignIn error:', error.message));
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500">Password must be at least 6 characters</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-neutral mt-4 w-full">Login</button>

          <hr className="my-4" />

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full mb-2"
          >
            Sign in with Google
          </button>

          {/* Register Button */}
          <button
            type="button"
            onClick={goToRegister}
            className="btn btn-primary w-full"
          >
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;

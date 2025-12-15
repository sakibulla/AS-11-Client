import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = (data) => {
    setLoading(true);
    loginUser(data.email, data.password)
      .then(() => {
        toast.success('Login successful!', { autoClose: 3000 });
        navigate('/');
      })
      .catch(error => {
        toast.error(error.message || 'Login failed', { autoClose: 3000 });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success('Google login successful!', { autoClose: 3000 });
        navigate('/');
      })
      .catch(error => {
        toast.error(error.message || 'Google login failed', { autoClose: 3000 });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const goToRegister = () => {
    if (!loading) navigate('/register');
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-sm">
        <fieldset className="fieldset bg-base-100 shadow-xl p-6 rounded-lg">

          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input input-bordered"
            placeholder="Email"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}

          {/* Password */}
          <label className="label mt-3">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input input-bordered"
            placeholder="Password"
            disabled={loading}
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}

          {/* Forgot Password */}
          <div className="mt-2">
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-neutral mt-4 w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>

          <hr className="my-4" />

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full mb-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                <span className="ml-2">Please wait...</span>
              </>
            ) : (
              'Sign in with Google'
            )}
          </button>

          {/* Register */}
          <button
            type="button"
            onClick={goToRegister}
            className="btn btn-primary w-full"
            disabled={loading}
          >
            Register
          </button>

        </fieldset>
      </form>
    </div>
  );
};

export default Login;

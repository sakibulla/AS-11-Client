import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

// Reusable Input Component
const FormInput = ({ label, type, register, errors, disabled, validation }) => (
  <div className="mb-3">
    <label className="label">{label}</label>
    <input
      type={type}
      {...register(label.toLowerCase(), validation)}
      className="input input-bordered w-full"
      placeholder={label}
      disabled={disabled}
    />
    {errors[label.toLowerCase()] && (
      <p className="text-red-500 text-sm mt-1">{errors[label.toLowerCase()].message}</p>
    )}
  </div>
);

// Demo Login Buttons
const DemoLoginButtons = ({ setDemo }) => (
  <div className="flex justify-between mb-3">
    <button
      type="button"
      onClick={() => setDemo('user')}
      className="btn btn-sm btn-outline w-[48%]"
    >
      Demo User
    </button>
    <button
      type="button"
      onClick={() => setDemo('admin')}
      className="btn btn-sm btn-outline w-[48%]"
    >
      Demo Admin
    </button>
  </div>
);

const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle Demo login autofill
  const handleDemoLogin = (type) => {
    if (type === 'user') {
      setValue('email', 'sakibulla20002@gmail.com');
      setValue('password', 'sakibulla');
    } else if (type === 'admin') {
      setValue('email', 'hasanfahmid20002@gmail.com');
      setValue('password', 'sakibulla');
    }
  };

  // Login submit
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
      .finally(() => setLoading(false));
  };

  // Google login
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
      .finally(() => setLoading(false));
  };

  // Navigate to register
  const goToRegister = () => !loading && navigate('/register');

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-sm">
        <fieldset className="fieldset bg-base-100 shadow-xl p-6 rounded-lg">

          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          {/* Demo Login Buttons */}
          <DemoLoginButtons setDemo={handleDemoLogin} />

          {/* Email */}
          <FormInput
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={loading}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email address"
              }
            }}
          />

          {/* Password */}
          <FormInput
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={loading}
            validation={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            }}
          />

          {/* Forgot Password */}
          <div className="mb-3">
            <a className="link link-hover text-sm" onClick={() => navigate('/forgot-password')}>
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-neutral mt-2 w-full"
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

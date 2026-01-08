import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Mail, Lock, LogIn, Chrome, UserPlus } from 'lucide-react';

import useAuth from '../../../hooks/useAuth';

/**
 * Reusable Form Input Component
 */
const FormInput = ({ 
  label, 
  type, 
  register, 
  errors, 
  disabled, 
  validation, 
  icon: Icon,
  showPasswordToggle = false,
  onTogglePassword
}) => {
  const fieldName = label.toLowerCase().replace(/\s+/g, '');
  
  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text font-medium flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </span>
      </label>
      <div className="relative">
        <input
          type={type}
          {...register(fieldName, validation)}
          className={`input input-bordered w-full pr-10 ${
            errors[fieldName] ? 'input-error' : ''
          }`}
          placeholder={`Enter your ${label.toLowerCase()}`}
          disabled={disabled}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
            disabled={disabled}
          >
            {type === 'password' ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {errors[fieldName] && (
        <label className="label">
          <span className="label-text-alt text-error">
            {errors[fieldName].message}
          </span>
        </label>
      )}
    </div>
  );
};

/**
 * Demo Login Buttons Component
 */
const DemoLoginButtons = ({ onDemoLogin, disabled }) => (
  <div className="mb-6">
    <div className="divider text-sm text-base-content/60">Quick Demo Access</div>
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onDemoLogin('user')}
        className="btn btn-outline btn-sm"
        disabled={disabled}
      >
        <UserPlus className="w-4 h-4" />
        Demo User
      </button>
      <button
        type="button"
        onClick={() => onDemoLogin('admin')}
        className="btn btn-outline btn-sm"
      >
        <Lock className="w-4 h-4" />
        Demo Admin
      </button>
    </div>
  </div>
);

/**
 * Login Page Component
 */
const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Demo login credentials
  const demoCredentials = {
    user: {
      email: 'demo.user@xdecor.com',
      password: 'demouser123'
    },
    admin: {
      email: 'demo.admin@xdecor.com', 
      password: 'demoadmin123'
    }
  };

  /**
   * Handle demo login autofill
   */
  const handleDemoLogin = (type) => {
    const credentials = demoCredentials[type];
    if (credentials) {
      setValue('email', credentials.email);
      setValue('password', credentials.password);
      toast.info(`Demo ${type} credentials loaded`, { autoClose: 2000 });
    }
  };

  /**
   * Handle form submission
   */
  const handleLogin = async (data) => {
    setLoading(true);
    try {
      await loginUser(data.email, data.password);
      toast.success('Welcome back! Login successful.', { autoClose: 3000 });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.', { 
        autoClose: 4000 
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Google sign in
   */
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Google login successful!', { autoClose: 3000 });
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.message || 'Google login failed. Please try again.', { 
        autoClose: 4000 
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="avatar mb-4">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="/logoxx.png" alt="Xdecor Logo" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Welcome Back
          </h1>
          <p className="text-base-content/70">
            Sign in to your Xdecor account
          </p>
        </div>

        {/* Login Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              
              {/* Demo Login Buttons */}
              <DemoLoginButtons 
                onDemoLogin={handleDemoLogin} 
                disabled={loading}
              />

              {/* Email Field */}
              <FormInput
                label="Email"
                type="email"
                register={register}
                errors={errors}
                disabled={loading}
                icon={Mail}
                validation={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address"
                  }
                }}
              />

              {/* Password Field */}
              <FormInput
                label="Password"
                type={showPassword ? "text" : "password"}
                register={register}
                errors={errors}
                disabled={loading}
                icon={Lock}
                showPasswordToggle={true}
                onTogglePassword={togglePasswordVisibility}
                validation={{
                  required: "Password is required",
                  minLength: { 
                    value: 6, 
                    message: "Password must be at least 6 characters" 
                  }
                }}
              />

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="link link-primary text-sm hover:link-hover"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="divider">OR</div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Please wait...
                  </>
                ) : (
                  <>
                    <Chrome className="w-4 h-4" />
                    Continue with Google
                  </>
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-base-content/70">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="link link-primary font-medium hover:link-hover"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-base-content/50">
          <p>
            By signing in, you agree to our{' '}
            <Link to="/terms" className="link link-hover">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

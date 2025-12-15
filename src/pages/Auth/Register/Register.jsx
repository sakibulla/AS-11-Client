import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.init';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (data) => {
    if (!data.photo || data.photo.length === 0) {
      toast.error('Please select a profile photo.');
      return;
    }

    setLoading(true);

    try {
      const profileImg = data.photo[0];

      // 1️⃣ Register user in Firebase
      const result = await registerUser(data.email, data.password);
      const user = result.user;
      console.log('Registered user:', user);

      // 2️⃣ Upload profile photo to ImgBB
      const formData = new FormData();
      formData.append('image', profileImg);
      const imageAPI_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;
      const res = await axios.post(imageAPI_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const photoURL = res.data.data.display_url;
      console.log('Uploaded image URL:', photoURL);

      // 3️⃣ Save user in backend database
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
        role: 'user'
      };
      const response = await axios.post('https://xdecor.vercel.app/users', userInfo);
      if (response.data.insertedId) {
        console.log('User created in the database');
      }

      // 4️⃣ Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: photoURL
      });

      toast.success('Registration successful!', { autoClose: 3000 });
      navigate('/'); // redirect to home

    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed', { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <form onSubmit={handleSubmit(handleRegistration)} className="w-full max-w-sm">
        <fieldset className="fieldset bg-base-100 shadow-xl p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input input-bordered"
            placeholder="Full Name"
            disabled={loading}
          />
          {errors.name && <p className='text-red-500'>Name is required</p>}

          {/* Email */}
          <label className="label mt-2">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input input-bordered"
            placeholder="Email"
            disabled={loading}
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          {/* Password */}
          <label className="label mt-2">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input input-bordered"
            placeholder="Password"
            disabled={loading}
          />
          {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
          {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>}

          {/* Profile Photo */}
          <label className="label mt-2">Profile Photo</label>
          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input file-input-ghost"
            disabled={loading}
          />
          {errors.photo && <p className="text-red-500">Profile photo is required</p>}

          {/* Submit Button */}
          <button className="btn btn-neutral mt-4 w-full" disabled={loading}>
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                <span className="ml-2">Registering...</span>
              </>
            ) : 'Register'}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;

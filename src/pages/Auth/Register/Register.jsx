import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.init';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser } = useAuth();

  const handleRegistration = async (data) => {
    try {
      if (!data.photo || data.photo.length === 0) {
        return console.log('Please select a profile photo.');
      }

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

      const response = await axios.post('http://localhost:3000/users', userInfo); // direct POST
      if (response.data.insertedId) {
        console.log('User created in the database');
      }

      // 4️⃣ Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: photoURL
      });

      console.log('Profile updated with name and photo!');

    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input"
            placeholder="Full Name"
          />
          {errors.name?.type === 'required' && (
            <p className='text-red-500'>Name is required</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className='text-red-500'>Email is required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className='text-red-500'>Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className='text-red-500'>Password must be at least 6 characters</p>
          )}

          <label className="label">Profile Photo</label>
          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input file-input-ghost"
          />
          {errors.photo && <p className="text-red-500">Profile photo is required</p>}

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;

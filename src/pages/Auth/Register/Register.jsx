import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    console.log(data);
    const profileImg=data.photo[0]
    registerUser(data.email, data.password)
      .then(result => {
        console.log(result.user);

        const formData=new FormData();
        formData.append('image',profileImg)
        const imageAPI_URL=`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}` 
        axios.post()
      })
      .catch(error => {
        console.log(error);
      });
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
            <p className='text-red-500'>Name is Required</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className='text-red-500'>Email is Required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className='text-red-500'>Password is Required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className='text-red-500'>Password must be at least 6 characters or longer</p>
          )}

          <label className="label">Profile Photo</label>
          <input
            type="file"
            {...register('photo')}
            className="file-input file-input-ghost"
          />

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;

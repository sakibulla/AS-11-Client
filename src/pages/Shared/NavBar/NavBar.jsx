import React, { useEffect, useState } from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  // Apply theme on load & change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success('Logged out successfully!'))
      .catch(error =>
        toast.error('Failed to log out: ' + error.message)
      );
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/services">Services</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      {user && <li><NavLink to="/decorator">Apply Decorator</NavLink></li>}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-sm px-4 md:px-8">

      {/* NAVBAR START */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-xl">
            ☰
          </label>
          <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl">
          <Logo />
        </Link>
      </div>

      {/* NAVBAR CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {links}
        </ul>
      </div>

      {/* NAVBAR END */}
      <div className="navbar-end gap-2">

<label className="swap swap-rotate hidden md:flex cursor-pointer">
  {/* controlled checkbox */}
  <input
    type="checkbox"
    checked={theme === 'dark'}
    onChange={toggleTheme}
    aria-label="Toggle theme"
  />

  {/* ☀️ Sun (Light Mode) */}
  <svg
    className="swap-off h-8 w-8 fill-current text-yellow-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Z" />
  </svg>

  {/* 🌙 Moon (Dark Mode) */}
  <svg
    className="swap-on h-8 w-8 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M21.64,13a1,1,0,0,0-1.05-.14A8.15,8.15,0,0,1,9.08,5.49,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
  </svg>
</label>


        {/* 👤 ACCOUNT */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-primary">
            {user ? user.displayName || 'Profile' : 'Account'}
          </label>
          <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {user ? (
              <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><button onClick={handleLogout}>Log Out</button></li>
              </>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default NavBar;

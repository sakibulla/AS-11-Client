import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => toast.success('Logged out successfully!'))
      .catch(error =>
        toast.error('Failed to log out: ' + error.message)
      );
  };

  // 🌙 Dark mode handler
  const handleTheme = (checked) => {
    const theme = checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/services">Services</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      {user && <li><NavLink to="/decorator">Decorator</NavLink></li>}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-sm px-4 md:px-8">

      {/* NAVBAR START */}
      <div className="navbar-start">

        {/* 📱 Mobile Dropdown (ONLY mobile) */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-xl">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="btn btn-ghost text-xl">
          <Logo />
        </Link>
      </div>

      {/* NAVBAR CENTER (Desktop ONLY) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {links}
        </ul>
      </div>

      {/* NAVBAR END */}
      <div className="navbar-end gap-3">

        {/* 🌙 Theme Toggle */}
        <input
          type="checkbox"
          className="toggle"
          onChange={(e) => handleTheme(e.target.checked)}
          defaultChecked={localStorage.getItem('theme') === 'dark'}
        />

        {/* 👤 Account Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-primary">
            {user ? user.displayName || 'Profile' : 'Account'}
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
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

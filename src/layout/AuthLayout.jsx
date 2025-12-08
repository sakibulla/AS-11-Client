import React from 'react';
import Logo from '../../src/components/Logo/Logo.jsx';
import { NavLink, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NavLink to=""><Logo></Logo></NavLink>
            <div className='flex'>
                <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <div className='flex-1'>
                <img src='https://png.pngtree.com/png-clipart/20230914/original/pngtree-home-decor-vector-png-image_12157758.png'/>
            </div>
        </div>
        </div>
    );
};

export default AuthLayout;
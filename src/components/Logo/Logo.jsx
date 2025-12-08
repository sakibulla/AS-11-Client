import React from 'react';
import logo from "../../assets/logo.png"
const Logo = () => {
    return (
        <div className='flex items-end'>
            <img
                src={logo}
                alt="logo"
                className="w-12 h-12 rounded-xl object-cover"
            />
<h3 className="text-3xl font-bold  text-amber-700">Xdecor</h3>
        </div>
    );
};

export default Logo;
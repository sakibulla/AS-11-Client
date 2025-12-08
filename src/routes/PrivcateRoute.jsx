import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivcateRoute = ({children}) => {
    const {user,loading} =useAuth();
    if(loading){
            return <div>
<span className="loading loading-ring loading-xl"></span>
            </div>
    }
    if(!user){
        return <Navigate to="login"></Navigate>
    }
    return children
};

export default PrivcateRoute;
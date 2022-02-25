import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const auth = false; //utente è loggato????
    return (
        auth ? children : <Navigate to="/login"/>
    );
};

export default PrivateRoute;

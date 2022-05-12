import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from "../Contexts/AuthContext";

const PrivateRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    return (
        auth.success ? children : <Navigate to="/login"/>
    );
};

export default PrivateRoute;

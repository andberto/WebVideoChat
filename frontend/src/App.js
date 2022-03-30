import React from 'react';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login/> }></Route>
          <Route path="/dashboard" element={ <PrivateRoute>  <Dashboard/> </PrivateRoute> }/>
          <Route path="/" element={ <PrivateRoute> <Dashboard/> </PrivateRoute> }/>
        </Routes>
    </BrowserRouter>
  );
};

export default App;

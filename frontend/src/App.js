import React from 'react';
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={ <Dashboard/> }></Route>
          <Route path="/login" element={ <Login/> }></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;

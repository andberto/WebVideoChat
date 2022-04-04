import React from 'react';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js'
import { ContextProvider } from './Contexts/SocketContext.js';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={ <Login/> }></Route>
          <Route exact path="/registration" element={ <Signup/> }></Route>
          <Route exact path="/" element={ <PrivateRoute> <Dashboard/></PrivateRoute> }/>
        </Routes>
        <ContextProvider>
            <Routes>
                <Route exact path="/dashboard" element={ <PrivateRoute> <Dashboard/> </PrivateRoute> }/>
            </Routes>
         </ContextProvider>
    </BrowserRouter>
  );
};

export default App;

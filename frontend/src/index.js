import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Contexts/AuthContext';
import { ContextProvider } from './Contexts/SocketContext.js';

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
  document.getElementById('root'),
);

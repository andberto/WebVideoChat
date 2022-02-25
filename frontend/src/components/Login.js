import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <>
        <TextField id = "username" label = "Username" variant = "outlined" />
        <TextField id = "password" label = "Password" variant = "outlined" />
        <Button variant = "outlined">Login</Button>
    </>
  );
};

export default Login;

import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//http://localhost:5000/login?username=berto&x
//se status code -> 200 ok login ok (imposta stato logged = true)
//se status code -> 404 wrong login
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

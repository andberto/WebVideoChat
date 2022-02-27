import React, { useRef, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; 

//http://localhost:5000/login?username=berto&x
//se status code -> 200 ok login ok (imposta stato logged = true)
//se status code -> 404 wrong login


const Login = () => {
  const useRef = useRef();
  const errRef = useRef;

  const [user, setuser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get("http://localhost:5000",
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
            id = "username"
            label = "Username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            variant = "outlined"/>
        <TextField
            id = "password"
            label = "Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            variant = "outlined"/>
         <button>login</button>
      </form>
    </>
  );
};

export default Login;

import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../Contexts/AuthContext";
import * as Constants from '../Constants';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(Constants.LOGIN_URL, { params: { username: user, password: pwd } });
            console.log(response);
            const success = true;
            setAuth({ user, pwd, success});
            setUser('');
            setPwd('');
            setIsFormInvalid(false);
            console.log('Login successfull!');
            navigate('/dashboard');
        } catch (err) {
            setIsFormInvalid(true);
            if (!err?.response) {
                console.log('Server timeout!');
            } else if (err.response?.status === 404) {
                console.log('Wrong username or password!');
            } else if (err.response?.status === 500) {
                console.log('Server error!');
            } else {
                console.log('Unknown cause (login failed)!');
            }
        }
    }

    function Copyright(props) {
      return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href = { Constants.FRONTEND_URL }>
            WebVideoChat
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }

    const theme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  ref = {userRef}
                  value = {user}
                  onChange={(e) => setUser(e.target.value)}
                  error = { isFormInvalid }
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value = {pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  error = { isFormInvalid }
                  helperText={isFormInvalid && "Wrong username or password!"}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
    );
};

export default Login;

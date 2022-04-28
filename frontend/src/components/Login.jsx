import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../Contexts/AuthContext";
import * as Constants from '../Constants';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as lk} from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import bgImg from '../images/background.gif'

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    useEffect(() => {
        document.title = "W.V.C - Login"
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
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(' + bgImg +')',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid style = {{backgroundColor: 'rgb(37, 39, 41)'}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
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
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <WhiteBorderTextField
                  margin="normal"
                  required
                  fullWidth
                  ref = {userRef}
                  value = {user}
                  onChange={(e) => setUser(e.target.value)}
                  error = { isFormInvalid }
                  id="username"
                  label="Email address"
                  name="username"
                  autoComplete="email"
                  autoFocus
                  style={{color: 'white'}}
                />
                <WhiteBorderTextField
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
                  style={{ color: 'white'}}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{backgroundColor: '#5865f2', color: 'white'}}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link  href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={lk} to="/registration" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }

export default Login;

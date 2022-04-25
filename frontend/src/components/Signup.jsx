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
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link as lk} from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import bgImg from '../images/background.gif'
import validator from 'validator'

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

const Signup = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [rpwd, setRpwd] = useState('');
    const [helper, setHelper] = useState('');
    const navigate = useNavigate();
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(pwd !== rpwd){
            setIsFormInvalid(true);
            setHelper("Passwords do not match!")
            return;
        }

        if(!validator.isEmail(user)){
            setIsFormInvalid(true);
            setHelper("Invalid email!")
            return;
        }

        try {
            const response = await axios.get(Constants.REGISTRATION_URL, { params: { username: user, password: pwd } });
            console.log(response);
            const success = true;
            setAuth({ user, pwd, success});
            setUser('');
            setPwd('');
            setRpwd('');
            setIsFormInvalid(false);
            navigate('/login');
        } catch (err) {
            setIsFormInvalid(true);
            if (!err?.response) {
                console.log('Server timeout!');
            } else if (err.response?.status === 404) {
                console.log('Username already exists!');
                setHelper("Username already exists!");
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
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid style = {{backgroundColor: 'rgb(57,59,65)'}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                Sign Up
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
                  autoFocus
                />
                <WhiteBorderTextField
                  margin="normal"
                  required
                  fullWidth
                  value = {pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  error = { isFormInvalid }
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value = {rpwd}
                  onChange={(e) => setRpwd(e.target.value)}
                  error = { isFormInvalid }
                  helperText={isFormInvalid && helper}
                  name="repPassword"
                  label="Repeat password"
                  type="password"
                  id="repPassword"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{backgroundColor: '#5865f2', color: 'white'}}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link component={lk} to="/login" variant="body2">
                      {"Do you already have an account?"}
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

export default Signup;

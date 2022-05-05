import React, {useContext,useEffect } from 'react';
import axios from 'axios';
import * as Constants from '../Constants';
import VideoPlayer from './VideoPlayer';
import Notifications from './Notifications';
import AuthContext from "../Contexts/AuthContext";
import SideList from './SideList.jsx';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from '@material-ui/core';
import logo from '../images/banner_logo.png';
import { Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../Contexts/SocketContext';
import Link from '@mui/material/Link';
import { Link as lk} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f00'
    },
    drawerContainer: {
        right: '0'
    },
    margin: {
        marginTop: 20,
    },
    padding: {
        padding: 20,
    },divider: {
      background: '#fff',
  }
}));

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const { disconnect, connect, myVideo, currentStream, setName, name ,setStream, selectedUser, me, callAccepted, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const drawerWidth = window.innerWidth * 0.20;
    const classes = useStyles

    useEffect(() => {
        document.title = "W.V.C - Dashboard"
        connect();
        setName(auth.username);

        axios.post(Constants.SET_SOCK_USER, {
          username: auth.username,
          sock_id: me
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
            console.log(response.data);
        });
    }, [auth, connect, me, name, setName]);

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
      });
  }, [myVideo, setStream, currentStream]);

    function logout(){
        disconnect();
        localStorage.clear();
    }

    return (
       <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
           <Toolbar sx={{ backgroundColor: "#252729", justifyContent: "space-between"}}>
             <img src={logo} alt="Logo" style={{width: '10%',height: '10%', marginTop: '5px', marginBottom:'5px'}}/>
             <Typography sx={{ color: 'white'}} variant="h4" noWrap component="div">
               PeerID: {selectedUser}
             </Typography>
             {callAccepted && !callEnded ? (
               <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} onClick={leaveCall} className={classes.margin}>
                 Hang Up
               </Button>
             ) : (
               <Button style={{ backgroundColor: '#5865f2', color: 'white'}} variant="contained" startIcon={<Phone fontSize="large" />} onClick={() => callUser(selectedUser)} className={classes.margin}>
                 Call
               </Button>
             )}
           </Toolbar>
         </AppBar>
         <Drawer
             sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  bgcolor: 'rgb(51,52,57)'
                },
              }}
              variant="permanent"
              anchor="left"
         >
        <Toolbar/>
        <SideList/>
        <hr/>
        <Typography component="div" style={{textAlign: 'center'}}>
            <Box sx={{ fontSize: 15, m: 1, color: '#c9c9cb' }}>Logged as: </Box>
            <Box sx={{ fontSize: 15, m: 1, color: '#c9c9cb' }}>{auth.username}</Box>
            <Box sx={{ fontSize: 15, m: 1 }}>
            <Link component={lk} style={{ color: '#5865f2'}} to="/login" onClick={logout} variant="body2">
              {"Logout"}
            </Link>
            </Box>
        </Typography>
        </Drawer>
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'rgb(57,59,65)', p: 1 }}
        >
           <Toolbar />
           <VideoPlayer />
           <Notifications />
        </Box>
    </Box>
   );
};

export default Dashboard;

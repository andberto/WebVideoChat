import React, {useContext,useEffect, useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgImg from '../images/chat_bg.jpg';
import {Button} from '@material-ui/core';
/* import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'; */
import { Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../Contexts/SocketContext';

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
    }
}));

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const { connect, myVideo, currentStream, setStream } = useContext(SocketContext);
    const drawerWidth = window.innerWidth * 0.20;
    const { selectedUser, me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const classes = useStyles

    useEffect(() => {
        connect();
        console.log(me,auth.user);
        axios.post(Constants.SET_SOCK_USER, {
          username: auth.user,
          sock_id: me
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
            console.log(response.data);
        });
    }, [auth, connect, me]);

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
      });
  }, [myVideo, setStream, currentStream]);

    return (
       <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
           <Toolbar sx={{ backgroundColor: "#252729", justifyContent: "space-between" }}>
             <Typography sx={{ color: 'white', textAlign: 'center' }}variant="h4" noWrap component="div">
               Web Video Chat
             </Typography>
             <Typography sx={{ color: 'white'}} variant="h4" noWrap component="div">
               {selectedUser}
             </Typography>
             {callAccepted && !callEnded ? (
               <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} onClick={leaveCall} className={classes.margin}>
                 Hang Up
               </Button>
             ) : (
               <Button style={{ backgroundColor: '#7881d6', color: 'white'}} variant="contained" startIcon={<Phone fontSize="large" />} onClick={() => callUser(selectedUser)} className={classes.margin}>
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

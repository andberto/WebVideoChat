import React, {useContext,useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Chat from './Chat';
import Sidebar from './Sidebar';
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
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { SocketContext } from '../Contexts/SocketContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const { myVideo, currentStream, setStream} = useContext(SocketContext);
    const drawerWidth = window.innerWidth * 0.25;
    console.log(auth);

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
      });
    }, []);

    return (
            <ThemeProvider theme={darkTheme}>
               <Box sx={{
                   display: 'flex',
                   backgroundImage: 'url(' + bgImg +')',
                   backgroundRepeat: 'repeat',
                }}>
                 <CssBaseline />
                 <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
                   <Toolbar sx={{ backgroundColor: "#3b3251", justifyContent: "space-between" }}>
                     <Typography sx={{ color: 'white', textAlign: 'center' }}variant="h4" noWrap component="div">
                       Web Video Chat
                     </Typography>
                     <Button variant="contained" color="primary" startIcon={<VideoCameraFrontIcon fontSize="large" />}>
                       Call
                     </Button>
                   </Toolbar>
                 </AppBar>
                 <Drawer
                   variant="permanent"
                   sx={{
                     width: drawerWidth,
                     flexShrink: 0,
                   }}
                 >
                <Toolbar />
                <SideList/>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                   <Toolbar />
                   <VideoPlayer />
                   <Sidebar>
                     <Notifications />
                   </Sidebar>
                 </Box>
               </Box>
            </ThemeProvider>
   );
};

export default Dashboard;

import React, {useContext} from 'react';
import VideoPlayer from './VideoPlayer';
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
import bgImg from '../images/chat_bg.jpg'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const drawerWidth = window.innerWidth * 0.25;
    console.log(auth);

    return (
            <ThemeProvider theme={darkTheme}>
               <Box sx={{
                   display: 'flex',
                   backgroundImage: 'url(' + bgImg +')',
                   backgroundRepeat: 'repeat',
                }}>
                 <CssBaseline />
                 <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
                   <Toolbar sx={{ backgroundColor: "#3b3251", alignItems: 'center' }}>
                     <Typography sx={{ color: 'white', textAlign: 'center' }}variant="h4" noWrap component="div">
                       Web Video Chat
                     </Typography>
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

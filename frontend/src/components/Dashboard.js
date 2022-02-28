import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ContextProvider } from '../Contexts/SocketContext.js';
import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import AuthContext from "../Contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <ContextProvider>
              <VideoPlayer />
              <Sidebar>
                <Notifications />
              </Sidebar>
            </ContextProvider>
        </div>
    );
};

export default Dashboard;

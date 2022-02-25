import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { ContextProvider } from '../Context';
import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import Notifications from './Notifications';

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

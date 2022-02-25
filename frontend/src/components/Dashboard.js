import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

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
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default Dashboard;

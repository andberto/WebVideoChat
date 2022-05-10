import React, { useContext } from 'react';
import {Typography, Box, makeStyles } from '@material-ui/core';
import { SocketContext } from '../Contexts/SocketContext';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '100%',
      height: window.innerHeight * 0.80,
    },container: {
        backgroundColor: '#393b41',
    }
}));

const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, callEnded, stream, name, call, currentStream } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Stack direction="row"
        divider={<Divider sx={{ bgcolor: "#999a9d" }} orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="center"
        >
      {stream && (
        <Box className={classes.container}>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
            <Typography variant="h6" style = {{color: "white"}} gutterBottom component="div">{name}</Typography>
        </Box>
      )}
      {callAccepted && !callEnded &&(
        <Box className={classes.container}>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
            <Typography variant="h6"  style = {{color: "white"}} gutterBottom component="div">{call.name}</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default VideoPlayer;

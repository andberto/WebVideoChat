import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../Contexts/SocketContext';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Phone, PhoneDisabled } from '@material-ui/icons';
import ReactAudioPlayer from 'react-audio-player';
import ringtone from '../audio/ringtone.mp3';
import {Typography, Box } from '@material-ui/core';

export default function Notifications() {
  const { answerCall, call, callAccepted, leaveCall, otherName, setOtherName } = useContext(SocketContext);

  return (
    <>
    {call.isReceivingCall && !callAccepted && (
        <ReactAudioPlayer
         src= { ringtone }
         autoPlay
         loop
       />
    )}
    <Slide style={{
        backgroundColor: '#5865f2',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 1,
        padding: '20px',
        border: '1px solid white',
        color: 'white',
        height: "25%",
    }}
     direction="left" in = {call.isReceivingCall && !callAccepted} mountOnEnter unmountOnExit>
     <Stack direction="column"
         divider={<Divider sx={{ bgcolor: "#999a9d" }} orientation="vertical" flexItem />}
         spacing={2}
         justifyContent="center"
         >
            <Typography component="div">
                <Box sx={{ fontSize: 25, m: 1 }}>Incoming call from:</Box>
                <Box sx={{ fontSize: 25, m: 1, fontStyle: 'oblique' }}>{call.name}</Box>
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
                <Button variant="contained" style={{ backgroundColor: '#98ff30', color: 'black'}} startIcon={<Phone fontSize="large" />} onClick={answerCall}>
                  Answer
                </Button>
                <Button variant="contained" style={{ backgroundColor: '#ff3419', color: 'black'}} startIcon={<PhoneDisabled fontSize="large" />} onClick={leaveCall}>
                  Decline
                </Button>
            </Stack>
        </Stack>
    </Slide>
    </>
  );
}

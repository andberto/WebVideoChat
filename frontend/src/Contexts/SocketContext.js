import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import * as Constants from '../Constants';
import axios from 'axios';

const SocketContext = createContext();

var socket = io(Constants.BACKEND_URL,{ autoConnect: false });

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    socket = io(Constants.BACKEND_URL,{ autoConnect: false });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    setCallEnded(false);

  }, [callEnded]);

  const connect = () => {
    socket.connect();
  };

  const selectReceiver = (receiver) => {
    axios.get(Constants.SET_SOCK_USER, { params: { username: receiver} }).then(response => {
        setSelectedUser(response.data);
    }).catch(err => {
        setSelectedUser('offline');
    });
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
        console.log("Call accepted:" + callAccepted)
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    socket.on('hangUp', () => {
      leaveCall();
    });

    connectionRef.current = peer;

  };

  const leaveCall = () => {
    if (call.isReceivingCall && !callAccepted) {
      call.isReceivingCall = false;
      setCallEnded(true);
      setCallAccepted(false);
    }
    else {
      call.isReceivingCall = false;
      setCallEnded(true);
      setCallAccepted(false);
      socket.disconnect();
      userVideo.current.srcObject = null;
      connectionRef.current = null;
    }
    socket.emit('hangUp', { sckId: call.from });
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setStream,
      connect,
      selectedUser,
      selectReceiver,
      connectionRef,
      disconnect
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

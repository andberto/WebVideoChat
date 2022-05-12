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
  const [otherName, setOtherName] = useState('');
  const [initiatorCall, setInitiatorCall] = useState(false);

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
    setOtherName(receiver);
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
      socket.emit('myName', { name: name, to: call.from})
      console.log("peer answered" + call.from);
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
      setInitiatorCall(true);
      console.log("peer called" + id);
      peer.signal(signal);
    });

    socket.on('otherName', (other) => {
      console.log(other);
      setOtherName(other);
    })

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
      setCallAccepted(false);
      setCallEnded(true);
      setInitiatorCall(false);
      socket.emit("stopVideo");
      socket.disconnect();
      userVideo.current.srcObject = null;
      connectionRef.current = null;
    }
  };

  socket.on("stopVideo", () => {
    if (callAccepted) {
      completeLeaveCall();
    }
  });

  const completeLeaveCall = () => {
      call.isReceivingCall = false;
      setCallAccepted(false);
      setCallEnded(true);
      setInitiatorCall(false);
      console.log("hey");
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
      disconnect,
      otherName,
      setOtherName,
      initiatorCall
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import Options from './components/Options';
import { AppBar, Button, Typography, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import VideocamIcon from '@mui/icons-material/Videocam';

const useStyles = styled((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
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



const VC = () => {
  const socket = io('http://localhost:5000');
  const classes = useStyles();
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('');
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);


  const turnOnVideo = () => {
    myVideo.current.srcObject = stream;
  }

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
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

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center"> Video Chat</Typography>
      </AppBar>
      { }
      <VideoPlayer
        call={call}
        callAccepted={callAccepted}
        myVideo={myVideo}
        userVideo={userVideo}
        stream={stream}
        name={name}
        setName={setName}
        callEnded={callEnded}
        me={me}
        callUser={callUser}
        leaveCall={leaveCall}
        answerCall={answerCall}
      />
      <IconButton aria-label="delete" onClick={turnOnVideo}>
        <VideocamIcon/>
      </IconButton>
      <Options
        callAccepted={callAccepted}
        name={name}
        setName={setName}
        callEnded={callEnded}
        me={me}
        callUser={callUser}
        leaveCall={leaveCall}
      >
        <Notifications
          call={call}
          callAccepted={callAccepted}
          answerCall={answerCall}
        />
      </Options>
    </div>
  )
}

export default VC
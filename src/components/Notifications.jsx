/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import { Button } from '@mui/material';
import React from 'react';


const Notifications = ({ answerCall, call, callAccepted } ) => {

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
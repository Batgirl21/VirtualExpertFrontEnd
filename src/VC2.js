/* eslint-disable prettier/prettier */
import React from 'react'
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import { Route, Routes } from 'react-router-dom';

const VC2 = () => {
    return (
        <div className="App">
          <Routes>
            <Route path="/" element={<LobbyScreen />} />
            <Route path="room/:roomId" element={<RoomPage />} />
          </Routes>
        </div>
    )
}

export default VC2
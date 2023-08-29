import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSocket } from 'src/context/SocketProvider'

const ExpertHome = () => {
  const email = useSelector((state) => state.login.user.name)
  const id = useSelector((state) => state.login.user._id)
  const [room, setRoom] = useState('')
  const socket = useSocket()
  const navigate = useNavigate()

  const handleSubmitForm = useCallback(
    (e) => {
      console.log(id)
      //   e.preventDefault();
      socket.emit('room:join', { email, e })
    },
    [email, id, socket],
  )

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data
      navigate(`/room/${id}`)
    },
    [navigate],
  )

  useEffect(() => {
    socket.on('room:join', handleJoinRoom)
    return () => {
      socket.off('room:join', handleJoinRoom)
    }
  }, [socket, handleJoinRoom])
  return (
    <div>
      <Button
        onClick={() => {
          setRoom(id)
          handleSubmitForm(id)
        }}
      >
        Join Room and start Chat
      </Button>
    </div>
  )
}

export default ExpertHome

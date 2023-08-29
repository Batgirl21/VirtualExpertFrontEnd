/* eslint-disable prettier/prettier */
import { CListGroup, CListGroupItem } from '@coreui/react'
import { Button } from '@mui/material'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Axios } from 'src/AxiosConfig'
import PaypalPayment from 'src/components/PaypalPayment'
import { useSocket } from 'src/context/SocketProvider'

const UserHome = () => {
  const [allExperts, setAllExperts] = useState([])
  const email = useSelector((state) => state.login.user.name)
  const [room, setRoom] = useState('')
  const initialOptions = {
    clientId: 'AbvDpEsda7ZDUM4h1YJgmt0z4dIozr4eLcENDZW9JAoN0flI7mppU6JBnUpr8zQ_UsapoWnixvjSU5J2',
    currency: 'EUR',
    intent: 'capture',
  }

  const socket = useSocket()
  const navigate = useNavigate()

  const handleSubmitForm = useCallback(
    (e) => {
      console.log(room)
      //   e.preventDefault();
      socket.emit('room:join', { email, e })
    },
    [email, room, socket],
  )

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data
      navigate(`/room/${room}`)
    },
    [navigate],
  )

  useEffect(() => {
    socket.on('room:join', handleJoinRoom)
    return () => {
      socket.off('room:join', handleJoinRoom)
    }
  }, [socket, handleJoinRoom])

  useEffect(() => {
    Axios.get('user/getallexpert').then(async (resp) => {
      setAllExperts(resp.data)
    })
  }, [])
  return (
    <PayPalScriptProvider options={initialOptions}>
      <div>
        <CListGroup>
          {allExperts.map((i) => {
            return (
              <CListGroupItem component="a" href="#" key={i._id}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{i.name}</h5>
                  <small>⭐⭐⭐⭐</small>
                  <PaypalPayment setRoom={setRoom} handleSubmitForm={handleSubmitForm} i={i} />
                </div>
                <p className="mb-1">{i.description} </p>
                <small>{i.address}</small>
              </CListGroupItem>
            )
          })}
        </CListGroup>
      </div>
    </PayPalScriptProvider>
  )
}

export default UserHome

/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Axios } from 'src/AxiosConfig'

const PayPalPayment = ({ setRoom, handleSubmitForm, i }) => {
  const [orderID, setOrderID] = useState(null)
  const [{ isPending }] = usePayPalScriptReducer()

  const createOrder = async () => {
    try {
      // Send a request to your server to create a PayPal order
      const response = await Axios.post('/my-server/create-paypal-order', {
        cart: [
          {
            sku: 'YOUR_PRODUCT_SKU',
            amount: '50.00', // Adjust quantity as needed
          },
        ],
      })

      // Extract the order ID from the response
      console.log(response.data)
      const order = response.data
      setOrderID(order.id)
    } catch (error) {
      console.error('Error creating PayPal order:', error)
    }
  }

  const onApprove = async (data, actions) => {
    try {
      // Capture the PayPal order when the user approves the payment
      console.log(data)
      const response = await Axios.post('/my-server/capture-paypal-order', {
        orderID: data.orderID,
      })

      // Handle the capture response as needed
      console.log('Capture response:', response.data)
      if (response.data.status === 'COMPLETED') {
        setRoom(i._id)
        handleSubmitForm(i._id)
      }

      // You can redirect or show a success message to the user
    } catch (error) {
      console.error('Error capturing PayPal order:', error)
      // Handle the error, e.g., show an error message to the user
    }
  }

  return (
    <div>
      {orderID ? (
        <PayPalButtons
          createOrder={null} // Order is already created
          onApprove={onApprove}
        />
      ) : (
        <button onClick={createOrder} disabled={isPending}>
          {isPending ? 'Creating Order...' : 'Pay with PayPal'}
        </button>
      )}
    </div>
  )
}

export default PayPalPayment

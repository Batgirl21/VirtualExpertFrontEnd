import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/loginSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
  },
})

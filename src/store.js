import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/loginSlice'
import videoReducer from './slice/videoSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    video: videoReducer,
  },
})

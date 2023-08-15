/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
export const loginSlice = createSlice({
    name:'login',
    initialState:{
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false, 
        isExpert:false
    },
    reducers:{
        userLoading:(state,action)=>{
            state.isLoading = true
        },

        loginSuccess: (state,action)=>{
            state.token = action.payload.token
        },

        userLoaded:(state,action)=>{
            state.isAuthenticated = true
            state.user = action.payload
            state.isLoading = false
        },
        logout:(state,action)=>{
            state.token = null
            state.user = null
            state.isAuthenticated = false
            state.isLoading = false

        },
        expertLoaded:(state,action)=>{
            state.isAuthenticated = true
            state.user = action.payload
            state.isLoading = false
            state.isExpert = true
        },

    }
})
export const { loginSuccess, userLoaded,userLoading,logout,expertLoaded } = loginSlice.actions
export default loginSlice.reducer
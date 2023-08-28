/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit'
export const videoSlice = createSlice({
    name: "video",
    initialState: {
        call: {},
        callAccepted: false,
        myVideo: null,
        userVideo: null,
        stream: null,
        name: "",
        setName: null,
        callEnded: null,
        me: null,
        callUser: null,
        leaveCall: null,
        answerCall: null
    },
    reducers: {
        Rcall: (state, action) => {
            state.call = action.payload
        },
        RcallAccepted: (state, action) => {
            state.callAccepted = action.payload
        },
        RmyVideo: (state, action) => {
            state.myVideo = action.payload
        },
        RuserVideo: (state, action) => {
            state.userVideo = action.payload
        },
        Rstream: (state, action) => {
            state.stream = action.payload
        },
        Rname: (state, action) => {
            state.name = action.payload
        },
        RsetName: (state, action) => {
            state.setName = action.payload
        },
        RcallEnded: (state, action) => {
            state.callEnded = action.payload
        },
        Rme: (state, action) => {
            state.me = action.payload
        },
        RcallUser: (state, action) => {
            state.callUser = action.payload
        },
        RleaveCall: (state, action) => {
            state.leaveCall = action.payload
        },
        RanswerCall: (state, action) => {
            state.answerCall = action.payload
        },
    }
})

export const {Rcall, RcallAccepted, RmyVideo,RuserVideo, Rstream, Rname, RsetName, RcallEnded, Rme, RcallUser, RleaveCall, RanswerCall} = videoSlice.actions
export default videoSlice.reducer
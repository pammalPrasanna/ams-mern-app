import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

function Axios(thunkAPI) {
    const token = thunkAPI.getState().auth.user.token
    return axios.create({
        headers: {
            common: {
                Authorization: `Bearer ${token}`
            }
        }
    })
}

function handleSwipeToast(swipeType, status) {
    if (swipeType === 'in' && status) {
        toast.success('Swiped in successfully')
    } else if (swipeType === 'in' && (status === false)) {
        toast.error('Unable to swipe in at the moment !!')
    }

    if (swipeType === 'out' && status) {
        toast.success('Swiped out successfully')
    } else if (swipeType === 'out' && (status === false)) {
        toast.error('Unable to swipe out at the moment !!')
    }
}

const initialSwipeState = {
    swipeData: {},
    attendanceData: [],

    isSwipePending: false,
    isSwipeFulfilled: false,
    isSwipeRejected: false,
    isSwipeErrorMsg: "",

    isGetSwipeDetailsPending: false,
    isGetSwipeDetailsFulfilled: false,
    isGetSwipeDetailsRejected: false,
    isGetSwipeDetailsErrorMsg: "",

    isGetAttendancePending: false,
    isGetAttendanceRejected: false,
    isGetAttendanceFulfilled: false,
    isGetAttendanceErrorMsg: ""
}

export const swipe = createAsyncThunk('swipe/swipe', async (swipeType, thunkAPI) => {
    try {
        const resp = await Axios(thunkAPI).post(`${process.env.REACT_APP_BASE_URI}api/attendance/swipe`)
        handleSwipeToast(swipeType, true)
        return resp.data
    } catch (error) {
        handleSwipeToast(swipeType, false)

        if (error) {
            if (error.response.status === 500) {
                return thunkAPI.rejectWithValue("It's not you, its us. we are working on it, try again later.")
            }

            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
})

export const getSwipeDetails = createAsyncThunk('swipe/swipeDetails', async (_, thunkAPI) => {
    try {
        const resp = await Axios(thunkAPI).get(process.env.REACT_APP_BASE_URI + `api/attendance/swipe-details`)
        return resp.data
    } catch (error) {
        if (error) {
            if (error.response.status === 500) {
                return thunkAPI.rejectWithValue("It's not you, its us. we are working on it, try again later.")
            }
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
})

export const getAttendance = createAsyncThunk('swipe/attendance', async (startDateInMonth, thunkAPI) => {
    try {
        const resp = await Axios(thunkAPI).get(process.env.REACT_APP_BASE_URI + `api/attendance/${startDateInMonth}`)
        return resp.data
    } catch (error) {
        if (error) {
            if (error.response.status === 500) {
                return thunkAPI.rejectWithValue("It's not you, its us. we are working on it, try again later.")
            }

            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
})


const swipeSlice = createSlice({
    name: 'swipe',
    initialState: initialSwipeState,
    reducers: {

    },
    extraReducers: {
        [swipe.pending]: (state) => {
            state.isSwipePending = true
            state.isSwipeFulfilled = false
            state.isSwipeRejected = false
            state.isSwipeErrorMsg = ""
        },
        [swipe.fulfilled]: (state, action) => {
            state.isSwipePending = false
            state.isSwipeFulfilled = true
            state.swipeData = action.payload
        },
        [swipe.rejected]: (state, action) => {
            state.isSwipePending = false
            state.isSwipeRejected = true
            state.isSwipeErrorMsg = action.payload
        },


        [getSwipeDetails.pending]: (state) => {
            state.isGetSwipeDetailsPending = true
            state.isGetSwipeDetailsFulfilled = false
            state.isGetSwipeDetailsRejected = false
            state.isGetSwipeDetailsErrorMsg = ""
        },
        [getSwipeDetails.fulfilled]: (state, action) => {
            state.isGetSwipeDetailsPending = false
            state.isGetSwipeDetailsFulfilled = true
            if (action.payload.length === 0) state.swipeData = {}
            else state.swipeData = action.payload[0]
        },
        [getSwipeDetails.rejected]: (state, action) => {
            state.isGetSwipeDetailsPending = false
            state.isGetSwipeDetailsRejected = true
            state.isGetSwipeDetailsErrorMsg = action.payload
        },


        [getAttendance.pending]: (state) => {
            state.isGetAttendancePending = true
            state.isGetAttendanceRejected = false
            state.isGetAttendanceFulfilled = false
            state.isGetAttendanceErrorMsg = ""
        },
        [getAttendance.fulfilled]: (state, action) => {
            state.isGetAttendancePending = false
            state.isGetAttendanceFulfilled = true
            state.attendanceData = action.payload
        },
        [getAttendance.rejected]: (state, action) => {
            state.isGetAttendancePending = false
            state.isGetAttendanceRejected = true
            state.attendanceData = []
            state.isGetAttendanceErrorMsg = action.payload
        },

    }
})



// export const { setError, resetAddMemberState } = swipeSlice.actions;

export default swipeSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const registerUser = createAsyncThunk('auth/registerUser', async (params, thunkAPI) => {
    try {
        const { data } = await axios.post('api/users/', params)


        return data
    } catch (error) {
        if (error.response.status === 500)
            return thunkAPI.rejectWithValue("It's not you, its us. we are working on it, try again later.")

        return thunkAPI.rejectWithValue(error.response.data.message)
    }
});


export const loginUser = createAsyncThunk('auth/loginUser', async (params, thunkAPI) => {
    try {
        const { data } = await axios.post('api/users/login', params)

        // thunkAPI.dispatch(setUserState(data))

        return data
    } catch (error) {
        if (error.response.status === 500)
            return thunkAPI.rejectWithValue("It's not you, its us. we are working on it, try again later.")

        return thunkAPI.rejectWithValue(error.response.data.message)
    }
});


export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        localStorage.removeItem('user');
        return true;
    } catch (error) {

    }
});

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialUserState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    message: "",

    isRegisterUserRejected: false,
    isRegisterUserPending: false,
    isRegisterUserErrorMsg: "",
    isRegisterUserFulfilled: false,

    isLoginUserPending: false,
    isLoginUserRejected: false,
    isLoginUserFulfilled: false,
    isLoginUserErrorMsg: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialUserState,
    reducers: {
        resetUserState: (state) => {
            state.user = null
            state.isLoading = false
            state.message = ""
        },

        setUserState: (state, data) => {
            state.user = data
        },

        resetLoginUserState: (state) => {
            state.isLoginUserPending = false
            state.isLoginUserRejected = false
            state.isLoginUserFulfilled = false
            state.isLoginUserErrorMsg = ""
        }
    },
    extraReducers: {
        // Reducers to handle registration promises
        [registerUser.pending]: (state) => {
            state.isRegisterUserPending = true
            state.isRegisterUserRejected = false
            state.isRegisterUserErrorMsg = ""
            state.isRegisterUserFulfilled = false

        },
        [registerUser.fulfilled]: (state, action) => {
            state.isRegisterUserFulfilled = true
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.isRegisterUserPending = false
            state.isRegisterUserRejected = false
            state.isRegisterUserErrorMsg = ""

        },
        [registerUser.rejected]: (state, action) => {
            state.isRegisterUserErrorMsg = action.payload
            state.isRegisterUserPending = false
            state.isRegisterUserRejected = true
        },

        // Reducers to handle login promises
        [loginUser.pending]: (state) => {
            state.isLoginUserPending = true
            state.isLoginUserRejected = false
            state.isLoginUserFulfilled = false
            state.isLoginUserErrorMsg = ""
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoginUserPending = false
            state.isLoginUserFulfilled = true
            localStorage.setItem('user', JSON.stringify(action.payload))

            state.user = action.payload

        },
        [loginUser.rejected]: (state, action) => {
            state.isLoginUserPending = false
            state.isLoginUserRejected = true
            state.isLoginUserErrorMsg = action.payload

        },


        // Reducers to handle logout promises
        [logout.fulfilled]: (state, action) => {
            state.user = null
        }
    }
})

export const { resetUserState, setUserState, resetLoginUserState } = authSlice.actions;

export default authSlice.reducer;
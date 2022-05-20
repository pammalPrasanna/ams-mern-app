import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const registerUser = createAsyncThunk('auth/registerUser', async (params, thunkAPI) => {
    try {
        // const { data } = await axios.post(process.env.REACT_APP_BASE_URI + 'api/users/', params)
        const { data } = await axios.post('api/users/', params)

        localStorage.setItem('user', JSON.stringify(data))

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

        localStorage.setItem('user', JSON.stringify(data))
        thunkAPI.dispatch(setUserState(data))

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
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.isLoading = false
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
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
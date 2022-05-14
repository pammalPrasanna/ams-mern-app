import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk('auth/registerUser', async (params, thunkAPI) => {
    try {
        const { data } = await axios.post('/api/users/', params)

        localStorage.setItem('user', JSON.stringify(data))

        return data
    } catch (error) {
        return thunkAPI.rejectWithValue('some error occured')
    }
});


export const loginUser = createAsyncThunk('auth/loginUser', async (params, thunkAPI) => {
    try {
        const { data } = await axios.post('/api/users/login', params)

        localStorage.setItem('user', JSON.stringify(data))
        thunkAPI.dispatch(setUserState(data))

        return data
    } catch (error) {
        return thunkAPI.rejectWithValue('some error occured')
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
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload

        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
            state.user = null
        },


        // Reducers to handle logout promises
        [logout.fulfilled]: (state, action) => {
            state.user = null
        }
    }
})

export const { resetUserState, setUserState } = authSlice.actions;

export default authSlice.reducer;
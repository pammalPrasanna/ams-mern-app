import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


function getTokenConfig(thunkAPI) {
    const token = thunkAPI.getState().auth.user.token
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return config;
}



export const createOrg = createAsyncThunk('orgs/createOrg', async (params, thunkAPI) => {
    try {
        const config = getTokenConfig(thunkAPI);
        const { data } = await axios.post(process.env.REACT_APP_BASE_URI + 'api/orgs/', params, config)

        return data;
    } catch (error) {
        if (error) {
            if (error.response.status === 500) {
                return thunkAPI.rejectWithValue("It's not you, its us. we are working on it, try again later.")
            }

            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
});


export const getOrgs = createAsyncThunk('orgs/getOrgs', async (_, thunkAPI) => {
    try {
        const config = getTokenConfig(thunkAPI);
        const { data } = await axios.get(process.env.REACT_APP_BASE_URI + `api/orgs/`, config);
        return data;
    } catch (error) {
        if (error) {
            if (error.response.status === 500) {
                return thunkAPI.rejectWithValue("It's not you, its us. we are working on it, try again later.")
            }

            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
});

const initialOrgsState = {
    orgs: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    isInternalError: false
}

const orgsSlice = createSlice({
    name: 'orgs',
    initialState: initialOrgsState,
    reducers: {
        resetOrgsStore: (state) => {
            state.orgs = []
            state.isLoading = false
            state.isError = false
            state.message = ""
            state.isInternalError = false

        },

        setInternalError: (state) => {
            state.isInternalError = true
        },


    },
    extraReducers: {
        // Reducers to handle creating orgs promises
        [createOrg.pending]: (state) => {
            state.isLoading = true
        },
        [createOrg.fulfilled]: (state, action) => {
            state.orgs.push(action.payload)
            state.isLoading = false
            state.isSuccess = true
        },
        [createOrg.rejected]: (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
        },

        // Reducers to handle getting orgs promises
        [getOrgs.pending]: (state) => {
            state.isLoading = true
        },
        [getOrgs.fulfilled]: (state, action) => {
            state.orgs = action.payload
            state.isLoading = false
        },
        [getOrgs.rejected]: (state, action) => {

            state.isLoading = false
            state.message = action.payload
            state.isError = true
        },

    }
})

export const { resetOrgsStore, getOrgName } = orgsSlice.actions;

export default orgsSlice.reducer;
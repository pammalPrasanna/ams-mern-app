import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


function getTokenConfig(thunkAPI) {
    const token = thunkAPI.getState().auth.user.token
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return config;
}

export const deleteMember = createAsyncThunk('members/deleteMember', async (id, thunkAPI) => {
    try {
        const config = getTokenConfig(thunkAPI);
        const resp = await axios.delete(process.env.REACT_APP_BASE_URI + `api/members/${id}`, config)
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

export const getMembers = createAsyncThunk('members/getMembers', async (org_id, thunkAPI) => {

    try {
        const config = getTokenConfig(thunkAPI);
        const resp = await axios.get(process.env.REACT_APP_BASE_URI + `api/orgs/members/${org_id}`, config)
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

export const getOneMember = createAsyncThunk('members/getOneMember', async (mid, thunkAPI) => {
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URI + `api/members/${mid}`)

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


export const addMember = createAsyncThunk('members/addMember', async (memberData, thunkAPI) => {

    try {
        const config = getTokenConfig(thunkAPI);
        const resp = await axios.post(process.env.REACT_APP_BASE_URI + `api/members/`, memberData, config)

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


export const registerMember = createAsyncThunk('members/registerMember', async (memberData, thunkAPI) => {
    try {
        const resp = await axios.post(process.env.REACT_APP_BASE_URI + `api/members/register`, memberData)
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




const initialMembersState = {
    members: [],
    isLoading: false,
    isError: false,

    member: {},

    isGetMembersPending: false,
    isGetMembersRejected: false,
    isGetMembersFulfilled: false,
    isGetMembersErrorMsg: "",

    isAddMemberPending: false,
    isAddMemberRejected: false,
    isAddMemberFullfilled: false,
    isAddMemberErrorMsg: "",

    isdeleteMemberPending: false,
    isdeleteMemberRejected: false,
    isdeleteMemberFullfilled: false,
    isDeleteMemeberErrorMsg: "",

    isGetOneMemberPending: false,
    isGetOneMemberRejected: false,
    isGetOneMemberFulfilled: false,
    isGetOneMemberErrorMsg: "",

    isRegisterMemberPending: false,
    isRegisterMemberFulfilled: false,
    isRegisterMemberRejected: false,
    registerMemberErrorMsg: "",


}

const membersSlice = createSlice({
    name: 'members',
    initialState: initialMembersState,
    reducers: {
        setError: (state, status) => {
            state.isError = status;
        },
        resetAddMemberState: (state) => {
            state.isAddMemberPending = false
            state.isAddMemberRejected = false
            state.isAddMemberFullfilled = false
        },
    },
    extraReducers: {
        [getMembers.pending]: (state) => {
            state.isGetMembersPending = true
            state.isGetMembersRejected = false
            state.isGetMembersFulfilled = false
            state.isGetMembersErrorMsg = ""
        },
        [getMembers.fulfilled]: (state, action) => {
            state.isGetMembersFulfilled = true
            state.members = action.payload
            state.isGetMembersPending = false;
        },
        [getMembers.rejected]: (state, action) => {
            state.isGetMembersPending = false;
            state.isGetMembersRejected = true;
            state.isGetMembersErrorMsg = action.payload

        },



        [addMember.pending]: (state) => {
            state.isAddMemberPending = true;
        },
        [addMember.fulfilled]: (state, action) => {
            state.members.push(action.payload);
            state.isAddMemberPending = false;
            toast.success('Member was added successfully');

        },
        [addMember.rejected]: (state, action) => {
            state.isAddMemberPending = false;
            state.isAddMemberRejected = true;
            toast.error('Unable to add member at the moment');
        },



        [deleteMember.pending]: (state) => {
            state.isdeleteMemberPending = true
        },

        [deleteMember.fulfilled]: (state, action) => {
            state.isdeleteMemberPending = false
            state.isdeleteMemberFullfilled = true
            state.members = state.members.filter(e => e.mid._id !== action.payload.id);
            toast.success('Member was deleted successfully')

        },
        [deleteMember.rejected]: (state) => {
            state.isdeleteMemberRejected = true
            state.isdeleteMemberPending = false
            toast.error('Unable to delete the member at the moment')
        },


        [getOneMember.pending]: (state) => {
            state.isGetOneMemberPending = true
        },
        [getOneMember.fulfilled]: (state, action) => {
            state.member = action.payload;
            state.isGetOneMemberPending = false
            state.isGetOneMemberFulfilled = true
        },
        [getOneMember.rejected]: (state, action) => {
            state.isGetOneMemberRejected = true
            state.isGetOneMemberPending = false
            state.isGetOneMemberErrorMsg = action.payload

        },


        [registerMember.pending]: (state) => {
            state.isRegisterMemberPending = true
            state.isRegisterMemberRejected = false
            state.registerMemberErrorMsg = ""
            state.isRegisterMemberFulfilled = false

        },
        [registerMember.fulfilled]: (state) => {
            state.isRegisterMemberPending = false
            state.isRegisterMemberFulfilled = true
        },
        [registerMember.rejected]: (state, action) => {
            state.isRegisterMemberPending = false
            state.isRegisterMemberRejected = true
            state.registerMemberErrorMsg = action.payload

        },




    }
})




export const { setError, resetAddMemberState } = membersSlice.actions;

export default membersSlice.reducer;
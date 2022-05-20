import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import orgsReducer from "../features/orgs/orgsSlice"
import membersReducer from "../features/members/membersSlice"
import swipeReducer from "../features/swipe/swipeSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        orgs: orgsReducer,
        members: membersReducer,
        swipe: swipeReducer
    }
})
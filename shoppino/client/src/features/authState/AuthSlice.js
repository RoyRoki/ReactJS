import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'authslice',
    initialState: {
        value: false,
        email: ''
    },
    reducers: {
        login: (state, action) => {
            state.value = true;
            state.email = action.payload;
        },
        logout: state => {
            state.value = false;
            state.email = '';
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'authslice',
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const {login, logout, setLoading} = authSlice.actions
export default authSlice.reducer;
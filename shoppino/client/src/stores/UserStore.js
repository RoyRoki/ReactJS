import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authState/AuthSlice'

export default configureStore({
    reducer: {
        auth: authReducer
    }
})
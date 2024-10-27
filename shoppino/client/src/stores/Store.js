import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "../features/slice/AuthSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        authslice: persistAuthReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
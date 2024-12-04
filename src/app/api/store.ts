import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./base/api-slice";
import authReducer from './auth/auth-slice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
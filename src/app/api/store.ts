import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./base/api-slice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
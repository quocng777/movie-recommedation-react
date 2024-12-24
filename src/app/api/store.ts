import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./base/api-slice";
import authReducer from './auth/auth-slice'
import movieListReducer from './movies/movie-list-slice';
import playlistReducer from './playlist/playlist-slice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        movieList: movieListReducer,
        playlist: playlistReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
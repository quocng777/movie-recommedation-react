import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRes } from "../types/user.type";

export type User = UserRes;

type MovieListState = {
    likedMovies: number[],
    watchLater: number[],
}

const initialState: MovieListState = {
    likedMovies: [],
    watchLater: [],
}

const movieListSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLikedMovies: (state, action: PayloadAction<number[]>) => {
            state.likedMovies = action.payload;
        },
        addLikedMovie: (state, action) => {
            state.likedMovies = [
                action.payload,
                ...state.likedMovies
            ]
        },
        removeLikedMovie: (state, action) => {
            state.likedMovies = state.likedMovies.filter(id => id !== action.payload)
        },
        setWatchLater: (state, action: PayloadAction<number[]>) => {
            state.watchLater = action.payload;
        },
        addMovieToWatchLater: (state, action) => {
            state.watchLater = [
                action.payload,
                ...state.watchLater
            ]
        },
        removeFromWatchLater: (state, action) => {
            state.watchLater = state.watchLater.filter(id => id !== action.payload)
        },
    }
});

export const { 
    setLikedMovies,
    addLikedMovie,
    removeLikedMovie,
    setWatchLater,
    addMovieToWatchLater,
    removeFromWatchLater,

} = movieListSlice.actions;

export default movieListSlice.reducer;
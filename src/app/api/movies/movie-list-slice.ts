import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRes } from "../types/user.type";

export type User = UserRes;

type MovieListState = {
    likedMovies: number[],
}

const initialState: MovieListState = {
    likedMovies: []
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
        }
    }
});

export const { 
    setLikedMovies,
    addLikedMovie,
    removeLikedMovie

} = movieListSlice.actions;

export default movieListSlice.reducer;
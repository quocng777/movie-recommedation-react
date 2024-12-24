import { createSlice } from "@reduxjs/toolkit";
import { Playlist } from "../types/playlist.type";
import { stat } from "fs";

type PlaylistState = Playlist[];

const initialState: PlaylistState = [];

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        addPlayList: (state, action) => {
            if(Array.isArray(action.payload)) {
                state = [
                    ...action.payload,
                    ...state,
                ];
                return state;
            }

            state = [
                action.payload,
                ...state,
            ]

            return state;

        }
    }
});

export const { 
    addPlayList,
} = playlistSlice.actions;

export default playlistSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { Playlist } from "../types/playlist.type";

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

        },
        deletePlaylist: (state, action) => {
            const playlistId = action.payload;
            return state.filter(playlist => playlist.id !== playlistId);
        },
    }
});

export const { 
    addPlayList,
    deletePlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
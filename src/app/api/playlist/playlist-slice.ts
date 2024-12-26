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
        updatePlaylist: (state, action) => {
            const playlist = action.payload;
            const idx = state.findIndex(item => item.id === playlist.id);

            if(idx === -1) {
                return;
            }

            state[idx] = playlist;
        },
    }
});

export const { 
    addPlayList,
    deletePlaylist,
    updatePlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
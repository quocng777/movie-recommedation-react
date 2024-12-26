import { apiSlice } from "../base/api-slice";
import { CreatePlaylistDto, Playlist } from "../types/playlist.type";
import { Response } from "../types/response";

export type PlaylistQueryOptions = {
    movieId?: number
} | undefined;


export const playlistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPlaylist: builder.query<Response<Playlist[]>, PlaylistQueryOptions | void>({
            query: (query = {}) => ({
                url: '/playlist',
                method: 'GET',
                params: query || {}
            })
        }),
        addPlaylist: builder.mutation<Response<Playlist>, CreatePlaylistDto>({
            query: (body) => ({
                url: '/playlist',
                method: 'POST',
                body
            })
        }),
        addMovieToPlay: builder.mutation<Response<{movieId: number, playlistId: number}>, {playlistId: number, movieId: number}>({
            query: (param) => ({
                url: `/playlist/${param.playlistId}/movies`,
                method: 'POST',
                body: {
                    movieId: param.movieId
                }
            })
        }),
        removeMovieFromPlaylist: builder.mutation<Response<number>, {playlistId: number, movieId: number}>({
            query: (param) => ({
                url: `/playlist/${param.playlistId}/movies`,
                method: 'DELETE',
                body: {
                    movieId: param.movieId,
                }
            })
        })
    }),
});

export const {
    useGetPlaylistQuery,
    useLazyGetPlaylistQuery,
    useAddPlaylistMutation,
    useAddMovieToPlayMutation,
    useRemoveMovieFromPlaylistMutation,
} = playlistApiSlice;
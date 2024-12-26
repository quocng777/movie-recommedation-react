import { url } from "inspector";
import { apiSlice } from "../base/api-slice";
import { CreatePlaylistDto, Playlist } from "../types/playlist.type";
import { Response } from "../types/response";

export type PlaylistQueryOptions = {
    movieId?: number
} | undefined;

export type MovieQueryOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?: string;
} | undefined;

export type UpdatePlaylistQueryArg = {
    playlistId: number;
} & CreatePlaylistDto;

export type GetMovieFromPlaylistQuery = MovieQueryOptions & {
    playlistId: number;
}


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
        }),
        getMovieFromPlaylist: builder.query<Response<number[]>, GetMovieFromPlaylistQuery>({
            query: (query) => ({
                url: `/playlist/${query.playlistId}/movies`,
                method: 'GET',
                params: query,
            })
        }),
        deletePlaylist: builder.mutation<Response<number>, number>({
            query: (playlistId) => ({
                url: `/playlist/${playlistId}`,
                method: 'DELETE',
            })
        }),
        updatePlaylist: builder.mutation<Response<Playlist>, UpdatePlaylistQueryArg>({
            query: (queryArg) => ({
                url: `/playlist/${queryArg.playlistId}`,
                method: 'PUT',
                body: queryArg,
            }),
        }) 
    }),
});

export const {
    useGetPlaylistQuery,
    useLazyGetPlaylistQuery,
    useAddPlaylistMutation,
    useAddMovieToPlayMutation,
    useRemoveMovieFromPlaylistMutation,
    useGetMovieFromPlaylistQuery,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
} = playlistApiSlice;
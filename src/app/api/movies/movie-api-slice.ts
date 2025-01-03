import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { apiEndpoints } from "../constants";
import { Movie, MovieCast, MovieCastResponse, MovieMediaType, MovieTrendingDuration, MovieTrendingType, TmdbPageResponse, MovieKeywords, MovieKeywordsResponse, SearchKeyword } from "../types/movie.type";

export const movieApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        movieTrending: builder.query<Response<TmdbPageResponse<Movie>>, {trendingType: MovieTrendingType}>({
            query: (query) => ({
                url: apiEndpoints.MOVIE_TRENDING + 
                    '/' + (query.trendingType.mediaType || MovieMediaType.ALL) + 
                    '/' + (query.trendingType.duration || MovieTrendingDuration.DAY),
                method: 'GET' ,
            })
        }),
        searchMovies: builder.query<Response<TmdbPageResponse<Movie>>, { query: string, page: number }>({
            query: ({ query, page }) => ({
                url: `${apiEndpoints.MOVIE_SEARCH}`,
                params: { query: query, page: page },
                method: 'GET',
            }),
            transformResponse: (response: any) => ({
                ...response,
                data: {
                    ...response.data,
                    totalPages: response.data.total_pages,
                    totalResults: response.data.total_results
                }
            })
        }),

        movieDetail: builder.query<Response<Movie>, { id: string }>({
            query: ({ id }) => ({
                url: `${apiEndpoints.MOVIE}/${id}`,
                method: 'GET',
            }),
        }),

        movieCast: builder.query<Response<MovieCastResponse<MovieCast>>, { id: string }>({
            query: ({ id }) => ({
                url: `${apiEndpoints.MOVIE}/${id}/credits`,
                method: 'GET',
            }),
        }),
        movieKeywords: builder.query<Response<MovieKeywordsResponse<MovieKeywords>>, { id: string }>({
            query: ({ id }) => ({
                url: `${apiEndpoints.MOVIE}/${id}/keywords`,
                method: 'GET',
            }),
        }),
        getKeyword: builder.query<Response<TmdbPageResponse<SearchKeyword>>, {query: string}>({
            query: ({ query }) => ({
                url: apiEndpoints.SEARCH_KEYWORD,
                params: { query },
                method: 'GET',
            })
        }),
        getLikedMovies: builder.query<Response<number[]>, void>({
            query: () => ({
                url: apiEndpoints.LIKED_MOVIE,
                method: 'GET'
            })
        }),
        likeMovie: builder.mutation<Response<number>, {movieId: number}>({
            query: (body) => ({
                url: apiEndpoints.LIKED_MOVIE,
                method: 'POST',
                body
            })
        }),
        removeLikedMovie: builder.mutation<Response<number>, {movieId: number}>({
            query: body => ({
                url: apiEndpoints.LIKED_MOVIE,
                method: 'DELETE',
                body
            }),
        }),
        getWatchLaterList: builder.query<Response<number[]>, void>({
            query: () => ({
                url: apiEndpoints.WATCH_LATER,
                method: 'GET'
            })
        }),
        addToWatchLater: builder.mutation<Response<number>, {movieId: number}>({
            query: (body) => ({
                url: apiEndpoints.WATCH_LATER,
                method: 'POST',
                body
            })
        }),
        removeFromWatchLater: builder.mutation<Response<number>, {movieId: number}>({
            query: body => ({
                url: apiEndpoints.WATCH_LATER,
                method: 'DELETE',
                body
            }),
        })
    })
});

export const {
    useMovieTrendingQuery,
    useLazyMovieTrendingQuery,
    useLazySearchMoviesQuery,
    useMovieDetailQuery,
    useLazyMovieDetailQuery,
    useMovieCastQuery,
    useLazyMovieCastQuery,
    useMovieKeywordsQuery,
    useLazyMovieKeywordsQuery,
    useLazyGetKeywordQuery,
    useLazyGetLikedMoviesQuery,
    useLikeMovieMutation,
    useRemoveLikedMovieMutation,
    useLazyGetWatchLaterListQuery,
    useAddToWatchLaterMutation,
    useRemoveFromWatchLaterMutation,
} = movieApiSlice;
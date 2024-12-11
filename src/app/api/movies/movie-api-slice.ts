import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { apiEndpoints } from "../constants";
import { Movie, Moviecast, MoviecastResponse, MovieMediaType, MovieTrendingDuration, MovieTrendingType, TmdbPageResponse, MovieKeywords, MovieKeywordsResponse } from "../types/movie.type";

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
        movieDetail: builder.query<Response<Movie>, { id: string }>({
            query: ({ id }) => ({
                url: `${apiEndpoints.MOVIE}/${id}`,
                method: 'GET',
            }),
        }),

        movieCast: builder.query<Response<MoviecastResponse<Moviecast>>, { id: string }>({
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
    })
});

export const {
    useMovieTrendingQuery,
    useLazyMovieTrendingQuery,
    useMovieDetailQuery,
    useLazyMovieDetailQuery,
    useMovieCastQuery,
    useLazyMovieCastQuery,
    useMovieKeywordsQuery,
    useLazyMovieKeywordsQuery

} = movieApiSlice;
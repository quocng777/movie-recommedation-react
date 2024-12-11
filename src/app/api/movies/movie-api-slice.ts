import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { apiEndpoints } from "../constants";
import { Movie, MovieMediaType, MovieTrendingDuration, MovieTrendingType, TmdbPageResponse } from "../types/movie.type";

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
        searchMovies: builder.query<Response<TmdbPageResponse<Movie>>, { query: string }>({
            query: ({ query }) => ({
                url: `${apiEndpoints.MOVIE_SEARCH}`,
                params: { query },
                method: 'GET',
            })
        }),
    })
});

export const {
    useMovieTrendingQuery,
    useLazyMovieTrendingQuery,
    useLazySearchMoviesQuery
} = movieApiSlice;
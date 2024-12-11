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
    })
});

export const {
    useMovieTrendingQuery,
    useLazyMovieTrendingQuery,
    useLazySearchMoviesQuery
} = movieApiSlice;
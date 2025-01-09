import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { apiEndpoints } from "../constants";
import { Movie, MovieCast, MovieCastResponse, MovieMediaType, MovieTrendingDuration, MovieTrendingType, TmdbPageResponse, MovieKeywords, MovieKeywordsResponse, SearchKeyword, MovieVideo, Genre } from "../types/movie.type";
import { FilterParams } from "../types/params.type";
import { SortOptions } from "../constants/sort-options";

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

        movieGenres: builder.query<Response<{genres: Genre[]}>, void>({
            query: () => ({
                url: `${apiEndpoints.MOVIE_GENRES}`,
                method: 'GET',
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
        }),

        popularMovies: builder.query<Response<TmdbPageResponse<Movie>>, void>({
          query: () => ({
            url: `/tmdb/discover/movie`,
            method: 'GET',
          })
        }),

        trailerVideo: builder.query<Response<MovieVideo>, number>({
          query: (movieId) => ({
            url: `/tmdb/movie/${movieId}/videos`,
            method: 'GET'
          })
        }),

        nowPlaying: builder.query<Response<TmdbPageResponse<Movie>>, void>({
          query: () => ({
            url: `/tmdb/movie/now_playing`,
            method: 'GET'
          })
        }),

        discoverMovies: builder.query<Response<TmdbPageResponse<Movie>>, FilterParams>({
            query: (params) => {
                const { page, sortValue, fromDate, toDate, selectedGenres, scoreValues, voteValues } = params;

                let url = '/tmdb/discover/movie?';
                url += `page=${page || 1}`;
                url += `&sort_by=${sortValue || SortOptions.POPULARITY_DESC.KEY}`;

                if (fromDate) {
                    url += `&primary_release_date.gte=${fromDate}`;
                }
                if (toDate) {
                    url += `&primary_release_date.lte=${toDate}`;
                }
                if (selectedGenres && selectedGenres.length > 0) {
                    url += `&with_genres=${selectedGenres.join(",")}`;
                }
                
                if (scoreValues) {
                    if (scoreValues[0] !== 0) {
                        url += `&vote_average.gte=${scoreValues[0]}`;
                    } 
                    if (scoreValues[1] !== 10) {
                        url += `&vote_average.lte=${scoreValues[1]}`;
                    }
                }

                if (voteValues) {
                    if (voteValues[0] !== 0) {
                        url += `&vote_count.gte=${voteValues[0]}`;
                    } 
                    if (voteValues[1] !== 10000) {
                        url += `&vote_count.lte=${voteValues[1]}`;
                    }
                }

                return {
                    url,
                    method: "GET",
                };
            }
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
    usePopularMoviesQuery,
    useTrailerVideoQuery,
    useNowPlayingQuery,
    useMovieGenresQuery,
    useLazyDiscoverMoviesQuery,
} = movieApiSlice;
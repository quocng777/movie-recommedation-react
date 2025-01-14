import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { apiEndpoints } from "../constants";
import { Movie, MovieCast, MovieCastResponse, MovieMediaType, MovieTrendingDuration, MovieTrendingType, TmdbPageResponse, MovieKeywords, MovieKeywordsResponse, SearchKeyword, MovieVideo, Genre, Review, Rating } from "../types/movie.type";
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
                url: apiEndpoints.MOVIE_SEARCH,
                params: { query: query, page: page },
                method: 'GET',
            }),
        }),

        movieGenres: builder.query<Response<{genres: Genre[]}>, void>({
            query: () => ({
                url: `${apiEndpoints.MOVIE_GENRES}`,
                method: 'GET',
            })
        }),

        movieDetail: builder.query<Response<Movie>, { id: string }>({
            query: ({ id }) => ({
                url: `${apiEndpoints.MOVIE_DETAIL}/${id}`,
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
            url: apiEndpoints.MOVIE_POPULAR,
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
            url: apiEndpoints.MOVIE_NOWPLAYING,
            method: 'GET'
          })
        }),

        discoverMovies: builder.query<Response<TmdbPageResponse<Movie>>, FilterParams>({
            query: (params) => {
                const { page, sortValue, fromDate, toDate, selectedGenres, scoreValues, voteValues } = params;

                let url = `${apiEndpoints.MOVIE_DISCOVER}?`;
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
        }),

        addMovieRating: builder.mutation<Response<void>, {movieId: number, score: number}>({
          query: (rating) => ({
            url: `/movies/${rating.movieId}/rating`,
            method: 'POST',
            body: {
              score: rating.score,
            }
          })
        }),

        getMovieRating: builder.query<Response<{movieId: number, score: number}>, number>({
          query: (movieId) => ({
            url: `/movies/${movieId}/rating`,
            method: 'GET',
          })
        }),

        getAverageMovieRating: builder.query<Response<{vote_count: number, vote_average: number}>, number>({
            query: (movieId) => ({
                url: `/movies/${movieId}/rating/average`,
                method: 'GET',
            })
        }),

        deleteMovieRating: builder.mutation<void, number>({
          query: (movieId) => ({
            url: `/movies/${movieId}/rating`,
            method: 'DELETE',
          })
        }),

        getMovieReviews: builder.query<Response<{total: number, reviews: Review[], total_pages: number, current_page: number}>, {movieId: number, page: number, limit: number}>({
          query: ({movieId, page, limit}) => ({
            url: `/movies/${movieId}/reviews?limit=${limit}&page=${page}`,
            method: 'GET',
          })
        }),

        getMovieLatestReview: builder.query<Response<{total: number, reviews: Review[]}>, { movieId: number, limit: number }>({
          query: ({ movieId, limit }) => ({
            url: `/movies/${movieId}/reviews/latest?limit=${limit}`,
            method: 'GET',
          })
        }),

        addMovieReview: builder.mutation<Response<void>, { movieId: number, content: string }>({
            query: ({ movieId, content }) => ({
                url: `/movies/${movieId}/reviews`,
                method: 'POST',
                body: {
                    comment: content,
                }
            })
        }),

        editMovieReview: builder.mutation<Response<void>, { reviewId: number, movieId: number, content: string }>({
            query: ({ reviewId, movieId, content }) => ({
                url: `/movies/${movieId}/reviews/${reviewId}`,
                method: 'PATCH',
                body: {
                    comment: content,
                }
            })
        }),

        deleteMovieReview: builder.mutation<Response<void>, { reviewId: number, movieId: number }>({
            query: ({ reviewId, movieId }) => ({
                url: `/movies/${movieId}/reviews/${reviewId}`,
                method: 'DELETE',
            })
        }),

        getRatings: builder.query<Response<Rating[]>, void>({
          query: () => ({
            url: `/movies/rating`,
            method: 'GET',
          })
        }),

        getMoviesFromObjectIds: builder.query<Response<Movie[]>, { objectIds: string[] }>({
            query: ({ objectIds }) => ({
                url: `/movies/get-with-objectids?objectIds=${objectIds.join(",")}`,
                method: 'GET',
            }),
        }),
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
    useAddMovieRatingMutation,
    useGetMovieRatingQuery,
    useLazyGetMovieRatingQuery,
    useDeleteMovieRatingMutation,
    useLazyGetMovieReviewsQuery,
    useLazyGetMovieLatestReviewQuery,
    useAddMovieReviewMutation,
    useEditMovieReviewMutation,
    useDeleteMovieReviewMutation,
    useGetRatingsQuery,
    useLazyGetMoviesFromObjectIdsQuery,
    useLazyGetAverageMovieRatingQuery
} = movieApiSlice;
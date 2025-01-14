export const apiEndpoints = {
    REGISTER: '/auth/register',
    GOOGLE_AUTH: '/auth/google',
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/users/me',
    MOVIE_TRENDING: '/tmdb/trending',
    MOVIE_SEARCH: '/tmdb/search/movie',
    TV_SEARCH: '/tmdb/search/tv',
    MOVIE: "/tmdb/movie",
    MOVIE_DETAIL: "movies",
    SEARCH_KEYWORD: "/tmdb/search/keyword",
    LIKED_MOVIE: '/movies/liked',
    WATCH_LATER: '/movies/watch-later',
    MOVIE_GENRES: '/tmdb/genre/movie/list',
    // PERSON : "/tmdb/person",
    PERSON : "/people",
    MOVIE_CREDITS: "/movie_credits"
};

export const customApiCode = {
    "USERNAME_DUPLICATED" : {
        customCode: 601,
        message: 'username is duplicated'
    },
    "EMAIL_DUPLICATED" : {
        customCode: 602,
        message: 'email is duplicated'
    }
};
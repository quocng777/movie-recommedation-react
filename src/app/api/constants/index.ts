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
    SEARCH_KEYWORD: "/tmdb/search/keyword",
    LIKED_MOVIE: '/movies/liked'
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
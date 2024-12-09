export type Movie =  {
    adult: boolean;

    backdrop_path: string;

    id: number;

    title: string;

    original_language: string;

    original_title: string;

    overview: string;

    poster_path: string;

    media_type: string;

    genre_ids: number[];

    popularity: number;

    release_date: string;

    video: boolean;

    vote_average: number;
    
    vote_count: number;
};

export enum MovieMediaType  {
    ALL =  'all',
    MOVIE = 'movie',
    TV = 'tv',
    PEOPLE = 'people',
}

export enum MovieTrendingDuration {
    DAY = 'day',
    WEEK = 'week'
}

export type MovieTrendingType = {
    mediaType: MovieMediaType,
    duration: MovieTrendingDuration
}

export type TmdbPageResponse<T> = {
    page: number;
    results: T[];
    totalPages: number;
    totalResults: number;
}
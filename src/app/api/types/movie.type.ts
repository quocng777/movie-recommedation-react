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
    
    tagline: string;

    genres: Genre[];

    runtime: number;

    status: string;

    budget: number;

    revenue: number;
};
export type Genre = {
    id: number;
    name: string;
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

export type Moviecast ={
    adult: boolean;

    id: number;

    profile_path: string;

    name: string;

    character: string;
}

export type MoviecastResponse<T> ={

    id: number;

    cast: T[];
}

export type MovieKeywords = {
    id: number;

    name: string;
}

export type MovieKeywordsResponse<T> = {
    id: number;
    keywords: T[];
}
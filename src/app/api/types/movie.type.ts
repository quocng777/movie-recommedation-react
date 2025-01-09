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

export enum MovieTrailerType {
  POPULAR = 'popular',
  IN_THEATER = 'in_theater',
}

export type MovieTrendingType = {
  mediaType: MovieMediaType,
  duration: MovieTrendingDuration
}

export type TmdbPageResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MovieCast ={
  adult: boolean;
  id: number;
  profile_path: string;
  name: string;
  character: string;
}

export type MovieCastResponse<T> ={
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

export type  SearchKeyword = {
  id: number,
  name: string,
}

export type Video = {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: string,
  published_at: string,
  id: string,
}

export type MovieVideo = {
  id: number,
  results: Video[],
}

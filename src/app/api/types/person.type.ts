
export type Person = {
  adult: boolean;
  also_known_as: string[];
  biography: string | null;
  birthday: string;
 deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

export type PersonMovieCreditsResponse<T> = {
    crew: T[];
    id: number,
    cast: T[];
}

export type Credit = {
    id: number;
    title: string;
    character: string;
    original_title: string;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    backdrop_path: string | null;
    genre_ids: number[];
    vote_average: number;
    vote_count: number;
    media_type: string;
    credit_id: string;
    order: number;
    video: boolean;
    adult: boolean;
  };
  
export type Genre = {
    id: number;
    name: string;
  };
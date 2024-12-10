import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLazyMovieDetailQuery } from "@/app/api/movies/movie-api-slice";
import { Movie } from "@/app/api/types/movie.type";
import { FallbackScreen } from "@/components/custom/fallback-screen";
export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  const [
    getMovieDetail,
    { data: movieData, isSuccess: isGetMovieDataSuccess, error: apiError },
  ] = useLazyMovieDetailQuery();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setError(null);
      getMovieDetail({ id });
    }
  }, [id]);

  useEffect(() => {
    if (isGetMovieDataSuccess && movieData) {
      setMovie(movieData.data);
      setIsLoading(false);
    }
    if (apiError) {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  }, [isGetMovieDataSuccess, movieData]);

  if (isLoading) return <FallbackScreen />;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <div
        className="relative flex rounded-lg overflow-hidden shadow-lg"
        style={{
          height: "650px",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 flex items-center px-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-48 rounded-lg shadow-lg"
          />
          <div className="ml-8">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="italic mt-4">{movie.tagline}</p>
            <p className="mt-4 text-sm">{movie.overview}</p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="inline-block bg-gray-800 px-3 py-1 rounded-lg">
                ⭐ {movie.vote_average}
              </span>
              <span className="inline-block bg-gray-800 px-3 py-1 rounded-lg">
                📅 {new Date(movie.release_date).toLocaleDateString()}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres && movie.genres.length > 0 ? (
                movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 px-4 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))
              ) : (
                <span>No genres available</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Phần nội dung bên dưới */}
      <div className="flex-1 p-6"></div>
    </div>
  );
};

export default MovieDetail;

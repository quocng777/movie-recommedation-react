import { useParams } from "react-router-dom";
import { useState, useEffect, MouseEventHandler } from "react";
import {
  useLazyMovieCastQuery,
  useLazyMovieDetailQuery,
  useLazyMovieKeywordsQuery,
} from "@/app/api/movies/movie-api-slice";
import { Movie, MovieCast, MovieKeywords } from "@/app/api/types/movie.type";
import { FallbackScreen } from "@/components/custom/fallback-screen";
import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import { MovieCastCard } from "@/components/custom/moviecast-card";
import { MovieCardSkeleton } from "@/components/custom/movie-card-sekeleton";
import { Button } from "@/components/ui/button";
import { Bookmark, Eye, EyeFill, Heart, HeartFill, Play } from "react-bootstrap-icons";
import { useMovieActions } from "@/hooks/use-movie-actions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/api/store";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AddMovieToPlaylistDialog } from "@/components/custom/add-movie-to-playlist-dialog";
const languageMap: { [key: string]: string } = {
  en: "English",
  vn: "Vietnamese",
};
export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const [movieCast, setMovieCast] = useState<MovieCast[]>([]);
  const [movieKeywords, setMovieKeywords] = useState<MovieKeywords[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMovieCastLoading, setIsMovieCastLoading] = useState(true);
  const {isLiked, likeMovie, isInWatchLaterList, watchLater} = useMovieActions(Number(id));
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
  const [error, setError] = useState<string | null>(null);
  const [
    getMovieDetail,
    { data: movieData, isSuccess: isGetMovieDataSuccess, error: apiError },
  ] = useLazyMovieDetailQuery();
  const [
    getMovieCast,
    { data: movieCastData, isSuccess: isGetMovieCastSuccess },
  ] = useLazyMovieCastQuery();
  const [
    getMovieKeywords,
    { data: movieKeywordData, isSuccess: isGetMovieKeywordsSuccess },
  ] = useLazyMovieKeywordsQuery();

  const onLikeMovieClick: MouseEventHandler = () => {
      if(!isAuthenticated) {
        return;
      }
      likeMovie();
  };

  const onAddWatchListClick: MouseEventHandler = () => {
    if(!isAuthenticated) {
      return;
    }
    watchLater();
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setIsMovieCastLoading(true);
      setError(null);
      getMovieDetail({ id });
      getMovieCast({ id });
      getMovieKeywords({ id });
    }
  }, [id]);

  useEffect(() => {
    if (isGetMovieDataSuccess && movieData) {
      setMovie(movieData.data);
      setIsLoading(false);
    }
    if (apiError) {
        const statusCode = (apiError as any)?.status || 500;
        if (statusCode === 404) {
          setError("No movie found with the given ID. Please check the ID and try again.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setIsLoading(false)
  }
}, [isGetMovieDataSuccess, movieData, apiError]);

  useEffect(() => {
    if (isGetMovieCastSuccess) {
      setMovieCast(movieCastData.data?.cast!);
      setIsMovieCastLoading(false);
    }
  }, [isGetMovieCastSuccess]);

  useEffect(() => {
    if (isGetMovieKeywordsSuccess) {
      setMovieKeywords(movieKeywordData.data?.keywords!);
    }
  }, [isGetMovieKeywordsSuccess]);

  if (isLoading) return <FallbackScreen />;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;
  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Header */}
      <div
        className="relative h-[600px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${getResourceFromTmdb(
            movie.backdrop_path || movie.poster_path
          )})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex gap-8 text-white">
          <div className="w-1/3">
            <img
              src={getResourceFromTmdb(movie.poster_path)}
              alt={movie.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-2/3">
            <div className="flex justify-between items-center">
              <h1 className="text-5xl font-bold">{movie.title}</h1>
            </div>
            <span className="text-lg">
              {new Date(movie.release_date).toLocaleDateString()}
            </span>
            <div className="flex gap-4 flex-wrap mt-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-700 px-4 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* UserScore and What is your vibe */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex justify-center items-center">
                  {movie.vote_average}
                </div>
              </div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
                What's your vibe?
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 text-white">
              <Tooltip>
                <TooltipTrigger asChild>
                  <AddMovieToPlaylistDialog movieId={movie.id}>
                    <Button size="icon" className="bg-gray-800 rounded-full text-white hover:bg-background hover:text-sky-500">
                      <Bookmark />
                    </Button>
                  </AddMovieToPlaylistDialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {
                      !isAuthenticated 
                      ? 'Login to add to your playlist'
                      : 'Add to playlist'
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="bg-gray-800 rounded-full text-white hover:bg-background hover:text-pink-500" onClick={onLikeMovieClick}>
                  {
                    isLiked 
                    ? <HeartFill className="text-pink-500" />
                    : <Heart />
                  }
                </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {
                      !isAuthenticated 
                      ? 'Login to like this movie'
                      : (
                        isLiked 
                        ? 'Remove out of like list'
                        : 'Like this movie'
                      )
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="bg-gray-800 rounded-full text-white hover:bg-background hover:text-green-500" onClick={onAddWatchListClick}>
                    {
                      !isInWatchLaterList 
                      ? <Eye />
                      : <EyeFill className="text-green-500" />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {
                      !isAuthenticated 
                      ? 'Login to add to your watch list'
                      : (
                        isInWatchLaterList 
                        ? 'Remove from watch list'
                        : 'Add to watch list'
                      )
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
              <Button size="icon" className="bg-blue-500 rounded-full text-white hover:bg-blue-500 hover:bg-opacity-80">
                <Play />
              </Button>
            </div>

            {/* Tagline */}
            <p className="italic text-lg mt-6">{movie.tagline}</p>

            {/* Overview */}
            <p className="mt-4">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Phần nội dung bên dưới */}
      <div className="flex flex-1 max-w-7xl mx-auto mt-6 gap-6">
        {/* Left Column */}
        <div className="w-3/4 pl-4">
          <h2 className="text-lg font-bold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto py-6">
            {isMovieCastLoading &&
              new Array(10).fill(null).map((_, idx) => {
                return <MovieCardSkeleton key={idx} />;
              })}
            {movieCast.length === 0 && !isMovieCastLoading && (
              <p className="text-gray-500">No cast available</p>
            )}
            {movieCast.map((cast) => {
              return <MovieCastCard key={cast.id} cast={cast} />;
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/4 pl-4">
          <p className="mb-2">
            <strong>Status:</strong>
            <p>{movie.status}</p>
          </p>
          <p className="mb-2">
            <strong>Original Language:</strong>
            <p>
              {languageMap[movie.original_language] || movie.original_language}
            </p>
          </p>
          <p className="mb-2">
            <strong>Budget:</strong>
            <p>${movie.budget.toLocaleString()}</p>
          </p>
          <p className="mb-2">
            <strong>Revenue:</strong>
            <p>${movie.revenue.toLocaleString()}</p>
          </p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Keywords</h3>
            {movieKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {movieKeywords.map((keyword: any) => (
                  <span
                    key={keyword.id}
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword.name}
                  </span>
                ))}
              </div>
            ) : (
              <div> Loading....</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

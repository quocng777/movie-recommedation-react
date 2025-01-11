import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, MouseEventHandler, MouseEvent, useRef } from "react";
import {
  useAddMovieRatingMutation,
  useDeleteMovieRatingMutation,
  useGetMovieRatingQuery,
  useLazyMovieCastQuery,
  useLazyMovieDetailQuery,
  useLazyMovieKeywordsQuery,
  useTrailerVideoQuery,
} from "@/app/api/movies/movie-api-slice";
import { Movie, MovieCast, MovieKeywords, Video } from "@/app/api/types/movie.type";
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
import { TrailerVideoDialog } from "@/components/custom/trailer-video-dialog";
import { RatingIndicator } from "@/components/custom/rating-indicator";
import { RatingPicker, ratingScore } from "@/components/custom/rating-picker";
import { toast } from "@/hooks/use-toast";

const languageMap: { [key: string]: string } = {
  en: "English",
  vn: "Vietnamese",
};
const MovieDetail = () => {
const navigate= useNavigate();
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
  const {data: trailersData, isSuccess: isGetTrailersSuccess} = useTrailerVideoQuery(parseInt(id!));
  const [trailer, setTrailer] = useState<Video | undefined>();
  const [openTrailerDialog, setOpenTrailerDialog] = useState(false);
  const [openRatingPopover, setOpenRatingPopover] = useState(false);
  const {data: ratingData, isSuccess: isGetRatingSuccess} = useGetMovieRatingQuery(parseInt(id!));
  const [addMovieRating, {isSuccess: isAddRatingSuccess, isError: isAddRatingError}] = useAddMovieRatingMutation();
  const [selectedRating, setSelectedRating] = useState(0);
  const [deleteMovieRating] = useDeleteMovieRatingMutation();
  const isDbClickCalled = useRef(false);


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

  const onPlayTrailerClick = () => {
    setOpenTrailerDialog(true);
  };

  const onRatingClick = (score: number) => {
    if(score === selectedRating) {
      return;
    }
    addMovieRating({
      movieId: parseInt(id!),
      score,
    });
    setSelectedRating(score);
    setOpenRatingPopover(false);
  };

  const onRatingBtnClick: MouseEventHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setTimeout(() => {
      event.preventDefault();
      event.stopPropagation();
      if(!isAuthenticated || isDbClickCalled.current) {
        isDbClickCalled.current = false;
        return;
      }
      setOpenRatingPopover(true);
    }, 300)
  };

  const onRatingBtnDoubleClick: MouseEventHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    isDbClickCalled.current = true;
    if(!isAuthenticated || selectedRating === 0) {
      return;
    }
    deleteMovieRating(movie?.id!);
    setSelectedRating(0);
  }; 

  const onCastClick = (id: string) =>
  {
    navigate("/person/"+ id);
    return;
  }
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

  useEffect(() => {
    if(!isGetTrailersSuccess) {
      return;
    }
    setTrailer(trailersData.data?.results.find(video => video.type == 'Trailer') ?? trailersData.data?.results[0]);
  }, [isGetTrailersSuccess, trailersData]);

  useEffect(() => {
    if(!isGetRatingSuccess) {
      return;
    }
    setSelectedRating(ratingData.data?.score!);
  }, [isGetRatingSuccess, ratingData]);

  useEffect(() => {
    if(!isAddRatingError) {
      return;
    }
    setSelectedRating(0);
    toast({
      title: 'Error',
      description: `Error when added rating for ${movie?.title} 😰`
    });
  });

  useEffect(() => {
    if(!isAddRatingSuccess) {
      return;
    }
    toast({
      title: 'Success',
      description: `Added rating for ${movie?.title}`
    });
  }, [isAddRatingSuccess])

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
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex justify-center items-center">
                  <RatingIndicator rating={movie.vote_average} />
                </div>
              </div>
              {
                <RatingPicker
                  onOpenChange={setOpenRatingPopover}
                  open={openRatingPopover}
                  selectedRating={selectedRating}
                  onRatingClick={onRatingClick}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button 
                          className="bg-gray-rose-gradient text-white px-4 py-4 rounded-full text-sm hover:scale-105" 
                          onClick={onRatingBtnClick}
                          onDoubleClick={onRatingBtnDoubleClick}
                        >
                        {selectedRating !== 0
                          ? (
                            <div className="flex font-bold gap-2 items-center">
                              <span className="text-xl">
                              {
                                ratingScore[selectedRating as keyof typeof ratingScore]!.emoji!
                              }
                              </span> 
                              <p>
                                Your rating
                              </p>
                            </div>
                          )
                          : <p className="font-bold">Rating this movie 🌟</p>
                        }
                      </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {
                          isAuthenticated 
                            ? <p>Add rating for this movie</p>
                            : <p>Login to add rating for this movie</p>
                        }
                      </TooltipContent>
                    </Tooltip>
                </RatingPicker>
              }
            </div>
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
              {trailer && <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="bg-blue-500 rounded-full text-white hover:bg-blue-500 hover:bg-opacity-80" onClick={onPlayTrailerClick}>
                    <Play />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View trailer</p>
                </TooltipContent>
              </Tooltip> }
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
              return <MovieCastCard key={cast.id} cast={cast} onClick={()=>onCastClick(cast.id.toString())}/>;
              return <MovieCastCard key={cast.id} cast={cast} onClick={()=>onCastClick(cast.id.toString())}/>;
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
      { trailer && <TrailerVideoDialog video={trailer} open={openTrailerDialog} onOpenChange={setOpenTrailerDialog}/> }
    </div>
  );
};

export default MovieDetail;

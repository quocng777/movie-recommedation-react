import { useNavigate, useParams } from "react-router-dom";
import {
  useState,
  useEffect,
  MouseEventHandler,
  MouseEvent,
  useRef,
  useLayoutEffect,
} from "react";
import {
  useAddMovieRatingMutation,
  useAddMovieReviewMutation,
  useDeleteMovieRatingMutation,
  useDeleteMovieReviewMutation,
  useEditMovieReviewMutation,
  useGetMovieRatingQuery,
  useLazyGetMovieLatestReviewQuery,
  useLazyMovieCastQuery,
  useLazyMovieDetailQuery,
  useLazyMovieKeywordsQuery,
  useTrailerVideoQuery,
} from "@/app/api/movies/movie-api-slice";
import {
  Movie,
  MovieCast,
  MovieKeywords,
  Review,
  Video,
} from "@/app/api/types/movie.type";
import { FallbackScreen } from "@/components/custom/fallback-screen";
import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import { MovieCastCard } from "@/components/custom/moviecast-card";
import { MovieCardSkeleton } from "@/components/custom/movie-card-sekeleton";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Eye,
  EyeFill,
  Heart,
  HeartFill,
  Play,
} from "react-bootstrap-icons";
import { useMovieActions } from "@/hooks/use-movie-actions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/api/store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddMovieToPlaylistDialog } from "@/components/custom/add-movie-to-playlist-dialog";
import { TrailerVideoDialog } from "@/components/custom/trailer-video-dialog";
import { RatingIndicator } from "@/components/custom/rating-indicator";
import { RatingPicker, ratingScore } from "@/components/custom/rating-picker";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import DialogEditor from "@/components/custom/editor-dialog";
import { ReviewCard } from "@/components/custom/review-card";
import DeleteModal from "@/components/custom/delete-modal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLazyRetrieveQuery } from "@/app/api/ai/ai-api-slice";
import { MovieCard } from "@/components/custom/movie-card";
const languageMap: { [key: string]: string } = {
  en: "English",
  vn: "Vietnamese",
};

const MovieDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const [movieCast, setMovieCast] = useState<MovieCast[]>([]);
  const [movieKeywords, setMovieKeywords] = useState<MovieKeywords[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMovieCastLoading, setIsMovieCastLoading] = useState(true);
  const [isSimilarMoviesLoading, setIsSimilarMoviesLoading] = useState(true);

  const { isLiked, likeMovie, isInWatchLaterList, watchLater } =
    useMovieActions(Number(id));
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
  const { data: trailersData, isSuccess: isGetTrailersSuccess } =
    useTrailerVideoQuery(parseInt(id!));
  const [trailer, setTrailer] = useState<Video | undefined>();
  const [openTrailerDialog, setOpenTrailerDialog] = useState(false);
  const [openRatingPopover, setOpenRatingPopover] = useState(false);
  const { data: ratingData, isSuccess: isGetRatingSuccess } =
    useGetMovieRatingQuery(parseInt(id!));
  const [
    addMovieRating,
    { isSuccess: isAddRatingSuccess, isError: isAddRatingError },
  ] = useAddMovieRatingMutation();
  const [selectedRating, setSelectedRating] = useState(0);
  const [deleteMovieRating] = useDeleteMovieRatingMutation();
  const isDbClickCalled = useRef(false);
  const [openAddReviewDialog, setOpenAddReviewDialog] = useState(false);
  const [openEditReviewDialog, setOpenEditReviewDialog] = useState(false);
  const [openDeleteReviewDialog, setOpenDeleteReviewDialog] = useState(false);
  const [latestReview, setLatestReview] = useState<Review[]>([]);
  const [totalReview, setTotalReview] = useState<number>(0);
  const [targetReview, setTargetReview] = useState<Review>();
  const [
    getLatestReviews,
    { data: reviewData, isSuccess: isGetReviewSuccess },
  ] = useLazyGetMovieLatestReviewQuery();
  const [
    addReview,
    { isSuccess: isAddReviewgSuccess, isError: isAddReviewError },
  ] = useAddMovieReviewMutation();
  const [
    editReview,
    { isSuccess: isEditReviewSuccess, isError: isEditReviewError },
  ] = useEditMovieReviewMutation();
  const [
    deleteReview,
    { isSuccess: isDeleteReviewSuccess, isError: isDeleteReviewError },
  ] = useDeleteMovieReviewMutation();
  const castSectionRef = useRef<HTMLDivElement>(null);
  const hash = window.location.hash.substring(1);
  const [isRecommendGenresMoviesLoading, setIsRecommendGenresMoviesLoading] =
    useState(true);
  const [recommendGenresMovies, setRecommendGenresMovies] = useState<
    Movie[]
  >([]);

  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  const onLikeMovieClick: MouseEventHandler = () => {
    if (!isAuthenticated) {
      return;
    }
    likeMovie();
  };

  const onAddWatchListClick: MouseEventHandler = () => {
    if (!isAuthenticated) {
      return;
    }
    watchLater();
  };

  const onPlayTrailerClick = () => {
    setOpenTrailerDialog(true);
  };

  const onRatingClick = (score: number) => {
    if (score === selectedRating) {
      return;
    }
    addMovieRating({
      movieId: parseInt(id!),
      score,
    });
    setSelectedRating(score);
    setOpenRatingPopover(false);
  };

  const onRatingBtnClick: MouseEventHandler = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setTimeout(() => {
      event.preventDefault();
      event.stopPropagation();
      if (!isAuthenticated || isDbClickCalled.current) {
        isDbClickCalled.current = false;
        return;
      }
      setOpenRatingPopover(true);
    }, 300);
  };

  const onRatingBtnDoubleClick: MouseEventHandler = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isDbClickCalled.current = true;
    if (!isAuthenticated || selectedRating === 0) {
      return;
    }
    deleteMovieRating(movie?.id!);
    setSelectedRating(0);
  };

  const onMovieCardClick = (id: string) => {
    navigate("/movie/" + id);
    return;
  };

  const handleAddReview = (comment: string) => {
    addReview({
      movieId: parseInt(id!),
      content: comment,
    });

    getLatestReviews({ movieId: movie ? movie.id : 0, limit: 1 });
  };

  const handleEditReview = (reviewId: number, comment: string) => {
    editReview({
      reviewId,
      movieId: parseInt(id!),
      content: comment,
    });
  };

  const handleDeleteReview = (reviewId: number) => {
    deleteReview({ reviewId, movieId: parseInt(id!) });
  };

  const onCastClick = (id: string) => {
    navigate("/person/" + id);
    return;
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setIsMovieCastLoading(true);
      setIsRecommendGenresMoviesLoading(true);
      setIsSimilarMoviesLoading(true);
      setError(null);
      getMovieDetail({ id });
      getMovieCast({ id });
      getMovieKeywords({ id });
      getLatestReviews({ movieId: parseInt(id), limit: 1 });
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
        setError(
          "No movie found with the given ID. Please check the ID and try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
      setIsLoading(false);
    }
  }, [isGetMovieDataSuccess, movieData, apiError]);

  const [getMoviesFromAIRetriever] = useLazyRetrieveQuery();
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!movie || !movie.genres.length) return;

      setIsRecommendGenresMoviesLoading(true);
      setError(null);

      const { data, error: apiError } = await getMoviesFromAIRetriever({
          collection_name: "movies",
          query:
            "Find recommendation movies based on Genres: " +
            movie.genres.join(","),
          amount: 10,
          threshold: 0.25,
      });

      if (apiError || !data?.data) {
        setError("Error fetching recommendations");
        return;
      }

      const movies = data.data.result.filter(
        (item: any) => item.id !== movie.id
      );

      setRecommendGenresMovies(movies);
      setIsRecommendGenresMoviesLoading(false);
    };

    fetchRecommendations();
  }, [movie]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movie || !movie.genres) return;

      setIsRecommendGenresMoviesLoading(true);
      setError(null);

      const { data, error: apiError } = await getMoviesFromAIRetriever({
        collection_name: "movies",
        query:
          `Genre:${movie.genres.join(",")}` +
          " \n " +
          `Title:${movie.title}` +
          " \n " +
          `Overview:${movie.overview}`,
        amount: 10,
        threshold: 0.5,
      });

      if (apiError || !data?.data) {
        setError("Error fetching recommendations");
        return;
      }

      const movies = data.data.result.filter(
        (item: any) => item.id !== movie.id
      );
      
      setSimilarMovies(movies);
      setIsSimilarMoviesLoading(false);
    };

    fetchSimilarMovies();
  }, [movie]);

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
    if (!isGetTrailersSuccess) {
      return;
    }
    setTrailer(
      trailersData.data?.results.find((video) => video.type == "Trailer") ??
        trailersData.data?.results[0]
    );
  }, [isGetTrailersSuccess, trailersData]);

  useEffect(() => {
    if (!isGetRatingSuccess) {
      return;
    }
    setSelectedRating(ratingData.data?.score!);
  }, [isGetRatingSuccess, ratingData]);

  useEffect(() => {
    if (!isAddRatingError) {
      return;
    }
    setSelectedRating(0);
    toast({
      title: "Error",
      description: `Error when added rating for ${movie?.title} 😰`,
    });
  });

  useEffect(() => {
    if (!isAddRatingSuccess) {
      return;
    }
    toast({
      title: "Success",
      description: `Added rating for ${movie?.title}`,
    });
  }, [isAddRatingSuccess]);

  useEffect(() => {
    if (!isGetReviewSuccess) {
      return;
    }

    console.log("reviewData", reviewData);
    setLatestReview(reviewData.data?.reviews ? reviewData.data.reviews : []);
    setTotalReview(reviewData.data ? reviewData.data.total : 0);
  }, [isGetReviewSuccess, reviewData]);

  useEffect(() => {
    if (!isAddReviewError) {
      return;
    }
    toast({
      title: "Error",
      description: `Error when added review for ${movie?.title} 😰`,
    });
  });

  useEffect(() => {
    if (!isAddReviewgSuccess) {
      return;
    }
    getLatestReviews({ movieId: movie ? movie.id : 0, limit: 1 });
    setOpenAddReviewDialog(false);
    toast({
      title: "Success",
      description: `Added review for ${movie?.title}`,
    });
  }, [isAddReviewgSuccess]);

  useEffect(() => {
    if (!isEditReviewError) {
      return;
    }
    toast({
      title: "Error",
      description: `Error when edited review for ${movie?.title} 😰`,
    });
  });

  useEffect(() => {
    if (!isEditReviewSuccess) {
      return;
    }
    setOpenEditReviewDialog(false);
    getLatestReviews({ movieId: movie ? movie.id : 0, limit: 1 });
    toast({
      title: "Success",
      description: `Edited review for ${movie?.title}`,
    });
  }, [isEditReviewSuccess]);

  useEffect(() => {
    if (!isDeleteReviewError) {
      return;
    }
    toast({
      title: "Error",
      description: `Error when deleted review for ${movie?.title} 😰`,
    });
  });

  useEffect(() => {
    if (!isDeleteReviewSuccess) {
      return;
    }
    setOpenDeleteReviewDialog(false);
    getLatestReviews({ movieId: movie ? movie.id : 0, limit: 1 });
    toast({
      title: "Success",
      description: `Deleted review for ${movie?.title}`,
    });
  }, [isDeleteReviewSuccess]);
  
  useLayoutEffect(() => {
    if (hash == "cast" && castSectionRef.current) {
      castSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isLoading, movie]);

  if (isLoading) return <FallbackScreen />;
  if (error) return <div className="flex p-4 justify-center">{error}</div>;
  if (!movie)
    return <div className="flex p-4 justify-center">Movie not found</div>;

  return (
    <div className="min-h-screen flex flex-col text-white">
      <Helmet>
        <title>Move details - ${movie.title}</title>
      </Helmet>
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
                  onRatingClick={onRatingClick}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        className="bg-gray-rose-gradient text-white px-4 py-4 rounded-full text-sm hover:scale-105"
                        onClick={onRatingBtnClick}
                        onDoubleClick={onRatingBtnDoubleClick}
                      >
                        {selectedRating !== 0 ? (
                          <div className="flex font-bold gap-2 items-center">
                            <span className="text-xl">
                              {
                                ratingScore[
                                  selectedRating as keyof typeof ratingScore
                                ]!.emoji!
                              }
                            </span>
                            <p>Your rating</p>
                          </div>
                        ) : (
                          <p className="font-bold">Rating this movie 🌟</p>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isAuthenticated ? (
                        <p>Add rating for this movie</p>
                      ) : (
                        <p>Login to add rating for this movie</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </RatingPicker>
              }
            </div>
            <div className="flex gap-4 mt-6 text-white">
              <Tooltip>
                <TooltipTrigger asChild>
                  <AddMovieToPlaylistDialog movieId={movie.id}>
                    <Button
                      size="icon"
                      className="bg-gray-800 rounded-full text-white hover:bg-background hover:text-sky-500"
                    >
                      <Bookmark />
                    </Button>
                  </AddMovieToPlaylistDialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {!isAuthenticated
                      ? "Login to add to your playlist"
                      : "Add to playlist"}
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-gray-800 rounded-full text-white hover:bg-background hover:text-pink-500"
                    onClick={onLikeMovieClick}
                  >
                    {isLiked ? (
                      <HeartFill className="text-pink-500" />
                    ) : (
                      <Heart />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {!isAuthenticated
                      ? "Login to like this movie"
                      : isLiked
                      ? "Remove out of like list"
                      : "Like this movie"}
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-gray-800 rounded-full text-white hover:bg-background hover:text-green-500"
                    onClick={onAddWatchListClick}
                  >
                    {!isInWatchLaterList ? (
                      <Eye />
                    ) : (
                      <EyeFill className="text-green-500" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {!isAuthenticated
                      ? "Login to add to your watch list"
                      : isInWatchLaterList
                      ? "Remove from watch list"
                      : "Add to watch list"}
                  </p>
                </TooltipContent>
              </Tooltip>
              {trailer && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className="bg-blue-500 rounded-full text-white hover:bg-blue-500 hover:bg-opacity-80"
                      onClick={onPlayTrailerClick}
                    >
                      <Play />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View trailer</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <p className="italic text-lg mt-6">{movie.tagline}</p>
            <p className="mt-4">{movie.overview}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 w-full p-2 mx-auto mt-6 gap-6">
        <div
          className="w-3/4 px-4 flex flex-col space-y-8"
          ref={castSectionRef}
        >
          <div className="px-2">
            <div className="flex items-center space-x-2 font-semibold">
              <span className="w-1 h-8 bg-rose-600"></span>
              <span className="text-xl text-white">Casts</span>
            </div>
            <ScrollArea className="w-full overflow-x-auto">
              <div className="flex gap-4 py-6">
                {isMovieCastLoading &&
                  new Array(10).fill(null).map((_, idx) => {
                    return <MovieCardSkeleton key={idx} />;
                  })}
                {movieCast.length === 0 && !isMovieCastLoading && (
                  <p className="text-gray-500">No cast available</p>
                )}
                {movieCast.map((cast) => {
                  return (
                    <MovieCastCard
                      key={cast.id}
                      cast={cast}
                      onClick={() => onCastClick(cast.id.toString())}
                    />
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Review */}
          <div className="p-2">
            <div className="flex justify-between items-center">
              <div
                className="flex items-center space-x-2 font-semibold"
                onClick={() => {
                  navigate(`/movie/${movie.id}/reviews`);
                }}
              >
                <span className="w-1 h-8 bg-rose-600"></span>
                <span className="text-xl text-white hover:text-rose-600 cursor-pointer hover:transition-colors">
                  User reviews {`(${totalReview ? totalReview : 0})`}
                </span>
              </div>

              <DialogEditor
                triggerElement={
                  <Button className="text-gray-200 rounded-full bg-rose-900 hover:bg-rose-800 hover:text-white py-2 px-4">
                    Add New Review
                  </Button>
                }
                open={openAddReviewDialog}
                onOpenChange={setOpenAddReviewDialog}
                onSave={handleAddReview}
              />
            </div>
            <div className="flex my-4">
              {latestReview.length > 0 ? (
                <ReviewCard
                  review={latestReview[0]}
                  onEdit={() => {
                    setTargetReview(latestReview[0]);
                    setOpenEditReviewDialog(true);
                  }}
                  onDelete={() => {
                    setTargetReview(latestReview[0]);
                    setOpenDeleteReviewDialog(true);
                  }}
                />
              ) : (
                <div className="text-gray-500">No review available</div>
              )}
            </div>
            <Button
              className="w-full border text-gray-300 rounded-full bg-transparent hover:bg-rose-900 hover:text-gray-200 transition-all duration-200"
              onClick={() => {
                navigate(`/movie/${movie.id}/reviews`);
              }}
            >
              View all
            </Button>
          </div>

          <div className="ml-2">
            <div className="flex items-center space-x-2 font-semibold mb-2">
              <span className="w-1 h-8 bg-rose-600"></span>
              <span className="text-xl text-white">Recommendations</span>
            </div>
            <div className="px-2 max-w-[1000px] mx-auto">
              <div className="flex items-center space-x-6">
                <h4 className="text-lg whitespace-nowrap">
                  <b>Recommend by genres of this movie</b>
                  <div className="flex gap-4 flex-wrap mt-4">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-700 px-4 py-1 rounded-full text-sm"
                        //   onClick={() => handleGenreClick(genre.name)}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </h4>
              </div>
              <ScrollArea className="w-full">
                <div className="flex gap-4 py-6">
                  {isRecommendGenresMoviesLoading &&
                    new Array(10).fill(null).map((_, idx) => {
                      return <MovieCardSkeleton key={idx} />;
                    })}
                  {recommendGenresMovies.map((movie) => {
                    return (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={() =>
                          onMovieCardClick(movie.id.toString())
                        }
                      />
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="px-2 max-w-[1000px] mx-auto">
              <div className="flex items-center space-x-6">
                <h4 className="text-lg">
                  <b>Similar movies to you</b>
                </h4>
              </div>
              <ScrollArea className="w-full">
                <div className="flex gap-4 py-6">
                  {isSimilarMoviesLoading &&
                    new Array(10).fill(null).map((_, idx) => {
                      return <MovieCardSkeleton key={idx} />;
                    })}
                  {similarMovies.map((movie) => {
                    return (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={() =>
                          onMovieCardClick(movie.id.toString())
                        }
                      />
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
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
      {trailer && (
        <TrailerVideoDialog
          video={trailer}
          open={openTrailerDialog}
          onOpenChange={setOpenTrailerDialog}
        />
      )}
      <DialogEditor
        open={openEditReviewDialog}
        onOpenChange={setOpenEditReviewDialog}
        triggerElement={<></>}
        onSave={(content) => {
          if (targetReview) {
            handleEditReview(targetReview.id, content);
          }
        }}
        initialText={targetReview?.comment!}
      />
      <DeleteModal
        isOpen={openDeleteReviewDialog}
        onClose={() => setOpenDeleteReviewDialog(!openDeleteReviewDialog)}
        onDelete={() => {
          if (targetReview) {
            handleDeleteReview(targetReview.id);
          }
        }}
        content={`Are you sure you want to delete this review?`}
      />
    </div>
  );
};

export default MovieDetail;

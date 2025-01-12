import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import { useState } from "react";
import DefaultImage from "./default-image";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";
import { Movie } from "@/app/api/types/movie.type";
import { useMovieActions } from "@/hooks/use-movie-actions";
import { EyeFill, HeartFill } from "react-bootstrap-icons";
import { Eye, Heart } from "lucide-react";
import { RatingIndicator } from "./rating-indicator";

type MovieCardListProps = {
  movie: Movie;
  onClick?: () => void;
};

export const MovieCardList = ({ movie, onClick }: MovieCardListProps) => {
  const [loaded, setLoaded] = useState(false);

  const onImageLoad = () => {
    setLoaded(true);
  };

  const {isLiked, isInWatchLaterList, likeMovie, watchLater} = useMovieActions(movie.id);

  const onLikeActionClick = () => {
    likeMovie();
  }

  const onWatchListActionClick = () => {
    watchLater();
  }

  return (
    <div className="min-h-40 w-full flex bg-gray-rose-gradient rounded-md overflow-hidden shadow-lg">
      {movie.poster_path ? (
        <div className="w-28 relative flex h-full flex-shrink-0 hover:cursor-pointer hover:transform hover:scale-105 transition duration-200">
          <img
            onLoad={onImageLoad}
            src={getResourceFromTmdb(movie.poster_path)}
            alt={movie.title}
            className={`w-28 object-cover h-full flex-shrink-0 ${
              !loaded ? "opacity-0" : ""
            }`}
            onClick={onClick}
          />
          {!loaded && (
            <Skeleton className="top-0 absolute bottom-0 right-0 left-0 opacity-100" />
          )}
        </div>
      ) : (
        <DefaultImage alt={movie.title} className="w-28 flex-shrink-0" />
      )}

      <div className="flex flex-col justify-center">
        <div className="flex flex-col py-2 px-3 space-y-4">
          <div className="flex flex-row items-center space-x-2">
            <div className="relative w-10 h-10 rounded-full shadow-xl scale-[80%] mr-3">
              <RatingIndicator rating={movie.vote_average} />
            </div>
            <div>
              <Link
                to={`/movie/${movie.id}`}
                className="inline-flex space-x-2 hover:shadow-lg transition duration-200"
              >
                <span className="text-lg font-semibold text-white hover:text-rose-600">
                  {movie.title}
                </span>
                {movie.original_title &&
                  movie.original_title !== movie.title && (
                    <span className="text-lg text-gray-400 italic">
                      ({movie.original_title})
                    </span>
                  )}
              </Link>
              {movie.release_date && (
                <p className="text-sm text-gray-500">
                  Release: {dayjs(movie.release_date).format("MMM DD, YYYY")}
                </p>
              )}
            </div>
          </div>
          {movie.overview && (
            <p className="text-sm text-gray-400 line-clamp-2">
              {movie.overview}
            </p>
          )}
        </div>
        <div className="flex flex-row space-x-4 m-3">
          <div className={`flex space-x-1 items-center`}>
            {isInWatchLaterList ? (
              <>
                <EyeFill
                  className="text-green-600 hover:cursor-pointer hover:transform hover:scale-125 duration-200"
                  size={22}
                  onClick={onWatchListActionClick}
                />
                <span className="text-xs text-gray-500">
                  Remove from watch list
                </span>
              </>
            ) : (
              <>
                <Eye
                  className="text-gray-300 hover:text-green-600 hover:cursor-pointer hover:transform hover:scale-125 duration-200"
                  size={22}
                  onClick={onWatchListActionClick}
                />
                <span className="text-xs text-gray-500">Add to watch list</span>
              </>
            )}
          </div>
          <div className={`flex space-x-1 items-center`}>
            {isLiked ? (
              <>
                <HeartFill
                  className="text-pink-600 hover:cursor-pointer hover:transform hover:scale-125 duration-200"
                  size={22}
                  onClick={onLikeActionClick}
                />
                <p className="text-xs text-gray-500">Unlike</p>
              </>
            ) : (
              <>
                <Heart
                  className=" text-gray-300 hover:text-pink-600 hover:cursor-pointer hover:transform hover:scale-125 duration-200"
                  size={22}
                  onClick={onLikeActionClick}
                />
                <p className="text-xs text-gray-500">Like</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
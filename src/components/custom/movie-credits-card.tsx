import { MouseEvent, MouseEventHandler, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import { Button } from "../ui/button";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import MovieActionPopover from "./movie-action-popover";
import dayjs from "dayjs";
import DefaultImage from "./default-image";
import { Credit } from "@/app/api/types/person.type";

export type MovieCardProps = {
    movie: Credit;
    onClick?: () => void;
}

export const MovieCreditsCard = (props: MovieCardProps) => {
   
    const { movie, onClick } = props;

    const [loaded, setLoaded] = useState(false);

    const onImageLoad = () => {
        setLoaded(true);
    };

    const onMoreClick: MouseEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };
    
    return (
      <div
        className="rounded-lg overflow-hidden cursor-pointer shrink-0 w-40"
        onClick={onClick}
      >
        <div className="w-40 relative h-[15rem] group">
          {movie.poster_path ? (
            <>
              <img
                src={getResourceFromTmdb(movie.poster_path)}
                onLoad={onImageLoad}
                className={`${!loaded ? "opacity-0" : "group-hover:blur-sm"}`}
              />
              {!loaded && (
                <Skeleton className="top-0 absolute bottom-0 right-0 left-0 opacity-100" />
              )}
            </>
          ) : (
            <DefaultImage alt={movie.title} className="w-40 h-[15rem] flex-shrink-0" />
          )}
          <div className="absolute -bottom-4 left-6 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-start">
            <div className="relative w-14 h-14 rounded-full shadow-xl">
              <svg className="w-full h-full rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="#111827"
                  stroke="#9ca3af"
                  strokeWidth="3"
                  className="opacity-70"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke={
                    movie.vote_average * 10 >= 70
                      ? "#65a30d"
                      : movie.vote_average * 10 >= 50
                      ? "#d97706"
                      : "#e11d48"
                  }
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                  strokeDashoffset={`${100 - movie.vote_average * 10}`}
                  strokeLinecap="round"
                  transform="rotate(-180 18 18)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {`${(movie.vote_average * 10).toFixed(0)}%`}
              </div>
            </div>
          </div>
          <MovieActionPopover movieId={movie.id}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full shrink-0 absolute top-2 right-2"
              onClick={onMoreClick}
            >
              <ThreeDotsVertical />
            </Button>
          </MovieActionPopover>
        </div>
        <div className="mt-4 flex flex-col">
          <span className="font-semibold text-ellipsis line-clamp-1">
            {movie.original_title}
          </span>
          <span className="text-sm">
            {dayjs(movie.release_date).format("MMM DD YYYY")}
          </span>
        </div>
      </div>
    );
}
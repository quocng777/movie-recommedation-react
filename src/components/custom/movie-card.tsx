import { MouseEvent, MouseEventHandler, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Movie } from "@/app/api/types/movie.type";
import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import { Button } from "../ui/button";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import MovieActionPopover from "./movie-action-popover";

export type MovieCardProps = {
    movie: Movie;
    onClick?: () => void;
}

export const MovieCard = (props: MovieCardProps) => {
   
    const { movie, onClick } = props;

    const [loaded, setLoaded] = useState(false);

    const onImageLoad = () => {
        setLoaded(true);
    };

    const onMoreClick: MouseEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };
    
    return (
        <div className="rounded-lg overflow-hidden cursor-pointer shrink-0 w-40" onClick={onClick}>
            <div className="w-40 relative h-[15rem] group">
                <img src={getResourceFromTmdb(movie.poster_path)} onLoad={onImageLoad} className={`${!loaded ? 'opacity-0' : 'group-hover:blur-sm'}`}/>
                {!loaded && <Skeleton className="top-0 absolute bottom-0 right-0 left-0 opacity-100" />}
                <MovieActionPopover>
                    <Button variant="ghost" size="icon" className="rounded-full shrink-0 absolute top-2 right-2" onClick={onMoreClick}>
                        <ThreeDotsVertical />
                    </Button>
                </MovieActionPopover>
            </div>
            <div className="mt-2 flex flex-col">
                <span className="font-semibold text-ellipsis line-clamp-1">{movie.original_title}</span>
                <span className="text-sm">{movie.release_date}</span>
            </div>
        </div>
    )
}
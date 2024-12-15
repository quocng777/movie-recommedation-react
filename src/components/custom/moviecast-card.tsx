import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { MovieCast } from "@/app/api/types/movie.type";
import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import DefaultImage from "./default-image";

export type MovieCastCardProps = {
    cast: MovieCast;
    onClick?: () => void;
}

export const MovieCastCard = (props: MovieCastCardProps) => {
   
    const { cast, onClick } = props;

    const [loaded, setLoaded] = useState(false);

    const onImageLoad = () => {
        setLoaded(true);
    };
    
    return (
        <div className="rounded-lg overflow-hidden cursor-pointer shrink-0" onClick={onClick}>
            <div className="w-40 relative h-[15rem]">
                {cast.profile_path ? (
                    <>
                        <img
                            src={getResourceFromTmdb(cast.profile_path)}
                            alt={cast.name}
                            onLoad={onImageLoad}
                            className={`${!loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}
                        />
                        {!loaded && (
                            <Skeleton className="top-0 absolute bottom-0 right-0 left-0 opacity-100" />
                        )}
                    </>
                ) : (
                    <DefaultImage alt={cast.name} className="h-full flex-shrink-0" />
                )}
            </div>
            <div className="mt-2 flex flex-col w-40">
                <span className="font-semibold text-ellipsis line-clamp-1">{cast.name}</span>
                <span className="text-sm text-ellipsis line-clamp-1">{cast.character}</span>
            </div>
        </div>
    )
}
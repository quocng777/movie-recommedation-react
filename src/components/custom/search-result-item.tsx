import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import React, { useState } from "react";
import DefaultImage from "./default-image";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

type SearchResultItemProps = {
  id: string,
  title: string;
  posterPath: string;
  releaseDate?: string;
  overview?: string;
  originalTitle?: string;
};

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  id,
  title,
  posterPath,
  releaseDate,
  overview,
  originalTitle,
}) => {
  const [loaded, setLoaded] = useState(false);
  const onImageLoad = () => {
    setLoaded(true);
  };

  return (
    <li className="h-32 flex bg-gradient-to-r from-gray-800 to-gray-900 rounded-md overflow-hidden shadow-lg">
      {posterPath ? (
        <div className="w-24 relative flex h-full flex-shrink-0">
          <img
            onLoad={onImageLoad}
            src={getResourceFromTmdb(posterPath)}
            alt={title}
            className={`w-24 object-cover h-full flex-shrink-0 ${!loaded ? 'opacity-0' : ''}`}
          />
          {!loaded && <Skeleton className="top-0 absolute bottom-0 right-0 left-0 opacity-100" />}
        </div>
      ) : (
        <DefaultImage alt={title} className="w-24 h-full flex-shrink-0" />
      )}

      <div className="flex flex-col justify-center">
        <div className="flex flex-col py-2 px-4 space-y-4">
          <div>
            <Link
              to={`/movie/${id}`}
              className="inline-flex space-x-2 hover:shadow-lg transition duration-200"
            >
              <span className="text-lg font-semibold text-white">{title}</span>
              {originalTitle && originalTitle !== title && (
                <span className="text-lg text-gray-400 italic">
                  ({originalTitle})
                </span>
              )}
            </Link>
            {releaseDate && (
              <p className="text-sm text-gray-500">
                Release: {releaseDate.slice(0, 4)}
              </p>
            )}
          </div>
          {overview && (
            <p className="text-sm text-gray-400 line-clamp-2">{overview}</p>
          )}
        </div>
      </div>
    </li>
  );
};
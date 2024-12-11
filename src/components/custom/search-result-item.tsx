import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import React from "react";
import DefaultImage from "./default-image";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  return (
    <li className="h-32 flex bg-gradient-to-r from-gray-800 to-gray-900 rounded-md overflow-hidden shadow-lg">
      {posterPath ? (
        <img
          src={getResourceFromTmdb(posterPath)}
          alt={title}
          className="w-24 object-cover h-full flex-shrink-0"
        />
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
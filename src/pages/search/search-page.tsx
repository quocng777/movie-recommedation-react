import { useSearchParams } from "react-router-dom";
import { useLazySearchMoviesQuery } from "@/app/api/movies/movie-api-slice";
import { Movie } from "@/app/api/types/movie.type";
import { useEffect, useState } from "react";
import { SearchResultItem } from "@/components/custom/search-result-item";
import Pagination from "@/components/custom/pagination";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;

  const [currentPage, setCurrentPage] = useState(page);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchMovies, {isSuccess: isGetSearchResultSuccess, data: searchResultData}] = useLazySearchMoviesQuery();

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
    searchMovies({ query: query, page: currentPage });
  }, [query, currentPage, searchMovies]);

  useEffect(() => {
    if (isGetSearchResultSuccess) {
      setMovies(searchResultData.data?.results!);
      setIsLoading(false);
    }
  }, [isGetSearchResultSuccess, searchResultData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="px-8 py-6">
        <h3 className="text-xl font-bold mb-4">Search Results for "{query}"</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          <ul className="space-y-4">
            {movies.map((movie) => (
              <SearchResultItem
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
                overview={movie.overview}
                originalTitle={movie.original_title}
              />
            ))}
          </ul>
        ) : (
          <p>There are no results that matched "{query}".</p>
        )}
      </div>
      {isGetSearchResultSuccess &&
        searchResultData?.data && (
          <Pagination
            currentPage={currentPage}
            totalPages={searchResultData.data?.totalPages!}
            onPageChange={handlePageChange}
          />
        )}
    </div>
  );
};

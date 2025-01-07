import { useSearchParams } from "react-router-dom";
import { useLazySearchMoviesQuery } from "@/app/api/movies/movie-api-slice";
import { Movie } from "@/app/api/types/movie.type";
import { useEffect, useState } from "react";
import { SearchResultItem } from "@/components/custom/search-result-item";
import Pagination from "@/components/custom/pagination";
import { useTopBarLoader } from "@/hooks/use-top-loader";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
  const {staticStart: startTopBarLoader, complete: completeTopBarLoader } = useTopBarLoader();

  const [currentPage, setCurrentPage] = useState(page);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchMovies, {isSuccess: isGetSearchResultSuccess, data: searchResultData}] = useLazySearchMoviesQuery();

  useEffect(() => {
    if (!isLoading) {
      startTopBarLoader();
      setIsLoading(true);
    }
    searchMovies({ query: query, page: currentPage });
  }, [query, currentPage, searchMovies]);

  useEffect(() => {
    if (isGetSearchResultSuccess) {
      setMovies(searchResultData.data?.results!);
      setIsLoading(false);
      completeTopBarLoader();
    }
  }, [isGetSearchResultSuccess, searchResultData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-[1200px] container mx-auto p-4">
      <div className="px-8 py-6">
        <h3 className="text-xl font-bold mb-4">
          Search Results for "{query}"{" "}
          {isGetSearchResultSuccess && (
            <span className="ml-2 inline-flex items-center px-3 py-1 text-lg font-medium text-white bg-slate-600 rounded-full shadow-md">
              {searchResultData.data?.total_results}
            </span>
          )}
        </h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          <ul className="space-y-4">
            {movies.map((movie) => (
              <SearchResultItem
                key={movie.id}
                id={movie.id.toString()}
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
      {isGetSearchResultSuccess && searchResultData?.data && (
        <Pagination
          currentPage={currentPage}
          totalPages={searchResultData.data?.total_pages!}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchPage;
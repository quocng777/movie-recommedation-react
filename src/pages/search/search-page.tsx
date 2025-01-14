import { useNavigate, useSearchParams } from "react-router-dom";
import { useLazySearchMoviesQuery } from "@/app/api/movies/movie-api-slice";
import { Movie } from "@/app/api/types/movie.type";
import { useEffect, useState } from "react";
import { MovieCardList } from "@/components/custom/movie-card-list";
import Pagination from "@/components/custom/pagination";
import { useTopBarLoader } from "@/hooks/use-top-loader";
import { Helmet } from "react-helmet";
import { Spinner } from "@/components/custom/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Grid, ListVideo } from "lucide-react";
import { CardViewLayout } from "@/components/custom/playlist-movie-card";
import { MovieCard } from "@/components/custom/movie-card";
import { MovieCardSkeleton } from "@/components/custom/movie-card-sekeleton";
import { MovieCardListSkeleton } from "@/components/custom/movie-card-list-skeleton";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
  const {staticStart: startTopBarLoader, complete: completeTopBarLoader } = useTopBarLoader();

  const [currentPage, setCurrentPage] = useState(page);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardViewLayout, setCardViewLayout] = useState(CardViewLayout.GRID);

  const [searchMovies, {isFetching: isSearching, isSuccess: isGetSearchResultSuccess, data: searchResultData}] = useLazySearchMoviesQuery();

  const handleCardViewLayoutClick = () => {
      setCardViewLayout(
        cardViewLayout === CardViewLayout.GRID
          ? CardViewLayout.LIST
          : CardViewLayout.GRID
      );
    }

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
      <Helmet>
        <title>Search - {query}</title>
      </Helmet>
      <div className="px-8 py-6">
        <div className="flex flex-row justify-between items-center mb-4">
          <h3 className="text-xl font-bold mb-4">
            Search Results for "{query}"{" "}
            {isGetSearchResultSuccess && (
              <span className="ml-2 inline-flex items-center px-3 py-1 text-lg font-medium text-white bg-slate-600 rounded-full shadow-md">
                {searchResultData.data?.total_results}
              </span>
            )}
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-rose-600 p-3"
                  onClick={handleCardViewLayoutClick}
                >
                  {cardViewLayout == CardViewLayout.GRID ? (
                    <Grid size={20} />
                  ) : (
                    <ListVideo size={20} className="text-3xl shrink-0" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="p-2 duration-200">
                {cardViewLayout == CardViewLayout.GRID
                  ? "Change to List View"
                  : "Change to Grid View"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner isOpening={isLoading} />
          </div>
        ) : movies.length > 0 ?
            cardViewLayout === CardViewLayout.GRID ? (
            <div className="flex flex-wrap gap-4">
              {!isSearching
                ? movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                      }}
                    />
                  ))
                : new Array(10).fill(null).map((_, idx) => {
                    return <MovieCardSkeleton key={idx} />;
                  })
              }
            </div>
            ) : (
            <div className="flex flex-wrap gap-4">
              {!isSearching
                ? movies.map((movie) => (
                    <MovieCardList
                      key={movie.id}
                      movie={movie}
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                      }}
                    />
                  ))
                : new Array(10).fill(null).map((_, idx) => {
                    return <MovieCardListSkeleton key={idx} />;
              })}
            </div>
            )
          : <p className="text-gray-400">
              There are no results that matched "{query}".
            </p>
        }
      </div>
      {isGetSearchResultSuccess && searchResultData?.data && searchResultData.data.results.length > 0 && (
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
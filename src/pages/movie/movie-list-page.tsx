import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CalendarIcon, FilterX, Grid, ListVideo, TrashIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { Slider } from "@/components/ui/slider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMovieGenresQuery, useLazyDiscoverMoviesQuery } from "@/app/api/movies/movie-api-slice";
import { Genre, Movie } from "@/app/api/types/movie.type";
import { SortOptions } from "@/app/api/constants/sort-options";
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { MovieCard } from "@/components/custom/movie-card";
import { MovieCardList } from "@/components/custom/movie-card-list";
import { CardViewLayout } from "@/components/custom/playlist-movie-card";
import { MovieCardSkeleton } from "@/components/custom/movie-card-sekeleton";
import { MovieCardListSkeleton } from "@/components/custom/movie-card-list-skeleton";
import { useTopBarLoader } from "@/hooks/use-top-loader";
import CustomPagination from "@/components/custom/pagination";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/custom/spinner";
import { Helmet } from "react-helmet";

const MovieListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
  const selectedGenresParam = searchParams.get("genres");
  const selectedGenresArray = selectedGenresParam ? selectedGenresParam.split(",").map((g) => parseInt(g)) : [];

  const {staticStart: startTopBarLoader, complete: completeTopBarLoader } = useTopBarLoader();
  const [isInfiniteScroll, setInfiniteScroll] = useState(false);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const [cardViewLayout, setCardViewLayout] = useState(CardViewLayout.GRID);
  const [sortValue, setSortValue] = useState<string>(SortOptions.POPULARITY_DESC.KEY);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [selectedGenres, setSelectedGenres] = useState<number[]>(selectedGenresArray);
  const [scoreValues, setScoreValues] = useState<number[]>([0, 10]);
  const [voteValues, setVoteValues] = useState<number[]>([0, 500]);
  const [isStickyVisible, setStickyVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const buttonRef = useRef(null);
  const observerRef = useRef(null);
  
  const { isSuccess: isGetMovieGenresSuccess, data: movieGenresData } = useMovieGenresQuery();
  const [ triggerFilteredMovies, { isLoading: isFilteringMovies, isSuccess: isFilterMoviesSuccess, data: filteredMoviesData }] = useLazyDiscoverMoviesQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInfiniteScroll || !filteredMoviesData?.data) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      { root: null, threshold: 1.0 }
    );

    
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isInfiniteScroll, movies, currentPage]);

  useEffect(() => {
    if (!isGetMovieGenresSuccess) {
      return;
    }
    setGenres(movieGenresData.data?.genres || []);
    completeTopBarLoader();
  }, [isGetMovieGenresSuccess, movieGenresData]);

  useEffect(() => {
    triggerFilteredMovies({
      page,
      sortValue,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(),
      selectedGenres,
      scoreValues,
      voteValues,
    });
    startTopBarLoader();
  }, [])

  useEffect(() => {
    if (!isFilterMoviesSuccess) {
      return;
    }

    if (isInfiniteScroll && isInfiniteLoading) {
      setMovies((prevMovies) => [...prevMovies, ...(filteredMoviesData.data?.results! || [])]);
      setIsInfiniteLoading(false);
    } else {
      setMovies(filteredMoviesData.data?.results! || []);
    }

    completeTopBarLoader();
    console.log('filteredMoviesData', filteredMoviesData);
  }, [isFilterMoviesSuccess, filteredMoviesData]);

  const handleCardViewLayoutClick = () => {
    setCardViewLayout(
      cardViewLayout === CardViewLayout.GRID
        ? CardViewLayout.LIST
        : CardViewLayout.GRID
    );
  }

  const handleToggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  }

  const handleFilter = () => {
    console.log('Filter params', {
      page,
      sortValue,
      fromDate: fromDate?.toDateString(),
      toDate: toDate?.toDateString(),
      selectedGenres,
      scoreValues,
      voteValues,
    })

    if (isInfiniteScroll) {
      setMovies([]);
    }

    triggerFilteredMovies({
      page: currentPage,
      sortValue,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(),
      selectedGenres,
      scoreValues,
      voteValues,
    });

    setCurrentPage(1);
    startTopBarLoader();
  }

  const handleClearFilters = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedGenres([]);
    setScoreValues([0, 10]);
    setVoteValues([0, 500]);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    triggerFilteredMovies({
      page: page,
      sortValue,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(),
      selectedGenres,
      scoreValues,
      voteValues,
    });
  };

  const handleLoadMore = () => {
    if (isInfiniteLoading || currentPage >= (filteredMoviesData?.data?.total_pages! || Number.MAX_SAFE_INTEGER))
      return;
    setIsInfiniteLoading(true);
    const nextPage = currentPage + 1;
    triggerFilteredMovies({
      page: nextPage,
      sortValue,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(),
      selectedGenres,
      scoreValues,
      voteValues,
    });

    setCurrentPage(nextPage);
    startTopBarLoader();
  }

  const handleToggleInfiniteScroll = (enabled : boolean) => {
    setInfiniteScroll(enabled);

    triggerFilteredMovies({
      page: currentPage,
      sortValue,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(),
      selectedGenres,
      scoreValues,
      voteValues,
    });

    startTopBarLoader();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Helmet>
        <title>Movie list</title>
      </Helmet>
      <div className="w-full max-w-[1440px] flex flex-row p-6 space-x-6">
        <div className="w-[300px] flex-shrink-0 space-y-4 mt-12">
          <Accordion
            type="single"
            collapsible
            className="w-full bg-gray-900 rounded-lg shadow-lg pl-4 pr-4"
          >
            <AccordionItem value="sort" className="rounded-xl bg-red ">
              <AccordionTrigger>
                <span className="text-lg">Sort</span>
              </AccordionTrigger>
              <AccordionContent>
                <Separator />
                <div className="p-1">
                  <p className="mt-4 mb-2">Sort Results By</p>
                  <Select value={sortValue} onValueChange={setSortValue}>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(SortOptions).map((option, index) => {
                        return (
                          <SelectItem key={index} value={option.KEY}>
                            {option.NAME}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            className="w-full bg-gray-900 rounded-lg shadow-lg pl-4 pr-4"
          >
            <AccordionItem value="filter" className="rounded-xl bg-red ">
              <AccordionTrigger>
                <div className="flex items-center justify-between space-x-3">
                  <span className="text-lg">Filter</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-transparent border-0 p-1 m-0 hover:bg-transparent hover:text-rose-600"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClearFilters();
                        }}
                      >
                        <FilterX className="w-3 h-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="p-2 duration-200">
                      Clear Filters
                    </TooltipContent>
                  </Tooltip>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <Separator />
                  <p className="font-light text-lg">Release date</p>
                  <div className="flex flex-row items-center justify-between">
                    <span>From</span>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[180px] justify-start text-left font-normal p-2",
                              !fromDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {fromDate ? (
                              <span>
                                {dayjs(fromDate).format("MMM D, YYYY")}
                              </span>
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={fromDate}
                            onSelect={setFromDate}
                          />
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="outline"
                        className="p-1 m-0 border-0 bg-transparent"
                        onClick={() => setFromDate(undefined)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <span>To</span>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[180px] justify-start text-left font-normal p-2",
                              !toDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {toDate ? (
                              <span>{dayjs(toDate).format("MMM D, YYYY")}</span>
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={toDate}
                            onSelect={setToDate}
                          />
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="outline"
                        className="p-1 m-0 border-0 bg-transparent"
                        onClick={() => setToDate(undefined)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Separator />
                  <p className="font-light text-lg">Genres</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => handleToggleGenre(genre.id)}
                        className={cn(
                          "px-3 py-1 text-sm rounded-full transition-colors text-white",
                          "hover:bg-rose-900 hover:text-white",
                          selectedGenres.includes(genre.id)
                            ? "bg-rose-900"
                            : "bg-gray-800 text-gray-300"
                        )}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Separator className="mt-2" />
                  <p className="font-light text-lg">User Score</p>
                  <div className="flex items-center justify-center space-x-2 font-semibold text-white">
                    <span>Rated</span>
                    <span className="bg-gray-800 px-2 rounded-md shadow">
                      {scoreValues[0]}
                    </span>
                    <span>-</span>
                    <span className="bg-gray-800 px-2 rounded-md shadow">
                      {scoreValues[1]}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={10}
                    value={scoreValues}
                    defaultValue={[0, 10]}
                    onValueChange={(val) => {
                      setScoreValues(val);
                    }}
                    step={1}
                    className="h-8"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Separator className="mt-2" />
                  <p className="font-light text-lg">User Votes</p>
                  <div className="flex items-center justify-center space-x-2 font-semibold text-white">
                    <span>Votes</span>
                    <span className="bg-gray-800 px-2 rounded-md shadow">
                      {voteValues[0]}
                    </span>
                    <span>-</span>
                    <span className="bg-gray-800 px-2 rounded-md shadow">
                      {voteValues[1]}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={500}
                    value={voteValues}
                    defaultValue={[0, 500]}
                    onValueChange={(val) => {
                      setVoteValues(val);
                    }}
                    step={50}
                    className="h-8"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            ref={buttonRef}
            variant="secondary"
            className="w-full py-3 transition-transform duration-300 hover:bg-rose-800 hover:text-white"
            onClick={handleFilter}
          >
            Apply Filters
          </Button>
        </div>
        <div className="flex-grow px-4 w-full">
          <div className="flex flex-row justify-between items-center mb-4">
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
            <div className="flex items-center space-x-2">
              <Switch
                id="infinite-switch"
                checked={isInfiniteScroll}
                onCheckedChange={handleToggleInfiniteScroll}
              />
              <Label htmlFor="infinite-switch">Enable Infinite Scroll</Label>
            </div>
          </div>
          {cardViewLayout === CardViewLayout.GRID ? (
            <div className="flex flex-wrap gap-4">
              {!isFilteringMovies
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
                  })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {!isFilteringMovies
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
          )}
          {isInfiniteScroll && (
            <div ref={observerRef} className="w-full flex justify-center mt-6">
              <Spinner isOpening={isInfiniteLoading} />
            </div>
          )}
          {!isInfiniteScroll &&
            isFilterMoviesSuccess &&
            filteredMoviesData?.data && (
              <div className="flex w-full justify-center mt-12">
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={filteredMoviesData.data?.total_pages!}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
        </div>
      </div>

      {isStickyVisible && (
        <div
          className={`w-full fixed bottom-0 left-0 right-0 z-50 shadow-lg transition-transform duration-300`}
        >
          <Button
            variant="secondary"
            className="bg-secondary/70 w-full py-3 transition-transform duration-300 hover:bg-rose-800 hover:text-white"
            onClick={handleFilter}
          >
            Apply Filters
          </Button>
        </div>
      )}

      <Button
        variant={"secondary"}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="fixed bottom-4 right-4 z-50 bg-gray-600/80 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-800"
      >
        ↑ Back to Top
      </Button>
    </div>
  );
}

export default MovieListPage;
import { useLazyMovieTrendingQuery } from "@/app/api/movies/movie-api-slice";
import { Movie, MovieMediaType, MovieTrendingDuration } from "@/app/api/types/movie.type";
import { MovieCard } from "@/components/custom/movie-card";
import { MovieCardSkeleton } from "@/components/custom/movie-card-sekeleton";
import { SliderButton } from "@/components/custom/slider-button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {  useEffect, useState } from "react";

export const Homepage = () => {

    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [trendingDuration, setTrendingDuration] = useState<MovieTrendingDuration>(MovieTrendingDuration.DAY);
    const [isTrendingLoading, setIsTrendingLoading] = useState(true);

    const [ getTrendingMovies, {isSuccess: isGetTrendingMoviesSuccess, data: trendingMoviesData} ] = useLazyMovieTrendingQuery();

    useEffect(() => {
        if(!isTrendingLoading) {
            setIsTrendingLoading(true);
        }
        getTrendingMovies({trendingType: {mediaType: MovieMediaType.MOVIE, duration: trendingDuration}});
    }, [trendingDuration]);

    useEffect(() => {
        if(isGetTrendingMoviesSuccess) {
            setTrendingMovies(trendingMoviesData.data?.results!);
            setIsTrendingLoading(false);
        }
    }, [isGetTrendingMoviesSuccess, trendingMoviesData]);

    const onLeftDurationClick = () => {
        setTrendingDuration(MovieTrendingDuration.DAY);
    };

    const onRightDurationClick = () => {
        setTrendingDuration(MovieTrendingDuration.WEEK);
    };

    return <div className="w-full">
        <section className="px-8 flex justify-center w-full bg-discover-bg py-8 bg-black bg-center relative">
            <div className="absolute inset-0 bg-black opacity-35 z-10"></div>
            <div className="max-w-[1300px] z-20" >
                <h3 className="text-4xl font-semibold">Welcome to TMDB</h3>
                <p className="text-2xl font-medium mt-2">Millions of movies, TV shows and people to discover. Explore now.</p>

                <div className="relative">
                    <Input className="rounded-full py-6 px-6 mt-8" placeholder="Search for a movie, tv show, person"></Input>

                    <Search className="text-white cursor-pointer absolute top-3 end-5" />
                </div>
            </div>
        </section>

        <section className="px-8 mt-8 w-full flex justify-center">
            <div className="max-w-[1300px]">
                <div className="max-w-[1300px] flex items-center space-x-6">
                    <h4 className="text-lg">Trending</h4>
                    <SliderButton 
                        onLeftClick={onLeftDurationClick}
                        onRightClick={onRightDurationClick}
                    />
                </div>

                <div className="flex gap-4 overflow-x-auto py-6">
                    {isTrendingLoading && new Array(10).fill(null).map((_, idx) => {
                        return <MovieCardSkeleton key={idx} />
                    })}
                    {trendingMovies.map((movie) => {
                        return <MovieCard key={movie.id} movie={movie}/>
                    })}
                </div>
            </div>
        </section>
    </div>
}
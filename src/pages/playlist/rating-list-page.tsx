import { useGetRatingsQuery } from "@/app/api/movies/movie-api-slice";
import { CardViewLayout, PlayListMovieCard } from "@/components/custom/playlist-movie-card";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, ListVideo } from "lucide-react";
import { useState } from "react";
import { Grid } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const RatingListPage = () => {
  const {data: ratingsData} = useGetRatingsQuery();
  const [cardViewLayout, setCardViewLayout] = useState(CardViewLayout.GRID);
  const [isReversed, setIsReversed] = useState(false);
  const navigate = useNavigate();

  const onViewLayoutClick = () => {
    setCardViewLayout((prev) => {
      return prev === CardViewLayout.GRID
        ? CardViewLayout.LIST
        : CardViewLayout.GRID;
    })
  };

  const onReverseClick = () => {
    setIsReversed((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col max-w-[1200px] mx-auto">
        <div className="px-6 mt-8">
          <h3 className="text-2xl font-semibold">My watch list</h3>          
          <div className="mt-4">
            <Button variant="ghost" className="text-red-500 p-3" onClick={onViewLayoutClick}>
              {
                cardViewLayout == CardViewLayout.GRID
                  ? <Grid className="text-[16px]"/>
                  : <ListVideo className="text-3xl shrink-0" />
              }
            </Button>
            <Button className="p-3" variant="ghost" onClick={onReverseClick}>
              {
                <ArrowDownUp />
              }
            </Button>
          </div>
        </div>
        <div className="px-6 py-4 flex items-center gap-32">
          {ratingsData?.data && ratingsData.data.length > 0 && <div className={`px-6 grid mt-8 gap-8 w-full ${cardViewLayout === CardViewLayout.GRID ? 'max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 grid-cols-5' : ''}`}>
            {
              (isReversed ? [...ratingsData.data].reverse() : ratingsData.data).map((movie) => (
                  <PlayListMovieCard
                    viewLayout={cardViewLayout} 
                    key={movie.movieId}
                    rating={movie.score}
                    movieId={movie.movieId}
                    onClick={() => navigate(`/movie/${movie.movieId}`)}
                  />
              ))  
            }
          </div>}
      </div>
    </div>
  </div>
  );
};

export default RatingListPage;
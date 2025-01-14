import { getCurrentAuthentication } from "@/app/api/auth/auth-slice";
import { useGetMovieFromPlaylistQuery, useGetPlaylistQuery } from "@/app/api/playlist/playlist-api-slice";
import { PlaylistUser } from "@/app/api/types/playlist.type";
import { CardViewLayout, PlayListMovieCard } from "@/components/custom/playlist-movie-card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import playfulCatImg from "@/assets/playful-cat.svg";
import { Helmet } from "react-helmet";

export const PlaylistDetailsPage = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState<PlaylistUser | undefined>();
    const [movies, setMovies] = useState<number[]>([]);
    const [ id ] = playlistId?.split('')!;
    const {data: playlistData, isSuccess, isError} = useGetPlaylistQuery(Number(id));
    const authenticatedUser = useSelector(getCurrentAuthentication);
    const navigate = useNavigate();

    const {data: movieData, isSuccess: isGetMoviesSuccess} = useGetMovieFromPlaylistQuery({
        playlistId: Number(id),
        page: 0,
        limit: 20,
        sortBy: 'updatedAt',
        sortDir: 'desc',
    });

    useEffect(() => {
        if(!isSuccess)
            return;
        setPlaylist(playlistData.data)
    }, [isSuccess, playlistData]);

    useEffect(() => {
        if(!isSuccess)
            return;
        setMovies(movieData?.data!)
    }, [isGetMoviesSuccess, movieData]);

    useEffect(() => {
        if(!isError)
            return;
        navigate('/404');
    }, [isError]);

    

    return (
        <div className="w-full">
            <Helmet>
              <title>Playlists</title>
            </Helmet>
            <div className="w-full flex flex-col max-w-[1200px] mx-auto">
                {playlist && <div className="px-6 py-4 flex items-center gap-32">
                    <div>
                        <h3 className="text-3xl font-bold">{playlist?.name}</h3>
                        <p className="mt-2">{playlist?.description}</p>
                        <div className="mt-4">
                            <div className="flex gap-2 items-center">
                                <Avatar className="size-6">
                                    <AvatarImage src={playlist?.user.picture}/>
                                </Avatar>
                                <p>{playlist?.user.fullname}</p>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-400 mt-2">
                                    <p>{movieData?.pagination?.totalRecords} movies</p>
                                    {
                                        playlist?.updatedAt &&
                                        <p>Last update {new Date(playlist?.updatedAt).toLocaleDateString('us')}
                                        </p>}
                            </div>
                        </div>
                    </div>
                    <div className="max-w-80">
                        <img src={playfulCatImg}/>
                    </div>
                </div>}
                <div className={`px-6 grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 grid-cols-5 mt-8 gap-8`}>
                    {
                        movies.map((movie) => (
                            <PlayListMovieCard 
                              movieId={movie}
                              viewLayout={CardViewLayout.GRID}
                              onClick={() => navigate(`/movie/${movie}`)} 
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
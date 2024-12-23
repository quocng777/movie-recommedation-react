import { useLikeMovieMutation, useRemoveLikedMovieMutation } from "@/app/api/movies/movie-api-slice";
import { addLikedMovie, removeLikedMovie } from "@/app/api/movies/movie-list-slice";
import { RootState } from "@/app/api/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./use-toast";

export const useMovieActions = (movieId: number) => {
    const isLiked = useSelector((state: RootState) => {
        const idx = state.movieList.likedMovies.findIndex(id => id === movieId);
        return idx !== -1;
    });
    const dispatch = useDispatch();

    const [likeMovieMutation, {isSuccess: isLikedSuccess, isError: isLikedError}] = useLikeMovieMutation();
    const [removeLikeMutation, {isSuccess: isRemovedLikeSuccess, isError: isRemovedLikeError}] = useRemoveLikedMovieMutation();

    const likeMovie = () => {
        if(isLiked) {
            dispatch(removeLikedMovie(movieId));
            removeLikeMutation({movieId});
            return;
        }
        dispatch(addLikedMovie(movieId));
        likeMovieMutation({movieId});
    };

    useEffect(() => {
        const title = 'Success';
        if(isLikedSuccess) {
            toast({
                title,
                description: "You liked a movie 💖",
            });
        }
    }, [isLikedSuccess]);

    useEffect(() => {
        const title = 'Success';
        if (isRemovedLikeSuccess) {
            toast({
                title,
                description: "You removed this movie out of like list 💔"
            })
        }
    }, [isRemovedLikeSuccess]);
    
    useEffect(() => {
        const variant = 'destructive';
        const title = 'Error';
        if(isLikedError) {
            toast({
                variant,
                title,
                description: 'Error when liking the video 😟',
            })
            dispatch(removeLikedMovie(movieId));
        }
    }, [isLikedError]);

    useEffect(() => {
        const variant = 'destructive';
        const title = 'Error';
        if (isRemovedLikeError) {
            toast({
                variant,
                title,
                description: 'Error when removing the video out of like list 😟',
            })
            dispatch(addLikedMovie(movieId));
        }
    }, [isRemovedLikeError]);

    return {
        isLiked,
        likeMovie,
    }
};
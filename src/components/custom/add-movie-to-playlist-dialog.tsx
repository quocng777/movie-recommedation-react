import { RootState } from "@/app/api/store";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useEffect, useMemo } from "react"
import { useSelector } from "react-redux";
import nodataImage from "@/assets/nodata-image.svg";
import { AddPlaylistDialog } from "./add-playlist-dialog";
import { Checkbox } from "@/components/ui/checkbox"
import { PlaylistAccessibility } from "@/app/api/types/playlist.type";
import { Earth, Lock } from "lucide-react";
import { useAddMovieToPlayMutation, useGetPlaylistsQuery, useRemoveMovieFromPlaylistMutation } from "@/app/api/playlist/playlist-api-slice";
import { toast } from "@/hooks/use-toast";
 
export type AddMovieToPlaylistDialogProps = {
    children: ReactNode,
    movieId: number,
};

export function AddMovieToPlaylistDialog(props: AddMovieToPlaylistDialogProps) {
    const {children, movieId} = props;
    const playlists = useSelector((state: RootState) => state.playlist);
    const {data: moviePlaylistsData, refetch} = useGetPlaylistsQuery({movieId});
    const [addMovieToPlaylistMutation, {isSuccess: isAddedMovieSuccess, isError: isAddedMovieError}] = useAddMovieToPlayMutation();
    const [removedMovieFromPlaylistMutation, {isSuccess: isRemovedMovieSuccess, isError: isRemovedMovieError}] = useRemoveMovieFromPlaylistMutation();

    const moviePlaylist = useMemo(() => {
        if(!moviePlaylistsData?.data) {
            return []
        };
        return moviePlaylistsData.data.map(item => item.id);
    }, [moviePlaylistsData]);

    const onChangeCheckBox = (playlistId: number) => {
        if(moviePlaylist.some((item) => item === playlistId)) {
            removedMovieFromPlaylistMutation({
                playlistId,
                movieId
            })
        } else {
            addMovieToPlaylistMutation({
                playlistId,
                movieId
            });
        }
    };

    useEffect(() => {
        if(!isAddedMovieSuccess) {
            return;
        }
        toast({
            title: 'Success',
            description: `Added ${movieId} to a playlist 🎉`
        });
        refetch();
    }, [isAddedMovieSuccess]);

    useEffect(() => {
        if(!isAddedMovieError) {
            return;
        }
        toast({
            title: 'Error',
            description: `Error when adding ${movieId} to a playlist 😟`
        });
    }, [isAddedMovieError]);

    useEffect(() => {
        if(!isRemovedMovieSuccess) {
            return;
        }
        toast({
            title: 'Success',
            description: `Removed ${movieId} to a playlist 🎉`
        });
        refetch();
    }, [isRemovedMovieSuccess]);

    useEffect(() => {
        if(!isRemovedMovieError) {
            return;
        }
        toast({
            title: 'Error',
            description: `Error when removing ${movieId} to a playlist 😟`
        });
    }, [isRemovedMovieError]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add movie to playlist</DialogTitle>
          <DialogDescription>
            Choose one of following playlists
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 flex flex-col w-full gap-6">
            {
                playlists.length 
                ? playlists.map(playlist => (
                    <div key={playlist.id} className="flex w-full justify-between gap-6"> 
                        <div className="flex items-center gap-6">
                            <Checkbox key={playlist.id} className="size-5" value={playlist.id} checked={moviePlaylist.some(item => item === playlist.id)} onClick={() => onChangeCheckBox(playlist.id)} />
                            <label
                                className="text-base text-medium font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {playlist.name}
                            </label>
                        </div>
                        {
                            playlist.accessibility === PlaylistAccessibility.PUBLIC 
                            ? <Earth />
                            : <Lock />
                        }
                    </div>
                ))
                : (<div className="grid w-full items-center gap-6 justify-center">
                    <img src={nodataImage} className="max-w-40 justify-self-center" />
                    <p className="text-sm">
                        You don't have any playlists, create a new playlist now
                    </p>
                </div>)
                
            }
        </div>
        <DialogFooter className="w-full">
            <AddPlaylistDialog>
                <Button type="button" variant="secondary" className="w-full">
                        Create new playlist
                </Button>
            </AddPlaylistDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
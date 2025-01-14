import { useLazyMovieDetailQuery } from "@/app/api/movies/movie-api-slice";
import { useDeletePlaylistMutation, useGetMovieFromPlaylistQuery } from "@/app/api/playlist/playlist-api-slice";
import { Playlist, PlaylistAccessibility } from "@/app/api/types/playlist.type";
import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import { Earth, Film, Lock } from "lucide-react";
import { MouseEventHandler, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Pen, Share, ThreeDotsVertical, Trash } from "react-bootstrap-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch } from "react-redux";
import { deletePlaylist } from "@/app/api/playlist/playlist-slice";
import { toast } from "@/hooks/use-toast";
import { EditPlaylistDialog } from "./edit-playlist-dialog";
import { useNavigate } from "react-router-dom";
import { ShareDialog } from "./share-dialog";

export type PlaylistCardProps = {
    playlist: Playlist;
};

export type PlaylistInfo = {
    picture?: string;
    moviesQuantity: number;
};

export const PlaylistCard = (props: PlaylistCardProps) => {
    const {playlist} = props;
    const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | undefined>();
    const [getMovieDetails, {isSuccess: isMovieDetailsSuccess, data: movieDetailsData}] = useLazyMovieDetailQuery();
    const [deletePlaylistMutation, {isSuccess: isDeletedSuccess, isError: isDeletedError}] = useDeletePlaylistMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openShareDialog, setOpenShareDialog] = useState(false);

    const {data, isSuccess} = useGetMovieFromPlaylistQuery({
        playlistId: playlist.id,
        page: 0,
        limit: 1,
        sortBy: 'updatedAt',
        sortDir: 'desc',
    }, {refetchOnMountOrArgChange: true});

    useEffect(() => {
        if(!isSuccess)
            return;
        
        const info: PlaylistInfo = {
            moviesQuantity: data.pagination?.totalRecords!,
        }
        if(data.data && data.data.length > 0) {
            getMovieDetails({id: data.data![0].toString()})
        }

        setPlaylistInfo(info);
    }, [isSuccess, data]);

    useEffect(() => {
        if(!isMovieDetailsSuccess)
            return;
        const info = {
            ...playlistInfo,
            picture: movieDetailsData.data?.backdrop_path,
        };
        setPlaylistInfo(info as PlaylistInfo);
    }, [isMovieDetailsSuccess, movieDetailsData]);

    useEffect(() => {
        if(!isDeletedSuccess) {
            return;
        }
        dispatch(deletePlaylist(playlist.id));
        toast({
            title: 'Success',
            description: `Deleted ${playlist.name} 📺`,
        });
    }, [isDeletedSuccess]);

    useEffect(() => {
        if(!isDeletedError) {
            return;
        }
        toast({
            variant: 'destructive',
            title: 'Error',
            description: `Error when deleting ${playlist.name} 📺`,
        });
    }, [isDeletedError])


    const onDeleteClick: MouseEventHandler = (event) => {
        event.stopPropagation();
        deletePlaylistMutation(playlist.id);
        setOpenMenu(false);
    };

    const onCardClick = () => {
        navigate(`/playlists/${playlist.id}-${playlist.name.split(' ').join('-')}`);
    };

    return (
        <div className="w-[320px] max-lg:w-[240px] relative cursor-pointer group ">
            <div className="bg-gray-800 absolute -top-2 inset-x-4 h-4 z-[1] rounded-md" />
            <div className="bg-gray-800 absolute -top-1 inset-x-2 h-4 z-[1] rounded-md border-t border-background"/>
            {
               (
                    <div className="relative z-[4] bg-white rounded-md border-t border-background  max-lg:w-[240px] max-lg:h-[135px] w-[320px] h-[180px] overflow-hidden" onClick={onCardClick}>
                      <img src={getResourceFromTmdb(playlistInfo?.picture || '')} className="group-hover:blur-[1px]"/>
                      <div className="bg-background/80 py-1 px-2 absolute bottom-2 flex items-center rounded-md right-2 gap-2">
                          <Film className="size-4" />
                          <span className="text-xs font-semibold">{playlistInfo?.moviesQuantity} movies</span>
                      </div>
                    </div>
                )
            }
            <div className="z-[4] grid relative">
                <Popover open={openMenu} onOpenChange={setOpenMenu}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute right-1 size-8 rounded-full" onClick={(e) => {e.stopPropagation()}}>
                            <ThreeDotsVertical />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-background z-[90] rounded-lg max-w-[240px]" sideOffset={2}>
                        <div>
                            <ul className="grid">
                                <li className={`flex gap-4 items-center px-4 py-2 hover:bg-primary-foreground rounded-lg cursor-pointer hover:text-red-500`} onClick={onDeleteClick}>
                                    <Trash />
                                    <p>Delete playlist</p>
                                </li>
                                <li className={`flex gap-4 items-center px-4 py-2 hover:bg-primary-foreground rounded-lg cursor-pointer`} onClick={(event) => {
                                        event.stopPropagation();
                                        setOpenMenu(false);
                                        setOpenEditDialog(true);
                                    }}
                                        >
                                        <Pen />
                                        <p>Edit</p>
                                </li>
                                {
                                    playlist.accessibility == PlaylistAccessibility.PUBLIC
                                    ? (
                                        <li 
                                            className={`flex gap-4 items-center px-4 py-2 hover:bg-primary-foreground rounded-lg cursor-pointer`}
                                            onClick={() => {
                                                setOpenMenu(false);
                                                setOpenShareDialog(true);
                                            }}
                                        >
                                            <Share />
                                            <p>Share</p>
                                        </li>
                                    )
                                    : undefined
                                }
                            </ul>
                        </div>
                    </PopoverContent>
                </Popover>
                <p className="font-semibold">{playlist.name}</p>
                {
                    playlist.accessibility == PlaylistAccessibility.PUBLIC
                    ? (<div className="flex gap-3 items-center text-gray-400">
                       <Earth className="size-5" />
                       <p>Public</p> 
                    </div>)
                    : (<div className="flex gap-3 items-center text-gray-400">
                        <Lock className="size-5" />
                        <p>Private</p>
                    </div>)
                }
            </div>
            <EditPlaylistDialog 
                isOpening={openEditDialog}
                setIsOpening={setOpenEditDialog}
                playlist={playlist} />

            <ShareDialog value={`${window.location.origin}/playlists/${playlist.id}-${playlist.name.split(' ').join('-')}`} open={openShareDialog} setOpen={setOpenShareDialog}/>
        </div>
    );
};
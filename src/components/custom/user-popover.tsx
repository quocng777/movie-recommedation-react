import { logOut } from "@/app/api/auth/auth-slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthentication } from "@/hooks/use-authentication";
import { useTopBarLoader } from "@/hooks/use-top-loader";
import { delay } from "@/lib/helpers/delay";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";
import { Bookmark, Heart, Star, Tv } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export type UserPopoverProps = {
    children: ReactNode;
    closePopover: () => void;
    open: boolean;
    onOpenChange: (val: boolean) => void;
};

export type PopoverItemProps = {
    children: ReactNode;
    canClick?: boolean;
    onClick?: () => void;
};

export const PopoverItem = ({children, canClick = true, onClick} : PopoverItemProps) => {
    return (
        <div className={`${canClick ? 'hover:bg-primary/20 cursor-pointer' : ''} rounded-md py-2 px-4`} onClick={onClick}>
            {children}
        </div>
    )
}

export const UserPopover = (props: UserPopoverProps) => {
    const { children, closePopover, open, onOpenChange} = props;
    const user = useAuthentication();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { complete: completeSideBarLoader } = useTopBarLoader();

    const onLogoutClick = async () => {
        dispatch(logOut());
        await delay(200);
        completeSideBarLoader();
    };

    const onPlaylistClick = () => {
        navigate('/playlists');
        closePopover();
    };

    const onLikeListClick = () => {
      navigate('/like-list');
      closePopover();
    };

    const onWatchListClick = () => {
      navigate('/watch-list');
      closePopover();
    };

    const onRatingsClick = () => {
      navigate('/ratings');
      closePopover();
    };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-64 text-sm" sideOffset={10}>
        <div className="grid gap-2">
            <PopoverItem>
                <p className="font-semibold mb-2">{user.authentication.username}</p>
                <p className="text-xs">View your detail profile</p>
            </PopoverItem>
            <PopoverItem onClick={onPlaylistClick}>
                <div className="flex gap-6 items-center">
                    <Bookmark className="size-5" />
                    <span className="font-semibold">Playlists</span>
                </div>
            </PopoverItem>
            <PopoverItem onClick={onLikeListClick}>
                <div className="flex gap-6 items-center">
                    <Heart className="size-5" />
                    <span className="font-semibold">Liked movies</span>
                </div>
            </PopoverItem>
            <PopoverItem onClick={onWatchListClick}>
                <div className="flex gap-6 items-center">
                    <Tv className="size-5" />
                    <span className="font-semibold">Watch list</span>
                </div>
            </PopoverItem>
            <PopoverItem onClick={onRatingsClick}>
                <div className="flex gap-6 items-center">
                    <Star className="size-5" />
                    <span className="font-semibold">Ratings</span>
                </div>
            </PopoverItem>
            <PopoverItem onClick={onLogoutClick}>
                <div className="flex gap-6 items-center">
                    <LogOut className="size-5" />
                    <span className="font-semibold">Logout</span>
                </div>
            </PopoverItem>
        </div>
      </PopoverContent>
    </Popover>
  )
}

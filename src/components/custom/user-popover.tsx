import { logOut } from "@/app/api/auth/auth-slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthentication } from "@/hooks/use-authentication";
import { useTopBarLoader } from "@/hooks/use-top-loader";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";
import { Bookmark, Heart } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export type UserPopoverProps = {
    children: ReactNode;
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
    const { children } = props;
    const user = useAuthentication();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { complete: completeSideBarLoader } = useTopBarLoader();

    const onLogoutClick = () => {
        dispatch(logOut());
        completeSideBarLoader();
    };

    const onPlaylistClick = () => {
        navigate('/playlists');
    };

    const onLikeListClick = () => {
      navigate('/like-list');
    };

  return (
    <Popover>
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

import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "../ui/popover";
import { ReactElement } from "react";
import { Bookmark, Heart, History } from "lucide-react";
import { MovieAction } from "@/constants/movies";

export type MovieActionPopoverProps = {
    children: ReactElement;
};

export type MovieActionItem = {
    type: MovieAction;
    icon: ReactElement;
    name: string;
    color?: string;
};

export const movieActions: MovieActionItem[] = [
    {
        type: MovieAction.WATCH_LIST,
        icon: <History />,
        name: 'Save to Watch later',
        color: 'hover:text-green-500'
    },
    {
        type: MovieAction.MY_LIST,
        icon: <Bookmark />,
        name: 'Save to my list',
        color: 'hover:text-sky-400'
    },
    {
        type: MovieAction.LIKE_LIST,
        icon: <Heart />,
        name: 'Like this movie',
        color: 'hover:text-pink-500'
    },
];

const MovieActionPopover = (props: MovieActionPopoverProps) => {
    const { children } = props;
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="bg-black z-[90] rounded-lg" sideOffset={4}>
                <div>
                    <ul className="grid gap-3 px-2 py-2">
                        {
                            movieActions.map(
                                (action) => (
                                    <div key={action.type} className={`flex gap-4 items-center px-4 py-2 hover:bg-primary-foreground rounded-lg ${action.color}`}>
                                        {action.icon}
                                        <p>{action.name}</p>
                                    </div>
                                )
                            )
                        }
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    )
};

export default MovieActionPopover;
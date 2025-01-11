import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronDoubleDown, ChevronDoubleUp } from "react-bootstrap-icons";
import { Review } from "@/app/api/types/movie.type";
import dayjs from "dayjs";
import { PenBox, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useSelector } from "react-redux";
import { RootState } from "@/app/api/store";
import { useDeleteMovieRatingMutation } from "@/app/api/movies/movie-api-slice";

type ReviewCardProps = {
  review: Review;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const ReviewCard = ({
  review: { user, comment, updated_at }, 
  onEdit,
  onDelete,
}: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const defaultContentHeight = 120;
  const authUserId = useSelector((state: RootState) => state.auth.user?.id);
  const editable = authUserId === user.id;

  return (
    <div className="bg-gray-rose-gradient rounded-xl shadow-xl p-4 mb-6 w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar className="shrink-0">
            <AvatarImage
              src={user.picture}
              className="size-10 rounded-full shrink-0"
            />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-start mb-2">
            <p className="font-semibold text-gray-100 text-lg">
              {user.username}
            </p>
            <p className="font-light text-md">
              {" "}
              {user.username != user.fullname ? `(${user.fullname})` : ""}
            </p>
            <p className="font-light text-sm text-gray-400">
              Updated at {dayjs(updated_at).format("MMM DD YYYY")}
            </p>
          </div>
        </div>
        {editable && (
          <div>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="bg-transparent hover:bg-gray-800 mr-2"
                  onClick={onEdit}
                >
                  <PenBox className="text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit your comment</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button 
                  className="bg-transparent hover:bg-gray-800" 
                  onClick={onDelete}
                >
                  <Trash2 className="text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete your comment</TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between mb-2">
        <div
          className={`relative transition-[max-height] duration-200 ease-in-out overflow-hidden`}
          style={{
            maxHeight: isExpanded
              ? `${contentRef.current?.scrollHeight}px`
              : `${defaultContentHeight}px`,
          }}
          ref={contentRef}
        >
          <div className="flex flex-col mt-2 p-2">
            <div
              className="text-gray-300 transition-all duration-100"
              dangerouslySetInnerHTML={{ __html: comment }}
            ></div>
            {contentRef.current?.scrollHeight &&
              contentRef.current?.scrollHeight > defaultContentHeight &&
              !isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none"></div>
              )}
          </div>
        </div>

        {contentRef.current?.scrollHeight &&
          contentRef.current?.scrollHeight > defaultContentHeight && (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full border-none text-gray-200 rounded-full bg-transparent hover:bg-transparent hover:text-rose-700 transition-all duration-200"
            >
              {isExpanded ? <ChevronDoubleUp /> : <ChevronDoubleDown />}
            </Button>
          )}
      </div>
    </div>
  );
};
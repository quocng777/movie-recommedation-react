import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

export const ratingScore = {
  1: {
    emoji: '💩',
    score: 1,
    title: 'Terrible',
  },
  2: {
    emoji: '🤬',
    score: 2,
    title: 'Awful',
  },
  3: {
    emoji: '🤮',
    score: 3,
    title: 'Bad',
  },
  4: {
    emoji: '😰',
    score: 4,
    title: 'Poor',
  },
  5: {
    emoji: '😔',
    score: 5,
    title: 'Below Average',
  },
  6: {
    emoji: '😐',
    score: 6,
    title: 'Average',
  },
  7: {
    emoji: '😯',
    score: 7,
    title: 'Above Average',
  }, 
  8: {
    emoji: '😆',
    score: 8,
    title: 'Good',
  },
  9: {
    emoji: '🤩',
    score: 9,
    title: 'Great',
  },
  10: {
    emoji: '😍',
    score: 10,
    title: 'Excellent',
  }
};

export type RatingPickerProps = {
  children: ReactNode;
  selectedRating?: number;
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onRatingClick: (val: number) => void;
}

export const RatingPicker = (props: RatingPickerProps) => {
  const {children, selectedRating, open, onOpenChange, onRatingClick} = props;
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-full">
        <div className="flex">
          {
            Object.values(ratingScore).map((rating) => {
              return (
                <Tooltip>
                  <TooltipTrigger>
                    <div key={rating.score} className={`p-2 rounded-full hover:bg-gray-500/60 cursor-pointer ${selectedRating === rating.score ? 'bg-gray-800' : ''}`} onClick={() => {onRatingClick(rating.score)}}>
                    <p className="text-lg">{rating.emoji}</p>
                  </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      <p>{rating.title}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            })
          }
        </div>
      </PopoverContent>
    </Popover>
  )
}
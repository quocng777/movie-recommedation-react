export type RatingIndicatorProps = {
  rating: number;
}

export const RatingIndicator = (props: RatingIndicatorProps) => {
  let { rating } = props;
  if (!rating) rating = 0;

  return (
    <div className="relative w-14 h-14 rounded-full shadow-xl">
      <svg className="w-full h-full rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="#111827"
          stroke="#9ca3af"
          strokeWidth="3"
          className="opacity-70"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke={
            rating === 0
              ? "#fff"
              : rating * 10 >= 70
              ? "#22c55e"
              : rating * 10 >= 50
              ? "#d97706"
              : "#e11d48"
          }
          stroke-linecap="round" 
          strokeWidth="3"
          strokeDasharray="100, 100"
          strokeDashoffset={`${100 - rating * 10}`}
          strokeLinecap="round"
          transform="rotate(-180 18 18)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {rating ? (
          <>
            <span className="font-bold">{`${(rating * 10).toFixed(0)}`}</span>
            <span className="text-[8px]">%</span>
          </>
        ) : (
            <span className="text-[8px]">NR</span>
        )}
      </div>
    </div>
  );
}
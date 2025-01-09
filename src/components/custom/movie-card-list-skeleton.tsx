import { Skeleton } from "../ui/skeleton";

export const MovieCardListSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-md w-full h-40 shadow-lg bg-gray-rose-gradient flex">
      <Skeleton className="w-28 h-40" />
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full py-2 px-3 space-y-4">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="flex flex-row space-x-4 m-3">
          <Skeleton className="w-20 h-3" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
    </div>
  );
};

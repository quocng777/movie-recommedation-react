import { Skeleton } from "../ui/skeleton"

export const MovieCardSkeleton = ()  => {
    return (
        <div className="rounded-lg overflow-hidden cursor-pointer shrink-0">
            <Skeleton className="w-40 h-[15rem]" />
            <div className="mt-2 flex flex-col">
                <Skeleton className="h-6 w-20"/>
                <Skeleton className="h-5 mt-1 w-12"/>
            </div>
        </div>
    )
}
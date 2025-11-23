import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-12" />
          <div className="flex gap-2">
            <Skeleton className="w-16 h-9 rounded-lg" />
            <Skeleton className="w-16 h-9 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Content Skeleton */}
      <div className="flex-1 grid grid-cols-12 pt-[73px] overflow-hidden">
        {/* Left Column - Image Skeleton */}
        <div className="col-span-4 h-full bg-gray-200 animate-pulse">
          {/* Placeholder for large image */}
        </div>
        
        {/* Right Column - Content Skeleton */}
        <div className="col-span-8 h-full overflow-y-auto bg-gray-100 p-[40px_60px]">
          <div className="space-y-6">
            {/* Card 1 */}
            <Skeleton className="h-[300px] w-full rounded-lg" />
            {/* Card 2 */}
            <Skeleton className="h-[200px] w-full rounded-lg" />
            {/* Card 3 */}
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

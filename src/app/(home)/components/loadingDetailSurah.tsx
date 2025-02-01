import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDetailSurah() {
  return (
    <div className="border borrder-gray-200 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center h-[60px] md:h-[80px] xs:hidden px-4 bg-background border-b border-gray-200 dark:border-gray-800">
        <div className="flex w-[140px] xs:w-[60px] items-center">
          <Skeleton className="w-full h-[40px] rounded-lg" />
        </div>

        <div className="flex gap-2 items-center">
          <Skeleton className="w-[40px] h-[40px] rounded-lg hidden md:block" />
          <Skeleton className="w-[140px] h-[40px] rounded-lg hidden md:block" />
          <Skeleton className="w-[140px] h-[40px] rounded-lg hidden md:block" />
          <Skeleton className="w-[40px] h-[40px] rounded-lg hidden md:block" />
          <Skeleton className="w-[40px] h-[40px] rounded-lg" />
        </div>
      </div>
      <div className="px-4 pb-4 space-y-4">
        <Skeleton className="w-full h-[200px] rounded-xl" />
        <Skeleton className="w-full h-[200px] rounded-xl" />
        <Skeleton className="w-full h-[200px] rounded-xl" />
      </div>
    </div>
  );
}

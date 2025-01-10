import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDetailSurah() {
  return (
    <div className="border borrder-gray-200 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center h-[80px] px-4 bg-white border-b border-gray-200">
        <div className="flex w-[140px] items-center">
          <Skeleton className="w-full h-[40px] rounded-lg" />
        </div>

        <div className="flex flex-col gap-2 w-[160px] items-center">
          <Skeleton className="w-[120px] h-[30px] rounded-sm" />
          <Skeleton className="w-full h-[15px] rounded-sm" />
        </div>

        <div className="flex w-[140px] items-center">
          <Skeleton className="w-full h-[40px] rounded-lg" />
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

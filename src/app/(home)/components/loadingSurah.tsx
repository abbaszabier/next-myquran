import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingListSurah() {
  return (
    <div className="bg-background space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)] border border-r-0">
      <div className="flex items-center justify-center sticky top-0 z-100 justify-between items-center h-[80px] px-4 bg-background border-b border-gray-200 backdrop-blur-sm bg-opacity-80 backdrop-filter backdrop-saturate-150">
        <Skeleton className="w-full h-[40px] rounded-lg" />
      </div>
      <div className="px-4 pb-4 space-y-4">
        <Skeleton className="w-full h-[80px] rounded-lg" />
        <Skeleton className="w-full h-[80px] rounded-lg" />
        <Skeleton className="w-full h-[80px] rounded-lg" />
        <Skeleton className="w-full h-[80px] rounded-lg" />
        <Skeleton className="w-full h-[80px] rounded-lg" />
        <Skeleton className="w-full h-[80px] rounded-lg" />
        <Skeleton className="w-full h-[80px] rounded-lg" />
      </div>
    </div>
  );
}

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingListSurah() {
  return (
    <div className="bg-white p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)] border border-r-0">
      <Skeleton className="w-full h-[40px] rounded-lg" />
      <Skeleton className="w-full h-[80px] rounded-lg" />
      <Skeleton className="w-full h-[80px] rounded-lg" />
      <Skeleton className="w-full h-[80px] rounded-lg" />
      <Skeleton className="w-full h-[80px] rounded-lg" />
    </div>
  );
}

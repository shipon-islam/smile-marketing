import { Skeleton } from "@/components/ui/skeleton";
export default function SkeletonCard() {
  return (
    <div className="p-3 border border-gray-200 rounded-md relative min-h-[345px]">
      <div>
        <Skeleton className="w-full h-[130px] mx-auto" />
      </div>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <Skeleton className="w-[40%] h-6" />
          <Skeleton className="w-[20%] h-6" />
        </div>
        <Skeleton className="w-full h-8" />

        <Skeleton className="w-[70%] h-6" />

        <Skeleton className="w-[50%] h-4" />

        <Skeleton className="w-full h-8 mt-6" />
      </div>
    </div>
  );
}

// components/SkeletonCard.tsx
"use client";

export function IngredientSkeleton() {
  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-[#222]" />
      <div className="p-4 flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-xl bg-[#222]" />
        <div className="h-4 w-24 bg-[#222] rounded-lg" />
        <div className="h-3 w-16 bg-[#1a1a1a] rounded-full" />
      </div>
    </div>
  );
}

export function MealSkeleton() {
  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-[#222]" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 bg-[#222] rounded-lg" />
        <div className="h-3 w-1/2 bg-[#1a1a1a] rounded-lg" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="aspect-video w-full rounded-3xl bg-[#111]" />
      <div className="space-y-3">
        <div className="h-8 w-2/3 bg-[#111] rounded-xl" />
        <div className="h-4 w-1/3 bg-[#111] rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 bg-[#111] rounded-xl" />
        ))}
      </div>
    </div>
  );
}

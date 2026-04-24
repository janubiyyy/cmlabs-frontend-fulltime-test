// components/SkeletonCard.tsx
"use client";

export function IngredientSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-white/10" />
      <div className="p-4 flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-xl bg-white/10" />
        <div className="h-4 w-24 bg-white/10 rounded-lg" />
        <div className="h-3 w-16 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

export function MealSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-white/10" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 bg-white/10 rounded-lg" />
        <div className="h-3 w-1/2 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="aspect-video w-full rounded-3xl bg-white/10" />
      <div className="space-y-3">
        <div className="h-8 w-2/3 bg-white/10 rounded-xl" />
        <div className="h-4 w-1/3 bg-white/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 bg-white/5 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// components/MealCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface MealCardProps {
  id: string;
  name: string;
  thumb: string;
}

export default function MealCard({ id, name, thumb }: MealCardProps) {
  return (
    <Link
      href={`/meals/${id}`}
      className="group relative bg-white hover:bg-gray-50 border border-gray-200 hover:border-orange-300 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer"
    >
      {/* Meal Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={thumb}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

        {/* hover overlay */}
        <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 text-xs mt-2 group-hover:text-orange-500 transition-colors">
          View Recipe →
        </p>
      </div>
    </Link>
  );
}

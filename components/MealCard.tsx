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
      className="group relative bg-white hover:bg-orange-50/50 border border-gray-100 hover:border-orange-300 rounded-3xl overflow-hidden transition-all duration-500 spring-bounce hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/15 cursor-pointer"
    >
      {/* Meal Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={thumb}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 spring-bounce"
          unoptimized
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

        {/* hover overlay */}
        <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 spring-bounce group-hover:scale-110">
          <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg shadow-black/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-400 hover:shadow-orange-500/50 transition-colors duration-300">
            <svg
              className="w-6 h-6 ml-1"
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

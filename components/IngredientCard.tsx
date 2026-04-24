// components/IngredientCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface IngredientCardProps {
  name: string;
  index: number;
}

const INGREDIENT_COLORS = [
  "from-orange-500 to-red-500",
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-pink-500",
  "from-yellow-500 to-orange-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-pink-500",
  "from-lime-500 to-emerald-500",
];

export default function IngredientCard({ name, index }: IngredientCardProps) {
  const colorClass = INGREDIENT_COLORS[index % INGREDIENT_COLORS.length];
  const imageUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}.png`;

  return (
    <Link
      href={`/ingredients/${encodeURIComponent(name)}`}
      className="group relative bg-[#111] hover:bg-[#1a1a1a] border border-[#222] hover:border-[#333] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer"
    >
      {/* gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${colorClass}`} />

      <div className="p-4 flex flex-col items-center gap-3">
        {/* ingredient image */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#222] group-hover:bg-[#333] transition-colors duration-500 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={name}
            width={80}
            height={80}
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
            onError={() => {}}
            unoptimized
          />
        </div>

        <div className="text-center">
          <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2 group-hover:text-orange-300 transition-colors">
            {name}
          </h3>
        </div>

        <div
          className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${colorClass} bg-opacity-20 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          View Meals →
        </div>
      </div>
    </Link>
  );
}

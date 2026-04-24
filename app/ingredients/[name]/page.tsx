"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchMealsByIngredient, type MealThumb } from "@/lib/api";
import MealCard from "@/components/MealCard";
import SearchBar from "@/components/SearchBar";
import { MealSkeleton } from "@/components/SkeletonCard";

export default function IngredientsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const ingredientName = decodeURIComponent(params.name as string);

  const [meals, setMeals] = useState<MealThumb[]>([]);
  const [filtered, setFiltered] = useState<MealThumb[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ingredientName) return;
    fetchMealsByIngredient(ingredientName)
      .then((data) => {
        setMeals(data);
        setFiltered(data);
      })
      .catch(() =>
        setError("Failed to load meals. Please check your connection.")
      )
      .finally(() => setLoading(false));
  }, [ingredientName]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearch(query);
      if (!query.trim()) {
        setFiltered(meals);
      } else {
        const q = query.toLowerCase();
        setFiltered(meals.filter((m) => m.strMeal.toLowerCase().includes(q)));
      }
    },
    [meals]
  );

  const imageUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredientName)}.png`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Ingredients
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 animate-fade-in-up">
        <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 relative">
          <Image
            src={imageUrl}
            alt={ingredientName}
            fill
            className="object-contain p-2"
            unoptimized
          />
        </div>
        <div>
          <div className="flex items-center gap-2 text-orange-600 text-sm font-medium mb-2">
            <span>🥘</span>
            <span>Ingredient</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
            {ingredientName}
          </h1>
          {!loading && (
            <p className="text-gray-600">
              {meals.length} meal{meals.length !== 1 ? "s" : ""} using this
              ingredient
            </p>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="max-w-xl mb-8">
        <SearchBar
          placeholder={`Search meals with ${ingredientName}...`}
          onSearch={handleSearch}
          value={search}
        />
        {!loading && search && (
          <p className="text-gray-500 text-sm mt-2 ml-1">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for
            &quot;{search}&quot;
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-red-400 font-medium mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* No meals */}
      {!loading && !error && filtered.length === 0 && !search && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🍽</div>
          <p className="text-gray-500 font-medium">
            No meals found for this ingredient
          </p>
        </div>
      )}

      {/* No search results */}
      {!loading && !error && filtered.length === 0 && search && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 font-medium">
            No meals match &quot;{search}&quot;
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-stagger">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <MealSkeleton key={i} />)
          : filtered.map((meal) => (
              <MealCard
                key={meal.idMeal}
                id={meal.idMeal}
                name={meal.strMeal}
                thumb={meal.strMealThumb}
              />
            ))}
      </div>
    </div>
  );
}

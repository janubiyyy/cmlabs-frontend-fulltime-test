"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchIngredients, type Ingredient } from "@/lib/api";
import IngredientCard from "@/components/IngredientCard";
import SearchBar from "@/components/SearchBar";
import { IngredientSkeleton } from "@/components/SkeletonCard";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [filtered, setFiltered] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState("");
  const [displayedCount, setDisplayedCount] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIngredients()
      .then((data) => {
        setIngredients(data);
        setFiltered(data);
      })
      .catch(() => setError("Failed to load ingredients. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearch(query);
      setDisplayedCount(30); // Reset count on search
      if (!query.trim()) {
        setFiltered(ingredients);
      } else {
        const q = query.toLowerCase();
        setFiltered(
          ingredients.filter((ing) =>
            ing.strIngredient.toLowerCase().includes(q)
          )
        );
      }
    },
    [ingredients]
  );

  const ITEMS_PER_PAGE = 30;
  const currentIngredients = filtered.slice(0, displayedCount);
  const hasMore = displayedCount < filtered.length;

  // We can use the first 10 items of the base ingredients array as "Featured" when no search is active
  const featuredIngredients = ingredients.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 text-orange-600 text-sm font-medium mb-6">
          <span>🍽</span>
          <span>TheMealDB Explorer</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Explore{" "}
          <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            Ingredients
          </span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Browse hundreds of ingredients and discover the recipes that use them.
          Click on any ingredient to explore its meals.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-10">
        <SearchBar
          placeholder="Search ingredients (e.g. Chicken, Garlic, Tomato...)"
          onSearch={handleSearch}
          value={search}
        />
        {!loading && (
          <p className="text-center text-gray-500 text-sm mt-3">
            {search
              ? `${filtered.length} ingredient${filtered.length !== 1 ? "s" : ""} found for "${search}"`
              : `${ingredients.length} ingredients available`}
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-md mx-auto text-center py-16">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-red-400 font-medium mb-2">Something went wrong</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* No results */}
      {!loading && !error && filtered.length === 0 && search && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 font-medium mb-2">
            No ingredients found for &quot;{search}&quot;
          </p>
          <p className="text-gray-400 text-sm">Try a different search term</p>
        </div>
      )}

      {/* Featured Slider (Hidden during search) */}
      {!loading && !error && !search && featuredIngredients.length > 0 && (
        <div className="mb-16 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Top Categories
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => document.getElementById('featured-slider')?.scrollBy({ left: -300, behavior: 'smooth' })}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:shadow-md transition-all">
                ←
              </button>
              <button 
                onClick={() => document.getElementById('featured-slider')?.scrollBy({ left: 300, behavior: 'smooth' })}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:shadow-md transition-all">
                →
              </button>
            </div>
          </div>
          
          {/* Snap scrolling horizontal slider */}
          <div 
            id="featured-slider"
            className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredIngredients.map((ing, i) => (
              <div key={`featured-${ing.idIngredient}`} className="snap-start shrink-0 w-[160px] sm:w-[200px]">
                <IngredientCard name={ing.strIngredient} index={i + 10} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Header */}
      {!loading && !error && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 px-1">
          {search ? "Search Results" : "All Ingredients"}
        </h2>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 animate-stagger">
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <IngredientSkeleton key={i} />
            ))
          : currentIngredients.map((ing, i) => (
              <IngredientCard
                key={ing.idIngredient}
                name={ing.strIngredient}
                index={i}
              />
            ))}
      </div>

      {/* Load More Button */}
      {!loading && !error && hasMore && (
        <div className="mt-16 mb-8 flex justify-center animate-fade-in-up">
          <button
            onClick={() => setDisplayedCount((prev) => prev + ITEMS_PER_PAGE)}
            className="group relative px-8 py-3 bg-white border border-gray-200 rounded-full font-semibold text-gray-700 hover:text-orange-600 hover:border-orange-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Load More
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            {/* Soft gradient hover effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      )}
    </div>
  );
}

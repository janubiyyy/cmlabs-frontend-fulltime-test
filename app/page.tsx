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
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-r from-orange-400/20 to-rose-400/20 blur-[100px] rounded-full mix-blend-multiply opacity-60 animate-pulse pointer-events-none" />
      
      {/* Hero */}
      <div className="relative text-center mb-12 animate-fade-in-up z-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm shadow-sm border border-orange-100 rounded-full px-5 py-2.5 text-orange-600 text-sm font-bold mb-8 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 spring-bounce cursor-default">
          <span className="animate-bounce">🍽</span>
          <span>TheMealDB Explorer</span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          Explore{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-orange-500 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
              Ingredients
            </span>
            {/* Sparkle */}
            <span className="absolute -top-3 -right-6 text-2xl animate-spin-slow">✨</span>
          </span>
        </h1>
        <p className="text-gray-500 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Browse hundreds of ingredients and discover the recipes that use them.
          Click on any ingredient to explore its meals.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto mb-16 z-10 group">
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
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <span className="text-rose-500">🔥</span> Top Categories
            </h2>
            <div className="flex gap-3">
              <button 
                onClick={() => document.getElementById('featured-slider')?.scrollBy({ left: -300, behavior: 'smooth' })}
                className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-200 hover:shadow-orange-500/10 transition-all spring-bounce hover:scale-110">
                ←
              </button>
              <button 
                onClick={() => document.getElementById('featured-slider')?.scrollBy({ left: 300, behavior: 'smooth' })}
                className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-200 hover:shadow-orange-500/10 transition-all spring-bounce hover:scale-110">
                →
              </button>
            </div>
          </div>
          
          {/* Snap scrolling horizontal slider */}
          <div 
            id="featured-slider"
            className="flex overflow-x-auto gap-5 pb-8 pt-2 px-2 snap-x snap-mandatory hide-scrollbar -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredIngredients.map((ing, i) => (
              <div key={`featured-${ing.idIngredient}`} className="snap-start shrink-0 w-[180px] sm:w-[220px]">
                <IngredientCard name={ing.strIngredient} index={i + 10} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Header */}
      {!loading && !error && (
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 px-2 tracking-tight">
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

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
  const [currentPage, setCurrentPage] = useState(1);
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
      setCurrentPage(1); // Reset page on search
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
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedIngredients = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-stagger">
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <IngredientSkeleton key={i} />
            ))
          : paginatedIngredients.map((ing, i) => (
              <IngredientCard
                key={ing.idIngredient}
                name={ing.strIngredient}
                index={i}
              />
            ))}
      </div>

      {/* Pagination Controls */}
      {!loading && !error && filtered.length > ITEMS_PER_PAGE && (
        <div className="mt-12 flex items-center justify-center gap-4 animate-fade-in-up">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-5 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 focus:ring-4 focus:ring-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          
          <div className="text-gray-600 text-sm font-medium">
            Page <span className="text-gray-900">{currentPage}</span> of{" "}
            <span className="text-gray-900">{totalPages}</span>
          </div>
          
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-5 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 focus:ring-4 focus:ring-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

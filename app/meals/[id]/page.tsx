"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchMealDetail, getMealIngredients, getYoutubeEmbedUrl, type MealDetail } from "@/lib/api";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import { DetailSkeleton } from "@/components/SkeletonCard";

export default function MealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const mealId = params.id as string;

  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mealId) return;
    fetchMealDetail(mealId)
      .then((data) => {
        if (!data) setError("Meal not found.");
        else setMeal(data);
      })
      .catch(() => setError("Failed to load meal details."))
      .finally(() => setLoading(false));
  }, [mealId]);

  const youtubeEmbedUrl = meal ? getYoutubeEmbedUrl(meal.strYoutube) : null;
  const ingredients = meal ? getMealIngredients(meal) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
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
        Back
      </button>

      {/* Error */}
      {error && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">😔</div>
          <p className="text-red-400 font-medium mb-2">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && <DetailSkeleton />}

      {/* Content */}
      {meal && !loading && (
        <div className="animate-fade-in-up">
          {/* Image */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-black/50">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
          </div>

          {/* Title & Meta */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {meal.strCategory && (
                <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-medium">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium">
                  🌍 {meal.strArea}
                </span>
              )}
              {meal.strTags &&
                meal.strTags
                  .split(",")
                  .slice(0, 3)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-gray-400 text-xs font-medium"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {meal.strMeal}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Ingredients */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  <span>🧂</span> Ingredients
                </h2>
                <ul className="space-y-2">
                  {ingredients.map(({ ingredient, measure }, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-2 py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-gray-300 text-sm font-medium">
                        {ingredient}
                      </span>
                      <span className="text-orange-400 text-xs text-right shrink-0">
                        {measure}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Instructions + YouTube */}
            <div className="lg:col-span-2 space-y-8">
              {/* Instructions */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  <span>📋</span> Instructions
                </h2>
                <div className="space-y-3">
                  {meal.strInstructions
                    .split(/\r?\n/)
                    .filter((line) => line.trim())
                    .map((line, i) => (
                      <p key={i} className="text-gray-400 text-sm leading-relaxed">
                        {line.trim()}
                      </p>
                    ))}
                </div>
              </div>

              {/* YouTube */}
              {youtubeEmbedUrl && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                    <span>🎬</span> Video Tutorial
                  </h2>
                  <YoutubeEmbed
                    embedUrl={youtubeEmbedUrl}
                    title={meal.strMeal}
                  />
                </div>
              )}

              {/* Source */}
              {meal.strSource && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-gray-400">🔗</span>
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 text-sm transition-colors truncate"
                  >
                    View Original Recipe Source
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

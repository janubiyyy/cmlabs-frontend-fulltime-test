// lib/api.ts - TheMealDB API helpers

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export interface MealThumb {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  [key: string]: string | null | undefined;
}

export async function fetchIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${BASE_URL}/list.php?i=list`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch ingredients");
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealsByIngredient(
  ingredient: string
): Promise<MealThumb[]> {
  const res = await fetch(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch meals");
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealDetail(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch meal detail");
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export function getMealIngredients(
  meal: MealDetail
): { ingredient: string; measure: string }[] {
  const items: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      items.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }
  return items;
}

export function getYoutubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const videoIdMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (!videoIdMatch) return null;
  return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
}

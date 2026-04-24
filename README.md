# MealFinder - CMLABS Frontend Practical Test

A modern, responsive meal discovery application built with **Next.js 15** + **TypeScript** + **Tailwind CSS**, powered by [TheMealDB API](https://www.themealdb.com).

## 🚀 Features

- **Ingredients Page** — Browse 500+ ingredients with real images, animated cards, and front-end search
- **Ingredients Detail Page** — View all meals containing a selected ingredient, with front-end search
- **Meal Detail Page** — Full recipe with image, category/area tags, ingredient list, step-by-step instructions, and embedded YouTube tutorial

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **API**: TheMealDB (public, no key required)
- **Fonts**: Geist (via `next/font`)

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/cmlabs-frontend-fulltime-test.git
cd cmlabs-frontend-fulltime-test

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx               # Root layout with Navbar
│   ├── globals.css              # Global styles + animations
│   ├── page.tsx                 # Ingredients list (home)
│   ├── ingredients/
│   │   └── [name]/page.tsx      # Ingredients detail (meals by ingredient)
│   └── meals/
│       └── [id]/page.tsx        # Meal detail
├── components/
│   ├── Navbar.tsx               # Glassmorphism sticky navbar
│   ├── SearchBar.tsx            # Animated search input
│   ├── IngredientCard.tsx       # Ingredient card with image
│   ├── MealCard.tsx             # Meal card with hover effects
│   ├── SkeletonCard.tsx         # Skeleton loading states
│   └── YoutubeEmbed.tsx         # Click-to-load YouTube embed
└── lib/
    └── api.ts                   # TheMealDB API helpers & types
```

## 🌐 API Endpoints Used

| Endpoint | URL |
|---|---|
| List Ingredients | `themealdb.com/api/json/v1/1/list.php?i=list` |
| Filter by Ingredient | `themealdb.com/api/json/v1/1/filter.php?i={name}` |
| Meal Detail | `themealdb.com/api/json/v1/1/lookup.php?i={id}` |

## 📱 Responsive

Fully responsive for desktop, iPad (tablet), and mobile screens.

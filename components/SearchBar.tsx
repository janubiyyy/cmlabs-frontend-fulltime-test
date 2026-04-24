// components/SearchBar.tsx
"use client";

import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  value?: string;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  value = "",
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`relative flex items-center transition-all duration-300 ${
        focused ? "scale-[1.01]" : ""
      }`}
    >
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
          focused
            ? "bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-sm"
            : ""
        }`}
      />
      <div
        className={`relative flex items-center w-full rounded-xl border transition-all duration-300 bg-white backdrop-blur-sm ${
          focused
            ? "border-orange-400 shadow-lg shadow-orange-500/5"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="pl-4 pr-2 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-2 py-4 text-gray-900 placeholder-gray-400 outline-none text-sm"
        />
        {value && (
          <button
            onClick={() => onSearch("")}
            className="pr-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

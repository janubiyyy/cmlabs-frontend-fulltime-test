// components/YoutubeEmbed.tsx
"use client";

import { useState } from "react";

interface YoutubeEmbedProps {
  embedUrl: string;
  title: string;
}

export default function YoutubeEmbed({ embedUrl, title }: YoutubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-900 border border-white/10 hover:border-red-500/40 transition-all duration-300 group"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-500/40 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
            Watch on YouTube
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-900">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="w-10 h-10 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <iframe
        src={`${embedUrl}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

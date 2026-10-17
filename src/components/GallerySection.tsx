"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Play,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Film,
  Camera,
} from "lucide-react";

interface MediaItem {
  id: string;
  type: "photo" | "video";
  src?: string;
  youtubeId?: string;
  title: string;
  category: "all" | "posters" | "cultural" | "video";
  span?: "normal" | "featured" | "wide";
}

const GALLERY_ITEMS: MediaItem[] = [
  {
    id: "g-video-1",
    type: "video",
    youtubeId: "jYLxR6fRd2A",
    title: "Gajalaxmi Puja Devotional Highlights & Procession",
    category: "video",
    span: "featured",
  },
  {
    id: "g-photo-1",
    type: "photo",
    src: "/images/gallery/gajalaxmi-puja.jpg",
    title: "Maa Gajalaxmi Puja Sacred Sanctum & Procession",
    category: "cultural",
    span: "normal",
  },
  {
    id: "g-video-2",
    type: "video",
    youtubeId: "AbSjnZUZA3g",
    title: "Traditional Odia Folk Dance Troupe Performance",
    category: "video",
    span: "normal",
  },
  {
    id: "g-photo-2",
    type: "photo",
    src: "/images/gallery/odissi-dance.jpg",
    title: "Classical Odissi Cultural Recital on Main Stage",
    category: "cultural",
    span: "wide",
  },
  {
    id: "g-video-3",
    type: "video",
    youtubeId: "OxHcA7Ov2sA",
    title: "Melody Band & Musical Night Live Performance",
    category: "video",
    span: "normal",
  },
  {
    id: "g-photo-3",
    type: "photo",
    src: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop",
    title: "Annual Blood & Organ Donation Camp at Festival Office",
    category: "cultural",
    span: "normal",
  },
  {
    id: "g-photo-4",
    type: "photo",
    src: "/images/gallery/melody-night.jpg",
    title: "Star Melody Night Concert & Live Sound Experience",
    category: "cultural",
    span: "wide",
  },
  {
    id: "g-video-5",
    type: "video",
    youtubeId: "vk2euhGWzKU",
    title: "Pingua Mahotsav Audience Celebrations & Fireworks",
    category: "video",
    span: "normal",
  },
  {
    id: "g-photo-6",
    type: "photo",
    src: "https://img.youtube.com/vi/vk2euhGWzKU/maxresdefault.jpg",
    title: "Grand Evening Illumination & Village Gathering",
    category: "cultural",
    span: "normal",
  },
  {
    id: "g-video-6",
    type: "video",
    youtubeId: "zLbWqWqUmBQ",
    title: "Grand Concluding Festival Immersion Ceremony",
    category: "video",
    span: "featured",
  },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<"all" | "cultural" | "video">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeTab === "all" ? true : item.category === activeTab
  );

  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextLightbox, prevLightbox]);

  const activeMedia = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-28 bg-[#030202] relative text-[#fff7e9] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#dc8513]/30 bg-black/40 text-[#dfd6c4] text-[11px] tracking-[0.25em] uppercase font-medium mb-3">
            <Camera size={13} className="text-[#dc8513]" />
            <span>Festival Gallery & Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-odia text-[#fff7e9] tracking-tight leading-tight">
            ମହୋତ୍ସବ ଝଲକ
          </h2>
          <p className="font-cinzel text-lg sm:text-xl text-[#dc8513] font-semibold tracking-wider uppercase mt-1">
            Visual Highlights & Live Recordings
          </p>
          <p className="mt-3 text-xs sm:text-sm text-[#aea493] font-serif font-light leading-relaxed">
            Witness the divine Gajalaxmi Puja, energetic folk dances, star melody concerts, and celebrations that define Pingua Mahotsav.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: "all", label: "All Highlights (ସମସ୍ତ ଝଲକ)" },
            { id: "cultural", label: "Festival Moments (ଫଟୋଚିତ୍ର)" },
            { id: "video", label: "Live Videos (ଭିଡିଓ)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer ${activeTab === tab.id
                  ? "bg-[#dc8513] text-[#030202] font-bold shadow-lg shadow-[#dc8513]/20"
                  : "bg-white/[0.03] text-[#dfd6c4]/80 hover:text-white hover:bg-white/[0.06] border border-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const isVideo = item.type === "video";
            const thumbnailSrc = isVideo
              ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
              : item.src || "/hero-bg.jpg";

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#09070c] cursor-pointer shadow-xl hover:border-[#dc8513]/50 transition-all duration-300 ${item.span === "featured"
                    ? "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[480px]"
                    : item.span === "wide"
                      ? "sm:col-span-2 aspect-[16/9]"
                      : "aspect-[4/3]"
                  }`}
              >
                <Image
                  src={thumbnailSrc}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Type Indicator Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-bold text-[#cca146]">
                  {isVideo ? <Film size={13} className="text-[#dc8513]" /> : <Camera size={13} />}
                  <span>{isVideo ? "Video Highlight" : "Official Media"}</span>
                </div>

                {/* Central Play Badge for Videos (Isha Saffron Badge) */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#dc8513] text-[#030202] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#ffa735] transition-transform">
                      <Play size={22} className="fill-[#030202] ml-1" />
                    </div>
                  </div>
                )}

                {/* Bottom Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#fff7e9] group-hover:text-[#dc8513] transition-colors drop-shadow">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#dc8513] group-hover:text-[#030202] flex items-center justify-center shrink-0 transition-colors">
                    <ZoomIn size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Video Player Modal */}
      {lightboxIndex !== null && activeMedia && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/15 bg-[#09070c] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Title and Close Button */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#dc8513]" />
                <h3 className="text-sm sm:text-base font-bold text-[#fff7e9]">
                  {activeMedia.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#fff7e9] transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Media Content */}
            <div className="relative aspect-[4/3] sm:aspect-video w-full bg-black">
              {activeMedia.type === "video" && activeMedia.youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeMedia.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={activeMedia.src || "/hero-bg.jpg"}
                  alt={activeMedia.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}
            </div>

            {/* Modal Navigation Footer */}
            <div className="flex items-center justify-between p-4 border-t border-white/10 bg-black/50 text-xs text-[#aea493]">
              <button
                type="button"
                onClick={prevLightbox}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#fff7e9] transition-colors"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span>
                {lightboxIndex + 1} of {filteredItems.length}
              </span>

              <button
                type="button"
                onClick={nextLightbox}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#fff7e9] transition-colors"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

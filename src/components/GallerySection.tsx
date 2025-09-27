"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Play, ZoomIn, Loader2 } from "lucide-react";
import Image from "next/image";

interface MediaItem {
  type: "photo" | "video" | "videolink";
  src?: string;
  key?: string;
  alt?: string;
}

const GallerySection = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [loadingStates, setLoadingStates] = useState<{
    [key: number]: boolean;
  }>({});

  const mediaItems: MediaItem[] = [
    {
      type: "photo",
      src: "image1.jpeg",
      alt: "Cultural performance at Pingua Mahotsav",
    },
    { type: "video", key: "jYLxR6fRd2A", alt: "Highlights from previous year" },
    {
      type: "photo",
      src: "meeting1.jpeg",
      alt: "Team meeting and planning session",
    },
    { type: "photo", src: "meeting3.jpeg", alt: "Event coordination team" },
    { type: "video", key: "AbSjnZUZA3g", alt: "Cultural dance performance" },
    { type: "photo", src: "image4.jpeg", alt: "Audience enjoying the event" },
    { type: "photo", src: "image5.jpeg", alt: "Stage decoration and setup" },
    {
      type: "video",
      key: "OxHcA7Ov2sA",
      alt: "Musical performance highlights",
    },
    {
      type: "photo",
      src: "meeting2.jpeg",
      alt: "Organizational team discussion",
    },
    { type: "photo", src: "meeting.jpeg", alt: "Volunteers coordination" },
    { type: "video", key: "Ex3fE1wGBS8", alt: "Traditional dance showcase" },
    { type: "photo", src: "image8.jpeg", alt: "Colorful event decorations" },
    {
      type: "video",
      key: "vk2euhGWzKU",
      alt: "Audience participation moments",
    },
    { type: "photo", src: "image9.jpeg", alt: "Stage performance action shot" },
    {
      type: "photo",
      src: "meeting4.jpeg",
      alt: "Planning and strategy session",
    },
    { type: "video", key: "W2YxlLvdHDI", alt: "Cultural event highlights" },
    { type: "photo", src: "meeting5.jpeg", alt: "Team celebration moment" },
    { type: "video", key: "zLbWqWqUmBQ", alt: "Finale performance" },
  ];

  const handleImageLoad = (index: number) => {
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
    console.error(`Failed to load image: ${mediaItems[index].src}`);
  };

  const openModal = (item: MediaItem, _: number) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent,
    item: MediaItem,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(item, index);
    }
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-orange-50 to-red-50 relative"
      id="gallery"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-orange-100/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery from Previous Years
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Relive the vibrant moments from our previous celebrations through
            photos and videos that capture the essence of Pingua Mahotsav.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaItems.map((item, index) => (
            <Card
              key={index}
              className="relative p-0 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl group transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-white"
              onClick={() => openModal(item, index)}
              onKeyDown={(e) => handleKeyPress(e, item, index)}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.type === "photo" ? "image" : "video"} ${
                item.alt
              }`}
            >
              {/* Loading State */}
              {item.type === "photo" && !loadingStates[index] && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
                </div>
              )}

              {/* Media Content */}
              {item.type === "photo" ? (
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={`https://storage.googleapis.com/pingua-mahotsav/${item.src}`}
                    alt={item.alt || `Gallery image ${index + 1}`}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <ZoomIn className="absolute top-3 right-3 h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
              ) : item.type === "videolink" ? (
                <div className="relative w-full h-64 overflow-hidden rounded-xl">
                  <video
                    className="w-full h-64 object-cover rounded-xl"
                    src={item.src}
                    controls
                    autoPlay
                    muted
                    loop
                    aria-label={item.alt}
                  />
                </div>
              ) : (
                <div className="relative w-full h-64 overflow-hidden rounded-xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.key}?autoplay=0&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                    title={`YouTube video: ${item.alt}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/40 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white fill-current" />
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay with description */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium truncate">
                  {item.alt}
                </p>
                <span className="text-orange-300 text-xs capitalize">
                  {item.type}
                </span>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-200/20 to-red-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {/* <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Load More Memories
          </button>
        </div> */}
      </div>

      {/* Modal for enlarged view */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-2xl z-10 hover:text-orange-400 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="bg-white rounded-xl overflow-hidden">
              {selectedMedia.type === "photo" ? (
                <Image
                  src={`https://storage.googleapis.com/pingua-mahotsav/${selectedMedia.src}`}
                  alt={selectedMedia.alt || "Enlarged gallery view"}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              ) : selectedMedia.type === "videolink" ? (
                <video
                  className="w-full h-96 object-cover"
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  muted
                />
              ) : (
                <iframe
                  className="w-full h-96"
                  src={`https://www.youtube.com/embed/${selectedMedia.key}?autoplay=1`}
                  title={`YouTube video: ${selectedMedia.alt}`}
                  allowFullScreen
                />
              )}
            </div>

            {selectedMedia.alt && (
              <p className="text-white text-center mt-4 text-lg">
                {selectedMedia.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;

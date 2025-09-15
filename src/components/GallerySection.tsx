"use client";
import React from "react";
import { Card } from "./ui/card";
import { Play } from "lucide-react";
import Image from "next/image";

const GallerySection = () => {
  const mediaItems = [
    { type: "photo", src: "image1.jpeg" },
    { type: "video", key: "jYLxR6fRd2A" },
    // { type: "photo", src: "image2.jpeg" },
    { type: "photo", src: "meeting1.jpeg" },
    { type: "photo", src: "meeting3.jpeg" },
    { type: "video", key: "AbSjnZUZA3g" },
    { type: "photo", src: "image4.jpeg" },
    // { type: "photo", src: "image3.jpeg" },
    { type: "photo", src: "image5.jpeg" },
    // {
    //   type: "videolink",
    //   src: "https://storage.googleapis.com/pingua-mahotsav/video1.mp4",
    // },
    // { type: "photo", src: "image7.jpeg" },
    { type: "video", key: "OxHcA7Ov2sA" },
    { type: "photo", src: "meeting2.jpeg" },
    { type: "photo", src: "meeting.jpeg" },
    // { type: "photo", src: "image7.jpeg" },
    { type: "video", key: "Ex3fE1wGBS8" },
    { type: "photo", src: "image8.jpeg" },
    { type: "video", key: "vk2euhGWzKU" },
    { type: "photo", src: "image9.jpeg" },
    { type: "photo", src: "meeting4.jpeg" },
    { type: "video", key: "W2YxlLvdHDI" },
    { type: "photo", src: "meeting5.jpeg" },
    { type: "video", key: "zLbWqWqUmBQ" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-100/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Gallery from Previous Years
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Relive the vibrant moments from our previous celebrations through
            photos and videos.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item, index) => (
            <Card
              key={index}
              className="relative p-0 overflow-hidden rounded-xl shadow-md hover:shadow-xl group transition-all"
            >
              {item.type === "photo" ? (
                <Image
                  src={`https://storage.googleapis.com/pingua-mahotsav/${item.src}`}
                  alt={`Gallery ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform"
                />
              ) : item.type === "videolink" ? (
                <video
                  className="w-full h-64 object-cover rounded-xl"
                  src={item.src}
                  controls
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <div className="relative w-full h-64 overflow-hidden rounded-xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${item.key}`}
                    title="YouTube video"
                    allow="autoplay; fullscreen"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Play className="h-12 w-12 text-white opacity-80" />
                  </div>
                </div>
              )}

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-200/20 to-red-200/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

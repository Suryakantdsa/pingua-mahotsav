"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const OrganizerVoice = () => {
  const organizers = [
    {
      name: "Shri Ranjan Sahoo",
      position: "Festival President",
      message:
        "ଆମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପିଢ଼ୀ ପିଢ଼ୀ ଧରି ଚାଲିଆସିଥିବା ସମୃଦ୍ଧ ସାଂସ୍କୃତିକ ଐତିହ୍ୟର ପ୍ରତିକ। ଏହି ମହୋତ୍ସବ ଆମର ସମସ୍ତଙ୍କୁ ଏକତ୍ର କରେ, ଆମ ପାରମ୍ପରିକତା ଓ ମୂଲ୍ୟବୋଧକୁ ଉଦ୍ଜାପନ କରିବାରେ।",
      image: "https://storage.googleapis.com/pingua-mahotsav/precient.png",
    },
    {
      name: "Shri Ranjan Kumar Sahoo",
      position: "Festival Secretary",
      message:
        "ପ୍ରତିବର୍ଷ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ସମୟରେ ଆମ ଗାଁର ସତ୍ୟିକର ମାୟାକୁ ଆମେ ଦେଖୁଥାଉ। ଏହା ଆମର ଏକତା ଓ ସୁନ୍ଦର ପାରମ୍ପରିକତାର ସୁରକ୍ଷାର ପ୍ରତିକ।",
      image: "https://storage.googleapis.com/pingua-mahotsav/secectrary.png",
    },
    {
      name: "Shri Niranajan sahoo",
      position: "Treasurer & Planning Head",
      message:
        "Every year, we witness the magic of our village coming alive during Pingua Mahotsav. It's a testament to our unity and the preservation of our beautiful traditions.",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    },
  ];

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 2, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 32 },
        },
      },
    },
    [
      // Autoplay plugin
      (slider) => {
        let timeout: NodeJS.Timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 1200); // 10s
        }

        slider.on("created", () => {
          slider.container.addEventListener("click", () => {
            clearTimeout(timeout); // stop on click
          });
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <section
      id="organizers"
      className="py-20 bg-gradient-to-b from-white to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Organizers&rsquo; Voice
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Words of inspiration and dedication from our guiding team
          </p>
        </div>

        {/* Carousel */}
        <div ref={sliderRef} className="keen-slider">
          {organizers.map((organizer, index) => (
            <div className="keen-slider__slide" key={index}>
              <Card className="text-center shadow-md hover:shadow-2xl transition-shadow rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-col items-center">
                  <Image
                    src={organizer.image}
                    alt={organizer.name}
                    width={200}
                    height={200}
                    className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-orange-200 shadow-md"
                  />
                  <CardTitle className="text-lg font-semibold text-orange-800">
                    {organizer.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="mt-2 border-orange-500 text-orange-600 text-xs px-3 py-1 rounded-full"
                  >
                    {organizer.position}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic leading-relaxed text-sm">
                    “{organizer.message}”
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizerVoice;

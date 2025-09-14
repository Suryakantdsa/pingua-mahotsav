import React from "react";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { AnimatedTooltipPreview } from "./AnimatedTooltipPreview";

const DeveloperInfo = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Special Thanks
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Honoring our dedicated contributors who made this event possible
          </p>
        </div>

        {/* Rising Star Club Special Mention */}
        <Card className="relative max-w-5xl mx-auto mb-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 text-white rounded-3xl shadow-2xl border border-indigo-400/30 overflow-hidden">
          <CardContent className="p-10 text-center relative z-10">
            {/* Title Section */}
            <div className="flex items-center justify-center mb-8">
              <Star className="h-12 w-12 text-yellow-400 drop-shadow-lg animate-bounce mr-4" />
              <div>
                <h3 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-wide">
                  Rising Star Club
                </h3>
                <p className="text-lg sm:text-xl text-indigo-100 font-medium">
                  2012 Batch · Pingua High School
                </p>
              </div>
              <Star className="h-12 w-12 text-yellow-400 drop-shadow-lg animate-bounce ml-4" />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-indigo-100/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              This website is proudly{" "}
              <span className="font-semibold text-yellow-300">
                sponsored by Rising Star Club
              </span>{" "}
              to bring{" "}
              <span className="font-semibold underline decoration-yellow-400/60">
                Pingua Mahotsav
              </span>{" "}
              online for the first time — preserving our{" "}
              <span className="italic text-yellow-200">culture</span> and{" "}
              <span className="italic text-yellow-200">heritage</span> in the
              digital era.
            </p>

            {/* Members Section */}
            <div className="mb-4">
              <p className="text-xl sm:text-2xl font-bold text-yellow-300 drop-shadow mb-6">
                ❤️ Meet the Champions Behind This Initiative
              </p>
              <AnimatedTooltipPreview />
            </div>
          </CardContent>
        </Card>

        {/* Developer Profile */}
        <div className="flex justify-center items-center ">
          <Card className="w-full max-w-3xl h-35 sm:h-28 shadow-lg rounded-3xl border border-gray-200 hover:scale-105 hover:shadow-2xl transition-transform duration-300 bg-white/70 backdrop-blur-md overflow-hidden relative ">
            <CardContent className="p-4 flex items-center gap-5">
              {/* Profile Image */}
              <div className="relative flex-shrink-0 ">
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                  alt="Suryakant Das"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-300 shadow-md"
                />
                <span className="absolute bottom-1 right-1 block w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
              </div>

              {/* Name, Role & Description */}
              <div className="flex flex-col justify-center ">
                <h4 className="text-lg font-bold text-gray-900">
                  Suryakant Das
                </h4>
                <p className="text-sm text-gray-600">Software Developer</p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">
                  Member of{" "}
                  <span className="font-medium">Rising Star Club</span>, 2012
                  Batch · Pingua High School
                  <br />
                  <span className="text-orange-600 font-semibold">
                    Developer of Pingua Mahotsav 2025 Website
                  </span>
                </p>
              </div>

              {/* Optional subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/30 pointer-events-none rounded-3xl" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DeveloperInfo;

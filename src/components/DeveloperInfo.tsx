import React from "react";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";

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
        <Card className="relative max-w-5xl mx-auto mb-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-2xl border border-indigo-300/40 overflow-hidden">
          <CardContent className="p-10 text-center relative z-10">
            <div className="flex items-center justify-center mb-8">
              <Star className="h-12 w-12 text-yellow-300 drop-shadow mr-4" />
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-2">
                  Rising Star Club
                </h3>
                <p className="text-lg sm:text-xl text-blue-100">
                  2012 Batch · Pingua High School
                </p>
              </div>
              <Star className="h-12 w-12 text-yellow-300 drop-shadow ml-4" />
            </div>
            <p className="text-base sm:text-lg text-blue-100/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              This website is proudly{" "}
              <span className="font-semibold text-yellow-300">
                sponsored by Rising Star Club
              </span>{" "}
              to bring{" "}
              <span className="underline decoration-yellow-300/60">
                Pingua Mahotsav
              </span>{" "}
              online for the first time, helping preserve our village’s culture
              and heritage in the digital era.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge
                variant="outline"
                className="border-yellow-300 text-yellow-300 text-base px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                🌐 Website Sponsor
              </Badge>
              <Badge
                variant="outline"
                className="border-yellow-300 text-yellow-300 text-base px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                🤝 Community Leaders
              </Badge>
              <Badge
                variant="outline"
                className="border-yellow-300 text-yellow-300 text-base px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                🎭 Cultural Preservers
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Developer Profile */}
        <div className="flex justify-center items-center">
          <Card className="max-w-xs w-full shadow-lg rounded-2xl border border-gray-200 hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative">
                <Image
                  src={
                    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                  }
                  alt="Suryakant Das"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-4 border-orange-200 shadow-md"
                />
                <span className="absolute bottom-2 right-2 block w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              {/* Name & Role */}
              <h4 className="mt-4 text-lg font-bold text-gray-900">
                Suryakant Das
              </h4>
              <p className="text-xs text-gray-600">Full Stack Developer</p>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Member of <span className="font-medium">Rising Star Club</span>,
                2012 Batch · Pingua High School
                <br />
                <span className="text-orange-600 font-semibold">
                  Developer of Pingua Mahotsav 2025 Website
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DeveloperInfo;

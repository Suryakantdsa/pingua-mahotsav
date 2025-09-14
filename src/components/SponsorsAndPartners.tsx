"use client";
import React from "react";
import { Button } from "./ui/button";
import { Award, HeartHandshake, Users } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useFormStore } from "@/store/useFormStore";

const SponsorsAndPartners = () => {
  const sponsors = [
    {
      name: "Village Development Committee",
      type: "Main Organizer",
      icon: <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />,
    },
    {
      name: "Rising Star Club, 2012 Batch, Pingua High School",
      type: "Website Sponsor",
      icon: <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />,
    },

    {
      name: "All Ganesh Puja Club Members",
      type: "Volunteer Support",
      icon: (
        <HeartHandshake className="h-12 w-12 text-green-500 mx-auto mb-4" />
      ),
    },
  ];

  const { setShowSponsorForm } = useFormStore();

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-100/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Partners & Sponsors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            With heartfelt gratitude, we thank our partners whose support makes{" "}
            <span className="font-semibold text-orange-600">
              Pingua Mahotsav
            </span>{" "}
            a celebration to remember.
          </p>
          <Button
            onClick={() => setShowSponsorForm(true)}
            className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
          >
            <Award className="mr-2 h-5 w-5" />
            Become a Sponsor
          </Button>
        </div>

        {/* Sponsor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsors.map((sponsor, index) => (
            <Card
              key={index}
              className="relative text-center p-6 border-2 border-transparent bg-white rounded-xl shadow-md hover:shadow-xl hover:border-orange-300 transition-all group"
            >
              {/* Icon */}
              <div className="group-hover:scale-110 transition-transform">
                {sponsor.icon}
              </div>

              {/* Name */}
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {sponsor.name}
              </h3>

              {/* Type */}
              <Badge
                variant="outline"
                className="border-orange-500 text-orange-700"
              >
                {sponsor.type}
              </Badge>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-200/20 to-red-200/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsAndPartners;

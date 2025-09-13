"use client";
import React from "react";
import { Button } from "./ui/button";
import { Award } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useFormStore } from "@/store/useFormStore";

const SponsorsAndPartners = () => {
  const sponsors = [
    { name: "Village Development Committee", type: "Main Organizer" },
    {
      name: "Rising Star Club, 2012 Batch, Pingua High School",
      type: "Website Sponsor",
    },
    { name: "Gopinath Industries", type: "Platinum Sponsor" },
    { name: "Mahalaxmi Traders", type: "Gold Sponsor" },
    { name: "Shree Jagannath Medical Store", type: "Healthcare Partner" },
    { name: "Odisha Cultural Association", type: "Cultural Partner" },
    { name: "Local Youth Club", type: "Volunteer Support" },
  ];

  const { setShowSponsorForm } = useFormStore();
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Partners & Sponsors
          </h2>
          <p className="text-xl text-gray-600">
            Thank you for making this festival possible
          </p>
          <Button
            onClick={() => setShowSponsorForm(true)}
            className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-full"
          >
            <Award className="mr-2 h-5 w-5" />
            Become a Sponsor
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow"
            >
              <Award className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {sponsor.name}
              </h3>
              <Badge
                variant="outline"
                className="border-orange-500 text-orange-700"
              >
                {sponsor.type}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsAndPartners;

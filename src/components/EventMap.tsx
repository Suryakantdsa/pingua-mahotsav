"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Guitar, ParkingCircle, HospitalIcon, Shield } from "lucide-react";
import Image from "next/image";

const EventMap = () => {
  const [active, setActive] = useState<string | null>(null);

  const facilities = [
    {
      id: "stage",
      name: "Main Stage",
      icon: <Guitar className="h-4 w-4 sm:h-6 sm:w-6" />, // 🎤 Better stage/music icon
      color: "bg-orange-500",
      top: "36%",
      left: "61%",
    },
    {
      id: "parking",
      name: "Parking Area",
      icon: <ParkingCircle className="h-4 w-4 sm:h-6 sm:w-6" />, // 🅿 Parking symbol
      color: "bg-blue-500",
      top: "10%",
      left: "60%",
    },
    {
      id: "medical",
      name: "Medical Camp",
      icon: <HospitalIcon className="h-4 w-4 sm:h-6 sm:w-6" />, // ⛑ First Aid box
      color: "bg-red-500",
      top: "30%",
      left: "40%",
    },
    {
      id: "police",
      name: "Police Camp",
      icon: <Shield className="h-4 w-4 sm:h-6 sm:w-6" />, // 🛡 Police/security shield
      color: "bg-green-500",
      top: "70%",
      left: "35%",
    },
  ];

  return (
    <section id="map" className=" bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Venue Map & Facilities
          </h2>
          <p className="text-xl text-gray-600">
            Navigate the festival grounds with ease
          </p>
        </div>

        {/* Interactive Map */}
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="https://storage.googleapis.com/pingua-mahotsav/map.png"
                alt="Festival Venue Map"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />

              {/* Facility Markers */}
              {facilities.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setActive(f.id === active ? null : f.id)}
                  className={`absolute ${f.color} text-white p-2 rounded-full cursor-pointer shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition`}
                  style={{ top: f.top, left: f.left }}
                  title={f.name}
                >
                  {f.icon}
                  {/* Tooltip */}
                  {active === f.id && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded shadow">
                      {f.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Facility Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {facilities.map((f) => (
            <Card
              key={f.id}
              className="text-center p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() => setActive(f.id)}
            >
              <div
                className={`${f.color} w-10 h-10 flex items-center justify-center rounded-full mx-auto mb-2 text-white`}
              >
                {f.icon}
              </div>
              <p className="font-semibold text-gray-800">{f.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventMap;

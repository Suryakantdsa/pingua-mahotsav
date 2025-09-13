import React from "react";
import { Card, CardContent } from "./ui/card";
import { Music, Heart, MapPin, Users } from "lucide-react";
const EventMap = () => {
  return (
    <section
      id="map"
      className="py-20 bg-gradient-to-br from-orange-50 to-red-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Venue Map & Facilities
          </h2>
          <p className="text-xl text-gray-600">
            Navigate the festival grounds with ease
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-96 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">Festival Venue Map</p>
                <p className="text-sm text-gray-500">
                  Interactive map will be available here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="text-center p-4 hover:bg-orange-50 transition-colors">
            <Music className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-800">Main Stage</p>
          </Card>
          <Card className="text-center p-4 hover:bg-blue-50 transition-colors">
            <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-800">Parking Area</p>
          </Card>
          <Card className="text-center p-4 hover:bg-red-50 transition-colors">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-800">Medical Camp</p>
          </Card>
          <Card className="text-center p-4 hover:bg-green-50 transition-colors">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-800">Police Camp</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventMap;

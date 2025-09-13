import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";

const OrganizerVoice = () => {
  const organizers = [
    {
      name: "Shri Niranjan Sahoo",
      position: "Festival President",
      message:
        "Our Pingua Mahotsav represents the rich cultural heritage that has been passed down through generations. This festival brings our community together in celebration of our traditions and values.",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    },
    {
      name: "Shri Ashish Kumar Sahoo",
      position: "Festival Secretary",
      message:
        "Every year, we witness the magic of our village coming alive during Pingua Mahotsav. It's a testament to our unity and the preservation of our beautiful traditions.",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    },
    {
      name: "Shri Prakash Panda",
      position: "Cultural Coordinator",
      message:
        "The cultural programs during our festival showcase the diverse talents within our community and inspire the younger generation to embrace our heritage.",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    },
  ];

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
            Words of inspiration from our dedicated team
          </p>
        </div>

        {/* Organizer Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {organizers.map((organizer, index) => (
            <Card
              key={index}
              className="text-center shadow-md hover:shadow-xl transition-shadow rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-col items-center">
                <Image
                  src={organizer.image}
                  alt={organizer.name}
                  width={96}
                  height={96}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizerVoice;

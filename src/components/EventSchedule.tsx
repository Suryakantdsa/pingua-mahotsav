"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useFormStore } from "@/store/useFormStore";

const EventSchedule = () => {
  const events = [
    {
      date: "06-10-2025",
      day: "Monday",
      time: "8:00 AM",
      event: "Jyoti Parikrama (Circumambulation of Light)",
      description:
        "Traditional lighting ceremony marking the beginning of our sacred festival",
    },
    {
      date: "07-10-2025",
      day: "Tuesday",
      time: "9:00 AM",
      event: "Blood Donation Camp",
      description: "Serve humanity through the gift of life",
      hasForm: true,
    },
    {
      date: "07-10-2025",
      day: "Tuesday",
      time: "6:00 PM",
      event: "Odishi Dance by Saraswati Kala Niketan",
      description: "Classical dance performance from Jajpur Road",
    },
    {
      date: "08-10-2025",
      day: "Wed",
      time: "7:00 PM",
      event: "Adibasi Dance",
      description: "Traditional tribal dance by dance group from Gothataila",
    },
    {
      date: "09-10-2025",
      day: "Thursday",
      time: "7:00 PM",
      event: "Cultural Program by Village Prativa",
      description: "Local talent showcase featuring our village artists",
    },
    {
      date: "10-10-2025",
      day: "Friday",
      time: "7:00 PM",
      event: "Cultural Program by Village Prativa",
      description: "Continued celebration of our local cultural heritage",
    },
    {
      date: "11-10-2025",
      day: "Saturday",
      time: "6:30 PM",
      event: "Dance Performance by The Dance Group, Cuttack",
      description: "Professional dance troupe from Cuttack",
    },
    {
      date: "12-10-2025",
      day: "Sunday",
      time: "10:00 AM",
      event: "Village Combined Laxmi Bisarjajan",
      description: "Grand finale - Community immersion ceremony",
    },
  ];
  const { setShowBloodDonationForm } = useFormStore();

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Festival Events & Schedule
          </h2>
          <p className="text-xl text-gray-600">
            7 Days of Cultural Celebration
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="overflow-hidden border-l-4 border-l-orange-500 hover:shadow-xl transition-all"
            >
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <Badge
                      variant="outline"
                      className="border-orange-500 text-orange-700"
                    >
                      {event.date}
                    </Badge>
                    <Badge variant="secondary">{event.day}</Badge>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </div>
                  </div>
                  {event.hasForm && (
                    <Button
                      onClick={() => setShowBloodDonationForm(true)}
                      variant="outline"
                      className="flex items-center border-red-500 text-white bg-white hover:bg-red-50 duration-300 focus:ring-2 focus:ring-red-300  text-base sm:text-xl rounded-full bg-gradient-to-r from-pink-600 to-red-500 transition-all transform hover:scale-105 shadow-2xl animate-pulse px-4 py-2 cursor-pointer"
                    >
                      <Heart className="h-4 w-4 mr-2 text-white" />
                      Register to Donate
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl text-orange-800">
                  {event.event}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {event.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;

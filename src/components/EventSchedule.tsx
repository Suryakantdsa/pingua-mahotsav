"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
const EventSchedule = () => {
  const [activeDay, setActiveDay] = useState<string>("06-10-2025");
  // const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const { setShowBloodDonationForm, setShowParticipationForm } = useFormStore();

  // Your existing events data
  /* eslint-disable */
  const events: any[] = [
    {
      date: "06-10-2025",
      day: "Monday",
      time: "8:00 AM",
      event: "Jyoti Parikrama (Circumambulation of Light)",
      description:
        "Traditional lighting ceremony marking the beginning of our sacred festival",
      type: "opening",
      duration: "2 hour",
      location: "Main Festival Ground",
    },
    {
      date: "07-10-2025",
      day: "Tuesday",
      time: "9:00 AM - 2:00 PM",
      event: "Blood Donation Camp",
      description:
        "Serve humanity through the gift of life - A noble initiative for community welfare",
      type: "social",
      duration: "5 hours",
      location: "Community Health Center",
      hasForm: true,
      targetDonors: 100,
      organizer: "Red Cross Society",
    },
    {
      date: "07-10-2025",
      day: "Tuesday",
      time: "6:00 PM",
      event: "Odishi Dance by Saraswati Kala Niketan",
      description:
        "Classical dance performance showcasing the rich heritage of Odisha from Jajpur Road",
      type: "cultural",
      duration: "2 hours",
      location: "Main Stage",
      guests: {
        mukhyaAtithi: {
          name: "ଶ୍ରୀଯୁକ୍ତ କୃଷ୍ଣଚନ୍ଦ୍ର ପାତ୍ର",
          role: "ମୁଖ୍ୟ ଅତିଥି",
          position:
            "ମାନ୍ୟବର ମନ୍ତ୍ରୀ, ଖାଦ୍ୟଯୋଗାଣ, ଖାଉଟି କଲ୍ୟାଣ ଓ ପ୍ରଯୁକ୍ତି ବିଜ୍ଞାନ, ଓଡିଶା ସରକାର",
          photo: "../assets/mla_sir.jpg",
        },
        mukhyaBakta: {
          name: "ଶ୍ରୀଯୁକ୍ତ ରୁଦ୍ର ନାରାୟଣ ପାଣୀ",
          role: "ମୁଖ୍ୟ ବକ୍ତା",
          position: "ମାନ୍ୟବର ସାଂସଦ, ଢେଙ୍କାନାଳ",
        },
        sammanitaAtithi: [
          {
            name: "ଶ୍ରୀମତୀ ରିନା ରାଣୀ ଖଟୁଆ",
            position: "ଅଣକ୍ଷା ପଞ୍ଚାୟତ ସମିତି, ଗଁଦିଆ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ରାମଚନ୍ଦ୍ର ପାତ୍ର",
            position: "ଉପସଭାପତି ବିଜେପି କୃଷକ ମୋର୍ଚ୍ଚା, ଓଡିଶା",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ପବିତ୍ର ରଂଜନ ମହାଳିକ",
            position: "ସରପଞ୍ଚ, ପିଙ୍ଗୁଆ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ଶ୍ରୀନିବାସ ସାହୁ",
            position: "ସମିତି ସଭ୍ୟ, ପିଙ୍ଗୁଆ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ରତିକାନ୍ତ ସାହୁ",
            position: "ଗଁଦିଆ ବ୍ଳକ ପ୍ରତିନିଧ୍ବ, ବିଧାୟିକ, ଢେଙ୍କାନାଳ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ଆନନ୍ଦଚନ୍ଦ୍ର ସାହୁ",
            position: "ବିଜେପି ମଣ୍ଡଳ ସଭାପତି, ନିହଳପ୍ରସାଦ",
          },
        ],
      },
      performers: "ସରସ୍ବତୀ କଳାନିକେତନ ଟ୍ରୁପ (25 ଶିଳ୍ପୀ, ଯାଜପୁର ରୋଡ଼)",
      specialNote: "ମଙ୍ଗଳାଚରଣ ଏବଂ ପଲ୍ଲଭୀ ପ୍ରଦର୍ଶନ",
    },
    {
      date: "08-10-2025",
      day: "Wednesday",
      time: "6:00 PM",
      event: "Adibasi Dance Performance",
      description:
        "Traditional tribal dance showcasing the vibrant culture of indigenous communities",
      type: "cultural",
      duration: "2 hours",
      location: "Tribal Cultural Pavilion",
      guests: {
        mukhyaAtithi: {
          name: "ଶ୍ରୀଯୁକ୍ତ ପବିତ୍ର ରଞ୍ଜନ ବେହେରା",
          role: "ମୁଖ୍ୟ ଅତିଥି",
          position: "ବି.ଡି.ଓ, ଗଁଦିଆ",
        },
        sammanitaAtithi: [
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ସତ୍ୟଜିତ ମହାପାତ୍ର",
            position: "ତହସିଲଦାର, ଗଁଦିଆ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ଧୂରେନ୍ଦ୍ର କୁମାର ସ୍ମାଇଁ",
            position: "ଆଇ.ଆଇ.ସି, ନିହଳପ୍ରସାଦ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ରାମ ନାରାୟଣ ରାଉତ",
            position: "ଅଧ୍ୟାପକ, ପିଙ୍ଗୁଆ ଡିଗ୍ରୀ କଲେଜ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ରାମକୃଷ୍ଣ ଦାଶ",
            position:
              "Founder - Waldenwoods Foundation, Kantamalia, Khankira, Dhenkanal",
          },
        ],
      },
      performers: "ଗୋଠତଇଲା ନୃତ୍ୟ ଗୋଷ୍ଠୀ",
      specialNote: "ଆଦିବାସୀ ସାଜପୋଶାକ ଏବଂ ସାମ୍ପ୍ରଦାୟିକ ଓଡିଆ ବାଦ୍ୟ",
    },
    {
      date: "09-10-2025",
      day: "Thursday",
      time: "6:00 PM",
      event: "Cultural Program by Village Prativa",
      description: "Local talent showcase featuring our village artists",
      type: "local",
      duration: "3 hours",
      location: "Community Stage",
      guests: {
        sammanitaAtithi: [
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ସୁଧୀର କୁମାର ସାମଲ",
            position: "ପୂର୍ବତନ ବିଧାୟକ, ଢେଙ୍କାନାଳ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ନବୀନ ନନ୍ଦ",
            position: "ପୂର୍ବତନ ବିଧାୟକ, ଢେଙ୍କାନାଳ",
          },
          {
            name: "ଶ୍ରୀମତୀ ଅର୍ଜନା ପୁହାଣ",
            position: "ଜିଲ୍ଲାପରିଷଦ ସଦସ୍ୟ, ଢେଙ୍କାନାଳ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ବିଭୂତି ଭୂଷଣ ଭୋଇ",
            position: "ଜିଲ୍ଲାପରିଷଦ ସଭ୍ୟ, କୋନ-୪",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ଶୁଭେନ୍ଦୁ ସାହୁ",
            position: "ସମାଜସେବୀ, ଭୁବନ",
          },
        ],
      },
      categories: ["Folk Dance", "Local Music", "Drama", "Poetry Recitation"],
      participationOpen: true,
    },
    {
      date: "10-10-2025",
      day: "Friday",
      time: "6:00 PM",
      event: "Cultural Program by Village Prativa - Day 2",
      description: "Continuation of village cultural program",
      type: "local",
      duration: "3 hours",
      location: "Community Stage",
      guests: {
        mukhyaAtithi: {
          name: "ଶ୍ରୀଯୁକ୍ତ କୈଳାସ ଚନ୍ଦ୍ର ନାୟକ",
          role: "ମୁଖ୍ୟ ଅତିଥି",
          position: "ଅବସରପ୍ରାପ୍ତ ଶିକ୍ଷକ ଓ ସମାଜ ସେବୀ",
        },
        mukhyaBakta: {
          name: "ଶ୍ରୀଯୁକ୍ତ କୈଳାସ ଚନ୍ଦ୍ର ସାହୁ",
          role: "ମୁଖ୍ୟ ବକ୍ତା",
          position: "ଅବସରପ୍ରାପ୍ତ ବି.ଇ.ଓ, ହିନ୍ଦୋଳ",
        },
        sammanitaAtithi: [
          { name: "ଶ୍ରୀଯୁକ୍ତ ସନାତନ ସାହୁ", position: "ସଭାପତି, ପିଙ୍ଗୁଆ" },
          { name: "ଶ୍ରୀଯୁକ୍ତ ଗୋପାଳଚନ୍ଦ୍ର ମହାଳିକ", position: "ଗ୍ରାମ୍ୟ କମିଟି" },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ଚିନ୍ମୟ ପ୍ରଧାନ",
            position: "ଅବସରପ୍ରାପ୍ତ ସାମରିକ ଅଧିକାରୀ",
          },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ଦିଗାମ୍ବର ସାହୁ",
            position: "ଅବସରପ୍ରାପ୍ତ ସଚିବ, ଓଡିଶା ସରକାର",
          },
          { name: "ଶ୍ରୀଯୁକ୍ତ ଗୋପିନାଥ ମହାଳିକ", position: "ଅବସରପ୍ରାପ୍ତ ଶିକ୍ଷକ" },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ସୁଧୂର କୁମାର ସାହୁ",
            position: "ପୂର୍ବତନ ସରପଞ୍ଚ, ପିଙ୍ଗୁଆ",
          },
        ],
      },
      categories: ["Skit", "Songs", "Folk Drama"],
    },
    {
      date: "11-10-2025",
      day: "Saturday",
      time: "6:00 PM",
      event: "Dance Performance by The Kiss Dancer Group, Cuttack",
      description: "Professional dance troupe presenting a fusion program",
      type: "professional",
      duration: "2.5 hours",
      location: "Main Stage",
      guests: {
        sammanitaAtithi: [
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ କୁମାର ସାହୁ",
            position: "ସଭାପତି, ମହୋତ୍ସବ ପରିବାର",
          },
          { name: "ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ ସାହୁ", position: "ସମ୍ପାଦକ, ମହୋତ୍ସବ ପରିବାର" },
          {
            name: "ଶ୍ରୀଯୁକ୍ତ ଅମରେନ୍ଦ୍ର ପ୍ରସାଦ ମହାଳିକ",
            position: "ଦ୍ରବ୍ୟ ଓ ସେବାକର ଉପ-ଆୟୁକ୍ତ, କେନ୍ଦ୍ରାପଡ଼ା",
          },
        ],
      },
      performers: "The Kiss Dancer Group, Cuttack",
    },
  ];

  // Get unique dates for day tabs with proper ordering
  const uniqueDates = Array.from(
    new Set(events.map((event) => event.date))
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Get events for active day
  const dayEvents = events.filter((event) => event.date === activeDay);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "opening":
        return "🎉";
      case "closing":
        return "🏁";
      case "social":
        return "❤️";
      case "cultural":
        return "💃";
      case "local":
        return "🏠";
      case "professional":
        return "⭐";
      default:
        return "📅";
    }
  };

  return (
    <div className="event-schedule bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Event Schedule
        </h2>
        <p className="text-gray-600">Explore daily events and special guests</p>
      </div>

      {/* Enhanced Day Navigation */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {uniqueDates.map((date) => {
          const event = events.find((e) => e.date === date);
          const eventCount = events.filter((e) => e.date === date).length;
          return (
            <motion.button
              key={date}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDay(date)}
              className={`px-5 py-3 rounded-xl font-semibold transition-all relative min-w-[120px] ${
                activeDay === date
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm">{event?.day.split(" ")[0]}</span>
                <span className="text-xs opacity-80">{date.split("-")[0]}</span>
                <span
                  className={`absolute -top-2 -right-2 text-xs px-2 py-1 rounded-full ${
                    activeDay === date
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {eventCount}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Current Day Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {events.find((e) => e.date === activeDay)?.day}, {activeDay}
        </h3>
        <p className="text-gray-600">
          {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""} scheduled
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className={`grid gap-4 md:grid-cols-1 `}>
        <AnimatePresence mode="wait">
          {dayEvents.map((event, index) => (
            <motion.div
              key={`${event.date}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2  transition-all duration-300 `}
            >
              {/* Event Header */}
              <div
                className={`p-5 cursor-pointer ${
                  event.type === "opening"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : event.type === "closing"
                    ? "bg-gradient-to-r from-red-500 to-pink-600"
                    : event.type === "social"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600"
                    : "bg-gradient-to-r from-purple-500 to-indigo-600"
                } text-white`}
                // onClick={() => toggleEventExpand(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getEventIcon(event.type)}</span>
                    <div>
                      <h3 className="font-bold text-lg">{event.event}</h3>
                      <p className="text-sm opacity-90">
                        {event.time} • {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {/* {expandedEvent === index && ( */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-4">
                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium">{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium capitalize">
                          {event.type}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {(event.hasForm || event.participationOpen) && (
                      <div className="flex gap-3">
                        {event.hasForm && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowBloodDonationForm(true)}
                            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                          >
                            🩸 Register for Blood Donation
                          </motion.button>
                        )}
                        {event.participationOpen && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowParticipationForm(true)}
                            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
                          >
                            🎭 Participate in Program
                          </motion.button>
                        )}
                      </div>
                    )}

                    {/* Guest Information */}
                    <div className="border-t pt-4">
                      {event.guests && (
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          👑 Special Guests
                        </h4>
                      )}

                      <div className="space-y-3 ">
                        {/* Chief Guest */}
                        <div className="md:flex gap-5 space-y-2">
                          {event.guests && event.guests?.mukhyaAtithi && (
                            <div className="flex w-full items-center gap-3 p-3 bg-blue-50 rounded-lg border">
                              {/* <Image
                                src={event.guests.mukhyaAtithi.photo}
                                alt={event.guests.mukhyaAtithi.name}
                                width={50}
                                height={50}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                              /> */}
                              <div className="flex-1 ">
                                <p className="font-extrabold text-xl text-gray-900">
                                  {event.guests.mukhyaAtithi.name}
                                </p>
                                <p className="text-sm text-blue-600 font-bold">
                                  {event.guests.mukhyaAtithi.role}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {event.guests.mukhyaAtithi.position}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Chief Speaker */}
                          {event.guests && event.guests?.mukhyaBakta && (
                            <div className="flex w-full items-center gap-3 p-3 bg-purple-50 rounded-lg border shadow-lg">
                              {/* <img
                              src={event.guests.mukhyaBakta.photo}
                              alt={event.guests.mukhyaBakta.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                            /> */}
                              <div className="flex-1">
                                <p className="font-extrabold text-xl text-gray-900">
                                  {event.guests.mukhyaBakta.name}
                                </p>
                                <p className="text-sm text-purple-600 font-bold">
                                  {event.guests.mukhyaBakta.role}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {event.guests.mukhyaBakta.position}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Honored Guests */}
                        {event.guests && event.guests?.sammanitaAtithi && (
                          <div className="grid gap-2">
                            <h5 className="font-medium text-gray-700 text-sm">
                              Honored Guests:
                            </h5>
                            <div className="flex justify-between flex-wrap gap-4">
                              {/* eslint-disable  */}
                              {event.guests.sammanitaAtithi.map(
                                (guest: any, guestIndex: number) => (
                                  <div
                                    key={guestIndex}
                                    className="flex items-center p-4 gap-6 w-full md:w-[49%] bg-gray-50 rounded border shadow-lg"
                                  >
                                    {/* <img
                                    src={guest.photo}
                                    alt={guest.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                                  /> */}
                                    <div className="gap-4">
                                      <p className=" text-base font-bold text-gray-900">
                                        {guest.name}
                                      </p>
                                      <p className="text-xs text-gray-600">
                                        {guest.position}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Details */}
                    {(event.performers ||
                      event.highlights ||
                      event.categories) && (
                      <div className="border-t pt-4">
                        <h4 className="font-bold text-gray-900 mb-2">
                          📋 Event Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          {event.performers && (
                            <p>
                              <strong>Performers:</strong> {event.performers}
                            </p>
                          )}
                          {event.highlights && (
                            <p>
                              <strong>Highlights:</strong>{" "}
                              {event.highlights.join(", ")}
                            </p>
                          )}
                          {event.categories && (
                            <p>
                              <strong>Categories:</strong>{" "}
                              {event.categories.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
                {/* )} */}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {dayEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Events Scheduled
          </h3>
          <p className="text-gray-500">
            There are no events scheduled for this day.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default EventSchedule;

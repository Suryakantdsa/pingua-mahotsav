import React from "react";

const WebsideCredit = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Website Credits</h2>
          <p className="text-gray-600 mt-2">
            A heartfelt thanks to the team behind the Pingua Mahotsav 2025
            website
          </p>
        </div>

        {/* Credits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Developer */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
              alt="Suryakant Das"
              className="w-28 h-28 rounded-full shadow-md mb-4 object-cover"
            />
            <h4 className="text-lg font-bold text-gray-900">Suryakant Das</h4>
            <p className="text-sm text-orange-600 font-semibold">Developer</p>
            <p className="text-xs text-gray-600 mt-1">
              Creator of the Pingua Mahotsav 2025 Website
            </p>
          </div>

          {/* Ashish Kumar Sahoo */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://storage.googleapis.com/pingua-mahotsav/ashish.jpeg"
              alt="Ashish Kumar Sahoo"
              className="w-28 h-28 rounded-full shadow-md mb-4 object-cover"
            />
            <h4 className="text-lg font-bold text-gray-900">
              Shri Ashish Kumar Sahoo
            </h4>
            <p className="text-sm text-orange-600 font-semibold">
              Planning & Ideas
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Guided design, planning, and concept
            </p>
          </div>

          {/* Abinash Rout */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://storage.googleapis.com/pingua-mahotsav/avi.jpeg"
              alt="Abinash Rout"
              className="w-28 h-28 rounded-full shadow-md mb-4 object-cover"
            />
            <h4 className="text-lg font-bold text-gray-900">Abinash Rout</h4>
            <p className="text-sm text-orange-600 font-semibold">
              Content Collection
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Helped collect festival content & media
            </p>
          </div>

          {/* Pratap Ranjan Sahoo */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://storage.googleapis.com/pingua-mahotsav/jinuaa.PNG"
              alt="Pratap Ranjan Sahoo"
              className="w-28 h-28 rounded-full shadow-md mb-4 object-cover"
            />
            <h4 className="text-lg font-bold text-gray-900">
              Pratap Ranjan Sahoo
            </h4>
            <p className="text-sm text-orange-600 font-semibold">
              Content Support
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Assisted with gathering details & ideas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsideCredit;

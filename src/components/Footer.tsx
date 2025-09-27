import React from "react";
import {
  Facebook,
  Instagram,
  Sparkles,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Intro */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold">Pingua Mahotsav</span>
            </div>
            <p className="text-gray-300 mb-4">
              Celebrating 13 years of cultural heritage and community spirit in
              our beautiful village.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">
                  +91 9853971957, +91 9337991488
                </span>
              </div>

              {/* Multiple Emails - Better Layout */}
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-orange-400 mt-1" />
                <div className="flex flex-col text-gray-300 space-y-1">
                  <a
                    href="mailto:connect@pinguamahotsav.org"
                    className="hover:text-orange-400 transition-colors"
                  >
                    connect@pinguamahotsav.org
                  </a>
                  <a
                    href="mailto:info@pinguamahotsav.org"
                    className="hover:text-orange-400 transition-colors"
                  >
                    info@pinguamahotsav.org
                  </a>
                  <a
                    href="mailto:surykant@pinguamahotsav.org"
                    className="hover:text-orange-400 transition-colors"
                  >
                    surykant@pinguamahotsav.org
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                <span className="text-gray-300">
                  Village Festival Grounds
                  <br />
                  Near Laxmi Temple
                  <br />
                  Pingua Village, Odisha
                </span>
              </div>
            </div>
          </div>

          {/* Festival Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Festival Dates</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Duration:</strong> 7 Days
              </p>
              <p>
                <strong>Dates:</strong> 6th - 12th October 2025
              </p>
              <p>
                <strong>Occasion:</strong> Laxmi Puja Special
              </p>
              <p>
                <strong>Location:</strong> Village Festival Grounds
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="text-center text-gray-400">
          <p>
            &copy; 2025 Pingua Mahotsav. All rights reserved. | 13th Annual
            Cultural Festival
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

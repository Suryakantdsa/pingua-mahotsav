"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { Metadata } from "next";

interface Donor {
  name: string;
  bloodGroup: string;
  time: string;
  createdAt?: Date;
}

export const metadata: Metadata = {
  title: "Blood Donation Registration | Pingua Mahotsav 2025",
  description:
    "Register for blood donation camp at Pingua Mahotsav 2025. Be a hero and save lives. Organized by Pingua Mahotsav Paribar at Prathamika Swathya Kendra, Pingua.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Blood Donation Pingua",
    "Pingua Blood Donation Camp 2025",
    "Blood Donation Dhenkanal",
    "Pingua Mahotsav Blood Donation",
    "Register Blood Donation Pingua",
    "Blood Donation Camp Odisha",
    "Pingua Blood Bank",
    "Voluntary Blood Donation Pingua",
    "Save Lives Pingua",
    "Blood Donation Registration",
  ],
  openGraph: {
    title: "Blood Donation Registration | Pingua Mahotsav 2025",
    description:
      "Join our blood donation camp at Pingua Mahotsav 2025. Your donation can save lives. Register now!",
    url: "https://pinguamahotsav.org/blood-donation",
    siteName: "Pingua Mahotsav",
    images: [
      {
        url: "https://storage.googleapis.com/pingua-mahotsav/blood_donation.PNG",
        width: 1200,
        height: 630,
        alt: "Pingua Mahotsav Blood Donation Camp 2025",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Donation Registration | Pingua Mahotsav 2025",
    description:
      "Register for blood donation camp at Pingua Mahotsav 2025. Be a hero and save lives.",
    images: [
      "https://storage.googleapis.com/pingua-mahotsav/blood_donation.PNG",
    ],
  },
};
const BloodDonationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [ack, setAck] = useState("");
  const [donorRoster, setDonorRoster] = useState<Donor[]>([]);
  const [loadingDonors, setLoadingDonors] = useState(true);

  // Fetch donors from API
  const fetchDonors = async () => {
    try {
      setLoadingDonors(true);
      const res = await fetch("/api/blood-donation");
      const result = await res.json();

      if (res.ok) {
        setDonorRoster(result.donors || []);
      } else {
        toast.error("Failed to load donors");
        // Fallback to empty array
        setDonorRoster([]);
      }
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast.error("Error loading donors");
      setDonorRoster([]);
    } finally {
      setLoadingDonors(false);
    }
  };

  // Load donors on component mount
  useEffect(() => {
    fetchDonors();
  }, []);

  // Show donor popup every 5 seconds (only if we have donors)
  useEffect(() => {
    if (donorRoster.length === 0) return;

    const showDonorToast = () => {
      const randomDonor =
        donorRoster[Math.floor(Math.random() * donorRoster.length)];
      toast.success(
        <div className="flex items-center space-x-3">
          {/* <Heart className="h-5 w-5 text-red-500" /> */}
          <div>
            <p className="font-semibold">
              {randomDonor.name} registered for blood donation!
            </p>
            <p className="text-sm opacity-80">
              Blood Group: {randomDonor.bloodGroup} • {randomDonor.time}
            </p>
          </div>
        </div>,
        {
          duration: 4000,
          icon: "❤️",
          style: {
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
          },
        }
      );
    };

    // Show first toast after 2 seconds
    const timer = setTimeout(showDonorToast, 3000);

    // Then show every 5 seconds
    const interval = setInterval(showDonorToast, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [donorRoster]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAck("");

    // Basic validation
    if (
      !formData.name ||
      !formData.age ||
      !formData.bloodGroup ||
      !formData.phone
    ) {
      setAck("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (parseInt(formData.age) < 18 || parseInt(formData.age) > 65) {
      setAck("Age must be between 18 and 65 years");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/blood-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.ok) {
        setAck("✅ " + result.message);

        // Refresh the donor list to include the new donor
        await fetchDonors();

        // Show success toast for the new donor
        toast.success(
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-red-500" />
            <div>
              <p className="font-bold">Welcome aboard, {formData.name}!</p>
              <p className="text-sm opacity-80">
                Thank you for registering as a blood donor
              </p>
            </div>
          </div>,
          {
            duration: 6000,
            style: {
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#166534",
            },
          }
        );

        setFormData({
          name: "",
          age: "",
          bloodGroup: "",
          phone: "",
          email: "",
        });
      } else {
        setAck("❌ " + (result.error || "Submission failed."));
        toast.error(result.error || "Registration failed. Please try again.");
      }
    } catch {
      setAck("❌ Something went wrong. Please try again.");
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* Left Side - Main Title with Logo */}
            <div className="lg:flex-1">
              <div className="flex items-center mb-4">
                <Image
                  src="https://storage.googleapis.com/pingua-mahotsav/logo_1.png"
                  alt="Pingua Mahotsav Logo"
                  width={48}
                  height={48}
                  quality={100}
                  className="rounded-full shadow-md border-2 border-orange-300 object-contain mr-4"
                />
                <Link
                  href="/"
                  className="group inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 border border-white/30"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Explore Our Website</span>
                </Link>
              </div>

              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center mb-2">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mr-3" />
                  Blood Donation Registration
                </h1>
                <p className="text-red-100 text-lg md:text-xl">
                  Be a Hero. Save Lives.
                </p>
              </div>
            </div>

            {/* Right Side - Event Details */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      December 15, 2024
                    </p>
                    <p className="text-red-100 text-xs sm:text-sm">
                      9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Venue</p>
                    <p className="text-red-100 text-xs sm:text-sm">
                      Prathamika Swathya Kendra
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      Organized by
                    </p>
                    <p className="text-red-100 text-xs sm:text-sm">
                      Pingua Mahotsav Paribar
                    </p>
                    <p className="text-red-200 text-xs mt-1">
                      Goal: 500 Donors
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-red-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-red-600">
                <Heart className="h-6 w-6 mr-2" />
                Register Now
              </CardTitle>
              <CardDescription>
                Fill the form to register for blood donation
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name" className="flex items-center">
                    Full Name <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="flex items-center">
                      Age <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Age"
                      min="18"
                      max="65"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center">
                      Blood Group <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select
                      value={formData.bloodGroup}
                      onValueChange={(val) =>
                        setFormData({ ...formData, bloodGroup: val })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (bg) => (
                            <SelectItem key={bg} value={bg}>
                              {bg}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    Phone Number <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email (optional)"
                    className="mt-1"
                  />
                </div>
              </div>

              {ack && (
                <div
                  className={`p-3 rounded-lg text-center ${
                    ack.includes("✅")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {ack}
                </div>
              )}

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Registering...
                  </span>
                ) : (
                  "Register to Donate Blood"
                )}
              </Button>

              <p className="text-xs text-center text-gray-600">
                By registering, you agree to our terms and confirm you meet the
                donation criteria
              </p>
            </CardContent>
          </Card>
          <div className="space-y-6">
            {/* Benefits Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700">
                  Why Donate Blood?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    One donation can save up to 3 lives
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Reduces the risk of heart attacks
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Regular donation helps maintain healthy iron levels
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Free health screening included
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Refreshments and certificate provided
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Donor Roster Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-blue-700">Recent Donors</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchDonors}
                    disabled={loadingDonors}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        loadingDonors ? "animate-spin" : ""
                      }`}
                    />
                    Refresh
                  </Button>
                </div>
                <CardDescription>
                  {donorRoster.length > 0
                    ? `Our ${donorRoster.length} heroes who recently donated blood`
                    : "No donors yet. Be the first!"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingDonors ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                  </div>
                ) : donorRoster.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {donorRoster.map((donor, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-blue-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="font-medium">{donor.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            {donor.bloodGroup}
                          </span>
                          <span className="text-xs text-gray-600 ml-2">
                            {donor.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No donors yet. Be the first to register!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
        </div>
      </div>
    </div>
  );
};

export default BloodDonationPage;

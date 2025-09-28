"use client";
import { useState } from "react";
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
import { useFormStore } from "@/store/useFormStore";
import { Heart, X, Share2 } from "lucide-react";

const BloodDonationForm = () => {
  const { showBloodDonationForm, setShowBloodDonationForm } = useFormStore();

  const handleClose = () => setShowBloodDonationForm(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [ack, setAck] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAck("");

    try {
      const res = await fetch("/api/blood-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setAck(result.message);
        setFormData({ name: "", age: "", bloodGroup: "", phone: "" });
      } else {
        setAck(result.error || "Submission failed.");
      }
    } catch {
      setAck("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const shareLink = () => {
    const url = `${window.location.origin}/blood-donation`;
    navigator.clipboard.writeText(url);
    setAck("Link copied to clipboard! Share it with others.");
  };

  return (
    showBloodDonationForm && (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <Card className="relative max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-red-200">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Heart className="h-5 w-5 mr-2" />
                Blood Donation Registration
              </CardTitle>
              <CardDescription>
                Register to donate blood and save lives
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <Label>Blood Group</Label>
                <Select
                  value={formData.bloodGroup}
                  onValueChange={(val) =>
                    setFormData({ ...formData, bloodGroup: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
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
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              {ack && (
                <p
                  className={`text-center ${
                    ack.includes("copied") ? "text-blue-600" : "text-green-600"
                  }`}
                >
                  {ack}
                </p>
              )}

              <div className="flex space-x-2 pt-4">
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Register to Donate"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={shareLink}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
};

export default BloodDonationForm;

"use client";
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
import { Heart, X } from "lucide-react";

const BloodDonationForm = () => {
  const { showBloodDonationForm, setShowBloodDonationForm } = useFormStore();

  const handleClose = () => setShowBloodDonationForm(false);

  return (
    showBloodDonationForm && (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={handleClose} // click outside closes
      >
        <div
          className="w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
        >
          <Card className="relative max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-red-200">
            {/* Close button */}
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
                <Label htmlFor="donor-name">Full Name</Label>
                <Input id="donor-name" placeholder="Enter your full name" />
              </div>
              <div>
                <Label htmlFor="donor-age">Age</Label>
                <Input
                  id="donor-age"
                  type="number"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <Label htmlFor="blood-group">Blood Group</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a+">A+</SelectItem>
                    <SelectItem value="a-">A-</SelectItem>
                    <SelectItem value="b+">B+</SelectItem>
                    <SelectItem value="b-">B-</SelectItem>
                    <SelectItem value="ab+">AB+</SelectItem>
                    <SelectItem value="ab-">AB-</SelectItem>
                    <SelectItem value="o+">O+</SelectItem>
                    <SelectItem value="o-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="donor-phone">Phone Number</Label>
                <Input id="donor-phone" placeholder="Enter your phone number" />
              </div>

              {/* Action buttons */}
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-red-600 hover:bg-red-700">
                  Register to Donate
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
};

export default BloodDonationForm;

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
import { Award, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useFormStore } from "@/store/useFormStore";

const SponsorForm = () => {
  const { showSponsorForm, setShowSponsorForm } = useFormStore();

  if (!showSponsorForm) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowSponsorForm(false)} // close on backdrop
    >
      <Card
        className="w-full max-w-md max-h-[90vh] overflow-y-auto relative modal-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowSponsorForm(false)}
        >
          <X className="h-5 w-5" />
        </button>

        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Award className="h-5 w-5 mr-2" />
            Become a Sponsor
          </CardTitle>
          <CardDescription>
            Join us in supporting our cultural heritage
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sponsor-name">Organization/Individual Name</Label>
            <Input
              id="sponsor-name"
              placeholder="Enter your name or organization"
            />
          </div>
          <div>
            <Label htmlFor="sponsor-type">Sponsorship Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select sponsorship level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="platinum">
                  Platinum Sponsor (₹50,000+)
                </SelectItem>
                <SelectItem value="gold">Gold Sponsor (₹25,000+)</SelectItem>
                <SelectItem value="silver">
                  Silver Sponsor (₹10,000+)
                </SelectItem>
                <SelectItem value="bronze">Bronze Sponsor (₹5,000+)</SelectItem>
                <SelectItem value="supporter">
                  Community Supporter (Any Amount)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sponsor-phone">Contact Number</Label>
            <Input
              id="sponsor-phone"
              placeholder="Enter your phone number"
              className="outline-none"
            />
          </div>
          <div>
            <Label htmlFor="sponsor-email">Email Address</Label>
            <Input
              id="sponsor-email"
              type="email"
              placeholder="Enter your email"
              className="outline-none"
            />
          </div>
          <div>
            <Label htmlFor="sponsor-message">Message (Optional)</Label>
            <Textarea
              id="sponsor-message"
              placeholder="Any specific requirements or message..."
              className="outline-none"
            />
          </div>
          <div className="flex space-x-2 pt-4">
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
              Submit Sponsorship Request
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowSponsorForm(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorForm;

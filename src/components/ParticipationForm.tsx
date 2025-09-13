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
import { Music, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useFormStore } from "@/store/useFormStore";

const ParticipationForm = () => {
  const { showParticipationForm, setShowParticipationForm } = useFormStore();

  if (!showParticipationForm) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowParticipationForm(false)} // backdrop click
    >
      <Card
        className="w-full max-w-md max-h-[90vh] overflow-y-auto relative modal-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowParticipationForm(false)}
        >
          <X className="h-5 w-5" />
        </button>

        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Music className="h-5 w-5 mr-2" />
            Cultural Program Registration
          </CardTitle>
          <CardDescription>
            Join us in celebrating our cultural heritage
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="participant-name">Full Name</Label>
            <Input
              id="participant-name"
              placeholder="Enter your full name"
              className="outline-none "
            />
          </div>
          <div>
            <Label htmlFor="participant-age">Age</Label>
            <Input
              id="participant-age"
              type="number"
              placeholder="Enter your age"
              className="outline-none"
            />
          </div>
          <div>
            <Label htmlFor="program-type">Program Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select program type"
                  className="outline-none"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dance">Dance Performance</SelectItem>
                <SelectItem value="music">Musical Performance</SelectItem>
                <SelectItem value="drama">Drama/Theater</SelectItem>
                <SelectItem value="poetry">Poetry Recitation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="participant-phone">Phone Number</Label>
            <Input
              id="participant-phone"
              placeholder="Enter your phone number"
              className="outline-none"
            />
          </div>
          <div>
            <Label htmlFor="performance-details">Performance Details</Label>
            <Textarea
              id="performance-details"
              placeholder="Describe your performance..."
              className="outline-none"
            />
          </div>
          <div className="flex space-x-2 pt-4">
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
              Submit Application
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowParticipationForm(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipationForm;

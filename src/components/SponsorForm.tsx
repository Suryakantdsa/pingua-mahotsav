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
import { Textarea } from "@/components/ui/textarea";
import { Award, X } from "lucide-react";
import { useFormStore } from "@/store/useFormStore";

const SponsorForm = () => {
  const { showSponsorForm, setShowSponsorForm } = useFormStore();

  const handleClose = () => setShowSponsorForm(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [ack, setAck] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAck("");

    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setAck(result.message);
        setFormData({ name: "", type: "", phone: "", email: "", message: "" });
      } else {
        setAck(result.error || "Submission failed.");
      }
    } catch {
      setAck("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!showSponsorForm) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <Card
        className="w-full max-w-md max-h-[90vh] overflow-y-auto relative modal-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
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
            <Label htmlFor="name">Organization/Individual Name</Label>
            <Input
              id="name"
              placeholder="Enter your name or organization"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Sponsorship Type</Label>
            <Select
              value={formData.type}
              onValueChange={(val) => setFormData({ ...formData, type: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sponsorship level" />
              </SelectTrigger>
              <SelectContent>
                {["platinum", "gold", "silver", "bronze", "supporter"].map(
                  (level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any specific requirements or message..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {ack && <p className="text-center text-green-600">{ack}</p>}

          <div className="flex space-x-2 pt-4">
            <Button
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Sponsorship Request"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorForm;

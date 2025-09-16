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
import { Music, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useFormStore } from "@/store/useFormStore";
import { Programs } from "@/models/Participant";

const ParticipationForm = () => {
  const { showParticipationForm, setShowParticipationForm } = useFormStore();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    program: "",
    phone: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [ack, setAck] = useState("");

  if (!showParticipationForm) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAck("");
    try {
      const res = await fetch("/api/participation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setAck(result.message);
        setFormData({ name: "", age: "", program: "", phone: "", details: "" });
      } else {
        setAck(result.error || "Submission failed.");
      }
    } catch {
      setAck("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowParticipationForm(false)}
    >
      <Card
        className="w-full max-w-md max-h-[90vh] overflow-y-auto relative modal-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
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
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Program Type</Label>
            <Select
              value={formData.program}
              onValueChange={(val) =>
                setFormData({ ...formData, program: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select program type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Programs).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)} {/* Capitalize */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="details">Performance Details</Label>
            <Textarea
              id="details"
              value={formData.details}
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
              {loading ? "Submitting..." : "Submit Application"}
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

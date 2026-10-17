import mongoose, { Schema, Document, Model } from "mongoose";

export enum EventType {
  OPENING = "opening",
  CLOSING = "closing",
  SOCIAL = "social",
  CULTURAL = "cultural",
  LOCAL = "local",
  PROFESSIONAL = "professional",
}

export interface IEvent extends Document {
  event: string;
  date: string;
  day: string;
  time: string;
  description: string;
  type: EventType;
  duration: string;
  location: string;
  hasForm: boolean;
  participationOpen: boolean;
  targetDonors?: number;
  organizer?: string;
  performers?: string;
  specialNote?: string;
  mukhyaAtithi?: string;
  mukhyaBakta?: string;
  sammanitaAtithi?: string;
  guests?: any;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    event: { type: String, required: true },
    date: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(EventType),
      required: true,
      default: EventType.CULTURAL,
    },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    hasForm: { type: Boolean, default: false },
    participationOpen: { type: Boolean, default: false },
    targetDonors: { type: Number, default: 0 },
    organizer: { type: String, default: "" },
    performers: { type: String, default: "" },
    specialNote: { type: String, default: "" },
    mukhyaAtithi: { type: String, default: "" },
    mukhyaBakta: { type: String, default: "" },
    sammanitaAtithi: { type: String, default: "" },
    guests: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

const Event: Model<IEvent> =
  mongoose.models?.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;

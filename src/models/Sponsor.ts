import mongoose, { Schema, Document, Model } from "mongoose";

export enum SponsorshipType {
  PLATINUM = "platinum",
  GOLD = "gold",
  SILVER = "silver",
  BRONZE = "bronze",
  SUPPORTER = "supporter",
}

export interface ISponsor extends Document {
  name: string;
  type: SponsorshipType;
  phone: string;
  email: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SponsorSchema: Schema<ISponsor> = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(SponsorshipType),
      required: true,
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

// Hot-reload safe export (for Next.js dev)
const Sponsor: Model<ISponsor> =
  mongoose.models?.Sponsor ||
  mongoose.model<ISponsor>("Sponsor", SponsorSchema);

export default Sponsor;

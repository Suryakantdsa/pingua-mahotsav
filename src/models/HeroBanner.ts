import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHeroBanner extends Document {
  title: string;
  subtitle: string;
  tagline?: string;
  category?: string;
  imageSrc: string;
  mobileImageSrc?: string;
  dateBadge?: string;
  location?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  order: number;
  isActive: boolean;
  featuredArtist?: string;
  focalPoint?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HeroBannerSchema: Schema<IHeroBanner> = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    tagline: { type: String, default: "" },
    category: { type: String, default: "Featured Event" },
    imageSrc: { type: String, required: true },
    mobileImageSrc: { type: String, default: "" },
    dateBadge: { type: String, default: "" },
    location: { type: String, default: "Pingua Mahotsav Padia, Dhenkanal" },
    ctaText: { type: String, default: "Explore Festival" },
    ctaUrl: { type: String, default: "#events" },
    secondaryCtaText: { type: String, default: "" },
    secondaryCtaUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    featuredArtist: { type: String, default: "" },
    focalPoint: { type: String, default: "center" },
  },
  {
    timestamps: true,
  }
);

const HeroBanner: Model<IHeroBanner> =
  mongoose.models?.HeroBanner ||
  mongoose.model<IHeroBanner>("HeroBanner", HeroBannerSchema);

export default HeroBanner;

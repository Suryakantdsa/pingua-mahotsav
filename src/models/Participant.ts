import mongoose, { Schema, Document, Model } from "mongoose";

export enum Programs {
  Dance = "dance",
  Song = "song",
  Music = "music",
  Drama = "drama",
  FolkDance = "folk_dance",
  FolkSong = "folk_song",
  Instrumental = "instrumental",
  Poetry = "poetry",
  Comedy = "comedy",
  Other = "other",
}

export interface IParticipant extends Document {
  registrationNo: string;
  name: string; // Name of the Group / Artist
  leaderName: string; // Name of Group Leader / Coordinator
  phone: string; // Contact Number
  whatsappNumber?: string; // WhatsApp Number
  address?: string; // Address
  district?: string; // District
  programType: string[]; // Selected Program types (Dance, Song, Music, etc.)
  otherProgramType?: string; // If 'Other' specified
  programTitle?: string; // Title / Name of the Programme
  participantsCount?: number; // No. of Participants
  duration?: string | number; // Duration in minutes
  description?: string; // Brief Description
  specialRequirements?: string; // Technical / Special Requirements
  declarationAgreed: boolean; // Declaration confirmation
  declarationDate?: string;
  signatureName: string; // Signature of Artist / Coordinator
  remarks?: string;
  receivedBy?: string;
  // Legacy / fallback fields
  age?: number;
  program?: string;
  details?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ParticipantSchema: Schema<IParticipant> = new Schema(
  {
    registrationNo: {
      type: String,
      unique: true,
      index: true,
    },
    name: { type: String, required: true },
    leaderName: { type: String, default: "" },
    phone: { type: String, required: true },
    whatsappNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    district: { type: String, default: "" },
    programType: { type: [String], default: [] },
    otherProgramType: { type: String, default: "" },
    programTitle: { type: String, default: "" },
    participantsCount: { type: Number, default: 1 },
    duration: { type: String, default: "" },
    description: { type: String, default: "" },
    specialRequirements: { type: String, default: "" },
    declarationAgreed: { type: Boolean, default: true },
    declarationDate: { type: String, default: "" },
    signatureName: { type: String, default: "" },
    remarks: { type: String, default: "Registered Online / Pending Committee Verification" },
    receivedBy: { type: String, default: "Pingua Mahotsav Cultural Committee" },
    // Legacy fields with default values
    age: { type: Number, default: 18 },
    program: { type: String, default: "other" },
    details: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Auto generate registration number if not present
ParticipantSchema.pre("save", function (next) {
  if (!this.registrationNo) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.registrationNo = `PM-2026-CP-${randomSuffix}`;
  }
  // Sync legacy fields
  if (!this.details && this.description) {
    this.details = this.description;
  }
  if (!this.program && this.programType && this.programType.length > 0) {
    this.program = this.programType[0].toLowerCase().replace(/\s+/g, "_");
  }
  next();
});

// Clear cached model in dev mode to ensure schema updates are applied
if (mongoose.models && mongoose.models.Participant) {
  delete mongoose.models.Participant;
}

const Participant: Model<IParticipant> =
  mongoose.model<IParticipant>("Participant", ParticipantSchema);

export default Participant;

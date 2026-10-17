import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBloodDonor extends Document {
  registrationNo?: string;
  name: string;
  guardianName?: string;
  gender?: string;
  age: number;
  dob?: string;
  bloodGroup: string;
  phone: string;
  whatsappNumber?: string;
  address?: string;
  district?: string;
  occupation?: string;
  previousDonations?: string;
  lastDonationDate?: string;
  weight?: string;
  pledgeOrganDonation?: boolean;
  declarationAgreed?: boolean;
  declarationDate?: string;
  signatureName?: string;
  medicalStatus?: string;
  hbLevel?: string;
  bp?: string;
  unitNumber?: string;
  bagType?: string;
  remarks?: string;
  receivedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BloodDonorSchema: Schema<IBloodDonor> = new Schema(
  {
    registrationNo: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    guardianName: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "Male",
    },
    age: { type: Number, required: true },
    dob: { type: String, default: "" },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
      required: true,
    },
    phone: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    district: { type: String, default: "Dhenkanal" },
    occupation: { type: String, default: "" },
    previousDonations: { type: String, default: "0" },
    lastDonationDate: { type: String, default: "" },
    weight: { type: String, default: "" },
    pledgeOrganDonation: { type: Boolean, default: false },
    declarationAgreed: { type: Boolean, default: true },
    declarationDate: { type: String, default: "" },
    signatureName: { type: String, default: "" },
    medicalStatus: {
      type: String,
      enum: ["Registered", "Accepted", "Deferred", "Completed"],
      default: "Registered",
    },
    hbLevel: { type: String, default: "" },
    bp: { type: String, default: "" },
    unitNumber: { type: String, default: "" },
    bagType: { type: String, default: "Single (350ml)" },
    remarks: { type: String, default: "" },
    receivedBy: {
      type: String,
      default: "Red Cross & Pingua Mahotsav Blood Camp Team",
    },
  },
  {
    timestamps: true,
  }
);

// Clear model cache in development to prevent stale schema issues
if (process.env.NODE_ENV === "development" && mongoose.models?.BloodDonor) {
  delete (mongoose.models as Record<string, unknown>).BloodDonor;
}

const BloodDonor: Model<IBloodDonor> =
  mongoose.models?.BloodDonor ||
  mongoose.model<IBloodDonor>("BloodDonor", BloodDonorSchema);

export default BloodDonor;

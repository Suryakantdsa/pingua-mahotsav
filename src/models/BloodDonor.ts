import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBloodDonor extends Document {
  name: string;
  age: number;
  bloodGroup: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const BloodDonorSchema: Schema<IBloodDonor> = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Hot-reload safe model export
const BloodDonor: Model<IBloodDonor> =
  mongoose.models?.BloodDonor ||
  mongoose.model<IBloodDonor>("BloodDonor", BloodDonorSchema);

export default BloodDonor;

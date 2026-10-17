import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  email: string;
  phone: string;
  designation: string;
  role: "super_admin" | "admin" | "coordinator" | "volunteer" | "member";
  image?: string;
  password?: string;
  isActive: boolean;
  mustChangePassword?: boolean;
  otp?: string;
  otpExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema<ITeamMember> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },
    role: {
      type: String,
      enum: ["super_admin", "admin", "coordinator", "volunteer", "member"],
      default: "member",
      required: true,
    },
    image: { type: String },
    password: { type: String },
    isActive: { type: Boolean, default: true },
    mustChangePassword: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models?.TeamMember) {
  delete (mongoose.models as any).TeamMember;
}

const TeamMember: Model<ITeamMember> =
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;

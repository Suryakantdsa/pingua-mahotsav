import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrgMember extends Document {
  name: string;
  position: string;
  message: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrgMemberSchema: Schema<IOrgMember> = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const OrgMember: Model<IOrgMember> =
  mongoose.models?.OrgMember ||
  mongoose.model<IOrgMember>("OrgMember", OrgMemberSchema);

export default OrgMember;

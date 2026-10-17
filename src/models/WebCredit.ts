import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWebCredit extends Document {
  name: string;
  role: string;
  contribution: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const WebCreditSchema: Schema<IWebCredit> = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    contribution: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const WebCredit: Model<IWebCredit> =
  mongoose.models?.WebCredit ||
  mongoose.model<IWebCredit>("WebCredit", WebCreditSchema);

export default WebCredit;

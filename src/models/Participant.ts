import mongoose, { Schema, Document, Model } from "mongoose";

export enum Programs {
  Dance = "dance",
  Music = "music",
  Drama = "drama",
  Poetry = "poetry",
  Other = "other",
}

export interface IParticipant extends Document {
  name: string;
  age: number;
  program: Programs;
  phone: string;
  details?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ParticipantSchema: Schema<IParticipant> = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    program: {
      type: String,
      enum: Object.values(Programs),
      required: true,
    },
    phone: { type: String, required: true },
    details: { type: String },
  },
  {
    timestamps: true,
  }
);
// const Rating: Model<IRating> = mongoose.model("rating", ratingSchema);

const Participant: Model<IParticipant> =
  mongoose.models?.Participant ||
  mongoose.model<IParticipant>("Participant", ParticipantSchema);

export default Participant;

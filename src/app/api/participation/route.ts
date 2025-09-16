import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Participant from "@/models/Participant";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();

    const participant = new Participant(data);
    await participant.save();

    return NextResponse.json(
      { message: "🎉 Thank you! Your registration was successful." },
      { status: 201 }
    );
    /* eslint-disable */
  } catch (error: any) {
    console.error("Error saving participant:", error);
    return NextResponse.json(
      { error: "❌ Failed to submit application." },
      { status: 500 }
    );
  }
}

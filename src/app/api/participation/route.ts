import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Participant from "@/models/Participant";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();

    // Generate unique registration number if not passed
    if (!data.registrationNo) {
      const count = await Participant.countDocuments();
      const seq = String(count + 101).padStart(4, "0");
      data.registrationNo = `PM-2026-CP-${seq}`;
    }

    // Default legacy fields if missing
    if (!data.age) data.age = 18;
    if (!data.program && Array.isArray(data.programType) && data.programType.length > 0) {
      data.program = data.programType[0].toLowerCase().replace(/[^a-z]/g, "");
    }
    if (!data.details && data.description) {
      data.details = data.description;
    }

    const participant = new Participant(data);
    await participant.save();

    return NextResponse.json(
      {
        success: true,
        message: "🎉 Your Cultural Programme Registration was submitted successfully!",
        registrationNo: participant.registrationNo,
        data: participant,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving participant:", error);
    return NextResponse.json(
      { error: "❌ Failed to submit application.", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const participants = await Participant.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: participants });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

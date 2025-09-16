import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Sponsor, { SponsorshipType } from "@/models/Sponsor";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();

    // Basic validation
    if (
      !data.name ||
      !data.type ||
      !data.phone ||
      !data.email ||
      !Object.values(SponsorshipType).includes(data.type)
    ) {
      return NextResponse.json(
        { error: "Please provide valid name, type, phone, and email." },
        { status: 400 }
      );
    }

    const sponsor = new Sponsor({
      name: data.name,
      type: data.type,
      phone: data.phone,
      email: data.email,
      message: data.message,
    });

    await sponsor.save();

    return NextResponse.json(
      {
        message:
          "🎉 Thank you! Your sponsorship request has been submitted. We’ll contact you soon to discuss the next steps",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "❌ Failed to submit sponsorship request." },
      { status: 500 }
    );
  }
}

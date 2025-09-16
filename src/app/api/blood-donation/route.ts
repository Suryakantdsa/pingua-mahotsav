import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import BloodDonor from "@/models/BloodDonor";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();

    const donor = new BloodDonor({
      name: data.name,
      age: data.age,
      bloodGroup: data.bloodGroup,
      phone: data.phone,
    });

    await donor.save();

    return NextResponse.json(
      {
        message:
          "🎉 Thank you! You are now registered as a blood donor. We appreciate your support in saving lives!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "❌ Failed to register donor." },
      { status: 500 }
    );
  }
}

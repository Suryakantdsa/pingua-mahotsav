import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import TeamMember from "@/models/TeamMember";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      );
    }

    const member = await TeamMember.findById(id);
    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const validitySeconds = 60;
    const expiresAt = new Date(Date.now() + validitySeconds * 1000);

    await TeamMember.findByIdAndUpdate(
      id,
      {
        $set: {
          otp,
          otpExpiresAt: expiresAt,
        },
      },
      { new: true, runValidators: false }
    );

    return NextResponse.json({
      success: true,
      message: `OTP generated successfully with ${validitySeconds}s validity.`,
      otp,
      expiresIn: validitySeconds,
      expiresAt: expiresAt.toISOString(),
      memberName: member.name,
      memberEmail: member.email,
    });
  } catch (error: any) {
    console.error("Generate OTP Error:", error);
    return NextResponse.json(
      { error: "Failed to generate OTP", message: error.message },
      { status: 500 }
    );
  }
}

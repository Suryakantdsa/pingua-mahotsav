import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import TeamMember from "@/models/TeamMember";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, memberId, otp, newPassword } = body;

    if (!otp || !newPassword) {
      return NextResponse.json(
        { error: "Both OTP and new password are required." },
        { status: 400 }
      );
    }

    if (String(newPassword).length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    let member = null;
    if (memberId) {
      member = await TeamMember.findById(memberId);
    } else if (email) {
      const cleanEmail = String(email).trim().toLowerCase();
      member = await TeamMember.findOne({
        email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
      });
    }

    if (!member) {
      return NextResponse.json(
        { error: "Team member account not found." },
        { status: 404 }
      );
    }

    // Validate OTP match
    const cleanOtp = String(otp).trim();
    if (!member.otp || member.otp !== cleanOtp) {
      return NextResponse.json(
        { error: "Invalid OTP. Please verify the code given by Super Admin." },
        { status: 400 }
      );
    }

    // Validate 60-second OTP expiry
    if (!member.otpExpiresAt || Date.now() > new Date(member.otpExpiresAt).getTime()) {
      return NextResponse.json(
        {
          error:
            "OTP has expired! The security code is only valid for 60 seconds. Please ask Super Admin to click 'Generate OTP' again.",
        },
        { status: 400 }
      );
    }

    // Hash the new password (never save plain text)
    const hashedPassword = hashPassword(String(newPassword).trim());

    await TeamMember.findByIdAndUpdate(
      member._id,
      {
        $set: {
          password: hashedPassword,
          mustChangePassword: false,
        },
        $unset: {
          otp: 1,
          otpExpiresAt: 1,
        },
      },
      { new: true, runValidators: false }
    );

    return NextResponse.json({
      success: true,
      message: "Password changed successfully! You can now use your new password.",
    });
  } catch (error: any) {
    console.error("Change Password Error:", error);
    return NextResponse.json(
      { error: "Failed to change password", message: error.message },
      { status: 500 }
    );
  }
}

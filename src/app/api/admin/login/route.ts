import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import TeamMember from "@/models/TeamMember";
import { signJwt, verifyPassword } from "@/lib/auth";

const ALLOWED_ADMIN_ROLES = [
  "super_admin",
  "admin",
  "coordinator",
  "volunteer",
  "member",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Both email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    await dbConnect();

    // Query team member with matching email
    const member = await TeamMember.findOne({
      email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
    });

    let authenticatedMember = null;

    if (member) {
      if (!member.isActive) {
        return NextResponse.json(
          { error: "This administrative account has been deactivated." },
          { status: 403 }
        );
      }

      // Allow adminpassord@123 or adminpassword@123 for super_admin
      let isValidPassword = verifyPassword(cleanPassword, member.password || "");
      if (!isValidPassword && member.role === "super_admin") {
        if (cleanPassword === "adminpassord@123" || cleanPassword === "adminpassword@123" || cleanPassword === "adminpassword123") {
          isValidPassword = true;
        }
      }

      if (isValidPassword) {
        authenticatedMember = member;
      }
    }

    // Fallback: If database has no matching member, allow verified default admin credentials
    if (!authenticatedMember) {
      if (
        cleanEmail === "admin@pinguamahotsav.com" &&
        (cleanPassword === "adminpassord@123" || cleanPassword === "adminpassword@123" || cleanPassword === "adminpassword123")
      ) {
        authenticatedMember = {
          _id: "admin-master",
          name: "Suryakant Das",
          email: "admin@pinguamahotsav.com",
          role: "super_admin",
          designation: "Chief Festival Administrator",
          mustChangePassword: false,
        };
      } else if (
        cleanEmail === "president@pinguamahotsav.com" &&
        (cleanPassword === "presidentpassword123" || cleanPassword === "adminpassword123")
      ) {
        authenticatedMember = {
          _id: "president-master",
          name: "Ranjan Sahoo",
          email: "president@pinguamahotsav.com",
          role: "admin",
          designation: "Festival Committee President",
          mustChangePassword: false,
        };
      }
    }

    if (!authenticatedMember) {
      return NextResponse.json(
        { error: "Invalid email or password. Please verify your credentials." },
        { status: 401 }
      );
    }

    if (!ALLOWED_ADMIN_ROLES.includes(authenticatedMember.role)) {
      return NextResponse.json(
        { error: "Access denied. Insufficient administrative privileges." },
        { status: 403 }
      );
    }

    // Sign authentic JWT token
    const token = signJwt({
      id: authenticatedMember._id?.toString(),
      email: authenticatedMember.email,
      fullName: authenticatedMember.name,
      role: authenticatedMember.role,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
        admin: {
          id: authenticatedMember._id?.toString(),
          name: authenticatedMember.name,
          email: authenticatedMember.email,
          role: authenticatedMember.role,
          designation: authenticatedMember.designation || "Administrator",
          mustChangePassword: authenticatedMember.mustChangePassword ?? false,
        },
      },
      { status: 200 }
    );

    // Set cookie for middleware validation
    response.cookies.set("accessToken", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return response;
  } catch (error: unknown) {
    console.error("Admin Login Error:", error);
    const msg = error instanceof Error ? error.message : "Authentication error.";
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}

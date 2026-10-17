import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import TeamMember from "@/models/TeamMember";
import { hashPassword } from "@/lib/auth";
import GenericController from "@/lib/Generic";

const controller = new GenericController(TeamMember);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body || !body.email || !body.name) {
      return NextResponse.json(
        { error: "Name and email are required for a team member." },
        { status: 400 }
      );
    }

    const cleanEmail = String(body.email).trim().toLowerCase();

    // Check if email already exists
    const existing = await TeamMember.findOne({ email: cleanEmail });
    if (existing) {
      return NextResponse.json(
        { error: `A team member with email ${cleanEmail} already exists.` },
        { status: 400 }
      );
    }

    // Determine temporary password
    const rawPassword = body.password?.trim() || `Pingua@${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedPassword = hashPassword(rawPassword);

    const validRoles = ["super_admin", "admin", "coordinator", "volunteer", "member"];
    const role = validRoles.includes(body.role) ? body.role : "member";

    const newMember = await TeamMember.create({
      ...body,
      email: cleanEmail,
      role,
      password: hashedPassword,
      mustChangePassword: true,
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    const memberObj = newMember.toObject();
    delete memberObj.password;

    return NextResponse.json(
      {
        ...memberObj,
        tempPassword: rawPassword,
        message: `Member created successfully! Temporary password: ${rawPassword}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Team Member POST error:", error);
    return NextResponse.json(
      { error: "Failed to create team member", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    return await controller.GET(req);
  } catch (error: any) {
    console.error("Team Member GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members", message: error.message },
      { status: 500 }
    );
  }
}

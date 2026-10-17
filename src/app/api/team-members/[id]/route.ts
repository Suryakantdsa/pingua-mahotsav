import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import TeamMember from "@/models/TeamMember";
import { hashPassword } from "@/lib/auth";
import GenericController from "@/lib/Generic";

const controller = new GenericController(TeamMember);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    return await controller.GET(request, { id });
  } catch (error: any) {
    console.error("GET [id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team member", message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await request.json();

    if (body.password && String(body.password).trim() !== "") {
      body.password = hashPassword(String(body.password).trim());
    } else {
      delete body.password;
    }

    if (body.email) {
      body.email = String(body.email).trim().toLowerCase();
    }

    const updated = await TeamMember.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updated) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update team member", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const member = await TeamMember.findById(id);
    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    if (member.role === "super_admin") {
      return NextResponse.json(
        { error: "Super Admin account cannot be deleted." },
        { status: 403 }
      );
    }

    await TeamMember.findByIdAndDelete(id);
    return NextResponse.json(
      { success: true, message: "Team member deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete team member", message: error.message },
      { status: 500 }
    );
  }
}

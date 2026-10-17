import { NextRequest, NextResponse } from "next/server";
import OrgMember from "@/models/OrgMember";
import GenericController from "@/lib/Generic";

const controller = new GenericController(OrgMember);

export async function POST(req: NextRequest) {
  try {
    return await controller.POST(req);
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create org member", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    return await controller.GET(req);
  } catch (error: any) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch org members", message: error.message },
      { status: 500 }
    );
  }
}

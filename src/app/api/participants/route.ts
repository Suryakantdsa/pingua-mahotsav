import { NextRequest, NextResponse } from "next/server";
import Participant from "@/models/Participant";
import GenericController from "@/lib/Generic";

const controller = new GenericController(Participant);

export async function POST(req: NextRequest) {
  try {
    return await controller.POST(req);
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to register participant", message: error.message },
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
      { error: "Failed to fetch participants", message: error.message },
      { status: 500 }
    );
  }
}

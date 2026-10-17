import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import GenericController from "@/lib/Generic";

const controller = new GenericController(Event);

export async function POST(req: NextRequest) {
  try {
    return await controller.POST(req);
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create event", message: error.message },
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
      { error: "Failed to fetch events", message: error.message },
      { status: 500 }
    );
  }
}

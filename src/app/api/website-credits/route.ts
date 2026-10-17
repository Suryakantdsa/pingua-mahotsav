import { NextRequest, NextResponse } from "next/server";
import WebCredit from "@/models/WebCredit";
import GenericController from "@/lib/Generic";

const controller = new GenericController(WebCredit);

export async function POST(req: NextRequest) {
  try {
    return await controller.POST(req);
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create website credit", message: error.message },
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
      { error: "Failed to fetch website credits", message: error.message },
      { status: 500 }
    );
  }
}

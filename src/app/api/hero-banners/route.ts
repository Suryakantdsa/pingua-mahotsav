import { NextRequest, NextResponse } from "next/server";
import HeroBanner from "@/models/HeroBanner";
import GenericController from "@/lib/Generic";

const controller = new GenericController(HeroBanner);

export async function POST(req: NextRequest) {
  try {
    return await controller.POST(req);
  } catch (error: any) {
    console.error("POST hero-banners error:", error);
    return NextResponse.json(
      { error: "Failed to create hero banner", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    return await controller.GET(req);
  } catch (error: any) {
    console.error("GET hero-banners error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero banners", message: error.message },
      { status: 500 }
    );
  }
}

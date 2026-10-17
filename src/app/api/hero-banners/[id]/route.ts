import { NextRequest, NextResponse } from "next/server";
import HeroBanner from "@/models/HeroBanner";
import GenericController from "@/lib/Generic";

const controller = new GenericController(HeroBanner);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    return await controller.GET(request, { id });
  } catch (error: any) {
    console.error("GET [id] hero-banner error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero banner", message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    return await controller.PATCH(request, { id });
  } catch (error: any) {
    console.error("PATCH hero-banner error:", error);
    return NextResponse.json(
      { error: "Failed to update hero banner", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    return await controller.DELETE(request, { id });
  } catch (error: any) {
    console.error("DELETE hero-banner error:", error);
    return NextResponse.json(
      { error: "Failed to delete hero banner", message: error.message },
      { status: 500 }
    );
  }
}

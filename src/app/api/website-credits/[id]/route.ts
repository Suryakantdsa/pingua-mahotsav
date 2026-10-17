import { NextRequest, NextResponse } from "next/server";
import WebCredit from "@/models/WebCredit";
import GenericController from "@/lib/Generic";

const controller = new GenericController(WebCredit);

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
      { error: "Failed to fetch website credit", message: error.message },
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
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update website credit", message: error.message },
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
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete website credit", message: error.message },
      { status: 500 }
    );
  }
}

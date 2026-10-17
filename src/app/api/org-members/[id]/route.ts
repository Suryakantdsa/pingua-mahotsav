import { NextRequest, NextResponse } from "next/server";
import OrgMember from "@/models/OrgMember";
import GenericController from "@/lib/Generic";

const controller = new GenericController(OrgMember);

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
      { error: "Failed to fetch org member", message: error.message },
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
      { error: "Failed to update org member", message: error.message },
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
      { error: "Failed to delete org member", message: error.message },
      { status: 500 }
    );
  }
}

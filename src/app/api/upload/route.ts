// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeFilename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // Store in public/uploads directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, safeFilename), buffer);

    const publicUrl = `/uploads/${safeFilename}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file", message: error.message }, { status: 500 });
  }
}
